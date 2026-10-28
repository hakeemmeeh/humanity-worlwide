import type { Metadata } from "next";
import localFont from "next/font/local";
import { organization, seoDescription, socialLinks } from "@/data/content";
import "./globals.css";

// Fonts are stored in app/fonts (self-hosted), so builds never depend on Google Fonts.
const fraunces = localFont({
  src: "./fonts/fraunces.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const caveat = localFont({
  src: "./fonts/caveat.woff2",
  variable: "--font-caveat",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(organization.url),
  title: {
    default: "Humanity Worldwide | for a better world",
    template: "%s | Humanity Worldwide",
  },
  description: seoDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: organization.url,
    siteName: organization.name,
    title: "Humanity Worldwide",
    description: seoDescription,
    images: [{ url: "/logo.png", width: 498, height: 154, alt: "Humanity Worldwide logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanity Worldwide",
    description: seoDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: organization.name,
      alternateName: organization.shortName,
      url: organization.url,
      logo: `${organization.url}/logo.png`,
      description: organization.mission,
      slogan: organization.tagline,
      email: organization.contact.email,
      telephone: organization.contact.phone,
      sameAs: socialLinks.map((s) => s.href),
      address: {
        "@type": "PostalAddress",
        streetAddress: "2323 Independence Avenue",
        addressLocality: "Kansas City",
        addressRegion: "MO",
        postalCode: "64124",
        addressCountry: "US",
      },
    },
    {
      "@type": "NGO",
      name: organization.name,
      url: organization.url,
      description: organization.mission,
      areaServed: ["South Sudan", "Somalia", "Sudan", "Kenya"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
