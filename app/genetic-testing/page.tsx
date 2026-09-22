import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Genetic Testing | Testology, Inc.",
  description:
    "Carrier screening, pharmacogenomic testing, and ancestry & wellness genetic panels in Brighton, MA.",
};

const panels = [
  {
    title: "Carrier screening",
    description:
      "Checks for inherited conditions a person could pass on to children, often relevant during family planning.",
  },
  {
    title: "Pharmacogenomic testing",
    description:
      "Shows how your body is likely to metabolize certain medications, helping guide dosing decisions with your provider.",
  },
  {
    title: "Ancestry & wellness panels",
    description: "Broader genetic panels covering ancestry composition alongside select wellness-related markers.",
  },
];

const faqs = [
  {
    question: "Do I need a doctor's referral for genetic testing?",
    answer:
      "Most of our carrier screening and ancestry/wellness panels don't require a referral. If a result raises a specific medical question, we'd recommend discussing it with your physician or a genetic counselor.",
  },
  {
    question: "How is a sample collected?",
    answer:
      "Most genetic panels use a simple cheek swab or saliva sample, collected on-site in just a few minutes.",
  },
  {
    question: "How long does it take to get results?",
    answer:
      "Turnaround varies by panel, typically ranging from a week to a few weeks depending on the specific test and lab partner used.",
  },
];

export default function GeneticTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="DNA-based testing"
        title="Genetic testing"
        tagline="Carrier screening & pharmacogenomic panels"
        intro="A simple sample collection gives insight into inherited traits, medication metabolism, and family planning considerations."
        image="https://images.pexels.com/photos/9628850/pexels-photo-9628850.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Dna"
        color="from-violet-500 to-purple-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Panels we offer
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {panels.map((panel, index) => (
            <Reveal key={panel.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {panel.title}
                </h3>
                <p className="text-sm text-slate-500">{panel.description}</p>
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
          What to know before requesting a genetic panel.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Questions before testing?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Genetic results can raise a lot of questions — reach out and we&apos;ll walk you
            through what a given panel does and doesn&apos;t tell you.
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