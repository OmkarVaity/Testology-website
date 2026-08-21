export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const siteConfig = {
  name: "Testology, Inc.",
  tagline: "Certified drug testing and health screening in Brighton, MA",

  contact: {
    tollFree: "877-211-4447",
    direct: "857-384-9194",
    examsEmail: "exams@testology.org",
  },

  location: {
    name: "Brighton Clinic",
    line1: "380 Washington St., Suite 202, 2nd Floor",
    line2: "Brighton, MA 02135",
  },

  hours: {
    weekday: "Monday–Friday: 9AM–6PM",
    saturday: "Closed (July & August 2026)",
  },

  // Primary nav — visible directly in the header
  primaryNav: [
    {
      label: "Drug & Alcohol Testing",
      href: "/services/drug-and-alcohol-testing",
      children: [
        { label: "Rapid Drug Testing", href: "/services/rapid-drug-testing" },
        { label: "Oral Fluid Testing", href: "/services/oral-fluid-testing" },
        { label: "Hair Drug Testing", href: "/services/hair-drug-testing" },
        { label: "Mobile Drug Testing", href: "/services/mobile-drug-testing" },
      ],
    },
    { label: "DOT Testing", href: "/dot-testing" },
    {
      label: "Blood Profiles",
      href: "/blood-profiles",
      children: [
        { label: "Immunity Panels", href: "/blood-profiles/immunity-panels" },
        { label: "Specialty Blood Panels", href: "/blood-profiles/specialty-panels" },
      ],
    },
    { label: "Employer Solutions", href: "/employer-solutions" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  // Everything else — tucked into a "More" dropdown
  moreNav: [
    { label: "Physicals", href: "/physicals" },
    { label: "Testology Labs", href: "/testology-labs" },
    { label: "Vaccines", href: "/vaccines" },
    { label: "Respiratory Fit Testing", href: "/respiratory-fit-testing" },
    { label: "Paramedical Services", href: "/paramedical-services" },
    { label: "Genetic Testing", href: "/genetic-testing" },
    { label: "Mobile Phlebotomy", href: "/mobile-phlebotomy" },
    { label: "Event Drug Testing", href: "/event-drug-testing" },
    { label: "Partnered Labs", href: "/partnered-labs" },
  ] satisfies NavItem[],
} as const;