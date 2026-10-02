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
import {
  cityPath,
  getAllCityPages,
  getCity,
  getState,
  nearbyCityPages,
  statePath,
  statsFor,
} from "@/lib/clinic-directory";

type Props = { params: Promise<{ state: string; city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCityPages().map((city) => ({ state: city.stateSlug, city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCity(stateSlug, citySlug);
  if (!city) return {};
  const stats = statsFor(city.clinics);
  const place = `${city.name}, ${city.stateAbbr}`;
  return {
    title: `eScreen Drug Testing Clinics in ${place} (${stats.total} Locations) | Testology, Inc.`,
    description:
      `${stats.total} eScreen-affiliated drug testing clinics in ${place}` +
      ` — ${stats.onsite} with eScreen on site, ${stats.lab} lab partner sites and ${stats.physicals} offering physicals.` +
      " Addresses, phone numbers and directions.",
    alternates: { canonical: cityPath(city) },
  };
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

export default async function CityClinicsPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getState(stateSlug);
  const city = getCity(stateSlug, citySlug);
  if (!state || !city) notFound();

  const stats = statsFor(city.clinics);
  const place = `${city.name}, ${city.stateAbbr}`;
  const nearby = nearbyCityPages(city);

  return (
    <>
      <DirectoryBreadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Clinic Locator", href: "/clinic-locator" },
          { label: state.name, href: statePath(state) },
          { label: city.name, href: cityPath(city) },
        ]}
      />
      <ServicePageHeader
        eyebrow={`eScreen network · ${state.name}`}
        title={`eScreen drug testing clinics in ${place}`}
        intro={
          `There are ${plural(stats.total, "eScreen-affiliated clinic", "eScreen-affiliated clinics")} in ${city.name}: ` +
          `${stats.onsite} collect with eScreen on site, ${stats.lab} ${stats.lab === 1 ? "is a" : "are"} LabCorp, Quest or other lab partner ` +
          `${stats.lab === 1 ? "site" : "sites"}, and ${stats.physicals} offer DOT and employment physicals.`
        }
        iconName="Building2"
      />

      <section className="container-wide space-y-10 pb-16">
        <DirectoryStats stats={stats} />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display-bolt mb-4 text-2xl font-semibold text-slate-900">Clinics in {place}</h2>
            <DirectoryClinicList clinics={city.clinics} />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ClinicAreaMap clinics={city.clinics.map(encodeClinic)} />
            <Link
              href={`/clinic-locator?q=${encodeURIComponent(place)}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Search className="h-4 w-4 text-primary-600" aria-hidden />
              Open {city.name} in the clinic locator
            </Link>
          </div>
        </div>

        <DirectoryCta place={place} />

        {nearby.length > 0 && (
          <div>
            <h2 className="font-display-bolt mb-4 text-2xl font-semibold text-slate-900">Clinics in nearby cities</h2>
            <DirectoryLinkGrid
              links={nearby.map((other) => ({
                href: cityPath(other),
                label: `${other.name}, ${other.stateAbbr}`,
                count: other.clinics.length,
                note: `${other.clinics.length} clinics · ${Math.round(other.miles)} mi`,
              }))}
            />
          </div>
        )}

        <p className="text-sm text-slate-500">
          See every clinic in{" "}
          <Link href={statePath(state)} className="font-semibold text-primary-700 hover:underline">
            {state.name}
          </Link>{" "}
          or{" "}
          <Link href="/clinic-locator" className="font-semibold text-primary-700 hover:underline">
            search the nationwide clinic locator
          </Link>
          .
        </p>
      </section>
    </>
  );
}
