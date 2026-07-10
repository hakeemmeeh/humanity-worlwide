"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { navLinks, organization } from "@/data/content";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-sand-deep/50 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Main navigation">
        <div className="container-content flex items-center justify-between gap-3 px-6 py-4 md:px-8">
          <Logo height={44} className="min-w-0 max-w-[200px] sm:max-w-none" />

          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link rounded-lg ${
                  isScrolled
                    ? "text-ink/80 after:bg-navy hover:text-navy"
                    : "text-white/90 after:bg-white hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button href="/get-involved" className="px-4 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm">
              Donate Now
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`rounded-lg p-2 xl:hidden transition-colors duration-300 ${
                isScrolled ? "text-navy" : "text-white"
              }`}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-sand-deep bg-white transition-all duration-300 xl:hidden ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-ink/80 transition-colors hover:bg-sand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
