import type { Metadata } from "next";
import { CTAStripe } from "@/components/CTAStripe";
import { NewsCard } from "@/components/NewsCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/data/content";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news and updates from Humanity Worldwide programs across South Sudan, Somalia, and Sudan.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title="From the field"
        subtitle="Stay informed about our programs, milestones, and emergency response efforts."
        image="/images/education-unicef-school-sign.jpg"
        imageAlt="UNICEF education project signage at a Humanity Worldwide school site"
        align="center"
      />

      <section className="section-padding bg-white">
        <div className="container-content grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.1}>
              <NewsCard article={article} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
