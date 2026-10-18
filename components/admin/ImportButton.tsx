"use client";

import { useState } from "react";

export function ImportButton() {
  const [state, setState] = useState<{ busy: boolean; msg: string | null; ok: boolean }>({ busy: false, msg: null, ok: true });

  async function run() {
    if (!confirm("Copy the built-in site content into the database? Existing database items are never overwritten.")) return;
    setState({ busy: true, msg: null, ok: true });
    try {
      const res = await fetch("/api/admin/import", { method: "POST" });
      const data = await res.json();
      if (!res.ok) setState({ busy: false, ok: false, msg: data.error || JSON.stringify(data.added) || "Import failed." });
      else {
        const a = data.added as Record<string, number>;
        setState({ busy: false, ok: true, msg: `Done. Added ${a.articles} news, ${a.stories} stories, ${a.campaigns} emergency stories, ${a.videos} documentaries.` });
      }
    } catch { setState({ busy: false, ok: false, msg: "Import failed." }); }
  }

  return (
    <div>
      <button onClick={run} disabled={state.busy}
        className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-soft disabled:opacity-50">
        {state.busy ? "Importing…" : "Import existing site content"}
      </button>
      {state.msg && (
        <p role="status" className={`mt-3 text-sm ${state.ok ? "text-teal-text" : "text-red-700"}`}>{state.msg}</p>
      )}
    </div>
  );
}
