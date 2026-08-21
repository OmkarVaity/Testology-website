type PanelChipProps = {
  label: string;
  variant?: "default" | "highlight";
};

export function PanelChip({ label, variant = "default" }: PanelChipProps) {
  const styles =
    variant === "highlight"
      ? "bg-clear/15 text-clear border border-clear/30"
      : "bg-ink/5 text-ink";

  return (
    <span
      className={`rounded-md px-2.5 py-1.5 font-mono-panel text-[11px] tracking-wide ${styles}`}
    >
      {label}
    </span>
  );
}