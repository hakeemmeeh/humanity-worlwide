import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client using the service-role key (bypasses RLS).
 * Never import this from a "use client" file.
 */
export function getSupabaseService(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Next 14 caches fetch() by default; DB reads must always be fresh.
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

export const NOT_CONFIGURED =
  "Database is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.";

/**
 * Server-only client for PUBLIC page reads. Unlike getSupabaseService(), its
 * fetches are cacheable (tagged "content") so public pages stay fast and
 * statically cached; admin writes call revalidateTag("content") to refresh them.
 */
export function getSupabasePublicReader(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, next: { revalidate: 60, tags: ["content"] } }),
    },
  });
}
