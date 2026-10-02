// Rerunnable: fills in lat/lng for every clinic in content/clinics.json that doesn't have coordinates yet.
//   1. US Census batch geocoder (free, up to 10,000 addresses per request), for the bulk of US addresses.
//   2. OpenStreetMap Nominatim, 1 request/sec, for whatever the Census couldn't match (also retried without units).
//   3. Zip-code center from Nominatim, as a last resort. These are flagged `"approx": true`, so the locator can
//      say the distance is approximate; fix the address (or set lat/lng by hand) and delete the flag to refine.
// Run with: node scripts/geocode-clinics.mjs                 (all passes)
//           node scripts/geocode-clinics.mjs --census        (only the listed passes: --census --nominatim --zip)
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readClinics, writeClinics } from "./clinics-file.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "content", "clinics.json");

const CENSUS_URL = "https://geocoding.geo.census.gov/geocoder/locations/addressbatch";
const CENSUS_BATCH = 1000;
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "Testology-Clinic-Locator/1.0 (internal site tooling)";

// Nominatim often returns nothing when an address includes a unit, e.g. "380 Washington St, Suite 202".
const UNIT_PATTERN = /[,\s]+(suite|ste\.?|unit|#|floor|fl\.?|\d+(st|nd|rd|th)\s+floor|room|rm\.?|bldg\.?|building)\b.*$/i;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripUnit(address) {
  return address.replace(UNIT_PATTERN, "").trim();
}

const needsCoords = (clinic) => clinic.lat === null || clinic.lng === null;

// ---- Census batch ----

const csvField = (value) => `"${String(value).replace(/"/g, '""')}"`;

/** Parses one line of the Census response, which quotes every field and puts "lng,lat" inside one of them. */
function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (ch === '"') quoted = false;
      else current += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { fields.push(current); current = ""; }
    else current += ch;
  }
  fields.push(current);
  return fields;
}

async function censusBatch(batch) {
  const csv = batch
    .map(({ index, clinic }) =>
      [index, stripUnit(clinic.address), clinic.city, clinic.state, clinic.zip].map(csvField).join(","),
    )
    .join("\n");

  const form = new FormData();
  form.append("addressFile", new Blob([csv], { type: "text/csv" }), "addresses.csv");
  form.append("benchmark", "Public_AR_Current");

  const res = await fetch(CENSUS_URL, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Census geocoder returned ${res.status}`);

  const matches = new Map();
  for (const line of (await res.text()).split(/\r?\n/)) {
    if (!line.trim()) continue;
    const [id, , status, , , coords] = parseCsvLine(line);
    if (status !== "Match" || !coords) continue;
    const [lng, lat] = coords.split(",").map(Number);
    if (Number.isFinite(lat) && Number.isFinite(lng)) matches.set(Number(id), { lat, lng });
  }
  return matches;
}

async function censusPass(clinics) {
  const todo = clinics.map((clinic, index) => ({ index, clinic })).filter(({ clinic }) => needsCoords(clinic));
  let matched = 0;

  for (let start = 0; start < todo.length; start += CENSUS_BATCH) {
    const batch = todo.slice(start, start + CENSUS_BATCH);
    try {
      const matches = await censusBatch(batch);
      for (const [index, coords] of matches) {
        clinics[index].lat = coords.lat;
        clinics[index].lng = coords.lng;
        matched += 1;
      }
      console.log(`Census: batch ${start / CENSUS_BATCH + 1}/${Math.ceil(todo.length / CENSUS_BATCH)} — ${matches.size}/${batch.length} matched`);
      // Save after every batch so an interrupted run keeps its progress.
      await writeClinics(dataPath, clinics);
    } catch (err) {
      console.error(`Census batch starting at ${start} failed: ${err.message}`);
    }
  }

  console.log(`Census pass: matched ${matched} of ${todo.length}.`);
}

// ---- Nominatim fallback ----

async function nominatimQuery(query) {
  const url = `${NOMINATIM_URL}?format=jsonv2&limit=1&countrycodes=us,pr,vi,gu,mp,as&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Nominatim request failed (${res.status}) for "${query}"`);
  const results = await res.json();
  return results.length ? { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) } : null;
}

async function nominatim(clinic) {
  const coords = await nominatimQuery(`${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zip}`);
  const street = stripUnit(clinic.address);
  if (coords || street === clinic.address) return coords;
  await sleep(1100);
  return nominatimQuery(`${street}, ${clinic.city}, ${clinic.state} ${clinic.zip}`);
}

async function nominatimPass(clinics) {
  // Also retries zip-center placements, so rerunning this pass refines approximate pins over time.
  const todo = clinics.filter((clinic) => needsCoords(clinic) || clinic.approx);
  console.log(`Nominatim: ${todo.length} clinic(s) left — about ${Math.ceil((todo.length * 1.2) / 60)} min at 1 request/sec.`);
  let updated = 0;

  for (const [i, clinic] of todo.entries()) {
    try {
      const coords = await nominatim(clinic);
      if (coords) {
        clinic.lat = coords.lat;
        clinic.lng = coords.lng;
        delete clinic.approx;
        updated += 1;
      } else {
        console.warn(`No match for: ${clinic.name} (${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zip})`);
      }
    } catch (err) {
      console.error(`Error geocoding ${clinic.name}:`, err.message);
    }
    if (i % 25 === 24) await writeClinics(dataPath, clinics);
    // Nominatim's usage policy caps free requests at 1/sec.
    await sleep(1100);
  }

  await writeClinics(dataPath, clinics);
  console.log(`Nominatim pass: matched ${updated} of ${todo.length}.`);
}

// ---- Zip-center fallback ----

async function zipPass(clinics) {
  const todo = clinics.filter(needsCoords);
  const zips = [...new Set(todo.map((c) => c.zip))];
  console.log(`Zip fallback: ${todo.length} clinic(s) across ${zips.length} zip code(s).`);
  const centers = new Map();

  for (const zip of zips) {
    try {
      const url = `${NOMINATIM_URL}?format=jsonv2&limit=1&countrycodes=us,pr,vi,gu,mp,as&postalcode=${zip}`;
      const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
      const results = res.ok ? await res.json() : [];
      if (results.length) centers.set(zip, { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) });
    } catch (err) {
      console.error(`Error looking up zip ${zip}:`, err.message);
    }
    await sleep(1100);
  }

  let updated = 0;
  for (const clinic of todo) {
    const center = centers.get(clinic.zip);
    if (!center) continue;
    clinic.lat = center.lat;
    clinic.lng = center.lng;
    clinic.approx = true;
    updated += 1;
  }
  await writeClinics(dataPath, clinics);
  console.log(`Zip fallback: placed ${updated} of ${todo.length} at their zip code's center (flagged approx).`);
}

async function main() {
  const clinics = await readClinics(dataPath);
  console.log(`${clinics.filter(needsCoords).length} of ${clinics.length} clinics need coordinates.`);

  const passes = ["--census", "--nominatim", "--zip"].filter((flag) => process.argv.includes(flag));
  const run = (flag) => passes.length === 0 || passes.includes(flag);

  if (run("--census")) await censusPass(clinics);
  if (run("--nominatim")) await nominatimPass(clinics);
  if (run("--zip")) await zipPass(clinics);

  await writeClinics(dataPath, clinics);
  const missing = clinics.filter(needsCoords);
  console.log(`\nDone. ${clinics.length - missing.length} of ${clinics.length} clinics have coordinates.`);
  if (missing.length) console.log(`${missing.length} still missing — they're listed but won't appear on the map.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
