import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { CTAStripe } from "@/components/CTAStripe";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { organization } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Humanity Worldwide. ${organization.contact.address}`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="We'd love to hear from you. Reach out for partnerships, volunteering, media inquiries, or general questions."
      />

      <section className="section-padding bg-white">
        <div className="container-content grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Reveal>
              <div className="rounded-2xl bg-sand p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Address</h3>
                    <p className="mt-1 text-sm text-ink/70">
                      {organization.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-sand p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Email</h3>
                    <a
                      href={`mailto:${organization.contact.email}`}
                      className="mt-1 block text-sm text-teal-text transition-colors hover:text-teal"
                    >
                      {organization.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl bg-sand p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Phone</h3>
                    <a
                      href={`tel:${organization.contact.phone.replace(/\s/g, "")}`}
                      className="mt-1 block text-sm text-teal-text transition-colors hover:text-teal"
                    >
                      {organization.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="rounded-2xl bg-sand p-8 md:p-10">
              <h2 className="font-display text-2xl font-semibold text-navy">
                Send us a message
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTAStripe />
    </>
  );
}
