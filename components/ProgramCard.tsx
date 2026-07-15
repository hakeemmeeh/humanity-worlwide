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
      className="group relative block overflow-hidden rounded-2xl bg-white border border-sand-deep/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/8 hover:border-teal/25"
    >
      {/* Teal accent bar at the top — grows on hover */}
      <div className="absolute top-0 left-0 right-0 z-10 h-[3px] bg-teal/60 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-block rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-text shadow-sm">
            {program.tagline}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h3 className="font-display text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-teal">
          {program.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">
          {program.description}
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal-text">
          <span>Learn more</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </Link>
  );
}
