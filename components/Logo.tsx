import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** Display height in pixels */
  height?: number;
  /** Wrap in white background (for dark sections like footer) */
  onDark?: boolean;
  className?: string;
}

export function Logo({
  height = 112,
  className = "",
}: LogoProps) {
  const width = Math.round((498 / 154) * height);

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      aria-label="Humanity Worldwide — Home"
    >
      <Image
        src="/logo.png"
        alt="Humanity Worldwide — for a better world"
        width={width}
        height={height}
        priority
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
