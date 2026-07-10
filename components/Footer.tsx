"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { HandsMark } from "@/components/HandsMark";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { organization, navLinks, socialLinks } from "@/data/content";

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: <Facebook className="h-4 w-4" />,
  Twitter: <Twitter className="h-4 w-4" />,
  LinkedIn: <Linkedin className="h-4 w-4" />,
  Instagram: <Instagram className="h-4 w-4" />,
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const exploreLinks = navLinks.filter(
    (l) => !["Home", "Contact"].includes(l.label)
  );

  return (
    <footer className="relative overflow-hidden bg-[#F8F9FA] text-[#1E3E39]">
      {/* Wave SVG divider transitioning from white section above */}
      <svg
        className="absolute left-0 top-[-1px] w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        style={{ height: "70px" }}
      >
        <path
          d="M0,0 C360,70 1080,0 1440,50 L1440,0 L0,0 Z"
          fill="#FFFFFF"
        />
      </svg>

      <HandsMark className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 text-[#2ac4ba] opacity-[0.08]" />

      <div className="container-content section-padding relative pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* The logo has a matching background and blends seamlessly */}
            <Logo height={68} />
            <p className="mt-4 text-sm leading-relaxed text-[#4A6B65]">
              {organization.mission}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2ac4ba]/30 bg-white text-[#2ac4ba] transition-all duration-300 hover:scale-110 hover:bg-[#2ac4ba] hover:text-white hover:shadow-[0_0_12px_rgba(42,196,186,0.4)]"
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#2ac4ba]">
              Explore
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#4A6B65] transition-colors hover:text-[#2ac4ba]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#2ac4ba]">
              Contact
            </h3>
            <address className="not-italic space-y-2 text-sm text-[#4A6B65]">
              <p>{organization.contact.address}</p>
              <p>
                <a
                  href={`mailto:${organization.contact.email}`}
                  className="transition-colors hover:text-[#2ac4ba]"
                >
                  {organization.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${organization.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-[#2ac4ba]"
                >
                  {organization.contact.phone}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#2ac4ba]">
              Newsletter
            </h3>
            {submitted ? (
              <p className="text-sm text-[#2ac4ba]">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-full border border-[#2ac4ba]/30 bg-white px-4 py-2.5 text-sm text-[#1E3E39] placeholder:text-[#1E3E39]/40 focus:border-[#2ac4ba] focus:outline-none focus:ring-2 focus:ring-[#2ac4ba]/20"
                />
                <Button type="submit" className="w-full bg-[#2ac4ba] hover:bg-[#20b0a6] text-white">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#2ac4ba]/10 bg-[#E2ECE9]">
        <div className="container-content flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-xs text-[#4A6B65] md:px-8">
          <p>
            &copy; {new Date().getFullYear()} Humanity Worldwide (HWW). All
            rights reserved.
          </p>
          <p>Site by Xpeedium</p>
        </div>
      </div>
    </footer>
  );
}
