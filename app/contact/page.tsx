import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Testology, Inc.",
  description:
    "Reach Testology, Inc. in Brighton, MA for scheduling, employer programs, or general questions about testing services.",
};

export default function ContactPage() {
  return <Contact />;
}