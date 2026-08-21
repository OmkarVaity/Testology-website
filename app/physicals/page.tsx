import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

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

export default function PhysicalsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Medical exams"
        title="Physicals"
        intro="From DOT-required exams to general annual screenings, our certified medical examiners handle the physical component of your employment or compliance requirements."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Types of physicals we perform</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {physicalTypes.map((type) => (
            <div key={type.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{type.title}</h3>
              <p className="text-sm text-slate">{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Schedule a physical</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Most physicals are by appointment only — let us know which type you need and we&apos;ll
            get you on the calendar.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Book an appointment
          </Link>
        </div>
      </section>
    </>
  );
}