import type { Metadata } from "next";
import { navLinks } from "@/data/content";

const mediaNav = navLinks.find((l) => l.href === "/media")!;

export const metadata: Metadata = {
  title: mediaNav.label,
  description:
    "Field documentaries and success stories from Humanity Worldwide teams across South Sudan, Somalia, Sudan, and Kenya.",
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
