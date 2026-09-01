"use client";

import { motion } from "framer-motion";
import { Truck, FileCheck, ShieldCheck, Building2 } from "lucide-react";

const authorities = [
  { name: "FMCSA", full: "Federal Motor Carrier Safety Administration" },
  { name: "FAA", full: "Federal Aviation Administration" },
  { name: "FTA", full: "Federal Transit Administration" },
  { name: "FRA", full: "Federal Railroad Administration" },
  { name: "PHMSA", full: "Pipeline & Hazardous Materials Safety Admin." },
  { name: "USCG", full: "United States Coast Guard" },
];

const reasons = [
  { icon: FileCheck, label: "Pre-Employment" },
  { icon: ShieldCheck, label: "Post-Accident" },
  { icon: Truck, label: "Reasonable Suspicion" },
  { icon: Building2, label: "Random" },
  { icon: FileCheck, label: "Return-to-Duty" },
  { icon: ShieldCheck, label: "Follow-Up" },
];

const dotTests = [
  { title: "DOT Drug Test", desc: "Lab-based 5-panel drug screen compliant with 49 CFR Part 40." },
  { title: "DOT Physical Exam", desc: "Certified medical examiner conducts your DOT physical examination." },
  { title: "DOT BAT", desc: "Breath alcohol testing conducted by certified BAT technicians." },
];

export function DotTesting() {
  return (
    <section id="dot-testing" className="relative overflow-hidden bg-slate-900 py-20 lg:py-28">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-500/20 px-4 py-1.5 text-sm font-semibold text-primary-300"
            >
              DOT Compliance
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display-bolt text-balance mb-6 text-3xl font-bold text-white lg:text-5xl"
            >
              DOT Testing Done Right
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 text-lg leading-relaxed text-slate-400"
            >
              We offer a range of comprehensive DOT testing services to ensure your company
              remains compliant with regulatory standards. Our team provides efficient and
              accurate testing procedures, guaranteeing the safety and integrity of your
              workforce.
            </motion.p>

            <div className="mb-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                DOT Authorities We Work With
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {authorities.map((auth, i) => (
                  <motion.div
                    key={auth.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group cursor-default rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 text-center backdrop-blur transition-colors hover:border-primary-500/50"
                  >
                    <p className="font-display-bolt text-lg font-bold text-white transition-colors group-hover:text-primary-400">
                      {auth.name}
                    </p>
                    <p className="mt-1 text-[10px] leading-tight text-slate-500">{auth.full}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                DOT-Approved Reasons for Testing
              </h3>
              <div className="flex flex-wrap gap-2">
                {reasons.map((reason, i) => {
                  const Icon = reason.icon;
                  return (
                    <motion.span
                      key={reason.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-primary-500/50"
                    >
                      <Icon className="h-4 w-4 text-primary-400" />
                      {reason.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {dotTests.map((test, i) => (
              <motion.div
                key={test.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-800/50 p-6 transition-all duration-300 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-500/20 transition-colors group-hover:bg-primary-500/30">
                    <ShieldCheck className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-display-bolt mb-1 text-lg font-semibold text-white">
                      {test.title}
                    </h3>
                    <p className="text-sm text-slate-400">{test.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}