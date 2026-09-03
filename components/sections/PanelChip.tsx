type PanelChipProps = {
  label: string;
  variant?: "default" | "highlight";
};

export function PanelChip({ label, variant = "default" }: PanelChipProps) {
  const styles =
    variant === "highlight"
      ? "bg-primary-600 text-white border border-primary-600"
      : "bg-primary-50 text-primary-700 border border-primary-100";

  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${styles}`}>{label}</span>
  );
}