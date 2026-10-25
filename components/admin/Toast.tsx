"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

type Toast = { text: string; kind: "ok" | "error" } | null;

/** Small "Saved" style confirmation shown bottom-right for a few seconds. */
export function useToast(): [React.ReactNode, (text: string, kind?: "ok" | "error") => void] {
  const [toast, setToast] = useState<Toast>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((text: string, kind: "ok" | "error" = "ok") => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ text, kind });
    timer.current = setTimeout(() => setToast(null), kind === "ok" ? 3500 : 6000);
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const node = (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end">
      {toast && (
        <div className={`pointer-events-auto flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-card-hover ${toast.kind === "ok" ? "bg-navy" : "bg-red-600"}`}>
          {toast.kind === "ok" ? <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-soft" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          {toast.text}
        </div>
      )}
    </div>
  );
  return [node, show];
}

/** Warn before closing the tab or reloading while there are unsaved changes. */
export function useLeaveWarning(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [active]);
}
