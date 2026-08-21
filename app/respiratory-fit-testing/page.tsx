import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

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
      "Required yearly for employees who wear respirators on the job, alongside the medical clearance exam.",
  },
];

export default function RespiratoryFitTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="OSHA compliance"
        title="Respiratory fit testing"
        intro="If your team wears respirators on the job, we handle the annual fit testing required to keep that program compliant — alongside the medical clearance exam if you need both."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What we test</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{detail.title}</h3>
              <p className="text-sm text-slate">{detail.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Scheduling annual fit testing
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Let us know your team size and respirator type, and we&apos;ll set up a schedule that
            keeps your program compliant year-round.
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