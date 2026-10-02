"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { decodeClinic, type CompactClinic } from "@/content/clinics";
import type { MappableClinic } from "./ClinicMap";

const ClinicMap = dynamic(() => import("./ClinicMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
      Loading map…
    </div>
  ),
});

/** Map of one state's or city's clinics on the directory pages, zoomed to fit them. */
export function ClinicAreaMap({ clinics }: { clinics: CompactClinic[] }) {
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);

  const mappable: MappableClinic[] = useMemo(
    () => clinics.map((row) => ({ ...decodeClinic(row), distanceMiles: null, inRange: true })),
    [clinics],
  );
  const fitPoints = useMemo(
    () =>
      mappable
        .filter((c) => c.lat !== null && c.lng !== null)
        .map((c) => [c.lat, c.lng] as [number, number]),
    [mappable],
  );

  return (
    <div className="h-[380px] overflow-hidden rounded-2xl border border-slate-100 shadow-sm sm:h-[460px]">
      <ClinicMap
        clinics={mappable}
        fitPoints={fitPoints}
        selectedClinic={selectedClinic}
        onSelect={setSelectedClinic}
        userLocation={null}
      />
    </div>
  );
}
