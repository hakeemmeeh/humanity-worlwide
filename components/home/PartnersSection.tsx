"use client";

import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

interface PartnerItem {
  name: string;
  category: string;
  iconId: string;
}

const partnersList: PartnerItem[] = [
  { name: "UNICEF", category: "UN Agency", iconId: "unicef" },
  { name: "UNHCR", category: "UN Agency", iconId: "unhcr" },
  { name: "World Food Programme", category: "UN Agency", iconId: "wfp" },
  { name: "USAID", category: "Gov Aid", iconId: "usaid" },
  { name: "European Union Aid", category: "Gov Aid", iconId: "eu" },
  { name: "Red Cross", category: "Global NGO", iconId: "redcross" },
  { name: "World Health Organization", category: "UN Agency", iconId: "who" },
  { name: "UN OCHA", category: "UN Agency", iconId: "ocha" }
];

function renderPartnerLogo(iconId: string, name: string) {
  switch (iconId) {
    case "unicef":
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
    case "unhcr":
      return (
        <div className="flex items-center gap-1 font-sans font-bold tracking-tight text-blue-700">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2 text-blue-600" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12a9 9 0 0 1 15 0" />
            <path d="M12 21a9 9 0 0 0 6-9" />
            <path d="M12 7v10" />
            <path d="M9 10l3-3 3 3" />
          </svg>
          <span className="text-sm tracking-tighter uppercase font-extrabold">UNHCR</span>
        </div>
      );
    case "wfp":
      return (
        <div className="flex items-center gap-1 font-sans font-bold tracking-tight text-sky-600">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.5] text-sky-600" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            <path d="M9 15c1.5-2.5 4.5-2.5 6 0" />
          </svg>
          <span className="text-xs uppercase font-extrabold tracking-tighter">WFP</span>
        </div>
      );
    case "usaid":
      return (
        <div className="flex items-center gap-1 font-sans font-extrabold tracking-tighter text-blue-900">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2 text-[#E1723C]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M8 11h8" strokeWidth="3" />
          </svg>
          <span className="text-xs tracking-wider uppercase font-black">USAID</span>
        </div>
      );
    case "eu":
      return (
        <div className="flex items-center gap-1 font-sans font-bold tracking-tight text-blue-800">
          <div className="flex h-5 w-7 items-center justify-center rounded-sm bg-blue-800 p-0.5">
            <svg viewBox="0 0 12 8" className="h-full w-full fill-yellow-400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="0.1 0.3" />
              <rect x="5.8" y="1" width="0.4" height="0.4" />
              <rect x="5.8" y="6.6" width="0.4" height="0.4" />
            </svg>
          </div>
          <span className="text-[9px] uppercase font-black tracking-tighter leading-none text-blue-900">EU Aid</span>
        </div>
      );
    case "redcross":
      return (
        <div className="flex items-center gap-1.5 font-sans font-extrabold text-red-600">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-red-600 text-red-600" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="4" width="4" height="16" rx="1" />
            <rect x="4" y="10" width="16" height="4" rx="1" />
          </svg>
          <span className="text-xs uppercase tracking-tighter leading-none text-red-700">RED CROSS</span>
        </div>
      );
    case "who":
      return (
        <div className="flex items-center gap-1 font-sans font-extrabold text-teal-700">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.5] text-teal" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          <span className="text-xs uppercase tracking-tighter text-teal-800 leading-none">WHO</span>
        </div>
      );
    case "ocha":
      return (
        <div className="flex items-center gap-1 font-sans font-extrabold text-blue-800">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2 text-blue-700" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
            <circle cx="6" cy="18" r="3" />
            <line x1="6" y1="6" x2="6" y2="15" />
          </svg>
          <span className="text-[10px] uppercase font-black tracking-widest text-blue-900 leading-none">OCHA</span>
        </div>
      );
    default:
      return <span className="text-xs font-bold text-navy/70">{name}</span>;
  }
}

export function PartnersSection() {
  return (
    <section className="section-padding bg-[#F8F9FA] border-t border-sand-deep/30">
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
        <div className="group/marquee relative mt-12 overflow-hidden py-4">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F8F9FA] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F8F9FA] to-transparent" />
 
          <div
            className="flex w-max animate-marquee gap-6 group-hover/marquee:[animation-play-state:paused] md:gap-8"
          >
            {/* Original set */}
            {partnersList.map((partner, index) => (
              <div
                key={`${partner.iconId}-${index}`}
                className="flex h-20 w-44 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-sand-deep/40 bg-white px-5 shadow-sm transition-all duration-300 hover:scale-105 hover:border-teal/30 hover:shadow-md md:h-24 md:w-52"
              >
                {renderPartnerLogo(partner.iconId, partner.name)}
                <span className="mt-1.5 text-[8px] font-bold uppercase tracking-widest text-ink/40">
                  {partner.category}
                </span>
              </div>
            ))}
            {/* Duplicated set for seamless loop */}
            {partnersList.map((partner, index) => (
              <div
                key={`dup-${partner.iconId}-${index}`}
                className="flex h-20 w-44 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-sand-deep/40 bg-white px-5 shadow-sm transition-all duration-300 hover:scale-105 hover:border-teal/30 hover:shadow-md md:h-24 md:w-52"
              >
                {renderPartnerLogo(partner.iconId, partner.name)}
                <span className="mt-1.5 text-[8px] font-bold uppercase tracking-widest text-ink/40">
                  {partner.category}
                </span>
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
