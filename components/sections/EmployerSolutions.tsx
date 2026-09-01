"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Users, FileCheck, Database, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tpaFeatures = [
  "Random drug & alcohol pool management (DOT & Non-DOT)",
  "Pre-employment, post-accident, reasonable suspicion & RTD testing",
  "MRO coordination & verified result delivery",
  "DOT consortium enrollment for owner-operators and small fleets",
  "49 CFR Part 40 & 382 compliance support",
  "FMCSA Clearinghouse query & violation reporting",
  "Secure employer portal for real-time tracking",
  "Electronic CCF (eCCF) for paperless chain of custody",
  "Return-to-duty process and SAP referral assistance",
];

const advantages = [
  {
    icon: Building2,
    title: "On-Site Convenience",
    desc: "Testing conducted discreetly at your location, reducing exposure to external environments.",
  },
  {
    icon: Users,
    title: "Safer Workplaces",
    desc: "Helps reduce workplace accidents by ensuring employees are drug-free before they start work.",
  },
  {
    icon: FileCheck,
    title: "Cost-Effective",
    desc: "Eliminates travel costs and potential lost wages associated with off-site testing.",
  },
  {
    icon: Database,
    title: "Tailored to Your Needs",
    desc: "Whether pre-employment, random, post-accident, or periodic — we customize to fit your requirements.",
  },
];

export function EmployerSolutions() {
  return (
    <section id="employer-solutions" className="relative bg-white py-20 lg:py-28">
      <div className="section-glow absolute inset-0" />
      <div className="container-wide relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700"
            >
              Employer Solutions
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display-bolt text-balance mb-6 text-3xl font-bold text-slate-900 lg:text-4xl"
            >
              Full-Service TPA & DOT Consortium
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 text-lg leading-relaxed text-slate-600"
            >
              We serve as a full-service Third-Party Administrator (TPA) and DOT Consortium
              provider, helping employers stay compliant with federal and industry drug and
              alcohol testing regulations. Whether you&apos;re an owner-operator, a small
              business, or a nationwide employer, we manage your entire drug testing program —
              so you can stay audit-ready with confidence.
            </motion.p>

            <div className="mb-8 space-y-3">
              {tpaFeatures.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                    <Check className="h-3 w-3 text-primary-600" />
                  </div>
                  <span className="text-sm text-slate-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                className="group rounded-xl bg-primary-600 px-8 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`card-hover rounded-2xl bg-gradient-to-br p-6 ${
                    i % 2 === 0
                      ? "border border-primary-100 from-primary-50 to-white"
                      : "border border-blue-100 from-blue-50 to-white"
                  } ${i === 1 ? "sm:mt-8" : ""} ${i === 3 ? "sm:mt-8" : ""}`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                      i % 2 === 0 ? "bg-primary-600" : "bg-blue-600"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display-bolt mb-2 text-base font-semibold text-slate-900">
                    {adv.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{adv.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}