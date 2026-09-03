"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-primary-200 bg-primary-50/30" : "border-slate-100 bg-white"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display-bolt text-sm font-semibold text-slate-900">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-primary-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm text-slate-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}