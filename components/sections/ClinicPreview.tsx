"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site-config";

// Text only for now. The clinic photo (public/images/clinic/waiting-room.jpg) was removed from this section;
// see git history to bring the two-column photo layout back.
export function ClinicPreview() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Brighton, MA
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">
            Visit our Brighton clinic
          </h2>
          <p className="mb-4 text-lg text-slate-600">
            {siteConfig.location.line1}, {siteConfig.location.line2}. Walk-ins welcome for most
            drug testing panels — no appointment needed for a standard urine screen.
          </p>
          <p className="text-sm text-slate-500">{siteConfig.location.transit}</p>
        </motion.div>
      </div>
    </section>
  );
}
