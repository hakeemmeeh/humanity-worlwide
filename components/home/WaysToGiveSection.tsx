import {
  BarChart3,
  Layers,
  Shield,
  Users,
} from "lucide-react";
import { DonationWidget } from "@/components/DonationWidget";
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
    <section className="relative z-10 -mt-20 pb-16 md:-mt-24">
      <div className="container-content px-6 md:px-8">
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <DonationWidget />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="h-full rounded-2xl bg-white p-8 shadow-card md:p-10">
              <h2 className="font-display text-2xl font-semibold text-navy">
                Our Four Pillars
              </h2>
              <p className="mt-2 text-sm text-ink/60">
                The foundation of everything we do
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {pillars.map((pillar) => (
                  <div key={pillar.id} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                      {iconMap[pillar.icon]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
