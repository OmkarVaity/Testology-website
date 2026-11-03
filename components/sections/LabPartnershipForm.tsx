"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import {
  labPartnershipSchema,
  labTypeOptions,
  partnershipInterestOptions,
  type LabPartnershipValues,
} from "@/lib/validations";

// 16px text on phones so iOS doesn't zoom in when a field is focused.
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 aria-[invalid=true]:border-red-400 sm:text-sm";

// The schema normalizes the interests checkbox group, so the form's input and output types differ.
type FormInput = z.input<typeof labPartnershipSchema>;
type FieldName = keyof FormInput;

export function LabPartnershipForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, LabPartnershipValues>({
    resolver: zodResolver(labPartnershipSchema),
    defaultValues: { interests: [], fax: "" },
    shouldFocusError: true,
  });

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(values: LabPartnershipValues) {
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/lab-partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "");
      }
      setStatus("success");
    } catch (err) {
      setServerError(
        (err instanceof Error && err.message) || `Something went wrong. Please call us at ${siteConfig.contact.tollFree}.`,
      );
      setStatus("error");
    }
  }

  const a11y = (name: FieldName) => ({
    id: `partner-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `partner-${name}-error` : undefined,
  });
  const errorText = (name: FieldName) =>
    errors[name] && (
      <span id={`partner-${name}-error`} className="mt-1 block text-xs text-red-600">
        {errors[name]?.message as string}
      </span>
    );
  const label = (text: string, required = false) => (
    <span className="mb-1.5 block text-sm font-medium text-slate-700">
      {text}
      {required && (
        <span className="text-red-600" aria-hidden>
          {" "}
          *
        </span>
      )}
    </span>
  );

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle2 className="mb-4 h-14 w-14 text-primary-600" aria-hidden />
        <h3 ref={successRef} tabIndex={-1} className="font-display-bolt mb-2 text-2xl font-bold text-slate-900 focus:outline-none">
          Thanks — we&apos;ve received your inquiry
        </h3>
        <p className="max-w-sm text-slate-500">Our partnerships team will review it and reach out to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — off-screen and skipped by keyboard and screen readers. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label>
          Fax
          <input type="text" tabIndex={-1} autoComplete="off" {...register("fax")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          {label("Lab / company name", true)}
          <input {...register("labName")} {...a11y("labName")} className={`h-12 ${inputClass}`} autoComplete="organization" aria-required />
          {errorText("labName")}
        </label>
        <label className="block">
          {label("Type of lab", true)}
          <select {...register("labType")} {...a11y("labType")} defaultValue="" className={`h-12 ${inputClass}`} aria-required>
            <option value="" disabled>
              Select…
            </option>
            {labTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errorText("labType")}
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          {label("Your name", true)}
          <input {...register("contactName")} {...a11y("contactName")} className={`h-12 ${inputClass}`} autoComplete="name" aria-required />
          {errorText("contactName")}
        </label>
        <label className="block">
          {label("Job title")}
          <input {...register("jobTitle")} {...a11y("jobTitle")} className={`h-12 ${inputClass}`} autoComplete="organization-title" />
          {errorText("jobTitle")}
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          {label("Work email", true)}
          <input type="email" {...register("email")} {...a11y("email")} className={`h-12 ${inputClass}`} autoComplete="email" aria-required />
          {errorText("email")}
        </label>
        <label className="block">
          {label("Phone", true)}
          <input type="tel" inputMode="tel" {...register("phone")} {...a11y("phone")} className={`h-12 ${inputClass}`} autoComplete="tel" aria-required />
          {errorText("phone")}
        </label>
      </div>

      <label className="block">
        {label("Website")}
        <input type="url" inputMode="url" {...register("website")} {...a11y("website")} className={`h-12 ${inputClass}`} placeholder="www.yourlab.com" />
        {errorText("website")}
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700">How would you like to work with us?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {partnershipInterestOptions.map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-slate-700">
              <input type="checkbox" value={option} {...register("interests")} className="h-4 w-4 accent-[var(--color-primary-600)]" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        {label("Tell us about your lab", true)}
        <textarea
          rows={5}
          {...register("message")}
          {...a11y("message")}
          className={`py-3 ${inputClass}`}
          placeholder="Tests you offer, regions you serve, and what you're looking for in a collection partner…"
          aria-required
        />
        {errorText("message")}
      </label>

      {serverError && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700 disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send partnership inquiry
      </button>
    </form>
  );
}
