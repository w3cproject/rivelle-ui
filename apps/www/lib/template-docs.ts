export type TemplateSlug = "saas-landing-01" | "creative-portfolio-01";

export type TemplateCategory = "SaaS" | "Portfolio";

export type TemplateDoc = {
  slug: TemplateSlug;
  name: string;
  category: TemplateCategory;
  description: string;
  includes: string[];
};

export const templateDocs: TemplateDoc[] = [
  {
    slug: "saas-landing-01",
    name: "SaaS Landing",
    category: "SaaS",
    description:
      "A complete software landing page for turning product interest into qualified conversations.",
    includes: [
      "Responsive header and profile menu",
      "Product hero and dashboard preview",
      "Features, testimonials and pricing",
      "Contact form and complete footer",
    ],
  },
  {
    slug: "creative-portfolio-01",
    name: "Creative Portfolio",
    category: "Portfolio",
    description:
      "A bold studio portfolio for presenting selected work, process and availability.",
    includes: [
      "Studio navigation and profile actions",
      "Editorial hero and project gallery",
      "Profile card and working process",
      "Inquiry form and complete footer",
    ],
  },
];

export function getTemplateDoc(slug: string) {
  return templateDocs.find((template) => template.slug === slug);
}
