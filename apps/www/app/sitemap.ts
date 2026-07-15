import type { MetadataRoute } from "next"

import { componentDocs } from "@/lib/component-docs"

const baseUrl = "https://rivelle.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  const componentPages: MetadataRoute.Sitemap = componentDocs.map(({ slug }) => ({
    url: `${baseUrl}/docs/components/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/docs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/docs/components`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/docs/theming`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/docs/foundations/typography`, changeFrequency: "monthly", priority: 0.7 },
    ...componentPages,
  ]
}
