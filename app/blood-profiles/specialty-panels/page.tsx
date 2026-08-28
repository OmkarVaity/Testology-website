import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Specialty Blood Panels | Testology, Inc.",
  description:
    "Initial Male and Female Panels, plus comprehensive wellness and food sensitivity blood panels, no physician referral required.",
};

const panels = [
  {
    title: "Initial male panel",
    description:
      "Metabolic function and blood cell health, plus testosterone, thyroid hormones, SHBG, and estradiol. Includes PSA for prostate health, a lipid panel for cardiovascular risk, and IGF-1.",
  },
  {
    title: "Initial female panel",
    description:
      "Metabolic function and blood cell health, plus estradiol, testosterone, and thyroid hormones. Includes a lipid panel for cardiovascular risk assessment.",
  },
  {
    title: "Comprehensive wellness panel",
    description: "A broad baseline covering metabolic, liver, kidney, and blood count markers in one draw.",
  },
  {
    title: "Food & allergy sensitivity panel",
    description: "Screens reactivity across a wide range of common food and environmental allergens.",
  },
];

const faqs = [
  {
    question: "Do I need a physician referral for these panels?",
    answer:
      "No — most of our specialty wellness panels can be requested directly without a physician's authorization. Anything requiring diagnostic follow-up is best discussed with your doctor afterward.",
  },
  {
    question: "How is the Initial Male or Female Panel different from a routine physical's bloodwork?",
    answer:
      "These panels go beyond a standard physical's basic labs to include hormone markers like testosterone, estradiol, and SHBG — useful for anyone tracking hormonal health specifically, not just general wellness.",
  },
  {
    question: "How will I receive my results?",
    answer:
      "Results are delivered securely once processed. In-house markers are often available same-day, while send-out lab markers typically take a few business days.",
  },
];

export default function SpecialtyPanelsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Wellness & diagnostics"
        title="Specialty blood panels"
        intro="Beyond employment-required testing, we offer a range of wellness panels for anyone who wants a closer look at a specific area of their health — often without needing a physician referral."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Available panels</h2>
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
          What to know before requesting a wellness panel on your own.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Want a panel tailored to your goals?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Tell us what you&apos;re trying to monitor and we&apos;ll recommend the right
            combination of markers.
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