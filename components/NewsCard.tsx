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
      className="group relative block h-[420px] w-full overflow-hidden rounded-2xl shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal/10"
    >
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      {/* Subtle dark gradient overlay so the glass pane pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-navy/70 transition-opacity duration-500 group-hover:opacity-90" />

      {article.category && (
        <span className="absolute left-4 top-4 z-20 rounded-full bg-coral/95 px-3.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(240,113,103,0.6)] group-hover:bg-coral">
          {article.category}
        </span>
      )}

      {/* Glassmorphic content pane */}
      <div className="absolute inset-x-3 bottom-3 z-20 flex flex-col justify-end rounded-xl bg-white/85 p-5 backdrop-blur-md transition-all duration-500 group-hover:bg-white/95 group-hover:-translate-y-1 border border-white/40">
        <p className="text-[11px] font-semibold text-teal-text uppercase tracking-wider">
          {formatDate(article.date)}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-teal">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/75">
          {article.excerpt}
        </p>
        
        {/* Animated Reveal Link */}
        <div className="mt-3 flex h-5 items-center overflow-hidden">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-teal transition-all duration-500 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            Read article
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
