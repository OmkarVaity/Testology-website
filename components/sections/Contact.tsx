"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Brighton Clinic",
      lines: [siteConfig.location.name, siteConfig.location.line1, siteConfig.location.line2],
    },
    {
      icon: Clock,
      title: "Opening Hours",
      lines: [siteConfig.hours.weekday, `Saturday: ${siteConfig.hours.saturday}`, siteConfig.hours.lastWalkIn],
    },
    {
      icon: Phone,
      title: "Phone",
      lines: [
        `Toll-Free: ${siteConfig.contact.tollFree}`,
        `Direct: ${siteConfig.contact.direct}`,
        `24hr Emergency: ${siteConfig.contact.emergencyDispatch}`,
      ],
    },
    {
      icon: Mail,
      title: "Email",
      lines: [siteConfig.contact.examsEmail, siteConfig.contact.wellnessEmail, siteConfig.contact.dispatchEmail],
    },
  ];

  return (
    <section id="contact" className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Get In Touch
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-5xl">
            Contact & Location
          </h2>
          <p className="text-lg text-slate-600">
            Fill out the form and we&apos;ll get back to you shortly. Walk-ins welcome for urine
            drug tests.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-display-bolt mb-2 text-base font-semibold text-slate-900">
                    {info.title}
                  </h3>
                  <div className="space-y-0.5">
                    {info.lines.map((line) => (
                      <p key={line} className="text-sm text-slate-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl lg:col-span-3 lg:p-10"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}