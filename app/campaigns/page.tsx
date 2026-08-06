import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CTAStripe } from "@/components/CTAStripe";
import { EmergencyDonateWidget } from "@/components/EmergencyDonateWidget";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { emergencyCountries } from "@/data/content";

export const metadata: Metadata = {
  title: "Emergency Response",
  description:
    "Humanity Worldwide emergency response across South Sudan, Sudan, and Somalia — floods, displacement, drought, and conflict.",
};

export default function CampaignsPage() {
  return (
    <>
      <PageHero
        eyebrow="Emergency Response"
        title="When crisis strikes, we respond"
        subtitle="Across South Sudan, Sudan, and Somalia we deliver rapid humanitarian action for floods, displacement, drought, and conflict — organized by country and region."
        image="/images/hero-emergency-composite.jpg"
        imageAlt="Emergency response in crisis-affected areas"
        align="center"
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">By country</p>
              <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
                Where we respond
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                Each crisis looks different on the ground. Explore emergency
                needs and responses by country — including state and regional
                focus areas.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 space-y-20">
            {emergencyCountries.map((country, index) => (
              <Reveal key={country.slug} delay={index * 0.08}>
                <article
                  id={country.slug}
                  className="scroll-mt-28 overflow-hidden rounded-2xl bg-sand shadow-card"
                >
                  <div className="grid lg:grid-cols-5">
                    <div className="relative aspect-[16/10] lg:col-span-2 lg:aspect-auto lg:min-h-[320px]">
                      <Image
                        src={country.image}
                        alt={`Emergency response in ${country.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                    <div className="lg:col-span-3 p-8 md:p-12">
                      <div className="flex items-center gap-2 text-teal-text">
                        <MapPin className="h-5 w-5" />
                        <span className="text-sm font-semibold uppercase tracking-wider">
                          {country.name}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-3xl font-semibold text-navy">
                        {country.name}
                      </h2>
                      <p className="mt-4 leading-relaxed text-ink/70">
                        {country.description}
                      </p>

                      <ul className="mt-8 space-y-6">
                        {country.crises.map((crisis) => (
                          <li
                            key={crisis.id}
                            className="border-t border-sand-deep pt-6 first:border-t-0 first:pt-0"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-coral">
                                {crisis.crisisType}
                              </span>
                              <span className="text-xs font-medium text-ink/50">
                                {crisis.area}
                              </span>
                            </div>
                            <h3 className="mt-2 font-display text-xl font-semibold text-navy">
                              {crisis.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-ink/70">
                              {crisis.description}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-4">
                              {crisis.familiesReached != null && (
                                <p className="text-sm font-semibold text-teal-text">
                                  {crisis.familiesReached.toLocaleString()}{" "}
                                  families reached
                                </p>
                              )}
                              {crisis.campaignSlug && (
                                <Link
                                  href={`/campaigns/${crisis.campaignSlug}`}
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
                                >
                                  Read full response
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="donate"
        className="section-padding bg-navy scroll-mt-28"
      >
        <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-coral">
              Support our response
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
              Donate to our emergency response
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/75">
              Choose South Sudan, Sudan, or Somalia. Your contribution funds
              general emergency response — shelter, clean water, protection,
              and rapid relief — wherever the need is greatest in that country.
            </p>
          </Reveal>
          <Reveal delay={0.1} direction="right">
            <EmergencyDonateWidget />
          </Reveal>
        </div>
      </section>

      <CTAStripe variant="navy" />
    </>
  );
}
