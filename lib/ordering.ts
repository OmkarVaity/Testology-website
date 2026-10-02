// Online ordering: the order schema shared by the /order flow (browser) and /api/orders (server), modelled on
// eScreen's "Check In Donor" form so staff can transcribe an order into eScreen field-for-field.
//
// Deliberately NOT collected online: Social Security numbers. eScreen requires one at check-in, but storing SSNs
// is the most damaging thing this site could leak, so staff confirm it with the donor by phone instead.
import { z } from "zod";
import { getService } from "@/content/escreen-services";

export { ORDERING_ENABLED, orderUrl } from "./order-links";

// eScreen's "Reason" radio options for drug and alcohol tests. "Promotion" and "Transfer" are greyed out on
// Testology's eScreen account, so they're left out.
export const drugTestReasons = [
  { value: "pre-employment", label: "Pre-employment" },
  { value: "random", label: "Random" },
  { value: "post-accident", label: "Post accident" },
  { value: "reasonable-suspicion", label: "Reasonable suspicion / cause" },
  { value: "periodic-medical", label: "Periodic medical" },
  { value: "return-to-duty", label: "Return to duty" },
  { value: "diversion", label: "Diversion" },
  { value: "followup", label: "Follow-up" },
  { value: "other", label: "Other" },
] as const;

// eScreen's "Reason for Service" options for health services.
export const healthServiceReasons = [
  { value: "pre-employment", label: "Pre-employment" },
  { value: "new-certification", label: "New certification" },
  { value: "recertification", label: "Recertification" },
  { value: "follow-up", label: "Follow-up" },
  { value: "return-to-duty", label: "Return to duty" },
  { value: "site-access", label: "Site access" },
  { value: "surveillance", label: "Surveillance" },
  { value: "other", label: "Other" },
] as const;

export const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "unspecified", label: "Prefer not to say" },
] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
const enumOf = <T extends readonly { value: string }[]>(options: T) =>
  z.enum(options.map((o) => o.value) as [Values<T>, ...Values<T>[]]);

const phone = z
  .string()
  .transform((v) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, ""))
  .refine((v) => v.length === 10, "Enter a 10-digit phone number");

const optionalPhone = z
  .string()
  .transform((v) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, ""))
  .refine((v) => v.length === 0 || v.length === 10, "Enter a 10-digit phone number, or leave it blank");

const dateOfBirth = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter your date of birth")
  .refine((v) => {
    const date = new Date(`${v}T00:00:00`);
    const age = (Date.now() - date.getTime()) / (365.25 * 24 * 3600 * 1000);
    return !Number.isNaN(date.getTime()) && age > 0 && age < 120;
  }, "Enter a valid date of birth");

export const orderItemSchema = z
  .object({ serviceId: z.string(), panelCode: z.string().optional() })
  .superRefine((item, ctx) => {
    const service = getService(item.serviceId);
    if (!service) {
      ctx.addIssue({ code: "custom", message: "Unknown test" });
    } else if (service.panels && !service.panels.some((p) => p.code === item.panelCode)) {
      ctx.addIssue({ code: "custom", path: ["panelCode"], message: `Choose a panel for ${service.name}` });
    }
  });

/** Step 1 — tests, panels and the reason for testing. */
export const testsStepSchema = z
  .object({
    items: z.array(orderItemSchema).min(1, "Choose at least one test or service"),
    drugTestReason: enumOf(drugTestReasons).optional(),
    healthServiceReason: enumOf(healthServiceReasons).optional(),
    reasonOther: z.string().trim().max(200).optional(),
  })
  .superRefine((step, ctx) => {
    const categories = new Set(step.items.map((i) => getService(i.serviceId)?.category));
    const ids = step.items.map((i) => i.serviceId);
    if (new Set(ids).size !== ids.length) ctx.addIssue({ code: "custom", path: ["items"], message: "Each test can only be added once" });
    if ((categories.has("drug") || categories.has("alcohol")) && !step.drugTestReason) {
      ctx.addIssue({ code: "custom", path: ["drugTestReason"], message: "Choose the reason for the drug or alcohol test" });
    }
    if (categories.has("health") && !step.healthServiceReason) {
      ctx.addIssue({ code: "custom", path: ["healthServiceReason"], message: "Choose the reason for the health service" });
    }
    const needsOther =
      (step.drugTestReason === "other" && (categories.has("drug") || categories.has("alcohol"))) ||
      (step.healthServiceReason === "other" && categories.has("health"));
    if (needsOther && !step.reasonOther) {
      ctx.addIssue({ code: "custom", path: ["reasonOther"], message: "Tell us the reason" });
    }
  });

/** Step 2 — the clinic. Whether it offers the chosen tests is checked against clinic data on the server. */
export const clinicStepSchema = z.object({ clinicId: z.string().min(1, "Choose a clinic") });

/** Step 3 — who's being tested, mirroring eScreen's donor section (minus SSN). */
export const detailsStepSchema = z
  .object({
    orderingFor: z.enum(["self", "employee"]),
    companyName: z.string().trim().max(120).optional(),
    employeeId: z.string().trim().max(60).optional(),
    firstName: z.string().trim().min(1, "Enter a first name").max(60),
    middleName: z.string().trim().max(60).optional(),
    lastName: z.string().trim().min(1, "Enter a last name").max(60),
    dateOfBirth,
    phone,
    eveningPhone: optionalPhone.optional(),
    email: z.string().trim().email("Enter a valid email address"),
    gender: enumOf(genderOptions).optional(),
    textConsent: z.boolean(),
  })
  .superRefine((step, ctx) => {
    if (step.orderingFor === "employee" && !step.companyName) {
      ctx.addIssue({ code: "custom", path: ["companyName"], message: "Enter the company name" });
    }
  });

/** Step 4 — confirmation. */
export const reviewStepSchema = z.object({
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: "Please confirm to place the order" }) }),
});

export const orderSchema = z.object({
  tests: testsStepSchema,
  clinic: clinicStepSchema,
  details: detailsStepSchema,
  review: reviewStepSchema,
});

export type OrderInput = z.input<typeof orderSchema>;
export type Order = z.output<typeof orderSchema>;

/** Flattens zod issues into { "items.0.panelCode": "message" } for showing next to fields. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    out[key] ??= issue.message;
  }
  return out;
}

export function reasonLabel(value: string | undefined, options: readonly { value: string; label: string }[]) {
  return options.find((o) => o.value === value)?.label;
}
