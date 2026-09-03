import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { PanelChip } from "@/components/sections/PanelChip";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

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

const faqs = [
  {
    question: "How much hair is needed for the test?",
    answer:
      "A sample about the thickness of a pencil and 1.5 inches long, typically cut close to the scalp from the back of the head, is enough for standard analysis.",
  },
  {
    question: "What if someone doesn't have enough head hair?",
    answer:
      "Body hair (such as from the arm, leg, or chest) can generally be used as an alternative, though it reflects a longer and less precisely defined detection window than head hair.",
  },
  {
    question: "Can hair dye or bleach affect the result?",
    answer:
      "Cosmetic treatments can affect the exterior of the hair shaft but generally don't eliminate detectable drug metabolites bound inside the hair — the lab accounts for this during analysis.",
  },
];

export default function HairDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Long-window screening"
        title="Hair drug testing"
        tagline="Visibility into patterns of use over months"
        intro="For roles or programs where a longer look-back matters more than same-day results, hair testing gives visibility into patterns of use over months, not days."
        image="https://images.pexels.com/photos/8442376/pexels-photo-8442376.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Microscope"
        color="from-violet-500 to-purple-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          What makes hair testing different
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {detail.title}
                </h3>
                <p className="text-sm text-slate-500">{detail.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-4 text-xl font-semibold text-slate-900">
          Available panel
        </h2>
        <div className="flex flex-wrap gap-2">
          <PanelChip label="HAIR 5" variant="highlight" />
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          Practical questions about how the hair sample is collected and analyzed.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Not sure if hair testing fits your policy?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            We can help you decide whether hair, oral fluid, or urine testing best matches what
            you&apos;re screening for.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Ask us
          </Link>
        </div>
      </section>
    </>
  );
}