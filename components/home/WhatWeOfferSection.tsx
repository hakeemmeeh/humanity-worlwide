"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Droplets, BookOpen, Tractor } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";

interface OfferItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  href: string;
}

const offers: OfferItem[] = [
  {
    title: "Disaster & Emergency Response",
    description: "Providing immediate, lifesaving distribution of food, medical packages, clean water, and temporary shelters to communities displaced by climate disasters and conflict.",
    icon: <Heart className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=800&q=80",
    href: "/our-work",
  },
  {
    title: "Clean Water & Sanitation (WASH)",
    description: "Constructing deep solar-powered water wells, establishing community sanitation blocks, and running hygiene education workshops to prevent waterborne illnesses.",
    icon: <Droplets className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1541959837-9759bc1ba255?w=800&q=80",
    href: "/our-work/wash",
  },
  {
    title: "Education & Child Protection",
    description: "Rehabilitating schools, establishing child-friendly safe spaces in refugee camps, distributing textbooks, and providing training for local educators.",
    icon: <BookOpen className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    href: "/our-work/education",
  },
  {
    title: "Sustainable Livelihoods",
    description: "Distributing seeds, modern farm tools, and irrigation equipment alongside vocational training classes to promote micro-commerce and food independence.",
    icon: <Tractor className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    href: "/our-work/livelihoods",
  },
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
    const cardWidth = container.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? container.clientWidth;
    const gap = 24; // gap-6 = 24px
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

  const handleMouseUp = (e: React.MouseEvent) => {
    isDown.current = false;
    // Delay setting dragging to false slightly to prevent immediate link click triggers
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

  const handleLinkClick = (e: React.MouseEvent) => {
    // If the user dragged more than 5 pixels, prevent navigation
    if (dragDistance.current > 5) {
      e.preventDefault();
    }
  };

  return (
    <section className="section-padding bg-[#F8F9FA] relative overflow-hidden border-t border-sand-deep/30 select-none">
      <div className="container-content">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow text-teal">What We Offer</p>
            <h2 className="max-w-2xl font-display text-3xl font-semibold md:text-4xl text-navy mt-1">
              Delivering Sustainable Humanitarian Solutions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <Button href="/our-work" variant="ghost" className="hidden sm:inline-flex">
                Explore All Programs
              </Button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-deep/60 bg-white text-navy shadow-sm transition-all duration-300 hover:bg-teal hover:text-white hover:border-teal hover:scale-105"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-deep/60 bg-white text-navy shadow-sm transition-all duration-300 hover:bg-teal hover:text-white hover:border-teal hover:scale-105"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scrollable Drag Carousel */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`mt-12 flex gap-6 overflow-x-auto pb-6 scrollbar-none transition-all duration-150 ${
            isDragging ? "snap-none cursor-grabbing" : "snap-x snap-mandatory cursor-grab"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {offers.map((item, index) => (
            <div
              key={item.title}
              className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-start"
            >
              <Reveal delay={index * 0.08} className="h-full">
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl bg-navy-deep shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-teal/30 border border-transparent"
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-60 pointer-events-none"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent transition-all duration-300 group-hover:via-navy-deep/75 pointer-events-none" />

                  {/* Icon Card Bubble */}
                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 transition-all duration-300 group-hover:bg-teal group-hover:border-teal group-hover:scale-110 pointer-events-none">
                    {item.icon}
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 p-6 md:p-8 pointer-events-none">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-teal-soft transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/70 line-clamp-3 leading-relaxed transition-all duration-300 group-hover:text-white/90">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-teal transition-all duration-300 group-hover:text-white group-hover:translate-x-1.5">
                      Learn More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
