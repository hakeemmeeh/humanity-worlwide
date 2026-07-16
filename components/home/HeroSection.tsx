"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { heroSlides } from "@/data/content";
import { VideoLightbox } from "@/components/VideoLightbox";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

import { ShapeDivider } from "@/components/ShapeDivider";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const slide = heroSlides[activeIndex];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[75vh] min-h-[580px] max-h-[780px] w-full items-center overflow-hidden bg-navy"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}>
        {heroSlides.map((s, i) => (
          <Image
            key={s.headline}
            src={s.image}
            alt={s.imageAlt}
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "contrast(1.08) saturate(1.15) brightness(0.92)" }}
            sizes="100vw"
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy/55 to-transparent z-[1]" />

      <div className="container-content relative w-full px-6 py-20 md:px-8 z-[2]">
        <div className="flex items-center justify-between gap-8">
          <motion.div
            style={prefersReducedMotion ? undefined : { y: textY }}
            className="flex-1"
          >
            <motion.div
              key={slide.headline}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                },
              }}
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-handwriting text-3xl text-teal/95 rotate-[-2deg] origin-left mb-1 block select-none"
              >
                Together we are stronger
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow text-teal"
              >
                {slide.eyebrow}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-[1.1] text-white"
              >
                {slide.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
              >
                {slide.subheadline}
              </motion.p>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button href="/get-involved">Donate Now</Button>
                <Button href="/our-work" variant="ghost">
                  Explore Our Work
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Video play button */}
          <Link
            href="/media"
            className="group hidden shrink-0 lg:flex z-[2] cursor-pointer"
            aria-label="Watch our story films"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/60 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white/10">
                <Play className="h-8 w-8 fill-white text-white transition-transform duration-300 group-hover:scale-110" />
                {/* Pulse ring */}
                <span className="absolute inset-0 animate-ping rounded-full border border-white/30" style={{ animationDuration: "2s" }} />
              </span>
            </motion.div>
          </Link>
        </div>

        {heroSlides.length > 1 && (
          <div className="mt-12 flex gap-2 z-[2]">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                  i === activeIndex
                    ? "w-8 bg-teal"
                    : "w-4 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Show slide ${i + 1}: ${heroSlides[i].headline}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Wave shape divider */}
      <ShapeDivider color="#FFFFFF" className="bottom-0 z-10" />
      <VideoLightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
