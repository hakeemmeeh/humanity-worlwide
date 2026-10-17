"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-teal-soft p-8 text-center">
        <p className="font-display text-xl font-semibold text-navy">
          Application received!
        </p>
        <p className="mt-2 text-ink/70">
          Thank you for your interest in volunteering with HWW.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* honeypot — hidden from people, filled by bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-name" className="mb-1.5 block text-sm font-medium text-navy">
            Full Name
          </label>
          <input
            id="vol-name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>
        <div>
          <label htmlFor="vol-email" className="mb-1.5 block text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="vol-email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>
      </div>
      <div>
        <label htmlFor="vol-skills" className="mb-1.5 block text-sm font-medium text-navy">
          Skills & Experience
        </label>
        <textarea
          id="vol-skills"
          name="skills"
          rows={4}
          required
          placeholder="Tell us about your relevant skills and experience..."
          className="w-full resize-none rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>
      <div>
        <label htmlFor="vol-availability" className="mb-1.5 block text-sm font-medium text-navy">
          Availability
        </label>
        <select
          id="vol-availability"
          name="availability"
          required
          className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        >
          <option value="">Select availability</option>
          <option value="remote">Remote</option>
          <option value="local">Local (Kansas City)</option>
          <option value="international">International</option>
        </select>
      </div>
      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" disabled={sending}>
        {sending ? "Sending…" : "Submit Application"}
      </Button>
    </form>
  );
}
