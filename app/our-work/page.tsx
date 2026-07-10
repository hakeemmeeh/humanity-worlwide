import type { Metadata } from "next";
import { CTAStripe } from "@/components/CTAStripe";
import { PageHero } from "@/components/PageHero";
import { ProgramCard } from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import { programs } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Integrated humanitarian programs in education, WASH, and livelihoods across South Sudan, Somalia, and Sudan.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Programs that transform lives"
        subtitle="Holistic support across education, water & sanitation, and economic development for crisis-affected communities."
        image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80"
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink/70">
              Our integrated approach addresses the interconnected needs of
              vulnerable populations — from classrooms and clean water to
              livelihoods and shelter — ensuring sustainable, community-driven
              change.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {programs.map((program, index) => (
              <Reveal key={program.slug} delay={index * 0.1}>
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
