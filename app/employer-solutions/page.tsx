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
        tagline="Full-service TPA & DOT Consortium"
        intro="Running a compliant testing program takes more than a single visit — as your Third-Party Administrator, we set up, manage, and maintain drug and alcohol testing programs for employers and owner-operators of any size."
        image="https://images.pexels.com/photos/5215012/pexels-photo-5215012.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Building2"
        color="from-blue-500 to-sky-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          What we handle
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
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
          Common questions from employers and owner-operators setting up a program.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Setting up a new program
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Tell us your industry, headcount, and whether you fall under DOT regulation, and
            we&apos;ll put together a program that fits.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}