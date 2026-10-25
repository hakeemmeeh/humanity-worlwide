"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast, useLeaveWarning } from "@/components/admin/Toast";

export type InboxItem = {
  id: string;
  title: string;          // main line (name)
  subtitle: string;       // second line (subject / availability)
  email: string;
  body: string;           // message / skills
  bodyLabel: string;
  status: string;
  notes: string | null;
  created_at: string;
};

const pill: Record<string, string> = {
  new: "bg-coral-soft text-coral-dark",
  contacted: "bg-teal-soft text-teal-text",
  reviewing: "bg-teal-soft text-teal-text",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-sand-deep text-ink/60",
  closed: "bg-sand-deep text-ink/60",
};

export function InboxManager({
  endpoint, statuses, items, emptyText,
}: { endpoint: "inquiries" | "volunteers"; statuses: string[]; items: InboxItem[]; emptyText: string }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, showToast] = useToast();
  const unsavedNotes = Object.entries(notes).some(([id, v]) => v !== (items.find((x) => x.id === id)?.notes ?? ""));
  useLeaveWarning(unsavedNotes);

  async function patch(id: string, body: Record<string, string>, done: string) {
    setBusy(id); setError(null);
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (!res.ok) setError((await res.json().catch(() => ({}))).error || "Update failed.");
      else {
        if ("notes" in body) setNotes((n) => { const c = { ...n }; delete c[id]; return c; });
        showToast(done);
        router.refresh();
      }
    } catch { setError("Update failed."); }
    finally { setBusy(null); }
  }

  const shown = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
        {["all", ...statuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)} role="tab" aria-selected={filter === s}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize ${filter === s ? "bg-navy text-white" : "bg-white text-navy shadow-card"}`}>
            {s} {s === "all" ? `(${items.length})` : `(${items.filter((i) => i.status === s).length})`}
          </button>
        ))}
      </div>
      {error && <p role="alert" className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        {shown.length === 0 ? (
          <p className="p-10 text-center text-sm text-ink/50">{emptyText}</p>
        ) : (
          <ul className="divide-y divide-sand-deep">
            {shown.map((i) => {
              const open = openId === i.id;
              return (
                <li key={i.id}>
                  <button onClick={() => setOpenId(open ? null : i.id)} aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-sand/40">
                    <div className="min-w-0">
                      <p className={`truncate text-sm ${i.status === "new" ? "font-semibold" : "font-medium"} text-navy`}>{i.title}</p>
                      <p className="truncate text-xs text-ink/60">{i.subtitle}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-xs text-ink/50 sm:block">
                        {new Date(i.created_at).toLocaleDateString("en-GB", { dateStyle: "medium" })}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${pill[i.status] ?? ""}`}>{i.status}</span>
                    </div>
                  </button>
                  {open && (
                    <div className="space-y-4 border-t border-sand-deep bg-sand/30 px-5 py-5">
                      <p className="text-sm">
                        <a href={`mailto:${i.email}`} className="font-medium text-teal-text hover:underline">{i.email}</a>
                        <span className="ml-3 text-xs text-ink/50">
                          {new Date(i.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                        </span>
                      </p>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{i.bodyLabel}</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{i.body}</p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                        <label className="text-sm">
                          <span className="mb-1 block font-medium text-navy">Status</span>
                          <select value={i.status} disabled={busy === i.id}
                            onChange={(e) => patch(i.id, { status: e.target.value }, `Status changed to “${e.target.value}”`)}
                            className="w-full rounded-xl border border-sand-deep bg-white px-3 py-2 text-sm capitalize">
                            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </label>
                        <label className="text-sm">
                          <span className="mb-1 block font-medium text-navy">Internal notes</span>
                          <textarea rows={3} value={notes[i.id] ?? i.notes ?? ""}
                            onChange={(e) => setNotes({ ...notes, [i.id]: e.target.value })}
                            className="w-full rounded-xl border border-sand-deep bg-white px-3 py-2 text-sm" />
                          <button disabled={busy === i.id || notes[i.id] === undefined}
                            onClick={() => patch(i.id, { notes: notes[i.id] ?? "" }, "Notes saved")}
                            className="mt-2 rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-40">
                            {busy === i.id ? "Saving…" : "Save notes"}
                          </button>
                        </label>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {toast}
    </div>
  );
}
