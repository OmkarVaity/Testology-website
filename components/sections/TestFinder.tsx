"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="font-display-bolt mb-3 text-sm font-semibold text-slate-900">
        Find your test
      </p>

      <div className="flex flex-wrap gap-2">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              selected === key
                ? "bg-primary-600 text-white"
                : "bg-primary-50 text-primary-700 hover:bg-primary-100"
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm font-semibold text-slate-900">{result.panel}</p>
          <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
            <span>Typical turnaround</span>
            <span className="font-semibold text-primary-600">{result.turnaround}</span>
          </div>
          <Link
            href={result.href}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition hover:text-primary-700"
          >
            View this test
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}