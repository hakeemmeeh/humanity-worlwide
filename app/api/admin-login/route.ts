import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { SESSION_COOKIE, SESSION_MAX_AGE_S, createSessionToken } from "@/lib/admin/session";

export const runtime = "nodejs";

// Best-effort brute-force limiter (per server instance). 5 failures / 15 min / IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;
const fails = new Map<string, { count: number; first: number }>();

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

function sha(s: string) {
  return createHash("sha256").update(s).digest();
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const now = Date.now();
  const rec = fails.get(ip);
  if (rec && now - rec.first > WINDOW_MS) fails.delete(ip);
  const current = fails.get(ip);
  if (current && current.count >= MAX_FAILS) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const password = typeof body?.password === "string" ? body.password.trim() : "";
    const expected = process.env.ADMIN_PASSWORD?.trim();
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!expected || !secret || secret.length < 16) {
      return NextResponse.json(
        { error: "Admin login is not configured on the server." },
        { status: 503 }
      );
    }

    // constant-time compare of fixed-length digests
    const match = timingSafeEqual(sha(password), sha(expected));
    if (!match) {
      const f = fails.get(ip) ?? { count: 0, first: now };
      f.count += 1;
      fails.set(ip, f);
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    fails.delete(ip);
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, await createSessionToken(secret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_S,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}

// Logout
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
