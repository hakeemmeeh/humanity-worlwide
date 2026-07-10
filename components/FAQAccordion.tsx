"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-2xl border border-sand-deep bg-white"
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-sand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="font-semibold text-navy">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-teal transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t border-sand-deep px-6 py-5"
            >
              <p className="leading-relaxed text-ink/70">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
