"use client";

import Link from "next/link";
import { ArrowRight, Heart, BarChart3, Users } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import { programs } from "@/data/content";

import { ShapeDivider } from "@/components/ShapeDivider";

const iconBoxes = [
  {
    icon: Heart,
    title: "Giving Solutions",
    description:
      "Empowering communities through targeted aid, resources, and sustainable development partnerships.",
    href: "/our-work",
  },
  {
    icon: BarChart3,
    title: "Impact Analysis",
    description:
      "Data-driven monitoring and evaluation ensuring measurable outcomes across every program we deliver.",
    href: "/our-work",
  },
  {
    icon: Users,
    title: "Community Aid",
    description:
      "Grassroots engagement that places local voices at the centre of humanitarian planning and action.",
    href: "/our-work",
  },
];

export function ProgramsSection() {
  return (
    <section className="relative section-padding bg-sand pb-24 md:pb-32">
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

        {/* Icon boxes — inspired by Savior's solution blocks */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {iconBoxes.map((box, index) => (
            <Reveal key={box.title} delay={index * 0.1}>
              <div className="group rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#6C9E6C]/15">
                  <box.icon className="h-7 w-7 text-[#6C9E6C]" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold">
                  {box.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {box.description}
                </p>
                <Link
                  href={box.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#6C9E6C] transition-colors hover:text-[#5a8a5a]"
                >
                  View More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {programs.map((program, index) => (
            <Reveal key={program.slug} delay={index * 0.1}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </div>
      <ShapeDivider position="bottom" color="#FFFFFF" />
    </section>
  );
}
