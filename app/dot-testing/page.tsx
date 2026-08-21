import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { PanelChip } from "@/components/sections/PanelChip";

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
          {testTriggers.map((trigger) => (
            <div key={trigger.title} className="rounded-lg border border-slate/20 bg-white p-5">
              <h3 className="mb-1.5 font-display text-base font-medium text-ink">{trigger.title}</h3>
              <p className="text-sm text-slate">{trigger.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="mb-4 font-display text-xl font-medium text-ink">Federally mandated panel</h2>
        <p className="mb-5 max-w-xl text-sm text-slate">
          DOT testing follows a fixed federal panel — we don&apos;t substitute or adjust it, since
          doing so would invalidate the result for compliance purposes.
        </p>
        <div className="flex flex-wrap gap-2">
          <PanelChip label="DOT 5-PANEL" variant="highlight" />
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">
            Setting up a DOT testing program
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            We&apos;ll walk through your operating administration&apos;s specific requirements and
            get your program compliant — including your random testing pool.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}