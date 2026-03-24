import { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/publicSiteUrl";

const baseUrl = getPublicSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/products", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : ("monthly" as const),
    priority: route === "/" ? 1 : 0.8,
  }));
}
