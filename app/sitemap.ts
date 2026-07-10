import type { MetadataRoute } from "next";
import {
  articles,
  campaigns,
  organization,
  stories,
} from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = organization.url;
  const staticRoutes = [
    "",
    "/about",
    "/our-work",
    "/our-work/education",
    "/our-work/wash",
    "/our-work/livelihoods",
    "/where-we-work",
    "/campaigns",
    "/stories",
    "/news",
    "/get-involved",
    "/resources",
    "/contact",
  ];

  const articleRoutes = articles.map((a) => `/news/${a.slug}`);
  const storyRoutes = stories.map((s) => `/stories/${s.slug}`);
  const campaignRoutes = campaigns.map((c) => `/campaigns/${c.slug}`);

  const allRoutes = [
    ...staticRoutes,
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
