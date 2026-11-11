export type TemplateSlug =
  | "saas-landing-01"
  | "creative-portfolio-01"
  | "workspace-01"
  | "product-launch-01"
  | "ai-chat-workspace-01";

export type TemplateCategory = "SaaS" | "Portfolio" | "Application" | "AI";

export type TemplateDoc = {
  slug: TemplateSlug;
  name: string;
  category: TemplateCategory;
  description: string;
  includes: string[];
};

export const templateDocs: TemplateDoc[] = [
  {
    slug: "workspace-01",
    name: "Workspace",
    category: "Application",
    description:
      "An interactive project workspace with connected local flows, ready for your data layer.",
    includes: [
      "Project search, status filters and details",
      "Task completion and team invitations",
      "Files, activity and billing",
      "Workspace onboarding and quick actions",
    ],
  },
  {
    slug: "product-launch-01",
    name: "Product Launch",
    category: "SaaS",
    description:
      "A considered product launch site with scroll storytelling, release notes and pricing.",
    includes: [
      "Product hero and responsive navigation",
      "Three scroll-linked product scenes",
      "Release notes and billing period toggle",
      "Local signup demo ready for a mailing service",
    ],
  },
  {
    slug: "ai-chat-workspace-01",
    name: "AI Chat Workspace",
    category: "AI",
    description:
      "A provider-independent conversation interface with a local demo and an optional response handler.",
    includes: [
      "Conversation history and new chats",
      "Attachments, keyboard composer and cancellation",
      "Sources, code preview and copy actions",
      "Demo responses or your own async handler",
    ],
  },
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
