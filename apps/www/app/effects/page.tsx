import type { Metadata } from "next";
import { Orbit, Sparkles } from "lucide-react";

import { EffectGallery } from "@/components/effect-gallery";
import { StyleSwitch } from "@/components/style-preview";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Effects",
  description:
    "Interactive React effects with expressive motion, semantic themes and editable source.",
};

export default function EffectsPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-foreground px-6 py-16 text-background shadow-[0_50px_140px_-80px_var(--foreground)] sm:px-12 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 12% 10%, color-mix(in oklch, var(--primary) 72%, transparent), transparent 28%), radial-gradient(circle at 86% 80%, color-mix(in oklch, var(--accent) 48%, transparent), transparent 32%)",
          }}
        />
        <div className="relative max-w-4xl">
          <Badge
            className="border-background/15 bg-background/10 text-background"
            variant="outline"
          >
            <Orbit /> Rivelle Effects
          </Badge>
          <h1 className="mt-7 text-5xl font-semibold tracking-[-.065em] sm:text-7xl lg:text-[5.5rem]">
            Motion you can actually feel.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-background/60 sm:text-lg">
            Pointer fields, animated buttons, reactive backgrounds, text motion
            and dimensional surfaces. Each effect is a focused primitive with
            editable source.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium text-background/55">
            <span className="rounded-full border border-background/12 px-3 py-1.5">
              Pointer-aware
            </span>
            <span className="rounded-full border border-background/12 px-3 py-1.5">
              Reduced motion
            </span>
            <span className="rounded-full border border-background/12 px-3 py-1.5">
              Source owned
            </span>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="size-4" /> Effects collection
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            Eleven distinct mechanics. No duplicate glow fillers.
          </h2>
        </div>
        <StyleSwitch label="Effect style" />
      </div>

      <EffectGallery />
    </main>
  );
}
