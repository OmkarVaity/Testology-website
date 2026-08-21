type ServicePageHeaderProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export function ServicePageHeader({ eyebrow, title, intro }: ServicePageHeaderProps) {
  return (
    <div className="border-b border-slate/20 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-mono-panel text-xs uppercase tracking-wide text-clear">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-medium text-ink">{title}</h1>
        <p className="mt-4 max-w-xl text-slate">{intro}</p>
      </div>
    </div>
  );
}