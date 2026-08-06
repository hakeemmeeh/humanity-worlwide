"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { HandsMark } from "@/components/HandsMark";
import { Reveal } from "@/components/Reveal";
import { impactAreas } from "@/data/content";

export function ImpactStatsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-24"
      style={{ isolation: "isolate" }}
    >
      <motion.div
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
        style={{ y: bgY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-navy/85" />

      <HandsMark className="pointer-events-none absolute -right-32 -top-32 z-[1] h-[500px] w-[500px] text-white opacity-[0.06]" />
      <HandsMark className="pointer-events-none absolute -bottom-40 -left-40 z-[1] h-[400px] w-[400px] text-white opacity-[0.05]" />

      <div className="container-content relative z-[2] px-6 md:px-8">
        <Reveal direction="fade" duration={1}>
          <span className="font-handwriting text-3xl text-amber-400 block mb-3 rotate-[-2deg] select-none">
            Every contribution counts!
          </span>
          <p className="eyebrow text-teal">Our Impact</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-white md:text-4xl">
            Meaningful change across communities
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {impactAreas.map((area, index) => (
            <Reveal key={area.label} delay={index * 0.1} direction="zoom">
              <div className="border-l-4 border-teal py-2 pl-5 text-white">
                <p className="font-display text-2xl font-semibold md:text-3xl">
                  {area.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {area.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
