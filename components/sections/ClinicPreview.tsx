"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site-config";

// TODO: replace this illustration with a real photo once available — swap the
// <svg> block below for:
// <img src="/images/clinic-exterior.jpg" alt="Testology's Brighton clinic entrance" className="h-full w-full object-cover" />
function ClinicIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8fafc" />
      <g opacity="0.5">
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={20 + col * 28} cy={20 + row * 28} r="1.2" fill="#0d9488" opacity="0.15" />
          )),
        )}
      </g>
      <rect x="70" y="110" width="260" height="150" rx="8" fill="#0f172a" />
      <rect x="90" y="140" width="50" height="60" rx="4" fill="#f8fafc" />
      <rect x="175" y="140" width="50" height="60" rx="4" fill="#f8fafc" />
      <rect x="260" y="140" width="50" height="60" rx="4" fill="#f8fafc" />
      <rect x="180" y="215" width="40" height="45" rx="4" fill="#0d9488" />
      <rect x="140" y="80" width="120" height="26" rx="13" fill="#0d9488" />
      <text x="200" y="98" textAnchor="middle" fontFamily="sans-serif" fontWeight="600" fontSize="12" fill="#ffffff" letterSpacing="1">
        TESTOLOGY
      </text>
      <rect x="70" y="106" width="260" height="6" rx="3" fill="#0d9488" />
    </svg>
  );
}

export function ClinicPreview() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
              Brighton, MA
            </span>
            <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">
              Visit our Brighton clinic
            </h2>
            <p className="mb-4 max-w-md text-lg text-slate-600">
              {siteConfig.location.line1}, {siteConfig.location.line2}. Walk-ins welcome for most
              drug testing panels — no appointment needed for a standard urine screen.
            </p>
            <p className="text-sm text-slate-500">{siteConfig.location.transit}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-hover overflow-hidden rounded-3xl border border-slate-100 shadow-xl"
          >
            <ClinicIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}