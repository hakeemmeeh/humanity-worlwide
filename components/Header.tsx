"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { organization } from "@/data/content";

const navigationStructure = [
  {
    label: "About Us",
    dropdownItems: [
      { label: "Our Mission", href: "/about" },
      { label: "Where We Work", href: "/where-we-work" },
      { label: "Resources & Reports", href: "/resources" },
    ],
  },
  {
    label: "Our Work",
    dropdownItems: [
      { label: "Programs", href: "/our-work" },
      { label: "Emergency Campaigns", href: "/campaigns" },
      { label: "Success Stories", href: "/stories" },
      { label: "News & Press", href: "/news" },
    ],
  },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  const toggleMobileDropdown = (label: string) => {
    setExpandedMobileMenu(expandedMobileMenu === label ? null : label);
  };

  return (
    <header
      className="absolute left-0 right-0 top-0 z-50 bg-transparent transition-all duration-300"
    >
      <nav aria-label="Main navigation">
        <div className="container-content flex items-center justify-between gap-3 px-6 py-4 md:px-8">
          <Logo height={44} onDark className="min-w-0 max-w-[200px] sm:max-w-none" />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 xl:flex">
            {navigationStructure.map((nav) => (
              nav.dropdownItems ? (
                <div key={nav.label} className="relative group py-2">
                  <button className="nav-link flex items-center gap-1 text-white/90 after:bg-white hover:text-white focus:outline-none">
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
                  className="nav-link rounded-lg text-white/90 after:bg-white hover:text-white"
                >
                  {nav.label}
                </Link>
              )
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button href="/get-involved" className="px-4 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm">
              Donate Now
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 xl:hidden transition-colors duration-300 text-white"
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
              {navigationStructure.map((nav) => (
                nav.dropdownItems ? (
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
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
