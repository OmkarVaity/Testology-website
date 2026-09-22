import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Droplet, FlaskConical, Dna, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Catalog & Pricing | Testology, Inc.",
  description:
    "Browse our live blood panel, drug testing, and peptide catalogs with up-to-date pricing.",
};

const catalogs = [
  {
    title: "Blood Panel Catalog",
    description:
      "Wellness, hormone, and diagnostic blood panels, including our Initial Male and Female Panels.",
    href: "/catalog/panels",
    icon: Droplet,
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Drug Testing Catalog",
    description:
      "5, 7, 9, and 10-panel urine screens, eCup+ instant panels, hair, and breath alcohol testing.",
    href: "/catalog/drugs",
    icon: FlaskConical,
    color: "from-teal-500 to-cyan-600",
  },
  {
    title: "Peptide Catalog",
    description:
      "Clinical peptides for research and wellness purposes, under provider guidance.",
    href: "/catalog/peptides",
    icon: Dna,
    color: "from-violet-500 to-purple-600",
  },
];

export default function CatalogHubPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Live pricing"
        title="Catalog & pricing"
        tagline="Browse our full test and panel offerings"
        intro="Our full catalogs are kept up to date automatically — browse blood panels, drug testing options, and peptides with current pricing and details."
      />

      <section className="container-wide py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {catalogs.map((catalog, index) => {
            const Icon = catalog.icon;
            return (
              <Reveal key={catalog.href} delay={index * 100}>
                <Link
                  href={catalog.href}
                  className="card-hover group block h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${catalog.color} shadow-lg transition-transform group-hover:rotate-3 group-hover:scale-110`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
                    {catalog.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">
                    {catalog.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                    Browse catalog
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}