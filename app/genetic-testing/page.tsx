import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

import type { Metadata } from "next";

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

export default function GeneticTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="DNA-based testing"
        title="Genetic testing"
        intro="A simple sample collection gives insight into inherited traits, medication metabolism, and family planning considerations."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Panels we offer</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {panels.map((panel) => (
            <div key={panel.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{panel.title}</h3>
              <p className="text-sm text-slate">{panel.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Questions before testing?</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Genetic results can raise a lot of questions — reach out and we&apos;ll walk you
            through what a given panel does and doesn&apos;t tell you.
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