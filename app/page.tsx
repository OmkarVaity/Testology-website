import { TrustBar } from "@/components/sections/TrustBar";
import { QuickInfoStrip } from "@/components/sections/QuickInfoStrip";
import { Differentiators } from "@/components/sections/Differentiators";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FindUs } from "@/components/sections/FindUs";

export default function HomePage() {
  return (
    <>
      <TrustBar />
      <Hero />
      <QuickInfoStrip />
      <Differentiators />
      <HowItWorks />
      <ServicesGrid />
      <Testimonials />
      <FindUs />
    </>
  );
}