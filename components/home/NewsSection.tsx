"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/data/content";

export function NewsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-content">
        <Reveal direction="left">
          <p className="eyebrow">Latest News</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-4xl">
              Updates from the field
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
            >
              View all news
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.15} direction="up">
              <NewsCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
