import Link from "next/link";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { regions } from "@/data/content";

/** Simple stylized map with region markers for East Africa */
export function RegionMap() {
  const markers = [
    { name: "South Sudan", cx: 52, cy: 58, href: "/where-we-work#south-sudan" },
    { name: "Somalia", cx: 68, cy: 52, href: "/where-we-work#somalia" },
    { name: "Sudan", cx: 48, cy: 38, href: "/where-we-work#sudan" },
  ];

  return (
    <div className="relative mx-auto max-w-lg">
      <svg
        viewBox="0 0 100 80"
        className="w-full text-teal-soft"
        aria-hidden="true"
      >
        <rect width="100" height="80" rx="8" fill="currentColor" />
        <path
          d="M30 20 Q50 15 70 25 T85 45 Q75 65 50 70 T20 55 Q15 35 30 20"
          fill="#E4F4F2"
          opacity="0.5"
        />
        {markers.map((m) => (
          <g key={m.name}>
            <circle cx={m.cx} cy={m.cy} r="3" fill="#2CADA3" opacity="0.3" />
            <circle cx={m.cx} cy={m.cy} r="1.5" fill="#2CADA3" />
          </g>
        ))}
      </svg>
      <ul className="mt-6 space-y-3">
        {markers.map((m) => (
          <li key={m.name}>
            <Link
              href={m.href}
              className="flex items-center gap-2 text-sm font-medium text-teal-text transition-colors hover:text-teal"
            >
              <MapPin className="h-4 w-4" />
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
