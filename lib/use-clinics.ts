"use client";

import { useEffect, useState } from "react";
import { decodeClinic, type Clinic, type CompactClinic } from "@/content/clinics";

// One request per page view, shared by every component that needs the clinic list (locator, order flow).
let request: Promise<Clinic[]> | null = null;

function loadClinics(): Promise<Clinic[]> {
  request ??= fetch("/api/clinics")
    .then((res) => {
      if (!res.ok) throw new Error(`Clinic data request failed (${res.status})`);
      return res.json() as Promise<CompactClinic[]>;
    })
    .then((rows) => rows.map(decodeClinic))
    .catch((err) => {
      request = null; // let a later mount retry
      throw err;
    });
  return request;
}

export function useClinics(): { clinics: Clinic[]; status: "loading" | "ready" | "error" } {
  const [state, setState] = useState<{ clinics: Clinic[]; status: "loading" | "ready" | "error" }>({
    clinics: [],
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    loadClinics().then(
      (clinics) => !cancelled && setState({ clinics, status: "ready" }),
      () => !cancelled && setState({ clinics: [], status: "error" }),
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
