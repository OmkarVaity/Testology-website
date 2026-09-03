import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { PanelChip } from "@/components/sections/PanelChip";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "DOT Drug & Alcohol Testing | Testology, Inc.",
  description:
    "FMCSA-compliant DOT drug and alcohol testing in Brighton, MA, including eCCF, MRO coordination, and Clearinghouse reporting.",
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

const dotAuthorities = [
  { code: "FMCSA", full: "Federal Motor Carrier Safety Administration" },
  { code: "FAA", full: "Federal Aviation Administration" },
  { code: "FTA", full: "Federal Transit Administration" },
  { code: "FRA", full: "Federal Railroad Administration" },
  { code: "PHMSA", full: "Pipeline & Hazardous Materials Safety Administration" },
  { code: "USCG", full: "United States Coast Guard" },
];

const dotServices = [
  {
    title: "DOT drug test",
    description:
      "The federally mandated 5-panel urine screen, collected under strict chain-of-custody rules compliant with 49 CFR Part 40.",
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

const programManagement = [
  {
    title: "eCCF (Electronic Chain of Custody Form)",
    description:
      "A paperless, secure digital form that tracks your specimen from collection to result, reducing errors and speeding up the process.",
  },
  {
    title: "MRO coordination",
    description:
      "Medical Review Officer verification and result delivery for all lab-confirmed tests, as required under 49 CFR Part 40.",
  },
  {
    title: "FMCSA Clearinghouse reporting",
    description:
      "Query and violation reporting handled through the FMCSA Drug & Alcohol Clearinghouse portal on your behalf.",
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
    question: "What is an eCCF, and why does it matter?",
    answer:
      "The Electronic Chain of Custody Form replaces the traditional paper form used to track a specimen from collection through to the final result — reducing transcription errors and speeding up reporting compared to paper forms.",
  },
  {
    question: "Do you handle testing for owner-operators?",
    answer:
      "Yes — owner-operators subject to DOT rules can join one of our consortium pools, which satisfies the random testing requirement without needing to manage a pool of one.",
  },
];

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default function DotTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Federally regulated"
        title="DOT drug and alcohol testing"
        tagline="Full DOT-compliant testing for regulated employers"
        intro="If your team operates under FMCSA, FAA, FTA, or another DOT agency's authority, we handle the full range of required testing — collected and processed to federal chain-of-custody standards under 49 CFR Part 40 and Part 382."
        image="https://images.pexels.com/photos/6285355/pexels-photo-6285355.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Truck"
        color="from-blue-500 to-indigo-600"
      />

      <section className="container-wide pt-14">
        <h2 className="font-display-bolt mb-4 text-xl font-semibold text-slate-900">
          DOT authorities we work with
        </h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {dotAuthorities.map((authority) => (
            <PanelChip key={authority.code} label={authority.code} />
          ))}
        </div>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {dotAuthorities.map((authority) => (
            <p key={authority.code} className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{authority.code}</span> — {authority.full}
            </p>
          ))}
        </div>
      </section>

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Three services, one compliance requirement
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {dotServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <Card title={service.title} description={service.description} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Program management
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {programManagement.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <Card title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          When testing is required
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testTriggers.map((trigger, index) => (
            <Reveal key={trigger.title} delay={index * 80}>
              <Card title={trigger.title} description={trigger.description} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-4 text-xl font-semibold text-slate-900">
          Federally mandated panel
        </h2>
        <p className="mb-5 max-w-xl text-sm text-slate-500">
          DOT testing follows a fixed federal panel under 49 CFR Part 40 — we don&apos;t substitute
          or adjust it, since doing so would invalidate the result for compliance purposes.
        </p>
        <div className="flex flex-wrap gap-2">
          <PanelChip label="DOT 5-PANEL" variant="highlight" />
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          Common questions from employers managing a DOT compliance program.
        </p>
        <Accordion items={dotFaqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Setting up a DOT testing program
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            We&apos;ll walk through your operating administration&apos;s specific requirements and
            get your program compliant — including your random testing pool.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}