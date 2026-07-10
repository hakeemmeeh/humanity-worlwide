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
      className="group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {article.category && (
          <span className="absolute left-4 top-4 rounded-full bg-navy/90 px-3 py-1 text-xs font-semibold text-white">
            {article.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs text-ink/50">
          {formatDate(article.date)} · {article.author}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-navy group-hover:text-teal-text">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/70">
          {article.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-text">
          Read more
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
