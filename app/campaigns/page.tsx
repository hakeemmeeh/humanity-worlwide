import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTAStripe } from "@/components/CTAStripe";
import { DonationBanner } from "@/components/DonationBanner";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { campaigns } from "@/data/content";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Support emergency response campaigns including flood relief in Jonglei State, South Sudan.",
};

export default function CampaignsPage() {
  return (
    <>
      <PageHero
        eyebrow="Campaigns"
        title="Emergency response & appeals"
        subtitle="When crisis strikes, we respond. Your support enables rapid humanitarian action."
        image="https://images.unsplash.com/photo-1547685079-3f4a4e2e2f2b?w=1920&q=80"
        imageAlt="Emergency flood response campaign in Jonglei State, South Sudan"
      />

      <section className="section-padding bg-white">
        <div className="container-content space-y-8">
          {campaigns.map((campaign, index) => (
            <div key={campaign.slug}>
              <DonationBanner campaign={campaign} embedded />
              <Reveal delay={index * 0.1}>
                <Link
                  href={`/campaigns/${campaign.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
                >
                  View full campaign details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CTAStripe />
    </>
  );
}
