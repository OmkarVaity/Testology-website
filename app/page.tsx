import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testology, Inc. | Certified Drug Testing in Brighton, MA",
  description:
    "Certified drug and alcohol testing, DOT physicals, and blood panel services in Brighton, MA. Walk-ins welcome, same-day results available.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Testimonials />
    </>
  );
}