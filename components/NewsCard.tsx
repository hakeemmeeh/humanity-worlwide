import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types";

interface NewsCardProps {
  article: Article;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-white border border-sand-deep/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/8 hover:border-teal/25"
    >
      {/* Teal accent bar at the top — grows on hover */}
      <div className="absolute top-0 left-0 right-0 z-10 h-[3px] bg-coral/70 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* Image — completely clean, no overlays */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {article.category && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-coral px-3.5 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
            {article.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-[11px] font-semibold text-ink/40 uppercase tracking-wider">
          {formatDate(article.date)} · {article.author}
        </p>
        <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-teal">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink/65">
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-teal-text">
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-teal after:transition-all after:duration-300 group-hover:after:w-full">
            Read more
          </span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
