import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderFlow } from "@/components/order/OrderFlow";
import { ORDERING_ENABLED } from "@/lib/order-links";

export const metadata: Metadata = {
  title: "Order a Drug Test or Physical | Testology, Inc.",
  description: "Order a drug test, physical or occupational health service at an eScreen-affiliated clinic near you.",
  // A checkout flow has nothing for search engines to index.
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ service?: string; panel?: string; clinic?: string }> };

export default async function OrderPage({ searchParams }: Props) {
  // Nothing links here until ordering launches, so the page doesn't exist before then.
  if (!ORDERING_ENABLED) notFound();
  const { service, panel, clinic } = await searchParams;

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
        <OrderFlow initialServiceId={service} initialPanelCode={panel} initialClinicId={clinic} />
      </section>
    </>
  );
}
