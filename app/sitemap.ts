import type { MetadataRoute } from "next";

const SITE_URL = "https://www.wokandflame.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Single-page site — only the homepage is a real, indexable URL. `#anchor`
  // fragments are not separate pages; search engines ignore/dedupe them, so
  // listing them here just added noise.
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
