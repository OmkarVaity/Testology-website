import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { PanelChip } from "@/components/sections/PanelChip";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "DOT Drug & Alcohol Testing | Testology, Inc.",
  description:
    "FMCSA-compliant DOT drug and alcohol testing in Brighton, MA, including random pool management and return-to-duty testing.",
};

const testTriggers = [
  {
    title: "Pre-employment",
    description:
      "Required before a safety-sensitive employee performs any covered function for the first time.",
  },
  {
    title: "Random",
    description:
      "Unannounced testing drawn from a pool, at rates set annually by the relevant DOT operating administration.",
  },
  {
    title: "Reasonable suspicion",
    description:
      "Triggered when a trained supervisor observes specific, documented signs of possible substance use.",
  },
  {
    title: "Post-accident",
    description: "Required following qualifying accidents involving injury, fatality, or vehicle damage.",
  },
  {
    title: "Return-to-duty & follow-up",
    description:
      "Required after a policy violation, before returning to safety-sensitive work, and periodically after.",
  },
];

const dotAuthorities = ["FMCSA", "FAA", "FTA", "FRA", "PHMSA", "USCG"];

const dotServices = [
  {
    title: "DOT drug test",
    description: "The federally mandated 5-panel urine screen, collected under strict chain-of-custody rules.",
  },
  {
    title: "DOT physical exam",
    description: "A certified medical examiner's fitness-for-duty exam, entered into the national registry.",
  },
  {
    title: "DOT breath alcohol test (BAT)",
    description: "Administered by a trained BAT technician, following the same federally regulated procedure.",
  },
];

const dotFaqs = [
  {
    question: "What happens if an employee refuses a random test?",
    answer:
      "A refusal to test is treated the same as a positive result under DOT rules — the employee must be immediately removed from safety-sensitive duties and referred to a substance abuse professional before any return-to-duty process can begin.",
  },
  {
    question: "How does the random testing pool selection work?",
    answer:
      "Employees are selected using a scientifically valid random method, at a minimum annual rate set by your specific DOT operating administration. We manage the pool and notification process as part of our employer program.",
  },
  {
    question: "Do you handle testing for owner-operators?",
    answer:
      "Yes — owner-operators subject to DOT rules can join one of our consortium pools, which satisfies the random testing requirement without needing to manage a pool of one.",
  },
  {
    question: "Can DOT physicals and drug tests be done in the same visit?",
    answer:
      "In most cases yes — let us know when scheduling and we'll coordinate both in a single appointment where possible.",
  },
];

export default function DotTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Federally regulated"
        title="DOT drug and alcohol testing"
        intro="If your team operates under FMCSA, FAA, FTA, or another DOT agency's authority, we handle the full range of required testing — collected and processed to federal chain-of-custody standards."
      />

      <section className="mx-auto max-w-6xl px-6 pt-14">
        <h2 className="mb-4 font-display text-xl font-medium text-ink">
          DOT authorities we work with
        </h2>
        <div className="flex flex-wrap gap-2">
          {dotAuthorities.map((authority) => (
            <PanelChip key={authority} label={authority} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">
          Three services, one compliance requirement
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {dotServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">
                  {service.title}
                </h3>
                <p className="text-sm text-slate">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">When testing is required</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testTriggers.map((trigger, index) => (
            <Reveal key={trigger.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5 transition hover:border-slate/40 hover:shadow-sm">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{trigger.title}</h3>
                <p className="text-sm text-slate">{trigger.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-4 font-display text-xl font-medium text-ink">Federally mandated panel</h2>
        <p className="mb-5 max-w-xl text-sm text-slate">
          DOT testing follows a fixed federal panel — we don&apos;t substitute or adjust it, since
          doing so would invalidate the result for compliance purposes.
        </p>
        <div className="flex flex-wrap gap-2">
          <PanelChip label="DOT 5-PANEL" variant="highlight" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-2 font-display text-xl font-medium text-ink">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate">
          Common questions from employers managing a DOT compliance program.
        </p>
        <Accordion items={dotFaqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Setting up a DOT testing program
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            We&apos;ll walk through your operating administration&apos;s specific requirements and
            get your program compliant — including your random testing pool.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}