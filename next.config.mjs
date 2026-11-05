const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Addresses from HWW's previous website, sent to the matching new pages so
  // old links and Google results keep working after the domain moves.
  async redirects() {
    return [
      { source: "/programs", destination: "/our-work", permanent: true },
      { source: "/programs/:path*", destination: "/our-work", permanent: true },
      { source: "/impact", destination: "/our-work", permanent: true },
      { source: "/partnerships", destination: "/get-involved", permanent: true },
      { source: "/careers", destination: "/get-involved", permanent: true },
      { source: "/donate", destination: "/get-involved#donate", permanent: true },
      { source: "/publications", destination: "/resources", permanent: true },
      { source: "/reports", destination: "/resources", permanent: true },
      // Temporary until HWW supplies its policy pages
      { source: "/policies", destination: "/about", permanent: false },
      { source: "/privacy", destination: "/contact", permanent: false },
      { source: "/terms", destination: "/contact", permanent: false },
    ];
  },
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
