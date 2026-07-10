"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { HandsMark } from "@/components/HandsMark";
import { navLinks, organization } from "@/data/content";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      <div className="bg-navy-deep text-white">
        <div className="container-content flex flex-wrap items-center justify-between gap-2 px-6 py-2 text-xs md:px-8">
          <span className="hidden sm:inline">{organization.contact.address}</span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${organization.contact.email}`}
              className="transition-colors hover:text-teal"
            >
              {organization.contact.email}
            </a>
            <a
              href={`tel:${organization.contact.phone.replace(/\s/g, "")}`}
              className="hidden transition-colors hover:text-teal md:inline"
            >
              {organization.contact.phone}
            </a>
          </div>
        </div>
      </div>

      <nav
        className="sticky top-0 z-50 border-b border-sand-deep/50 bg-white/95 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="container-content flex items-center justify-between gap-3 px-6 py-4 md:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <HandsMark className="h-9 w-9 shrink-0 text-teal sm:h-10 sm:w-10" />
            <div className="min-w-0">
              <span className="block truncate font-display text-base font-semibold text-navy sm:text-lg">
                Humanity Worldwide
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-ink/50">
                {organization.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-sand hover:text-navy"
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
              className="rounded-lg p-2 text-navy xl:hidden"
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
