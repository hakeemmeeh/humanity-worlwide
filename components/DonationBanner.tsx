"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import type { Campaign } from "@/types";

interface DonationBannerProps {
  campaign: Campaign;
  embedded?: boolean;
}

export function DonationBanner({
  campaign,
  embedded = false,
}: DonationBannerProps) {
  const progress = Math.round((campaign.raised / campaign.goal) * 100);

  const content = (
    <Reveal>
      <div className="overflow-hidden rounded-2xl bg-sand shadow-card">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-coral">
              Emergency Campaign
            </span>
            <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
              {campaign.title}
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              {campaign.description}
            </p>
            {campaign.familiesReached && (
              <p className="mt-3 text-sm font-semibold text-teal-text">
                {campaign.familiesReached.toLocaleString()} families reached ·{" "}
                {campaign.location}
              </p>
            )}

            <div className="mt-8">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-navy">
                  ${campaign.raised.toLocaleString()} raised
                </span>
                <span className="text-ink/50">
                  of ${campaign.goal.toLocaleString()} goal
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-sand-deep">
                <div
                  className="h-full rounded-full bg-coral transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${progress}% of fundraising goal reached`}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-coral">
                {progress}% funded
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/get-involved">Donate to This Campaign</Button>
              <Link
                href={`/campaigns/${campaign.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-content">{content}</div>
    </section>
  );
}
