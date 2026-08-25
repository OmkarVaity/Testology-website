import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vaccines | Testology, Inc.",
  description:
    "On-site administration of flu, Hepatitis B, Tdap, and MMR vaccines at our Brighton, MA clinic.",
};

const vaccines = [
  {
    title: "Flu vaccine",
    description: "Seasonal influenza vaccination, available on a walk-in or scheduled basis.",
  },
  {
    title: "Hepatitis B series",
    description: "The standard three-dose series, often required for healthcare and clinical placements.",
  },
  {
    title: "Tdap (tetanus, diphtheria, pertussis)",
    description: "Booster commonly required for school, childcare, and healthcare roles.",
  },
  {
    title: "MMR (measles, mumps, rubella)",
    description: "Administered where immunity titers come back negative and vaccination is the next step.",
  },
];

export default function VaccinesPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="On-site administration"
        title="Vaccines"
        intro="When an immunity panel comes back negative, or a role simply requires proof of vaccination, we administer common vaccines on-site at the same clinic."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Vaccines we administer</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {vaccines.map((vaccine) => (
            <div key={vaccine.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{vaccine.title}</h3>
              <p className="text-sm text-slate">{vaccine.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Need a vaccine not listed here?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Let us know what your program or employer requires and we&apos;ll confirm whether we
            can administer it on-site.
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