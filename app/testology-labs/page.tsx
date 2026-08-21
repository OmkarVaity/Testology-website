import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

const offerings = [
  {
    title: "Baseline wellness labs",
    description:
      "A starting-point panel for anyone beginning a wellness or supplement program, to establish where you are before making changes.",
  },
  {
    title: "Peptide therapy monitoring",
    description:
      "Periodic labs to track relevant markers for clients on a peptide protocol under their provider's guidance.",
  },
  {
    title: "Supplement response tracking",
    description:
      "Follow-up panels to see whether a supplement regimen is actually moving the markers it's meant to.",
  },
];

export default function TestologyLabsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Wellness division"
        title="Testology Labs"
        intro="Separate from our compliance testing services, Testology Labs supports people actively managing their own wellness — with baseline panels and ongoing monitoring, not just a one-time result."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What we offer</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {offerings.map((offering) => (
            <div key={offering.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{offering.title}</h3>
              <p className="text-sm text-slate">{offering.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Start with a baseline panel</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Tell us what you&apos;re working on and we&apos;ll recommend a starting panel and a
            reasonable follow-up schedule.
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