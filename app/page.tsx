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
import { campaigns, heroSlides, organization } from "@/data/content";

import { WhatWeOfferSection } from "@/components/home/WhatWeOfferSection";
import { VisionSection } from "@/components/home/VisionSection";
import { EventsSection } from "@/components/home/EventsSection";

export const metadata: Metadata = {
  title: "Home",
  description: organization.mission,
  openGraph: {
    title: "Humanity Worldwide — for a better world",
    description: organization.mission,
    images: [{ url: heroSlides[0].image }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WaysToGiveSection />
      <ImpactStatsSection />
      <ProgramsSection />
      <VisionSection />
      <WhatWeOfferSection />
      <WhereWeWorkSection />
      <section className="section-padding bg-white">
        <div className="container-content">
          <DonationBanner campaign={campaigns[0]} embedded />
        </div>
      </section>
      <StoriesSection />
      <EventsSection />
      <NewsSection />
      <PartnersSection />
      <CTAStripe variant="navy" />
    </>
  );
}
