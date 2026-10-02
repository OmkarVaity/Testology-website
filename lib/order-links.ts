// Kept separate from lib/ordering.ts so pages that only link into the order flow (locator, map, directory)
// don't pull the order schema and zod into their bundles.

/**
 * Shows the /order flow and "Order" entry points across the site. Always on in `next dev`; off in production
 * builds until the order database is connected and NEXT_PUBLIC_ORDERING_ENABLED=true is set.
 */
export const ORDERING_ENABLED =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_ORDERING_ENABLED === "true";

/** Link into the order flow with a clinic (and optionally a test) preselected. */
export function orderUrl(clinicId?: string, serviceId?: string): string {
  const params = new URLSearchParams();
  if (serviceId) params.set("service", serviceId);
  if (clinicId) params.set("clinic", clinicId);
  const qs = params.toString();
  return qs ? `/order?${qs}` : "/order";
}
