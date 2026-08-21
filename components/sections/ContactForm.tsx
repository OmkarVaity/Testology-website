"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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

    // TODO: replace with real Resend call once RESEND_API_KEY is set up.
    // For now, just log and simulate a network delay so the UI states are testable.
    console.log("Contact form submission:", data);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("success");
    reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-clear/30 bg-clear/10 p-6 text-clear">
        <p className="font-display text-base font-medium">Thanks — we&apos;ll be in touch.</p>
        <p className="mt-1 text-sm">Your message has been received. Expect a reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Full name</label>
        <input
          {...register("name")}
          className="w-full rounded-md border border-slate/40 bg-white px-3 py-2 text-sm text-ink"
          placeholder="Jane Doe"
        />
        {errors.name && <p className="mt-1 text-xs text-signal">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-md border border-slate/40 bg-white px-3 py-2 text-sm text-ink"
          placeholder="jane@company.com"
        />
        {errors.email && <p className="mt-1 text-xs text-signal">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Phone</label>
        <input
          {...register("phone")}
          type="tel"
          className="w-full rounded-md border border-slate/40 bg-white px-3 py-2 text-sm text-ink"
          placeholder="(617) 555-0142"
        />
        {errors.phone && <p className="mt-1 text-xs text-signal">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">What do you need?</label>
        <select
          {...register("service")}
          className="w-full rounded-md border border-slate/40 bg-white px-3 py-2 text-sm text-ink"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="drug-alcohol-testing">Drug & alcohol testing</option>
          <option value="dot-testing">DOT testing</option>
          <option value="blood-profiles">Blood profiles</option>
          <option value="employer-solutions">Employer solutions</option>
          <option value="other">Other</option>
        </select>
        {errors.service && <p className="mt-1 text-xs text-signal">{errors.service.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Message</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full rounded-md border border-slate/40 bg-white px-3 py-2 text-sm text-ink"
          placeholder="Tell us what you're looking for"
        />
        {errors.message && <p className="mt-1 text-xs text-signal">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}