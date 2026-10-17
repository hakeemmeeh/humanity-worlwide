import { fetchInquiries } from "@/lib/admin/data";
import { InboxManager } from "@/components/admin/InboxManager";

export const metadata = { title: "Messages" };

export default async function AdminInquiriesPage() {
  const { rows, error } = await fetchInquiries();
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">Messages</h1>
      <p className="mb-6 mt-2 max-w-2xl text-sm text-ink/60">Submissions from the Contact page. Open one to read it, set its status and add internal notes.</p>
      {error && <p className="mb-4 rounded-xl border border-coral/40 bg-coral-soft px-4 py-3 text-sm">{error}</p>}
      <InboxManager
        endpoint="inquiries"
        statuses={["new", "contacted", "closed"]}
        emptyText="No messages here yet."
        items={rows.map((r) => ({
          id: r.id, title: `${r.first_name} ${r.last_name}`, subtitle: r.subject, email: r.email,
          body: r.message, bodyLabel: "Message", status: r.status, notes: r.notes, created_at: r.created_at,
        }))}
      />
    </div>
  );
}
