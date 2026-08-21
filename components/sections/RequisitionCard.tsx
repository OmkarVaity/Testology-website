type RequisitionCardProps = {
  reqNumber: string;
  status: "Walk-in" | "Appointment";
  testName: string;
  location: string;
  turnaround: string;
};

export function RequisitionCard({
  reqNumber,
  status,
  testName,
  location,
  turnaround,
}: RequisitionCardProps) {
  return (
    <div className="rounded-lg border border-slate/30 bg-white p-4">
      <div className="mb-2.5 flex items-center justify-between border-b border-dashed border-slate/40 pb-2">
        <span className="font-mono-panel text-[10px] tracking-wide text-slate">
          REQ #{reqNumber}
        </span>
        <span className="font-mono-panel text-[10px] tracking-wide text-clear">
          {status.toUpperCase()}
        </span>
      </div>

      <p className="mb-1 text-sm font-medium text-ink">{testName}</p>
      <p className="mb-3 text-xs text-slate">{location}</p>

      <div className="flex justify-between font-mono-panel text-[11px] text-ink">
        <span>Turnaround</span>
        <span className="text-clear">{turnaround}</span>
      </div>
    </div>
  );
}