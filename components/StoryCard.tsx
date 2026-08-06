import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/types";
import { ArrowRight, Quote } from "lucide-react";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const programHref = story.programSlug
    ? `/our-work/${story.programSlug}`
    : undefined;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem_1rem_2.5rem_1rem] border border-sand-deep/20 bg-gradient-to-br from-white to-[#F6F9FB] px-8 py-10 text-center transition-all duration-500 ease-in-out hover:-translate-y-2 hover:rounded-[1rem_2.5rem_1rem_2.5rem] hover:border-teal/20 hover:shadow-2xl hover:shadow-teal/5 md:px-8">
      <span className="pointer-events-none absolute -left-6 -top-10 select-none font-serif text-[12rem] font-bold italic leading-none text-teal/[0.04] transition-all duration-700 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:scale-110 group-hover:text-coral/[0.05]">
        &ldquo;
      </span>

      <div className="absolute left-0 right-0 top-0 z-10 h-[3px] origin-center scale-x-0 bg-teal/60 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="relative z-10 flex h-full flex-col items-center">
        {story.program && programHref && (
          <Link
            href={programHref}
            className="mb-4 rounded-full bg-teal-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-text transition-colors hover:bg-teal hover:text-white"
          >
            {story.program} program
          </Link>
        )}

        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-teal-soft/40 text-teal transition-all duration-500 group-hover:bg-teal group-hover:text-white">
          <Quote className="h-5 w-5 fill-current" />
        </div>

        <blockquote className="flex-1 font-display text-lg font-medium leading-relaxed text-navy transition-colors duration-300 group-hover:text-navy-deep md:text-xl">
          &ldquo;{story.quote}&rdquo;
        </blockquote>

        <div className="mx-auto my-6 h-[1.5px] w-10 bg-sand-deep/40 transition-all duration-500 group-hover:w-20 group-hover:bg-teal/50" />

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
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-coral">
              {story.role}
            </p>
          </div>
        </div>

        <div className="mt-6 flex w-full flex-col gap-2">
          <Link
            href={`/stories/${story.slug}`}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
          >
            Read full story
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {programHref && (
            <Link
              href={programHref}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-ink/50 transition-colors hover:text-navy"
            >
              View {story.program} project
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
