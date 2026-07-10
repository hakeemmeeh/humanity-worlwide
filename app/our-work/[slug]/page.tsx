import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { CTAStripe } from "@/components/CTAStripe";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StatBlock } from "@/components/StatBlock";
import { Testimonial } from "@/components/Testimonial";
import { getProgramBySlug, programs, stories } from "@/data/content";

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
    title: program.title,
    description: program.description,
    openGraph: {
      title: `${program.title} — ${program.tagline}`,
      description: program.description,
      images: [{ url: program.image }],
    },
  };
}

export default function ProgramPage({ params }: Props) {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  const relatedStory = stories.find((s) =>
    s.program?.toLowerCase().includes(program.title.split(" ")[0].toLowerCase())
  );

  return (
    <>
      <PageHero
        eyebrow={program.tagline}
        title={program.title}
        subtitle={program.description}
        image={program.image}
        imageAlt={`${program.title} program — ${program.tagline}`}
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <div className="grid gap-8 sm:grid-cols-3">
            {program.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <StatBlock stat={stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

      {program.regions && (
        <section className="section-padding bg-white">
          <div className="container-content">
            <Reveal>
              <p className="eyebrow">Active Regions</p>
              <h2 className="font-display text-3xl font-semibold">
                Where this program operates
              </h2>
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

      <CTAStripe />
    </>
  );
}
