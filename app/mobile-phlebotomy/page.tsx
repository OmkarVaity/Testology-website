import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Mobile Phlebotomy | Testology, Inc.",
  description:
    "At-home and office blood draws from a certified phlebotomist, with the same lab-grade handling as an in-clinic visit.",
};

const details = [
  {
    title: "At-home & office draws",
    description:
      "A certified phlebotomist comes to your home or office for blood draws, rather than you traveling to a clinic.",
  },
  {
    title: "Tailored across industries",
    description:
      "Whether healthcare, corporate, or a specialized field, our mobile service adapts to your specific testing requirements.",
  },
  {
    title: "Available 24/7",
    description:
      "Health needs don't follow business hours — we offer flexible scheduling to accommodate any shift or business operation.",
  },
];

const faqs = [
  {
    question: "How far in advance do I need to schedule?",
    answer:
      "Same-day scheduling is often possible, but booking a day or two ahead helps guarantee your preferred time slot, especially outside standard business hours.",
  },
  {
    question: "Where are samples processed after the draw?",
    answer:
      "Samples are handled with the same chain-of-custody and lab-grade standards as an in-clinic draw, then routed to the appropriate testing lab based on your specific panel.",
  },
  {
    question: "Can this be arranged for a group at one workplace?",
    answer:
      "Yes — let us know your headcount and location when scheduling and we'll coordinate a visit sized to your group.",
  },
];

export default function MobilePhlebotomyPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="At-home collection"
        title="Mobile phlebotomy"
        intro="For anyone who'd rather skip the clinic visit, our phlebotomists travel to your home or office for a professional blood draw, handled to the same standard as an in-clinic collection."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Why mobile phlebotomy</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{detail.title}</h3>
                <p className="text-sm text-slate">{detail.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-2 font-display text-xl font-medium text-ink">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate">
          What to know before scheduling a mobile draw.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Schedule a home visit</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Let us know which panel you need drawn and a location, and we&apos;ll get a
            phlebotomist scheduled.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Book a visit
          </Link>
        </div>
      </section>
    </>
  );
}