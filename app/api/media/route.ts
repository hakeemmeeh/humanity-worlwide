import { NextResponse } from "next/server";
import { getSupabaseService, NOT_CONFIGURED } from "@/lib/supabase";

export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif", "image/gif": "gif",
};

// POST /api/media (multipart, field "file") -> { url }   (admin only — see middleware)
export async function POST(req: Request) {
  try {
    const sb = getSupabaseService();
    if (!sb) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 });

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "No file provided." }, { status: 400 });

    // extension comes from the verified MIME type, never from the user's file name
    const ext = TYPES[file.type];
    if (!ext) return NextResponse.json({ error: "Only JPG, PNG, WebP, AVIF or GIF images are allowed." }, { status: 400 });
    if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Image must be under 8 MB." }, { status: 400 });

    const base = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-|-$/g, "").slice(0, 40) || "image";
    const path = `uploads/${Date.now()}-${base}.${ext}`;

    const { error } = await sb.storage.from("media").upload(path, new Uint8Array(await file.arrayBuffer()), {
      contentType: file.type, upsert: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data } = sb.storage.from("media").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (e) {
    console.error("Media upload error:", e);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
