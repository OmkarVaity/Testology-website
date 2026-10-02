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

/**
 * Geocodes a free-text address/zip via OpenStreetMap's Nominatim, biased to the US.
 * Client-side only — Nominatim's usage policy caps this at light, ad-hoc use.
 */
export async function geocodeAddress(query: string): Promise<GeocodeResult | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=us&q=${encodeURIComponent(
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
