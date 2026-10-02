"use client";

import { cloneElement, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, Info, Loader2 } from "lucide-react";
import { type Clinic } from "@/content/clinics";
import {
  clinicOffersService,
  escreenServices,
  getService,
  serviceCategoryMeta,
  type EscreenService,
  type ServiceCategory,
} from "@/content/escreen-services";
import { siteConfig } from "@/content/site-config";
import {
  clinicStepSchema,
  detailsStepSchema,
  drugTestReasons,
  fieldErrors,
  genderOptions,
  healthServiceReasons,
  reasonLabel,
  reviewStepSchema,
  testsStepSchema,
} from "@/lib/ordering";
import { useClinics } from "@/lib/use-clinics";
import { ClinicPicker } from "./ClinicPicker";

type Item = { serviceId: string; panelCode?: string };

type Details = {
  orderingFor: "self" | "employee";
  companyName: string;
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  eveningPhone: string;
  email: string;
  gender: string;
  textConsent: boolean;
};

const STEPS = ["Tests", "Clinic", "Details", "Review"] as const;
const CATEGORIES = Object.keys(serviceCategoryMeta) as ServiceCategory[];
const isTestCategory = (c: ServiceCategory | undefined) => c === "drug" || c === "alcohol";

const emptyDetails: Details = {
  orderingFor: "self",
  companyName: "",
  employeeId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  eveningPhone: "",
  email: "",
  gender: "",
  textConsent: false,
};

// 16px text on phones: iOS Safari zooms the page in when a focused input's text is smaller than that.
const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 aria-[invalid=true]:border-red-400 sm:text-sm";

/** Label + control + hint/error. Wires the error to the control so screen readers announce it with the field. */
function Field({ label, error, required, children, hint }: {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactElement<Record<string, unknown>>;
}) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const control = cloneElement(children, {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": required || undefined,
  });

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="text-red-600" aria-hidden>
            {" "}
            *
          </span>
        )}
      </span>
      {control}
      {hint && !error && (
        <span id={`${id}-hint`} className="mt-1 block text-xs text-slate-500">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="mt-1 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

/** One review line: stacked and left-aligned on phones, label | value columns from sm up. */
function ReviewRow({ label, onEdit, editLabel, children }: {
  label: string;
  onEdit?: () => void;
  editLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="font-semibold text-slate-700">{label}</dt>
      <dd className="text-slate-600 sm:text-right">
        {children}
        {onEdit && (
          <button type="button" onClick={onEdit} aria-label={editLabel} className="mt-1 text-xs font-semibold text-primary-700 hover:underline">
            {editLabel?.split(" ")[0]}
          </button>
        )}
      </dd>
    </div>
  );
}

/** Smooth scrolling, unless the visitor has asked their device to reduce motion. */
function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : value;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function OrderFlow({ initialServiceId, initialClinicId }: { initialServiceId?: string; initialClinicId?: string }) {
  const { clinics, status: clinicsStatus } = useClinics();
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<Item[]>(() => {
    const service = getService(initialServiceId);
    return service ? [{ serviceId: service.id, panelCode: service.defaultPanel }] : [];
  });
  const [drugTestReason, setDrugTestReason] = useState("");
  const [healthServiceReason, setHealthServiceReason] = useState("");
  const [reasonOther, setReasonOther] = useState("");
  const [clinicId, setClinicId] = useState<string | null>(initialClinicId ?? null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<{ reference: string; preview?: boolean } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Each step (and the confirmation) has one focusable heading; focusing it on change tells screen-reader users
  // where they are and puts keyboard users at the top of the new step instead of on the button they pressed.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, result]);

  const selectedServices = useMemo(
    () => items.map((i) => getService(i.serviceId)).filter((s): s is EscreenService => !!s),
    [items],
  );
  const categories = new Set(selectedServices.map((s) => s.category));
  const needsTestReason = [...categories].some(isTestCategory);
  const needsHealthReason = categories.has("health");
  const presetClinic = clinics.find((c) => c.id === initialClinicId) ?? null;
  const clinic = clinics.find((c) => c.id === clinicId) ?? null;

  const payload = {
    tests: {
      items,
      drugTestReason: needsTestReason ? drugTestReason || undefined : undefined,
      healthServiceReason: needsHealthReason ? healthServiceReason || undefined : undefined,
      reasonOther: reasonOther || undefined,
    },
    clinic: { clinicId: clinicId ?? "" },
    details: { ...details, gender: details.gender || undefined },
    review: { agreeToTerms },
  };

  function goTo(next: number) {
    setErrors({});
    setSubmitError("");
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  }

  /** Validates the current step; returns true to continue. */
  function validateStep(): boolean {
    const checks = [
      () => testsStepSchema.safeParse(payload.tests),
      () => {
        const parsed = clinicStepSchema.safeParse(payload.clinic);
        if (parsed.success && clinic && !selectedServices.every((s) => clinicOffersService(clinic, s))) {
          return { success: false as const, error: { issues: [{ path: ["clinicId"], message: "Choose a clinic that offers every test you selected" }] } };
        }
        return parsed;
      },
      () => detailsStepSchema.safeParse(payload.details),
      () => reviewStepSchema.safeParse(payload.review),
    ];
    const parsed = checks[step]();
    if (parsed.success) return true;
    setErrors(fieldErrors(parsed.error as Parameters<typeof fieldErrors>[0]));
    focusFirstError();
    return false;
  }

  /**
   * After a failed step, move to the first problem. On a phone the visitor is at the bottom by the Continue
   * button, so without this the messages appear off-screen and nothing seems to happen.
   */
  function focusFirstError() {
    setTimeout(() => {
      const el = cardRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (!el) return;
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: "center", behavior: scrollBehavior() });
    }, 0);
  }

  function toggleService(service: EscreenService) {
    setItems((current) =>
      current.some((i) => i.serviceId === service.id)
        ? current.filter((i) => i.serviceId !== service.id)
        : [...current, { serviceId: service.id, panelCode: service.defaultPanel }],
    );
  }

  function setPanel(serviceId: string, panelCode: string) {
    setItems((current) => current.map((i) => (i.serviceId === serviceId ? { ...i, panelCode } : i)));
  }

  function updateDetails<K extends keyof Details>(key: K, value: Details[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setResult({ reference: body.reference, preview: body.preview });
        topRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        return;
      }
      // Send the visitor back to the step with the first problem the server found.
      const fields: Record<string, string> = body.fields ?? {};
      const firstKey = Object.keys(fields)[0];
      const stepIndex = firstKey ? ["tests", "clinic", "details", "review"].indexOf(firstKey.split(".")[0]) : -1;
      if (stepIndex >= 0 && stepIndex !== step) {
        setStep(stepIndex);
      }
      setErrors(Object.fromEntries(Object.entries(fields).map(([k, v]) => [k.split(".").slice(1).join("."), v])));
      setSubmitError(body.error ?? "Something went wrong. Please try again.");
      focusFirstError();
    } catch {
      setSubmitError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div ref={topRef} className="scroll-mt-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        {result.preview && (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
            Development preview — this order was validated but not stored or sent.
          </p>
        )}
        <CheckCircle2 className="mb-3 h-10 w-10 text-primary-600" aria-hidden />
        <h2 ref={headingRef} tabIndex={-1} className="font-display-bolt mb-1 text-2xl font-semibold text-slate-900 focus:outline-none">
          Order received
        </h2>
        <p className="mb-5 text-sm text-slate-600">
          Your reference is <span className="font-mono font-semibold text-slate-900">{result.reference}</span>. Keep it
          handy — we&apos;ll be in touch at {details.email}.
        </p>
        <h3 className="mb-2 text-sm font-semibold text-slate-900">What happens next</h3>
        <ol className="mb-6 list-decimal space-y-1.5 pl-5 text-sm text-slate-600">
          <li>Our team reviews your order and calls you at {details.phone} to confirm your details and payment.</li>
          <li>We email your eScreen authorization (ePassport) for {clinic?.name ?? "your clinic"}.</li>
          <li>Visit the clinic with the authorization and a government-issued photo ID.</li>
          <li>We let you know when your results are ready.</li>
        </ol>
        <p className="text-sm text-slate-500">
          Questions? Call us at{" "}
          <a href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`} className="font-semibold text-primary-700">
            {siteConfig.contact.tollFree}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-24">
      <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Order steps">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => i < step && goTo(i)}
              disabled={i >= step}
              aria-current={i === step ? "step" : undefined}
              className={`w-full border-t-4 pt-2 text-left text-xs font-semibold sm:text-sm ${
                i === step ? "border-primary-600 text-primary-700" : i < step ? "border-primary-300 text-slate-700 hover:text-primary-700" : "border-slate-200 text-slate-400"
              }`}
            >
              <span className="mr-1 text-slate-400">{i + 1}.</span>
              {label}
              {i < step && (
                <>
                  <Check className="ml-1 inline h-3.5 w-3.5 text-primary-600" aria-hidden />
                  <span className="sr-only"> (completed)</span>
                </>
              )}
            </button>
          </li>
        ))}
      </ol>

      <div ref={cardRef} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
        {/* Announced by screen readers when a step fails; focus then moves to the first problem field. */}
        <p role="alert" className="sr-only">
          {Object.keys(errors).length > 0 ? "Please fix the highlighted fields before continuing." : ""}
        </p>

        {step === 0 && (
          <div className="space-y-8">
            <h2 ref={headingRef} tabIndex={-1} className="font-display-bolt text-xl font-semibold text-slate-900 focus:outline-none">
              Choose your tests
            </h2>
            {presetClinic && (
              <p className="rounded-xl bg-primary-50 px-4 py-3 text-sm text-primary-900">
                Ordering at <span className="font-semibold">{presetClinic.name}</span>, {presetClinic.city}, {presetClinic.state}.
              </p>
            )}
            {errors.items && (
              <p id="order-items-error" className="text-sm text-red-600">
                {errors.items}
              </p>
            )}

            {CATEGORIES.map((category, categoryIndex) => (
              <fieldset key={category}>
                <legend className="font-display-bolt mb-1 text-lg font-semibold text-slate-900">
                  {serviceCategoryMeta[category].title}
                </legend>
                <p className="mb-3 text-sm text-slate-500">{serviceCategoryMeta[category].intro}</p>
                <div className={`grid gap-2 ${category === "health" ? "sm:grid-cols-2" : ""}`}>
                  {escreenServices
                    .filter((s) => s.category === category)
                    .map((service, serviceIndex) => {
                      // "Choose at least one test" points at the very first checkbox.
                      const flagMissingItems = !!errors.items && categoryIndex === 0 && serviceIndex === 0;
                      const index = items.findIndex((i) => i.serviceId === service.id);
                      const item = items[index];
                      const popular = service.panels?.filter((p) => p.popular) ?? [];
                      const unavailableHere = presetClinic && !clinicOffersService(presetClinic, service);
                      return (
                        <div
                          key={service.id}
                          className={`rounded-xl border px-4 py-3 ${item ? "border-primary-300 bg-primary-50/40" : "border-slate-200"}`}
                        >
                          <label className="flex cursor-pointer items-start gap-3">
                            <input
                              type="checkbox"
                              checked={!!item}
                              onChange={() => toggleService(service)}
                              aria-invalid={flagMissingItems || undefined}
                              aria-describedby={flagMissingItems ? "order-items-error" : undefined}
                              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-primary-600)]"
                            />
                            <span>
                              <span className="block text-sm font-semibold text-slate-900">{service.name}</span>
                              {/* Two lines on phones keeps the 19-service list scannable; full text from sm up. */}
                              <span className="line-clamp-2 block text-xs text-slate-500 sm:line-clamp-none">
                                {service.description}
                              </span>
                              {unavailableHere && (
                                <span className="mt-1 block text-xs font-medium text-amber-700">
                                  Not offered at {presetClinic.name} — you&apos;ll choose another clinic.
                                </span>
                              )}
                            </span>
                          </label>
                          {item && service.panels && (
                            <div className="mt-3 pl-7">
                              <Field label="Panel" error={errors[`items.${index}.panelCode`]}>
                                <select
                                  value={item.panelCode ?? ""}
                                  onChange={(e) => setPanel(service.id, e.target.value)}
                                  className={inputClass}
                                >
                                  {popular.length > 0 && (
                                    <optgroup label="Popular">
                                      {popular.map((p) => (
                                        <option key={`p-${p.code}`} value={p.code}>
                                          {p.name}
                                        </option>
                                      ))}
                                    </optgroup>
                                  )}
                                  <optgroup label={`All ${service.panels.length} options`}>
                                    {service.panels.map((p) => (
                                      <option key={p.code} value={p.code}>
                                        {p.code} — {p.name}
                                      </option>
                                    ))}
                                  </optgroup>
                                </select>
                              </Field>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </fieldset>
            ))}

            {(needsTestReason || needsHealthReason) && (
              <fieldset className="space-y-4 border-t border-slate-100 pt-6">
                <legend className="font-display-bolt text-lg font-semibold text-slate-900">Reason for testing</legend>
                {needsTestReason && (
                  <fieldset aria-describedby={errors.drugTestReason ? "drug-reason-error" : undefined}>
                    <legend className="mb-1 text-sm font-medium text-slate-700">
                      Drug or alcohol test
                      <span className="text-red-600" aria-hidden>
                        {" "}
                        *
                      </span>
                    </legend>
                    <div className="grid sm:grid-cols-3 sm:gap-x-2">
                      {drugTestReasons.map((r, i) => (
                        // py-2 gives each option a comfortable tap target on phones.
                        <label key={r.value} className="flex cursor-pointer items-center gap-2 py-2 text-sm text-slate-700">
                          <input
                            type="radio"
                            name="drugTestReason"
                            value={r.value}
                            checked={drugTestReason === r.value}
                            onChange={() => setDrugTestReason(r.value)}
                            aria-invalid={(i === 0 && !!errors.drugTestReason) || undefined}
                            className="h-4 w-4 accent-[var(--color-primary-600)]"
                          />
                          {r.label}
                        </label>
                      ))}
                    </div>
                    {errors.drugTestReason && (
                      <p id="drug-reason-error" className="mt-1 text-xs text-red-600">
                        {errors.drugTestReason}
                      </p>
                    )}
                  </fieldset>
                )}
                {needsHealthReason && (
                  <div className="max-w-sm">
                    <Field label="Physical or health service" required error={errors.healthServiceReason}>
                      <select value={healthServiceReason} onChange={(e) => setHealthServiceReason(e.target.value)} className={inputClass}>
                        <option value="">Select a reason</option>
                        {healthServiceReasons.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}
                {((needsTestReason && drugTestReason === "other") || (needsHealthReason && healthServiceReason === "other")) && (
                  <div className="max-w-md">
                    <Field label="Specify the reason" required error={errors.reasonOther}>
                      <input value={reasonOther} onChange={(e) => setReasonOther(e.target.value)} className={inputClass} maxLength={200} />
                    </Field>
                  </div>
                )}
              </fieldset>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="font-display-bolt mb-1 text-xl font-semibold text-slate-900 focus:outline-none">
              Choose a clinic
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Showing clinics that offer: {selectedServices.map((s) => s.name).join(", ")}.
            </p>
            {clinicsStatus === "loading" && <p className="text-sm text-slate-500">Loading clinics…</p>}
            {clinicsStatus === "error" && (
              <p className="text-sm text-red-600">We couldn&apos;t load the clinic list. Please refresh the page.</p>
            )}
            {clinicsStatus === "ready" && (
              <ClinicPicker
                clinics={clinics}
                services={selectedServices}
                selectedId={clinicId}
                onSelect={(c: Clinic) => {
                  setClinicId(c.id);
                  setErrors({});
                }}
                error={errors.clinicId}
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 ref={headingRef} tabIndex={-1} className="font-display-bolt mb-3 text-xl font-semibold text-slate-900 focus:outline-none">
                Who is this test for?
              </h2>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["self", "Myself"],
                    ["employee", "An employee (I'm the employer)"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium ${
                      details.orderingFor === value ? "border-primary-500 bg-primary-50 text-primary-800" : "border-slate-200 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderingFor"
                      checked={details.orderingFor === value}
                      onChange={() => updateDetails("orderingFor", value)}
                      className="accent-[var(--color-primary-600)]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {details.orderingFor === "employee" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company name" required error={errors.companyName}>
                  <input value={details.companyName} onChange={(e) => updateDetails("companyName", e.target.value)} className={inputClass} autoComplete="organization" />
                </Field>
                <Field label="Employee ID" hint="Optional — shown on the authorization if you use one." error={errors.employeeId}>
                  <input value={details.employeeId} onChange={(e) => updateDetails("employeeId", e.target.value)} className={inputClass} />
                </Field>
              </div>
            )}

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {details.orderingFor === "employee" ? "Employee being tested" : "Your details"}
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="First name" required error={errors.firstName}>
                  <input value={details.firstName} onChange={(e) => updateDetails("firstName", e.target.value)} className={inputClass} autoComplete="given-name" />
                </Field>
                <Field label="Middle name" error={errors.middleName}>
                  <input value={details.middleName} onChange={(e) => updateDetails("middleName", e.target.value)} className={inputClass} autoComplete="additional-name" />
                </Field>
                <Field label="Last name" required error={errors.lastName}>
                  <input value={details.lastName} onChange={(e) => updateDetails("lastName", e.target.value)} className={inputClass} autoComplete="family-name" />
                </Field>
                <Field label="Date of birth" required error={errors.dateOfBirth}>
                  <input
                    type="date"
                    value={details.dateOfBirth}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => updateDetails("dateOfBirth", e.target.value)}
                    className={inputClass}
                    autoComplete="bday"
                  />
                </Field>
                <Field label="Gender" error={errors.gender}>
                  <select value={details.gender} onChange={(e) => updateDetails("gender", e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    {genderOptions.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Email" required error={errors.email} hint="We'll send the eScreen authorization here.">
                <input type="email" value={details.email} onChange={(e) => updateDetails("email", e.target.value)} className={inputClass} autoComplete="email" />
              </Field>
              <Field label="Day phone" required error={errors.phone}>
                <input type="tel" inputMode="tel" value={details.phone} onChange={(e) => updateDetails("phone", e.target.value)} className={inputClass} autoComplete="tel" />
              </Field>
              <Field label="Evening phone" error={errors.eveningPhone}>
                <input type="tel" inputMode="tel" value={details.eveningPhone} onChange={(e) => updateDetails("eveningPhone", e.target.value)} className={inputClass} autoComplete="tel" />
              </Field>
            </div>

            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={details.textConsent}
                onChange={(e) => updateDetails("textConsent", e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-primary-600)]"
              />
              <span>
                Text me automated updates about this test, including messages from the Medical Review Officer if they
                need to reach me. These aren&apos;t marketing messages. Message and data rates may apply; reply STOP to
                opt out.
              </span>
            </label>

            <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <p>
                eScreen requires a Social Security number at check-in. For your security we don&apos;t collect it
                online — our team will confirm it with you by phone before issuing the authorization.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 ref={headingRef} tabIndex={-1} className="font-display-bolt text-xl font-semibold text-slate-900 focus:outline-none">
              Review your order
            </h2>

            <dl className="divide-y divide-slate-100 rounded-xl border border-slate-100 text-sm">
              <ReviewRow label="Tests" onEdit={() => goTo(0)} editLabel="Edit tests">
                {items.map((item) => {
                  const service = getService(item.serviceId)!;
                  const panel = service.panels?.find((p) => p.code === item.panelCode);
                  return (
                    <span key={item.serviceId} className="block">
                      {service.name}
                      {panel && <span className="text-slate-400"> — {panel.code} {panel.name}</span>}
                    </span>
                  );
                })}
              </ReviewRow>
              <ReviewRow label="Reason">
                {needsTestReason && <span className="block">Test: {reasonLabel(drugTestReason, drugTestReasons)}</span>}
                {needsHealthReason && (
                  <span className="block">Health service: {reasonLabel(healthServiceReason, healthServiceReasons)}</span>
                )}
                {reasonOther && <span className="block text-slate-400">{reasonOther}</span>}
              </ReviewRow>
              <ReviewRow label="Clinic" onEdit={() => goTo(1)} editLabel="Change clinic">
                {clinic && (
                  <>
                    <span className="block">{clinic.name}</span>
                    <span className="block text-slate-400">
                      {clinic.address}, {clinic.city}, {clinic.state} {clinic.zip}
                    </span>
                  </>
                )}
              </ReviewRow>
              <ReviewRow
                label={details.orderingFor === "employee" ? "Employee" : "Donor"}
                onEdit={() => goTo(2)}
                editLabel="Edit details"
              >
                <span className="block">{[details.firstName, details.middleName, details.lastName].filter(Boolean).join(" ")}</span>
                <span className="block text-slate-400">Born {formatDate(details.dateOfBirth)}</span>
                <span className="block break-all text-slate-400">{details.email}</span>
                <span className="block text-slate-400">{formatPhone(details.phone)}</span>
                {details.orderingFor === "employee" && (
                  <span className="block text-slate-400">
                    {details.companyName}
                    {details.employeeId && ` · ID ${details.employeeId}`}
                  </span>
                )}
              </ReviewRow>
            </dl>

            <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-700">Pricing and payment:</span> you won&apos;t be charged online
              yet. We&apos;ll confirm the price with you and take payment before issuing your authorization.
            </p>

            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                aria-invalid={!!errors.agreeToTerms || undefined}
                aria-describedby={errors.agreeToTerms ? "agree-error" : undefined}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-primary-600)]"
              />
              <span>
                I confirm this information is accurate and agree to the{" "}
                <Link href="/terms" className="font-semibold text-primary-700 hover:underline" target="_blank">
                  Terms of Service
                </Link>
                ,{" "}
                <Link href="/privacy-policy" className="font-semibold text-primary-700 hover:underline" target="_blank">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/hipaa-notice" className="font-semibold text-primary-700 hover:underline" target="_blank">
                  HIPAA Notice
                </Link>
                .
              </span>
            </label>
            {errors.agreeToTerms && (
              <p id="agree-error" className="text-xs text-red-600">
                {errors.agreeToTerms}
              </p>
            )}
          </div>
        )}

        {submitError && <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Back
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => validateStep() && goTo(step + 1)}
              className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Place order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
