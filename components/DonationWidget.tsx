"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { donationAmounts } from "@/data/content";

export function DonationWidget({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const amount = custom ? parseInt(custom, 10) || 0 : selected;

  const handleDonate = () => {
    // TODO: wire to email/API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-card">
        <p className="font-display text-2xl font-semibold text-navy">
          Thank you!
        </p>
        <p className="mt-2 text-ink/70">
          Your generous donation of ${amount} will help transform lives.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-white shadow-card ${
        compact ? "p-6" : "p-8 md:p-10"
      }`}
    >
      <h3 className="font-display text-2xl font-semibold text-navy">
        Ways to Give
      </h3>
      <p className="mt-2 text-sm text-ink/60">
        Choose an amount or enter a custom donation
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {donationAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => {
              setSelected(amt);
              setCustom("");
            }}
            className={`rounded-full py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
              selected === amt && !custom
                ? "bg-coral text-white"
                : "bg-sand text-navy hover:bg-sand-deep"
            }`}
          >
            ${amt}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label htmlFor="custom-amount" className="sr-only">
          Custom donation amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40">
            $
          </span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            placeholder="Custom amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full rounded-full border border-sand-deep bg-sand/50 py-3 pl-8 pr-4 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>
      </div>

      <Button
        onClick={handleDonate}
        disabled={amount <= 0}
        className="mt-6 w-full"
      >
        Donate ${amount > 0 ? amount : "—"} Now
      </Button>
    </div>
  );
}
