const affiliations = [
  "SAPAA",
  "NDASA",
  "SAMHSA",
  "Abbott",
  "FormFox",
  "eScreen",
  "ExamOne",
  "Quest Diagnostics",
];

export function Affiliations() {
  return (
    <section className="border-t border-slate/20 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-2 font-display text-2xl font-medium text-ink">
          Nationally affiliated, locally trusted
        </h2>
        <p className="mb-10 max-w-xl text-sm text-slate">
          Testology is affiliated with NDASA and SAPAA, and works directly with major national
          lab networks to process your results.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {affiliations.map((name) => (
            <div
              key={name}
              className="flex h-16 items-center justify-center rounded-md border border-dashed border-slate/30 bg-ink/5 px-3"
            >
              {/* TODO: replace with <img src="/images/logos/[name].svg" /> once logo files are available */}
              <span className="text-center font-mono-panel text-[10px] uppercase tracking-wide text-slate">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}