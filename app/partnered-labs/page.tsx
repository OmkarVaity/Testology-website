import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Partnered Labs | Testology, Inc.",
  description:
    "An authorized collection site for Quest Diagnostics, LabCorp, eScreen, Abbott, CRL, and Medtox, routing results into established lab networks.",
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
  {
    title: "Abbott",
    description: "Collection support for Abbott's toxicology and point-of-care testing devices.",
  },
  {
    title: "CRL (Clinical Reference Laboratory)",
    description: "An additional lab network for specialty and confirmatory testing.",
  },
  {
    title: "Medtox",
    description: "Toxicology lab partner supporting confirmatory drug testing results.",
  },
];

const faqs = [
  {
    question: "Does it matter which lab my results go through?",
    answer:
      "For most routine testing, no — we route your sample to whichever partner lab is appropriate for the specific panel. If your employer or program requires a specific network, let us know and we'll confirm we can route accordingly.",
  },
  {
    question: "Can I request results through my own Quest or LabCorp account?",
    answer:
      "In many cases yes, if your test was processed through that specific network — ask at the time of your visit and we'll confirm what's possible for your particular panel.",
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
          {labs.map((lab, index) => (
            <Reveal key={lab.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{lab.title}</h3>
                <p className="text-sm text-slate">{lab.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-2 font-display text-xl font-medium text-ink">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate">
          How lab routing works across our partner network.
        </p>
        <Accordion items={faqs} />
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