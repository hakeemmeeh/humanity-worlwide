"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { VideoLightbox } from "@/components/VideoLightbox";
import { stories } from "@/data/content";

export function StoriesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
    <section className="relative overflow-hidden w-full border-y border-sand-deep/30 bg-[#F6F9FC]">
      <div className="w-full grid lg:grid-cols-2 min-h-[580px]">
        {/* Left Column — Testimonials */}
        <div className="relative bg-navy-deep py-24 px-8 md:px-16 flex flex-col justify-center overflow-hidden">
          {/* Subtle Quote Watermark Background */}
          <div className="absolute top-8 left-8 text-white/5 pointer-events-none select-none">
            <Quote className="h-32 w-32 fill-current" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto w-full text-center">
            <Reveal direction="left">
              <span className="font-handwriting text-3xl text-teal block -mb-1 rotate-[-2deg] select-none">
                Their own voices
              </span>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">
                Testimonials
              </p>
              <h2 className="font-display text-3xl font-semibold md:text-4xl text-white mb-10">
                Words From People
              </h2>
            </Reveal>

            {/* Slider container */}
            <div className="relative mt-8">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                  {stories.map((story) => (
                    <div key={story.slug} className="min-w-0 flex-none w-full px-4">
                      <Link
                        href={`/stories/${story.slug}`}
                        className="group block select-none focus-visible:outline-none"
                      >
                        {/* Quote Text */}
                        <blockquote className="font-display text-lg md:text-xl font-medium leading-relaxed text-white/90 transition-colors duration-300 group-hover:text-teal">
                          &ldquo;{story.quote}&rdquo;
                        </blockquote>

                        {/* Centered Separator line */}
                        <div className="mx-auto my-6 h-[1.5px] w-10 bg-white/20 transition-all duration-500 group-hover:w-20 group-hover:bg-teal/50" />

                        {/* Profile Info */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-white/10 transition-all duration-500 group-hover:ring-teal/50">
                            <Image
                              src={story.image}
                              alt={story.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <p className="font-display text-base font-bold text-white transition-colors duration-300 group-hover:text-teal">
                              {story.name}
                            </p>
                            <p className="text-xs font-semibold text-coral uppercase tracking-wider mt-0.5">
                              {story.role}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!prevBtnEnabled}
                  aria-label="Previous story"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white hover:text-navy-deep hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!nextBtnEnabled}
                  aria-label="Next story"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white hover:text-navy-deep hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Video Parallax Trigger */}
        <div className="relative min-h-[450px] lg:min-h-full overflow-hidden flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
            alt="Children in a humanitarian setting"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 hover:bg-black/50" />

          {/* Pulse Button block */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <motion.button
              onClick={() => setLightboxOpen(true)}
              className="group relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/50 transition-all hover:border-white cursor-pointer bg-white/5 backdrop-blur-xs"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Play our story video"
            >
              {/* Pulsing Ring Animation */}
              <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/30" />
              <Play className="h-10 w-10 text-white fill-white transition-transform group-hover:scale-110" />
            </motion.button>
            <span className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/80 select-none">
              Watch Our Story
            </span>
          </div>
        </div>
      </div>

      <VideoLightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
