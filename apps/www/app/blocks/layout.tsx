import Link from "next/link";
import { Github } from "lucide-react";

import { RivelleLogo } from "@/components/rivelle-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-8 px-5 sm:px-8">
          <Link href="/">
            <RivelleLogo />
          </Link>
          <nav className="hidden items-center gap-1 text-sm sm:flex">
            <Link
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              href="/docs/components"
            >
              Components
            </Link>
            <Link
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              href="/effects"
            >
              Effects
            </Link>
            <Link
              className="rounded-lg bg-muted px-3 py-2 font-semibold"
              href="/blocks"
            >
              Blocks
            </Link>
            <Link
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              href="/templates"
            >
              Templates
            </Link>
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
      {children}
    </div>
  );
}
