"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

export function ImageUploadField({
  value, onChange, label, required,
}: { value: string; onChange: (url: string) => void; label: string; required?: boolean }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true); setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/media", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setError(data.error || "Upload failed.");
      else onChange(data.url);
    } catch { setError("Upload failed."); }
    finally { setUploading(false); }
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-navy">
        {label}{required && <span className="text-coral-dark"> *</span>}
      </span>
      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-32 w-48 rounded-xl border border-sand-deep object-cover" />
          <button type="button" onClick={() => onChange("")} aria-label="Remove image"
            className="absolute -right-2 -top-2 rounded-full bg-navy p-1 text-white shadow">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="flex h-32 w-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand-deep bg-sand/40 text-ink/50 transition hover:border-teal hover:text-teal-text disabled:opacity-50">
          <Upload className="h-5 w-5" />
          <span className="text-xs">{uploading ? "Uploading…" : "Upload image (max 8 MB)"}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="…or paste an image link (https://… or /images/…)"
        aria-label={`${label} link`}
        className="mt-2 w-full rounded-xl border border-sand-deep bg-white px-3 py-2 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/30" />
      {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
