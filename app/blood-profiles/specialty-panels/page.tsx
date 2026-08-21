import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";

const panels = [
  {
    title: "Hormone panel",
    description: "Thyroid, testosterone, estrogen, and cortisol markers for a broader hormonal health picture.",
  },
  {
    title: "Cardiac risk panel",
    description: "Lipid profile, hs-CRP, and related markers used to assess cardiovascular risk factors.",
  },
  {
    title: "Longevity panel",
    description: "A wider set of biomarkers tracked over time to monitor aging-related health trends.",
  },
  {
    title: "Comprehensive wellness panel",
    description: "A broad baseline covering metabolic, liver, kidney, and blood count markers in one draw.",
  },
  {
    title: "Food & allergy sensitivity panel",
    description: "Screens reactivity across a wide range of common food and environmental allergens.",
  },
  {
    title: "Cancer screening panel",
    description: "Select tumor marker tests used as part of a broader early-detection screening approach.",
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
        <div className="grid gap-6 md:grid-cols-3">
          {panels.map((panel) => (
            <div key={panel.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{panel.title}</h3>
              <p className="text-sm text-slate">{panel.description}</p>
            </div>
          ))}
        </div>
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