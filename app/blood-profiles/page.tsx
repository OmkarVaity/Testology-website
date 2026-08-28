import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

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
      "Initial Male and Female Panels, plus hormone, wellness, and food sensitivity panels for a deeper look at overall health markers.",
    href: "/blood-profiles/specialty-panels",
  },
];

const faqs = [
  {
    question: "Do I need a doctor's order to get a blood panel?",
    answer:
      "For most of our wellness and specialty panels, no physician referral is required. Employment-required panels (like immunity titers) are typically requested by your employer or school directly.",
  },
  {
    question: "How long does a blood draw appointment take?",
    answer:
      "The draw itself takes just a few minutes, though blood draw and phlebotomy services are by appointment only — walk-ins aren't available for this service.",
  },
  {
    question: "How are results delivered?",
    answer:
      "Results are provided securely once processed. Turnaround depends on the specific panel and whether markers are analyzed in-house or sent to an outside lab.",
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
          {panelCategories.map((category, index) => (
            <Reveal key={category.href} delay={index * 80}>
              <Link
                href={category.href}
                className="block rounded-lg border border-slate/20 bg-white p-5 transition hover:border-slate/40 hover:shadow-sm"
              >
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">
                  {category.title}
                </h3>
                <p className="text-sm text-slate">{category.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-2 font-display text-xl font-medium text-ink">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate">
          What to know before scheduling a blood draw.
        </p>
        <Accordion items={faqs} />
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