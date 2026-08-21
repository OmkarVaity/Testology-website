const testimonials = [
  {
    initials: "MR",
    quote:
      "The most reliable, efficient, and professional medical examiners in Massachusetts. Roei and his team have proven themselves time and time again.",
  },
  {
    initials: "JK",
    quote:
      "I cannot say enough great things about Roei and his team. We have used them for countless medical exams for our clients and have never had a complaint.",
  },
  {
    initials: "SP",
    quote:
      "Excellent service. Guy went out of his way to make sure I could test at the last minute before closing. Quick and easy, best place hands down.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-10 font-display text-2xl font-medium text-ink">What people say</h2>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.initials} className="rounded-lg border border-slate/20 bg-white p-5">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-xs font-medium text-ink">
              {t.initials}
            </div>
            <p className="text-sm text-slate">&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
}