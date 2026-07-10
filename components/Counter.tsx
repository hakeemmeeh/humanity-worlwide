"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplay(Math.floor(easeOutCubic(progress) * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, duration, prefersReducedMotion]);

  const formatted = display.toLocaleString();

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
