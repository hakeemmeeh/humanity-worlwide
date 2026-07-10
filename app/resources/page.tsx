import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { CTAStripe } from "@/components/CTAStripe";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { resources, resourcesFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Annual reports, program briefs, and impact assessments from Humanity Worldwide.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Reports & publications"
        subtitle="Transparency and accountability are core to our mission. Access our latest reports and program briefs."
      />

      <section className="section-padding bg-white">
        <div className="container-content grid gap-6 md:grid-cols-2">
          {resources.map((resource, index) => (
            <Reveal key={resource.slug} delay={index * 0.1}>
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-sand-deep bg-sand/50 p-8 transition-shadow hover:shadow-card">
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-navy">
                        {resource.title}
                      </h3>
                      <span className="rounded-full bg-teal-soft px-2.5 py-0.5 text-xs font-semibold text-teal-text">
                        {resource.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {resource.description}
                    </p>
                    <div className="mt-2 flex gap-3 text-xs text-ink/40">
                      {resource.year && <span>Published {resource.year}</span>}
                      {resource.pages && (
                        <span>{resource.pages} pages</span>
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/contact?subject=Request: ${encodeURIComponent(resource.title)}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
                >
                  <Mail className="h-4 w-4" />
                  Request this document
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-padding bg-sand">
        <div className="container-content text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Need a specific report?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink/70">
              Researchers, partners, and donors can request additional data and
              reports through our contact form.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="secondary">
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="font-display text-3xl font-semibold">
              About our resources
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <FAQAccordion faqs={resourcesFaqs} />
          </div>
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
