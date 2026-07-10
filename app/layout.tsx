import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { organization } from "@/data/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(organization.url),
  title: {
    default: "Humanity Worldwide | for a better world",
    template: "%s | Humanity Worldwide",
  },
  description: organization.mission,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: organization.url,
    siteName: organization.name,
    title: "Humanity Worldwide",
    description: organization.mission,
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanity Worldwide",
    description: organization.mission,
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
      address: {
        "@type": "PostalAddress",
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
      areaServed: ["South Sudan", "Somalia", "Sudan"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
