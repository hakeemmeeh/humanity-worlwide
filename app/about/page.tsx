import type { Metadata } from "next";
import { BarChart3, Layers, Shield, Users } from "lucide-react";
import { CTAStripe } from "@/components/CTAStripe";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StatBlock } from "@/components/StatBlock";
import { TeamProfile } from "@/components/TeamProfile";
import { Timeline } from "@/components/Timeline";
import {
  aboutQuickStats,
  organization,
  pillars,
  teamMembers,
  timeline,
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {aboutQuickStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
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
              <Reveal key={pillar.id} delay={index * 0.1}>
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

      <section className="section-padding bg-white">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Our History</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              A journey of impact
            </h2>
          </Reveal>
          <div className="mt-16">
            <Timeline events={timeline} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Our Team</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Leadership & field staff
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.1}>
                <TeamProfile member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTAStripe />
    </>
  );
}
