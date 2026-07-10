"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1], // premium out-expo ease curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
