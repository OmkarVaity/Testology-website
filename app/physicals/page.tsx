import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "DOT & Employment Physicals | Testology, Inc.",
  description:
    "DOT physicals, annual health screenings, and pre-placement physical exams performed by certified medical examiners.",
};

const physicalTypes = [
  {
    title: "DOT physicals",
    description:
      "FMCSA-compliant physical exams performed by a certified medical examiner, with results entered in the national registry.",
  },
  {
    title: "Annual health screenings",
    description: "A yearly baseline exam covering vitals, vision, hearing, and general fitness for duty.",
  },
  {
    title: "Pre-placement physicals",
    description:
      "Confirms a candidate can safely perform the physical demands of a role before their start date.",
  },
  {
    title: "Respirator clearance exams",
    description: "Medical evaluation required before an employee can be fit-tested for respirator use.",
  },
];

const dotPhysicalComponents = [
  "Medical history review",
  "Vision test",
  "Hearing test",
  "Blood pressure & pulse check",
  "Sleep apnea risk evaluation",
  "Urine test",
];

const faqs = [
  {
    question: "What does a DOT physical actually check?",
    answer:
      "A DOT physical includes a medical history review, vision and hearing tests, a blood pressure and pulse check, a sleep apnea risk evaluation, and a urine test — all performed by a medical examiner listed on the FMCSA National Registry.",
  },
  {
    question: "How long is a DOT medical certificate valid for?",
    answer:
      "Typically up to 24 months, though your examiner may issue a shorter certification period if a monitored condition requires more frequent follow-up.",
  },
  {
    question: "What should I bring to a DOT physical?",
    answer:
      "Bring a photo ID, a list of current medications, and glasses or hearing aids if you use them. If you have a condition like diabetes or sleep apnea, bring related medical documentation.",
  },
  {
    question: "Can I fail a DOT physical?",
    answer:
      "You can be certified, certified with restrictions, or found temporarily not qualified pending further evaluation of a specific condition — an outright permanent disqualification is uncommon and usually tied to a specific federal standard.",
  },
];

export default function PhysicalsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Medical exams"
        title="Physicals"
        tagline="DOT, annual, and pre-placement exams"
        intro="From DOT-required exams to general annual screenings, our certified medical examiners handle the physical component of your employment or compliance requirements."
        image="https://images.pexels.com/photos/7108346/pexels-photo-7108346.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Stethoscope"
        color="from-emerald-500 to-green-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Types of physicals we perform
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {physicalTypes.map((type, index) => (
            <Reveal key={type.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-500">{type.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-4 text-xl font-semibold text-slate-900">
          What a DOT physical includes
        </h2>
        <div className="flex flex-wrap gap-2">
          {dotPhysicalComponents.map((component) => (
            <span
              key={component}
              className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700"
            >
              {component}
            </span>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          What to know and what to bring before your physical.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Schedule a physical
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Most physicals are by appointment only — let us know which type you need and we&apos;ll
            get you on the calendar.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Book an appointment
          </Link>
        </div>
      </section>
    </>
  );
}