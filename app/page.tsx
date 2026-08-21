import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Testimonials />
    </>
  );
}