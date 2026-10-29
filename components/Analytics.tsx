import Script from "next/script";
import { googleAnalyticsId } from "@/data/content";

/**
 * Google Analytics 4. Loads after the page has finished loading so it never
 * slows the site down. Only used in the public site layout, so the staff admin
 * is not tracked. Page changes are counted automatically by GA4's
 * "enhanced measurement" (on by default).
 */
export function Analytics() {
  if (!googleAnalyticsId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`}
      </Script>
    </>
  );
}
