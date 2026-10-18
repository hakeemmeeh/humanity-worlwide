import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Safety net: public pages re-check the admin content at least every 60 seconds.
export const revalidate = 60;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
