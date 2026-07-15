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
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Raised</span>
                  <span className="font-display text-2xl font-bold text-navy">
                    ${campaign.raised.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Target Goal</span>
                  <span className="font-display text-2xl font-bold text-ink/75">
                    ${campaign.goal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="relative mt-6 pt-6">
                {/* Floating Tooltip Bubble */}
                <div 
                  className="absolute top-0 flex flex-col items-center -translate-x-1/2 transition-all duration-1000 ease-out"
                  style={{ left: `${Math.min(progress, 100)}%` }}
                >
                  <span className="rounded bg-navy-deep px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                    {progress}%
                  </span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-navy-deep -mt-0.5" />
                </div>

                {/* Progress Bar Container */}
                <div className="h-3.5 w-full rounded-full bg-sand-deep p-[2px] shadow-inner overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-coral via-orange-500 to-amber-500 transition-all duration-1000 ease-out relative shadow-[0_0_8px_rgba(225,114,60,0.3)]"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${progress}% of fundraising goal reached`}
                  >
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  </div>
                </div>
              </div>
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
