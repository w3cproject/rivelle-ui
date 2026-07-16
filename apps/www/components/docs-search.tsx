"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Blocks, Component, FileText, Search, X } from "lucide-react";

export type DocsSearchItem = {
  name: string;
  description: string;
  href: string;
  kind: "Guide" | "Component" | "Block";
};

export function DocsSearch({ items }: { items: DocsSearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalized = query.trim().toLowerCase();
  const results = items
    .filter((item) =>
      `${item.name} ${item.description} ${item.kind}`
        .toLowerCase()
        .includes(normalized),
    )
    .slice(0, 10);

  function navigate(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <button
        className="docs-global-search"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Search />
        <span>Search documentation...</span>
        <kbd>⌘ K</kbd>
      </button>
      {open && (
        <div className="docs-search-overlay" role="presentation">
          <button
            aria-label="Close search"
            className="docs-search-backdrop"
            onClick={() => setOpen(false)}
            type="button"
          />
          <section
            aria-label="Search documentation"
            aria-modal="true"
            className="docs-search-dialog"
            role="dialog"
          >
            <div className="docs-search-input-row">
              <Search />
              <input
                autoFocus
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search components, blocks and guides..."
                value={query}
              />
              <button
                aria-label="Close search"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X />
              </button>
            </div>
            <div className="docs-search-results">
              {results.length > 0 ? (
                results.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    type="button"
                  >
                    <span className="docs-search-result-icon">
                      {item.kind === "Component" ? (
                        <Component />
                      ) : item.kind === "Block" ? (
                        <Blocks />
                      ) : (
                        <FileText />
                      )}
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                    </span>
                    <em>{item.kind}</em>
                  </button>
                ))
              ) : (
                <p className="docs-search-empty">No results for “{query}”.</p>
              )}
            </div>
            <footer>
              <span>
                <kbd>esc</kbd> close
              </span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
