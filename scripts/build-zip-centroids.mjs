// Builds content/zip-centroids.json — the center point of every US postal code — from the US Census ZCTA
// gazetteer, so the clinic locator can look up zip searches itself instead of calling a third-party geocoder.
//
// 1. Download and unzip the national ZCTA gazetteer (public domain, ~1 MB):
//    https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2020_Gazetteer/2020_Gaz_zcta_national.zip
// 2. Run: node scripts/build-zip-centroids.mjs path/to/2020_Gaz_zcta_national.txt
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "content", "zip-centroids.json");

// Guam isn't in the gazetteer; its island-wide center is close enough for a 10+ mile radius search.
const EXTRA = { "96910": [13.4757, 144.7489] };

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: node scripts/build-zip-centroids.mjs path/to/2020_Gaz_zcta_national.txt");
    process.exit(1);
  }

  const lines = (await readFile(inputPath, "utf-8")).split(/\r?\n/);
  const header = lines[0].split("\t").map((h) => h.trim());
  const col = (name) => {
    const i = header.indexOf(name);
    if (i === -1) throw new Error(`Column ${name} not found — is this the ZCTA gazetteer file?`);
    return i;
  };
  const [geoid, lat, lng] = [col("GEOID"), col("INTPTLAT"), col("INTPTLONG")];

  // { "021": { "02135": [42.35, -71.16], ... }, ... } — grouped by 3-digit prefix, which is how it's served.
  const byPrefix = {};
  let count = 0;
  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const cells = line.split("\t").map((c) => c.trim());
    const zip = cells[geoid];
    // 4 decimals is ~10 m, far finer than a zip code's size.
    const point = [Math.round(+cells[lat] * 1e4) / 1e4, Math.round(+cells[lng] * 1e4) / 1e4];
    (byPrefix[zip.slice(0, 3)] ??= {})[zip] = point;
    count += 1;
  }
  for (const [zip, point] of Object.entries(EXTRA)) {
    if (!byPrefix[zip.slice(0, 3)]?.[zip]) (byPrefix[zip.slice(0, 3)] ??= {})[zip] = point;
  }

  const prefixes = Object.keys(byPrefix).sort();
  const body = prefixes.map((p) => `  ${JSON.stringify(p)}: ${JSON.stringify(byPrefix[p])}`).join(",\n");
  await writeFile(outPath, `{\n${body}\n}\n`, "utf-8");
  console.log(`Wrote ${count} zip codes in ${prefixes.length} prefixes to content/zip-centroids.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
