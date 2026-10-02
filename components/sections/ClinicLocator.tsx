"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Search, Loader2, X, LocateFixed, Navigation, Phone } from "lucide-react";
import { decodeClinic, directionsUrl, type Clinic, type ClinicStatus, type CompactClinic } from "@/content/clinics";
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

const PAGE_SIZE = 25;
/** Cap on how many results the map zooms to fit, so a wide radius doesn't zoom out to the whole region. */
const MAX_FIT_CLINICS = 15;

type UserLocation = { lat: number; lng: number; label: string };

export function ClinicLocator() {
  const [allClinics, setAllClinics] = useState<Clinic[]>([]);
  const [dataStatus, setDataStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "locating" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [radius, setRadius] = useState<Radius>(50);
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const listRef = useRef<HTMLDivElement>(null);
  // Guards against a slow lookup overwriting the result of a newer one.
  const requestId = useRef(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clinics")
      .then((res) => {
        if (!res.ok) throw new Error(`Clinic data request failed (${res.status})`);
        return res.json() as Promise<CompactClinic[]>;
      })
      .then((rows) => {
        if (cancelled) return;
        setAllClinics(rows.map(decodeClinic));
        setDataStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setDataStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const presentStatuses = useMemo(() => {
    const found = new Set<ClinicStatus>();
    for (const clinic of allClinics) for (const s of clinic.statuses) found.add(s);
    return found;
  }, [allClinics]);

  const mappableClinics: MappableClinic[] = useMemo(() => {
    const withDistance = allClinics.map((clinic) => {
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
  }, [allClinics, userLocation, radius]);

  const results = useMemo(() => mappableClinics.filter((c) => c.inRange), [mappableClinics]);
  const nearestOutOfRange = results.length === 0 ? mappableClinics.find((c) => c.distanceMiles !== null) : undefined;

  const fitPoints: [number, number][] = useMemo(() => {
    const located = (list: MappableClinic[]) =>
      list.filter((c) => c.lat !== null && c.lng !== null).map((c) => [c.lat, c.lng] as [number, number]);

    // No search yet: the map shows the whole country.
    if (!userLocation) return [];

    const focus = results.length > 0 ? results.slice(0, MAX_FIT_CLINICS) : mappableClinics.slice(0, 3);
    return [[userLocation.lat, userLocation.lng], ...located(focus)];
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

  function handleSelect(id: string) {
    // A marker picked on the map may sit past the current page of the list — reveal it.
    const index = results.findIndex((c) => c.id === id);
    if (index >= visibleCount) {
      setVisibleCount(Math.ceil((index + 1) / PAGE_SIZE) * PAGE_SIZE);
    }
    setSelectedClinic(id);
  }

  function applyLocation(location: UserLocation) {
    setUserLocation(location);
    setSelectedClinic(null);
    setVisibleCount(PAGE_SIZE);
    setStatus("idle");
    listRef.current?.scrollTo({ top: 0 });
  }

  function fail(message: string) {
    setStatus("error");
    setErrorMessage(message);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    const id = ++requestId.current;
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await geocodeAddress(query.trim());
      if (id !== requestId.current) return;
      if (!result) {
        fail("We couldn't find that location. Try a zip code, a city and state, or a full street address.");
        return;
      }
      applyLocation(result);
    } catch {
      if (id === requestId.current) fail("Location lookup failed. Please try again in a moment.");
    }
  }

  function handleUseMyLocation() {
    if (!("geolocation" in navigator)) {
      fail("Your browser doesn't support location lookup. Please enter a zip code instead.");
      return;
    }

    const id = ++requestId.current;
    setStatus("locating");
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (id !== requestId.current) return;
        setQuery("");
        applyLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: "your current location",
        });
      },
      () => {
        if (id === requestId.current) {
          fail("We couldn't get your location. Check your browser's location permission, or enter a zip code.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }

  function handleClear() {
    requestId.current++;
    setQuery("");
    setUserLocation(null);
    setSelectedClinic(null);
    setVisibleCount(PAGE_SIZE);
    setStatus("idle");
    setErrorMessage("");
  }

  const busy = status === "loading" || status === "locating";
  const visibleResults = results.slice(0, visibleCount);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
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
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
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
            {status === "locating" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LocateFixed className="h-4 w-4 text-primary-600" />
            )}
            Use my location
          </button>

          <label className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600">
            <span className="whitespace-nowrap">Within</span>
            <select
              value={radius}
              onChange={(e) => {
                setRadius(e.target.value === "any" ? "any" : (Number(e.target.value) as Radius));
                setVisibleCount(PAGE_SIZE);
              }}
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

      {status === "error" && <p className="mb-4 text-sm text-red-600">{errorMessage}</p>}

      <p className="mb-4 text-sm text-slate-500" aria-live="polite">
        {userLocation ? (
          <>
            <span className="font-semibold text-slate-700">{results.length.toLocaleString()}</span>{" "}
            {results.length === 1 ? "clinic" : "clinics"} {radius === "any" ? "near" : `within ${radius} mi of`}{" "}
            <span className="font-medium text-slate-700">{userLocation.label}</span>
            {results.length > 0 ? ", sorted by distance." : "."}
          </>
        ) : dataStatus === "loading" ? (
          "Loading clinics…"
        ) : dataStatus === "error" ? (
          <span className="text-red-600">We couldn&apos;t load the clinic list. Please refresh the page.</span>
        ) : (
          <>
            <span className="font-semibold text-slate-700">{allClinics.length.toLocaleString()}</span>{" "}
            eScreen-affiliated clinics nationwide. Search to sort them by distance from you.
          </>
        )}
      </p>

      <div className="grid gap-4 lg:h-[780px] lg:grid-cols-[minmax(340px,420px)_1fr]">
        <div className="order-2 flex max-h-[640px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:order-1 lg:max-h-none">
          <div ref={listRef} className="relative flex-1 overflow-y-auto">
            {results.length === 0 && userLocation && (
              <div className="p-6 text-center text-sm text-slate-500">
                <p className="mb-3">
                  No clinics within {radius} mi.
                  {nearestOutOfRange?.distanceMiles != null && (
                    <>
                      {" "}
                      The nearest is <span className="font-semibold text-slate-700">{nearestOutOfRange.name}</span>,{" "}
                      {nearestOutOfRange.distanceMiles.toFixed(0)} mi away.
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setRadius("any")}
                  className="rounded-lg bg-primary-50 px-4 py-2 font-semibold text-primary-700 hover:bg-primary-100"
                >
                  Show all clinics by distance
                </button>
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

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
        <ClinicStatusLegend statuses={presentStatuses} />
      </div>
    </div>
  );
}
