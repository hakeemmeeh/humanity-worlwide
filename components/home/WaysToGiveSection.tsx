import {
  BarChart3,
  Layers,
  Shield,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { pillars } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  chart: <BarChart3 className="h-5 w-5" />,
};

export function WaysToGiveSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow">Our Pillars</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-navy md:text-4xl">
            The foundation of everything we do
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70">
            Four commitments that guide our humanitarian and development work
            across South Sudan, Somalia, Sudan, and Kenya.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={index * 0.08}>
              <div className="h-full rounded-2xl bg-sand p-6 md:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                  {iconMap[pillar.icon]}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
