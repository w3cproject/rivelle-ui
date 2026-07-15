import Link from "next/link";
import { Github, Search } from "lucide-react";

import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";
import { RivelleLogo } from "@/components/rivelle-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const topLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/theming", label: "Themes" },
  { href: "/docs/foundations/typography", label: "Typeset" },
  { href: "/blocks", label: "Blocks" },
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
            <span>Examples</span>
          </nav>
          <div className="docs-header-actions">
            <button className="docs-global-search" type="button">
              <Search />
              <span>Search documentation...</span>
              <kbd>⌘ K</kbd>
            </button>
            <Button aria-label="GitHub" size="icon-sm" variant="ghost">
              <Github />
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
