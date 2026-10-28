import type { MetadataRoute } from "next";
import { organization, programs } from "@/data/content";
import { getArticles, getCampaigns, getStories } from "@/lib/published-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, stories, campaigns] = await Promise.all([getArticles(), getStories(), getCampaigns()]);
  const base = organization.url;
  const staticRoutes = [
    "",
    "/about",
    "/our-work",
    "/where-we-work",
    "/campaigns",
    "/media",
    "/news",
    "/get-involved",
    "/resources",
    "/contact",
  ];

  // Every programme page, taken from the same list the site uses
  const programRoutes = programs.map((p) => `/our-work/${p.slug}`);
  const articleRoutes = articles.map((a) => `/news/${a.slug}`);
  const storyRoutes = stories.map((s) => `/stories/${s.slug}`);
  const campaignRoutes = campaigns.map((c) => `/campaigns/${c.slug}`);

  const allRoutes = [
    ...staticRoutes,
    ...programRoutes,
    ...articleRoutes,
    ...storyRoutes,
    ...campaignRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.includes("/") && route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
