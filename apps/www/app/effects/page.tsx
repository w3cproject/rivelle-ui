import type { Metadata } from "next";
import { Orbit } from "lucide-react";

import { EffectGallery } from "@/components/effect-gallery";
import { StyleSwitch } from "@/components/style-preview";
import { effectDocs } from "@/lib/effect-docs";

export const metadata: Metadata = {
  title: "Effects",
  description:
    "Interactive React effects with expressive motion, semantic themes and editable source.",
};

export default function EffectsPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-10 border-b border-border pb-16 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end">
        <div className="max-w-4xl">
          <p className="section-kicker">
            <Orbit /> Interaction effects
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-medium tracking-[-.03em] sm:text-7xl">
            Focused mechanics for expressive moments.
          </h1>
        </div>
        <div>
          <p className="text-base leading-7 text-muted-foreground">
            Pointer fields, kinetic actions, text motion and spatial surfaces.
            Each effect installs as editable source and respects reduced-motion
            preferences.
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
            <div>
              <dt className="text-foreground">{effectDocs.length}</dt>
              <dd>mechanics</dd>
            </div>
            <div>
              <dt className="text-foreground">2</dt>
              <dd>styles</dd>
            </div>
            <div>
              <dt className="text-foreground">0</dt>
              <dd>runtime lock-in</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="section-kicker">Effect index</p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-.02em]">
            Choose by interaction, not decoration.
          </h2>
        </div>
        <StyleSwitch label="Effect style" />
      </div>

      <EffectGallery />
    </main>
  );
}
