import { Search, FlaskConical, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Select your test",
    description:
      "Choose your test by browsing our panels. Send your enquiry and we'll get back to you.",
  },
  {
    icon: FlaskConical,
    title: "Sample collection",
    description:
      "Our qualified staff collect oral, urine, hair, or blood samples without contamination, for trusted results.",
  },
  {
    icon: FileCheck,
    title: "Get your results",
    description:
      "Once your lab results arrive, you're equipped with what you need for the next steps in your health journey.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-10 font-display text-2xl font-medium text-ink">How it works</h2>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-ink/5">
                <Icon className="h-5 w-5 text-clear" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 font-display text-base font-medium text-ink">{step.title}</h3>
              <p className="text-sm text-slate">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}