import type { MetadataRoute } from "next";
import { organization } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the staff admin, its login and the form endpoints out of search results
      disallow: ["/admin", "/admin-login", "/api/"],
    },
    sitemap: `${organization.url}/sitemap.xml`,
  };
}
