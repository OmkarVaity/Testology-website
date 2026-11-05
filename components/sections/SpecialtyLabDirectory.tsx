"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

// Logo column on/off. Set to true to bring the logos back (the files are still in public/images/lab-partners/).
const SHOW_LOGOS = true;

// `logo` is a file in public/images/lab-partners/; labs without one show their initials.
const labs: { name: string; specialty: string; logo?: string }[] = [
  { name: "2020 BioLabs INC.", specialty: "Oncology", logo: "2020-biolabs.png" },
  { name: "Access Labs", specialty: "Full Service Diagnostic Laboratory", logo: "access-labs.png" },
  { name: "Baylor Genetics", specialty: "Genetic Testing", logo: "baylor-genetics.png" },
  { name: "Boston Heart Diagnostics", specialty: "Cardiovascular", logo: "boston-heart.png" },
  { name: "CIMA Sciences", specialty: "Liver Function", logo: "cima-sciences.png" },
  { name: "Cleveland Diagnostics", specialty: "Oncology", logo: "cleveland-diagnostics.png" },
  { name: "COMBINEDBrain", specialty: "Neurological Disorders", logo: "combinedbrain.png" },
  { name: "DNA Diagnostics Center", specialty: "DNA Testing", logo: "dna-diagnostics-center.png" },
  { name: "Doctor's Data, Inc.", specialty: "Diagnostic Testing", logo: "doctors-data.png" },
  { name: "Eurofins CellTx", specialty: "Women's Health", logo: "eurofins.png" },
  { name: "Fulgent Therapeutics, LLC", specialty: "Full Service Diagnostic Laboratory", logo: "fulgent.png" },
  { name: "Galleri", specialty: "Oncology – Multi-Cancer Early Detection", logo: "galleri.png" },
  { name: "Guardant Health", specialty: "Oncology", logo: "guardant.png" },
  { name: "Health Outlook", specialty: "Wellness", logo: "health-outlook.png" },
  { name: "Kihealth Inc.", specialty: "Diabetes Management", logo: "kihealth.png" },
  { name: "Laboratory Management Partners LLC", specialty: "Functional Medicine" },
  { name: "Natera, Inc.", specialty: "Genetic Testing", logo: "natera.png" },
  { name: "Naveris", specialty: "Oncology", logo: "naveris.png" },
  { name: "NeoGenomics Laboratories Inc.", specialty: "Oncology", logo: "neogenomics.png" },
  { name: "Neurocode USA", specialty: "Functional Medicine", logo: "neurocode.png" },
  { name: "New Day Diagnostics", specialty: "Oncology", logo: "new-day-diagnostics.png" },
  { name: "Oncosure Testing", specialty: "Oncology", logo: "oncosure.png" },
  { name: "Prometheus Laboratories", specialty: "Basic Health", logo: "prometheus.png" },
  { name: "Scipher Medicine", specialty: "Autoimmune - RA Treatment", logo: "scipher.png" },
];

// Written out in full (not built from pieces) so Tailwind generates both classes.
const columns = SHOW_LOGOS ? "grid-cols-[7rem_1fr_1fr]" : "grid-cols-2";

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
        <div
          className={`grid ${columns} gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500`}
        >
          {SHOW_LOGOS && <span aria-hidden></span>}
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
              className={`grid ${columns} items-center gap-4 border-b border-slate-50 px-5 py-3 last:border-0 hover:bg-slate-50/60`}
            >
              {!SHOW_LOGOS ? null : lab.logo ? (
                // Wider than the initials badge: wordmark logos (and their taglines) need the room to stay legible.
                <div className="flex h-11 w-28 items-center">
                  <Image
                    src={`/images/lab-partners/${lab.logo}`}
                    alt={`${lab.name} logo`}
                    width={224}
                    height={68}
                    className="h-auto max-h-11 w-auto max-w-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className="flex h-10 w-20 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-400"
                  aria-hidden
                >
                  {lab.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-slate-900">{lab.name}</span>
              <span className="text-sm text-slate-500">{lab.specialty}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}