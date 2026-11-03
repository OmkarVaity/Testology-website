import Link from "next/link";
import type { Metadata } from "next";
import { Building2, CheckCircle2, Droplet, Network, Truck } from "lucide-react";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { LabPartnershipForm } from "@/components/sections/LabPartnershipForm";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Lab Partnerships | Testology, Inc.",
  description:
    "Laboratories: partner with Testology for specimen collection at our Brighton, MA clinic, mobile phlebotomy, and patient and employer testing programs.",
  alternates: { canonical: "/lab-partnerships" },
};

const reasons = [
  {
    icon: Building2,
    title: "An established collection site",
    text: "A Quest Preferred Site, eScreen Top Site and LabCorp Collection Site, collecting at our clinic in Brighton, MA.",
  },
  {
    icon: Truck,
    title: "Mobile phlebotomy",
    text: "We can collect samples on-site at homes, offices and events, not only at our clinic.",
  },
  {
    icon: Network,
    title: "Experienced with specialty labs",
    text: "We already route samples to specialty labs in oncology, genetics, cardiology and more.",
  },
  {
    icon: Droplet,
    title: "Employer and TPA programs",
    text: "As a Third-Party Administrator and DOT consortium, we run testing programs for employers of every size.",
  },
];

const nextSteps = [
  "Tell us about your lab and how you'd like to work together.",
  "Our partnerships team reviews your inquiry and reaches out to you.",
  "We discuss collection requirements, logistics and next steps.",
];

export default function LabPartnershipsPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="For laboratories"
        title="Partner with Testology"
        tagline="Specimen collection and patient access for your lab"
        intro="Looking for a reliable collection partner in the Boston area? Send us a few details about your lab and our team will reach out to discuss working together."
        iconName="Microscope"
        color="from-blue-500 to-sky-600"
      />

      <section className="container-wide pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="font-display-bolt mb-5 text-2xl font-semibold text-slate-900">Why labs work with us</h2>
            <ul className="mb-10 space-y-5">
              {reasons.map((reason) => (
                <li key={reason.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <reason.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">{reason.title}</span>
                    <span className="block text-sm text-slate-600">{reason.text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="font-display-bolt mb-4 text-xl font-semibold text-slate-900">What happens next</h2>
            <ol className="mb-8 space-y-3">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-slate-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <p className="flex gap-2 text-sm text-slate-500">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <span>
                See the labs we already work with on our{" "}
                <Link href="/partnered-labs" className="font-semibold text-primary-700 hover:underline">
                  partnered labs
                </Link>{" "}
                page, or call us at{" "}
                <a href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`} className="font-semibold text-primary-700 hover:underline">
                  {siteConfig.contact.tollFree}
                </a>
                .
              </span>
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display-bolt mb-1 text-xl font-semibold text-slate-900">Partnership inquiry</h2>
            <p className="mb-6 text-sm text-slate-500">Fields marked * are required.</p>
            <LabPartnershipForm />
          </div>
        </div>
      </section>
    </>
  );
}
