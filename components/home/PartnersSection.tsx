"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

interface PartnerItem {
  name: string;
  category: string;
  image: string;
}

const partnersList: PartnerItem[] = [
  { name: "UNHCR", category: "UN Agency", image: "/images/partner-unhcr.jpg" },
  { name: "Crown Agents", category: "Strategic Partner", image: "/images/partner-crown-agents.jpg" },
  { name: "UNHCR", category: "UN Agency", image: "/images/partner-unhcr.jpg" },
  { name: "Crown Agents", category: "Strategic Partner", image: "/images/partner-crown-agents.jpg" },
  { name: "UNHCR", category: "UN Agency", image: "/images/partner-unhcr.jpg" },
  { name: "Crown Agents", category: "Strategic Partner", image: "/images/partner-crown-agents.jpg" }
];

function renderPartnerLogo(partner: PartnerItem) {
  return (
    <div className="relative h-12 w-32 md:h-16 md:w-44 overflow-hidden flex items-center justify-center">
      <Image
        src={partner.image}
        alt={partner.name}
        fill
        className="object-contain transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 120px, 180px"
      />
    </div>
  );
}

export function PartnersSection() {
  return (
    <section className="section-padding bg-[#F8F9FA] border-t border-sand-deep/30 relative overflow-hidden">
      <div className="container-content text-center">
        <Reveal>
          <p className="eyebrow justify-center">Strategic Alliances</p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl text-navy">
            Cooperating with Leading Global Agencies
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink/60">
            Our humanitarian response is empowered by operational synergy with major United Nations programs, international NGOs, and government aid offices.
          </p>
        </Reveal>
 
        {/* Marquee container */}
        <div className="group/marquee relative mt-16 overflow-hidden py-4">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#F8F9FA] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#F8F9FA] to-transparent" />
 
          <div
            className="flex w-max animate-marquee gap-10 items-center group-hover/marquee:[animation-play-state:paused] md:gap-16"
          >
            {/* Original set */}
            {partnersList.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex flex-shrink-0 items-center justify-center"
              >
                {renderPartnerLogo(partner)}
              </div>
            ))}
            {/* Duplicated set for seamless loop */}
            {partnersList.map((partner, index) => (
              <div
                key={`dup-${partner.name}-${index}`}
                className="flex flex-shrink-0 items-center justify-center"
              >
                {renderPartnerLogo(partner)}
              </div>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-lg text-sm text-ink/75">
            Interested in establishing institutional partnerships or joint programs?
          </p>
          <div className="mt-6">
            <Button href="/contact" className="shadow-md">
              Let&apos;s Get Started Now
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
