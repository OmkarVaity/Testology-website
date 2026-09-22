"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display-bolt mb-2 text-2xl font-bold text-slate-900">
          Thanks for submitting!
        </h3>
        <p className="text-slate-500">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Something went wrong sending your message. Please try again, or call us directly at{" "}
          <a href="tel:+18772114447" className="font-semibold underline">
            877-211-4447
          </a>
          .
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full name</label>
          <input {...register("name")} className={inputClass} placeholder="Jane Doe" />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="jane@company.com" />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input {...register("phone")} type="tel" className={inputClass} placeholder="(617) 555-0142" />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Service needed</label>
          <select {...register("service")} className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option value="drug-alcohol-testing">Drug & alcohol testing</option>
            <option value="dot-testing">DOT testing</option>
            <option value="blood-profiles">Blood profiles</option>
            <option value="employer-solutions">Employer solutions</option>
            <option value="other">Other</option>
          </select>
          {errors.service && <p className="text-xs text-red-500">{errors.service.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Message</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          placeholder="Tell us what you're looking for"
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 text-base font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}