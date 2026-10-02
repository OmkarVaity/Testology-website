"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, Loader2, X, LocateFixed, Navigation, Phone, Link2, Check, Stethoscope } from "lucide-react";
import {
  directionsUrl,
  matchesFilters,
  siteTypeOptions,
  type ClinicStatus,
  type SiteTypeFilter,
} from "@/content/clinics";
import { useClinics } from "@/lib/use-clinics";
import { ORDERING_ENABLED, orderUrl } from "@/lib/order-links";
import { capabilityMeta, clinicOffersService, getService } from "@/content/escreen-services";
import { geocodeAddress, haversineMiles } from "@/lib/geo";
import { ClinicStatusIcon, ClinicStatusLegend } from "./ClinicStatusIcon";
import type { MappableClinic } from "./ClinicMap";

const ClinicMap = dynamic(() => import("./ClinicMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
      Loading map…
    </div>
  ),
});

const RADIUS_OPTIONS = [10, 25, 50, 100] as const;
type Radius = (typeof RADIUS_OPTIONS)[number] | "any";
const DEFAULT_RADIUS: Radius = 50;

const PAGE_SIZE = 25;
/** Cap on how many results the map zooms to fit, so a wide radius doesn't zoom out to the whole region. */
const MAX_FIT_CLINICS = 15;

const NOT_FOUND = "We couldn't find that location. Try a zip code, a city and state, or a full street address.";
const LOOKUP_FAILED = "Location lookup failed. Please try again in a moment.";

type UserLocation = { lat: number; lng: number; label: string };
type Lookup = { query: string; attempt: number; location: UserLocation | null; error?: string };

// The URL is the source of truth for the search, so results can be shared and the back button works:
//   ?q=75201&radius=25&type=onsite&physicals=1
// It's read through useSyncExternalStore rather than useSearchParams, which would need a Suspense boundary —
// and hiding/re-showing that boundary tears down and rebuilds the Leaflet map.
const URL_CHANGE_EVENT = "clinic-locator:urlchange";

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE_EVENT, onChange);
  };
}

const getUrlSearch = () => window.location.search;
const getServerUrlSearch = () => "";

function parseRadius(value: string | null): Radius {
  if (value === "any") return "any";
  const n = Number(value);
  return (RADIUS_OPTIONS as readonly number[]).includes(n) ? (n as Radius) : DEFAULT_RADIUS;
}

function parseSiteType(value: string | null): SiteTypeFilter {
  return value === "onsite" || value === "lab" ? value : "all";
}

export function ClinicLocator() {
  const urlSearch = useSyncExternalStore(subscribeToUrl, getUrlSearch, getServerUrlSearch);
  const searchParams = useMemo(() => new URLSearchParams(urlSearch), [urlSearch]);
  const activeQuery = searchParams.get("q")?.trim() || null;
  const radius = parseRadius(searchParams.get("radius"));
  const siteType = parseSiteType(searchParams.get("type"));
  const physicalsOnly = searchParams.get("physicals") === "1";
  // Set by "Find a clinic" on /escreen-services: only clinics that can perform that test.
  const service = getService(searchParams.get("service"));
  const filtersActive = siteType !== "all" || physicalsOnly || !!service;

  const { clinics: allClinics, status: dataStatus } = useClinics();
  const [query, setQuery] = useState(activeQuery ?? "");
  const [lookup, setLookup] = useState<Lookup | null>(null);
  const [attempt, setAttempt] = useState(0);
  // "Use my location" is kept out of the URL on purpose: coordinates shouldn't end up in shared links.
  const [geoLocation, setGeoLocation] = useState<UserLocation | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [copied, setCopied] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  // When the URL's search changes underneath us (back/forward), mirror it into the input and reset the list.
  const [syncedQuery, setSyncedQuery] = useState(activeQuery);
  if (activeQuery !== syncedQuery) {
    setSyncedQuery(activeQuery);
    setQuery(activeQuery ?? "");
    setSelectedClinic(null);
    setVisibleCount(PAGE_SIZE);
  }

  // Geocode whatever search the URL holds; a stale response for an older query is ignored.
  useEffect(() => {
    if (!activeQuery) return;
    let cancelled = false;
    geocodeAddress(activeQuery).then(
      (location) => {
        if (!cancelled) setLookup({ query: activeQuery, attempt, location, error: location ? undefined : NOT_FOUND });
      },
      () => {
        if (!cancelled) setLookup({ query: activeQuery, attempt, location: null, error: LOOKUP_FAILED });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [activeQuery, attempt]);

  const currentLookup = lookup && lookup.query === activeQuery && lookup.attempt === attempt ? lookup : null;
  const searching = !!activeQuery && !currentLookup;
  const userLocation = activeQuery ? (currentLookup?.location ?? null) : geoLocation;
  const errorMessage = activeQuery ? (currentLookup?.error ?? "") : geoError;

  const presentStatuses = useMemo(() => {
    const found = new Set<ClinicStatus>();
    for (const clinic of allClinics) for (const s of clinic.statuses) found.add(s);
    return found;
  }, [allClinics]);

  const mappableClinics: MappableClinic[] = useMemo(() => {
    const filters = { siteType, physicalsOnly };
    const withDistance = allClinics
      .filter((clinic) => matchesFilters(clinic, filters) && (!service || clinicOffersService(clinic, service)))
      .map((clinic) => {
        const distanceMiles =
          userLocation && clinic.lat !== null && clinic.lng !== null
            ? haversineMiles(userLocation, { lat: clinic.lat, lng: clinic.lng })
            : null;
        const inRange = !userLocation || radius === "any" || (distanceMiles !== null && distanceMiles <= radius);
        return { ...clinic, distanceMiles, inRange };
      });

    if (userLocation) {
      withDistance.sort((a, b) => (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity));
    } else {
      // Keep Testology on top of the unsearched list.
      withDistance.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return withDistance;
  }, [allClinics, userLocation, radius, siteType, physicalsOnly, service]);

  const results = useMemo(() => mappableClinics.filter((c) => c.inRange), [mappableClinics]);
  const nearestOutOfRange = results.length === 0 ? mappableClinics.find((c) => c.distanceMiles !== null) : undefined;

  const fitPoints: [number, number][] = useMemo(() => {
    // No search yet: the map shows the whole country.
    if (!userLocation) return [];

    const focus = results.length > 0 ? results.slice(0, MAX_FIT_CLINICS) : mappableClinics.slice(0, 3);
    const located = focus
      .filter((c) => c.lat !== null && c.lng !== null)
      .map((c) => [c.lat, c.lng] as [number, number]);
    return [[userLocation.lat, userLocation.lng], ...located];
  }, [mappableClinics, results, userLocation]);

  // Keep the picked clinic visible in the list when it was chosen from the map.
  useEffect(() => {
    if (!selectedClinic || !listRef.current) return;
    const item = listRef.current.querySelector<HTMLElement>(`[data-clinic-id="${selectedClinic}"]`);
    if (!item) return;
    const list = listRef.current;
    // The list is `relative`, so offsetTop is already measured from its top edge.
    const itemTop = item.offsetTop;
    if (itemTop < list.scrollTop || itemTop + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: itemTop - 8, behavior: "smooth" });
    }
  }, [selectedClinic]);

  /** Updates the URL's search params; `push` adds a history entry (new search), `replace` doesn't (tweaks). */
  function updateParams(changes: Record<string, string | null>, mode: "push" | "replace") {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    if (mode === "push") window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
    // pushState/replaceState don't fire popstate, so tell the URL store about the change ourselves.
    window.dispatchEvent(new Event(URL_CHANGE_EVENT));
  }

  function resetResults() {
    setSelectedClinic(null);
    setVisibleCount(PAGE_SIZE);
    listRef.current?.scrollTo({ top: 0 });
  }

  function handleSelect(id: string) {
    // A marker picked on the map may sit past the current page of the list — reveal it.
    const index = results.findIndex((c) => c.id === id);
    if (index >= visibleCount) {
      setVisibleCount(Math.ceil((index + 1) / PAGE_SIZE) * PAGE_SIZE);
    }
    setSelectedClinic(id);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;

    setGeoLocation(null);
    setGeoError("");
    resetResults();
    if (text === activeQuery) setAttempt((n) => n + 1);
    else updateParams({ q: text }, "push");
  }

  function handleUseMyLocation() {
    if (!("geolocation" in navigator)) {
      setGeoError("Your browser doesn't support location lookup. Please enter a zip code instead.");
      return;
    }

    setLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        setQuery("");
        setGeoLocation({ lat: position.coords.latitude, lng: position.coords.longitude, label: "your current location" });
        resetResults();
        if (activeQuery) updateParams({ q: null }, "push");
      },
      () => {
        setLocating(false);
        setGeoError("We couldn't get your location. Check your browser's location permission, or enter a zip code.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }

  function handleClear() {
    setQuery("");
    setGeoLocation(null);
    setGeoError("");
    resetResults();
    if (activeQuery) updateParams({ q: null }, "push");
  }

  function handleRadius(value: string) {
    const next = parseRadius(value);
    setVisibleCount(PAGE_SIZE);
    updateParams({ radius: next === DEFAULT_RADIUS ? null : String(next) }, "replace");
  }

  function handleSiteType(value: SiteTypeFilter) {
    resetResults();
    updateParams({ type: value === "all" ? null : value }, "replace");
  }

  function handlePhysicals() {
    resetResults();
    updateParams({ physicals: physicalsOnly ? null : "1" }, "replace");
  }

  function handleClearFilters() {
    resetResults();
    updateParams({ type: null, physicals: null, service: null }, "replace");
  }

  function handleClearService() {
    resetResults();
    updateParams({ service: null }, "replace");
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the URL bar still has the link.
    }
  }

  const busy = searching || locating;
  const visibleResults = results.slice(0, visibleCount);
  const noun = (n: number) => (n === 1 ? "clinic" : "clinics");

  return (
    <div>
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2 lg:max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zip code, city, or address"
              aria-label="Zip code, city, or address"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="flex h-12 min-w-[92px] items-center justify-center rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </button>
          {userLocation && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={busy}
            className="flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 lg:flex-none"
          >
            {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4 text-primary-600" />}
            Use my location
          </button>

          <label className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600">
            <span className="whitespace-nowrap">Within</span>
            <select
              value={radius}
              onChange={(e) => handleRadius(e.target.value)}
              className="h-full bg-transparent font-semibold text-slate-900 focus:outline-none"
            >
              {RADIUS_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r} mi
                </option>
              ))}
              <option value="any">Any distance</option>
            </select>
          </label>
        </div>
      </div>

      {service && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary-100 bg-primary-50 px-4 py-2.5 text-sm text-primary-900">
          <p>
            Showing clinics for <span className="font-semibold">{service.name}</span>{" "}
            <span className="text-primary-700">({capabilityMeta[service.performedAt].label})</span>
          </p>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <Link href="/escreen-services" className="text-primary-700 hover:underline">
              Change test
            </Link>
            <button type="button" onClick={handleClearService} className="text-slate-500 hover:underline">
              Show all clinics
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter clinics">
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {siteTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSiteType(option.value)}
              aria-pressed={siteType === option.value}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                siteType === option.value ? "bg-primary-600 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handlePhysicals}
          aria-pressed={physicalsOnly}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
            physicalsOnly
              ? "border-primary-600 bg-primary-50 text-primary-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {physicalsOnly ? <Check className="h-4 w-4" /> : <Stethoscope className="h-4 w-4" />}
          Offers physicals
        </button>
        {filtersActive && (
          <button type="button" onClick={handleClearFilters} className="px-2 text-xs font-semibold text-slate-500 hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {errorMessage && <p className="mb-4 text-sm text-red-600">{errorMessage}</p>}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-500" aria-live="polite">
          {userLocation ? (
            <>
              <span className="font-semibold text-slate-700">{results.length.toLocaleString()}</span>{" "}
              {filtersActive ? `matching ${noun(results.length)}` : noun(results.length)}{" "}
              {radius === "any" ? "near" : `within ${radius} mi of`}{" "}
              <span className="font-medium text-slate-700">{userLocation.label}</span>
              {results.length > 0 ? ", sorted by distance." : "."}
            </>
          ) : searching ? (
            "Finding that location…"
          ) : dataStatus === "loading" ? (
            "Loading clinics…"
          ) : dataStatus === "error" ? (
            <span className="text-red-600">We couldn&apos;t load the clinic list. Please refresh the page.</span>
          ) : (
            <>
              <span className="font-semibold text-slate-700">{mappableClinics.length.toLocaleString()}</span>{" "}
              {filtersActive ? "matching" : "eScreen-affiliated"} clinics nationwide. Search to sort them by distance
              from you.
            </>
          )}
        </p>
        {activeQuery && userLocation && (
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:underline"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            {copied ? "Link copied" : "Copy link to these results"}
          </button>
        )}
      </div>

      <div className="grid gap-4 lg:h-[780px] lg:grid-cols-[minmax(340px,420px)_1fr]">
        <div className="order-2 flex max-h-[640px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:order-1 lg:max-h-none">
          <div ref={listRef} className="relative flex-1 overflow-y-auto">
            {results.length === 0 && (userLocation || (filtersActive && dataStatus === "ready")) && (
              <div className="p-6 text-center text-sm text-slate-500">
                <p className="mb-3">
                  {userLocation ? `No ${filtersActive ? "matching " : ""}clinics within ${radius} mi.` : "No clinics match these filters."}
                  {nearestOutOfRange?.distanceMiles != null && (
                    <>
                      {" "}
                      The nearest is <span className="font-semibold text-slate-700">{nearestOutOfRange.name}</span>,{" "}
                      {nearestOutOfRange.distanceMiles.toFixed(0)} mi away.
                    </>
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {userLocation && radius !== "any" && (
                    <button
                      type="button"
                      onClick={() => handleRadius("any")}
                      className="rounded-lg bg-primary-50 px-4 py-2 font-semibold text-primary-700 hover:bg-primary-100"
                    >
                      Show all clinics by distance
                    </button>
                  )}
                  {filtersActive && (
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}

            {visibleResults.map((clinic) => {
              const isSelected = selectedClinic === clinic.id;
              return (
                <div
                  key={clinic.id}
                  data-clinic-id={clinic.id}
                  className={`border-b border-slate-100 transition-colors last:border-0 ${
                    isSelected ? "bg-primary-50" : "hover:bg-slate-50/70"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedClinic(clinic.id)}
                    aria-pressed={isSelected}
                    className="flex w-full items-start gap-3 px-4 pt-3 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          {clinic.name}
                          {clinic.featured && (
                            <span className="ml-2 inline-block rounded-full bg-primary-600 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-white">
                              Our clinic
                            </span>
                          )}
                        </p>
                        {clinic.distanceMiles !== null && (
                          <span
                            className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600"
                            title={clinic.approx ? "Approximate — measured to the clinic's zip code" : undefined}
                          >
                            {clinic.approx ? "≈ " : ""}
                            {clinic.distanceMiles.toFixed(1)} mi
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {clinic.address}, {clinic.city}, {clinic.state} {clinic.zip}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-4 px-4 pb-3 pt-2">
                    <div className="flex items-center gap-1">
                      {clinic.statuses.map((s) => (
                        <ClinicStatusIcon key={s} status={s} size="sm" />
                      ))}
                    </div>
                    <a
                      href={`tel:${clinic.phone}`}
                      className="flex items-center gap-1 text-xs font-medium text-primary-700 hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {clinic.phone}
                    </a>
                    <a
                      href={directionsUrl(clinic)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-primary-700 hover:underline"
                    >
                      <Navigation className="h-3 w-3" />
                      Directions
                    </a>
                    {ORDERING_ENABLED && (
                      <Link
                        href={orderUrl(clinic.id, service?.id)}
                        className="ml-auto rounded-lg bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-primary-700"
                      >
                        Order here
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {results.length > visibleCount && (
              <div className="p-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Show more ({(results.length - visibleCount).toLocaleString()} remaining)
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="order-1 h-[460px] overflow-hidden rounded-2xl border border-slate-100 shadow-sm sm:h-[560px] lg:order-2 lg:h-full">
          <ClinicMap
            clinics={mappableClinics}
            fitPoints={fitPoints}
            selectedClinic={selectedClinic}
            onSelect={handleSelect}
            userLocation={userLocation}
          />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">What the icons mean</p>
        <ClinicStatusLegend statuses={presentStatuses} />
      </div>
    </div>
  );
}
