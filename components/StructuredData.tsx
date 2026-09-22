import { siteConfig } from "@/content/site-config";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": siteConfig.url,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: `+1-${siteConfig.contact.tollFree}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.line1,
      addressLocality: "Brighton",
      addressRegion: "MA",
      postalCode: "02135",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook, siteConfig.social.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}