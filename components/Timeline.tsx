import { Reveal } from "@/components/Reveal";
import type { TimelineEvent } from "@/types";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-teal/30 md:left-1/2" />
      <div className="space-y-12">
        {events.map((event, index) => (
          <Reveal key={event.year} delay={index * 0.1}>
            <div
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden w-1/2 md:block" />
              <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-teal md:left-1/2" />
              <div className="ml-10 w-full md:ml-0 md:w-1/2 md:px-12">
                <span className="text-sm font-semibold text-teal-text">
                  {event.year}
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold text-navy">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {event.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
