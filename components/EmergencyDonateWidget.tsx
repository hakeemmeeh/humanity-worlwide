"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import {
  donationAmounts,
  emergencyDonateCountries,
} from "@/data/content";
import { PledgeDetails } from "@/components/PledgeDetails";

type EmergencyDonateCountrySlug =
  (typeof emergencyDonateCountries)[number]["slug"];

export function EmergencyDonateWidget() {
  const [country, setCountry] = useState<EmergencyDonateCountrySlug>(
    emergencyDonateCountries[0].slug
  );
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const amount = custom ? parseInt(custom, 10) || 0 : selected;
  const countryName =
    emergencyDonateCountries.find((c) => c.slug === country)?.name ?? country;

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-card sm:p-8 md:p-10">
        <PledgeDetails amount={amount} purpose={`emergency response in ${countryName}`} onBack={() => setSubmitted(false)} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-8 md:p-10">
      <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">
        Donate to our emergency response
      </h3>
      <p className="mt-2 text-sm text-ink/70">
        Select a country, then choose an amount. Your gift supports rapid
        humanitarian action — not a single appeal.
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-navy">Country</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {emergencyDonateCountries.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCountry(c.slug)}
              className={`min-h-11 rounded-full py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                country === c.slug
                  ? "border border-navy bg-navy text-white"
                  : "border border-sand-deep bg-sand/50 text-navy hover:border-navy"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {donationAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => {
              setSelected(amt);
              setCustom("");
            }}
            className={`min-h-11 rounded-full py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
              selected === amt && !custom
                ? "border border-teal-deep bg-teal-deep text-white"
                : "border border-sand-deep bg-white text-navy hover:border-teal hover:text-teal"
            }`}
          >
            ${amt}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label htmlFor="emergency-custom-amount" className="sr-only">
          Custom donation amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/70">
            $
          </span>
          <input
            id="emergency-custom-amount"
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
        onClick={() => setSubmitted(true)}
        disabled={amount <= 0}
        className="mt-6 w-full bg-amber-500 px-4 text-sm leading-snug text-white hover:bg-amber-600 sm:text-base"
      >
        <span className="sm:hidden">Pledge ${amount > 0 ? amount : "—"}</span>
        <span className="hidden sm:inline">
          Pledge ${amount > 0 ? amount : "—"} for {countryName}
        </span>
      </Button>
      <p className="mt-3 text-center text-xs text-ink/70">
        Online payment is coming soon. Pledge now and our team will contact you with how to give.
      </p>
    </div>
  );
}
