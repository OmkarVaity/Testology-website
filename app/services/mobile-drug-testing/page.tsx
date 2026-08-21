import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

const details = [
  {
    title: "We come to your site",
    description:
      "Our collectors travel to your workplace, job site, or event for group testing — no need to send staff off-site or lose a shift.",
  },
  {
    title: "Post-accident response",
    description:
      "When a qualifying incident requires immediate testing, we can dispatch a collector rather than waiting for your team to reach a clinic.",
  },
  {
    title: "Off-hours availability",
    description:
      "Coverage outside standard clinic hours for shift-based operations, emergency response, and time-sensitive compliance needs.",
  },
];

export default function MobileDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="On-site collection"
        title="Mobile drug testing"
        intro="For group testing, post-accident response, or anything that can't wait for a clinic visit, our team brings certified collection directly to your location."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">When to call us out</h2>
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
            24-hour emergency dispatch available
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            For urgent on-site testing needs, our dispatch line handles group events and
            time-sensitive screenings around the clock.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Contact dispatch
          </Link>
        </div>
      </section>
    </>
  );
}