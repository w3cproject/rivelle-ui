import Link from "next/link";
import { Github } from "lucide-react";

import { RivelleLogo } from "@/components/rivelle-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/docs/components", label: "Components", id: "components" },
  { href: "/effects", label: "Effects", id: "effects" },
  { href: "/blocks", label: "Blocks", id: "blocks" },
  { href: "/templates", label: "Templates", id: "templates" },
] as const;

export function CatalogHeader({
  active,
}: {
  active: (typeof links)[number]["id"];
}) {
  return (
    <header className="sticky top-0 z-[70] border-b border-border bg-background/95">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-8 px-5 sm:px-8">
        <Link href="/">
          <RivelleLogo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm sm:flex">
          {links.map((link) => (
            <Link
              className={cn(
                "py-2 text-muted-foreground transition-colors duration-150 hover:text-foreground",
                active === link.id && "rivelle-cut font-medium text-foreground",
              )}
              href={link.href}
              key={link.id}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
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
  );
}
