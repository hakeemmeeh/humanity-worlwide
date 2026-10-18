import { NextResponse } from "next/server";
import { getSupabaseService, NOT_CONFIGURED } from "@/lib/supabase";
import { notifyStaff } from "@/lib/notify";
import { EMAIL_RE, rateLimited, str } from "@/lib/public-form";

export const runtime = "nodejs";

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

  // Honeypot: bots fill the hidden "website" field. Pretend success, store nothing.
  if (str(body.website, 100)) return NextResponse.json({ success: true });

  const first_name = str(body.firstName, 80);
  const last_name = str(body.lastName, 80);
  const email = str(body.email, 200);
  const subject = str(body.subject, 200);
  const message = str(body.message, 5000);

  if (!first_name || !last_name || !subject || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please fill in all fields with a valid email." }, { status: 400 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    console.error(NOT_CONFIGURED);
    return NextResponse.json({ error: "Messages can't be received right now. Please email us directly." }, { status: 503 });
  }

  const { error } = await supabase
    .from("inquiries")
    .insert({ first_name, last_name, email, subject, message });
  if (error) {
    console.error("Contact insert failed:", error.message);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }

  await notifyStaff({
    subject: `New website message: ${subject}`,
    replyTo: email,
    fields: { Name: `${first_name} ${last_name}`, Email: email, Subject: subject, Message: message },
  });
  return NextResponse.json({ success: true });
}
