"use client";

import { motion } from "framer-motion";
import {
  Truck,
  FlaskConical,
  Stethoscope,
  Droplet,
  Syringe,
  Wind,
  Dna,
  Ambulance,
  Calendar,
  Building2,
  Microscope,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Truck,
  FlaskConical,
  Stethoscope,
  Droplet,
  Syringe,
  Wind,
  Dna,
  Ambulance,
  Calendar,
  Building2,
  Microscope,
  Users,
};

type ServicePageHeaderProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  iconName?: keyof typeof iconMap;
  tagline?: string;
  color?: string;
};

export function ServicePageHeader({
  eyebrow,
  title,
  intro,
  image,
  iconName,
  tagline,
  color = "from-primary-500 to-primary-700",
}: ServicePageHeaderProps) {
  const Icon = iconName ? iconMap[iconName] : undefined;
  if (image) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid-pattern absolute inset-0 opacity-40" />
        <div className="animate-blob absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary-300/20 blur-3xl" />
        <div className="animate-blob animation-delay-200 absolute right-10 top-40 h-96 w-96 rounded-full bg-blue-300/15 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              {Icon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-xl`}
                >
                  <Icon className="h-9 w-9 text-white" />
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display-bolt text-balance text-4xl font-bold leading-[1.1] text-slate-900 lg:text-5xl"
              >
                {title}
              </motion.h1>

              {tagline && (
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl font-medium text-primary-600"
                >
                  {tagline}
                </motion.p>
              )}

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg leading-relaxed text-slate-600"
              >
                {intro}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={title} className="h-[350px] w-full object-cover lg:h-[440px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              </div>

              {Icon && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="glass-card animate-float absolute -left-4 top-10 rounded-2xl p-4 shadow-xl lg:-left-8"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{title}</p>
                      <p className="text-xs text-slate-500">Testology, Inc.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white">
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="hero-glow absolute inset-0" />

      <div className="container-wide relative z-10 py-14 lg:py-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display-bolt text-balance mb-4 max-w-2xl text-3xl font-bold text-slate-900 lg:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-lg text-slate-600"
        >
          {intro}
        </motion.p>
      </div>
    </div>
  );
}