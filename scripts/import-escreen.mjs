// Merges a JSON export from scripts/escreen-collector.html into content/clinics.json.
//
//   node scripts/import-escreen.mjs export.json                 add mode: only adds clinics that are new
//   node scripts/import-escreen.mjs export.json --replace       sync mode: also updates changed clinics and
//                                                               removes ones eScreen no longer lists
//   ... --dry-run                                               show what would change, write nothing
//   ... --replace --force                                       sync even if the export looks incomplete
//
// Sync mode is meant for a complete nationwide export. If the export matches less than 85% of the current
// clinics it's probably partial (a few searches skipped, rows the collector couldn't read), so it refuses
// rather than deleting clinics that are actually still open. Testology's own clinic (`featured`) and any
// clinic marked `"keep": true` are never removed.
//
// Matched clinics keep their coordinates unless their address changed; new or moved clinics get lat/lng null,
// so run `node scripts/geocode-clinics.mjs` afterwards.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readClinics, writeClinics } from "./clinics-file.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "content", "clinics.json");
const MIN_MATCH_RATIO = 0.85;

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
const describe = (c) => `${c.name} — ${c.address}, ${c.city}, ${c.state} ${c.zip}`;

function normalize(raw, unknownIcons) {
  return {
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
}

function indexBy(list, keyFn) {
  const map = new Map();
  for (const item of list) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, item);
  }
  return map;
}

async function main() {
  const args = process.argv.slice(2);
  const inputPath = args.find((a) => !a.startsWith("--"));
  const replace = args.includes("--replace");
  const dryRun = args.includes("--dry-run");
  const force = args.includes("--force");
  if (!inputPath) {
    console.error("Usage: node scripts/import-escreen.mjs path/to/escreen-clinics.json [--replace] [--dry-run] [--force]");
    process.exit(1);
  }

  const collected = JSON.parse(await readFile(inputPath, "utf-8"));
  const existing = await readClinics(dataPath);
  const unknownIcons = new Map();

  // Normalize the export and drop rows that repeat within it (same name + address + zip).
  const incoming = [...indexBy(collected.map((raw) => normalize(raw, unknownIcons)), siteKey).values()];
  const bySite = indexBy(incoming, siteKey);
  const byPhoneZip = indexBy(incoming, phoneZipKey);
  const byLoose = indexBy(incoming, looseKey);

  // Pair each existing clinic with its row in the export, if any.
  const matchedIncoming = new Set();
  const pairs = existing.map((clinic) => {
    const match = [bySite.get(siteKey(clinic)), byPhoneZip.get(phoneZipKey(clinic)), byLoose.get(looseKey(clinic))].find(
      (candidate) => candidate && !matchedIncoming.has(candidate),
    );
    if (match) matchedIncoming.add(match);
    return { clinic, match };
  });

  const protectedClinic = (c) => c.featured || c.keep;
  const comparable = pairs.filter(({ clinic }) => !protectedClinic(clinic));
  const matchRatio = comparable.length ? comparable.filter((p) => p.match).length / comparable.length : 1;

  const added = incoming
    .filter((c) => !matchedIncoming.has(c))
    .sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
  const removed = [];
  const updated = [];
  const moved = [];
  let result;

  if (replace) {
    if (matchRatio < MIN_MATCH_RATIO && !force) {
      console.error(
        `The export matches only ${(matchRatio * 100).toFixed(1)}% of the ${comparable.length} current clinics ` +
          `(need ${MIN_MATCH_RATIO * 100}%). It looks incomplete, so nothing was removed or written.\n` +
          "Finish the remaining searches, import without --replace, or rerun with --force if you're sure.",
      );
      process.exit(1);
    }

    result = [];
    for (const { clinic, match } of pairs) {
      if (!match) {
        if (protectedClinic(clinic)) result.push(clinic);
        else removed.push(clinic);
        continue;
      }
      if (protectedClinic(clinic)) {
        // Our own listing keeps its hand-written details; only eScreen's status is taken from the export.
        result.push({ ...clinic, statuses: match.statuses });
        continue;
      }
      const addressChanged = siteKey({ ...clinic, name: "" }) !== siteKey({ ...match, name: "" });
      const next = { ...match, lat: addressChanged ? null : clinic.lat, lng: addressChanged ? null : clinic.lng };
      if (!addressChanged && clinic.approx) next.approx = true;
      if (addressChanged) moved.push(next);
      else if (JSON.stringify({ ...clinic, lat: 0, lng: 0 }) !== JSON.stringify({ ...next, lat: 0, lng: 0 })) updated.push(next);
      result.push(next);
    }
    result.push(...added);
  } else {
    result = [...existing, ...added];
  }

  console.log(`Read ${collected.length} rows (${incoming.length} unique). Export matches ${(matchRatio * 100).toFixed(1)}% of current clinics.`);
  console.log(`  + ${added.length} new`);
  if (replace) {
    console.log(`  ~ ${updated.length} updated (name, phone or status changed)`);
    console.log(`  ~ ${moved.length} moved (address changed — will be re-geocoded)`);
    console.log(`  - ${removed.length} removed (no longer listed by eScreen)`);
    for (const c of removed.slice(0, 25)) console.log(`      - ${describe(c)}`);
    if (removed.length > 25) console.log(`      … and ${removed.length - 25} more`);
  } else {
    const unmatched = pairs.filter(({ clinic, match }) => !match && !protectedClinic(clinic)).length;
    if (unmatched) console.log(`  (${unmatched} current clinics aren't in this export; use --replace to remove them)`);
  }
  console.log(`Total after import: ${result.length}.`);
  if (unknownIcons.size) console.warn("Unrecognised icons (add them to ICON_STATUS):", Object.fromEntries(unknownIcons));

  if (dryRun) {
    console.log("\nDry run — content/clinics.json was not changed.");
    return;
  }
  await writeClinics(dataPath, result);
  if (added.length || moved.length) console.log("\nNext: node scripts/geocode-clinics.mjs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
