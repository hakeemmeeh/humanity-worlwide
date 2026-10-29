/**
 * Photos from the site itself, admin uploads (Supabase) and Unsplash are resized
 * and converted to WebP/AVIF by Next.js. A link staff paste from any other
 * website is shown as-is, so it can never break the page.
 */
export function canOptimize(src: string | undefined | null) {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return host === "images.unsplash.com" || host.endsWith(".supabase.co");
  } catch {
    return false;
  }
}
