"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site-config";

export function QuickInfoStrip() {
  const items = [
    {
      icon: Phone,
      label: "Call",
      value: siteConfig.contact.tollFree,
      href: `tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon–Fri, 9AM–6PM",
      href: "/contact",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Brighton, MA",
      href: "/contact",
    },
  ];

  return (
    <div className="border-y border-slate-100 bg-white py-8">
      <div className="container-wide grid gap-4 sm:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="card-hover flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}