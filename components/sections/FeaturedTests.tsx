"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlaskRound, ArrowRight, Check } from "lucide-react";

const panels = [
  { name: "5 Panel", desc: "Screens for 5 common drug classes", popular: false },
  { name: "7 Panel", desc: "Expanded screening with 7 drug classes", popular: false },
  { name: "9 Panel", desc: "Comprehensive 9-panel drug screen", popular: true },
  { name: "10 Panel", desc: "Full-spectrum 10-panel screening", popular: false },
  { name: "eCup+ 4A", desc: "Electronic cup — instant results", popular: false },
  { name: "eCup+ 5A", desc: "Electronic cup with expanded panel", popular: false },
];

const features = [
  "Lab-based & instant testing options",
  "eCCF paperless chain of custody",
  "MRO coordination & verified results",
  "FMCSA Clearinghouse reporting",
];

export function FeaturedTests() {
  return (
    <section id="featured-tests" className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Featured Testing
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-5xl">
            Browse Our Test Panels
          </h2>
          <p className="text-lg text-slate-600">
            Choose from a wide range of drug testing panels — from standard 5-panel screens to
            advanced electronic instant-result cups.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className={`card-hover relative rounded-2xl border-2 p-6 ${
                panel.popular
                  ? "border-primary-400 bg-gradient-to-br from-primary-50 to-white shadow-lg shadow-primary-500/10"
                  : "border-slate-100 bg-white"
              }`}
            >
              {panel.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  Most Popular
                </span>
              )}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    panel.popular ? "bg-primary-600" : "bg-slate-100"
                  }`}
                >
                  <FlaskRound className={`h-6 w-6 ${panel.popular ? "text-white" : "text-slate-600"}`} />
                </div>
                <h3 className="font-display-bolt text-xl font-bold text-slate-900">{panel.name}</h3>
              </div>
              <p className="mb-5 text-sm text-slate-600">{panel.desc}</p>
              <Link
                href="/services/rapid-drug-testing"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-3xl bg-slate-900 p-8 lg:p-12"
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex-1">
              <h3 className="font-display-bolt mb-2 text-2xl font-bold text-white lg:text-3xl">
                Every test comes with our guarantee
              </h3>
              <p className="text-slate-400">
                Certified processes, secure data, and fast turnaround — every time.
              </p>
            </div>
            <div className="grid flex-shrink-0 grid-cols-2 gap-x-8 gap-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}