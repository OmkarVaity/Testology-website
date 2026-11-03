import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { DrugCatalog } from "@/components/catalog/DrugCatalog";
import { drugPanels } from "@/content/drug-catalog";

export const metadata: Metadata = {
  title: "Drug Testing Catalog — Urine, Hair, Oral Fluid & Breath Panels | Testology, Inc.",
  description: `Browse ${drugPanels.length} drug testing panels with pricing — urine, hair, oral fluid and breath alcohol. Filter by the exact drugs you need to test for and compare panels side by side.`,
  alternates: { canonical: "/catalog/drugs" },
};

export default function DrugCatalogPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Drug testing catalog"
        title="Find the right drug test"
        tagline="Urine, hair, oral fluid & breath alcohol panels"
        intro={`Browse all ${drugPanels.length} panels, filter by the specific drugs you need to test for, and compare up to three side by side.`}
        iconName="FlaskConical"
      />

      <section className="container-wide pb-16">
        <DrugCatalog />
      </section>
    </>
  );
}
