import Image from "next/image";
import type { Story } from "@/types";

interface TestimonialProps {
  story: Story;
  variant?: "light" | "dark";
}

export function Testimonial({ story, variant = "light" }: TestimonialProps) {
  const isDark = variant === "dark";

  return (
    <figure
      className={`rounded-2xl p-8 md:p-10 ${
        isDark ? "bg-navy text-white" : "bg-sand shadow-card"
      }`}
    >
      <blockquote
        className={`font-display text-xl font-medium italic leading-relaxed md:text-2xl ${
          isDark ? "text-white" : "text-navy"
        }`}
      >
        &ldquo;{story.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <Image
            src={story.image}
            alt={story.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <p className={`font-semibold ${isDark ? "text-white" : "text-navy"}`}>
            {story.name}
          </p>
          <p className={`text-sm ${isDark ? "text-white/60" : "text-ink/60"}`}>
            {story.role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
