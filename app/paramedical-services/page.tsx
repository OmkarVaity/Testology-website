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
        tagline="Exams for life & health insurance underwriting"
        intro="We perform the medical exam component that insurance carriers request as part of life and health policy underwriting, and route results directly to the requesting party."
        image="https://images.pexels.com/photos/9408640/pexels-photo-9408640.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Microscope"
        color="from-cyan-500 to-teal-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          What&apos;s included
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500">{service.description}</p>
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
          What to expect during and after a paramedical exam.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Insurance provider or agent?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Reach out to set up exam scheduling for your applicants — we can coordinate directly
            with your underwriting team.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}