import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Blood Profiles | Testology, Inc.",
  description:
    "Immunity panels and specialty blood panels for employment, wellness, and diagnostic needs in Brighton, MA.",
};

const panelCategories = [
  {
    title: "Immunity panels",
    description:
      "Check antibody titers for common vaccine-preventable illnesses — often required for healthcare, education, and childcare roles.",
    href: "/blood-profiles/immunity-panels",
  },
  {
    title: "Specialty blood panels",
    description:
      "Initial Male and Female Panels, plus hormone, wellness, and food sensitivity panels for a deeper look at overall health markers.",
    href: "/blood-profiles/specialty-panels",
  },
];

const faqs = [
  {
    question: "Do I need a doctor's order to get a blood panel?",
    answer:
      "For most of our wellness and specialty panels, no physician referral is required. Employment-required panels (like immunity titers) are typically requested by your employer or school directly.",
  },
  {
    question: "How long does a blood draw appointment take?",
    answer:
      "The draw itself takes just a few minutes, though blood draw and phlebotomy services are by appointment only — walk-ins aren't available for this service.",
  },
  {
    question: "How are results delivered?",
    answer:
      "Results are provided securely once processed. Turnaround depends on the specific panel and whether markers are analyzed in-house or sent to an outside lab.",
  },
];

export default function BloodProfilesPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Lab-drawn panels"
        title="Blood profiles"
        tagline="Employment, wellness & diagnostic panels"
        intro="From employment-required immunity checks to broader wellness panels, our on-site lab handles the draw and routes samples to the right testing partner."
        image="https://images.pexels.com/photos/4040561/pexels-photo-4040561.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Droplet"
        color="from-rose-500 to-red-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Choose a panel category
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {panelCategories.map((category, index) => (
            <Reveal key={category.href} delay={index * 80}>
              <Link
                href={category.href}
                className="card-hover block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-500">{category.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          What to know before scheduling a blood draw.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Need a panel we haven&apos;t listed?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            We work with multiple lab partners and can usually source a specific panel even if
            it&apos;s not one of our standard offerings.
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