import type { Metadata } from "next";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { CTAStripe } from "@/components/CTAStripe";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { organization, resourcesFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Request reports and program information from Humanity Worldwide.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Reports & information"
        subtitle="Transparency and accountability are core to our mission. Contact us to request available reports and program information."
        align="center"
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-sand-deep bg-sand/50 p-10 text-center md:p-14">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-white">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-navy md:text-3xl">
                Request a report
              </h2>
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/70">
                For annual reports, program briefs, impact assessments, or other
                organizational documents, please get in touch. Our team will
                share what is available and guide you on next steps.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact">Contact Us</Button>
                <a
                  href={`mailto:${organization.contact.email}?subject=${encodeURIComponent("Report request")}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
                >
                  <Mail className="h-4 w-4" />
                  {organization.contact.email}
                </a>
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
