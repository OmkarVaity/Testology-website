"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Clock, MapPin, Users, Lock } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Short Wait Times",
    desc: "No appointment needed for urine drug tests. We pride ourselves on minimal wait times and efficient service.",
  },
  {
    icon: Clock,
    title: "Open 6 Days a Week",
    desc: "Monday through Friday 9AM–6PM, with Saturday availability. 24/7 on-site emergency services available.",
  },
  {
    icon: MapPin,
    title: "On-Site Laboratory",
    desc: "Our Brighton clinic is a fully equipped on-site laboratory — no need to visit multiple locations.",
  },
  {
    icon: Shield,
    title: "Certified & Compliant",
    desc: "Nationally affiliated with NDASA and SAPAA. All testing meets federal and industry regulatory standards.",
  },
  {
    icon: Lock,
    title: "Data Security",
    desc: "Your health information is protected with industry-leading security and compliance protocols.",
  },
  {
    icon: Users,
    title: "Community Focused",
    desc: "Proudly serving the Boston community with trusted, professional, and compassionate care.",
  },
];

export function Benefits() {
  return (
    <section className="relative bg-gradient-to-b from-white via-primary-50/30 to-white py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Why Choose Us
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-5xl">
            The Testology Difference
          </h2>
          <p className="text-lg text-slate-600">
            We combine cutting-edge technology with compassionate care to deliver an unmatched
            testing experience.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="card-hover group relative rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
              >
                <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-primary-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 transition-colors duration-300 group-hover:bg-primary-600">
                    <Icon className="h-6 w-6 text-primary-600 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-display-bolt mb-1 text-lg font-semibold text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">{benefit.desc}</p>
                  </div>
                </div>
              </motion.div>  
            );
          })}
        </div>
      </div>
    </section>
  );
}