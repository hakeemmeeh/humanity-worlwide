import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { footerCta } from "@/data/content";

interface CTAStripeProps {
  variant?: "coral" | "navy";
}

export function CTAStripe({ variant = "coral" }: CTAStripeProps) {
  const isCoral = variant === "coral";

  return (
    <section
      className={`relative overflow-hidden section-padding ${
        isCoral ? "" : "bg-navy"
      }`}
    >
      {/* Background image for coral variant */}
      {isCoral && (
        <>
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-coral/90" />
        </>
      )}

      <div className="container-content relative text-center">
        <Reveal>
          <h2
            className={`font-display text-3xl font-semibold md:text-4xl ${
              isCoral ? "text-white" : "text-white"
            }`}
          >
            {footerCta.headline}
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${
              isCoral ? "text-white/90" : "text-white/80"
            }`}
          >
            {footerCta.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isCoral ? (
              <>
                <Button
                  href="/get-involved"
                  className="bg-white text-coral hover:bg-sand"
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
