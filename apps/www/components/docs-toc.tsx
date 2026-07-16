"use client";

import { usePathname } from "next/navigation";

const componentItems = ["Installation", "Preview", "Usage", "API reference"];

export function DocsToc() {
  const pathname = usePathname();
  const isDocs = pathname === "/docs";
  const isIndex = pathname === "/docs/components";
  const isTypeset = pathname === "/docs/foundations/typography";
  const isTheming = pathname === "/docs/theming";
  const items = isDocs
    ? ["Overview", "Installation", "Theming", "CLI"]
    : isTheming
      ? ["Overview", "Configurator", "Preview", "CSS variables"]
      : isIndex
        ? ["Overview", "All components"]
        : isTypeset
          ? ["Overview", "Scale", "CSS contract"]
          : pathname === "/docs/components/button"
            ? [
                "Installation",
                "Preview",
                "Configurator",
                "Usage",
                "API reference",
              ]
            : componentItems;
  const getStartedHref =
    pathname.startsWith("/docs/components/") || isDocs
      ? "#installation"
      : "/docs#installation";

  return (
    <aside className="docs-toc">
      <div className="docs-toc-inner">
        <p>On this page</p>
        <nav>
          {items.map((item) => (
            <a href={`#${slugify(item)}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <div className="docs-toc-card">
          <span>Rivelle registry</span>
          <strong>Own every component.</strong>
          <p>Install editable source that stays inside your application.</p>
          <a href={getStartedHref}>Get started</a>
        </div>
      </div>
    </aside>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
