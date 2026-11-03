// Copies the drug testing catalog from the Netlify catalog site into content/drug-catalog.json, which the
// site's own /catalog/drugs pages render. Run it again whenever the Netlify catalog changes — or, once staff
// edit the catalog here (or in a CMS) instead, retire it.
//
//   node scripts/import-drug-catalog.mjs [url]
//
// The Netlify page keeps its data as JavaScript literals at the top of one inline script (CATEGORIES, PANELS,
// GLOSSARY, then DRUG_FILTERS further down). Only those declarations are evaluated, in an empty sandbox with no
// globals — none of the page's DOM code runs.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "content", "drug-catalog.json");
const SOURCE_URL = process.argv[2] ?? "https://testology-menu.netlify.app/drug_catalog";

// Same id scheme as the Netlify catalog, so panel links keep working.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function between(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) throw new Error(`Couldn't find "${startMarker}" — has the catalog page changed?`);
  const end = text.indexOf(endMarker, start);
  if (end === -1) throw new Error(`Couldn't find "${endMarker}" after "${startMarker}"`);
  return text.slice(start, end);
}

async function main() {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Fetching ${SOURCE_URL} failed (${res.status})`);
  const html = await res.text();

  // Panels, categories and glossary end where the page logic begins ("const slug").
  const coreData = between(html, "const CATEGORIES", "const slug");
  const filterData = between(html, "const DRUG_FILTERS", "const ITEM_BY_ID");

  const sandbox = vm.createContext({});
  const raw = vm.runInContext(`${coreData}\n${filterData}\n;({ CATEGORIES, PANELS, GLOSSARY, DRUG_FILTERS })`, sandbox, {
    timeout: 1000,
  });
  const data = JSON.parse(JSON.stringify(raw));

  const panels = data.PANELS.map((p) => ({ id: slug(p.name), ...p }));
  const ids = new Set(panels.map((p) => p.id));
  if (ids.size !== panels.length) throw new Error("Two panels share a name — their page addresses would collide.");

  // Sanity checks, so a half-broken page can't silently empty the site's catalog.
  if (panels.length < 50) throw new Error(`Only ${panels.length} panels found; refusing to overwrite the catalog.`);
  const substances = new Set(panels.flatMap((p) => p.inc));
  const unexplained = [...substances].filter((s) => !data.GLOSSARY[s]);
  const unknownMatches = data.DRUG_FILTERS.flatMap((g) => g.items.flatMap((i) => i.match)).filter((m) => !substances.has(m));

  const catalog = {
    source: SOURCE_URL,
    importedAt: new Date().toISOString().slice(0, 10),
    categories: data.CATEGORIES,
    glossary: data.GLOSSARY,
    drugFilters: data.DRUG_FILTERS,
    panels,
  };

  // Leave the file (and its importedAt date) alone when nothing changed, so a scheduled sync only commits —
  // and the site only rebuilds — when the catalog itself was edited.
  const previous = await readFile(outPath, "utf-8").then(JSON.parse).catch(() => null);
  const comparable = (c) => JSON.stringify({ ...c, importedAt: undefined });
  if (previous && comparable(previous) === comparable(catalog)) {
    console.log(`No changes — content/drug-catalog.json already matches ${SOURCE_URL} (${panels.length} panels).`);
    return;
  }

  // One panel per line keeps diffs readable when prices or panels change.
  const { panels: panelList, ...rest } = catalog;
  const head = JSON.stringify(rest, null, 2).replace(/\n}$/, "");
  const body = panelList.map((p) => "    " + JSON.stringify(p)).join(",\n");
  await writeFile(outPath, `${head},\n  "panels": [\n${body}\n  ]\n}\n`, "utf-8");

  if (previous) {
    const before = new Set(previous.panels.map((p) => p.id));
    const after = new Set(panels.map((p) => p.id));
    const added = [...after].filter((id) => !before.has(id));
    const removed = [...before].filter((id) => !after.has(id));
    const changed = panels.filter((p) => {
      const old = previous.panels.find((o) => o.id === p.id);
      return old && JSON.stringify(old) !== JSON.stringify(p);
    });
    console.log(`Changes: ${added.length} added, ${removed.length} removed, ${changed.length} updated.`);
    if (added.length) console.log("  + " + added.join(", "));
    if (removed.length) console.log("  - " + removed.join(", "));
    if (changed.length) console.log("  ~ " + changed.map((p) => p.id).join(", "));
  }
  console.log(`Imported ${panels.length} panels in ${catalog.categories.length} categories from ${SOURCE_URL}.`);
  console.log(`${panels.filter((p) => p.price).length} priced; ${substances.size} distinct substances; ${data.DRUG_FILTERS.length} drug filter groups.`);
  if (unexplained.length) console.warn("Substances without a glossary entry:", unexplained);
  if (unknownMatches.length) console.warn("Drug filter terms no panel includes:", [...new Set(unknownMatches)]);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
