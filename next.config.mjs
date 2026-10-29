const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: the site is no longer a static export. The admin (login, API routes,
  // middleware) needs a server runtime — deploy on Vercel or any Node host.
  images: {
    // Next.js resizes photos per screen and serves WebP/AVIF (see lib/image-src.ts)
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(supabaseHost ? [{ protocol: "https", hostname: supabaseHost }] : []),
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;
