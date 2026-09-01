"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site-config";

const affiliations = ["Quest Preferred Site", "eScreen Top Site", "LabCorp Collection Site"];

export function TrustBar() {
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="container-wide flex flex-col items-center justify-center gap-3 py-4 text-center sm:flex-row sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {affiliations.map((label) => (
            <span
              key={label}
              className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
            >
              {label}
            </span>
          ))}
        </motion.div>

        <span className="hidden h-4 w-px bg-slate-200 sm:inline" />

        <p className="text-xs font-medium text-amber-600">{siteConfig.hours.lastWalkIn}</p>
      </div>
    </div>
  );
}