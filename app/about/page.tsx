import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Layers, Shield, Users } from "lucide-react";
import { CTAStripe } from "@/components/CTAStripe";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StatBlock } from "@/components/StatBlock";
import { StoryCard } from "@/components/StoryCard";
import {
  aboutQuickStats,
  organization,
  pillars,
  stories,
} from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: organization.mission,
};

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  chart: <BarChart3 className="h-6 w-6" />,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Dedicated to a better world"
        subtitle={organization.mission}
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
        imageAlt="Humanity Worldwide team working with community members in East Africa"
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
            {aboutQuickStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1} direction="zoom">
                <StatBlock stat={stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Our Pillars</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              What guides our work
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.id}
                delay={index * 0.12}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div className="flex gap-5 rounded-2xl bg-white p-8 shadow-card">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                    {iconMap[pillar.icon]}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink/70">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stories"
        className="section-padding border-t border-sand-deep/30 bg-white"
      >
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Impact Stories</p>
            <h2 className="mb-4 font-display text-3xl font-semibold text-navy md:text-4xl">
              Voices from the field
            </h2>
            <p className="max-w-2xl text-sm text-ink/65">
              Real accounts from communities reached through our Education,
              Livelihoods, Protection, and WASH programs across East Africa.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stories.map((story, index) => (
              <Reveal
                key={story.slug}
                delay={index * 0.1}
                direction="up"
                className="flex"
              >
                <StoryCard story={story} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { label: "Education", href: "/our-work/education" },
                { label: "Livelihoods", href: "/our-work/livelihoods" },
                { label: "Protection", href: "/our-work/protection" },
                { label: "WASH", href: "/our-work/wash" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-sand-deep bg-sand px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-teal hover:bg-teal-soft hover:text-teal-text"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
