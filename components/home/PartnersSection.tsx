import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { partners } from "@/data/content";

export function PartnersSection() {
  return (
    <section className="section-padding bg-sand">
      <div className="container-content text-center">
        <Reveal>
          <p className="eyebrow justify-center">Partnerships</p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Working together for change
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-20 w-36 items-center justify-center rounded-2xl border border-sand-deep bg-white px-4 shadow-card md:h-24 md:w-44"
              >
                <span className="font-display text-lg font-semibold text-navy/70 md:text-xl">
                  {partner.abbr ?? partner.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-lg text-ink/70">
            Are you interested in working with us? Let&apos;s get started now.
          </p>
          <div className="mt-6">
            <Button href="/contact">Let&apos;s Get Started Now</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
