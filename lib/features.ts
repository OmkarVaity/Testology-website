// Launch switches for features that are built but not live yet. Everything is on in `next dev`; in production
// a feature appears only when its environment variable is set to "true" in the hosting settings — no code
// change needed to launch it.
//
//   NEXT_PUBLIC_FEATURE_CLINIC_LOCATOR=true   clinic locator, state/city clinic pages, eScreen services page
//   NEXT_PUBLIC_FEATURE_BUY_NOW=true          "Buy now" request form on the drug catalog
//   NEXT_PUBLIC_ORDERING_ENABLED=true         full online order flow (see lib/order-links.ts)
//
// NEXT_PUBLIC_ values are baked in at build time, so redeploy after changing them.
const dev = process.env.NODE_ENV === "development";

export const features = {
  clinicLocator: dev || process.env.NEXT_PUBLIC_FEATURE_CLINIC_LOCATOR === "true",
  buyNow: dev || process.env.NEXT_PUBLIC_FEATURE_BUY_NOW === "true",
} as const;
