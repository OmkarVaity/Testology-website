import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  service: z.enum(
    ["drug-alcohol-testing", "dot-testing", "blood-profiles", "employer-solutions", "other"],
    { errorMap: () => ({ message: "Select a service" }) },
  ),
  message: z.string().min(10, "Tell us a bit more about what you need"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const digits = (v: string) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");

/** "Buy now" on a drug catalog panel: who wants it and how to reach them. Payment is arranged by staff. */
export const panelRequestSchema = z.object({
  panelId: z.string().min(1),
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().refine((v) => digits(v).length === 10, "Enter a 10-digit phone number"),
  notes: z.string().trim().max(1000, "Please keep notes under 1,000 characters").optional(),
  /** Honeypot: hidden from people, so anything in it came from a bot. */
  website: z.string().optional(),
});

export type PanelRequestValues = z.infer<typeof panelRequestSchema>;

export function formatPhoneNumber(value: string): string {
  const d = digits(value);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : value;
}