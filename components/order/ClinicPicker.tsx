"use client";

import { useMemo, useState } from "react";
import { Check, Loader2, LocateFixed, Search } from "lucide-react";
import { clinicStatusMeta, type Clinic } from "@/content/clinics";
import { clinicOffersService, type EscreenService } from "@/content/escreen-services";
import { geocodeAddress, haversineMiles } from "@/lib/geo";

const PAGE_SIZE = 8;

type Origin = { lat: number; lng: number; label: string };

/** Step 2 of /order: nearest clinics that can perform every selected test. */
export function ClinicPicker({
  clinics,
  services,
  selectedId,
  onSelect,
  error,
}: {
  clinics: Clinic[];
  services: EscreenService[];
  selectedId: string | null;
  onSelect: (clinic: Clinic) => void;
  error?: string;
}) {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [status, setStatus] = useState<"idle" | "searching" | "locating">("idle");
  const [searchError, setSearchError] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const eligible = useMemo(
    () => clinics.filter((c) => c.lat !== null && c.lng !== null && services.every((s) => clinicOffersService(c, s))),
    [clinics, services],
  );

  const ranked = useMemo(() => {
    if (!origin) return [];
    return eligible
      .map((clinic) => ({ clinic, miles: haversineMiles(origin, { lat: clinic.lat!, lng: clinic.lng! }) }))
      .sort((a, b) => a.miles - b.miles);
  }, [eligible, origin]);

  const selected = clinics.find((c) => c.id === selectedId) ?? null;
  const selectedIsEligible = !!selected && eligible.includes(selected);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus("searching");
    setSearchError("");
    try {
      const result = await geocodeAddress(query.trim());
      if (result) {
        setOrigin(result);
        setVisible(PAGE_SIZE);
      } else {
        setSearchError("We couldn't find that location. Try a zip code or a city and state.");
      }
    } catch {
      setSearchError("Location lookup failed. Please try again.");
    } finally {
      setStatus("idle");
    }
  }

  function handleLocate() {
    if (!("geolocation" in navigator)) {
      setSearchError("Your browser doesn't support location lookup. Please enter a zip code.");
      return;
    }
    setStatus("locating");
    setSearchError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "your location" });
        setVisible(PAGE_SIZE);
        setStatus("idle");
      },
      () => {
        setSearchError("We couldn't get your location. Please enter a zip code.");
        setStatus("idle");
      },
      { timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }

  return (
    <div className="space-y-4">
      {selected && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            selectedIsEligible ? "border-primary-200 bg-primary-50 text-primary-900" : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <p className="font-semibold">{selectedIsEligible ? "Selected clinic" : "This clinic can't do every test you chose"}</p>
          <p>
            {selected.name} — {selected.address}, {selected.city}, {selected.state} {selected.zip}
          </p>
          {!selectedIsEligible && <p className="mt-1">Search below for a clinic that offers all of them.</p>}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zip code or city"
              aria-label="Zip code or city"
              aria-invalid={!!error || undefined}
              aria-describedby={error ? "clinic-picker-error" : undefined}
              // text-base on phones: iOS zooms in on focused inputs smaller than 16px.
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={status !== "idle"}
            className="flex h-11 min-w-[88px] items-center justify-center rounded-xl bg-primary-600 px-4 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {status === "searching" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </button>
        </form>
        <button
          type="button"
          onClick={handleLocate}
          disabled={status !== "idle"}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {status === "locating" ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4 text-primary-600" />}
          Use my location
        </button>
      </div>

      {searchError && (
        <p role="alert" className="text-sm text-red-600">
          {searchError}
        </p>
      )}
      {error && (
        <p id="clinic-picker-error" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {/* The list appears below the search box; announce it so screen-reader users know results arrived. */}
      <p aria-live="polite" className="sr-only">
        {origin ? `${ranked.length.toLocaleString()} clinics found near ${origin.label}.` : ""}
      </p>

      {origin && (
        <fieldset>
          <legend className="mb-2 text-sm text-slate-500">
            {ranked.length.toLocaleString()} clinics offer {services.length === 1 ? "this test" : "all of these tests"} —
            nearest to {origin.label} first.
          </legend>
          <div className="space-y-2">
            {ranked.slice(0, visible).map(({ clinic, miles }) => {
              const isSelected = clinic.id === selectedId;
              return (
                <label
                  key={clinic.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                    isSelected ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="clinic"
                    checked={isSelected}
                    onChange={() => onSelect(clinic)}
                    className="mt-1 accent-[var(--color-primary-600)]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-900">{clinic.name}</span>
                      <span className="shrink-0 text-xs font-semibold text-slate-500">
                        {clinic.approx ? "≈ " : ""}
                        {miles.toFixed(1)} mi
                      </span>
                    </span>
                    <span className="block text-xs text-slate-500">
                      {clinic.address}, {clinic.city}, {clinic.state} {clinic.zip} · {clinic.phone}
                    </span>
                    <span className="mt-1 block text-xs text-slate-600">
                      {clinic.statuses.map((s) => clinicStatusMeta[s].label).join(" · ")}
                    </span>
                  </span>
                  {isSelected && <Check className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden />}
                </label>
              );
            })}
          </div>
          {ranked.length > visible && (
            <button
              type="button"
              onClick={() => setVisible((n) => n + PAGE_SIZE)}
              className="mt-3 w-full rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Show more clinics
            </button>
          )}
        </fieldset>
      )}
    </div>
  );
}
