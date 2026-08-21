import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

const details = [
  {
    title: "Directly observed collection",
    description:
      "Saliva samples are collected under direct observation, which removes most of the substitution and adulteration risks urine collection can carry.",
  },
  {
    title: "Shorter detection window",
    description:
      "Oral fluid reflects more recent use than hair testing, making it well suited to reasonable-suspicion or post-accident situations.",
  },
  {
    title: "Simple, low-discomfort process",
    description: "A swab collection that takes just a couple of minutes, with no special facilities required.",
  },
];

export default function OralFluidTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Saliva-based screening"
        title="Oral fluid testing"
        intro="A non-invasive, directly observed collection method that's well suited to workplace situations where sample integrity and a quick, simple process both matter."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Why oral fluid</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{detail.title}</h3>
              <p className="text-sm text-slate">{detail.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Considering oral fluid for your workplace program?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            We can walk through whether oral fluid, urine, or hair testing best fits your policy
            and industry requirements.
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