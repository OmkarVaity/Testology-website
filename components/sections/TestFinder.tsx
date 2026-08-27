"use client";

import { useState } from "react";
import Link from "next/link";

type Scenario = {
  label: string;
  panel: string;
  turnaround: string;
  href: string;
};

const scenarios: Record<string, Scenario> = {
  "pre-employment": {
    label: "Pre-employment",
    panel: "10-panel urine screen",
    turnaround: "~24 hrs",
    href: "/services/rapid-drug-testing",
  },
  dot: {
    label: "DOT compliance",
    panel: "DOT 5-panel",
    turnaround: "~24–48 hrs",
    href: "/dot-testing",
  },
  "post-accident": {
    label: "Post-accident",
    panel: "Rapid instant-cup screen",
    turnaround: "~5 min",
    href: "/services/mobile-drug-testing",
  },
  "long-window": {
    label: "Longer look-back",
    panel: "Hair 5-panel",
    turnaround: "~90-day window",
    href: "/services/hair-drug-testing",
  },
};

export function TestFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? scenarios[selected] : null;

  return (
    <div className="rounded-lg border border-slate/20 bg-white p-4">
      <p className="mb-3 font-mono-panel text-[10px] uppercase tracking-wide text-slate">
        Find your test
      </p>

      <div className="flex flex-wrap gap-1.5">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
              selected === key
                ? "bg-ink text-bone"
                : "bg-ink/5 text-ink hover:bg-ink/10"
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-4 border-t border-dashed border-slate/30 pt-3">
          <p className="text-sm font-medium text-ink">{result.panel}</p>
          <div className="mt-1.5 flex items-center justify-between font-mono-panel text-[11px] text-slate">
            <span>Typical turnaround</span>
            <span className="text-clear">{result.turnaround}</span>
          </div>
          <Link
            href={result.href}
            className="mt-3 inline-block text-sm font-medium text-clear hover:underline"
          >
            View this test &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}