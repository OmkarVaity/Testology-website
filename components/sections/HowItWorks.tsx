"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, CalendarClock, FlaskConical, FileText } from "lucide-react";

const steps = [
  {
    icon: CalendarClock,
    title: "Book or Walk In",
    desc: "Schedule an appointment online or simply walk in for urine drug tests (last walk-in at 5:30 PM). All other services by appointment.",
  },
  {
    icon: ClipboardCheck,
    title: "Check In & Verify",
    desc: "Our front desk team will verify your information and get you set up quickly. Short wait times guaranteed.",
  },
  {
    icon: FlaskConical,
    title: "Sample Collection",
    desc: "Certified professionals collect your sample using industry-standard protocols and chain-of-custody procedures.",
  },
  {
    icon: FileText,
    title: "Get Your Results",
    desc: "Receive your lab results through our secure portal. Empowered with the information you need for your health journey.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Simple Process
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            Getting tested has never been easier. Follow these four simple steps.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="group flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary-200 bg-white shadow-lg shadow-primary-500/10 transition-all duration-300 hover:border-primary-400 hover:shadow-primary-500/20 lg:h-20 lg:w-20">
                      <Icon className="h-8 w-8 text-primary-600 transition-transform group-hover:scale-110 lg:h-9 lg:w-9" />
                    </div>
                    <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-slate-500">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}