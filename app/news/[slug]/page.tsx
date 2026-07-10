import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAStripe } from "@/components/CTAStripe";
import { Reveal } from "@/components/Reveal";
import { articles, getArticleBySlug } from "@/data/content";

interface Props {
  params: { slug: string };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default function NewsArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
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
            <p className="mt-4 text-sm text-ink/50">
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
