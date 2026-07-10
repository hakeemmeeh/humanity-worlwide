"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { heroSlides } from "@/data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = heroSlides[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
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
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy/70 to-navy/40" />

      <div className="container-content relative w-full px-6 py-32 md:px-8">
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
            className="eyebrow text-teal"
          >
            {slide.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-display text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.1] text-white"
          >
            {slide.headline}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl"
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

        {heroSlides.length > 1 && (
          <div className="mt-12 flex gap-2">
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
    </section>
  );
}
