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
              Emergency Response
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

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/campaigns">View Emergency Response</Button>
              <Link
                href={`/campaigns/${campaign.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
              >
                Read this response
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
