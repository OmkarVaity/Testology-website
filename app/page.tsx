import { TrustBar } from "@/components/sections/TrustBar";
import { QuickInfoStrip } from "@/components/sections/QuickInfoStrip";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Affiliations } from "@/components/sections/Affiliations";
import { ClinicPreview } from "@/components/sections/ClinicPreview";
import { FacilityGallery } from "@/components/sections/FacilityGallery";
import { Services } from "@/components/sections/Services";
import { FeaturedTests } from "@/components/sections/FeaturedTests";
import { DotTesting } from "@/components/sections/DotTesting";
import { Benefits } from "@/components/sections/Benefits";
import { EmployerSolutions } from "@/components/sections/EmployerSolutions";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <TrustBar />
      <Hero />
      <Services />
      <FeaturedTests />
      <DotTesting />
      <QuickInfoStrip />
      <ClinicPreview />
      <FacilityGallery />
      <HowItWorks />
      <Benefits />
      <Affiliations />
      <EmployerSolutions />
      <Testimonials />
      <Contact />
    </>
  );
}