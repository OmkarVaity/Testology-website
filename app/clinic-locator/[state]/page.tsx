import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { ClinicAreaMap } from "@/components/sections/ClinicAreaMap";
import {
  DirectoryBreadcrumbs,
  DirectoryClinicList,
  DirectoryCta,
  DirectoryLinkGrid,
  DirectoryStats,
} from "@/components/sections/ClinicDirectory";
import { encodeClinic } from "@/content/clinics";
import { cityPath, getAllStates, getState, statePath, statsFor } from "@/lib/clinic-directory";

type Props = { params: Promise<{ state: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStates().map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = getState((await params).state);
  if (!state) return {};
  const stats = statsFor(state.clinics);
  const count = stats.total.toLocaleString();
  return {
    title: `eScreen Drug Testing Clinics in ${state.name} (${count} Locations) | Testology, Inc.`,
    description:
      `Find ${count} eScreen-affiliated drug testing clinics in ${state.name}` +
      ` — ${stats.onsite.toLocaleString()} with eScreen on site and ${stats.physicals.toLocaleString()} offering DOT and employment physicals.` +
      " Browse by city or search by zip code.",
    alternates: { canonical: statePath(state) },
  };
}

export default async function StateClinicsPage({ params }: Props) {
  const state = getState((await params).state);
  if (!state) notFound();

  const stats = statsFor(state.clinics);
  const cityPages = state.cities.filter((c) => c.hasPage);
  const smallCities = state.cities.filter((c) => !c.hasPage).sort((a, b) => a.name.localeCompare(b.name));
  const cityCount = state.cities.length;

  return (
    <>
      <DirectoryBreadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Clinic Locator", href: "/clinic-locator" },
          { label: state.name, href: statePath(state) },
        ]}
      />
      <ServicePageHeader
        eyebrow="eScreen network"
        title={`eScreen drug testing clinics in ${state.name}`}
        intro={
          `${stats.total.toLocaleString()} eScreen-affiliated clinics across ${cityCount.toLocaleString()} ` +
          `${cityCount === 1 ? "city" : "cities"} in ${state.name}: ${stats.onsite.toLocaleString()} collect with eScreen on site, ` +
          `${stats.lab.toLocaleString()} are LabCorp, Quest and other lab partner sites, and ${stats.physicals.toLocaleString()} offer physicals.`
        }
        iconName="Building2"
      />

      <section className="container-wide space-y-10 pb-16">
        <DirectoryStats stats={stats} />

        <ClinicAreaMap clinics={state.clinics.map(encodeClinic)} />

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="text-sm text-slate-600">Looking for the closest clinic to a specific address or zip code?</p>
          <Link
            href="/clinic-locator"
            className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search by zip code
          </Link>
        </div>

        {cityPages.length > 0 && (
          <div>
            <h2 className="font-display-bolt mb-4 text-2xl font-semibold text-slate-900">
              Cities in {state.name} with the most clinics
            </h2>
            <DirectoryLinkGrid
              links={cityPages.map((city) => ({ href: cityPath(city), label: city.name, count: city.clinics.length }))}
            />
          </div>
        )}

        <DirectoryCta place={state.name} />

        {smallCities.length > 0 && (
          <div>
            <h2 className="font-display-bolt mb-1 text-2xl font-semibold text-slate-900">
              {cityPages.length > 0 ? `Clinics in other ${state.name} cities` : `All clinics in ${state.name}`}
            </h2>
            <p className="mb-5 text-sm text-slate-500">Listed by city, A–Z.</p>
            <div className="space-y-6">
              {smallCities.map((city) => (
                <div key={city.slug}>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {city.name}, {state.abbr}
                  </h3>
                  <DirectoryClinicList clinics={city.clinics} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
