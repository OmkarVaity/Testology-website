// Merges a JSON export from scripts/escreen-collector.html into content/clinics.json.
// Existing clinics (with their coordinates and Testology's `featured` flag) are kept as-is; new ones are added
// with lat/lng null, so run `node scripts/geocode-clinics.mjs` afterwards.
// Run with: node scripts/import-escreen.mjs path/to/escreen-clinics.json
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readClinics, writeClinics } from "./clinics-file.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "content", "clinics.json");

// eScreen's legend images -> our ClinicStatus values (verified against the images on myescreen.com).
const ICON_STATUS = {
  "networksort1.gif": "installed",
  "networksort4.gif": "installedPremium",
  "networksort2.gif": "uninstalledInNetwork",
  "networksort3.gif": "outOfNetwork",
  "e-green.gif": "electronicChain",
  "phys-green.jpg": "ePhysical",
};
const IGNORED_ICONS = new Set(["magglass.gif"]);
const STATUS_ORDER = ["installed", "installedPremium", "uninstalledInNetwork", "electronicChain", "outOfNetwork", "ePhysical"];

const KEEP_UPPER = new Set(["N", "S", "E", "W", "NE", "NW", "SE", "SW", "PO", "US", "II", "III", "IV", "LLC", "UC", "DOT", "ARC"]);

/** eScreen returns many addresses/cities in all caps; title-case those, leaving mixed-case text untouched. */
function tidyCase(value) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text !== text.toUpperCase() || !/[A-Z]{2}/.test(text)) return text;
  return text
    .toLowerCase()
    .replace(/[a-z0-9']+/g, (word) => {
      const upper = word.toUpperCase();
      if (KEEP_UPPER.has(upper)) return upper;
      if (/^\d+(st|nd|rd|th)$/.test(word)) return word; // 1st, 22nd
      if (/\d/.test(word)) return upper; // 66B, 14A, I95
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .replace(/\bMc([a-z])/g, (_, c) => "Mc" + c.toUpperCase());
}

/** Addresses also arrive as "Peachtree St Ne" in mixed case; compass quadrants are always written in caps. */
function tidyAddress(value) {
  return tidyCase(value).replace(/\b(Ne|Nw|Se|Sw)\b/g, (d) => d.toUpperCase());
}

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return digits.length === 10 ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}` : raw.trim();
}

function statusesFrom(icons, unknownIcons) {
  const found = new Set();
  for (const icon of icons) {
    const file = icon.split(" ~ ")[0].replace(/^url\(["']?|["']?\)$/g, "").split("/").pop();
    if (!file || IGNORED_ICONS.has(file)) continue;
    if (ICON_STATUS[file]) found.add(ICON_STATUS[file]);
    else unknownIcons.set(file, (unknownIcons.get(file) || 0) + 1);
  }
  return STATUS_ORDER.filter((s) => found.has(s));
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const phoneZipKey = (c) => `${c.phone.replace(/\D/g, "")}|${c.zip}`;
const siteKey = (c) => `${norm(c.name)}|${norm(c.address)}|${c.zip}`;
// Same street number, zip and name prefix: catches "380 Washington St, Suite 202" vs "380 Washington St.".
const looseKey = (c) => `${(c.address.match(/^\d+/) || [""])[0]}|${c.zip}|${norm(c.name).slice(0, 8)}`;

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: node scripts/import-escreen.mjs path/to/escreen-clinics.json");
    process.exit(1);
  }

  const collected = JSON.parse(await readFile(inputPath, "utf-8"));
  const existing = await readClinics(dataPath);

  // Against existing clinics, phone+zip also catches the same clinic under a slightly different name. Within the
  // export only name+address+zip counts, because separate branches can share one phone line.
  const existingPhoneZip = new Set(existing.map(phoneZipKey));
  const existingLoose = new Set(existing.map(looseKey));
  const seenSite = new Set(existing.map(siteKey));
  const unknownIcons = new Map();
  const added = [];
  let duplicates = 0;
  let noStatus = 0;

  for (const raw of collected) {
    const clinic = {
      name: tidyCase(raw.name),
      phone: formatPhone(raw.phone),
      address: tidyAddress(raw.address),
      city: tidyCase(raw.city),
      state: raw.state.trim().toUpperCase(),
      zip: raw.zip.trim(),
      statuses: statusesFrom(raw.icons || [], unknownIcons),
      lat: null,
      lng: null,
    };

    if (seenSite.has(siteKey(clinic)) || existingPhoneZip.has(phoneZipKey(clinic)) || existingLoose.has(looseKey(clinic))) {
      duplicates += 1;
      continue;
    }
    if (clinic.statuses.length === 0) noStatus += 1;

    seenSite.add(siteKey(clinic));
    added.push(clinic);
  }

  added.sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
  await writeClinics(dataPath, [...existing, ...added]);

  console.log(`Read ${collected.length} collected rows.`);
  console.log(`Added ${added.length} new clinics, skipped ${duplicates} already in content/clinics.json.`);
  console.log(`Total clinics: ${existing.length + added.length}.`);
  if (noStatus) console.warn(`${noStatus} new clinic(s) had no recognised status icon.`);
  if (unknownIcons.size) console.warn("Unrecognised icons (add them to ICON_STATUS):", Object.fromEntries(unknownIcons));
  console.log("\nNext: node scripts/geocode-clinics.mjs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
