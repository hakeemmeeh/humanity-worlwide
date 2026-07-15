"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string; // YouTube embed URL
}

export function VideoLightbox({
  isOpen,
  onClose,
  videoUrl = "https://www.youtube.com/embed/YpS_Z3P4n3M", // High-quality looping humanitarian video
}: VideoLightboxProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-10"
          onClick={onClose}
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 hover:rotate-90 z-[10000]"
            aria-label="Close video player"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.93, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.93, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${videoUrl}?autoplay=1&mute=0`}
              title="Humanity Worldwide Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
