"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, Pencil, ExternalLink, ImageIcon } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { CONTENT_TYPES, slugify, type FieldDef } from "@/lib/admin/content-config";

type Row = Record<string, unknown> & { id?: string; status?: string };

const input =
  "w-full rounded-xl border border-sand-deep bg-white px-3 py-2 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/30";

function blank(fields: FieldDef[]): Row {
  const r: Row = { status: "published" };
  for (const f of fields) {
    r[f.key] = f.type === "checkbox" ? false : f.type === "number" ? "" : f.type === "date" ? new Date().toISOString().slice(0, 10) : "";
  }
  return r;
}

export function ContentManager({ type }: { type: string }) {
  const cfg = CONTENT_TYPES[type];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/content/${type}`);
      const data = await res.json();
      setRows(data.rows ?? []);
      setError(data.error ?? null);
    } catch { setError("Could not load content."); }
    finally { setLoading(false); }
  }, [type]);

  useEffect(() => { load(); }, [load]);

  function startEdit(row: Row) {
    const e: Row = { ...row };
    for (const f of cfg.fields) if (f.type === "lines" && Array.isArray(e[f.key])) e[f.key] = (e[f.key] as string[]).join("\n");
    for (const f of cfg.fields) if (e[f.key] === null || e[f.key] === undefined) e[f.key] = f.type === "checkbox" ? false : "";
    setSlugTouched(true);
    setEditing(e);
  }

  async function save() {
    if (!editing) return;
    setSaving(true); setError(null);
    const isNew = !editing.id;
    const payload: Row = {};
    for (const f of cfg.fields) {
      // slug is locked after creation so public links never break
      if (!isNew && f.type === "slug") continue;
      payload[f.key] = editing[f.key];
    }
    payload.status = editing.status;
    try {
      const res = await fetch(isNew ? `/api/content/${type}` : `/api/content/${type}?id=${editing.id}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setError(data.error || "Save failed.");
      else { setEditing(null); await load(); }
    } catch { setError("Save failed."); }
    finally { setSaving(false); }
  }

  async function remove(row: Row) {
    if (!confirm(`Delete “${String(row[cfg.titleKey])}”? This cannot be undone.`)) return;
    const res = await fetch(`/api/content/${type}?id=${row.id}`, { method: "DELETE" });
    if (!res.ok) setError((await res.json().catch(() => ({}))).error || "Delete failed.");
    await load();
  }

  async function toggleStatus(row: Row) {
    const next = row.status === "draft" ? "published" : "draft";
    const res = await fetch(`/api/content/${type}?id=${row.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }),
    });
    if (!res.ok) setError((await res.json().catch(() => ({}))).error || "Update failed.");
    await load();
  }

  function setField(key: string, value: unknown) {
    setEditing((cur) => {
      if (!cur) return cur;
      const next = { ...cur, [key]: value };
      const slugField = cfg.fields.find((f) => f.type === "slug");
      if (key === cfg.titleKey && slugField && !cur.id && !slugTouched) next[slugField.key] = slugify(String(value));
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-navy">{cfg.title}</h1>
        <button onClick={() => { setSlugTouched(false); setEditing(blank(cfg.fields)); }}
          className="flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-soft">
          <Plus className="h-4 w-4" /> Add {cfg.singular}
        </button>
      </div>

      {error && !editing && <p role="alert" className="mt-4 rounded-xl border border-coral/40 bg-coral-soft px-4 py-3 text-sm">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-card">
        {loading ? (
          <p className="p-10 text-center text-sm text-ink/50">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-ink/60">
            <p>Nothing here yet.</p>
            <p className="mt-1">Click “Add {cfg.singular}”, or import the existing site content from <a className="font-semibold text-teal-text hover:underline" href="/admin/settings">Settings</a>.</p>
          </div>
        ) : (
          <ul className="divide-y divide-sand-deep">
            {rows.map((r) => (
              <li key={String(r.id)} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  {cfg.imageKey && r[cfg.imageKey] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={String(r[cfg.imageKey])} alt="" loading="lazy"
                      className="h-12 w-16 shrink-0 rounded-lg border border-sand-deep bg-sand object-cover" />
                  ) : (
                    <span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-sand-deep text-ink/30" aria-hidden>
                      <ImageIcon className="h-4 w-4" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-navy sm:truncate">{String(r[cfg.titleKey])}</p>
                    <p className="truncate text-xs text-ink/50">
                      {cfg.subtitleKey ? String(r[cfg.subtitleKey] ?? "") : ""}
                      <span className="ml-2 text-ink/40">/{String(r.slug)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 pl-[76px] sm:pl-0">
                  <button onClick={() => toggleStatus(r)} title="Click to switch between Published and Draft"
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${r.status === "draft" ? "bg-sand-deep text-ink/70" : "bg-teal-soft text-teal-text"}`}>
                    {r.status === "draft" ? "Draft" : "Published"}
                  </button>
                  {r.status !== "draft" && (
                    <a href={cfg.viewPath.replace("{slug}", encodeURIComponent(String(r.slug)))} target="_blank" rel="noopener noreferrer"
                      title="View on the website" aria-label={`View ${String(r[cfg.titleKey])} on the website`}
                      className="rounded-lg border border-sand-deep p-2 text-teal-text hover:bg-sand"><ExternalLink className="h-4 w-4" /></a>
                  )}
                  <button onClick={() => startEdit(r)} aria-label={`Edit ${String(r[cfg.titleKey])}`} className="rounded-lg border border-sand-deep p-2 text-navy hover:bg-sand"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(r)} aria-label={`Delete ${String(r[cfg.titleKey])}`} className="rounded-lg border border-sand-deep p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <div role="dialog" aria-modal="true" aria-label={`${editing.id ? "Edit" : "New"} ${cfg.singular}`}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-card-hover">
            <h2 className="font-display text-xl font-semibold text-navy">{editing.id ? "Edit" : "New"} {cfg.singular}</h2>

            <div className="mt-5 space-y-4">
              {cfg.fields.map((f) => {
                const val = editing[f.key];
                const label = (
                  <span className="mb-1 block text-sm font-medium text-navy">
                    {f.label}{f.required && <span className="text-coral-dark"> *</span>}
                  </span>
                );
                if (f.type === "image")
                  return <ImageUploadField key={f.key} label={f.label} required={f.required} value={String(val ?? "")} onChange={(u) => setField(f.key, u)} />;
                if (f.type === "checkbox")
                  return (
                    <label key={f.key} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={Boolean(val)} onChange={(e) => setField(f.key, e.target.checked)} /> {f.label}
                    </label>
                  );
                return (
                  <label key={f.key} className="block">
                    {label}
                    {f.type === "select" ? (
                      <select value={String(val ?? "")} onChange={(e) => setField(f.key, e.target.value)} className={input}>
                        <option value="">Select…</option>
                        {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    ) : f.type === "textarea" || f.type === "lines" ? (
                      <textarea rows={f.type === "lines" ? 8 : 3} value={String(val ?? "")} onChange={(e) => setField(f.key, e.target.value)} className={input} />
                    ) : (
                      <input
                        type={f.type === "date" ? "date" : f.type === "number" ? "number" : "text"}
                        min={f.type === "number" ? 0 : undefined}
                        value={String(val ?? "")}
                        disabled={f.type === "slug" && Boolean(editing.id)}
                        onChange={(e) => {
                          if (f.type === "slug") setSlugTouched(true);
                          setField(f.key, f.type === "slug" ? slugify(e.target.value) : e.target.value);
                        }}
                        className={`${input} disabled:bg-sand/60 disabled:text-ink/50`}
                      />
                    )}
                    {f.help && <span className="mt-1 block text-xs text-ink/50">{f.help}</span>}
                  </label>
                );
              })}

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-navy">Visibility</span>
                <select value={String(editing.status ?? "published")} onChange={(e) => setField("status", e.target.value)} className={input}>
                  <option value="published">Published — visible on the website</option>
                  <option value="draft">Draft — hidden from the website</option>
                </select>
              </label>
            </div>

            {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setEditing(null); setError(null); }} className="rounded-full border border-sand-deep px-5 py-2 text-sm font-medium text-ink/70 hover:bg-sand">Cancel</button>
              <button onClick={save} disabled={saving} className="rounded-full bg-teal px-6 py-2 text-sm font-semibold text-white hover:bg-teal-text disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
