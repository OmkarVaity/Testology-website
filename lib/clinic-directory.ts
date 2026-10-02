// Server-side index of the clinic list by state and city, for the SEO directory pages under
// /clinic-locator/[state] and /clinic-locator/[state]/[city]. Only imported by server components, so the
// full list never ships to the browser; pages hand their own clinics to client components as needed.
import clinicsData from "@/content/clinics.json";
import { decodeClinic, encodeClinic, type Clinic, type ClinicRecord } from "@/content/clinics";
import { haversineMiles } from "@/lib/geo";

/**
 * A city gets its own page only with at least this many clinics. Thinner pages would be near-duplicates
 * ("doorway pages", which search engines penalize); those clinics are listed on their state page instead.
 */
export const CITY_PAGE_MIN_CLINICS = 5;

export const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado",
  CT: "Connecticut", DE: "Delaware", DC: "District of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii",
  ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", PR: "Puerto Rico", VI: "U.S. Virgin Islands",
  GU: "Guam", MP: "Northern Mariana Islands", AS: "American Samoa",
};

export type ClinicStats = { total: number; onsite: number; lab: number; physicals: number };

export type CityGroup = {
  slug: string;
  name: string;
  stateAbbr: string;
  stateSlug: string;
  clinics: Clinic[];
  center: { lat: number; lng: number } | null;
  hasPage: boolean;
};

export type StateGroup = {
  abbr: string;
  slug: string;
  name: string;
  clinics: Clinic[];
  /** Every city in the state, most clinics first. */
  cities: CityGroup[];
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** "St. Louis" and "Saint Louis", "Mt Airy" and "Mount Airy" are the same city. */
function citySlug(city: string): string {
  const expanded = city
    .toLowerCase()
    .replace(/\bmt\.?(?=\s)/g, "mount")
    .replace(/\bft\.?(?=\s)/g, "fort")
    .replace(/\bst\.?(?=\s)/g, "saint");
  return slugify(expanded);
}

/** The spelling most of a city's clinics use, preferring the longer form on a tie ("Saint" over "St"). */
function displayName(spellings: string[]): string {
  const counts = new Map<string, number>();
  for (const s of spellings) counts.set(s, (counts.get(s) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0][0];
}

function centerOf(clinics: Clinic[]): { lat: number; lng: number } | null {
  const located = clinics.filter((c) => c.lat !== null && c.lng !== null && !c.approx);
  const points = located.length ? located : clinics.filter((c) => c.lat !== null && c.lng !== null);
  if (!points.length) return null;
  return {
    lat: points.reduce((sum, c) => sum + c.lat!, 0) / points.length,
    lng: points.reduce((sum, c) => sum + c.lng!, 0) / points.length,
  };
}

const byName = (a: Clinic, b: Clinic) => Number(!!b.featured) - Number(!!a.featured) || a.name.localeCompare(b.name);

function buildIndex() {
  const clinics = (clinicsData as ClinicRecord[]).map((record) => decodeClinic(encodeClinic(record)));

  const byState = new Map<string, Clinic[]>();
  for (const clinic of clinics) {
    if (!STATE_NAMES[clinic.state]) continue;
    (byState.get(clinic.state) ?? byState.set(clinic.state, []).get(clinic.state)!).push(clinic);
  }

  const states: StateGroup[] = [...byState.entries()]
    .map(([abbr, stateClinics]) => {
      const slug = slugify(STATE_NAMES[abbr]);
      const byCity = new Map<string, Clinic[]>();
      for (const clinic of stateClinics) {
        const key = citySlug(clinic.city);
        (byCity.get(key) ?? byCity.set(key, []).get(key)!).push(clinic);
      }
      const cities: CityGroup[] = [...byCity.entries()]
        .map(([citySlugValue, cityClinics]) => ({
          slug: citySlugValue,
          name: displayName(cityClinics.map((c) => c.city)),
          stateAbbr: abbr,
          stateSlug: slug,
          clinics: [...cityClinics].sort(byName),
          center: centerOf(cityClinics),
          hasPage: cityClinics.length >= CITY_PAGE_MIN_CLINICS,
        }))
        .sort((a, b) => b.clinics.length - a.clinics.length || a.name.localeCompare(b.name));
      return { abbr, slug, name: STATE_NAMES[abbr], clinics: [...stateClinics].sort(byName), cities };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return { clinics, states, stateBySlug: new Map(states.map((s) => [s.slug, s])) };
}

let index: ReturnType<typeof buildIndex> | null = null;
const getIndex = () => (index ??= buildIndex());

export function getAllStates(): StateGroup[] {
  return getIndex().states;
}

export function getState(stateSlug: string): StateGroup | undefined {
  return getIndex().stateBySlug.get(stateSlug);
}

export function getCity(stateSlug: string, citySlugValue: string): CityGroup | undefined {
  return getState(stateSlug)?.cities.find((c) => c.slug === citySlugValue && c.hasPage);
}

export function getAllCityPages(): CityGroup[] {
  return getAllStates().flatMap((s) => s.cities.filter((c) => c.hasPage));
}

export function getTotalClinicCount(): number {
  return getIndex().clinics.length;
}

export function statsFor(clinics: Clinic[]): ClinicStats {
  return {
    total: clinics.length,
    onsite: clinics.filter((c) => c.statuses.includes("installed") || c.statuses.includes("installedPremium")).length,
    lab: clinics.filter((c) => c.statuses.includes("electronicChain")).length,
    physicals: clinics.filter((c) => c.statuses.includes("ePhysical")).length,
  };
}

/** Other city pages closest to this one, across state lines (e.g. Kansas City, MO ↔ Kansas City, KS). */
export function nearbyCityPages(city: CityGroup, limit = 8, maxMiles = 150): (CityGroup & { miles: number })[] {
  if (!city.center) return [];
  return getAllCityPages()
    .filter((other) => other !== city && other.center)
    .map((other) => ({ ...other, miles: haversineMiles(city.center!, other.center!) }))
    .filter((other) => other.miles <= maxMiles)
    .sort((a, b) => a.miles - b.miles)
    .slice(0, limit);
}

export function statePath(state: { slug: string }): string {
  return `/clinic-locator/${state.slug}`;
}

export function cityPath(city: CityGroup): string {
  return `/clinic-locator/${city.stateSlug}/${city.slug}`;
}
