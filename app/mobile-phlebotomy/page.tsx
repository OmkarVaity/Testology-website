import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

const details = [
  {
    title: "At-home & office draws",
    description:
      "A certified phlebotomist comes to your home or office for blood draws, rather than you traveling to a clinic.",
  },
  {
    title: "Mobility & accessibility support",
    description:
      "Well suited for anyone for whom a clinic visit is difficult — older adults, recovering patients, or busy schedules.",
  },
  {
    title: "Same lab-grade handling",
    description:
      "Samples are collected and transported under the same chain-of-custody and handling standards as an in-clinic draw.",
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