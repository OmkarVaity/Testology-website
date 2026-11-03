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

export const labTypeOptions = [
  "Clinical / full-service laboratory",
  "Toxicology / drug testing",
  "Oncology",
  "Genetic testing",
  "Specialty / esoteric testing",
  "Functional & wellness medicine",
  "Other",
] as const;

export const partnershipInterestOptions = [
  "Specimen collection at our Brighton clinic",
  "Mobile phlebotomy",
  "Patient referrals & test ordering",
  "Employer & TPA testing programs",
  "Something else",
] as const;

/** "Partner with us" form for laboratories. Business contact details only — no patient information. */
export const labPartnershipSchema = z.object({
  labName: z.string().trim().min(2, "Enter your lab or company name").max(150),
  contactName: z.string().trim().min(2, "Enter your full name").max(100),
  jobTitle: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().refine((v) => digits(v).length === 10, "Enter a 10-digit phone number"),
  website: z.string().trim().max(200).optional(),
  labType: z.enum(labTypeOptions, { errorMap: () => ({ message: "Choose the type of lab" }) }),
  // A checkbox group can arrive as an array, a single value, or `false` when nothing is ticked.
  interests: z.preprocess(
    (v) => (Array.isArray(v) ? v : typeof v === "string" ? [v] : []),
    z.array(z.enum(partnershipInterestOptions)),
  ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your lab and how you'd like to work together")
    .max(2000, "Please keep this under 2,000 characters"),
  /** Honeypot: hidden from people, so anything in it came from a bot. */
  fax: z.string().optional(),
});

export type LabPartnershipValues = z.infer<typeof labPartnershipSchema>;

export function formatPhoneNumber(value: string): string {
  const d = digits(value);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : value;
}