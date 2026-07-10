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
  height = 44,
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
      className="h-auto w-auto"
      style={{ height, width: "auto", maxWidth: width }}
    />
  );

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Humanity Worldwide — Home"
    >
      {onDark ? (
        <span className="inline-block rounded-xl bg-white px-4 py-2.5">
          {image}
        </span>
      ) : (
        image
      )}
    </Link>
  );
}
