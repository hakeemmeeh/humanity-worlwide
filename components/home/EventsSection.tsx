"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface EventItem {
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  href: string;
}

const events: EventItem[] = [
  {
    day: "24",
    month: "OCT",
    title: "Create positive change today – Sydney Spring Briefing",
    time: "9:00 AM - 1:00 PM",
    location: "Sydney Town Hall & Online",
    href: "/contact",
  },
  {
    day: "12",
    month: "MAY",
    title: "Foster compassion every day – London Field Conference",
    time: "10:30 AM - 4:00 PM",
    location: "London Olympia & Online",
    href: "/contact",
  },
];

export function EventsSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background shape accent */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-sand/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-content">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16">
          <Reveal direction="left">
            <span className="font-handwriting text-3xl text-coral block -mb-1 rotate-[-2deg] select-none">
              Get involved
            </span>
            <p className="eyebrow">Briefings &amp; Forums</p>
            <h2 className="max-w-xl font-display text-3xl font-semibold md:text-4xl text-navy">
              Lighting the way to a better tomorrow with hope
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text transition-colors hover:text-teal border-b border-teal/20 pb-1"
            >
              Host a briefing in your city <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="divide-y divide-sand-deep border-y border-sand-deep">
          {events.map((event, index) => (
            <Reveal
              key={event.title}
              delay={index * 0.12}
              direction="up"
              className="py-8 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-6 flex-1">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center bg-[#F6F9FC] border border-sand-deep/60 px-4 py-3.5 rounded-2xl min-w-[80px] text-center shadow-sm select-none transition-colors duration-500 group-hover:bg-coral group-hover:border-coral">
                    <span className="text-2xl font-bold font-display text-navy leading-none transition-colors duration-500 group-hover:text-white">
                      {event.day}
                    </span>
                    <span className="text-[10px] font-bold text-ink/40 tracking-wider mt-1 transition-colors duration-500 group-hover:text-white/80">
                      {event.month}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink/45 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-teal" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-teal" />
                        {event.location}
                      </span>
                    </div>
                    <Link
                      href={event.href}
                      className="block font-display text-lg md:text-xl font-semibold text-navy leading-snug transition-colors duration-300 group-hover:text-teal hover:underline"
                    >
                      {event.title}
                    </Link>
                  </div>
                </div>

                {/* Register Link */}
                <div className="shrink-0 flex items-center md:justify-end">
                  <Link
                    href={event.href}
                    className="inline-flex items-center gap-2 rounded-full border border-sand-deep/70 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy shadow-sm transition-all duration-300 group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep hover:scale-105"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
