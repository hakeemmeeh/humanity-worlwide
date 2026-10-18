/**
 * Single source of truth for every editable content type.
 * Used by the admin UI (to render forms) AND the content API (as the
 * allow-list that decides which columns may be written and how they're coerced).
 */
export type FieldType =
  | "text" | "textarea" | "lines" | "image" | "select" | "date" | "number" | "checkbox" | "slug";

export type FieldDef = {
  key: string;            // DB column
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: { value: string; label: string }[];
};

export type ContentTypeConfig = {
  table: string;
  title: string;          // page heading
  singular: string;
  titleKey: string;       // which column shows as the row title in lists
  subtitleKey?: string;
  orderBy: { column: string; ascending: boolean }[];
  publicPaths: string[];  // revalidated after a write
  fields: FieldDef[];
};

const opt = (...v: string[]) => v.map((x) => ({ value: x, label: x }));
export const PROGRAMS = [
  { value: "education", label: "Education" },
  { value: "wash", label: "WASH" },
  { value: "livelihoods", label: "Livelihoods" },
  { value: "protection", label: "Protection" },
  { value: "shelter", label: "Shelter" },
  { value: "food-security", label: "Food Security" },
  { value: "health", label: "Health" },
];

export const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  news: {
    table: "articles",
    title: "News",
    singular: "article",
    titleKey: "title",
    subtitleKey: "date",
    orderBy: [{ column: "date", ascending: false }],
    publicPaths: ["/", "/news"],
    fields: [
      { key: "title", label: "Headline", type: "text", required: true },
      { key: "slug", label: "Web address (slug)", type: "slug", required: true, help: "Lowercase words joined by dashes. Generated from the headline; it can't be changed once published." },
      { key: "date", label: "Publish date", type: "date", required: true },
      { key: "category", label: "Category", type: "select", options: opt("Education", "WASH", "Livelihoods", "Protection", "Shelter", "Emergency", "Announcement") },
      { key: "author", label: "Author", type: "text" },
      { key: "image", label: "Cover image", type: "image", required: true },
      { key: "excerpt", label: "Short summary", type: "textarea", required: true, help: "Shown on cards and in search results." },
      { key: "body", label: "Article text", type: "lines", help: "One paragraph per line (press Enter between paragraphs)." },
    ],
  },
  stories: {
    table: "stories",
    title: "Success Stories",
    singular: "story",
    titleKey: "title",
    subtitleKey: "name",
    orderBy: [{ column: "sort_order", ascending: true }, { column: "created_at", ascending: false }],
    publicPaths: ["/", "/about", "/stories"],
    fields: [
      { key: "title", label: "Story title", type: "text", required: true },
      { key: "slug", label: "Web address (slug)", type: "slug", required: true },
      { key: "name", label: "Person's name", type: "text", required: true, help: "Only publish names and quotes with the person's consent." },
      { key: "role", label: "Role · place", type: "text", required: true, help: "e.g. Mother of three · Kapoeta South, South Sudan" },
      { key: "quote", label: "Pull quote", type: "textarea", required: true },
      { key: "program_slug", label: "Programme", type: "select", options: PROGRAMS },
      { key: "image", label: "Photo", type: "image", required: true },
      { key: "body", label: "Story text", type: "lines", help: "One paragraph per line." },
      { key: "sort_order", label: "Display order", type: "number", help: "Lower numbers appear first. 0 = top." },
    ],
  },
  emergency: {
    table: "campaigns",
    title: "Emergency Response",
    singular: "case story",
    titleKey: "title",
    subtitleKey: "location",
    orderBy: [{ column: "sort_order", ascending: true }, { column: "created_at", ascending: false }],
    publicPaths: ["/", "/campaigns"],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Web address (slug)", type: "slug", required: true },
      { key: "location", label: "Location", type: "text", required: true, help: "e.g. Jonglei State, South Sudan" },
      { key: "country", label: "Country", type: "select", options: opt("South Sudan", "Sudan", "Somalia", "Kenya") },
      { key: "crisis_type", label: "Crisis type", type: "select", options: opt("Floods", "Displacement", "Drought", "Conflict", "Multi-hazard") },
      { key: "families_reached", label: "Families reached (verified only)", type: "number", help: "Leave empty unless the figure is confirmed." },
      { key: "image", label: "Cover image", type: "image", required: true },
      { key: "description", label: "Short summary", type: "textarea", required: true },
      { key: "body", label: "Case story text", type: "lines", help: "One paragraph per line. Informational only — no fundraising appeal." },
      { key: "needs", label: "Response needs (optional)", type: "lines", help: "One item per line." },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
  documentaries: {
    table: "videos",
    title: "Field Documentaries & Successes",
    singular: "documentary",
    titleKey: "title",
    subtitleKey: "location",
    orderBy: [{ column: "featured", ascending: false }, { column: "sort_order", ascending: true }, { column: "created_at", ascending: false }],
    publicPaths: ["/media"],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Web address (slug)", type: "slug", required: true },
      { key: "category", label: "Category", type: "select", required: true, options: opt("WASH", "Education", "Livelihoods", "Protection", "Shelter", "Emergency") },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "youtube_id", label: "YouTube video ID", type: "text", help: "Paste the YouTube link or the video ID. Leave empty to show “Coming soon”." },
      { key: "image", label: "Cover image", type: "image", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "featured", label: "Feature at the top of the page (only one is shown)", type: "checkbox" },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
};

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

/** Accepts a bare 11-char id or any common YouTube URL; returns the id or null. */
export function extractYoutubeId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})(?:[?&#/]|$)/);
  return m ? m[1] : null;
}
