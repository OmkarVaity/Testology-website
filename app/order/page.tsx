import Link from "next/link";
import type { Metadata } from "next";
import { OrderFlow } from "@/components/order/OrderFlow";
import { siteConfig } from "@/content/site-config";
import { ORDERING_ENABLED } from "@/lib/order-links";

export const metadata: Metadata = {
  title: "Order a Drug Test or Physical | Testology, Inc.",
  description: "Order a drug test, physical or occupational health service at an eScreen-affiliated clinic near you.",
  // A checkout flow has nothing for search engines to index.
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ service?: string; clinic?: string }> };

export default async function OrderPage({ searchParams }: Props) {
  const { service, clinic } = await searchParams;

  return (
    <>
      {/* A compact header rather than ServicePageHeader: on a phone that one fills the first screen, and the
          form is what people came for. */}
      <div className="bg-gradient-to-b from-primary-50/60 to-transparent">
        <div className="container-wide max-w-4xl pb-6 pt-8 sm:pt-12">
          <p className="mb-2 text-sm font-semibold text-primary-700">Order online</p>
          <h1 className="font-display-bolt mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">Order a test or physical</h1>
          <p className="max-w-2xl text-slate-600">
            Choose your tests, pick the nearest eScreen-affiliated clinic, and we&apos;ll send you everything you need for
            your visit.
          </p>
        </div>
      </div>
      <section className="container-wide max-w-4xl pb-16">
        {ORDERING_ENABLED ? (
          <OrderFlow initialServiceId={service} initialClinicId={clinic} />
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-600 shadow-sm">
            <p className="mb-2 font-display-bolt text-xl font-semibold text-slate-900">Online ordering is coming soon</p>
            <p className="mb-4">
              In the meantime, call us at{" "}
              <a href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`} className="font-semibold text-primary-700">
                {siteConfig.contact.tollFree}
              </a>{" "}
              and we&apos;ll set up your test at the clinic closest to you.
            </p>
            <Link href="/clinic-locator" className="font-semibold text-primary-700 hover:underline">
              Find a clinic near you
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
