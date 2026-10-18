"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

export function LoginForm() {
  const params = useSearchParams();
  const raw = params.get("from") || "/admin";
  // only allow same-site admin paths as redirect targets
  const from = raw.startsWith("/admin") && !raw.startsWith("//") ? raw : "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      window.location.assign(from); // full load so the new cookie is used everywhere
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card-hover">
        <div className="mb-6 flex justify-center">
          <Image src="/logo-full.png" alt="Humanity Worldwide" width={220} height={68} className="h-14 w-auto" priority />
        </div>
        <h1 className="text-center font-display text-2xl font-semibold text-navy">Admin sign in</h1>
        <p className="mt-1 text-center text-sm text-ink/60">Enter the admin password to continue.</p>

        <div className="relative mt-6">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            autoComplete="current-password"
            required
            aria-label="Password"
            className="w-full rounded-xl border border-sand-deep bg-sand/40 py-3 pl-9 pr-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/30"
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 w-full rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
