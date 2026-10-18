import { fetchVolunteers } from "@/lib/admin/data";
import { InboxManager } from "@/components/admin/InboxManager";

export const metadata = { title: "Volunteers" };

export default async function AdminVolunteersPage() {
  const { rows, error } = await fetchVolunteers();
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">Volunteer applications</h1>
      <p className="mb-6 mt-2 max-w-2xl text-sm text-ink/60">Applications from the Get Involved page.</p>
      {error && <p className="mb-4 rounded-xl border border-coral/40 bg-coral-soft px-4 py-3 text-sm">{error}</p>}
      <InboxManager
        endpoint="volunteers"
        statuses={["new", "reviewing", "accepted", "declined"]}
        emptyText="No applications here yet."
        items={rows.map((r) => ({
          id: r.id, title: r.name, subtitle: `Availability: ${r.availability}`, email: r.email,
          body: r.skills, bodyLabel: "Skills & experience", status: r.status, notes: r.notes, created_at: r.created_at,
        }))}
      />
    </div>
  );
}
