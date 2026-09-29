"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/content/site-config";

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
            <Image
              src="/images/clinic/waiting-room.jpg"
              alt="Testology's Brighton clinic waiting area"
              width={700}
              height={500}
              className="h-[350px] w-full object-cover lg:h-[420px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}