"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { VideoLightbox } from "@/components/VideoLightbox";

interface VideoItem {
  id: string;
  youtubeId?: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
}

const featuredVideo = {
  youtubeId: "L3wKzyIN1yk", // Representative UNICEF/humanitarian story
  title: " principled Presence — Kapoeta & Torit Field Operations",
  location: "Eastern Equatoria, South Sudan",
  description: "A detailed cinematic look at our teams navigating remote counties, coordinating water security networks, and delivering direct educational classrooms under local community ownership.",
};

const videosList: VideoItem[] = [
  {
    id: "wash-distribution",
    youtubeId: "L3wKzyIN1yk",
    category: "WASH",
    title: "Rehabilitating Boreholes & Direct Distribution in Jonglei",
    location: "Jonglei State",
    description: "Witness our engineering teams upgrading active clean water stations and conducting hygiene training sessions for local mothers.",
    image: "https://images.unsplash.com/photo-1541913772-247f9c4b40f4?w=800&q=80",
  },
  {
    id: "kapoeta-education",
    youtubeId: "L3wKzyIN1yk",
    category: "Education",
    title: "Kapotea South UNICEF Classroom Construction Milestones",
    location: "Kapoeta South",
    description: "Follow the construction progress of twelve permanent educational blocks replacing learning under trees.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
  },
  {
    id: "nfi-delivery",
    category: "Protection",
    title: "Last-Mile Non-Food Items (NFI) Refugee Response [Coming Soon]",
    location: "Sudan Border Crossing",
    description: "Emergency shelter kits, solar lights, and dignity packages distributed to families displaced by sudden local floods.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  },
];

export default function MediaHubPage() {
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
  const [lightboxVideoId, setLightboxVideoId] = useState<string | null>(null);

  return (
    <>
      <PageHero
        title="Film & Field Media"
        subtitle="Cinematic field documentaries, impact reports, and program video diaries from our teams across South Sudan and Somalia."
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
        eyebrow="Documentary Hub"
      />

      {/* Featured Video Player Area */}
      <section className="section-padding bg-[#F6F9FC]">
        <div className="container-content">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-handwriting text-3xl text-coral block -mb-1 rotate-[-2deg] select-none">
              Featured Documentary
            </span>
            <p className="eyebrow justify-center">Now Playing</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl text-navy">
              principled Presence
            </h2>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-sand-deep/40 bg-white shadow-xl">
            {/* Embedded Player / Custom Cover */}
            <div className="relative aspect-video bg-navy-deep flex items-center justify-center overflow-hidden">
              {activeYoutubeId === featuredVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1&rel=0`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <>
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
                    alt={featuredVideo.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-700 hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/45" />

                  <div className="relative z-10 flex flex-col items-center p-6 text-center">
                    <motion.button
                      onClick={() => setActiveYoutubeId(featuredVideo.youtubeId)}
                      className="group relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-xs transition-colors hover:border-white cursor-pointer"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="Play featured documentary"
                    >
                      <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/30" />
                      <Play className="h-10 w-10 text-white fill-white transition-transform group-hover:scale-110" />
                    </motion.button>
                    <span className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/95 select-none">
                      Click to Stream Film
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Video description footer */}
            <div className="p-6 md:p-8 bg-white border-t border-sand-deep/40">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-coral font-bold uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {featuredVideo.location}
                </span>
                <span>• Live Overview</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-navy leading-snug">
                {featuredVideo.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 max-w-3xl">
                {featuredVideo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid List Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-content">
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold text-navy">
              More Stories from the Field
            </h3>
            <p className="text-sm text-ink/50 mt-1">
              Browse secondary campaign recordings and field training reports
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videosList.map((video) => (
              <div
                key={video.title}
                className="group relative flex flex-col rounded-2xl bg-white border border-sand-deep/40 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:border-teal/20"
              >
                {/* Cover Image with play trigger */}
                <div className="relative aspect-video overflow-hidden bg-navy-deep">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/25" />

                  {video.youtubeId ? (
                    <button
                      onClick={() => setLightboxVideoId(video.youtubeId!)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none"
                      aria-label={`Play ${video.title}`}
                    >
                      <span className="rounded-full bg-white/95 p-3 text-navy transition-all duration-300 group-hover:bg-teal group-hover:text-white group-hover:scale-110 shadow-md">
                        <Play className="h-5 w-5 fill-current" />
                      </span>
                    </button>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/60 backdrop-blur-xs text-[10px] font-bold tracking-widest text-white uppercase px-3 py-1.5 rounded-full select-none">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-white/95 border border-sand-deep/40 text-navy font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {video.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-coral uppercase tracking-wider mb-2">
                    <MapPin className="h-3 w-3" />
                    {video.location}
                  </div>
                  <h4 className="font-display text-base font-semibold text-navy leading-snug group-hover:text-teal transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-ink/70 leading-relaxed mt-2 flex-1">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for secondary grid video plays */}
      <VideoLightbox
        isOpen={!!lightboxVideoId}
        onClose={() => setLightboxVideoId(null)}
      />
    </>
  );
}
