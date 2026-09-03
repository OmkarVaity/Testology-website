import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Immunity Panels | Testology, Inc.",
  description:
    "MMR, varicella, hepatitis B, and TB immunity testing for employment and school clearance requirements.",
};

const panels = [
  {
    title: "MMR immunity",
    description: "Measles, mumps, and rubella antibody titers — commonly required for healthcare and school staff.",
  },
  {
    title: "Varicella immunity",
    description: "Confirms immunity to chickenpox, often requested where prior vaccination records are incomplete.",
  },
  {
    title: "Hepatitis B immunity",
    description: "Checks surface antibody levels following vaccination, standard for clinical and lab placements.",
  },
  {
    title: "TB screening (QuantiFERON)",
    description: "Blood-based tuberculosis screening, an alternative to the traditional skin test.",
  },
];

const faqs = [
  {
    question: "Why would I need an immunity titer instead of just a vaccination record?",
    answer:
      "Some programs require proof that a vaccine actually produced protective antibodies, not just proof that it was administered — a titer confirms the immune response directly, which is useful when records are incomplete or unavailable.",
  },
  {
    question: "What if my titer comes back negative?",
    answer:
      "A negative titer means the vaccine either wasn't fully effective or the antibody level has waned. In that case, revaccination is typically the next step, followed by administering the vaccine here if needed.",
  },
  {
    question: "Is the QuantiFERON TB test the same as a skin test?",
    answer:
      "No — QuantiFERON is a single blood draw with no return visit required to read results, unlike the traditional TB skin test, which requires a follow-up visit 48–72 hours later.",
  },
];

export default function ImmunityPanelsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Employment & school clearance"
        title="Immunity panels"
        tagline="Antibody titers for vaccine-preventable illnesses"
        intro="When a role requires proof of immunity rather than just a vaccination record, we draw and test for the specific antibody titers most programs ask for."
        image="https://images.pexels.com/photos/4040561/pexels-photo-4040561.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Droplet"
        color="from-rose-500 to-red-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Common panels
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {panels.map((panel, index) => (
            <Reveal key={panel.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {panel.title}
                </h3>
                <p className="text-sm text-slate-500">{panel.description}</p>
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
          What to know about immunity titers versus vaccination records.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Not sure which titers your program requires?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Send us your program or school&apos;s requirements and we&apos;ll confirm exactly
            which panels you need.
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