"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";

/**
 * Step 2 of the donation widgets. Online payment isn't connected yet, so we
 * record a pledge instead: it goes to the admin Messages inbox via /api/contact,
 * and the donor is told plainly that no payment has been taken.
 */
const input =
  "w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30";

export function PledgeDetails({
  amount,
  purpose,
  onBack,
}: {
  amount: number;
  purpose: string; // e.g. "general support" or "emergency response in South Sudan"
  onBack: () => void;
}) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    const note = String(f.get("note") ?? "").trim();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: f.get("firstName"),
          lastName: f.get("lastName"),
          email: f.get("email"),
          website: f.get("website"),
          subject: `Donation pledge: $${amount} – ${purpose}`,
          message:
            `Donation pledge from the website.\nAmount: $${amount}\nFor: ${purpose}\n` +
            `No payment has been taken. Please contact the donor with how to give.` +
            (note ? `\n\nDonor's note: ${note}` : ""),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl bg-teal-soft p-6 text-center">
        <p className="font-display text-2xl font-semibold text-navy">Thank you for your pledge</p>
        <p className="mt-2 text-sm text-ink/70">
          We&rsquo;ve received your pledge of ${amount} for {purpose}.{" "}
          <strong>No payment has been taken.</strong> Our team will email you within 2 working
          days with how to complete your gift.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display text-2xl font-semibold text-navy">Your details</h3>
      <div className="rounded-xl bg-sand/60 px-4 py-3 text-sm text-ink/80">
        <p>
          You&rsquo;re pledging <strong className="text-navy">${amount}</strong> for {purpose}.
        </p>
        <p className="mt-1 text-ink/60">
          Online payment isn&rsquo;t available yet. Leave your details and our team will contact you
          with how to give.
        </p>
      </div>

      {/* Honeypot: hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pledge-first" className="mb-1.5 block text-sm font-medium text-navy">First name</label>
          <input id="pledge-first" name="firstName" required autoComplete="given-name" className={input} />
        </div>
        <div>
          <label htmlFor="pledge-last" className="mb-1.5 block text-sm font-medium text-navy">Last name</label>
          <input id="pledge-last" name="lastName" required autoComplete="family-name" className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="pledge-email" className="mb-1.5 block text-sm font-medium text-navy">Email</label>
        <input id="pledge-email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="pledge-note" className="mb-1.5 block text-sm font-medium text-navy">
          Note <span className="font-normal text-ink/50">(optional)</span>
        </label>
        <textarea id="pledge-note" name="note" rows={2} maxLength={1000} className={`${input} resize-none`} />
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button variant="ghost-dark" onClick={onBack} className="sm:w-auto">Back</Button>
        <Button type="submit" disabled={sending} className="flex-1 bg-amber-500 text-white hover:bg-amber-600">
          {sending ? "Sending…" : `Send my $${amount} pledge`}
        </Button>
      </div>
    </form>
  );
}
