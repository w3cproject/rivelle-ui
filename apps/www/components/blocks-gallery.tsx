"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlockPreview } from "@/components/block-preview";
import { Badge } from "@/components/ui/badge";
import { blockDocs, type BlockCategory } from "@/lib/block-docs";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Authentication",
  "Application",
  "Marketing",
] as const;

export function BlocksGallery() {
  const [category, setCategory] = React.useState<"All" | BlockCategory>("All");
  const blocks =
    category === "All"
      ? blockDocs
      : blockDocs.filter((block) => block.category === category);

  return (
    <>
      <div
        aria-label="Filter blocks by category"
        className="mt-8 flex flex-wrap gap-2"
        role="group"
      >
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            className={cn(
              "rounded-full border border-foreground/10 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground",
              category === item &&
                "border-primary/25 bg-primary/10 text-primary",
            )}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {blocks.map((block) => (
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
    </>
  );
}
