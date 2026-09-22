import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site-config";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h3l1-3h-4v-2c0-.55.45-1 1-1z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <circle cx="7" cy="7" r="0.5" fill="currentColor" />
      <path d="M11 17v-4.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" />
      <line x1="11" y1="10" x2="11" y2="17" />
    </svg>
  );
}

const footerLinks = {
  Services: [
    { label: "Drug & Alcohol Testing", href: "/services/drug-and-alcohol-testing" },
    { label: "DOT Testing", href: "/dot-testing" },
    { label: "Physicals", href: "/physicals" },
    { label: "Blood Profiles", href: "/blood-profiles" },
    { label: "Vaccines", href: "/vaccines" },
    { label: "Mobile Phlebotomy", href: "/mobile-phlebotomy" },
  ],
  Company: [
    { label: "Partnered Labs", href: "/partnered-labs" },
    { label: "Employer Solutions", href: "/employer-solutions" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Genetic Testing", href: "/genetic-testing" },
    { label: "Respiratory Fit Testing", href: "/respiratory-fit-testing" },
    { label: "Event Drug Testing", href: "/event-drug-testing" },
    { label: "Testology Labs", href: "/testology-labs" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl" />

      <div className="container-wide relative z-10 py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Testology, Inc. logo"
                width={44}
                height={44}
                className="rounded-full"
              />
              <div>
                <p className="font-display-bolt text-xl font-bold">Testology</p>
                <p className="text-xs text-slate-500">ELEVATE TO EVALUATE</p>
              </div>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              The most reliable, efficient, and professional medical examiners in Massachusetts.
              Quest Preferred Site, eScreen Top Site, LabCorp Collection Site.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-primary-400"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.tollFree}
              </a>
              <a
                href={`mailto:${siteConfig.contact.examsEmail}`}
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-primary-400"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.contact.examsEmail}
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                {siteConfig.location.line1}, {siteConfig.location.line2}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 hover:border-primary-600 hover:bg-primary-600 hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.social.facebook}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 hover:border-primary-600 hover:bg-primary-600 hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href={siteConfig.social.linkedin}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 hover:border-primary-600 hover:bg-primary-600 hover:text-white"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-2">
              <h3 className="font-display-bolt mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-primary-400"
                    >
                      <ArrowRight className="h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h3 className="font-display-bolt mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Get Started
            </h3>
            <p className="mb-4 text-sm text-slate-400">
              Book your appointment today. Walk-ins welcome.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-colors hover:bg-primary-700"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {siteConfig.name} All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500">
            <Link href="/privacy-policy" className="hover:text-primary-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-400">
              Terms of Service
            </Link>
            <Link href="/hipaa-notice" className="hover:text-primary-400">
              HIPAA Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}