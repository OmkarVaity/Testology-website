import { ContactForm } from "@/components/sections/ContactForm";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Us | Testology, Inc.",
  description:
    "Reach Testology, Inc. in Brighton, MA for scheduling, employer programs, or general questions about testing services.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 font-display text-3xl font-medium text-ink">Get in touch</h1>
      <p className="mb-8 max-w-md text-slate">
        Questions about a test, scheduling, or employer programs? Send us a message and
        we&apos;ll follow up within one business day.
      </p>
      <ContactForm />
    </section>
  );
}