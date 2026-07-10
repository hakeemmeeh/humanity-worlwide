import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoryCard } from "@/components/StoryCard";
import { Reveal } from "@/components/Reveal";
import { stories } from "@/data/content";

export function StoriesSection() {
  return (
    <section className="section-padding bg-sand">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow">Success Stories</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-4xl">
              Voices from the field
            </h2>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
            >
              Read all stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 space-y-8">
          {stories.map((story, index) => (
            <Reveal key={story.slug} delay={index * 0.1}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
