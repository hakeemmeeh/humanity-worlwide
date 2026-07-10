import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAStripe } from "@/components/CTAStripe";
import { Reveal } from "@/components/Reveal";
import { Testimonial } from "@/components/Testimonial";
import { getStoryBySlug, stories } from "@/data/content";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const story = getStoryBySlug(params.slug);
  if (!story) return { title: "Story" };
  return {
    title: story.title,
    description: story.quote,
    openGraph: {
      title: story.title,
      description: story.quote,
      images: [{ url: story.image }],
    },
  };
}

export default function StoryDetailPage({ params }: Props) {
  const story = getStoryBySlug(params.slug);
  if (!story) notFound();

  return (
    <>
      <section className="section-padding bg-sand">
        <div className="container-content">
          <Breadcrumbs
            items={[
              { label: "Success Stories", href: "/stories" },
              { label: story.title },
            ]}
          />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              {story.program && (
                <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">
                  {story.program}
                </span>
              )}
              <h1 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
                {story.title}
              </h1>
              <blockquote className="mt-6 font-display text-xl italic leading-relaxed text-navy md:text-2xl">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-navy">{story.name}</p>
                <p className="text-sm text-ink/60">{story.role}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {story.body && (
        <section className="section-padding bg-white">
          <div className="container-content max-w-3xl">
            <div className="space-y-6">
              {story.body.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <p className="text-lg leading-relaxed text-ink/80">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-sand">
        <div className="container-content max-w-3xl">
          <Testimonial story={story} />
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
