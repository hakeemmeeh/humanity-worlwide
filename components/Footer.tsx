"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { HandsMark } from "@/components/HandsMark";
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
    // TODO: wire to email/API
    setSubmitted(true);
  };

  const exploreLinks = navLinks.filter(
    (l) => !["Home", "Contact"].includes(l.label)
  );

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <HandsMark className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 text-white opacity-[0.04]" />

      <div className="container-content section-padding relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <HandsMark className="h-10 w-10 text-teal" />
              <div>
                <p className="font-display text-lg font-semibold">
                  {organization.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {organization.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-teal hover:text-teal"
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Explore
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <address className="not-italic space-y-2 text-sm text-white/80">
              <p>{organization.contact.address}</p>
              <p>
                <a
                  href={`mailto:${organization.contact.email}`}
                  className="transition-colors hover:text-teal"
                >
                  {organization.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${organization.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-teal"
                >
                  {organization.contact.phone}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Newsletter
            </h3>
            {submitted ? (
              <p className="text-sm text-teal">Thank you for subscribing!</p>
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
                  className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/50"
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-xs text-white/50 md:px-8">
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
