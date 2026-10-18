import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSupabaseService, NOT_CONFIGURED } from "@/lib/supabase";
import { CONTENT_TYPES, SLUG_RE, extractYoutubeId, type FieldDef } from "@/lib/admin/content-config";

export const runtime = "nodejs";

const UUID = /^[0-9a-f-]{36}$/i;
const STATUS = ["draft", "published"];

function cfg(type: string) {
  return CONTENT_TYPES[type];
}

/** Build a DB row from request JSON using ONLY allow-listed fields, coerced to the right shape. */
function buildRow(
  fields: FieldDef[],
  input: Record<string, unknown>,
  { partial }: { partial: boolean }
): { row?: Record<string, unknown>; error?: string } {
  const row: Record<string, unknown> = {};
  for (const f of fields) {
    if (!(f.key in input)) {
      if (!partial && f.required) return { error: `${f.label} is required.` };
      continue;
    }
    const v = input[f.key];
    switch (f.type) {
      case "lines": {
        const arr = Array.isArray(v) ? v : typeof v === "string" ? v.split("\n") : [];
        row[f.key] = arr.map((x) => String(x).trim()).filter(Boolean).slice(0, 100);
        break;
      }
      case "number": {
        if (v === "" || v === null || v === undefined) row[f.key] = f.key === "sort_order" ? 0 : null;
        else {
          const n = Number(v);
          if (!Number.isFinite(n) || n < 0 || n > 1e9) return { error: `${f.label} must be a positive number.` };
          row[f.key] = Math.trunc(n);
        }
        break;
      }
      case "checkbox":
        row[f.key] = Boolean(v);
        break;
      case "date": {
        const s = String(v ?? "").trim();
        if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s))) return { error: `${f.label} must be a valid date.` };
        row[f.key] = s;
        break;
      }
      case "slug": {
        const s = String(v ?? "").trim();
        if (!SLUG_RE.test(s)) return { error: "Slug may only contain lowercase letters, numbers and dashes." };
        row[f.key] = s;
        break;
      }
      case "image": {
        const s = String(v ?? "").trim().slice(0, 1000);
        if (s && !/^(https?:\/\/|\/)/.test(s)) return { error: "Image must be an uploaded file or a link starting with http(s):// or /." };
        if (!s && f.required) return { error: `${f.label} is required.` };
        row[f.key] = s;
        break;
      }
      case "select": {
        const s = String(v ?? "").trim();
        if (s && f.options && !f.options.some((o) => o.value === s)) return { error: `Invalid ${f.label}.` };
        if (!s && f.required) return { error: `${f.label} is required.` };
        row[f.key] = s || null;
        break;
      }
      default: {
        const s = String(v ?? "").trim().slice(0, f.type === "textarea" ? 5000 : 500);
        if (!s && f.required) return { error: `${f.label} is required.` };
        if (f.key === "youtube_id" && s) {
          const id = extractYoutubeId(s);
          if (!id) return { error: "That doesn't look like a YouTube link or video ID." };
          row[f.key] = id;
          break;
        }
        row[f.key] = s || (f.required ? s : null);
      }
    }
  }
  return { row };
}

function afterWrite() {
  // Drop cached public content + re-render affected pages immediately.
  revalidateTag("content");
  revalidatePath("/", "layout");
}

function dbError(message: string, code?: string) {
  if (code === "23505") return "That web address (slug) is already used. Choose a different one.";
  return message;
}

// GET /api/content/:type  — list every row incl. drafts
export async function GET(_req: Request, { params }: { params: { type: string } }) {
  const c = cfg(params.type);
  if (!c) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  const sb = getSupabaseService();
  if (!sb) return NextResponse.json({ rows: [], error: NOT_CONFIGURED });

  let q = sb.from(c.table).select("*");
  for (const o of c.orderBy) q = q.order(o.column, { ascending: o.ascending });
  const { data, error } = await q;
  if (error) return NextResponse.json({ rows: [], error: error.message });
  return NextResponse.json({ rows: data ?? [] });
}

// POST /api/content/:type — create
export async function POST(req: Request, { params }: { params: { type: string } }) {
  const c = cfg(params.type);
  if (!c) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  const sb = getSupabaseService();
  if (!sb) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 });

  const input = await req.json().catch(() => null);
  if (!input || typeof input !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { row, error } = buildRow(c.fields, input, { partial: false });
  if (error || !row) return NextResponse.json({ error }, { status: 400 });
  row.status = STATUS.includes(input.status) ? input.status : "published";

  const { data, error: dbErr } = await sb.from(c.table).insert([row]).select().single();
  if (dbErr) return NextResponse.json({ error: dbError(dbErr.message, dbErr.code) }, { status: 400 });
  afterWrite();
  return NextResponse.json({ row: data });
}

// PATCH /api/content/:type?id=...
export async function PATCH(req: Request, { params }: { params: { type: string } }) {
  const c = cfg(params.type);
  if (!c) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!UUID.test(id)) return NextResponse.json({ error: "Missing or bad id." }, { status: 400 });
  const sb = getSupabaseService();
  if (!sb) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 });

  const input = await req.json().catch(() => null);
  if (!input || typeof input !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { row, error } = buildRow(c.fields, input, { partial: true });
  if (error || !row) return NextResponse.json({ error }, { status: 400 });
  if ("status" in input) {
    if (!STATUS.includes(input.status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    row.status = input.status;
  }
  if (!Object.keys(row).length) return NextResponse.json({ error: "Nothing to update." }, { status: 400 });

  const { error: dbErr } = await sb.from(c.table).update(row).eq("id", id);
  if (dbErr) return NextResponse.json({ error: dbError(dbErr.message, dbErr.code) }, { status: 400 });
  afterWrite();
  return NextResponse.json({ success: true });
}

// DELETE /api/content/:type?id=...
export async function DELETE(req: Request, { params }: { params: { type: string } }) {
  const c = cfg(params.type);
  if (!c) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!UUID.test(id)) return NextResponse.json({ error: "Missing or bad id." }, { status: 400 });
  const sb = getSupabaseService();
  if (!sb) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 });

  const { error } = await sb.from(c.table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  afterWrite();
  return NextResponse.json({ success: true });
}
