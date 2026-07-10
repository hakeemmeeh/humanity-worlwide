"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function ContactForm() {
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
          Message sent!
        </p>
        <p className="mt-2 text-ink/70">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className="mb-1.5 block text-sm font-medium text-navy">
            First Name
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            required
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="mb-1.5 block text-sm font-medium text-navy">
            Last Name
          </label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            required
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-navy">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>
      <Button type="submit">Send Message</Button>
    </form>
  );
}
