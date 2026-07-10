"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to email/API
    setSubmitted(true);
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
      <Button type="submit">Submit Application</Button>
    </form>
  );
}
