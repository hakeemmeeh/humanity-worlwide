// Email notification via Resend's REST API (no SDK needed). Best-effort:
// a failed email must never fail the form submission — the row is already saved.
function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function notifyStaff(opts: {
  subject: string;
  replyTo?: string;
  fields: Record<string, string>;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;

  const rows = Object.entries(opts.fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#555;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:6px 12px;white-space:pre-wrap">${esc(v)}</td></tr>`
    )
    .join("");

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || "HWW Website <onboarding@resend.dev>",
        to: [to],
        reply_to: opts.replyTo,
        subject: opts.subject,
        html: `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table><p style="font-family:Arial;font-size:12px;color:#888">Manage in the admin: /admin</p>`,
      }),
    });
  } catch (e) {
    console.error("Notify email failed:", e);
  }
}
