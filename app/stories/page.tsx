import type { Metadata } from "next";
import { CTAStripe } from "@/components/CTAStripe";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/data/content";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Real stories of transformation from communities served by Humanity Worldwide across East Africa.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Voices from the field"
        subtitle="Behind every statistic is a person whose life has been changed. These are their stories."
        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80"
      />

      <section className="section-padding bg-white">
        <div className="container-content space-y-10">
          {stories.map((story, index) => (
            <Reveal key={story.slug} delay={index * 0.1}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTAStripe />
    </>
  );
}
