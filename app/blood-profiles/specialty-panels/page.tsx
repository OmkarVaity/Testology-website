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
        tagline="Hormone, wellness & sensitivity panels"
        intro="Beyond employment-required testing, we offer a range of wellness panels for anyone who wants a closer look at a specific area of their health — often without needing a physician referral."
        image="https://images.pexels.com/photos/4040561/pexels-photo-4040561.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Droplet"
        color="from-rose-500 to-red-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Available panels
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
          What to know before requesting a wellness panel on your own.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Want a panel tailored to your goals?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Tell us what you&apos;re trying to monitor and we&apos;ll recommend the right
            combination of markers.
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