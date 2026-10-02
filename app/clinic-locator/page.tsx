import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { ClinicLocator } from "@/components/sections/ClinicLocator";

export const metadata: Metadata = {
  title: "Clinic Locator | Testology, Inc.",
  description:
    "Find eScreen-affiliated clinics near you for drug testing, DOT physicals, and occupational health services — thousands of locations nationwide.",
};

export default function ClinicLocatorPage() {
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
    </>
  );
}
