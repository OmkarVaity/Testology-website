import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Info } from "lucide-react";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import {
  capabilityMeta,
  clinicOffersService,
  escreenServices,
  serviceCategoryMeta,
  type EscreenService,
  type ServiceCategory,
} from "@/content/escreen-services";
import { getAllClinics } from "@/lib/clinic-directory";
import { ORDERING_ENABLED } from "@/lib/order-links";

export const metadata: Metadata = {
  title: "eScreen Drug Tests, Physicals & Occupational Health Services | Testology, Inc.",
  description:
    "Non-DOT urine, hair, oral fluid and breath alcohol tests, DOT and non-DOT physicals, lift tests, respirator fit tests and vision screenings at eScreen-affiliated clinics nationwide.",
  alternates: { canonical: "/escreen-services" },
};

function ServiceCard({ service, clinicCount }: { service: EscreenService; clinicCount: number }) {
  const popular = service.panels?.filter((p) => p.popular) ?? [];

  return (
    <article id={service.id} className="flex scroll-mt-24 flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-display-bolt text-lg font-semibold text-slate-900">{service.name}</h3>
        {service.specimen && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{service.specimen}</span>
        )}
      </div>
      <p className="mb-3 text-sm text-slate-600">{service.description}</p>

      {popular.length > 0 && (
        <div className="mb-3">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Popular panels</p>
          <ul className="flex flex-wrap gap-1.5">
            {popular.map((panel) => (
              <li key={panel.code} className="rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                {panel.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.panels && service.panels.length > popular.length && (
        <details className="mb-3 text-sm">
          <summary className="cursor-pointer text-xs font-semibold text-primary-700 hover:underline">
            All {service.panels.length} panel options
          </summary>
          <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
            {service.panels.map((panel) => (
              <li key={panel.code}>
                <span className="font-mono text-slate-500">{panel.code}</span> — {panel.name}
              </li>
            ))}
          </ul>
        </details>
      )}

      <p className="mb-4 mt-auto text-xs text-slate-500">
        Available at {clinicCount.toLocaleString()} {capabilityMeta[service.performedAt].label} nationwide.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {ORDERING_ENABLED && (
          <Link
            href={`/order?service=${service.id}`}
            className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Order online
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
        <Link
          href={`/clinic-locator?service=${service.id}`}
          className={
            ORDERING_ENABLED
              ? "rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              : "flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
          }
        >
          Find a clinic
        </Link>
        {service.learnMoreHref && (
          <Link href={service.learnMoreHref} className="text-sm font-semibold text-slate-600 hover:text-primary-700 hover:underline">
            Learn more
          </Link>
        )}
      </div>
    </article>
  );
}

export default function EscreenServicesPage() {
  const clinics = getAllClinics();
  const countFor = (service: EscreenService) => clinics.filter((c) => clinicOffersService(c, service)).length;
  const categories = Object.keys(serviceCategoryMeta) as ServiceCategory[];

  return (
    <>
      <ServicePageHeader
        eyebrow="eScreen network"
        title="Drug tests & occupational health services"
        intro={`Order non-DOT drug and alcohol tests, physicals and occupational health screenings at ${clinics.length.toLocaleString()} eScreen-affiliated clinics nationwide — then pick the clinic closest to you.`}
        iconName="Microscope"
      />

      <section className="container-wide space-y-14 pb-16">
        <div className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>
            <span className="font-semibold">Need a DOT drug or alcohol test?</span> DOT-regulated tests are ordered by
            your employer or their testing administrator, not by individuals. Employers and owner-operators can set this
            up through our{" "}
            <Link href="/employer-solutions" className="font-semibold underline">
              TPA and DOT consortium services
            </Link>
            . DOT physicals can be booked by drivers directly below.
          </p>
        </div>

        {categories.map((category) => {
          const services = escreenServices.filter((s) => s.category === category);
          return (
            <div key={category}>
              <h2 className="font-display-bolt mb-1 text-2xl font-semibold text-slate-900">
                {serviceCategoryMeta[category].title}
              </h2>
              <p className="mb-5 text-sm text-slate-500">{serviceCategoryMeta[category].intro}</p>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} clinicCount={countFor(service)} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
