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
      className="group block overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-sand-deep/40 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Subtle dark gradient overlay on hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-text shadow-sm transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(42,196,186,0.4)]">
            {program.tagline}
          </span>
        </div>
      </div>
      <div className="relative p-6 md:p-8 bg-gradient-to-b from-transparent to-white/50">
        <h3 className="font-display text-2xl font-semibold text-navy transition-colors duration-300 group-hover:text-teal">
          {program.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
          {program.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors group-hover:text-teal">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
