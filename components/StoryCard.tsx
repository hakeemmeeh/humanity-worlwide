import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/types";
import { Quote } from "lucide-react";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group relative block h-full overflow-hidden rounded-2xl bg-white border border-sand-deep/20 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/8 hover:border-teal/25"
    >
      {/* Teal accent bar at the top — grows on hover */}
      <div className="absolute top-0 left-0 right-0 z-10 h-[3px] bg-teal/60 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="relative flex flex-col justify-between h-full">
        {/* Subtle Quote Watermark */}
        <div className="absolute -right-3 -top-4 text-sand-deep/20 pointer-events-none transition-all duration-700 ease-out group-hover:text-teal/10 group-hover:scale-105">
          <Quote className="h-24 w-24 fill-current" />
        </div>

        <div className="relative z-10 flex-1">
          {story.program && (
            <span className="inline-block rounded-full bg-teal-soft/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-text">
              {story.program}
            </span>
          )}
          <blockquote className="mt-5 font-display text-lg font-medium leading-relaxed text-[#1E3E39]/90 md:text-xl">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
        </div>

        {/* Elegant Separator line */}
        <div className="my-7 h-[1.5px] w-10 bg-sand-deep/30 transition-all duration-700 ease-in-out group-hover:w-20 group-hover:bg-teal/50" />

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-sand-deep/20 transition-all duration-500 group-hover:ring-teal/40">
            <Image
              src={story.image}
              alt={story.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-navy transition-colors duration-300 group-hover:text-teal">
              {story.name}
            </p>
            <p className="text-xs text-ink/45 mt-0.5 truncate">{story.role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
