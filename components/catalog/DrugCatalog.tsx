"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Check, FlaskConical, Plus, Scale, Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { PanelRequestDialog } from "./PanelRequestDialog";
import {
  categorySlug,
  drugCategories,
  drugFilterGroups,
  drugPanels,
  formatPrice,
  getDrugFilterItem,
  rankPanels,
  searchScore,
  specimens,
  type DrugPanel,
  type RankedPanel,
} from "@/content/drug-catalog";

const COMPARE_MAX = 3;
/** Long categories (eCup+ has ~100 panels) show this many until expanded. */
const CATEGORY_PREVIEW = 6;

// Search, category, specimen and selected drugs live in the URL, so a filtered view can be shared:
//   /catalog/drugs?drugs=fen,bup&sample=urine
const URL_EVENT = "drug-catalog:urlchange";
function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}
const getSearch = () => window.location.search;
const getServerSearch = () => "";

function setParams(changes: Record<string, string | null>) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(changes)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  window.dispatchEvent(new Event(URL_EVENT));
}

const sampleSlug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function PanelCard({
  result,
  query,
  drugCount,
  comparing,
  compareFull,
  onToggleCompare,
  onBuy,
}: {
  result: RankedPanel;
  query: string;
  drugCount: number;
  comparing: boolean;
  compareFull: boolean;
  onToggleCompare: () => void;
  onBuy: () => void;
}) {
  const { panel, covered, missing } = result;
  const price = formatPrice(panel.price);
  const q = query.trim().toLowerCase();
  // When a search hits a substance rather than the name, say which one.
  const substanceHit = q && !panel.name.toLowerCase().includes(q) ? panel.inc.find((m) => m.toLowerCase().includes(q)) : null;
  const full = drugCount > 0 && covered.length === drugCount;

  return (
    <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-primary-200 hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-display-bolt text-base font-semibold text-slate-900">
          <Link href={`/catalog/drugs/${panel.id}`} className="hover:text-primary-700">
            {panel.name}
          </Link>
        </h3>
        <span className={`shrink-0 text-right ${price ? "font-display-bolt text-lg font-bold text-slate-900" : "text-xs font-medium text-slate-500"}`}>
          {price ?? "Pricing — contact us"}
        </span>
      </div>

      <p className="mb-3 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded-full bg-primary-50 px-2 py-0.5 font-medium text-primary-800">{panel.sample}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
          {panel.inc.length} {panel.inc.length === 1 ? "substance" : "substances"}
        </span>
        {panel.code && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-slate-500">Ref {panel.code}</span>}
      </p>

      <p className="mb-3 text-sm text-slate-600">{panel.blurb}</p>

      {drugCount > 0 && (
        <div className={`mb-3 rounded-xl px-3 py-2 text-xs ${full ? "bg-primary-50 text-primary-900" : "bg-amber-50 text-amber-900"}`}>
          <div className="mb-1 flex items-center justify-between gap-2 font-semibold">
            <span>{full ? `Covers all ${drugCount} selected` : `Covers ${covered.length} of ${drugCount} selected`}</span>
            <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white" aria-hidden>
              <span
                className={`block h-full ${full ? "bg-primary-600" : "bg-amber-500"}`}
                style={{ width: `${Math.round((covered.length / drugCount) * 100)}%` }}
              />
            </span>
          </div>
          {!full && <p>Not included: {missing.map((id) => getDrugFilterItem(id)?.label ?? id).join(", ")}</p>}
        </div>
      )}

      {substanceHit && (
        <p className="mb-3 text-xs text-slate-500">
          Includes <span className="font-semibold text-slate-700">{substanceHit}</span>
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <Link
          href={`/catalog/drugs/${panel.id}`}
          className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
          aria-label={`View details for ${panel.name}`}
        >
          View details
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleCompare}
            disabled={!comparing && compareFull}
            aria-pressed={comparing}
            aria-label={`${comparing ? "Remove" : "Add"} ${panel.name} ${comparing ? "from" : "to"} comparison`}
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition disabled:opacity-40 ${
              comparing ? "border-primary-600 bg-primary-50 text-primary-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {comparing ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
            Compare
          </button>
          <button
            type="button"
            onClick={onBuy}
            aria-label={`Buy ${panel.name}`}
            className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-700"
          >
            <ShoppingCart className="h-3.5 w-3.5" aria-hidden />
            Buy now
          </button>
        </div>
      </div>
    </article>
  );
}

export function DrugCatalog() {
  const urlSearch = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const params = useMemo(() => new URLSearchParams(urlSearch), [urlSearch]);
  const query = params.get("q") ?? "";
  const cat = params.get("cat") ?? "all";
  const sample = params.get("sample") ?? "all";
  const drugIds = useMemo(
    () => (params.get("drugs") ?? "").split(",").filter((id) => id && getDrugFilterItem(id)),
    [params],
  );

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [buyPanel, setBuyPanel] = useState<DrugPanel | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [chipQuery, setChipQuery] = useState("");
  const filterDialog = useRef<HTMLDialogElement>(null);
  const compareDialog = useRef<HTMLDialogElement>(null);

  const basePanels = useMemo(
    () =>
      drugPanels.filter(
        (p) =>
          (cat === "all" || categorySlug(p.cat) === cat) &&
          (sample === "all" || sampleSlug(p.sample) === sample) &&
          (!query.trim() || searchScore(p, query) > 0),
      ),
    [cat, sample, query],
  );
  const ranked = useMemo(() => rankPanels(basePanels, drugIds, query), [basePanels, drugIds, query]);
  const flatList = drugIds.length > 0 || query.trim().length > 0;
  const filtersActive = flatList || cat !== "all" || sample !== "all";

  function toggleDrug(id: string) {
    const next = drugIds.includes(id) ? drugIds.filter((d) => d !== id) : [...drugIds, id];
    setParams({ drugs: next.join(",") || null });
  }

  function toggleCompare(id: string) {
    setCompareIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : ids.length < COMPARE_MAX ? [...ids, id] : ids));
  }

  const comparePanels = compareIds.map((id) => drugPanels.find((p) => p.id === id)!).filter(Boolean);

  // Chip search inside the drug filter: every typed word must match the chip label, its lab names or its group.
  const chipWords = chipQuery.toLowerCase().split(/\s+/).filter(Boolean);
  const chipMatches = (group: string, label: string, match: string[]) => {
    if (!chipWords.length) return true;
    const text = `${group} ${label} ${match.join(" ")}`.toLowerCase();
    return chipWords.every((w) => text.includes(w));
  };

  const countText = ranked.length
    ? drugIds.length
      ? `${ranked.length} closest ${ranked.length === 1 ? "panel" : "panels"} for your ${drugIds.length} selected ${drugIds.length === 1 ? "drug" : "drugs"}`
      : `${ranked.length} ${ranked.length === 1 ? "panel" : "panels"}`
    : "No panels match these filters";

  const cardProps = (r: RankedPanel) => ({
    result: r,
    query,
    drugCount: drugIds.length,
    comparing: compareIds.includes(r.panel.id),
    compareFull: compareIds.length >= COMPARE_MAX,
    onToggleCompare: () => toggleCompare(r.panel.id),
    onBuy: () => setBuyPanel(r.panel),
  });

  return (
    <div className={compareIds.length ? "pb-24" : ""}>
      {/* Search + filters */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setParams({ q: e.target.value || null })}
            placeholder="Search panels, codes or substances (e.g. fentanyl, 1200)"
            aria-label="Search panels"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 sm:text-sm"
          />
        </div>
        <div className="flex gap-2">
          <label className="flex h-12 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 lg:flex-none">
            <span className="whitespace-nowrap">Specimen</span>
            <select
              value={sample}
              onChange={(e) => setParams({ sample: e.target.value === "all" ? null : e.target.value })}
              className="h-full flex-1 bg-transparent text-base font-semibold text-slate-900 focus:outline-none sm:text-sm"
            >
              <option value="all">All</option>
              {specimens.map((s) => (
                <option key={s} value={sampleSlug(s)}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => filterDialog.current?.showModal()}
            className="flex h-12 items-center gap-2 whitespace-nowrap rounded-xl bg-primary-600 px-4 text-sm font-semibold text-white hover:bg-primary-700"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filter by drug
            {drugIds.length > 0 && (
              <span className="rounded-full bg-white px-1.5 text-xs font-bold text-primary-700">{drugIds.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="-mx-4 mb-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Category">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {["all", ...drugCategories].map((c) => {
            const value = c === "all" ? "all" : categorySlug(c);
            const active = cat === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setParams({ cat: value === "all" ? null : value })}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  active ? "border-primary-600 bg-primary-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {c === "all" ? "All panels" : c}
              </button>
            );
          })}
        </div>
      </div>

      {drugIds.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-500">Selected:</span>
          {drugIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleDrug(id)}
              aria-label={`Remove ${getDrugFilterItem(id)?.label}`}
              className="flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800 hover:bg-primary-100"
            >
              {getDrugFilterItem(id)?.label}
              <X className="h-3 w-3" aria-hidden />
            </button>
          ))}
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-500" aria-live="polite">
          {countText}
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={() => setParams({ q: null, cat: null, sample: null, drugs: null })}
            className="text-sm font-semibold text-slate-500 hover:text-primary-700 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Results: ranked flat list when searching or filtering by drug, otherwise grouped by category */}
      {flatList ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ranked.map((r) => (
            <PanelCard key={r.panel.id} {...cardProps(r)} />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {drugCategories.map((category) => {
            const inCategory = ranked.filter((r) => r.panel.cat === category);
            if (!inCategory.length) return null;
            const isExpanded = expanded.has(category) || inCategory.length <= CATEGORY_PREVIEW + 3;
            const shown = isExpanded ? inCategory : inCategory.slice(0, CATEGORY_PREVIEW);
            return (
              <section key={category} aria-labelledby={`cat-${categorySlug(category)}`}>
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h2 id={`cat-${categorySlug(category)}`} className="font-display-bolt text-xl font-semibold text-slate-900">
                    {category}
                  </h2>
                  <span className="text-sm text-slate-500">{inCategory.length} panels</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {shown.map((r) => (
                    <PanelCard key={r.panel.id} {...cardProps(r)} />
                  ))}
                </div>
                {!isExpanded && (
                  <button
                    type="button"
                    onClick={() => setExpanded((s) => new Set(s).add(category))}
                    className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Show all {inCategory.length} {category}
                  </button>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* Drug filter */}
      <dialog
        ref={filterDialog}
        aria-labelledby="drug-filter-title"
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-white p-0 shadow-2xl backdrop:bg-slate-900/40 open:flex open:flex-col"
      >
        <div className="border-b border-slate-100 p-5">
          <div className="mb-1 flex items-center justify-between">
            <h2 id="drug-filter-title" className="font-display-bolt text-lg font-semibold text-slate-900">
              Filter by drug
            </h2>
            <button
              type="button"
              onClick={() => filterDialog.current?.close()}
              aria-label="Close drug filter"
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mb-3 text-sm text-slate-500">Pick the substances you need to test for — we&apos;ll show the panels that cover them best.</p>
          <input
            type="search"
            value={chipQuery}
            onChange={(e) => setChipQuery(e.target.value)}
            placeholder="Search drugs (e.g. oxycodone, Adderall)"
            aria-label="Search drugs"
            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-base focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 sm:text-sm"
          />
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {drugFilterGroups.map((group) => {
            const items = group.items.filter((i) => drugIds.includes(i.id) || chipMatches(group.group, i.label, i.match));
            if (!items.length) return null;
            return (
              <fieldset key={group.group}>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{group.group}</legend>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => {
                    const active = drugIds.includes(item.id);
                    // A few filters (e.g. LSD) aren't in any panel yet; picking one just shows nothing covers it.
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleDrug(item.id)}
                        aria-pressed={active}
                        className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition ${
                          active ? "border-primary-600 bg-primary-600 font-semibold text-white" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" aria-hidden />}
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
        <div className="flex items-center gap-3 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={() => setParams({ drugs: null })}
            disabled={!drugIds.length}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => filterDialog.current?.close()}
            className="flex-1 rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            {drugIds.length ? `Show ${ranked.length} ${ranked.length === 1 ? "panel" : "panels"}` : "Done"}
          </button>
        </div>
      </dialog>

      {/* Compare tray */}
      {compareIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="container-wide flex flex-wrap items-center gap-2 py-3">
            <Scale className="h-5 w-5 text-primary-600" aria-hidden />
            <span className="text-sm font-semibold text-slate-700">
              Compare ({compareIds.length}/{COMPARE_MAX})
            </span>
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {comparePanels.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleCompare(p.id)}
                  aria-label={`Remove ${p.name} from comparison`}
                  className="flex max-w-full items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                >
                  <span className="truncate">{p.name}</span>
                  <X className="h-3 w-3 shrink-0" aria-hidden />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => compareDialog.current?.showModal()}
              disabled={compareIds.length < 2}
              className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {compareIds.length < 2 ? "Add one more to compare" : "Compare now"}
            </button>
          </div>
        </div>
      )}

      <dialog
        ref={compareDialog}
        aria-labelledby="compare-title"
        className="m-auto max-h-[90dvh] w-[min(64rem,calc(100%-2rem))] rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-slate-900/40"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 id="compare-title" className="font-display-bolt text-lg font-semibold text-slate-900">
            Compare panels
          </h2>
          <button
            type="button"
            onClick={() => compareDialog.current?.close()}
            aria-label="Close comparison"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {comparePanels.length >= 2 && <CompareTable panels={comparePanels} />}
      </dialog>

      {/* One "Buy now" form shared by every card. */}
      <PanelRequestDialog panel={buyPanel} onClose={() => setBuyPanel(null)} />
    </div>
  );
}

function CompareTable({ panels }: { panels: DrugPanel[] }) {
  // Every substance any of the panels screens for, in order of first appearance.
  const substances = [...new Set(panels.flatMap((p) => p.inc))];
  return (
    <div className="max-h-[calc(90dvh-5rem)] overflow-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <caption className="sr-only">Side-by-side comparison of the selected panels</caption>
        <thead className="sticky top-0 bg-white shadow-[0_1px_0_#f1f5f9]">
          <tr>
            <th scope="col" className="w-44 p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Panel
            </th>
            {panels.map((p) => (
              <th key={p.id} scope="col" className="p-4 text-left align-top">
                <Link href={`/catalog/drugs/${p.id}`} className="font-display-bolt font-semibold text-slate-900 hover:text-primary-700">
                  {p.name}
                </Link>
                <span className="mt-1 block text-xs font-normal text-slate-500">{p.cat}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Price", (p: DrugPanel) => formatPrice(p.price) ?? "Contact us"],
            ["Specimen", (p: DrugPanel) => p.sample],
            ["Substances", (p: DrugPanel) => String(p.inc.length)],
            ["Ref", (p: DrugPanel) => p.code ?? "—"],
          ].map(([label, value]) => (
            <tr key={label as string} className="border-t border-slate-100">
              <th scope="row" className="p-4 text-left font-semibold text-slate-700">
                {label as string}
              </th>
              {panels.map((p) => (
                <td key={p.id} className="p-4 text-slate-700">
                  {(value as (p: DrugPanel) => string)(p)}
                </td>
              ))}
            </tr>
          ))}
          {substances.map((substance) => {
            const differs = !panels.every((p) => p.inc.includes(substance));
            return (
              <tr key={substance} className={`border-t border-slate-100 ${differs ? "bg-amber-50/50" : ""}`}>
                <th scope="row" className="p-4 text-left font-normal text-slate-700">
                  <FlaskConical className="mr-1.5 inline h-3.5 w-3.5 text-slate-400" aria-hidden />
                  {substance}
                </th>
                {panels.map((p) => (
                  <td key={p.id} className="p-4">
                    {p.inc.includes(substance) ? (
                      <>
                        <Check className="h-4 w-4 text-primary-600" aria-hidden />
                        <span className="sr-only">Included</span>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-300" aria-hidden>
                          —
                        </span>
                        <span className="sr-only">Not included</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
