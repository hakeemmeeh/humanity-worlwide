"use client";

import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { partners } from "@/data/content";

function renderPartnerLogo(name: string) {
  if (name === "UNICEF") {
    return (
      <div className="flex items-center gap-1 font-sans font-extrabold tracking-tight">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.5] text-sky-400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 1 0 18M3 12a9 9 0 0 1 18 0" strokeWidth="1" />
          <circle cx="12" cy="12" r="3" strokeWidth="1" />
        </svg>
        <span className="text-lg lowercase leading-none text-sky-500 tracking-tighter">unicef</span>
      </div>
    );
  }
  if (name.includes("Authorities")) {
    return (
      <div className="flex items-center gap-1.5 font-sans font-bold tracking-wider text-navy">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2 text-[#E1723C]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
        <span className="text-[10px] text-navy tracking-widest uppercase">STATE GOV</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 font-sans font-bold tracking-wider text-teal-text">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2 text-teal" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <span className="text-[10px] text-teal-text tracking-widest uppercase">LOCAL CBO</span>
    </div>
  );
}

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
                className="flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-2xl border border-sand-deep bg-white px-5 shadow-card transition-all duration-300 grayscale hover:grayscale-0 hover:shadow-card-hover md:h-24 md:w-48"
              >
                {renderPartnerLogo(partner.name)}
              </div>
            ))}
            {/* Duplicated set for seamless loop */}
            {partners.map((partner) => (
              <div
                key={`dup-${partner.name}`}
                className="flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-2xl border border-sand-deep bg-white px-5 shadow-card transition-all duration-300 grayscale hover:grayscale-0 hover:shadow-card-hover md:h-24 md:w-48"
              >
                {renderPartnerLogo(partner.name)}
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
