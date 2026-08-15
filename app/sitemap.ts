import type { MetadataRoute } from "next";
import { CASES, SERVICES } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    "",
    "/trabajo",
    "/servicios",
    "/inversion",
    "/equipo",
    "/proceso",
    "/blog",
    "/blog/radar-n1",
    "/privacidad",
    "/terminos",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const cases = CASES.map((item) => ({
    url: `${SITE_URL}/trabajo/${item.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const services = SERVICES.map((item) => ({
    url: `${SITE_URL}${item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...cases, ...services];
}
