import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Employer Solutions | Testology, Inc.",
  description:
    "Third-party administration, DOT Consortium services, random pool management, and program setup for employers of any size.",
};

const offerings = [
  {
    title: "Full-service TPA administration",
    description:
      "We act as your Third-Party Administrator, managing your entire drug and alcohol testing program so you stay audit-ready without handling it in-house.",
  },
  {
    title: "DOT Consortium for owner-operators",
    description:
      "Owner-operators and small fleets can join our consortium pool to satisfy random testing requirements without managing a pool of one.",
  },
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
];

const faqs = [
  {
    question: "What's the difference between a TPA and just booking individual tests?",
    answer:
      "A TPA manages your entire program end-to-end — policy setup, random pool selection, scheduling, and compliance documentation — rather than you booking and tracking each test yourself.",
  },
  {
    question: "I'm an owner-operator. Do I still need a random testing pool?",
    answer:
      "Yes, but you don't need to manage one alone — joining our consortium pool satisfies the random testing requirement by combining you with other owner-operators into a shared pool.",
  },
  {
    question: "Which DOT agencies do you support?",
    answer:
      "We support programs regulated by FMCSA, FAA, PHMSA, and FTA, among others. Let us know your specific operating administration and we'll confirm exact requirements.",
  },
  {
    question: "How quickly can a new employer account be set up?",
    answer:
      "Most accounts can be established within a few business days once we have your company information and testing policy details.",
  },
];

export default function EmployerSolutionsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="For businesses"
        title="Employer solutions"
        intro="Running a compliant testing program takes more than a single visit — as your Third-Party Administrator, we set up, manage, and maintain drug and alcohol testing programs for employers and owner-operators of any size."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What we handle</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((offering, index) => (
            <Reveal key={offering.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">
                  {offering.title}
                </h3>
                <p className="text-sm text-slate">{offering.description}</p>
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
          Common questions from employers and owner-operators setting up a program.
        </p>
        <Accordion items={faqs} />
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