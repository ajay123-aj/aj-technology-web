import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ajtechhub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/products", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : ("monthly" as const),
    priority: route === "/" ? 1 : 0.8,
  }));
}
