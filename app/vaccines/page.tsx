import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

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

const faqs = [
  {
    question: "Do I need an appointment for a vaccine?",
    answer:
      "Flu vaccines are typically available as a walk-in. Other vaccines are best scheduled in advance so we can confirm dose timing and availability.",
  },
  {
    question: "Will I receive a vaccination record?",
    answer:
      "Yes — you'll receive documentation of the vaccine administered, which you can provide to your employer, school, or personal medical records.",
  },
  {
    question: "Do you bill insurance for vaccines?",
    answer:
      "Coverage varies by vaccine and insurance plan. Contact us with your insurance details ahead of your visit and we'll confirm what applies to your situation.",
  },
];

export default function VaccinesPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="On-site administration"
        title="Vaccines"
        tagline="Flu, Hepatitis B, Tdap & MMR"
        intro="When an immunity panel comes back negative, or a role simply requires proof of vaccination, we administer common vaccines on-site at the same clinic."
        image="https://images.pexels.com/photos/6285376/pexels-photo-6285376.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Syringe"
        color="from-amber-500 to-orange-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Vaccines we administer
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {vaccines.map((vaccine, index) => (
            <Reveal key={vaccine.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {vaccine.title}
                </h3>
                <p className="text-sm text-slate-500">{vaccine.description}</p>
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
          What to know before scheduling a vaccine visit.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Need a vaccine not listed here?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Let us know what your program or employer requires and we&apos;ll confirm whether we
            can administer it on-site.
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