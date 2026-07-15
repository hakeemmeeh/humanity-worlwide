"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "zoom" | "fade";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  distance?: number;
}

function getInitial(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { opacity: 0, y: distance };
    case "down":
      return { opacity: 0, y: -distance };
    case "left":
      return { opacity: 0, x: distance };
    case "right":
      return { opacity: 0, x: -distance };
    case "zoom":
      return { opacity: 0, scale: 0.9 };
    case "fade":
      return { opacity: 0 };
  }
}

function getAnimate(direction: Direction) {
  switch (direction) {
    case "up":
    case "down":
      return { opacity: 1, y: 0 };
    case "left":
    case "right":
      return { opacity: 1, x: 0 };
    case "zoom":
      return { opacity: 1, scale: 1 };
    case "fade":
      return { opacity: 1 };
  }
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  distance = 40,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={getInitial(direction, distance)}
      whileInView={getAnimate(direction)}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
