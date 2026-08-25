import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Paramedical Services | Testology, Inc.",
  description:
    "Insurance exam collection, EKGs, and vitals for life and health insurance underwriting.",
};

const services = [
  {
    title: "Insurance exam collection",
    description:
      "Vitals, blood draw, and specimen collection performed on behalf of life and health insurance underwriters.",
  },
  {
    title: "EKG",
    description: "Resting electrocardiogram readings requested as part of certain underwriting exams.",
  },
  {
    title: "Height, weight & vitals",
    description: "Standard measurements recorded as part of most paramedical exam packages.",
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
        <h2 className="mb-6 font-display text-xl font-medium text-ink">What's included</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{service.title}</h3>
              <p className="text-sm text-slate">{service.description}</p>
            </div>
          ))}
        </div>
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