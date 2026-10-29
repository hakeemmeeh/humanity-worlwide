import type { Metadata } from "next";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { CTAStripe } from "@/components/CTAStripe";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { offices, organization } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us and Our Offices",
  alternates: { canonical: "/contact" },
  description: "Contact Humanity Worldwide. Find our offices in Kansas City, Juba, Yabus and Kismayo, or send us a message about partnerships, volunteering or support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="We'd love to hear from you. Reach out for partnerships, volunteering, media inquiries, or general questions."
        align="center"
      />

      <section className="section-padding bg-white">
        <div className="container-content grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Reveal direction="left">
              <div className="rounded-2xl bg-sand p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-navy">Our Offices</h3>
                    <ul className="mt-3 space-y-4">
                      {offices.map((office) => (
                        <li key={office.label} className="flex gap-2 text-sm">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-text" aria-hidden />
                          <div>
                            <p className="font-medium text-navy">
                              {office.label}
                              <span className="font-normal text-ink/70"> · {office.city}</span>
                            </p>
                            <p className="mt-0.5 text-ink/70">{office.address}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} direction="left">
              <div className="rounded-2xl bg-sand p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-text">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Email</h3>
                    {organization.contact.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="mt-1 block text-sm text-teal-text transition-colors hover:text-teal"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2} direction="left">
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

          <Reveal delay={0.15} className="lg:col-span-3" direction="right">
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

      <CTAStripe variant="navy" />
    </>
  );
}
