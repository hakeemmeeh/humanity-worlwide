import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/types";

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link
      href={`/our-work/${program.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-text">
            {program.tagline}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-display text-2xl font-semibold text-navy">
          {program.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
          {program.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors group-hover:text-teal">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
