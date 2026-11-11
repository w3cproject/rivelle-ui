"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EffectPreview } from "@/components/effect-preview";
import { Badge } from "@/components/ui/badge";
import {
  effectCategories,
  effectDocs,
  type EffectCategory,
} from "@/lib/effect-docs";
import { cn } from "@/lib/utils";

export function EffectGallery() {
  const [category, setCategory] = React.useState<"All" | EffectCategory>("All");
  const effects =
    category === "All"
      ? effectDocs
      : effectDocs.filter((effect) => effect.category === category);

  return (
    <>
      <div
        aria-label="Filter effects by category"
        className="mt-7 flex flex-wrap gap-1.5"
        role="group"
      >
        {effectCategories.map((item) => (
          <button
            aria-pressed={category === item}
            className={cn(
              "rounded-md border border-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              category === item &&
                "border-border bg-card text-foreground shadow-sm",
            )}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-x-8 gap-y-12 lg:grid-cols-2">
        {effects.map((effect) => (
          <article className="group min-w-0" key={effect.slug}>
            <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-card p-1.5">
              <EffectPreview compact slug={effect.slug} />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 px-1">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">
                    <Link href={`/effects/${effect.slug}`}>{effect.name}</Link>
                  </h3>
                  <Badge variant="secondary">{effect.category}</Badge>
                  {effect.client ? (
                    <Badge variant="outline">Interactive</Badge>
                  ) : null}
                </div>
                <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                  {effect.description}
                </p>
              </div>
              <Link
                aria-label={`Open ${effect.name}`}
                className="grid size-9 shrink-0 place-items-center rounded-md border border-foreground/10 text-muted-foreground transition-[border-color,color,background-color] duration-150 hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                href={`/effects/${effect.slug}`}
              >
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
