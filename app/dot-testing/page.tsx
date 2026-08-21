import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { PanelChip } from "@/components/sections/PanelChip";
import { Reveal } from "@/components/ui/Reveal";

const testTriggers = [
  {
    title: "Pre-employment",
    description:
      "Required before a safety-sensitive employee performs any covered function for the first time.",
  },
  {
    title: "Random",
    description:
      "Unannounced testing drawn from a pool, at rates set annually by the relevant DOT operating administration.",
  },
  {
    title: "Reasonable suspicion",
    description:
      "Triggered when a trained supervisor observes specific, documented signs of possible substance use.",
  },
  {
    title: "Post-accident",
    description: "Required following qualifying accidents involving injury, fatality, or vehicle damage.",
  },
  {
    title: "Return-to-duty & follow-up",
    description:
      "Required after a policy violation, before returning to safety-sensitive work, and periodically after.",
  },
];

export default function DotTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Federally regulated"
        title="DOT drug and alcohol testing"
        intro="If your team operates under FMCSA, FAA, FTA, or another DOT agency's authority, we handle the full range of required testing — collected and processed to federal chain-of-custody standards."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">When testing is required</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testTriggers.map((trigger, index) => (
            <Reveal key={trigger.title} delay={index * 80}>
              <div className="rounded-lg border border-slate/20 bg-white p-5 transition hover:border-slate/40 hover:shadow-sm">
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{trigger.title}</h3>
                <p className="text-sm text-slate">{trigger.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* rest of the file stays the same */}
    </>
  );
}