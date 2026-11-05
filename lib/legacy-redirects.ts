// Permanent redirects from the old Wix site's URLs (taken from its sitemap) to their pages on this site, so
// Google rankings and old bookmarks carry over after the domain switch. Loaded by next.config.ts, so it uses
// relative imports only.
import type { NextConfig } from "next";
import catalog from "../content/drug-catalog.json";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

const panelIds = new Set((catalog.panels as { id: string }[]).map((p) => p.id));
const panel = (id: string) => {
  // The catalog syncs automatically from the Netlify catalog, so a panel may get renamed or removed. Fall back
  // to the catalog page (with a build warning) rather than failing the build and blocking every later update.
  if (!panelIds.has(id)) {
    console.warn(`legacy-redirects: drug catalog has no panel "${id}" — redirecting to /catalog/drugs instead`);
    return "/catalog/drugs";
  }
  return `/catalog/drugs/${id}`;
};

const ECUP = "/catalog/drugs?cat=ecup-instant-panels";
const LAB_DRUG = "/catalog/drugs?cat=standard-panels";

// Old Wix store products → the same panel in the new catalog.
const productRedirects: [string, string][] = [
  ["standard-5-panel", panel("5-panel-standard")],
  ["standard-7-panel", panel("7-panel-standard")],
  ["9-panel-drug-test", panel("9-panel-standard")],
  ["10-panel-drug-test", panel("10-panel-standard")],
  ["10dsp-exp-opi-fent-phn", panel("10-panel-extended-with-fentanyl")],
  ["initial-male-panel", "/blood-profiles"],
];

// "rapid-10a" etc. were eCup+ cups; send each to its own page when the new catalog has it.
const rapidProducts = [
  "10", "10a", "10b", "10d", "11a", "11b", "11c", "11d", "12a", "12b", "12d", "13a", "4a", "4b", "5a", "5b", "5c",
  "6", "6a", "6b", "6d", "6e", "6f", "7", "7a", "7b", "7c", "7d", "8", "8a", "8b", "8c", "8d", "8f", "9a", "9c",
  "9d", "9e", "9f", "9g", "9h", "9j", "9k",
];

// Panel pages whose Wix URL carried the panel (often with its code).
const panelPageRedirects: [string, string][] = [
  ["/copy-of-10-panel-extended-7182", panel("10-panel-extended-with-fentanyl")],
  ["/copy-of-10-panel-extended-with-k2-1455", panel("10-panel-extended-with-k2")],
  ["/copy-of-10-panel-with-etg-3436", panel("10-panel-with-etg")],
  ["/copy-of-5-panel-1365", panel("5-panel-with-extended-opiates")],
  ["/copy-of-5-panel-extended-with-etg-1381", panel("5-panel-extended-with-etg")],
  ["/copy-of-5-panel-with-alchohol-1380", panel("5-panel-extended-with-alcohol")],
  ["/copy-of-5-panel-with-k2-1444", panel("5-panel-with-k2")],
  ["/copy-of-9-panel-extended-with-k2-1448", panel("9-panel-extended-with-k2")],
  ["/copy-of-7-panel-extended-with-alchoho", panel("7-panel-extended-with-alcohol")],
  ["/copy-of-7-panel-extended-with-alchoho-1", panel("7-panel-extended-with-alcohol")],
  ["/copy-of-9-panel-extended-with-alchoho", panel("9-panel-extended-with-alcohol")],
  ["/copy-of-4-panel-drug-tests", panel("4-panel-standard-with-methylphenidate")],
];

// Everything else, most specific first. ":rest*" matches the Wix item slug after the page name.
const pageRedirects: [string, string][] = [
  // Drug testing
  ["/ecup-panels", ECUP],
  ["/ecup-description/:rest*", ECUP],
  ["/ecup-description-:n/:rest*", ECUP],
  ["/copy-of-ecup-description-:n/:rest*", ECUP],
  ["/copy-2-of-ecup-description-:n/:rest*", ECUP],
  ["/copy-of-ecup-instant-drug-testing", "/services/rapid-drug-testing"],
  ["/copy-of-ecup-instant-drug-testing-1", "/services/rapid-drug-testing"],
  ["/category/rapid-drug-tests", "/services/rapid-drug-testing"],
  ["/lab-based-panels/:rest*", LAB_DRUG],
  ["/lab-based-panels-:n/:rest*", LAB_DRUG],
  ["/copy-of-lab-based-panels", LAB_DRUG],
  ["/copy-of-lab-based-panels-:n/:rest*", LAB_DRUG],
  ["/copy-2-of-lab-based-panels", LAB_DRUG],
  ["/copy-:k-of-lab-based-panels-:n/:rest*", LAB_DRUG],
  ["/lab-based-tests/:rest*", "/services/drug-and-alcohol-testing"],
  ["/copy-of-drug-and-alcohol-testing-1", "/services/drug-and-alcohol-testing"],
  ["/hair-drug-testing/:rest*", "/services/hair-drug-testing"],
  ["/hair-description/:rest*", "/services/hair-drug-testing"],
  ["/hair-description-:n/:rest*", "/services/hair-drug-testing"],
  ["/oral-fluid-collection/:rest*", "/services/oral-fluid-testing"],
  ["/mobile-drug-testing", "/services/mobile-drug-testing"],
  ["/respiratory-testing/:rest*", "/respiratory-fit-testing"],
  ["/physicals/:rest+", "/physicals"],
  ["/testology-labs/:rest+", "/testology-labs"],

  // Blood work and health screenings
  ["/immunity-panel/:rest*", "/blood-profiles/immunity-panels"],
  ["/copy-of-immunity-panel/:rest*", "/blood-profiles/immunity-panels"],
  ["/copy-of-immunity-panel-1/:rest*", "/blood-profiles/immunity-panels"],
  ["/copy-:k-of-immunity-panel-:n/:rest*", "/blood-profiles/immunity-panels"],
  ["/specialty-blood-panels/:rest*", "/blood-profiles/specialty-panels"],
  ["/copy-of-specialty-blood-panels/:rest*", "/blood-profiles/specialty-panels"],
  ["/annual-health-screen-panels", "/blood-profiles"],
  ["/annual-health-screenings", "/blood-profiles"],
  ["/annual-health-screenings-:n/:rest*", "/blood-profiles"],
  ["/copy-of-annual-health-screenings-:n/:rest*", "/blood-profiles"],
  ["/copy-:k-of-annual-health-screenings/:rest*", "/blood-profiles"],
  ["/copy-:k-of-annual-health-screenings-:n/:rest*", "/blood-profiles"],
  ["/copy-2-of-annual-health-screenings-/:rest*", "/blood-profiles"],
  ["/health-screenings", "/blood-profiles"],
  ["/service-page/blood-tests", "/blood-profiles"],
  ["/copy-of-semaglutide-panel", "/catalog/drugs"],
  ["/copy-of-semaglutide-panel-1", "/catalog/drugs"],
  ["/copy-of-semaglutide-panel-desc", "/catalog/drugs"],
  ["/copy-of-semaglutide-panel-desc-1", "/catalog/drugs"],
  ["/copy-of-peptide-male-panel", "/catalog/drugs"],
  ["/copy-of-peptide-male-panel-desc", "/catalog/drugs"],
  ["/copy-of-peptide-male-panel-desc-1", "/catalog/drugs"],
  ["/peptide-male-panel-description", "/catalog/drugs"],
  // Individual blood panel pages (STD, cancer, cardio, hormones, nutrition, …) → Blood Profiles. (The blood panel
  // and peptide catalogs are offline; old peptide pages go to the drug testing catalog.)
  ...[
    "/basic-cancer-panel-female", "/basic-std-panel", "/basic-std-desc/:rest*", "/cancer-panels", "/cancer-testing",
    "/comprehensive-std-panel", "/desc-pages/:rest*", "/desc-pages-:n/:rest*", "/diabetes-testing-panels",
    "/food-allergy-sensitivity-panels", "/heart-health-panels", "/hormone-panels", "/immigration-screening-panel",
    "/male-initial-panel", "/nutrients-deficeiency-panels", "/std-panels", "/general-5", "/general-5-1",
    "/copy-of-4x-cortisol-17-ohp-dhea-pane", "/copy-of-4x-cortisol-17-ohp-dhea-panel", "/copy-of-basic-cancer-panel-female",
    "/copy-of-basic-cancer-panel-male-1", "/copy-of-basic-std-panel-1", "/copy-of-cardio-pro-advanced",
    "/copy-of-cardio-pro-advanced-desc", "/copy-of-cardio-pro-basic", "/copy-of-cardio-pro-basic-1",
    "/copy-of-cardio-pro-basic-desc", "/copy-of-comprehensive-femal-panel-des", "/copy-of-comprehensive-female-panel",
    "/copy-of-comprehensive-male-panel", "/copy-of-comprehensive-male-panel-desc", "/copy-of-comprehensive-male-panel-desc-1",
    "/copy-of-comprehensive-plus-female", "/copy-of-comprehensive-plus-male", "/copy-of-comprehensive-plus-male-descr",
    "/copy-of-diabetes-testing", "/copy-of-fdsn-desc", "/copy-of-fdsn-food-analyzer-igg-food",
    "/copy-of-fdsn-food-analyzer-igg-food-1", "/copy-of-female-hormone-a-panel", "/copy-of-female-hormone-b-panel",
    "/copy-of-female-hormone-b-panel-desc", "/copy-of-heart-health", "/copy-of-heart-health-1", "/copy-of-hormones-testing-2",
    "/copy-of-initial-female-panel", "/copy-of-initial-female-panel-description", "/copy-of-initial-male-panel",
    "/copy-of-initial-male-panel-1", "/copy-of-initial-male-panel-2", "/copy-of-initial-male-panel-3",
    "/copy-of-initial-male-panel-description", "/copy-of-male-hormone-a-panel", "/copy-of-male-hormone-a-panel-desc-2",
    "/copy-of-moms", "/copy-of-nutritional-metals-desc", "/copy-of-nutritional-metals-urine-panel",
    "/copy-of-saliva-hormone-deluxe", "/copy-of-saliva-hormone-supreme", "/copy-of-std", "/copy-of-std-1",
  ].map((source): [string, string] => [source, "/blood-profiles"]),

  // Wix bookings services
  ["/service-page/physicals", "/physicals"],
  ["/service-page/doctor-examination", "/physicals"],
  ["/service-page/flu-shots-vaccinations", "/vaccines"],
  ["/service-page/travel-vaccines", "/vaccines"],
  ["/service-page/occupational-health", "/employer-solutions"],
  ["/service-page/urgent-care", "/contact"],
  ["/service-page/x-rays-lab-test", "/contact"],

  // Duplicates and leftovers from Wix templates
  ["/category/all-products", "/catalog/drugs"],
  ["/copy-of-contact", "/contact"],
  ["/inquiry-services-page", "/contact"],
  ["/copy-of-employer-solutions", "/employer-solutions"],
  ["/copy-of-partnered-labs", "/partnered-labs"],
  ["/copy-of-special-monthly-offer", "/catalog/drugs"],
  ["/projects-1/:rest*", "/"],
];

export function legacyRedirects(): Redirect[] {
  return [
    ...productRedirects.map(([product, destination]) => [`/product-page/${product}`, destination] as const),
    ...rapidProducts.map(
      (code) => [`/product-page/rapid-${code}`, panelIds.has(`ecup-${code}`) ? panel(`ecup-${code}`) : ECUP] as const,
    ),
    ["/product-page/:rest*", "/catalog/drugs"] as const,
    ...panelPageRedirects,
    ...pageRedirects,
  ].map(([source, destination]) => ({ source, destination, permanent: true }));
}
