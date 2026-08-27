import { FlaskConical, CalendarDays, ShieldCheck, Timer, ClipboardCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { icon: FlaskConical, label: "On-site laboratory" },
  { icon: CalendarDays, label: "Open 6 days a week" },
  { icon: ShieldCheck, label: "Certified collectors" },
  { icon: Timer, label: "Short wait times" },
  { icon: ClipboardCheck, label: "No appointment needed" },
];

export function Differentiators() {
  return (
    <section className="border-y border-slate/20 bg-ink/5">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={index * 60}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className="h-6 w-6 text-clear" strokeWidth={1.5} />
                  <p className="text-xs font-medium text-ink">{item.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}