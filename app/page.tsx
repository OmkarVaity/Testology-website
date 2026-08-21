import { RequisitionCard } from "@/components/sections/RequisitionCard";
import { PanelChip } from "@/components/sections/PanelChip";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono-panel text-xs uppercase tracking-wide text-clear">
        Quest preferred site &middot; walk-ins welcome
      </p>
      <h1 className="mt-3 max-w-xl font-display text-4xl font-medium text-ink">
        Certified drug testing. Results you can trust.
      </h1>
      <p className="mt-4 max-w-md text-slate">
        Homepage sections build out next — this confirms the layout, fonts, and
        brand colors are wired up correctly.
      </p>

      <div className="mt-8 max-w-sm">
        <RequisitionCard
          reqNumber="10847"
          status="Walk-in"
          testName="10-panel urine screen"
          location="Brighton clinic · 380 Washington St"
          turnaround="~24 hrs"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <PanelChip label="5-PANEL" />
        <PanelChip label="7-PANEL" />
        <PanelChip label="9-PANEL" />
        <PanelChip label="eCUP+ 4A" variant="highlight" />
        <PanelChip label="HAIR 5" />
        <PanelChip label="MOBILE" />
      </div>
    </div>
  );
}