import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

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
        tagline="Authorized collection site for major lab networks"
        intro="Our on-site collections route into established national lab networks, so results carry the same accuracy and recognition as testing done directly through these partners."
        image="https://images.pexels.com/photos/9408640/pexels-photo-9408640.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Building2"
        color="from-blue-500 to-sky-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Our lab partners
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {labs.map((lab, index) => (
            <Reveal key={lab.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {lab.title}
                </h3>
                <p className="text-sm text-slate-500">{lab.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          How lab routing works across our partner network.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Need results routed to a specific lab?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Let us know your preferred network and we&apos;ll confirm we can route your sample
            there.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Ask us
          </Link>
        </div>
      </section>
    </>
  );
}