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
      className="group block h-full overflow-hidden rounded-2xl bg-white border border-sand-deep/30 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-teal/30"
    >
      <div className="relative flex flex-col justify-between h-full">
        {/* Quote mark ornament */}
        <div className="absolute right-0 top-0 opacity-10 text-teal pointer-events-none">
          <Quote className="h-16 w-16 fill-current" />
        </div>

        <div className="relative z-10 flex-1">
          {story.program && (
            <span className="inline-block rounded-full bg-teal-soft/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-text">
              {story.program}
            </span>
          )}
          <blockquote className="mt-5 font-display text-lg font-medium leading-relaxed text-[#1E3E39]/90 md:text-xl">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
        </div>

        {/* Separator line */}
        <div className="my-6 h-[1px] w-12 bg-teal/30 transition-all duration-300 group-hover:w-20 group-hover:bg-teal" />

        {/* Profile and Meta */}
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-teal-soft shadow-inner">
            <Image
              src={story.image}
              alt={story.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-navy group-hover:text-teal transition-colors">
              {story.name}
            </p>
            <p className="text-xs text-ink/50 mt-0.5 truncate">{story.role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
