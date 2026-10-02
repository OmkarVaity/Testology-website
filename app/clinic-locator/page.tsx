import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { ClinicLocator } from "@/components/sections/ClinicLocator";
import { DirectoryLinkGrid } from "@/components/sections/ClinicDirectory";
import { getAllStates, statePath } from "@/lib/clinic-directory";

export const metadata: Metadata = {
  title: "Clinic Locator | Testology, Inc.",
  description:
    "Find eScreen-affiliated clinics near you for drug testing, DOT physicals, and occupational health services — thousands of locations nationwide.",
  // Searches live in the query string (?q=…); they all point search engines at the one locator page.
  alternates: { canonical: "/clinic-locator" },
};

export default function ClinicLocatorPage() {
  const states = getAllStates();

  return (
    <>
      <ServicePageHeader
        eyebrow="eScreen network"
        title="Find a clinic near you"
        tagline="Search our eScreen-affiliated clinic network"
        intro="Testology is an authorized eScreen collection site. Search by zip code or address to find the closest of thousands of eScreen-affiliated clinics nationwide for drug testing, DOT physicals, and occupational health services."
        iconName="Building2"
        color="from-primary-500 to-primary-700"
      />

      <section className="container-wide py-14">
        <ClinicLocator />
      </section>

      <section className="container-wide pb-16">
        <h2 className="font-display-bolt mb-2 text-2xl font-semibold text-slate-900">Browse clinics by state</h2>
        <p className="mb-5 text-sm text-slate-500">Every eScreen-affiliated clinic, grouped by state and city.</p>
        <DirectoryLinkGrid
          links={states.map((state) => ({ href: statePath(state), label: state.name, count: state.clinics.length }))}
        />
      </section>
    </>
  );
}
