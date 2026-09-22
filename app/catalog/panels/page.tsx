import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Blood Panel Catalog | Testology, Inc.",
  description:
    "Browse our full blood panel catalog — wellness, hormone, and diagnostic panels with pricing.",
};

const CATALOG_URL = "https://testology-menu.netlify.app/testology-panel-catalog";

export default function PanelCatalogPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Live catalog"
        title="Blood panel catalog"
        tagline="Wellness, hormone & diagnostic panels"
        intro="Browse our full panel catalog below. This updates automatically whenever we add or change panels — no need to check back here for a separate version."
      />

      <section className="container-wide py-10">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Having trouble viewing the catalog below?
          </p>
          <a
            href={CATALOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Open full catalog in new tab
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <iframe
            src={CATALOG_URL}
            title="Testology Blood Panel Catalog"
            className="h-[900px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}