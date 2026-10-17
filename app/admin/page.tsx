import Link from "next/link";
import { MessageSquare, HeartHandshake, FileText, PencilLine } from "lucide-react";
import { fetchDashboard } from "@/lib/admin/data";

export const metadata = { title: "Dashboard" };

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

export default async function AdminDashboardPage() {
  const { counts, recent, error } = await fetchDashboard();
  const cards = counts && [
    { label: "New messages", value: counts.newMsgs, hint: `${counts.totalMsgs} total`, icon: MessageSquare, href: "/admin/inquiries" },
    { label: "New volunteer applications", value: counts.newVols, hint: `${counts.totalVols} total`, icon: HeartHandshake, href: "/admin/volunteers" },
    { label: "Published & draft items", value: counts.content, hint: "news, stories, emergency, films", icon: FileText, href: "/admin/content/news" },
    { label: "Drafts waiting", value: counts.drafts, hint: "hidden from the public site", icon: PencilLine, href: "/admin/content/news" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-semibold text-navy">Overview</h1>
      {error && <p className="rounded-xl border border-coral/40 bg-coral-soft px-4 py-3 text-sm">{error}</p>}

      {cards && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.label} href={c.href} className="rounded-2xl bg-white p-6 shadow-card transition hover:shadow-card-hover">
                <Icon className="h-6 w-6 text-teal-text" aria-hidden />
                <p className="mt-4 text-sm text-ink/60">{c.label}</p>
                <p className="font-display text-3xl font-semibold text-navy">{c.value}</p>
                <p className="mt-1 text-xs text-ink/50">{c.hint}</p>
              </Link>
            );
          })}
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-navy">Latest messages</h2>
          <Link href="/admin/inquiries" className="text-sm font-semibold text-teal-text hover:underline">View all →</Link>
        </div>
        <div className="mt-4 divide-y divide-sand-deep">
          {recent.length === 0 ? (
            <p className="py-4 text-sm text-ink/60">No messages yet. Submit the contact form on the live site to test.</p>
          ) : recent.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{r.first_name} {r.last_name} — {r.subject}</p>
                <p className="text-xs text-ink/50">{when(r.created_at)}</p>
              </div>
              <span className="rounded-full bg-teal-soft px-2.5 py-0.5 text-xs font-semibold capitalize text-teal-text">{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
