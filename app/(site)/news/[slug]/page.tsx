import type { Metadata } from "next";
import Image from "next/image";
import { canOptimize } from "@/lib/image-src";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAStripe } from "@/components/CTAStripe";
import { Reveal } from "@/components/Reveal";
import { articles as builtInArticles } from "@/data/content";
import { getArticle } from "@/lib/published-content";
import { seoTitle, clip } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    timeZone: "UTC", // same date on the server and in every visitor's browser
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return builtInArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article" };
  return {
    title: seoTitle(article.title),
    alternates: { canonical: `/news/${article.slug}` },
    description: clip(article.excerpt),
    openGraph: {
      title: article.title,
      description: clip(article.excerpt),
      images: [{ url: article.image }],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  return (
    <>
      <section className="section-padding bg-sand">
        <div className="container-content max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "News", href: "/news" },
              { label: article.title },
            ]}
          />
          <Reveal>
            {article.category && (
              <span className="mb-4 inline-block rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-text">
                {article.category}
              </span>
            )}
            <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-ink/70">
              {formatDate(article.date)} · {article.author}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-content max-w-4xl px-6 md:px-8">
        <Reveal>
          <div className="relative -mt-8 aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
            <Image
              src={article.image}
              unoptimized={!canOptimize(article.image)}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </Reveal>
      </div>

      <section className="section-padding bg-white">
        <div className="container-content max-w-3xl">
          <Reveal>
            <p className="text-lg font-medium leading-relaxed text-navy">
              {article.excerpt}
            </p>
          </Reveal>
          {article.body && (
            <div className="mt-8 space-y-6">
              {article.body.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <p className="leading-relaxed text-ink/80">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
