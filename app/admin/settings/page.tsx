import { ImportButton } from "@/components/admin/ImportButton";

export const metadata = { title: "Settings" };

const status = (name: string) => Boolean(process.env[name]);

export default function AdminSettingsPage() {
  const checks = [
    ["Database (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)", status("NEXT_PUBLIC_SUPABASE_URL") && status("SUPABASE_SERVICE_ROLE_KEY")],
    ["Admin login (ADMIN_PASSWORD + ADMIN_SESSION_SECRET)", status("ADMIN_PASSWORD") && status("ADMIN_SESSION_SECRET")],
    ["Email alerts (RESEND_API_KEY + NOTIFY_EMAIL)", status("RESEND_API_KEY") && status("NOTIFY_EMAIL")],
  ] as const;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Settings</h1>
        <p className="mt-2 text-sm text-ink/60">Environment variables are managed in your hosting dashboard (Vercel).</p>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-semibold text-navy">Connection status</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {checks.map(([label, ok]) => (
            <li key={label} className="flex items-start gap-2">
              <span className={ok ? "text-teal-text" : "text-coral-dark"} aria-hidden>{ok ? "●" : "○"}</span>
              <span>{label} — <b>{ok ? "configured" : "missing"}</b></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-semibold text-navy">Import existing content</h2>
        <p className="mb-5 mt-2 text-sm leading-relaxed text-ink/70">
          Do this <b>once</b>. It copies the news, stories, emergency case
          stories and documentaries already on the website into the database so you can edit them here.
          It only adds missing items — it never overwrites your edits. After the import, the database
          controls what the public site shows, so deleting an item here removes it from the website.
        </p>
        <ImportButton />
      </section>
    </div>
  );
}
