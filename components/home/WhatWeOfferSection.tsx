"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface GalleryItem {
  image: string;
  widthClass: string;
  heightClass: string;
  aspectClass: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  {
    image: "/images/livelihoods-community-group.jpg",
    widthClass: "w-[320px]",
    heightClass: "h-[240px]",
    aspectClass: "aspect-[4/3]",
    alt: "Humanity Worldwide community group",
  },
  {
    image: "/images/wash-water-distribution.jpg",
    widthClass: "w-[280px]",
    heightClass: "h-[380px]",
    aspectClass: "aspect-[3/4]",
    alt: "Clean water distribution",
  },
  {
    image: "/images/food-security-cooperative.jpg",
    widthClass: "w-[300px]",
    heightClass: "h-[300px]",
    aspectClass: "aspect-square",
    alt: "Agricultural cooperative rice milling",
  },
  {
    image: "/images/shelter-koica-house.jpg",
    widthClass: "w-[290px]",
    heightClass: "h-[370px]",
    aspectClass: "aspect-[3/4]",
    alt: "KOICA-funded transitional shelter",
  },
  {
    image: "/images/protection-wheelchairs.jpg",
    widthClass: "w-[320px]",
    heightClass: "h-[240px]",
    aspectClass: "aspect-[4/3]",
    alt: "Protection services and disability support",
  },
  {
    image: "/images/emergency-boat-donation.jpg",
    widthClass: "w-[320px]",
    heightClass: "h-[240px]",
    aspectClass: "aspect-[4/3]",
    alt: "UNHCR emergency boat donation",
  },
  {
    image: "/images/where-we-work-somalia.jpg",
    widthClass: "w-[280px]",
    heightClass: "h-[380px]",
    aspectClass: "aspect-[3/4]",
    alt: "Golool Yaryar program location sign",
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

        {/* Horizontal varying aspect ratios swiper container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`mt-16 flex items-center gap-8 overflow-x-auto pb-4 scrollbar-none transition-all duration-150 ${
            isDragging ? "snap-none cursor-grabbing" : "snap-x snap-mandatory cursor-grab"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryItems.map((item, index) => (
            <div
              key={`${item.image}-${index}`}
              className={`${item.widthClass} ${item.heightClass} ${item.aspectClass} flex-shrink-0 snap-start relative overflow-hidden rounded-none border border-sand-deep/30 shadow-md transition-transform duration-500 hover:scale-105`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                draggable={false}
                className="object-cover pointer-events-none"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
