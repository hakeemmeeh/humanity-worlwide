"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Phone, Mail, MapPin } from "lucide-react";
import { organization } from "@/data/content";
import { VideoLightbox } from "@/components/VideoLightbox";
import Image from "next/image";

const contactItems = [
  {
    icon: Phone,
    label: "Call Us",
    value: organization.contact.phone,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: organization.contact.email,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: organization.contact.address,
  },
];

export function VideoParallaxSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[500px] overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
        style={{ y }}
      >
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
          alt="Children in a humanitarian setting"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-6 py-20 text-center">
        {/* Play button */}
        <motion.button
          onClick={() => setLightboxOpen(true)}
          className="group relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/50 transition-colors hover:border-white cursor-pointer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Play our story video"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/30" />
          <Play className="h-10 w-10 text-white transition-transform group-hover:scale-110" />
        </motion.button>

        <h3 className="mb-2 font-display text-2xl font-semibold tracking-wide text-white md:text-3xl">
          Watch Our Story
        </h3>
        <p className="max-w-md text-sm text-white/70">
          See how your support is transforming lives across communities
        </p>

        {/* Contact info row */}
        <div className="mt-14 flex flex-wrap items-start justify-center gap-10 md:gap-16">
          {contactItems.map((item) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center gap-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E87461]/20">
                <item.icon className="h-6 w-6 text-[#E87461]" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                {item.label}
              </span>
              <span className="max-w-[200px] text-sm text-white/90">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <VideoLightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
