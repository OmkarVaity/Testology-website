import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Oral Fluid Testing | Testology, Inc.",
  description:
    "Non-invasive, directly observed saliva-based drug testing, well suited to reasonable-suspicion and post-accident screening.",
};

const details = [
  {
    title: "Directly observed collection",
    description:
      "Saliva samples are collected under direct observation, which removes most of the substitution and adulteration risks urine collection can carry.",
  },
  {
    title: "Shorter detection window",
    description:
      "Oral fluid reflects more recent use than hair testing, making it well suited to reasonable-suspicion or post-accident situations.",
  },
  {
    title: "Simple, low-discomfort process",
    description: "A swab collection that takes just a couple of minutes, with no special facilities required.",
  },
];

const faqs = [
  {
    question: "How far back can oral fluid testing detect use?",
    answer:
      "Oral fluid generally reflects use within the past 24–48 hours, making it well suited to recent-use situations rather than a longer look-back.",
  },
  {
    question: "Is the collection process private?",
    answer:
      "The swab collection is directly observed by a trained collector, but doesn't require removing clothing or the same privacy setup a urine collection needs.",
  },
  {
    question: "Can oral fluid results be used for DOT compliance?",
    answer:
      "Oral fluid is an approved DOT specimen type once fully implemented by a given operating administration — ask us about the current status for your specific program, since implementation has been rolling out gradually.",
  },
];

export default function OralFluidTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Saliva-based screening"
        title="Oral fluid testing"
        intro="A non-invasive, directly observed collection method that's well suited to workplace situations where sample integrity and a quick, simple process both matter."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Why oral fluid</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{detail.title}</h3>
                <p className="text-sm text-slate">{detail.description}</p>
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
          What to know about the oral fluid collection process and its detection window.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Considering oral fluid for your workplace program?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            We can walk through whether oral fluid, urine, or hair testing best fits your policy
            and industry requirements.
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