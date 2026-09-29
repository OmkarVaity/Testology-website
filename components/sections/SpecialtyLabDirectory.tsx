"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const labs = [
  { name: "2020 BioLabs INC.", specialty: "Oncology" },
  { name: "Access Labs", specialty: "Full Service Diagnostic Laboratory" },
  { name: "Baylor Genetics", specialty: "Genetic Testing" },
  { name: "Boston Heart Diagnostics", specialty: "Cardiovascular" },
  { name: "CIMA Sciences", specialty: "Liver Function" },
  { name: "Cleveland Diagnostics", specialty: "Oncology" },
  { name: "COMBINEDBrain", specialty: "Neurological Disorders" },
  { name: "DNA Diagnostics Center", specialty: "DNA Testing" },
  { name: "Doctor's Data, Inc.", specialty: "Diagnostic Testing" },
  { name: "Eurofins CellTx", specialty: "Women's Health" },
  { name: "Fulgent Therapeutics, LLC", specialty: "Full Service Diagnostic Laboratory" },
  { name: "Guardant Health", specialty: "Oncology" },
  { name: "Health Outlook", specialty: "Wellness" },
  { name: "Kihealth Inc.", specialty: "Diabetes Management" },
  { name: "Laboratory Management Partners LLC", specialty: "Functional Medicine" },
  { name: "Natera, Inc.", specialty: "Genetic Testing" },
  { name: "Naveris", specialty: "Oncology" },
  { name: "NeoGenomics Laboratories Inc.", specialty: "Oncology" },
  { name: "Neurocode USA", specialty: "Functional Medicine" },
  { name: "New Day Diagnostics", specialty: "Oncology" },
  { name: "Oncosure Testing", specialty: "Oncology" },
  { name: "Prometheus Laboratories", specialty: "Basic Health" },
  { name: "Scipher Medicine", specialty: "Autoimmune - RA Treatment" },
];

export function SpecialtyLabDirectory() {
  const [query, setQuery] = useState("");

  const filtered = labs.filter(
    (lab) =>
      lab.name.toLowerCase().includes(query.toLowerCase()) ||
      lab.specialty.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by lab name or specialty..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span className="w-10"></span>
          <span>Lab / Client Name</span>
          <span>Specialty</span>
        </div>

        {filtered.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            No labs match that search.
          </p>
        ) : (
          filtered.map((lab) => (
            <div
              key={lab.name}
              className="grid grid-cols-[auto_1fr_1fr] items-center gap-4 border-b border-slate-50 px-5 py-3 last:border-0 hover:bg-slate-50/60"
            >
              {/* TODO: replace with <img src={`/images/lab-partners/${slug}.png`} /> once real logo files are provided */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-400">
                {lab.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-900">{lab.name}</span>
              <span className="text-sm text-slate-500">{lab.specialty}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}