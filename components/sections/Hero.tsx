import Link from "next/link";
import { PanelChip } from "./PanelChip";
import { TestFinder } from "./TestFinder";

export function Hero() {
  return (
    <section className="bg-texture mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-start">
        <div>
          <p className="font-mono-panel text-xs uppercase tracking-wide text-clear">
            Quest preferred site &middot; walk-ins welcome
          </p>
          <h1 className="mt-3 max-w-xl font-display text-4xl font-medium text-ink">
            Certified drug testing. Results you can trust.
          </h1>
          <p className="mt-4 max-w-md text-slate">
            DOT and non-DOT collections, on-site or in-clinic, with same-day
            turnaround for most panels.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
            >
              Book a test
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-slate/40 px-4 py-2.5 text-sm font-medium text-ink"
            >
              View hours
            </Link>
          </div>
        </div>

        <div>
          <TestFinder />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <PanelChip label="5-PANEL" />
        <PanelChip label="7-PANEL" />
        <PanelChip label="9-PANEL" />
        <PanelChip label="eCUP+ 4A" variant="highlight" />
        <PanelChip label="HAIR 5" />
        <PanelChip label="MOBILE" />
      </div>
    </section>
  );
}