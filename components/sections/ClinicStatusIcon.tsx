import { Monitor, DollarSign, ClipboardList, FlaskConical, Ban, Stethoscope, type LucideIcon } from "lucide-react";
import type { ClinicStatus } from "@/content/clinics";
import { clinicStatusMeta } from "@/content/clinics";

const statusIconMap: Record<ClinicStatus, LucideIcon> = {
  installed: Monitor,
  installedPremium: DollarSign,
  uninstalledInNetwork: ClipboardList,
  electronicChain: FlaskConical,
  outOfNetwork: Ban,
  ePhysical: Stethoscope,
};

/** Round colored badge with a white glyph; hover shows the plain-language label. */
export function ClinicStatusIcon({ status, size = "md" }: { status: ClinicStatus; size?: "sm" | "md" }) {
  const Icon = statusIconMap[status];
  const meta = clinicStatusMeta[status];
  const badgeSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <span
      role="img"
      aria-label={meta.label}
      title={`${meta.label} — ${meta.description}`}
      className={`inline-flex ${badgeSize} shrink-0 items-center justify-center rounded-full`}
      style={{ backgroundColor: meta.color }}
    >
      <Icon className={`${iconSize} text-white`} strokeWidth={2.5} aria-hidden />
    </span>
  );
}

/** Legend for the given statuses (e.g. only those present in the data), in eScreen's legend order. */
export function ClinicStatusLegend({ statuses: shown }: { statuses?: Set<ClinicStatus> }) {
  const statuses = (Object.keys(clinicStatusMeta) as ClinicStatus[]).filter((s) => !shown || shown.has(s));

  return (
    <dl className="grid gap-x-6 gap-y-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
      {statuses.map((status) => (
        <div key={status} className="flex items-start gap-2">
          <ClinicStatusIcon status={status} size="sm" />
          <div>
            <dt className="font-semibold text-slate-700">{clinicStatusMeta[status].label}</dt>
            <dd className="text-slate-500">{clinicStatusMeta[status].description}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
