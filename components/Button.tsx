import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ghost-dark" | "white";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-coral text-white hover:bg-coral-dark focus-visible:ring-coral",
  secondary:
    "border-2 border-navy text-navy hover:bg-navy hover:text-white focus-visible:ring-navy",
  ghost:
    "border-2 border-white/80 text-white hover:bg-white/10 focus-visible:ring-white",
  "ghost-dark":
    "border-2 border-navy/80 text-navy hover:bg-navy/10 focus-visible:ring-navy",
  white:
    "bg-white text-coral hover:bg-sand hover:text-coral-dark focus-visible:ring-white",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";

  const combined = `${baseClass} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
    >
      {children}
    </button>
  );
}
