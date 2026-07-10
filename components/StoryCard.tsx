import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/types";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="grid md:grid-cols-5">
        <div className="relative aspect-square md:col-span-2 md:aspect-auto">
          <Image
            src={story.image}
            alt={story.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-8">
          {story.program && (
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">
              {story.program}
            </span>
          )}
          <blockquote className="font-display text-xl font-medium italic leading-relaxed text-navy md:text-2xl">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-navy">{story.name}</p>
            <p className="text-sm text-ink/60">{story.role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
