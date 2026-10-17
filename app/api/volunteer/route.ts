import { NextResponse } from "next/server";
import { getSupabaseService, NOT_CONFIGURED } from "@/lib/supabase";
import { notifyStaff } from "@/lib/notify";
import { EMAIL_RE, rateLimited, str } from "@/lib/public-form";

export const runtime = "nodejs";
const AVAILABILITY = ["remote", "local", "international"];

export async function POST(req: Request) {
  if (rateLimited(req)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (str(body.website, 100)) return NextResponse.json({ success: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const skills = str(body.skills, 4000);
  const availability = str(body.availability, 30);

  if (!name || !skills || !EMAIL_RE.test(email) || !AVAILABILITY.includes(availability)) {
    return NextResponse.json({ error: "Please complete all fields with a valid email." }, { status: 400 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    console.error(NOT_CONFIGURED);
    return NextResponse.json({ error: "Applications can't be received right now. Please email us directly." }, { status: 503 });
  }

  const { error } = await supabase.from("volunteers").insert({ name, email, skills, availability });
  if (error) {
    console.error("Volunteer insert failed:", error.message);
    return NextResponse.json({ error: "Could not submit your application. Please try again." }, { status: 500 });
  }

  await notifyStaff({
    subject: `New volunteer application: ${name}`,
    replyTo: email,
    fields: { Name: name, Email: email, Availability: availability, "Skills & experience": skills },
  });
  return NextResponse.json({ success: true });
}
