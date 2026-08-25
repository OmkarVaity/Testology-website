import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Employer Solutions | Testology, Inc.",
  description:
    "Random pool management, DOT and non-DOT program setup, and TPA integration for workplace drug testing programs.",
};

const offerings = [
  {
    title: "Random pool management",
    description:
      "We maintain your random testing pool and selection schedule, so your program stays compliant without manual tracking on your end.",
  },
  {
    title: "DOT & non-DOT program setup",
    description:
      "We help build a written policy and testing schedule that matches your operating administration's rules or your own workplace policy.",
  },
  {
    title: "Account-based billing",
    description:
      "One account, one invoice — no per-visit payment friction for your employees when they come in for a scheduled or random test.",
  },
  {
    title: "TPA & consortium integration",
    description:
      "We work alongside your third-party administrator or join an existing consortium testing pool where required.",
  },
];

export default function EmployerSolutionsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="For businesses"
        title="Employer solutions"
        intro="Running a compliant testing program takes more than a single visit — we help set up, manage, and maintain drug and alcohol testing programs for employers of any size."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What we handle</h2>
        <div className="grid gap-6 md:grid-cols-2">
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
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Setting up a new program</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Tell us your industry, headcount, and whether you fall under DOT regulation, and
            we&apos;ll put together a program that fits.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}