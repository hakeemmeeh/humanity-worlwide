"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HandsMark } from "@/components/HandsMark";
import { Reveal } from "@/components/Reveal";
import { StatBlock } from "@/components/StatBlock";
import { impactStats } from "@/data/content";

import Image from "next/image";

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
      {/* Parallax background image */}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/85" />

      <HandsMark className="pointer-events-none absolute -right-32 -top-32 z-[1] h-[500px] w-[500px] text-white opacity-[0.06]" />
      <HandsMark className="pointer-events-none absolute -bottom-40 -left-40 z-[1] h-[400px] w-[400px] text-white opacity-[0.05]" />

      <div className="container-content relative z-[2] px-6 md:px-8">
        <Reveal direction="fade" duration={1}>
          <p className="eyebrow text-teal">Our Impact</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-white md:text-4xl">
            Measurable change across communities
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {impactStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1} direction="zoom">
              <StatBlock stat={stat} variant="dark" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
