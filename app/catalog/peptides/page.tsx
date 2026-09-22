import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { ExternalLink, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Peptide Catalog | Testology, Inc.",
  description:
    "Browse our clinical peptide catalog for research and wellness purposes, under provider guidance.",
};

const CATALOG_URL = "https://testology-menu.netlify.app/peptide_catalog";

export default function PeptideCatalogPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Live catalog"
        title="Clinical peptide catalog"
        tagline="Research & wellness peptides"
        intro="Browse our full peptide catalog below. This updates automatically whenever we add or change offerings — no need to check back here for a separate version."
      />

      <section className="container-wide pt-8">
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            Peptides are for research and wellness purposes. Not FDA-approved for most uses. Use
            only under the guidance of a qualified healthcare provider.
          </p>
        </div>
      </section>

      <section className="container-wide pb-10">
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
            title="Testology Peptide Catalog"
            className="h-[900px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}