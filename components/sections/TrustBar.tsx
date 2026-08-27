import { siteConfig } from "@/content/site-config";

const affiliations = ["Quest Preferred Site", "eScreen Top Site", "LabCorp Collection Site"];

export function TrustBar() {
  return (
    <div className="border-b border-slate/20 bg-ink/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1.5 px-6 py-2.5 text-center sm:flex-row sm:gap-3">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono-panel text-[11px] uppercase tracking-wide text-ink/70">
          {affiliations.map((label, index) => (
            <span key={label} className="flex items-center gap-3">
              {label}
              {index < affiliations.length - 1 && <span className="text-slate/40">|</span>}
            </span>
          ))}
        </div>

        <span className="hidden text-slate/40 sm:inline">·</span>

        <p className="text-xs font-medium text-signal">{siteConfig.hours.lastWalkIn}</p>
      </div>
    </div>
  );
} 