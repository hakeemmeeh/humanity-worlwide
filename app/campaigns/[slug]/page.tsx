import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAStripe } from "@/components/CTAStripe";
import { DonationWidget } from "@/components/DonationWidget";
import { Reveal } from "@/components/Reveal";
import { campaigns, getCampaignBySlug } from "@/data/content";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const campaign = getCampaignBySlug(params.slug);
  if (!campaign) return { title: "Campaign" };
  return {
    title: campaign.title,
    description: campaign.description,
    openGraph: {
      title: campaign.title,
      description: campaign.description,
      images: [{ url: campaign.image }],
    },
  };
}

export default function CampaignDetailPage({ params }: Props) {
  const campaign = getCampaignBySlug(params.slug);
  if (!campaign) notFound();

  const progress = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy/60 to-navy/30" />
        <div className="container-content relative w-full px-6 pb-16 pt-32 md:px-8 md:pb-20">
          <Breadcrumbs
            variant="light"
            items={[
              { label: "Campaigns", href: "/campaigns" },
              { label: campaign.title },
            ]}
          />
          <Reveal>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-coral">
              Emergency Campaign
            </span>
            <h1 className="max-w-3xl font-display text-4xl font-semibold text-white md:text-5xl">
              {campaign.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {campaign.location}
              {campaign.familiesReached &&
                ` · ${campaign.familiesReached.toLocaleString()} families reached`}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-content grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy">
                About this campaign
              </h2>
              <p className="mt-4 leading-relaxed text-ink/70">
                {campaign.description}
              </p>
            </Reveal>

            {campaign.body && (
              <div className="mt-8 space-y-5">
                {campaign.body.map((paragraph, index) => (
                  <Reveal key={index} delay={index * 0.05}>
                    <p className="leading-relaxed text-ink/80">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            )}

            {campaign.needs && (
              <Reveal delay={0.2}>
                <h3 className="mt-10 font-display text-xl font-semibold text-navy">
                  What your donation provides
                </h3>
                <ul className="mt-4 space-y-3">
                  {campaign.needs.map((need) => (
                    <li
                      key={need}
                      className="flex items-start gap-3 text-ink/80"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" />
                      {need}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.15}>
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl bg-sand p-6 shadow-card">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">
                      ${campaign.raised.toLocaleString()} raised
                    </span>
                    <span className="text-ink/50">
                      of ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-sand-deep">
                    <div
                      className="h-full rounded-full bg-coral"
                      style={{ width: `${progress}%` }}
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-coral">
                    {progress}% funded
                  </p>
                </div>
                <DonationWidget compact />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTAStripe />
    </>
  );
}
