import Link from "next/link";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/** stylized Africa map with region markers for East Africa */
export function RegionMap() {
  const markers = [
    { name: "Sudan", cx: 235, cy: 195, href: "/where-we-work#sudan" },
    { name: "South Sudan", cx: 240, cy: 260, href: "/where-we-work#south-sudan" },
    { name: "Somalia", cx: 330, cy: 280, href: "/where-we-work#somalia" },
  ];

  return (
    <div className="relative mx-auto max-w-lg rounded-2xl bg-sand p-6 shadow-sm border border-sand-deep">
      <svg
        viewBox="0 0 400 580"
        className="w-full text-teal-soft drop-shadow-[0_4px_12px_rgba(44,173,163,0.06)]"
        aria-hidden="true"
      >
        {/* Dotted Grid Background Pattern */}
        <defs>
          <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#2CADA3" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" rx="16" />

        {/* Simplified Africa Continent Silhouette */}
        <path
          d="M165,80 L180,82 L195,95 L200,105 L215,110 L230,100 L245,102 L250,110 L248,125 L235,140 L238,155 L250,170 L260,185 L280,195 L295,200 L310,198 L320,205 L315,220 L300,235 L305,250 L315,260 L330,265 L345,260 L360,270 L370,285 L368,300 L355,315 L350,330 L345,340 L340,360 L342,380 L350,395 L348,410 L335,420 L320,430 L300,445 L285,460 L270,480 L262,500 L255,515 L245,530 L230,545 L215,550 L200,540 L195,520 L190,500 L188,480 L192,460 L190,440 L185,420 L180,400 L172,385 L160,370 L150,355 L145,340 L140,320 L142,300 L140,280 L135,260 L128,245 L120,230 L110,225 L95,220 L80,215 L65,210 L55,200 L58,185 L70,175 L85,170 L100,165 L115,160 L125,150 L130,135 L140,120 L148,110 L155,95 Z"
          fill="#E4F4F2"
          stroke="#2CADA3"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Region markers */}
        {markers.map((m) => (
          <g key={m.name} className="cursor-pointer group">
            {/* Outer pulsing animation ring */}
            <circle
              cx={m.cx}
              cy={m.cy}
              r="14"
              fill="#E1723C"
              opacity="0.25"
              className="animate-ping origin-center"
              style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
            />
            {/* Hover expand indicator */}
            <circle
              cx={m.cx}
              cy={m.cy}
              r="8"
              fill="#2CADA3"
              opacity="0.3"
              className="transition-transform duration-300 group-hover:scale-150"
              style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
            />
            {/* Core marker */}
            <circle cx={m.cx} cy={m.cy} r="4.5" fill="#E1723C" stroke="#FFFFFF" strokeWidth="1.5" />
            
            {/* Text label overlay on map */}
            <text
              x={m.cx + 10}
              y={m.cy + 4}
              fill="#12304F"
              fontSize="10"
              fontWeight="bold"
              className="opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              {m.name}
            </text>
          </g>
        ))}
      </svg>
      <ul className="mt-6 grid grid-cols-3 gap-2 border-t border-sand-deep pt-4">
        {markers.map((m) => (
          <li key={m.name} className="text-center">
            <Link
              href={m.href}
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-text transition-colors hover:text-teal"
            >
              <MapPin className="h-3 w-3" />
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
