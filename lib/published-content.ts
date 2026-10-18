import { getSupabasePublicReader } from "@/lib/supabase";
import {
  articles as fallbackArticles,
  stories as fallbackStories,
  campaigns as fallbackCampaigns,
  videos as fallbackVideos,
} from "@/data/content";
import { PROGRAMS } from "@/lib/admin/content-config";
import type { Article, Story, Campaign, Video } from "@/types";

/**
 * Public content readers.
 *
 * Before the one-time import (Admin → Settings) the site MERGES database rows
 * with the built-in content in data/content.ts (database wins on slug; a draft
 * or deleted slug stays hidden). After the import the database is the single
 * source of truth. Any database error falls back to the built-in content, so
 * public pages never go blank.
 */

type Row = Record<string, unknown> & { slug: string; status: string };

async function loadRows(
  table: string,
  order: { column: string; ascending: boolean }[]
): Promise<{ rows: Row[]; imported: boolean } | null> {
  const sb = getSupabasePublicReader();
  if (!sb) return null;
  try {
    let q = sb.from(table).select("*");
    for (const o of order) q = q.order(o.column, { ascending: o.ascending });
    const [data, flag] = await Promise.all([
      q,
      sb.from("site_settings").select("value").eq("key", "cms_imported").maybeSingle(),
    ]);
    if (data.error) return null;
    return { rows: (data.data ?? []) as Row[], imported: flag.data?.value === true };
  } catch {
    return null;
  }
}

async function resolve<T extends { slug: string }>(
  table: string,
  order: { column: string; ascending: boolean }[],
  map: (r: Row) => T,
  fallback: T[]
): Promise<T[]> {
  const res = await loadRows(table, order);
  if (!res) return fallback;
  const published = res.rows.filter((r) => r.status === "published").map(map);
  if (res.imported) return published;
  const known = new Set(res.rows.map((r) => r.slug)); // any status: drafts stay hidden
  return [...published, ...fallback.filter((f) => !known.has(f.slug))];
}

const s = (v: unknown) => (typeof v === "string" ? v : "");
const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
const opt = (v: unknown) => (typeof v === "string" && v ? v : undefined);

const BY_ORDER = [
  { column: "sort_order", ascending: true },
  { column: "created_at", ascending: false },
];

// ---------------- News ----------------
export async function getArticles(): Promise<Article[]> {
  const list = await resolve<Article>(
    "articles",
    [{ column: "date", ascending: false }],
    (r) => ({
      slug: r.slug, title: s(r.title), excerpt: s(r.excerpt), author: s(r.author),
      date: s(r.date), image: s(r.image), category: opt(r.category), body: arr(r.body),
    }),
    fallbackArticles
  );
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}
export async function getArticle(slug: string) {
  return (await getArticles()).find((a) => a.slug === slug);
}

// ---------------- Stories ----------------
export async function getStories(): Promise<Story[]> {
  return resolve<Story>(
    "stories",
    BY_ORDER,
    (r) => {
      const programSlug = opt(r.program_slug);
      return {
        slug: r.slug, title: s(r.title), quote: s(r.quote), name: s(r.name), role: s(r.role),
        image: s(r.image), body: arr(r.body), programSlug,
        program: opt(r.program) ?? PROGRAMS.find((p) => p.value === programSlug)?.label,
      };
    },
    fallbackStories
  );
}
export async function getStory(slug: string) {
  return (await getStories()).find((x) => x.slug === slug);
}

// ---------------- Emergency case stories ----------------
export async function getCampaigns(): Promise<Campaign[]> {
  return resolve<Campaign>(
    "campaigns",
    BY_ORDER,
    (r) => ({
      slug: r.slug, title: s(r.title), description: s(r.description), image: s(r.image),
      location: s(r.location), country: opt(r.country),
      crisisType: opt(r.crisis_type) as Campaign["crisisType"],
      familiesReached: typeof r.families_reached === "number" ? r.families_reached : undefined,
      body: arr(r.body), needs: arr(r.needs),
    }),
    fallbackCampaigns
  );
}
export async function getCampaign(slug: string) {
  return (await getCampaigns()).find((c) => c.slug === slug);
}

// ---------------- Field documentaries ----------------
export async function getVideos(): Promise<Video[]> {
  return resolve<Video>(
    "videos",
    BY_ORDER,
    (r) => ({
      slug: r.slug, title: s(r.title), category: s(r.category), location: s(r.location),
      description: s(r.description), image: s(r.image), youtubeId: opt(r.youtube_id),
      featured: r.featured === true,
    }),
    fallbackVideos
  );
}
