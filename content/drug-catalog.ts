// Drug testing catalog: data from content/drug-catalog.json (imported from the Netlify catalog by
// scripts/import-drug-catalog.mjs) plus the matching logic behind "filter by drug". The rules mirror the
// Netlify catalog so staff see the same results: coverage, the ~60% narrowing threshold and the ranking.
import catalogData from "./drug-catalog.json";
import { escreenServices } from "./escreen-services";

export type DrugPanel = {
  id: string;
  name: string;
  cat: string;
  sample: "Urine" | "Hair" | "Oral Fluid" | "Breath";
  code?: string;
  /** Dollar amount as text ("52.79"), or null when pricing is on request. */
  price: string | null;
  blurb: string;
  summary: string;
  why: string;
  note?: string;
  /** Substances screened, using the lab's names ("Opiates (OPI)"). */
  inc: string[];
  /** Cutoff per substance, e.g. "300 ng/mL". */
  cutoffs?: Record<string, string | number>;
  /** Panel includes expanded opiates with lab-specific hydrocodone/hydromorphone confirmation. */
  star?: boolean;
};

export type DrugFilterItem = { id: string; label: string; match: string[] };
export type DrugFilterGroup = { group: string; items: DrugFilterItem[] };

export const drugCatalog = catalogData as unknown as {
  source: string;
  importedAt: string;
  categories: string[];
  glossary: Record<string, string>;
  drugFilters: DrugFilterGroup[];
  panels: DrugPanel[];
};

export const drugPanels = drugCatalog.panels;
export const drugCategories = drugCatalog.categories;
export const drugFilterGroups = drugCatalog.drugFilters;
export const glossary = drugCatalog.glossary;

export const specimens = ["Urine", "Hair", "Oral Fluid", "Breath"] as const;

const ITEM_BY_ID = new Map(drugFilterGroups.flatMap((g) => g.items).map((i) => [i.id, i]));

export function getDrugPanel(id: string): DrugPanel | undefined {
  return drugPanels.find((p) => p.id === id);
}

export function getDrugFilterItem(id: string): DrugFilterItem | undefined {
  return ITEM_BY_ID.get(id);
}

export function formatPrice(price: string | null): string | null {
  if (!price) return null;
  const n = Number.parseFloat(price);
  if (Number.isNaN(n)) return price;
  return `$${n.toFixed(2).replace(/\.00$/, "")}`;
}

export function categorySlug(cat: string): string {
  return cat.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Which selected drugs a panel covers: a drug counts if ANY of its lab names is in the panel. */
export function coverageFor(panel: DrugPanel, drugIds: string[]): { covered: string[]; missing: string[] } {
  const covered: string[] = [];
  const missing: string[] = [];
  for (const id of drugIds) {
    const item = ITEM_BY_ID.get(id);
    (item && item.match.some((m) => panel.inc.includes(m)) ? covered : missing).push(id);
  }
  return { covered, missing };
}

/** Search relevance, highest first: name, category, code, substances, then description. */
export function searchScore(panel: DrugPanel, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const name = panel.name.toLowerCase();
  if (name === q) return 100;
  if (name.startsWith(q)) return 90;
  if (name.includes(q)) return 80;
  if (panel.cat.toLowerCase().includes(q)) return 60;
  if ((panel.code ?? "").toLowerCase() === q) return 55;
  if (panel.inc.some((m) => m.toLowerCase() === q)) return 50;
  if (panel.inc.some((m) => m.toLowerCase().includes(q))) return 40;
  if (panel.blurb.toLowerCase().includes(q)) return 20;
  return 0;
}

export type RankedPanel = { panel: DrugPanel; covered: string[]; missing: string[] };

/**
 * Panels for a set of selected drugs (and/or a search). With drugs selected, a panel must cover about 60% of
 * the selection — or as much as the best available panel can — and results are ordered by most drugs covered,
 * then tightest fit (fewest extras), then search relevance.
 */
export function rankPanels(panels: DrugPanel[], drugIds: string[], query = ""): RankedPanel[] {
  const withCoverage = panels.map((panel) => ({ panel, ...coverageFor(panel, drugIds) }));
  let results = withCoverage;
  if (drugIds.length) {
    const best = Math.max(0, ...withCoverage.map((r) => r.covered.length));
    const minCoverage = Math.min(best, Math.ceil(drugIds.length * 0.6));
    results = withCoverage.filter((r) => best > 0 && r.covered.length > 0 && r.covered.length >= minCoverage);
  }
  return results.sort(
    (a, b) =>
      b.covered.length - a.covered.length ||
      b.covered.length / b.panel.inc.length - a.covered.length / a.panel.inc.length ||
      searchScore(b.panel, query) - searchScore(a.panel, query),
  );
}

/**
 * The eScreen service + panel code to order this panel through /order, when its code matches one on
 * Testology's eScreen order screen. DOT panels are employer-ordered, so they never map.
 */
export function orderTargetFor(panel: DrugPanel): { serviceId: string; panelCode?: string } | null {
  if (panel.cat === "DOT & Regulated" && panel.sample !== "Breath") return null;
  if (panel.sample === "Breath") return { serviceId: "breath-alcohol-test" };
  const serviceId =
    panel.cat === "eCup+ Instant Panels"
      ? "ecup-rapid-urine-screen"
      : panel.sample === "Urine"
        ? "lab-urine-drug-test"
        : panel.sample === "Hair"
          ? "hair-drug-test"
          : panel.sample === "Oral Fluid"
            ? "oral-fluid-drug-test"
            : null;
  const service = escreenServices.find((s) => s.id === serviceId);
  if (!service || !panel.code) return null;
  return service.panels?.some((p) => p.code === panel.code) ? { serviceId: service.id, panelCode: panel.code } : null;
}
