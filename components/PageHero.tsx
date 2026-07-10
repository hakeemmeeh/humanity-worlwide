import Image from "next/image";
import { Reveal } from "@/components/Reveal";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: PageHeroProps) {
  const alt = imageAlt ?? title;

  if (image) {
    return (
      <section className="relative flex min-h-[50vh] items-end">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/60 to-navy/30" />
        <div className="container-content relative w-full px-6 pb-16 pt-32 md:px-8 md:pb-20">
          <Reveal>
            {eyebrow && <p className="eyebrow text-teal">{eyebrow}</p>}
            <h1 className="max-w-3xl font-display text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-lg text-white/80">
                {subtitle}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sand section-padding">
      <div className="container-content">
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="max-w-3xl font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-ink/70">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
