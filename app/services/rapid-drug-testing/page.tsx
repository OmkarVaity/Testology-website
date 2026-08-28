import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { TestFinder } from "@/components/sections/TestFinder";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Rapid Drug Testing | Testology, Inc.",
  description:
    "Instrument-read eCup+ drug screening with results in as little as 15 minutes. Walk-ins welcome at our Brighton, MA clinic.",
};

const details = [
  {
    title: "Instrument-read, not eyeballed",
    description:
      "Your sample is screened by an eReader device rather than a person visually interpreting a test strip — removing the human-error risk that comes with older instant-cup formats.",
  },
  {
    title: "Results in about 15 minutes",
    description:
      "Negative results are available in roughly 15 minutes, compared to the multi-day wait typical of lab-based-only testing.",
  },
  {
    title: "THC-exclusion panels available",
    description:
      "Panels can be configured to exclude marijuana where state law restricts adverse action based on a positive THC result.",
  },
  {
    title: "Non-negatives go to a certified lab",
    description:
      "Any non-negative screen is automatically sent to a SAMHSA-certified laboratory for confirmatory testing before any result is finalized.",
  },
];

const faqs = [
  {
    question: "Is a rapid result the same as a final result?",
    answer:
      "A negative result is final. A non-negative screen is preliminary and is automatically sent to a SAMHSA-certified lab for confirmation before it's reported as a final result.",
  },
  {
    question: "Can this panel exclude marijuana?",
    answer:
      "Yes — we can configure a THC-exclusion panel for employers in jurisdictions where adverse action based solely on a positive THC result is restricted by state law.",
  },
  {
    question: "How is this different from a standard instant cup?",
    answer:
      "Standard instant cups rely on a person visually reading a test strip. Our eCup+ system uses an instrument (an eReader) to screen the strip digitally, removing that subjective step.",
  },
];

export default function RapidDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Instrument-read screening"
        title="Rapid drug testing"
        intro="Our eCup+ system pairs a self-contained collection device with an instrument-read eReader — giving you a fast, consistent result without a person interpreting a test strip by eye."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="mb-6 font-display text-xl font-medium text-ink">What makes it different</h2>
            <div className="space-y-6">
              {details.map((detail, index) => (
                <Reveal key={detail.title} delay={index * 80}>
                  <div>
                    <h3 className="mb-1 font-display text-base font-medium text-ink">
                      {detail.title}
                    </h3>
                    <p className="text-sm text-slate">{detail.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={160}>
            <TestFinder />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-2 font-display text-xl font-medium text-ink">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate">
          What to know about how a rapid result differs from a final one.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Need it confirmed for compliance?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            If your result needs to hold up for DOT or employer compliance purposes, we can pair
            rapid screening with lab-confirmed follow-up in the same visit.
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