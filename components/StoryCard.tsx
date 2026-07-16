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
      className="group relative block h-full overflow-hidden rounded-[2.5rem_1rem_2.5rem_1rem] bg-gradient-to-br from-white to-[#F6F9FB] border border-sand-deep/20 px-8 py-12 md:px-10 text-center transition-all duration-500 ease-in-out hover:rounded-[1rem_2.5rem_1rem_2.5rem] hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal/5 hover:border-teal/20"
    >
      {/* Giant Floating Quote Graphic in Background */}
      <span className="absolute -top-10 -left-6 text-teal/[0.04] font-serif text-[12rem] leading-none font-bold italic select-none pointer-events-none transition-all duration-700 ease-out group-hover:scale-110 group-hover:text-coral/[0.05] group-hover:translate-x-2 group-hover:translate-y-2">
        &ldquo;
      </span>

      {/* Top accent line that grows on hover */}
      <div className="absolute top-0 left-0 right-0 z-10 h-[3px] bg-teal/60 scale-x-0 origin-center transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="relative flex flex-col items-center h-full z-10">
        {/* Centered quote ring icon */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal-soft/40 text-teal transition-all duration-500 group-hover:bg-teal group-hover:text-white select-none">
          <Quote className="h-5 w-5 fill-current" />
        </div>

        {/* Testimonial Quote */}
        <blockquote className="font-display text-lg font-medium leading-relaxed text-navy md:text-xl flex-1 select-none transition-colors duration-300 group-hover:text-navy-deep">
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
              className="object-cover transition-transform duration-500 group-hover:scale-110"
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
