// Types and helpers shared by the clinic data route (server) and the clinic locator (browser).
// The clinic list itself lives in content/clinics.json and is served by app/api/clinics/route.ts, so the
// thousands of rows never end up in the page's JavaScript bundle.

export type ClinicStatus =
  | "installed"
  | "installedPremium"
  | "uninstalledInNetwork"
  | "electronicChain"
  | "outOfNetwork"
  | "ePhysical";

export type Clinic = {
  /** Derived from name + address + zip — chain names like "LabCorp" repeat, so name alone isn't unique. */
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  statuses: ClinicStatus[];
  lat: number | null;
  lng: number | null;
  /** Testology's own clinic — badged in the list and drawn as a larger teal pin on the map. */
  featured?: boolean;
  /** Placed at its zip code's center because the street address couldn't be geocoded. */
  approx?: boolean;
};

/** A row of content/clinics.json — everything except the derived id. */
export type ClinicRecord = Omit<Clinic, "id">;

export const clinicStatusMeta: Record<ClinicStatus, { label: string; badge: string; color: string }> = {
  installed: { label: "Installed", badge: "green", color: "#16a34a" },
  installedPremium: { label: "Installed $$$", badge: "green", color: "#16a34a" },
  uninstalledInNetwork: { label: "Uninstalled in Network", badge: "yellow", color: "#ca8a04" },
  electronicChain: { label: "Electronic Chain", badge: "green", color: "#16a34a" },
  outOfNetwork: { label: "Out of Network", badge: "red", color: "#dc2626" },
  ePhysical: { label: "ePhysical", badge: "green", color: "#16a34a" },
};

const STATUS_BITS = Object.keys(clinicStatusMeta) as ClinicStatus[];

/**
 * Wire format for /api/clinics: one array per clinic instead of an object, which roughly halves the payload.
 * [name, phone, address, city, state, zip, statusBitmask, lat, lng, flags] — flags: 1 = featured, 2 = approx.
 */
export type CompactClinic = [string, string, string, string, string, string, number, number | null, number | null, number];

export function encodeClinic(c: ClinicRecord): CompactClinic {
  const mask = c.statuses.reduce((bits, s) => bits | (1 << STATUS_BITS.indexOf(s)), 0);
  const round = (n: number | null) => (n === null ? null : Math.round(n * 1e5) / 1e5); // ~1 m precision
  const flags = (c.featured ? 1 : 0) | (c.approx ? 2 : 0);
  return [c.name, c.phone, c.address, c.city, c.state, c.zip, mask, round(c.lat), round(c.lng), flags];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function decodeClinic([name, phone, address, city, state, zip, mask, lat, lng, flags]: CompactClinic): Clinic {
  return {
    id: slugify(`${name}-${address}-${zip}`),
    name,
    phone,
    address,
    city,
    state,
    zip,
    statuses: STATUS_BITS.filter((_, bit) => mask & (1 << bit)),
    lat,
    lng,
    featured: (flags & 1) === 1 || undefined,
    approx: (flags & 2) === 2 || undefined,
  };
}

export function directionsUrl(clinic: Clinic): string {
  const destination = `${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zip}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
