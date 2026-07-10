import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Counter } from "@/components/Counter";
import { RegionMap } from "@/components/RegionMap";
import { Reveal } from "@/components/Reveal";
import { regions } from "@/data/content";

export function WhereWeWorkSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow">Where We Work</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-4xl">
              Global impact, local presence
            </h2>
            <Link
              href="/where-we-work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal"
            >
              Explore all regions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <RegionMap />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {regions.map((region, index) => (
            <Reveal key={region.slug} delay={index * 0.1}>
              <Link
                href={`/where-we-work#${region.slug}`}
                className="group flex gap-4 rounded-2xl bg-sand p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-teal-text">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-sm font-semibold">{region.name}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-ink/60">
                    {region.description}
                  </p>
                  <div className="mt-2 flex gap-4">
                    {region.stats.slice(0, 1).map((stat) => (
                      <div key={stat.label}>
                        <span className="font-display text-lg font-semibold text-navy">
                          <Counter value={stat.value} suffix={stat.suffix} />
                        </span>
                        <span className="ml-1 text-xs text-ink/50">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
