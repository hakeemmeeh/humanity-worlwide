import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSupabaseService, NOT_CONFIGURED } from "@/lib/supabase";
import { articles, stories, campaigns, videos } from "@/data/content";

export const runtime = "nodejs";

// POST /api/admin/import — copies the built-in site content into the database.
// INSERT-ONLY (ignoreDuplicates): never overwrites anything staff already edited.
export async function POST() {
  const sb = getSupabaseService();
  if (!sb) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 });

  const tasks: [string, Record<string, unknown>[]][] = [
    ["articles", articles.map((a) => ({
      slug: a.slug, title: a.title, excerpt: a.excerpt, author: a.author, date: a.date,
      image: a.image, category: a.category ?? null, body: a.body ?? [], status: "published",
    }))],
    ["stories", stories.map((x, i) => ({
      slug: x.slug, title: x.title, quote: x.quote, name: x.name, role: x.role, image: x.image,
      program: x.program ?? null, program_slug: x.programSlug ?? null, body: x.body ?? [],
      sort_order: i, status: "published",
    }))],
    ["campaigns", campaigns.map((c, i) => ({
      slug: c.slug, title: c.title, description: c.description, image: c.image, location: c.location,
      country: c.country ?? null, crisis_type: c.crisisType ?? null,
      families_reached: c.familiesReached ?? null, body: c.body ?? [], needs: c.needs ?? [],
      sort_order: i, status: "published",
    }))],
    ["videos", videos.map((v, i) => ({
      slug: v.slug, title: v.title, category: v.category, location: v.location,
      description: v.description, image: v.image, youtube_id: v.youtubeId ?? null,
      featured: v.featured ?? false, sort_order: i, status: "published",
    }))],
  ];

  const result: Record<string, number | string> = {};
  let failed = false;
  for (const [table, rows] of tasks) {
    const { data, error } = await sb
      .from(table)
      .upsert(rows, { onConflict: "slug", ignoreDuplicates: true })
      .select("slug");
    if (error) { result[table] = error.message; failed = true; }
    else result[table] = data?.length ?? 0; // newly added rows
  }

  if (!failed) {
    // From now on the database is the single source of truth for public content.
    const { error } = await sb.from("site_settings").upsert({ key: "cms_imported", value: true });
    if (error) { result.flag = error.message; failed = true; }
  }

  revalidateTag("content");
  revalidatePath("/", "layout");
  return NextResponse.json({ success: !failed, added: result }, { status: failed ? 500 : 200 });
}
