"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { headerNavigation } from "@/data/content";
import { isNavDropdown } from "@/types";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setExpandedMobileMenu(expandedMobileMenu === label ? null : label);
  };

  const isFloating = isScrolled && !mobileOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isFloating 
          ? "bg-white/95 backdrop-blur-lg shadow-lg border border-sand/40 py-1 mt-2 mx-2 rounded-2xl sm:mx-4 lg:mx-auto lg:max-w-7xl lg:mt-4" 
          : "bg-[#F8F9FA] border-b border-sand-deep/20 py-2.5 mx-0 rounded-none shadow-none"
      }`}
    >
      <nav aria-label="Main navigation">
        <div className={`container-content flex items-center justify-between gap-3 transition-all duration-300 ${isFloating ? "px-5 md:px-6" : "px-6 md:px-8"}`}>
          <Logo className={`transition-all duration-300 min-w-0 ${isFloating ? "h-12 sm:h-14 md:h-16 lg:h-18" : "h-16 sm:h-20 md:h-24 lg:h-28"}`} />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 xl:flex">
            {headerNavigation.map((nav) =>
              isNavDropdown(nav) ? (
                <div key={nav.label} className="relative group py-2">
                  <button className="nav-link flex items-center gap-1 text-[#1E3E39]/80 after:bg-teal hover:text-navy focus:outline-none">
                    {nav.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-250 group-hover:rotate-180" />
                  </button>
                  {/* Dropdown Card */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 origin-top rounded-xl bg-white p-2.5 shadow-xl ring-1 ring-black/5 opacity-0 invisible translate-y-3 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-white" />
                    <div className="relative z-10 flex flex-col gap-0.5">
                      {nav.dropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-lg px-4 py-2.5 text-sm font-medium text-[#1E3E39] hover:bg-sand transition-colors hover:text-navy"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={nav.label}
                  href={nav.href}
                  className="nav-link rounded-lg text-[#1E3E39]/80 after:bg-teal hover:text-navy"
                >
                  {nav.label}
                </Link>
              )
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button href="/get-involved" className="min-h-11 px-3 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm">
              Get Involved
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2.5 xl:hidden transition-colors duration-300 text-[#1E3E39]"
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

        {/* Mobile Accordion Menu */}
        <div
          className={`overflow-hidden border-t border-sand-deep bg-white transition-all duration-300 xl:hidden ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex flex-col gap-1.5">
              {headerNavigation.map((nav) =>
                isNavDropdown(nav) ? (
                  <div key={nav.label} className="flex flex-col">
                    <button
                      onClick={() => toggleMobileDropdown(nav.label)}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-ink/80 transition-colors hover:bg-sand"
                    >
                      <span>{nav.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedMobileMenu === nav.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden pl-4 transition-all duration-300 ${
                        expandedMobileMenu === nav.label
                          ? "max-h-[250px] opacity-100 mt-0.5"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-1 border-l-2 border-sand-deep pl-3 py-1">
                        {nav.dropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-ink/70 hover:bg-sand hover:text-navy transition-all"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={nav.label}
                    href={nav.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-semibold text-ink/80 transition-colors hover:bg-sand"
                  >
                    {nav.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
