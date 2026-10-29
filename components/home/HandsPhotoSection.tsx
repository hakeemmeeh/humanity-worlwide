import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { vision } from "@/data/content";

/** A field photo shown inside the shape of the HWW logo (five joined hands). */
const handsMask = {
  WebkitMaskImage: "url(/images/hands-shape.svg)",
  maskImage: "url(/images/hands-shape.svg)",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

export function HandsPhotoSection() {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="zoom" className="relative mx-auto aspect-square w-full max-w-[460px]">
          {/* Soft teal echo of the shape behind the photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rotate-[8deg] bg-teal/15"
            style={handsMask}
          />
          <div className="absolute inset-0" style={handsMask}>
            <Image
              src="/images/livelihoods-community-group.jpg"
              alt="Community members and Humanity Worldwide staff together in South Sudan"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="text-center lg:text-left">
          <span className="mb-3 block rotate-[-2deg] select-none font-handwriting text-3xl text-coral-text">
            Together we are stronger
          </span>
          <p className="eyebrow justify-center lg:justify-start">Who we are</p>
          <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
            Many hands, one purpose
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink/75 lg:mx-0">
            {vision}
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Button href="/get-involved" className="gap-2 px-8 py-3.5">
              Join us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
