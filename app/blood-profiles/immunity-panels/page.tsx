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
        intro="When a role requires proof of immunity rather than just a vaccination record, we draw and test for the specific antibody titers most programs ask for."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Common panels</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {panels.map((panel, index) => (
            <Reveal key={panel.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{panel.title}</h3>
                <p className="text-sm text-slate">{panel.description}</p>
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
          What to know about immunity titers versus vaccination records.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Not sure which titers your program requires?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Send us your program or school&apos;s requirements and we&apos;ll confirm exactly
            which panels you need.
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