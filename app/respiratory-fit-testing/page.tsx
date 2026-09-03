import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Respiratory Fit Testing | Testology, Inc.",
  description:
    "Qualitative and quantitative respirator fit testing for annual OSHA 1910.134 compliance.",
};

const details = [
  {
    title: "Qualitative fit testing",
    description:
      "A taste- or smell-based test to confirm a respirator mask seals properly against the wearer's face.",
  },
  {
    title: "Quantitative fit testing",
    description:
      "Instrument-measured fit testing that gives a numeric fit factor, typically required for tighter regulatory standards.",
  },
  {
    title: "Annual OSHA compliance",
    description:
      "Required yearly under OSHA Standard 1910.134 for employees who wear tight-fitting respirators on the job.",
  },
];

const retestTriggers = [
  "A different make, model, style, or size of respirator is used",
  "Significant weight change since the last fit test",
  "Dental work or facial surgery that could affect the seal",
  "Any other change to facial structure that could affect fit",
];

const faqs = [
  {
    question: "Do I need a medical evaluation before a fit test?",
    answer:
      "Yes — OSHA requires a respiratory questionnaire to be completed and reviewed by a physician before a fit test is performed, confirming you're medically able to safely wear a respirator.",
  },
  {
    question: "Does facial hair affect the test?",
    answer:
      "Facial hair that crosses the respirator's sealing surface can interfere with fit and may cause a failed test — this is a real factor to consider before your appointment.",
  },
  {
    question: "What triggers a new fit test besides the annual requirement?",
    answer:
      "A new fit test is required whenever you switch to a different respirator make, model, style, or size, or if a facial change — such as significant weight change or dental work — could affect the seal.",
  },
];

export default function RespiratoryFitTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="OSHA compliance"
        title="Respiratory fit testing"
        tagline="Annual OSHA 1910.134 compliance"
        intro="If your team wears respirators on the job, we handle the annual fit testing required under OSHA Standard 1910.134 to keep that program compliant."
        image="https://images.pexels.com/photos/15831822/pexels-photo-15831822.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Wind"
        color="from-sky-500 to-blue-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          What we test
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
          What triggers a new fit test
        </h2>
        <p className="mb-5 max-w-xl text-sm text-slate-500">
          Beyond the annual requirement, a new test is needed whenever any of the following apply.
        </p>
        <ul className="space-y-2">
          {retestTriggers.map((trigger) => (
            <li key={trigger} className="flex gap-2 text-sm text-slate-700">
              <span className="text-primary-600">&rarr;</span>
              {trigger}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          What to know before scheduling a fit test.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Scheduling annual fit testing
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Let us know your team size and respirator type, and we&apos;ll set up a schedule that
            keeps your program compliant year-round.
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