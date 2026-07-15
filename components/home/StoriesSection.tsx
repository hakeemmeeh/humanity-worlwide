"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { StoryCard } from "@/components/StoryCard";
import { Reveal } from "@/components/Reveal";
import { stories } from "@/data/content";

export function StoriesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "center", 
    breakpoints: {
      '(min-width: 768px)': { align: "start" }
    }
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="section-padding bg-sand/35 relative overflow-hidden">
      <div className="container-content">
        <Reveal direction="right">
          <p className="eyebrow">Success Stories</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-4xl text-navy">
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

        <div className="relative mt-12">
          {/* Left arrow */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous story"
            className="absolute -left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-sand-deep/60 bg-white text-navy shadow-sm transition-all duration-300 hover:bg-teal hover:text-white hover:border-teal hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-navy disabled:hover:scale-100 disabled:cursor-not-allowed md:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next story"
            className="absolute -right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-sand-deep/60 bg-white text-navy shadow-sm transition-all duration-300 hover:bg-teal hover:text-white hover:border-teal hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-navy disabled:hover:scale-100 disabled:cursor-not-allowed md:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Embla Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-6">
              {stories.map((story, index) => (
                <div
                  key={story.slug}
                  className="min-w-0 flex-none pl-6 w-[85%] md:w-[50%] lg:w-[45%]"
                >
                  <Reveal delay={index * 0.1}>
                    <StoryCard story={story} />
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
