"use client";

import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { partners } from "@/data/content";

export function PartnersSection() {
  return (
    <section className="section-padding bg-sand">
      <div className="container-content text-center">
        <Reveal>
          <p className="eyebrow justify-center">Partnerships</p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Working together for change
          </h2>
        </Reveal>

        {/* Marquee container */}
        <div className="group/marquee relative mt-10 overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sand to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sand to-transparent" />

          <div
            className="flex w-max animate-marquee gap-6 group-hover/marquee:[animation-play-state:paused] md:gap-12"
          >
            {/* Original set */}
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-20 w-36 flex-shrink-0 items-center justify-center rounded-2xl border border-sand-deep bg-white px-4 shadow-card transition-all duration-300 grayscale hover:grayscale-0 hover:shadow-card-hover md:h-24 md:w-44"
              >
                <span className="font-display text-lg font-semibold text-navy/70 md:text-xl">
                  {partner.abbr ?? partner.name}
                </span>
              </div>
            ))}
            {/* Duplicated set for seamless loop */}
            {partners.map((partner) => (
              <div
                key={`dup-${partner.name}`}
                className="flex h-20 w-36 flex-shrink-0 items-center justify-center rounded-2xl border border-sand-deep bg-white px-4 shadow-card transition-all duration-300 grayscale hover:grayscale-0 hover:shadow-card-hover md:h-24 md:w-44"
              >
                <span className="font-display text-lg font-semibold text-navy/70 md:text-xl">
                  {partner.abbr ?? partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-lg text-ink/70">
            Are you interested in working with us? Let&apos;s get started now.
          </p>
          <div className="mt-6">
            <Button href="/contact">Let&apos;s Get Started Now</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
