import Image from "next/image";
import Link from "next/link";
import { organization } from "@/data/content";

interface LogoProps {
  /** Display height of the mark in pixels */
  height?: number;
  /** Invert text for dark backgrounds (footer) */
  onDark?: boolean;
  className?: string;
}

export function Logo({
  height = 44,
  onDark = false,
  className = "",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-3 ${className}`}
      aria-label="Humanity Worldwide — Home"
    >
      <Image
        src="/logo.png"
        alt=""
        width={height}
        height={height}
        priority
        className="h-auto w-auto object-contain"
        style={{ height, width: "auto" }}
      />
      <div className="min-w-0">
        <span
          className={`block truncate font-display text-base font-semibold leading-tight sm:text-lg ${
            onDark ? "text-white" : "text-navy"
          }`}
        >
          {organization.name}
        </span>
        <span
          className={`block text-[10px] lowercase tracking-wide ${
            onDark ? "text-white/60" : "text-ink/50"
          }`}
        >
          {organization.tagline}
        </span>
      </div>
    </Link>
  );
}
