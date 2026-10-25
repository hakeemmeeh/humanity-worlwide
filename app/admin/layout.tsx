import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | HWW Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand/60 text-ink">
      <AdminNav />
      <div className="md:ml-64">
        <header className="sticky top-0 z-20 border-b border-sand-deep bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="truncate text-sm text-ink/50"><span className="hidden sm:inline">Humanity Worldwide · </span>Admin</p>
            <div className="flex shrink-0 items-center gap-4 sm:gap-5">
              <Link href="/" target="_blank" className="text-sm font-medium text-navy hover:underline">View site ↗</Link>
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
