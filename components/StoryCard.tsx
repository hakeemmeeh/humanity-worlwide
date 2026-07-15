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
      className="group relative block h-full overflow-hidden rounded-2xl bg-white border border-sand-deep/30 px-8 py-10 md:px-12 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/5 hover:border-teal/20"
    >
      {/* Top accent line that grows on hover */}
      <div className="absolute top-0 left-0 right-0 z-10 h-[3px] bg-teal/60 scale-x-0 origin-center transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="relative flex flex-col items-center h-full">
        {/* Centered quote ring icon */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal-soft/40 text-teal transition-all duration-500 group-hover:bg-teal group-hover:text-white select-none">
          <Quote className="h-5 w-5 fill-current" />
        </div>

        {/* Testimonial Quote */}
        <blockquote className="font-display text-lg font-medium leading-relaxed text-navy md:text-xl flex-1 select-none">
          &ldquo;{story.quote}&rdquo;
        </blockquote>

        {/* Centered thin divider line */}
        <div className="mx-auto my-6 h-[1.5px] w-10 bg-sand-deep/40 transition-all duration-500 group-hover:w-20 group-hover:bg-teal/50" />

        {/* Profile elements */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-sand-deep/30 transition-all duration-500 group-hover:ring-teal/50">
            <Image
              src={story.image}
              alt={story.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <p className="font-display text-base font-bold text-navy transition-colors duration-300 group-hover:text-teal">
              {story.name}
            </p>
            <p className="text-xs font-semibold text-coral uppercase tracking-wider mt-0.5 select-none">
              {story.role}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
