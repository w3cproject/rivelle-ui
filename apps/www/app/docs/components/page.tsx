import Link from "next/link";

import { CopyPage } from "@/components/copy-page";
import { componentDocs } from "@/lib/component-docs";

export default function ComponentsPage() {
  return (
    <main className="docs-content">
      <section className="docs-page-intro" id="overview">
        <div>
          <p className="docs-eyebrow">Registry / Components</p>
          <h1>Components</h1>
          <p className="docs-lead">
            Accessible, editable primitives with strong defaults and complete
            local ownership.
          </p>
        </div>
        <CopyPage />
      </section>

      <section className="docs-section" id="all-components">
        <h2>All components</h2>
        <p>Start with a primitive and shape the source around your product.</p>
        <div className="docs-component-list">
          {componentDocs.map((component) => (
            <Link
              href={`/docs/components/${component.slug}`}
              key={component.slug}
            >
              <span>{component.name}</span>
              <small>{component.client ? "Client" : "Server-safe"}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
