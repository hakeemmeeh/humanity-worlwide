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
      className="group relative block h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#F8F9FA] border border-sand-deep/30 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal/10 hover:border-teal/30"
    >
      <div className="relative flex flex-col justify-between h-full z-10">
        {/* Dynamic Quote Watermark */}
        <div className="absolute -right-4 -top-6 z-0 text-teal/5 transition-all duration-700 ease-out pointer-events-none group-hover:scale-110 group-hover:-rotate-6 group-hover:text-teal/10">
          <Quote className="h-32 w-32 fill-current" />
        </div>

        <div className="relative z-10 flex-1">
          {story.program && (
            <span className="inline-block rounded-full bg-teal-soft/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-text transition-colors duration-500 group-hover:bg-teal-soft/60">
              {story.program}
            </span>
          )}
          <blockquote className="mt-6 font-display text-lg font-medium leading-relaxed text-[#1E3E39]/90 md:text-xl relative z-10">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
        </div>

        {/* Elegant Separator line */}
        <div className="my-8 h-[1px] w-12 bg-teal/20 transition-all duration-700 ease-in-out group-hover:w-full group-hover:bg-teal/50" />

        {/* Profile and Meta */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-500 group-hover:ring-teal/30 group-hover:shadow-[0_0_15px_rgba(42,196,186,0.4)]">
            <Image
              src={story.image}
              alt={story.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="56px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-navy group-hover:text-teal transition-colors duration-300">
              {story.name}
            </p>
            <p className="text-xs text-ink/50 mt-0.5 truncate">{story.role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
