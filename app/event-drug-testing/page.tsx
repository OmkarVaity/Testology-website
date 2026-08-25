import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Event Drug Testing | Testology, Inc.",
  description:
    "On-site group drug testing for competitions, leagues, and one-time events, with fast turnaround.",
};

const details = [
  {
    title: "Group & bulk testing",
    description:
      "On-site collection for large groups at once — sports leagues, competitions, or one-time compliance events.",
  },
  {
    title: "Fast turnaround for event timelines",
    description:
      "Rapid screening options so results are available within the event's own schedule, not days later.",
  },
  {
    title: "Custom panel selection",
    description:
      "Choose the specific substances or panel type relevant to your event's governing body or policy.",
  },
];

export default function EventDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="On-site, group scale"
        title="Event drug testing"
        intro="For competitions, leagues, or one-time events that need group testing on a set schedule, we bring collection on-site and work within your event's timeline."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What we handle</h2>
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
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Planning an event?</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Share your event size, date, and testing requirements and we&apos;ll put together a
            plan that fits your timeline.
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