import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://rivelle.dev/sitemap.xml",
    host: "https://rivelle.dev",
  }
}
