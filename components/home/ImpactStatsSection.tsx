import { HandsMark } from "@/components/HandsMark";
import { Reveal } from "@/components/Reveal";
import { StatBlock } from "@/components/StatBlock";
import { impactStats } from "@/data/content";

export function ImpactStatsSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-24">
      <HandsMark className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] text-white opacity-[0.06]" />
      <HandsMark className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] text-white opacity-[0.05]" />

      <div className="container-content relative px-6 md:px-8">
        <Reveal>
          <p className="eyebrow text-teal">Our Impact</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-white md:text-4xl">
            Measurable change across communities
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {impactStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <StatBlock stat={stat} variant="dark" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
