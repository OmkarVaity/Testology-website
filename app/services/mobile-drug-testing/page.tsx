import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Mobile Drug Testing | Testology, Inc.",
  description:
    "On-site drug testing for group events, post-accident response, and off-hours collection across the Boston area, available 24/7.",
};

const details = [
  {
    title: "We come to your site",
    description:
      "Our collectors travel to your workplace, job site, or event for group testing — no need to send staff off-site or lose a shift.",
  },
  {
    title: "Post-accident response",
    description:
      "When a qualifying incident requires immediate testing, we can dispatch a collector rather than waiting for your team to reach a clinic.",
  },
  {
    title: "Available 24/7, 365 days a year",
    description:
      "On-site collection isn't limited to clinic hours — we can schedule around shift patterns, off-hours incidents, or weekend events.",
  },
];

const faqs = [
  {
    question: "What types of samples can you collect on-site?",
    answer:
      "Urine, oral fluid, and hair follicle collections can all be performed on-site — the right method depends on your policy and what you're testing for.",
  },
  {
    question: "How long does it take to get results?",
    answer:
      "Rapid tests give immediate on-site results. Any non-negative finding is sent to a certified laboratory for confirmation, which typically takes 2–3 business days depending on the panel.",
  },
  {
    question: "Is mobile testing compliant with DOT requirements?",
    answer:
      "Yes — for DOT-regulated employees, we handle all required documentation, including the Federal Chain of Custody Form, as part of the on-site visit.",
  },
  {
    question: "How many employees can you test at one event?",
    answer:
      "We scale our team and equipment to your group size — from a handful of employees to large group testing events. Let us know your headcount when scheduling so we can plan accordingly.",
  },
];

export default function MobileDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="On-site collection"
        title="Mobile drug testing"
        intro="For group testing, post-accident response, or anything that can't wait for a clinic visit, our team brings certified collection directly to your location, 24 hours a day."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">When to call us out</h2>
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
          Common questions from employers planning an on-site or group testing event.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            24-hour emergency dispatch available
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            For urgent on-site testing needs, our dispatch line handles group events and
            time-sensitive screenings around the clock.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Contact dispatch
          </Link>
        </div>
      </section>
    </>
  );
}