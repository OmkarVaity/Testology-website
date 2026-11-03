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
    return legacyRedirects();
  },
};

export default nextConfig;
