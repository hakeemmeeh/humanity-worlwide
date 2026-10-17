"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, MessageSquare, HeartHandshake, Newspaper, Quote, LifeBuoy, Clapperboard, Settings,
} from "lucide-react";

const groups = [
  {
    label: "Inbox",
    links: [
      { href: "/admin/inquiries", label: "Messages", icon: MessageSquare },
      { href: "/admin/volunteers", label: "Volunteers", icon: HeartHandshake },
    ],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/content/news", label: "News", icon: Newspaper },
      { href: "/admin/content/stories", label: "Success Stories", icon: Quote },
      { href: "/admin/content/emergency", label: "Emergency Response", icon: LifeBuoy },
      { href: "/admin/content/documentaries", label: "Field Documentaries", icon: Clapperboard },
    ],
  },
  { label: "", links: [{ href: "/admin/settings", label: "Settings", icon: Settings }] },
];

const all = [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }, ...groups.flatMap((g) => g.links)];

export function AdminNav() {
  const path = usePathname();
  const active = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  return (
    <>
      {/* mobile: scrolling pills */}
      <nav aria-label="Admin" className="flex gap-2 overflow-x-auto bg-navy-deep px-3 py-3 md:hidden">
        {all.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${active(l.href) ? "bg-teal text-white" : "bg-white/10 text-white/80"}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* desktop: fixed sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 flex-col bg-navy-deep px-4 py-8 text-white md:flex">
        <Link href="/admin" className="mb-8 block w-fit rounded-lg bg-white px-3 py-2">
          <Image src="/logo-full.png" alt="Humanity Worldwide" width={180} height={56} className="h-10 w-auto" />
        </Link>
        <nav aria-label="Admin" className="flex flex-1 flex-col gap-1 overflow-y-auto">
          <NavLink l={all[0]} on={active(all[0].href)} />
          {groups.map((g, i) => (
            <div key={i} className="mt-4">
              {g.label && <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">{g.label}</p>}
              {g.links.map((l) => <NavLink key={l.href} l={l} on={active(l.href)} />)}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

function NavLink({ l, on }: { l: (typeof all)[number]; on: boolean }) {
  const Icon = l.icon;
  return (
    <Link
      href={l.href}
      aria-current={on ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${on ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {l.label}
    </Link>
  );
}
