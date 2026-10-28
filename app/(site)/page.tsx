import type { Metadata } from "next";
import { DonationBanner } from "@/components/DonationBanner";
import { CTAStripe } from "@/components/CTAStripe";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactStatsSection } from "@/components/home/ImpactStatsSection";
import { NewsSection } from "@/components/home/NewsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { StoriesSection } from "@/components/home/StoriesSection";
import { WaysToGiveSection } from "@/components/home/WaysToGiveSection";
import { WhereWeWorkSection } from "@/components/home/WhereWeWorkSection";
import { heroSlides, seoDescription } from "@/data/content";
import { getArticles, getCampaigns, getStories } from "@/lib/published-content";

import { WhatWeOfferSection } from "@/components/home/WhatWeOfferSection";
import { VisionSection } from "@/components/home/VisionSection";
import { EventsSection } from "@/components/home/EventsSection";

export const metadata: Metadata = {
  title: { absolute: "Humanity Worldwide | Humanitarian NGO in East Africa" },
  description: seoDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Humanity Worldwide — for a better world",
    description: seoDescription,
    images: [{ url: heroSlides[0].image }],
  },
};

export default async function HomePage() {
  const [campaigns, stories, articles] = await Promise.all([getCampaigns(), getStories(), getArticles()]);
  return (
    <>
      <HeroSection />
      <WaysToGiveSection />
      <ImpactStatsSection />
      <ProgramsSection />
      <VisionSection />
      <WhatWeOfferSection />
      <WhereWeWorkSection />
      {campaigns[0] && (
        <section className="section-padding bg-white">
          <div className="container-content">
            <DonationBanner campaign={campaigns[0]} embedded />
          </div>
        </section>
      )}
      <StoriesSection stories={stories} />
      <EventsSection />
      <NewsSection articles={articles} />
      <PartnersSection />
      <CTAStripe variant="navy" intent="learn" />
    </>
  );
}
