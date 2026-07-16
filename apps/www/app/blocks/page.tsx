import Link from "next/link";
import { ArrowUpRight, Blocks } from "lucide-react";

import { BlockPreview } from "@/components/block-preview";
import { StyleSwitch } from "@/components/style-preview";
import { Badge } from "@/components/ui/badge";
import { blockDocs } from "@/lib/block-docs";

export default function BlocksPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
      <div className="max-w-3xl">
        <Badge variant="outline">
          <Blocks /> Application blocks
        </Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-.055em] sm:text-7xl">
          Start with more than a blank page.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Production-minded compositions built from Rivelle primitives. Install
          the source, connect your data and make every detail yours.
        </p>
      </div>
      <StyleSwitch
        className="block-gallery-style-switch mt-12"
        label="Gallery style"
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {blockDocs.map((block) => (
          <article className="group relative min-w-0" key={block.slug}>
            <div className="block-card-preview">
              <div aria-hidden="true" className="block-card-canvas">
                <BlockPreview slug={block.slug} />
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 px-1">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold tracking-tight">
                    <Link
                      className="after:absolute after:inset-0"
                      href={`/blocks/${block.slug}`}
                    >
                      {block.name}
                    </Link>
                  </h2>
                  <Badge variant="secondary">{block.category}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {block.description}
                </p>
              </div>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
