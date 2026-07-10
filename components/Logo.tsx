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
  height = 56,
  onDark = false,
  className = "",
}: LogoProps) {
  const width = Math.round((498 / 154) * height);

  const image = (
    <Image
      src="/logo.png"
      alt="Humanity Worldwide — for a better world"
      width={width}
      height={height}
      priority
      className="object-contain"
      style={{ height: `${height}px`, width: `${width}px` }}
    />
  );

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      aria-label="Humanity Worldwide — Home"
      style={{ height: `${height}px` }}
    >
      {onDark ? (
        <span className="inline-block rounded-xl bg-white px-4 py-2">
          {image}
        </span>
      ) : (
        image
      )}
    </Link>
  );
}
