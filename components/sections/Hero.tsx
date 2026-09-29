"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Clock, MapPin, Shield, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";

const stats = [
  { value: "6", label: "Days a Week", icon: Clock },
  { value: "24/7", label: "On-Site Available", icon: Zap },
  { value: "3", label: "Lab Partnerships", icon: Award },
  { value: "100%", label: "Certified & Compliant", icon: Shield },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pb-16 pt-12 lg:pb-24 lg:pt-20">
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div className="hero-glow absolute inset-0" />
      <div className="animate-blob absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary-300/20 blur-3xl" />
      <div className="animate-blob animation-delay-200 absolute right-10 top-40 h-96 w-96 rounded-full bg-blue-300/15 blur-3xl" />

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex w-fit items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500" />
              <span className="text-sm font-medium text-primary-700">
                Quest Preferred Site &middot; eScreen Top Site &middot; LabCorp Collection Site
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display-bolt text-balance text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Elevate to <span className="text-gradient">Evaluate</span> and Embark
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl text-lg leading-relaxed text-slate-600"
            >
              The most reliable, efficient, and professional medical examiners in Massachusetts.
              Drug & alcohol testing, DOT physicals, blood profiles, wellness screenings, and
              mobile phlebotomy — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="group h-14 rounded-xl bg-primary-600 px-8 text-base text-white shadow-xl shadow-primary-500/30 hover:bg-primary-700"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-xl border-2 border-slate-200 px-8 text-base hover:border-primary-300 hover:bg-primary-50"
                >
                  <Phone className="mr-2 h-5 w-5 text-primary-600" />
                  {siteConfig.contact.tollFree}
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="h-4 w-4 text-primary-600" />
                <span>Walk-ins welcome until 5:30 PM</span>
              </div>
              <div className="h-4 w-px bg-slate-300" />
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-primary-600" />
                <span>Brighton, MA</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20">
              <Image
                src="https://images.pexels.com/photos/8442376/pexels-photo-8442376.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Drug and alcohol testing collection at Testology"
                width={900}
                height={500}
                className="h-[400px] w-full object-cover lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-card animate-float absolute -left-4 top-12 rounded-2xl p-4 shadow-xl lg:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Certified Testing</p>
                  <p className="text-xs text-slate-500">DOT & Non-DOT compliant</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="glass-card animate-float animation-delay-400 absolute -right-4 bottom-16 rounded-2xl p-4 shadow-xl lg:-right-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Top Rated Site</p>
                  <p className="text-xs text-slate-500">Award-winning service</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute right-6 top-6 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md"
            >
              <span className="text-sm font-semibold text-primary-700">HSA & FSA Accepted</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass-card card-hover rounded-2xl p-5 text-center lg:p-6"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <p className="font-display-bolt text-2xl font-bold text-slate-900 lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}