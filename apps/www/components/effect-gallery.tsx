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
        className="mt-8 flex flex-wrap gap-2"
        role="group"
      >
        {effectCategories.map((item) => (
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
        {effects.map((effect) => (
          <article className="group min-w-0" key={effect.slug}>
            <div className="overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-foreground/[.02] p-2 shadow-[0_30px_90px_-70px_var(--foreground)]">
              <EffectPreview compact slug={effect.slug} />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 px-1">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold tracking-tight">
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
                className="grid size-9 shrink-0 place-items-center rounded-full border border-foreground/10 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:text-primary"
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
