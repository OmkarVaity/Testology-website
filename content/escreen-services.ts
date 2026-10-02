// eScreen services Testology can order at network clinics, transcribed from the "NON DOT Tests" and
// "HEALTH-ESCREEN SERVICES" sections of the eScreen order screen. Panel codes and names are kept exactly as
// eScreen shows them, so an order placed from this catalog maps 1:1 to eScreen's form.
//
// DOT-regulated drug and alcohol tests aren't listed: under 49 CFR Part 40 they're ordered by the employer
// (or its TPA/consortium), not by individuals. DOT *physicals* are listed — drivers book those themselves.
import type { Clinic } from "./clinics";

/**
 * Where a service can be performed, in terms of the clinic statuses from eScreen's locator.
 * NOTE: these rules are our working assumptions until eScreen confirms them (see `capabilityConfirmed`).
 */
export type ClinicCapability = "onsite" | "onsiteOrLab" | "physicals";

export const capabilityMeta: Record<ClinicCapability, { label: string; matches: (clinic: Clinic) => boolean }> = {
  onsite: {
    label: "eScreen on-site clinics",
    matches: (c) => c.statuses.includes("installed") || c.statuses.includes("installedPremium"),
  },
  onsiteOrLab: {
    label: "eScreen on-site clinics and lab partner sites",
    matches: (c) =>
      c.statuses.includes("installed") || c.statuses.includes("installedPremium") || c.statuses.includes("electronicChain"),
  },
  physicals: {
    label: "clinics that perform physicals",
    matches: (c) => c.statuses.includes("ePhysical"),
  },
};

export type ServiceCategory = "drug" | "alcohol" | "health";

export const serviceCategoryMeta: Record<ServiceCategory, { title: string; intro: string }> = {
  drug: {
    title: "Drug tests",
    intro: "Non-DOT drug screens for pre-employment, personal, legal and workplace testing.",
  },
  alcohol: {
    title: "Alcohol tests",
    intro: "Non-DOT breath alcohol testing.",
  },
  health: {
    title: "Physicals & occupational health",
    intro: "Exams and screenings employers request for hiring, safety programs and respirator use.",
  },
};

export type ServicePanel = {
  /** eScreen's code, e.g. "1200" or "H5PEO". */
  code: string;
  /** eScreen's panel name, e.g. "5 PANEL STANDARD". */
  name: string;
  /** Shown up front; the rest sit behind "all panel options". */
  popular?: boolean;
};

export type EscreenService = {
  id: string;
  category: ServiceCategory;
  /** Customer-facing name. */
  name: string;
  /** The checkbox label on eScreen's order screen. */
  escreenName: string;
  description: string;
  specimen?: "Urine" | "Hair" | "Oral fluid" | "Breath";
  performedAt: ClinicCapability;
  /** False until eScreen confirms which clinic types offer this service. */
  capabilityConfirmed: boolean;
  /** Panels for services with a "Select Panel" dropdown, or the individual options for grouped services. */
  panels?: ServicePanel[];
  /** eScreen's preselected panel. */
  defaultPanel?: string;
  /** Existing Testology page with more detail, if any. */
  learnMoreHref?: string;
};

const ecupPanels: [string, string][] = [
  ["3265", "eCup+ 10"], ["3125", "eCup+ 10A"], ["1396", "eCup+ 10B"], ["1441", "eCup+ 10D"], ["4335", "eCup+ 10E"],
  ["4413", "eCup+ 10F"], ["5279", "eCup+ 10G"], ["5316", "eCup+ 10H"], ["5317", "eCup+ 10I"], ["6962", "eCup+ 10J"],
  ["7194", "eCup+ 10K"], ["5451", "eCup+ 10L"], ["5520", "eCup+ 10M"], ["6654", "eCup+ 11A"], ["1692", "eCup+ 11B"],
  ["8263", "eCup+ 11C"], ["8639", "eCup+ 11D"], ["5318", "eCup+ 11E"], ["6982", "eCup+ 11F"], ["6652", "eCup+ 12A"],
  ["6653", "eCup+ 12B"], ["8641", "eCup+ 12D"], ["6651", "eCup+ 13A"], ["4045", "eCup+ 4A"], ["1687", "eCup+ 4B"],
  ["1200", "eCup+ 5A"], ["4063", "eCup+ 5B"], ["1385", "eCup+ 5C"], ["1389", "eCup+ 5D"], ["4278", "eCup+ 5E"],
  ["3413", "eCup+ 6"], ["3121", "eCup+ 6A"], ["4539", "eCup+ 6B"], ["2537", "eCup+ 6C"], ["1702", "eCup+ 6D"],
  ["6631", "eCup+ 6E"], ["1792", "eCup+ 6F"], ["8951", "eCup+ 6G"], ["4363", "eCup+ 6H"], ["5311", "eCup+ 6I"],
  ["4166", "eCup+ 6J"], ["1773", "eCup+ 6K"], ["3279", "eCup+ 7"], ["1735", "eCup+ 7A"], ["3122", "eCup+ 7B"],
  ["7128", "eCup+ 7C"], ["1221", "eCup+ 7D"], ["8861", "eCup+ 7E"], ["2259", "eCup+ 7F"], ["1261", "eCup+ 7G"],
  ["1256", "eCup+ 7H"], ["5313", "eCup+ 7I"], ["2480", "eCup+ 7J"], ["3278", "eCup+ 8"], ["6656", "eCup+ 8A"],
  ["3123", "eCup+ 8B"], ["6797", "eCup+ 8C"], ["1203", "eCup+ 8D"], ["3314", "eCup+ 8E"], ["4653", "eCup+ 8F"],
  ["5314", "eCup+ 8G"], ["2463", "eCup+ 8H"], ["8952", "eCup+ 8I"], ["3477", "eCup+ 9A"], ["3277", "eCup+ 9C"],
  ["3124", "eCup+ 9D"], ["2928", "eCup+ 9E"], ["6655", "eCup+ 9F"], ["1410", "eCup+ 9G"], ["1255", "eCup+ 9H"],
  ["1666", "eCup+ 9J"], ["8756", "eCup+ 9K"], ["8940", "eCup+ 9L"], ["1297", "eCup+ 9M"], ["5315", "eCup+ 9N"],
  ["8921", "eCup+ 9O"], ["6622", "eCup+ 9P"], ["5590", "eCup+ 9Q"],
];

const labUrinePanels: [string, string][] = [
  ["1200", "5 PANEL STANDARD"],
  ["1203", "7 PANEL STANDARD"],
  ["1204", "10 PANEL STANDARD"],
  ["1205", "9 PANEL STANDARD"],
  ["1207", "9DSP/EXP OPI2000/UALC/PHN"],
  ["1208", "10DSP/EXP OPI2000/UALC/PHN"],
  ["1219", "10DSP/EXP OPI2000/MEP/PHN"],
  ["1220", "10DSP/EXP OPI2000/ECS/PHN"],
  ["1222", "10DSP/EXP OPI2000/6AM/ECS/OXY/PHN"],
  ["1245", "10DSP/EXP OPI2000/OXY/MEP/FENT/PHN"],
  ["1249", "10DSP/EXP OPI2000//OXY100/FENT1/TRAM100/MEP100/PHN"],
  ["1365", "5DSP/EXP OPI2000/PHN"],
  ["1380", "5DSP/EXP OPI2000/UALC/PHN"],
  ["1381", "5DSP/EXP OPI/ETG1000/PHN"],
  ["1383", "10DSP/UALC/ECS/PHN"],
  ["1384", "7DSP/EXP OPI2000/UALC0.04/PHN"],
  ["1444", "5DSP/K2/PHN"],
  ["1448", "9DSP/EXP OPI2000/K2/PHN"],
  ["1455", "10DSP/EXP OPI2000/K2/PHN"],
  ["1637", "7DSP/EXP OPI/ETG/PHN"],
  ["1687", "4DSP/OPA/PHN"],
  ["2855", "Mitragynine (Kratom)"],
  ["3436", "10DSP/ETG/PHN"],
  ["3499", "HHS DOT Mirror Additional Fees Apply"],
  ["4060", "10DSP/EXP OPI/CUST LVLS/OXY/FENT/BUP/TRAM/MEP/PHN"],
  ["541", "ETG/ETS 500/500"],
  ["6781", "10DSP/EXP OPI/OXY/ECS/BUP/UALC/FEN/MEP/TRAM/PHN"],
  ["7182", "10DSP/EXP OPI/FENT/PHN"],
  ["912", "Synthetic THC (K2)"],
  ["922", "Bath Salts (Designer Stimulants)"],
  ["936", "Redwood Steroid Panel"],
];

const hairPanels: [string, string][] = [
  ["H5PEO", "5 Panel Standard Hair/EXP OPI"],
  ["H7P", "7 Panel Hair/EXP OPI"],
  ["H10P", "10 Panel Hair/EXP OPI"],
  ["H13P", "13 Panel Hair/EXP OPI (Oil & Energy Panel)"],
  ["H17P", "17 Panel Hair/EXP OPI"],
  ["H18P", "18 Panel Hair/EXP OPI/BATH SALTS"],
];

const oralFluidPanels: [string, string][] = [
  ["6010", "6DR OPIHY/OXCD/6AM ORAL QUANTISAL"],
  ["6020", "6DR OPIHY/OXCD ORAL QUANTISAL"],
  ["6021", "6DR OPIHY ORAL QUANTISAL"],
  ["6022", "5DR OPIHY (NO THC) ORAL QUANTISAL"],
  ["6023", "5DR OPA ORAL QUANTISAL"],
  ["6024", "6DR OPA ORAL QUANTISAL"],
  ["6027", "7DR OPIHY/NO BRB ORAL QUANTISAL"],
  ["6028", "5DR OPIHY ORAL QUANTISAL"],
  ["6030", "6DR OPIHY/ETOH ORAL QUANTISAL"],
  ["6031", "9DR OPIHY ORAL QUANTISAL"],
  ["6032", "8DR OPIHY/NO THC ORAL QUANTISAL"],
  ["6034", "8DR OPIHY ORAL QUANTISAL"],
  ["6035", "7DR OPIHY/NO THC,BNZ ORAL QUANTISAL"],
  ["6036", "9DR OPIHY/BUP ORAL QUANTISAL"],
  ["6037", "8DR OPIHY/BUP ORAL QUANTISAL"],
  ["6039", "7DR OPIHY/NO THC ORAL QUANTISAL"],
  ["6041", "7DR OPIHY ORAL QUANTISAL"],
  ["6042", "9DR OPIHY/BUP/NO THC ORAL QUANTISAL"],
  ["6043", "9DR OPIHY/ETOH ORAL QUANTISAL"],
  ["6044", "COTININE ORAL QUANTISAL"],
  ["6045", "9DR OPIHY/COT ORAL QUANTISAL"],
  ["6046", "6DR OPIHY/COT ORAL QUANTISAL"],
  ["6047", "8DR OPIHY/COT ORAL QUANTISAL"],
  ["6048", "5DR OPIHY/6AM ORAL QUANTISAL"],
  ["6049", "9DR OPA/OXY ORAL QUANTISAL"],
  ["6051", "THC ORAL QUANTISAL"],
  ["6052", "10DR OPA/OXY ORAL QUANTISAL"],
  ["6053", "10DR OPIHY/OXCD ORAL QUANTISAL"],
];

const toPanels = (rows: [string, string][], popular: string[] = []): ServicePanel[] =>
  rows.map(([code, name]) => ({ code, name, ...(popular.includes(code) ? { popular: true } : {}) }));

export const escreenServices: EscreenService[] = [
  // ---- Drug tests ----
  {
    id: "lab-urine-drug-test",
    category: "drug",
    name: "Lab-based urine drug test",
    escreenName: "Lab Based Urine Collection",
    description:
      "A urine specimen collected at the clinic and sent to a certified lab. The most widely accepted option for pre-employment and workplace testing, with panels from a standard 5-panel to expanded opiates, fentanyl, alcohol (EtG) and synthetic drugs.",
    specimen: "Urine",
    performedAt: "onsiteOrLab",
    capabilityConfirmed: false,
    panels: toPanels(labUrinePanels, ["1200", "1203", "1205", "1204"]),
    defaultPanel: "1200",
    learnMoreHref: "/services/drug-and-alcohol-testing",
  },
  {
    id: "ecup-rapid-urine-screen",
    category: "drug",
    name: "eCup+ rapid urine screen",
    escreenName: "eCup+ urine rapid screen",
    description:
      "eScreen's rapid urine cup, read at the clinic for a faster screening result. Non-negative screens are sent to a lab for confirmation.",
    specimen: "Urine",
    performedAt: "onsite",
    capabilityConfirmed: false,
    panels: toPanels(ecupPanels, ["3265"]),
    defaultPanel: "3265",
    learnMoreHref: "/services/rapid-drug-testing",
  },
  {
    id: "onsite-cup-drug-test",
    category: "drug",
    name: "On-site cup drug test (mCup / iCup)",
    escreenName: "mCup / iCup on site drug test",
    description: "An instant-read urine cup test performed at the clinic.",
    specimen: "Urine",
    performedAt: "onsite",
    capabilityConfirmed: false,
    // Separate checkboxes on eScreen's form; grouped here as options of one test.
    panels: [
      { code: "mCup 10A", name: "mCup 10A on site drug test" },
      { code: "mCup 11A", name: "mCup 11A on site drug test" },
      { code: "mCup 9A", name: "mCup 9A on site drug test" },
      { code: "iCup 12", name: "Urine iCup 12 Panel (I-DUE-1127-022)", popular: true },
      { code: "iCup 5", name: "Urine iCup 5 Panel (I-DUA-157-013)", popular: true },
    ],
    defaultPanel: "iCup 5",
  },
  {
    id: "hair-drug-test",
    category: "drug",
    name: "Hair drug test",
    escreenName: "Hair",
    description:
      "A small hair sample sent to a lab. Hair testing looks back further than urine — typically around 90 days — which is why some employers prefer it.",
    specimen: "Hair",
    performedAt: "onsiteOrLab",
    capabilityConfirmed: false,
    panels: toPanels(hairPanels, ["H5PEO", "H10P"]),
    defaultPanel: "H5PEO",
    learnMoreHref: "/services/hair-drug-testing",
  },
  {
    id: "oral-fluid-drug-test",
    category: "drug",
    name: "Oral fluid drug test",
    escreenName: "Oral fluid collection for drug test",
    description:
      "A mouth swab (Quantisal) collected under observation and sent to a lab. Hard to adulterate, and well suited to recent-use testing.",
    specimen: "Oral fluid",
    performedAt: "onsite",
    capabilityConfirmed: false,
    panels: toPanels(oralFluidPanels, ["6021"]),
    defaultPanel: "6021",
    learnMoreHref: "/services/oral-fluid-testing",
  },

  // ---- Alcohol ----
  {
    id: "breath-alcohol-test",
    category: "alcohol",
    name: "Breath alcohol test",
    escreenName: "Breath alcohol test",
    description: "A breath alcohol test performed by a trained technician at the clinic, with results on the spot.",
    specimen: "Breath",
    performedAt: "onsite",
    capabilityConfirmed: false,
  },

  // ---- Physicals & occupational health ----
  {
    id: "dot-physical",
    category: "health",
    name: "DOT physical",
    escreenName: "DOT Physical",
    description:
      "The FMCSA medical exam commercial drivers need for their medical examiner's certificate, performed by a certified medical examiner.",
    performedAt: "physicals",
    capabilityConfirmed: false,
    learnMoreHref: "/physicals",
  },
  {
    id: "non-dot-physical",
    category: "health",
    name: "Non-DOT physical",
    escreenName: "Non-DOT Physical",
    description: "A general employment physical for jobs that require a medical exam but aren't DOT-regulated.",
    performedAt: "physicals",
    capabilityConfirmed: false,
    learnMoreHref: "/physicals",
  },
  {
    id: "non-dot-physical-physician-statement",
    category: "health",
    name: "Non-DOT physical with physician's statement",
    escreenName: "NonDOT Physical and Physician's Statement",
    description: "A non-DOT physical plus a signed physician's statement for employers that need written clearance.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "body-metrics",
    category: "health",
    name: "Body metrics",
    escreenName: "Body Metrics",
    description: "Basic health measurements such as height, weight and blood pressure.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "lift-test",
    category: "health",
    name: "Lift test",
    escreenName: "Lift Test",
    description: "A functional test of safe lifting ability for physically demanding jobs.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "lift-test-level-2",
    category: "health",
    name: "Lift test, level 2",
    escreenName: "Lift Test Level 2",
    description: "A more demanding level of the functional lift test.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "osha-respirator-questionnaire",
    category: "health",
    name: "OSHA respirator questionnaire",
    escreenName: "OSHA Respirator Questionnaire",
    description: "The OSHA medical evaluation questionnaire required before an employee wears a respirator.",
    performedAt: "physicals",
    capabilityConfirmed: false,
    learnMoreHref: "/respiratory-fit-testing",
  },
  {
    id: "pulmonary-function-test",
    category: "health",
    name: "Pulmonary function test",
    escreenName: "Pulmonary Function Test",
    description: "A breathing (spirometry) test of lung function, often part of respirator clearance.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "respirator-fit-test",
    category: "health",
    name: "Respirator fit test (qualitative)",
    escreenName: "Respirator Fit Test, Qualitative",
    description: "A taste- or smell-based check that a respirator seals properly on the wearer's face.",
    performedAt: "physicals",
    capabilityConfirmed: false,
    learnMoreHref: "/respiratory-fit-testing",
  },
  {
    id: "vision-test-snellen",
    category: "health",
    name: "Vision test — Snellen",
    escreenName: "Vision Test, Snellen",
    description: "The standard eye-chart test of distance vision.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "vision-test-jaeger",
    category: "health",
    name: "Vision test — Jaeger",
    escreenName: "Vision Test, Jaeger",
    description: "A near-vision reading test.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "vision-test-ishihara",
    category: "health",
    name: "Vision test — Ishihara",
    escreenName: "Vision Test, Ishihara",
    description: "A color vision test using numbered dot plates.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
  {
    id: "vision-test-titmus",
    category: "health",
    name: "Vision test — Titmus",
    escreenName: "Vision Test, Titmus",
    description: "A vision screener that checks several aspects of vision in one test.",
    performedAt: "physicals",
    capabilityConfirmed: false,
  },
];

export function getService(id: string | null | undefined): EscreenService | undefined {
  return id ? escreenServices.find((s) => s.id === id) : undefined;
}

export function clinicOffersService(clinic: Clinic, service: EscreenService): boolean {
  return capabilityMeta[service.performedAt].matches(clinic);
}
