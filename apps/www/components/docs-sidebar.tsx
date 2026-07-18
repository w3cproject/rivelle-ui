"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { componentDocs } from "@/lib/component-docs";
import { cn } from "@/lib/utils";

const sections = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs#installation", label: "Installation" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs#cli", label: "CLI" },
  { href: "/docs/foundations/typography", label: "Typeset", fresh: true },
  { href: "/templates", label: "Templates", fresh: true },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="docs-sidebar">
      <nav
        className="docs-sidebar-scroll"
        aria-label="Documentation navigation"
      >
        <div className="docs-nav-group">
          <p className="docs-nav-label">Sections</p>
          {sections.map((item) => (
            <DocsLink
              active={
                pathname === item.href ||
                (item.href === "/docs/components" &&
                  pathname.startsWith("/docs/components"))
              }
              href={item.href}
              key={item.href}
            >
              {item.label}
              {item.fresh ? <span className="docs-new-dot" /> : null}
            </DocsLink>
          ))}
        </div>

        <div className="docs-nav-group">
          <p className="docs-nav-label">Components</p>
          {componentDocs.map((component) => (
            <DocsLink
              active={pathname === `/docs/components/${component.slug}`}
              href={`/docs/components/${component.slug}`}
              key={component.slug}
            >
              {component.name}
            </DocsLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function DocsLink({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={cn("docs-nav-link", active && "docs-nav-link-active")}
      href={href}
    >
      {children}
    </Link>
  );
}
