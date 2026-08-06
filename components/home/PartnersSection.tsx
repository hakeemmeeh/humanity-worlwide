import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { partners } from "@/data/content";

export function PartnersSection() {
  return (
    <section className="section-padding relative overflow-hidden border-t border-sand-deep/30 bg-[#F8F9FA]">
      <div className="container-content text-center">
        <Reveal direction="zoom" duration={0.9}>
          <p className="eyebrow justify-center">Partnerships</p>
          <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
            Working together for change
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink/60">
            We collaborate with community organizations and local authorities to
            deliver humanitarian and development programs across East Africa.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-20 w-40 items-center justify-center rounded-2xl border border-sand-deep bg-white px-4 shadow-card md:h-24 md:w-48"
            >
              <span className="font-display text-lg font-semibold text-navy/70 md:text-xl">
                {partner.abbr ?? partner.name}
              </span>
            </div>
          ))}
        </div>

        <Reveal direction="up" delay={0.2}>
          <p className="mx-auto mt-10 max-w-lg text-sm text-ink/75">
            Are you interested in working with us? Let&apos;s get started now.
          </p>
          <div className="mt-6">
            <Button href="/contact" className="shadow-md">
              Let&apos;s Get Started Now
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
