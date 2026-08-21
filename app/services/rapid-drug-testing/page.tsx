import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { RequisitionCard } from "@/components/sections/RequisitionCard";

const details = [
  {
    title: "Results in minutes",
    description:
      "Instant-cup screening gives a preliminary result on-site, without waiting for a lab turnaround.",
  },
  {
    title: "Lab confirmation available",
    description:
      "Any non-negative screen can be sent out for confirmatory lab testing before any action is taken.",
  },
  {
    title: "Walk-in friendly",
    description: "No appointment required for most rapid panels — last walk-in is 5:30 PM.",
  },
];

export default function RapidDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Instant-cup screening"
        title="Rapid drug testing"
        intro="For situations where speed matters most — pre-employment decisions, return-to-work clearance, or a quick check before a shift — our instant-cup panels give a preliminary result while you wait."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="mb-6 font-display text-xl font-medium text-ink">What to expect</h2>
            <div className="space-y-6">
              {details.map((detail) => (
                <div key={detail.title}>
                  <h3 className="mb-1 font-display text-base font-medium text-ink">{detail.title}</h3>
                  <p className="text-sm text-slate">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RequisitionCard
            reqNumber="10852"
            status="Walk-in"
            testName="Rapid instant-cup screen"
            location="Brighton clinic · 380 Washington St"
            turnaround="~5 min"
          />
        </div>
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