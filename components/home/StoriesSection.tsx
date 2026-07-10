"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { StoryCard } from "@/components/StoryCard";
import { Reveal } from "@/components/Reveal";
import { stories } from "@/data/content";

export function StoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? container.clientWidth;
    const gap = 32; // gap-8 = 32px
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding bg-sand relative overflow-hidden">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow">Success Stories</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-4xl">
              Voices from the field
            </h2>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
            >
              Read all stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="relative mt-12 px-12">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous story"
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1E1E1E] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next story"
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1E1E1E] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {stories.map((story, index) => (
              <div
                key={story.slug}
                className="w-full flex-shrink-0 snap-start md:w-[calc(50%-1rem)]"
              >
                <Reveal delay={index * 0.1}>
                  <StoryCard story={story} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

