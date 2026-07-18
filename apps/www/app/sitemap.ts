import type { MetadataRoute } from "next";

import { componentDocs } from "@/lib/component-docs";
import { blockDocs } from "@/lib/block-docs";
import { effectDocs } from "@/lib/effect-docs";
import { templateDocs } from "@/lib/template-docs";

const baseUrl = "https://rivelle.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const componentPages: MetadataRoute.Sitemap = componentDocs.map(
    ({ slug }) => ({
      url: `${baseUrl}/docs/components/${slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );
  const blockPages: MetadataRoute.Sitemap = blockDocs.map(({ slug }) => ({
    url: `${baseUrl}/blocks/${slug}`,
    changeFrequency: "weekly",
    priority: 0.75,
  }));
  const effectPages: MetadataRoute.Sitemap = effectDocs.map(({ slug }) => ({
    url: `${baseUrl}/effects/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const templatePages: MetadataRoute.Sitemap = templateDocs.map(({ slug }) => ({
    url: `${baseUrl}/templates/${slug}`,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/docs`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${baseUrl}/docs/components`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${baseUrl}/blocks`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/effects`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/templates`, changeFrequency: "weekly", priority: 0.95 },
    {
      url: `${baseUrl}/docs/theming`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs/foundations/typography`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...componentPages,
    ...effectPages,
    ...blockPages,
    ...templatePages,
  ];
}
