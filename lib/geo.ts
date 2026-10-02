const EARTH_RADIUS_MILES = 3958.8;

export function haversineMiles(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_MILES * c;
}

export type GeocodeResult = {
  lat: number;
  lng: number;
  label: string;
};

const ZIP_PATTERN = /^(\d{5})(?:-\d{4})?$/;
const zipPrefixCache = new Map<string, Promise<Record<string, [number, number]>>>();

/**
 * Looks up a zip code's center in our own Census-derived table (served by /api/zip/[prefix]),
 * so the most common search never leaves the site.
 */
async function lookupZip(zip: string): Promise<GeocodeResult | null> {
  const prefix = zip.slice(0, 3);
  let table = zipPrefixCache.get(prefix);
  if (!table) {
    table = fetch(`/api/zip/${prefix}`).then((res) => (res.ok ? res.json() : {}));
    zipPrefixCache.set(prefix, table);
  }
  try {
    const point = (await table)[zip];
    return point ? { lat: point[0], lng: point[1], label: `zip code ${zip}` } : null;
  } catch {
    zipPrefixCache.delete(prefix);
    return null;
  }
}

/**
 * Geocodes a search: zip codes from our own table, anything else (city, street address) via
 * OpenStreetMap's Nominatim. Client-side only — Nominatim's usage policy caps it at light, ad-hoc use,
 * which is why zip codes are kept off it.
 */
export async function geocodeAddress(query: string): Promise<GeocodeResult | null> {
  const zip = query.trim().match(ZIP_PATTERN)?.[1];
  if (zip) {
    const local = await lookupZip(zip);
    if (local) return local;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=us,pr,vi,gu,mp,as&q=${encodeURIComponent(
    query,
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Location lookup failed. Please try again.");
  }

  const results: Array<{ lat: string; lon: string; display_name: string }> = await res.json();
  if (!results.length) {
    return null;
  }

  const [result] = results;
  return {
    lat: parseFloat(result.lat),
    lng: parseFloat(result.lon),
    label: result.display_name,
  };
}
