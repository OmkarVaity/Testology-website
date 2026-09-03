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
        tagline="Non-invasive, directly observed collection"
        intro="A non-invasive, directly observed collection method that's well suited to workplace situations where sample integrity and a quick, simple process both matter."
        image="https://images.pexels.com/photos/8442376/pexels-photo-8442376.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Droplet"
        color="from-sky-500 to-blue-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Why oral fluid
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {detail.title}
                </h3>
                <p className="text-sm text-slate-500">{detail.description}</p>
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
          What to know about the oral fluid collection process and its detection window.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Considering oral fluid for your workplace program?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            We can walk through whether oral fluid, urine, or hair testing best fits your policy
            and industry requirements.
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