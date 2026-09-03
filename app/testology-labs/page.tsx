import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Testology Labs — Wellness Panels | Testology, Inc.",
  description:
    "Baseline wellness labs, peptide therapy monitoring, and supplement response tracking in Brighton, MA.",
};

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

const faqs = [
  {
    question: "Do you prescribe or provide peptides or supplements?",
    answer:
      "No — we perform the lab testing and monitoring. Any protocol, prescription, or supplement decision should come from your treating provider; we don't recommend or dispense treatments ourselves.",
  },
  {
    question: "How often should monitoring labs be repeated?",
    answer:
      "This depends on the specific protocol and your provider's guidance. As a general pattern, a baseline panel followed by a check at 8–12 weeks is common, but your provider should set the actual schedule.",
  },
  {
    question: "Will my results be reviewed by a doctor?",
    answer:
      "We provide the lab results directly to you. If you're working with a provider on a protocol, you should share your results with them for interpretation and next steps.",
  },
];

export default function TestologyLabsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Wellness division"
        title="Testology Labs"
        tagline="Baseline panels & ongoing monitoring"
        intro="Separate from our compliance testing services, Testology Labs supports people actively managing their own wellness — with baseline panels and ongoing monitoring, not just a one-time result."
        image="https://images.pexels.com/photos/8442376/pexels-photo-8442376.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Microscope"
        color="from-emerald-500 to-teal-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          What we offer
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {offerings.map((offering, index) => (
            <Reveal key={offering.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {offering.title}
                </h3>
                <p className="text-sm text-slate-500">{offering.description}</p>
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
          How our lab monitoring role fits alongside your provider&apos;s guidance.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Start with a baseline panel
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Tell us what you&apos;re working on and we&apos;ll recommend a starting panel and a
            reasonable follow-up schedule.
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