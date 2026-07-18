import Link from "next/link";
import { Github } from "lucide-react";

import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsSearch, type DocsSearchItem } from "@/components/docs-search";
import { DocsToc } from "@/components/docs-toc";
import { RivelleLogo } from "@/components/rivelle-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { blockDocs } from "@/lib/block-docs";
import { componentDocs } from "@/lib/component-docs";
import { effectDocs } from "@/lib/effect-docs";
import { templateDocs } from "@/lib/template-docs";
import { siteConfig } from "@/lib/site";

const topLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/effects", label: "Effects" },
  { href: "/docs/theming", label: "Themes" },
  { href: "/docs/foundations/typography", label: "Typeset" },
  { href: "/blocks", label: "Blocks" },
  { href: "/templates", label: "Templates" },
];

const searchItems: DocsSearchItem[] = [
  {
    name: "Documentation",
    description: "Installation and CLI overview",
    href: "/docs",
    kind: "Guide",
  },
  {
    name: "Theme Studio",
    description: "Nova, Prism and semantic tokens",
    href: "/docs/theming",
    kind: "Guide",
  },
  {
    name: "Typography",
    description: "Geist, Inter and the type scale",
    href: "/docs/foundations/typography",
    kind: "Guide",
  },
  ...componentDocs.map((item) => ({
    name: item.name,
    description: item.description,
    href: `/docs/components/${item.slug}`,
    kind: "Component" as const,
  })),
  ...effectDocs.map((item) => ({
    name: item.name,
    description: item.description,
    href: `/effects/${item.slug}`,
    kind: "Effect" as const,
  })),
  ...blockDocs.map((item) => ({
    name: item.name,
    description: item.description,
    href: `/blocks/${item.slug}`,
    kind: "Block" as const,
  })),
  ...templateDocs.map((item) => ({
    name: item.name,
    description: item.description,
    href: `/templates/${item.slug}`,
    kind: "Template" as const,
  })),
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-shell min-h-screen">
      <header className="docs-header">
        <div className="docs-header-inner">
          <Link className="docs-brand" href="/">
            <RivelleLogo markClassName="size-5" />
          </Link>
          <nav className="docs-top-nav">
            {topLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="docs-header-actions">
            <DocsSearch items={searchItems} />
            <Button
              aria-label="Open Rivelle on GitHub"
              asChild
              size="icon-sm"
              variant="ghost"
            >
              <a href={siteConfig.github} rel="noreferrer" target="_blank">
                <Github />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="docs-layout">
        <DocsSidebar />
        <div className="docs-main">{children}</div>
        <DocsToc />
      </div>
    </div>
  );
}
