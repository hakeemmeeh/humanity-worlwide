import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import { programs } from "@/data/content";

export function ProgramsSection() {
  return (
    <section className="section-padding bg-sand">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow">Our Programs</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-4xl">
              Integrated humanitarian solutions
            </h2>
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
            >
              View all programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {programs.map((program, index) => (
            <Reveal key={program.slug} delay={index * 0.1}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
