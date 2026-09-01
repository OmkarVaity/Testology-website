"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  FlaskConical,
  Truck,
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
} from "lucide-react";

const services = [
  {
    href: "/services/drug-and-alcohol-testing",
    icon: FlaskConical,
    title: "Drug & Alcohol Testing",
    shortDesc: "Comprehensive urine and breath alcohol testing with fast, accurate results.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    href: "/dot-testing",
    icon: Truck,
    title: "DOT Testing",
    shortDesc: "Full DOT-compliant drug and alcohol testing for FMCSA, FAA, FRA, FTA, PHMSA & USCG.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    href: "/physicals",
    icon: Stethoscope,
    title: "Physicals",
    shortDesc: "DOT physical exams, pre-employment physicals, and wellness checkups.",
    color: "from-emerald-500 to-green-600",
  },
  {
    href: "/blood-profiles",
    icon: Droplet,
    title: "Blood Profiles",
    shortDesc: "Comprehensive blood draws and lab profiles by appointment with certified phlebotomists.",
    color: "from-rose-500 to-red-600",
  },
  {
    href: "/vaccines",
    icon: Syringe,
    title: "Vaccines",
    shortDesc: "Stay protected with our full range of vaccination services.",
    color: "from-amber-500 to-orange-600",
  },
  {
    href: "/respiratory-fit-testing",
    icon: Wind,
    title: "Respiratory Fit Testing",
    shortDesc: "OSHA-compliant respirator fit testing for workplace safety compliance.",
    color: "from-sky-500 to-blue-600",
  },
  {
    href: "/genetic-testing",
    icon: Dna,
    title: "Genetic Testing",
    shortDesc: "Advanced genetic testing to empower your health journey with actionable insights.",
    color: "from-violet-500 to-purple-600",
  },
  {
    href: "/mobile-phlebotomy",
    icon: Ambulance,
    title: "Mobile Phlebotomy",
    shortDesc: "On-site blood draw services at your home or office — convenient and professional.",
    color: "from-pink-500 to-rose-600",
  },
  {
    href: "/event-drug-testing",
    icon: Calendar,
    title: "Event Drug Testing",
    shortDesc: "On-site drug testing for group events, screenings, and workplace programs.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    href: "/employer-solutions",
    icon: Building2,
    title: "Employer Solutions",
    shortDesc: "Full-service TPA and DOT consortium management for businesses of all sizes.",
    color: "from-blue-500 to-sky-600",
  },
  {
    href: "/paramedical-services",
    icon: Microscope,
    title: "Paramedical Services",
    shortDesc: "Certified clinic-based, on-site, and remote paramedical collections.",
    color: "from-cyan-500 to-teal-600",
  },
  {
    // TODO: no dedicated page exists yet for this — routed to Genetic Testing
    // temporarily since prenatal genetic screening overlaps. Build a real
    // /moms-program page once the service is confirmed.
    href: "/genetic-testing",
    icon: Users,
    title: "MOMS Program",
    shortDesc: "Specialized maternal wellness and screening services for expectant mothers.",
    color: "from-fuchsia-500 to-pink-600",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-white py-20 lg:py-28">
      <div className="section-glow absolute inset-0" />
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Our Services
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-5xl">
            Comprehensive Testing Solutions
          </h2>
          <p className="text-lg text-slate-600">
            From drug screening to wellness panels, we provide a full spectrum of professional
            medical testing services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href + service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="card-hover group relative block h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-6"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg transition-transform group-hover:rotate-3 group-hover:scale-110`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary-700">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">
                    {service.shortDesc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}