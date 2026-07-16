"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface GalleryItem {
  image: string;
  alt: string;
  title: string;
  description: string;
}

const galleryItems = [
  {
    image: "/images/livelihoods-community-group.jpg",
    alt: "Humanity Worldwide community group",
    title: "Livelihoods",
    description: "Economic independence & vocational training",
  },
  {
    image: "/images/wash-water-distribution.jpg",
    alt: "Clean water distribution",
    title: "WASH",
    description: "Clean water and healthy communities",
  },
  {
    image: "/images/food-security-cooperative.jpg",
    alt: "Agricultural cooperative rice milling",
    title: "Food Security",
    description: "Agricultural support & cooperatives",
  },
  {
    image: "/images/shelter-koica-house.jpg",
    alt: "KOICA-funded transitional shelter",
    title: "Shelter",
    description: "Safe homes for displaced families",
  },
  {
    image: "/images/protection-wheelchairs.jpg",
    alt: "Protection services and disability support",
    title: "Protection",
    description: "Safety, dignity, and rights",
  },
  {
    image: "/images/emergency-boat-donation.jpg",
    alt: "UNHCR emergency boat donation",
    title: "Emergency Response",
    description: "Rapid humanitarian action",
  },
  {
    image: "/images/where-we-work-somalia.jpg",
    alt: "Golool Yaryar program location sign",
    title: "Global Presence",
    description: "Delivering solutions across East Africa",
  }
];

export function WhatWeOfferSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const firstChild = container.querySelector<HTMLElement>(":scope > div");
    const cardWidth = firstChild?.offsetWidth ?? container.clientWidth;
    const gap = 32; // gap-8 = 32px
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    dragDistance.current = Math.abs(x - startX.current);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden select-none">
      {/* Background horizontal guide strip behind varying height images */}
      <div className="absolute left-0 right-0 top-[60%] h-[120px] -translate-y-1/2 bg-[#F8F9FA] -z-10 border-y border-sand-deep/20" />

      <div className="container-content">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal direction="left">
            <span className="font-handwriting text-3xl text-coral block -mb-1 rotate-[-1deg] select-none">
              Our dedication
            </span>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-navy/60">
              What We Offer
            </p>
            <h2 className="max-w-2xl font-display text-4xl font-semibold md:text-5xl leading-tight text-[#1C1C1C] mt-2">
              Empowering local communities and building a sustainable future
            </h2>
          </Reveal>
          <Reveal delay={0.1} direction="right">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="inline-block bg-[#6C8D98] hover:bg-[#5B7B86] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-none shadow-sm"
              >
                More About Us
              </Link>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-deep/60 bg-white text-navy shadow-sm transition-all duration-300 hover:bg-teal hover:text-white hover:border-teal"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-deep/60 bg-white text-navy shadow-sm transition-all duration-300 hover:bg-teal hover:text-white hover:border-teal"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Full width swiper container with exactly 1 card on mobile, 2 on desktop */}
        <div className="mt-16 w-full">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex items-center gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none transition-all duration-150 ${
              isDragging ? "snap-none cursor-grabbing" : "snap-x snap-mandatory cursor-grab"
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryItems.map((item, index) => (
              <div
                key={`${item.image}-${index}`}
                className={`w-full md:w-[calc(50%-12px)] aspect-square md:aspect-[4/3] flex-shrink-0 snap-start relative overflow-hidden rounded-none border border-sand-deep/30 shadow-md transition-all duration-500 group`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  draggable={false}
                  className="object-cover pointer-events-none transition-transform duration-700 lg:group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay: Always visible on mobile, fade in on hover for desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent opacity-100 lg:opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100 pointer-events-none" />
                
                {/* Centered Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-coral text-white flex items-center justify-center transform scale-100 lg:scale-0 transition-transform duration-500 delay-100 lg:group-hover:scale-100 shadow-lg">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>

                {/* Text Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-0 lg:translate-y-8 opacity-100 lg:opacity-0 transition-all duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 pointer-events-none">
                  <h3 className="font-display font-semibold text-3xl text-white mb-3">{item.title}</h3>
                  <p className="text-white/90 text-base leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
