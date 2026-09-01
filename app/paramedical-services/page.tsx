import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Paramedical Services | Testology, Inc.",
  description:
    "Insurance exam collection, EKGs, and vitals for life and health insurance underwriting.",
};

const services = [
  {
    title: "Vitals & specimen collection",
    description:
      "Height, weight, blood pressure, and pulse, along with blood, urine, and oral fluid collection depending on the insurer's underwriting guidelines.",
  },
  {
    title: "EKG & X-ray",
    description:
      "Administered when required by the insurance company's underwriting criteria for the applicant's age or coverage amount.",
  },
  {
    title: "Medical history interview",
    description: "Completed at the time of your exam if requested by the insurance company.",
  },
];

const faqs = [
  {
    question: "Will I learn my results at the exam?",
    answer:
      "No — results and any additional requirements are forwarded directly to the requesting insurance company. We don't have visibility into the underwriting decision itself.",
  },
  {
    question: "How long does the exam take?",
    answer:
      "Typically 15 to 30 minutes, though this varies depending on which services your specific insurance company requires.",
  },
  {
    question: "Is anything about the exam confidential from my insurer's decision?",
    answer:
      "All information collected during the exam is confidential and used only for underwriting purposes. Our examiners don't make or offer any opinion on insurability — that decision rests entirely with the insurance company's underwriting department.",
  },
];

export default function ParamedicalServicesPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Insurance underwriting"
        title="Paramedical services"
        intro="We perform the medical exam component that insurance carriers request as part of life and health policy underwriting, and route results directly to the requesting party."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What&apos;s included</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{service.title}</h3>
                <p className="text-sm text-slate">{service.description}</p>
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
          What to expect during and after a paramedical exam.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Insurance provider or agent?</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Reach out to set up exam scheduling for your applicants — we can coordinate directly
            with your underwriting team.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}