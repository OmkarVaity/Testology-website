import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { PanelChip } from "@/components/sections/PanelChip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hair Drug Testing | Testology, Inc.",
  description:
    "Hair follicle drug testing detecting patterns of use up to 90 days back, available in Brighton, MA.",
};

const details = [
  {
    title: "Up to 90-day window",
    description:
      "A standard 1.5-inch hair sample can reflect a pattern of use going back roughly three months, far beyond what urine or oral fluid can show.",
  },
  {
    title: "Hard to defeat",
    description:
      "Unlike urine, hair samples are collected in view and aren't subject to the same substitution or dilution tactics.",
  },
  {
    title: "Best for patterns, not single events",
    description:
      "Hair testing shows a history of use rather than very recent use — pair it with oral fluid or urine if a recent event also needs to be captured.",
  },
];

export default function HairDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Long-window screening"
        title="Hair drug testing"
        intro="For roles or programs where a longer look-back matters more than same-day results, hair testing gives visibility into patterns of use over months, not days."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What makes hair testing different</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{detail.title}</h3>
              <p className="text-sm text-slate">{detail.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-4 font-display text-xl font-medium text-ink">Available panel</h2>
        <div className="flex flex-wrap gap-2">
          <PanelChip label="HAIR 5" variant="highlight" />
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Not sure if hair testing fits your policy?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            We can help you decide whether hair, oral fluid, or urine testing best matches what
            you're screening for.
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