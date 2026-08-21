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