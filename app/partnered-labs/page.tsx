import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnered Labs | Testology, Inc.",
  description:
    "An authorized collection site for Quest Diagnostics, LabCorp, and eScreen, routing results into established lab networks.",
};

const labs = [
  {
    title: "Quest Diagnostics",
    description: "A preferred collection site for Quest, routing lab-based panels directly into their network.",
  },
  {
    title: "LabCorp",
    description: "An authorized LabCorp collection site for standard and specialty lab testing.",
  },
  {
    title: "eScreen",
    description: "A top eScreen site, supporting employer drug testing programs through their platform.",
  },
];

export default function PartneredLabsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Network affiliations"
        title="Partnered labs"
        intro="Our on-site collections route into established national lab networks, so results carry the same accuracy and recognition as testing done directly through these partners."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Our lab partners</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {labs.map((lab) => (
            <div key={lab.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{lab.title}</h3>
              <p className="text-sm text-slate">{lab.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Need results routed to a specific lab?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Let us know your preferred network and we&apos;ll confirm we can route your sample
            there.
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