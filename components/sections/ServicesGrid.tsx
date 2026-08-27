import Link from "next/link";
import { PanelChip } from "./PanelChip";
import { Reveal } from "@/components/ui/Reveal";

const panels = [
  { label: "5 PANEL", code: "1200", href: "/services/rapid-drug-testing" },
  { label: "7 PANEL", code: "1203", href: "/services/rapid-drug-testing" },
  { label: "9 PANEL", code: "1205", href: "/services/rapid-drug-testing" },
  { label: "10 PANEL", code: "1204", href: "/services/rapid-drug-testing" },
  { label: "eCUP+ 4A", code: "NO THC", href: "/services/rapid-drug-testing" },
  { label: "eCUP+ 5A", code: "", href: "/services/rapid-drug-testing" },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-2 font-display text-2xl font-medium text-ink">Featured testing</h2>
      <p className="mb-8 max-w-md text-sm text-slate">
        Our most requested panels — available as a walk-in at our Brighton clinic.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {panels.map((panel, index) => (
          <Reveal key={panel.label} delay={index * 60}>
            <Link
              href={panel.href}
              className="block rounded-lg border border-slate/20 bg-white p-5 transition hover:border-slate/40 hover:shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <PanelChip label={panel.label} variant="highlight" />
                {panel.code && (
                  <span className="font-mono-panel text-[10px] text-slate">{panel.code}</span>
                )}
              </div>
              <p className="text-sm text-ink">View panel details &rarr;</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/services/drug-and-alcohol-testing"
          className="text-sm font-medium text-clear hover:underline"
        >
          View all drug & alcohol testing services &rarr;
        </Link>
      </div>
    </section>
  );
}