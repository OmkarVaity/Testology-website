import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Profiles | Testology, Inc.",
  description:
    "Immunity panels and specialty blood panels for employment, wellness, and diagnostic needs in Brighton, MA.",
};

const panelCategories = [
  {
    title: "Immunity panels",
    description:
      "Check antibody titers for common vaccine-preventable illnesses — often required for healthcare, education, and childcare roles.",
    href: "/blood-profiles/immunity-panels",
  },
  {
    title: "Specialty blood panels",
    description:
      "Hormone, longevity, cardiac, and comprehensive wellness panels for a deeper look at overall health markers.",
    href: "/blood-profiles/specialty-panels",
  },
];

export default function BloodProfilesPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Lab-drawn panels"
        title="Blood profiles"
        intro="From employment-required immunity checks to broader wellness panels, our on-site lab handles the draw and routes samples to the right testing partner."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Choose a panel category</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {panelCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-lg border border-slate/20 bg-white p-5 transition hover:border-slate/40"
            >
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{category.title}</h3>
              <p className="text-sm text-slate">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Need a panel we haven&apos;t listed?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            We work with multiple lab partners and can usually source a specific panel even if
            it&apos;s not one of our standard offerings.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Ask us
          </Link>
        </div>
      </section>
    </>
  );
}