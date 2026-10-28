import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/Button";
import { CTAStripe } from "@/components/CTAStripe";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Testimonial } from "@/components/Testimonial";
import { getProgramBySlug, programs } from "@/data/content";
import { getStories } from "@/lib/published-content";
import { seoTitle, clip } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const program = getProgramBySlug(params.slug);
  if (!program) return { title: "Program" };
  return {
    title: seoTitle(program.title),
    alternates: { canonical: `/our-work/${program.slug}` },
    description: clip(program.description),
    openGraph: {
      title: `${program.title} — ${program.tagline}`,
      description: clip(program.description),
      images: [{ url: program.image }],
    },
  };
}

export default async function ProgramPage({ params }: Props) {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  const stories = await getStories();
  const relatedStory = stories.find((s) => s.programSlug === program.slug);

  return (
    <>
      <PageHero
        eyebrow={program.tagline}
        title={program.title}
        subtitle={program.description}
        image={program.image}
        imageAlt={`${program.title} program — ${program.tagline}`}
      />

      {program.regions && (
        <section className="section-padding bg-white">
          <div className="container-content">
            <Reveal>
              <p className="eyebrow">Where We Implemented</p>
              <h2 className="font-display text-3xl font-semibold">
                Implementation locations
              </h2>
              <p className="mt-3 max-w-2xl text-ink/70">
                This program has been delivered in the following areas.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {program.regions.map((region) => (
                <span
                  key={region}
                  className="rounded-full bg-teal-soft px-5 py-2 text-sm font-semibold text-teal-text"
                >
                  {region}
                </span>
              ))}
            </div>
            <Link
              href="/where-we-work"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
            >
              View all regions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {program.approach && (
        <section className="section-padding bg-sand">
          <div className="container-content grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow">Our Approach</p>
              <h2 className="font-display text-3xl font-semibold">
                How we deliver impact
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                {program.approach}
              </p>
              <div className="mt-8">
                <Button href="/get-involved">Support This Program</Button>
              </div>
            </Reveal>
            {relatedStory && (
              <Reveal delay={0.15}>
                <Testimonial story={relatedStory} />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {program.highlights && (
        <section className="section-padding bg-white">
          <div className="container-content">
            <Reveal>
              <p className="eyebrow">Program Highlights</p>
              <h2 className="font-display text-3xl font-semibold">
                What we deliver
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {program.highlights.map((highlight, index) => (
                <Reveal key={highlight} delay={index * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl bg-sand p-6 shadow-card">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                    <p className="text-ink/80">{highlight}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {program.priorities && program.priorities.length > 0 && (
        <section id="priorities" className="section-padding border-t border-sand-deep/40 bg-white">
          <div className="container-content">
            <Reveal>
              <p className="eyebrow">Our Programming Priorities</p>
              <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
                How we build {program.title.toLowerCase()}
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {program.priorities.map((priority, index) => (
                <Reveal key={priority.title} delay={(index % 2) * 0.08} className="flex">
                  <article className="flex w-full flex-col rounded-2xl bg-sand p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <h3 className="pt-1.5 font-display text-xl font-semibold text-navy">{priority.title}</h3>
                    </div>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
                      {priority.intro.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                      {priority.lead && <p className="font-medium text-navy">{priority.lead}</p>}
                    </div>
                    {priority.items && priority.items.length > 0 && (
                      <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm text-ink/80 sm:grid-cols-2">
                        {priority.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-text" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {program.gallery && program.gallery.length > 0 && (
        <section className="section-padding bg-sand">
          <div className="container-content">
            <Reveal>
              <p className="eyebrow">In the Field</p>
              <h2 className="font-display text-3xl font-semibold">
                Program gallery
              </h2>
            </Reveal>
            <div className="mt-10">
              <Gallery images={program.gallery} altPrefix={program.title} />
            </div>
          </div>
        </section>
      )}

      <CTAStripe variant="navy" />
    </>
  );
}
