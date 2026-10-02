// Server-rendered building blocks for the clinic directory pages (/clinic-locator/[state]/[city]).
// Everything here is plain HTML, so search engines see every clinic's name, address and phone.
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { clinicStatusMeta, directionsUrl, type Clinic } from "@/content/clinics";
import { siteConfig } from "@/content/site-config";
import type { ClinicStats } from "@/lib/clinic-directory";
import { ORDERING_ENABLED, orderUrl } from "@/lib/order-links";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb plus the matching BreadcrumbList structured data. */
export function DirectoryBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="container-wide pt-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden />}
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="font-medium text-slate-700">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-primary-700 hover:underline">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}

export function DirectoryStats({ stats }: { stats: ClinicStats }) {
  const items = [
    { value: stats.total, label: "eScreen-affiliated clinics" },
    { value: stats.onsite, label: clinicStatusMeta.installed.label },
    { value: stats.lab, label: `${clinicStatusMeta.electronicChain.label}s` },
    { value: stats.physicals, label: "Offer physicals" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <dt className="text-xs font-medium text-slate-500">{item.label}</dt>
          <dd className="font-display-bolt text-2xl font-bold text-slate-900">{item.value.toLocaleString()}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Clinic rows for directory pages. Statuses are shown as text with a CSS dot rather than SVG icons: state pages
 * list hundreds of clinics, and per-row icons roughly doubled the page weight (the markup is sent twice — as
 * HTML and again in React's hydration payload).
 */
export function DirectoryClinicList({ clinics }: { clinics: Clinic[] }) {
  return (
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {clinics.map((clinic) => (
        <li key={clinic.id} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900">
              {clinic.name}
              {clinic.featured && (
                <span className="ml-2 inline-block rounded-full bg-primary-600 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-white">
                  Our clinic
                </span>
              )}
            </h3>
            <address className="mt-0.5 text-xs not-italic text-slate-500">
              {clinic.address}, {clinic.city}, {clinic.state} {clinic.zip}
            </address>
            <p className="mt-1 text-xs text-slate-600">
              {clinic.statuses.map((s, i) => (
                <span key={s}>
                  {i > 0 && <span className="text-slate-300"> · </span>}
                  <span className="status-dot" style={{ color: clinicStatusMeta[s].color }} aria-hidden />
                  {clinicStatusMeta[s].label}
                </span>
              ))}
            </p>
          </div>
          <div className="flex shrink-0 gap-4 text-xs font-medium text-primary-700 sm:flex-col sm:items-end sm:gap-1">
            <a href={`tel:${clinic.phone}`} className="hover:underline">
              {clinic.phone}
            </a>
            <a href={directionsUrl(clinic)} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Directions
            </a>
            {ORDERING_ENABLED && (
              <Link href={orderUrl(clinic.id)} className="font-semibold hover:underline">
                Order here
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Link grid of cities (or states) with their clinic counts. */
export function DirectoryLinkGrid({ links }: { links: { href: string; label: string; count: number; note?: string }[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm transition hover:border-primary-200 hover:bg-primary-50/40"
          >
            <span className="flex min-w-0 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <span className="truncate font-medium text-slate-800">{link.label}</span>
            </span>
            <span className="shrink-0 text-xs text-slate-500">
              {link.note ?? `${link.count.toLocaleString()} ${link.count === 1 ? "clinic" : "clinics"}`}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Why an employer should care: Testology runs testing programs for staff who test at clinics like these. */
export function DirectoryCta({ place }: { place: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-lg sm:p-8">
      <h2 className="font-display-bolt mb-2 text-xl font-semibold sm:text-2xl">Have employees or drivers in {place}?</h2>
      <p className="mb-5 max-w-2xl text-sm text-primary-50 sm:text-base">
        Testology is a Third-Party Administrator (TPA) and DOT consortium. We set up and manage drug and alcohol
        testing programs for employers and owner-operators of any size — policy, random pools, scheduling and
        compliance records — so your team can test at nearby clinics without you tracking every visit.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/employer-solutions"
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
        >
          Employer testing programs
        </Link>
        <a
          href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}
          className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Call {siteConfig.contact.tollFree}
        </a>
      </div>
    </div>
  );
}
