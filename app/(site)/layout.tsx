import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

// Safety net: public pages re-check the admin content at least every 60 seconds.
export const revalidate = 60;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">{children}</main>
      <Footer />
      <Analytics />
    </>
  );
}
