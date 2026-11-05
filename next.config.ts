import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  // Old Wix URLs → their new pages (permanent 308s), so search rankings and bookmarks survive the move.
  async redirects() {
    return [
      // The blood panel and peptide catalogs are offline for now, and with only the drug catalog left the
      // /catalog hub page was removed too. Temporary (307) redirects, so search engines don't treat it as a
      // permanent move in case they come back (their pages are in git history).
      { source: "/catalog", destination: "/catalog/drugs", permanent: false },
      { source: "/catalog/panels", destination: "/blood-profiles", permanent: false },
      { source: "/catalog/peptides", destination: "/catalog/drugs", permanent: false },
      ...legacyRedirects(),
    ];
  },
};

export default nextConfig;
