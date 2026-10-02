import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/dot-testing",
    "/services/drug-and-alcohol-testing",
    "/services/rapid-drug-testing",
    "/services/oral-fluid-testing",
    "/services/hair-drug-testing",
    "/services/mobile-drug-testing",
    "/blood-profiles",
    "/blood-profiles/immunity-panels",
    "/blood-profiles/specialty-panels",
    "/employer-solutions",
    "/physicals",
    "/testology-labs",
    "/vaccines",
    "/respiratory-fit-testing",
    "/paramedical-services",
    "/genetic-testing",
    "/mobile-phlebotomy",
    "/event-drug-testing",
    "/partnered-labs",
    "/clinic-locator",
    "/catalog",
    "/catalog/panels",
    "/catalog/drugs",
    "/catalog/peptides",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/hipaa-notice",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}