"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ShoppingCart, X } from "lucide-react";
import { formatPrice, type DrugPanel } from "@/content/drug-catalog";
import { siteConfig } from "@/content/site-config";
import { panelRequestSchema, type PanelRequestValues } from "@/lib/validations";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 aria-[invalid=true]:border-red-400 sm:text-sm";

/**
 * "Buy now" request form for a drug catalog panel. Opens whenever `panel` is set; closing (button, Esc or
 * backdrop) calls `onClose`. The team receives the request by email and follows up about payment.
 */
export function PanelRequestDialog({ panel, onClose }: { panel: DrugPanel | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (panel && dialog && !dialog.open) dialog.showModal();
    if (!panel && dialog?.open) dialog.close();
  }, [panel]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      aria-labelledby="panel-request-title"
      className="m-auto max-h-[92dvh] w-[min(32rem,calc(100%-1.5rem))] overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-slate-900/40"
    >
      {/* Keyed by panel so each opening starts with a fresh form. */}
      {panel && <RequestForm key={panel.id} panel={panel} onDone={() => dialogRef.current?.close()} />}
    </dialog>
  );
}

function RequestForm({ panel, onDone }: { panel: DrugPanel; onDone: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);
  const price = formatPrice(panel.price);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PanelRequestValues>({
    resolver: zodResolver(panelRequestSchema),
    defaultValues: { panelId: panel.id, name: "", email: "", phone: "", notes: "", website: "" },
    shouldFocusError: true,
  });

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(values: PanelRequestValues) {
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/panel-request", {
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

  const fieldProps = (name: keyof PanelRequestValues) => ({
    id: `panel-request-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `panel-request-${name}-error` : undefined,
  });
  const errorText = (name: keyof PanelRequestValues) =>
    errors[name] && (
      <span id={`panel-request-${name}-error`} className="mt-1 block text-xs text-red-600">
        {errors[name]?.message}
      </span>
    );

  return (
    <div>
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{status === "success" ? "Request sent" : "Buy now"}</p>
          <h2 id="panel-request-title" className="font-display-bolt text-lg font-semibold text-slate-900">
            {panel.name}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {[price ?? "Pricing — contact us", panel.sample, panel.code && `Ref ${panel.code}`].filter(Boolean).join(" · ")}
          </p>
        </div>
        <button type="button" onClick={onDone} aria-label="Close" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      {status === "success" ? (
        <div className="p-6 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-primary-600" aria-hidden />
          <h3 ref={successRef} tabIndex={-1} className="font-display-bolt mb-1 text-xl font-semibold text-slate-900 focus:outline-none">
            Thanks — we&apos;ve got your request
          </h3>
          <p className="mb-5 text-sm text-slate-600">
            Our team will contact you to confirm the details and payment, and help you schedule your test.
          </p>
          <button
            type="button"
            onClick={onDone}
            className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 p-5">
          <input type="hidden" {...register("panelId")} />
          {/* Honeypot — off-screen and skipped by keyboard and screen readers. */}
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Full name<span className="text-red-600" aria-hidden> *</span>
            </span>
            <input {...register("name")} {...fieldProps("name")} className={`h-11 ${inputClass}`} autoComplete="name" aria-required />
            {errorText("name")}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Email<span className="text-red-600" aria-hidden> *</span>
              </span>
              <input type="email" {...register("email")} {...fieldProps("email")} className={`h-11 ${inputClass}`} autoComplete="email" aria-required />
              {errorText("email")}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Phone<span className="text-red-600" aria-hidden> *</span>
              </span>
              <input
                type="tel"
                inputMode="tel"
                {...register("phone")}
                {...fieldProps("phone")}
                className={`h-11 ${inputClass}`}
                autoComplete="tel"
                aria-required
              />
              {errorText("phone")}
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Notes</span>
            <textarea
              rows={3}
              {...register("notes")}
              {...fieldProps("notes")}
              className={`py-2 ${inputClass}`}
              placeholder="Preferred location or date, employer requirements, questions…"
            />
            {errorText("notes")}
          </label>

          {serverError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </p>
          )}

          {panel.cat === "DOT & Regulated" && panel.sample !== "Breath" && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
              DOT tests are ordered by an employer or their testing administrator. If you&apos;re an employer or
              owner-operator, send the request and we&apos;ll set it up through our DOT program.
            </p>
          )}

          <p className="text-xs text-slate-500">
            You won&apos;t be charged now — we&apos;ll confirm the price and arrange payment when we contact you.
          </p>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" aria-hidden />}
            Send request
          </button>
        </form>
      )}
    </div>
  );
}

/** Standalone "Buy now" button + dialog, for the panel detail page. */
export function BuyNowButton({ panel, className }: { panel: DrugPanel; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <ShoppingCart className="h-4 w-4" aria-hidden />
        Buy now
      </button>
      <PanelRequestDialog panel={open ? panel : null} onClose={() => setOpen(false)} />
    </>
  );
}
