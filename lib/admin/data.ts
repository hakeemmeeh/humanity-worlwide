import { getSupabaseService, NOT_CONFIGURED } from "@/lib/supabase";

export type InquiryRow = {
  id: string; first_name: string; last_name: string; email: string; subject: string;
  message: string; status: string; notes: string | null; created_at: string;
};
export type VolunteerRow = {
  id: string; name: string; email: string; skills: string; availability: string;
  status: string; notes: string | null; created_at: string;
};

export async function fetchInquiries(limit = 200) {
  const sb = getSupabaseService();
  if (!sb) return { rows: [] as InquiryRow[], error: NOT_CONFIGURED };
  const { data, error } = await sb.from("inquiries").select("*").order("created_at", { ascending: false }).limit(limit);
  return { rows: (data ?? []) as InquiryRow[], error: error?.message ?? null };
}

export async function fetchVolunteers(limit = 200) {
  const sb = getSupabaseService();
  if (!sb) return { rows: [] as VolunteerRow[], error: NOT_CONFIGURED };
  const { data, error } = await sb.from("volunteers").select("*").order("created_at", { ascending: false }).limit(limit);
  return { rows: (data ?? []) as VolunteerRow[], error: error?.message ?? null };
}

export async function fetchDashboard() {
  const sb = getSupabaseService();
  if (!sb) return { error: NOT_CONFIGURED, counts: null, recent: [] as InquiryRow[] };
  const count = async (table: string, col?: string, val?: string) => {
    let q = sb.from(table).select("*", { count: "exact", head: true });
    if (col && val) q = q.eq(col, val);
    const { count: c } = await q;
    return c ?? 0;
  };
  const [newMsgs, totalMsgs, newVols, totalVols, drafts, articles, stories, cases, videos] = await Promise.all([
    count("inquiries", "status", "new"), count("inquiries"),
    count("volunteers", "status", "new"), count("volunteers"),
    Promise.all(["articles", "stories", "campaigns", "videos"].map((t) => count(t, "status", "draft"))).then((a) => a.reduce((x, y) => x + y, 0)),
    count("articles"), count("stories"), count("campaigns"), count("videos"),
  ]);
  const { data } = await sb.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5);
  return {
    error: null,
    counts: { newMsgs, totalMsgs, newVols, totalVols, drafts, content: articles + stories + cases + videos },
    recent: (data ?? []) as InquiryRow[],
  };
}
