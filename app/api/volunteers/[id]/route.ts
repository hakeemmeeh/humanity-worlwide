import { NextResponse } from "next/server";
import { getSupabaseService, NOT_CONFIGURED } from "@/lib/supabase";

const STATUSES = ["new", "reviewing", "accepted", "declined"];
const UUID = /^[0-9a-f-]{36}$/i;

// PATCH /api/volunteers/:id  { status?, notes? }   (admin only — see middleware)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!UUID.test(params.id)) return NextResponse.json({ error: "Bad id." }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    patch.status = body.status;
  }
  if (body.notes !== undefined) patch.notes = String(body.notes).slice(0, 5000);
  if (!Object.keys(patch).length) return NextResponse.json({ error: "Nothing to update." }, { status: 400 });

  const supabase = getSupabaseService();
  if (!supabase) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 });
  const { error } = await supabase.from("volunteers").update(patch).eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
