"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Info } from "lucide-react";

interface Marker {
  name: string;
  cx: number;
  cy: number;
  href: string;
  details: string;
  capital: string;
  stats: string;
}

export function RegionMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const countries = [
    {
      id: "sudan",
      name: "Sudan",
      path: "M 80,60 L 200,60 L 210,80 L 230,90 L 240,110 L 225,120 L 235,160 L 200,180 L 160,180 L 140,165 L 100,165 L 60,110 Z",
      capital: "Khartoum",
      description: "Emergency relief & protection response.",
    },
    {
      id: "south-sudan",
      name: "South Sudan",
      path: "M 100,165 L 140,165 L 160,180 L 200,180 L 210,210 L 190,260 L 140,260 L 110,230 L 90,210 Z",
      capital: "Juba",
      description: "Our largest operations: Education, WASH & Livelihoods.",
    },
    {
      id: "somalia",
      name: "Somalia",
      path: "M 235,160 L 290,160 L 340,170 L 370,200 L 330,260 L 310,310 L 295,300 L 285,270 L 260,230 L 230,210 Z",
      capital: "Mogadishu",
      description: "Integrated WASH, nutrition & community resilience.",
    },
  ];

  const markers: Marker[] = [
    {
      name: "Sudan Operations",
      cx: 170,
      cy: 110,
      href: "/where-we-work#sudan",
      details: "Emergency response & displaced support",
      capital: "Khartoum Hub",
      stats: "2 Active Programs",
    },
    {
      name: "South Sudan Operations",
      cx: 155,
      cy: 220,
      href: "/where-we-work#south-sudan",
      details: "7 Offices, 12 Classrooms Built",
      capital: "Juba HQ",
      stats: "4 Active Programs",
    },
    {
      name: "Somalia Operations",
      cx: 300,
      cy: 230,
      href: "/where-we-work#somalia",
      details: "Nutrition & resilience projects",
      capital: "Mogadishu Hub",
      stats: "3 Active Programs",
    },
  ];

  return (
    <div className="relative mx-auto w-full rounded-2xl bg-white p-6 shadow-card border border-sand-deep/40">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-teal" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy/80">
            Interactive Operational Map
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-ink/50 bg-sand px-2 py-0.5 rounded-full">
          <Info className="h-3 w-3 text-teal" />
          Hover countries for details
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-[#F8F9FA] border border-sand/60">
        <svg
          viewBox="0 0 400 360"
          className="w-full h-auto select-none"
          aria-hidden="true"
        >
          {/* Coordinates grid */}
          <g stroke="#2CADA3" strokeDasharray="2 4" strokeWidth="0.5" opacity="0.12">
            <line x1="50" y1="0" x2="50" y2="360" />
            <line x1="150" y1="0" x2="150" y2="360" />
            <line x1="250" y1="0" x2="250" y2="360" />
            <line x1="350" y1="0" x2="350" y2="360" />
            <line x1="0" y1="90" x2="400" y2="90" />
            <line x1="0" y1="180" x2="400" y2="180" />
            <line x1="0" y1="270" x2="400" y2="270" />
          </g>

          {/* Grid Labels */}
          <g fill="#A0A5AB" fontSize="8" fontFamily="monospace" opacity="0.8">
            <text x="355" y="96">15° N</text>
            <text x="355" y="186">5° N</text>
            <text x="355" y="276">5° S</text>
            <text x="55" y="348">30° E</text>
            <text x="155" y="348">35° E</text>
            <text x="255" y="348">40° E</text>
            <text x="355" y="348">45° E</text>
          </g>

          {/* Compass Rose */}
          <g transform="translate(45, 305)" opacity="0.35" className="scale-75">
            <circle cx="0" cy="0" r="18" fill="none" stroke="#2CADA3" strokeWidth="1" />
            <line x1="-22" y1="0" x2="22" y2="0" stroke="#2CADA3" strokeWidth="1" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke="#2CADA3" strokeWidth="1" />
            <polygon points="0,-22 4,-4 0,0" fill="#E1723C" />
            <polygon points="0,-22 -4,-4 0,0" fill="#C05D2D" />
            <polygon points="0,22 4,4 0,0" fill="#2CADA3" />
            <polygon points="0,22 -4,4 0,0" fill="#1C8D84" />
            <text x="-4" y="-25" fill="#12304F" fontSize="8" fontWeight="bold">N</text>
          </g>

          {/* Scale Bar */}
          <g transform="translate(290, 315)" opacity="0.6">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#12304F" strokeWidth="2" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#12304F" strokeWidth="1" />
            <line x1="30" y1="-3" x2="30" y2="3" stroke="#12304F" strokeWidth="1" />
            <line x1="60" y1="-3" x2="60" y2="3" stroke="#12304F" strokeWidth="1" />
            <text x="12" y="-6" fill="#12304F" fontSize="7" fontWeight="bold" fontFamily="monospace">500 km</text>
          </g>

          {/* Non-operational neighboring countries (dashed light outline) */}
          <g fill="#EDEDED" stroke="#D2D6D9" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" strokeLinejoin="round">
            {/* Egypt */}
            <path d="M 60,10 L 200,10 L 200,60 L 60,60 Z" />
            {/* Ethiopia */}
            <path d="M 200,180 L 235,160 L 260,230 L 210,270 L 190,260 L 210,210 Z" />
            {/* Kenya */}
            <path d="M 190,260 L 210,270 L 250,330 L 180,330 L 140,260 Z" />
            {/* Uganda */}
            <path d="M 140,260 L 180,260 L 160,310 L 130,310 Z" />
            {/* Central African Republic / Chad */}
            <path d="M 10,60 L 60,60 L 100,165 L 90,210 L 10,210 Z" />
          </g>

          {/* Operational countries */}
          <g strokeLinejoin="round">
            {countries.map((c) => {
              const isHovered = hoveredCountry === c.id;
              return (
                <path
                  key={c.id}
                  d={c.path}
                  fill={isHovered ? "url(#activeCountryGrad)" : "#E2EFEF"}
                  stroke={isHovered ? "#E1723C" : "#A2C7C4"}
                  strokeWidth={isHovered ? "2.5" : "1.5"}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredCountry(c.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              );
            })}
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="activeCountryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2ac4ba" />
              <stop offset="100%" stopColor="#1bb3a9" />
            </linearGradient>
          </defs>

          {/* Active coordinates glowing markers */}
          {markers.map((m) => {
            const isHovered = hoveredCountry === m.href.split("#")[1];
            return (
              <Link key={m.name} href={m.href} className="group">
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCountry(m.href.split("#")[1])}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  {/* Outer pulsing ring */}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r={isHovered ? "18" : "12"}
                    fill="#E1723C"
                    opacity={isHovered ? "0.35" : "0.2"}
                    className="animate-pulse origin-center transition-all duration-300"
                    style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
                  />
                  {/* Core marker dot */}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r={isHovered ? "6" : "4.5"}
                    fill={isHovered ? "#E1723C" : "#2ac4ba"}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Capital indicator star */}
                  <path
                    d={`M ${m.cx} ${m.cy - 12} L ${m.cx + 2} ${m.cy - 8} L ${m.cx + 6} ${m.cy - 8} L ${m.cx + 3} ${m.cy - 6} L ${m.cx + 5} ${m.cy - 2} L ${m.cx} ${m.cy - 4} L ${m.cx - 5} ${m.cy - 2} L ${m.cx - 3} ${m.cy - 6} L ${m.cx - 6} ${m.cy - 8} L ${m.cx - 2} ${m.cy - 8} Z`}
                    fill="#12304F"
                    opacity={isHovered ? "0.9" : "0.5"}
                    className="transition-all duration-300 scale-75 origin-center"
                    style={{ transformOrigin: `${m.cx}px ${m.cy - 8}px` }}
                  />
                </g>
              </Link>
            );
          })}
        </svg>

        {/* Hover info floating display inside map card */}
        <div className="absolute bottom-3 left-3 right-3 bg-navy-deep/95 backdrop-blur-sm rounded-xl p-3.5 text-white transition-all duration-300 shadow-lg border border-white/10">
          {hoveredCountry ? (
            (() => {
              const info = countries.find((c) => c.id === hoveredCountry);
              const statInfo = markers.find((m) => m.href.split("#")[1] === hoveredCountry);
              return (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-teal">{info?.name}</span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/90">
                      {statInfo?.stats}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/80 leading-relaxed">
                    {info?.description}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/60">
                    <MapPin className="h-3 w-3 text-coral" />
                    <span>Operational Base: <strong className="text-white">{statInfo?.capital}</strong></span>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-center py-1">
              <p className="text-xs text-white/85">
                Hover over the map or pins to explore regional stats
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Country quick link index */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-sand-deep/40 pt-4">
        {markers.map((m) => {
          const countryId = m.href.split("#")[1];
          const isHovered = hoveredCountry === countryId;
          return (
            <Link
              key={m.name}
              href={m.href}
              className={`flex flex-col items-center justify-center rounded-lg p-2 text-center transition-all duration-300 border ${
                isHovered
                  ? "bg-teal-soft/30 border-teal text-teal-text shadow-sm"
                  : "bg-sand/30 border-transparent text-navy hover:bg-sand/65"
              }`}
              onMouseEnter={() => setHoveredCountry(countryId)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <MapPin className={`h-4 w-4 ${isHovered ? "text-teal" : "text-ink/40"}`} />
              <span className="mt-1 text-xs font-bold">{m.name.replace(" Operations", "")}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
