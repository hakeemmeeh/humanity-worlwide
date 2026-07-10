import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { CTAStripe } from "@/components/CTAStripe";
import { Counter } from "@/components/Counter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { regions } from "@/data/content";

export const metadata: Metadata = {
  title: "Where We Work",
  description:
    "Humanity Worldwide operates across South Sudan, Somalia, and Sudan, delivering integrated humanitarian programs.",
};

export default function WhereWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Presence"
        title="Where we work"
        subtitle="Delivering integrated humanitarian and development solutions across East Africa."
        image="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80"
        imageAlt="Map showing Humanity Worldwide operational regions in East Africa"
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-lg leading-relaxed text-ink/70">
                Our presence spans three countries and seven regional offices,
                allowing us to respond rapidly to emergencies while maintaining
                long-term development programs in the communities we serve.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 space-y-20">
            {regions.map((region, index) => (
              <Reveal key={region.slug} delay={index * 0.1}>
                <article
                  id={region.slug}
                  className="scroll-mt-28 overflow-hidden rounded-2xl bg-sand shadow-card"
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
                      <Image
                        src={region.image}
                        alt={`Humanity Worldwide operations in ${region.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-8 md:p-12">
                      <div className="flex items-center gap-2 text-teal-text">
                        <MapPin className="h-5 w-5" />
                        <span className="text-sm font-semibold uppercase tracking-wider">
                          {region.name}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-3xl font-semibold">
                        {region.name}
                      </h2>
                      <p className="mt-4 leading-relaxed text-ink/70">
                        {region.longDescription ?? region.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-8">
                        {region.stats.map((stat) => (
                          <div key={stat.label}>
                            <span className="font-display text-3xl font-semibold text-navy">
                              <Counter
                                value={stat.value}
                                suffix={stat.suffix}
                              />
                            </span>
                            <p className="text-sm text-ink/50">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <p className="text-sm font-semibold text-navy">
                          Active Programs
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {region.programs.map((program) => (
                            <span
                              key={program}
                              className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-ink/70"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
