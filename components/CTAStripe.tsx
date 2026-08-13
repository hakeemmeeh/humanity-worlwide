import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { footerCta } from "@/data/content";

interface CTAStripeProps {
  variant?: "coral" | "navy";
  /** Homepage uses a non-fundraising close; inner pages keep donate/volunteer. */
  intent?: "support" | "learn";
}

export function CTAStripe({
  variant = "coral",
  intent = "support",
}: CTAStripeProps) {
  const isCoral = variant === "coral";
  const isLearn = intent === "learn";

  return (
    <section
      className="relative overflow-hidden section-padding"
    >
      {/* Background image with color overlay */}
      <>
        <Image
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className={`absolute inset-0 ${isCoral ? "bg-coral/95" : "bg-[#12304F]/95"}`} />
      </>

      <div className="container-content relative text-center">
        <Reveal>
          <h2
            className={`font-display text-3xl font-semibold md:text-4xl ${
              isCoral ? "text-white" : "text-white"
            }`}
          >
            {isLearn ? "See how we work across East Africa" : footerCta.headline}
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${
              isCoral ? "text-white/90" : "text-white/80"
            }`}
          >
            {isLearn
              ? "Explore our programs, regions, and field stories — then reach out if you would like to partner or support the work."
              : footerCta.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isLearn ? (
              <>
                <Button href="/our-work" variant={isCoral ? "white" : "primary"}>
                  Explore Our Work
                </Button>
                <Button href="/where-we-work" variant="ghost">
                  Where We Work
                </Button>
              </>
            ) : isCoral ? (
              <>
                <Button
                  href="/get-involved"
                  variant="white"
                >
                  Donate Now
                </Button>
                <Button href="/get-involved" variant="ghost">
                  Become a Volunteer
                </Button>
              </>
            ) : (
              <>
                <Button href="/get-involved">Donate Now</Button>
                <Button href="/get-involved" variant="ghost">
                  Become a Volunteer
                </Button>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
