import type { Metadata } from "next";
import { CTAStripe } from "@/components/CTAStripe";
import { DonationWidget } from "@/components/DonationWidget";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { VolunteerForm } from "@/components/VolunteerForm";
import { getInvolvedFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Donate, volunteer, or partner with Humanity Worldwide to support crisis-affected communities.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Make a difference today"
        subtitle="Whether you donate, volunteer, or partner with us, your support creates lasting change."
        image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80"
        imageAlt="Volunteers and community members working together on humanitarian programs"
      />

      <section className="section-padding bg-white">
        <div className="container-content grid gap-12 lg:grid-cols-2">
          <Reveal>
            <DonationWidget />
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy">
                Become a Volunteer
              </h2>
              <p className="mt-2 text-ink/70">
                Share your skills and passion to support our mission.
              </p>
              <div className="mt-8">
                <VolunteerForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-sand">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="font-display text-3xl font-semibold">
              Common questions
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <FAQAccordion faqs={getInvolvedFaqs} />
          </div>
        </div>
      </section>

      <CTAStripe />
    </>
  );
}
