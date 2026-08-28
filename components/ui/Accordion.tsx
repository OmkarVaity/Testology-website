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
    <div className="divide-y divide-slate/20 border-y border-slate/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="font-display text-sm font-medium text-ink">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && <p className="pb-4 text-sm text-slate">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}