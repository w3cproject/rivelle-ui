import {
  ArrowUpRight,
  Box,
  CircleDot,
  Grid3X3,
  MousePointer2,
  Move,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import { CompareSlider } from "@/effects/compare-slider";
import { CursorLens } from "@/effects/cursor-lens";
import { DirectionReveal } from "@/effects/direction-reveal";
import { DraggableStack } from "@/effects/draggable-stack";
import { GradientMesh } from "@/effects/gradient-mesh";
import { MagneticButton } from "@/effects/magnetic-button";
import { PerspectiveGrid } from "@/effects/perspective-grid";
import { RippleGrid } from "@/effects/ripple-grid";
import { ShimmerButton } from "@/effects/shimmer-button";
import { TextScramble } from "@/effects/text-scramble";
import { TiltCard } from "@/effects/tilt-card";
import type { EffectSlug } from "@/lib/effect-docs";
import { cn } from "@/lib/utils";

export function EffectPreview({
  className,
  compact = false,
  slug,
}: {
  className?: string;
  compact?: boolean;
  slug: EffectSlug;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[2rem] bg-foreground/[.025] p-5 sm:p-10",
        compact && "min-h-[350px] p-5",
        className,
      )}
    >
      {slug === "compare-slider" ? <CompareDemo /> : null}
      {slug === "direction-reveal" ? <DirectionDemo /> : null}
      {slug === "cursor-lens" ? <LensDemo /> : null}
      {slug === "draggable-stack" ? <StackDemo /> : null}
      {slug === "gradient-mesh" ? <GradientDemo compact={compact} /> : null}
      {slug === "ripple-grid" ? <RippleDemo /> : null}
      {slug === "tilt-card" ? <TiltDemo compact={compact} /> : null}
      {slug === "perspective-grid" ? <PerspectiveDemo /> : null}
      {slug === "text-scramble" ? <ScrambleDemo compact={compact} /> : null}
      {slug === "magnetic-button" ? <MagneticDemo compact={compact} /> : null}
      {slug === "shimmer-button" ? <ShimmerDemo compact={compact} /> : null}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute bottom-5 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-foreground/10 bg-background/75 px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-xl">
      <MousePointer2 className="size-3" /> {children}
    </span>
  );
}

function CompareDemo() {
  return (
    <div className="relative w-full max-w-2xl">
      <CompareSlider
        after={
          <div className="grid h-full place-items-center bg-[#080b14] text-white">
            <div className="relative grid size-36 place-items-center">
              <div className="absolute inset-0 rounded-full bg-violet-500/25 blur-2xl" />
              <div className="size-24 rotate-45 rounded-[2rem] border border-violet-300/40 bg-violet-500/30 shadow-[0_0_70px_-12px_#8b5cf6]" />
            </div>
          </div>
        }
        before={
          <div className="grid h-full place-items-center bg-[#f3f4f7] text-[#10121a]">
            <div className="grid size-36 place-items-center rounded-full border border-black/10 bg-[linear-gradient(135deg,#fff,#d8dce8)] shadow-xl">
              <CircleDot className="size-14 stroke-[1.2]" />
            </div>
          </div>
        }
        className="h-[290px]"
      />
      <Hint>Drag the divider</Hint>
    </div>
  );
}

function DirectionDemo() {
  return (
    <div className="relative w-full max-w-xl">
      <DirectionReveal
        className="h-[290px]"
        reveal={
          <div className="grid h-full place-items-center bg-primary text-primary-foreground">
            <div className="text-center">
              <ArrowUpRight className="mx-auto size-10" />
              <p className="mt-4 text-lg font-semibold">Direction detected</p>
            </div>
          </div>
        }
      >
        <div className="grid h-full place-items-center bg-card">
          <div className="text-center text-muted-foreground">
            <Move className="mx-auto size-10 stroke-[1.3]" />
            <p className="mt-4 text-sm">Enter from any edge</p>
          </div>
        </div>
      </DirectionReveal>
      <Hint>Try all four sides</Hint>
    </div>
  );
}

function LensDemo() {
  return (
    <div className="relative w-full max-w-2xl">
      <CursorLens className="h-[290px]" size={150} zoom={2}>
        <div className="relative grid h-full grid-cols-6 grid-rows-4 overflow-hidden bg-[#0a0d16] p-7 text-white">
          {Array.from({ length: 24 }).map((_, index) => (
            <span className="border-b border-r border-white/10" key={index} />
          ))}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <ScanSearch className="size-20 stroke-violet-300 stroke-[.7]" />
              <span className="absolute -right-8 -top-4 font-mono text-[10px] text-violet-300">
                0xRIVELLE
              </span>
              <span className="absolute -bottom-5 -left-12 font-mono text-[9px] text-white/45">
                DETAIL / 2048
              </span>
            </div>
          </div>
        </div>
      </CursorLens>
      <Hint>Inspect the details</Hint>
    </div>
  );
}

function StackDemo() {
  const cards = [
    ["Signal", "#8b5cf6", "01"],
    ["Orbit", "#06b6d4", "02"],
    ["Pulse", "#f43f5e", "03"],
  ] as const;
  return (
    <div className="relative w-full max-w-xl pt-3">
      <DraggableStack className="min-h-[300px]" threshold={90}>
        {cards.map(([label, color, number]) => (
          <div
            className="flex h-64 flex-col justify-between p-7 text-white"
            key={label}
            style={{
              background: `linear-gradient(145deg, ${color}, #090b12 78%)`,
            }}
          >
            <div className="flex items-center justify-between font-mono text-xs text-white/60">
              <span>RIVELLE / {number}</span>
              <Grid3X3 className="size-4" />
            </div>
            <p className="text-4xl font-semibold tracking-[-.06em]">{label}</p>
          </div>
        ))}
      </DraggableStack>
      <Hint>Throw the top card</Hint>
    </div>
  );
}

function GradientDemo({ compact }: { compact: boolean }) {
  return (
    <div className="relative w-full max-w-3xl">
      <GradientMesh className="grid min-h-[300px] place-items-center">
        <p
          className={cn(
            "text-center text-4xl font-semibold tracking-[-.06em]",
            !compact && "sm:text-6xl",
          )}
        >
          Bend the spectrum.
        </p>
      </GradientMesh>
      <Hint>Move the light field</Hint>
    </div>
  );
}

function RippleDemo() {
  return (
    <div className="relative w-full max-w-2xl">
      <RippleGrid columns={12} rows={7} />
      <Hint>Draw a delayed wave</Hint>
    </div>
  );
}

function TiltDemo({ compact }: { compact: boolean }) {
  return (
    <div className="relative pb-3">
      <TiltCard
        className={cn(
          "grid h-64 w-52 place-items-center bg-foreground text-background",
          !compact && "h-72 w-60",
        )}
        intensity={24}
      >
        <div className="text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-[1.75rem] bg-[conic-gradient(from_220deg,var(--primary),var(--accent),var(--primary))] shadow-[0_0_55px_-8px_var(--primary)]">
            <Box className="size-8" />
          </div>
          <p className="mt-6 text-sm font-semibold">Spatial surface</p>
        </div>
      </TiltCard>
      <Hint>Change the angle</Hint>
    </div>
  );
}

function PerspectiveDemo() {
  return (
    <div className="relative w-full max-w-3xl">
      <PerspectiveGrid className="grid min-h-[300px] place-items-center">
        <Move className="size-8 text-primary" />
      </PerspectiveGrid>
      <Hint>Tilt the horizon</Hint>
    </div>
  );
}

function ScrambleDemo({ compact }: { compact: boolean }) {
  return (
    <div className="relative grid min-h-[290px] w-full max-w-3xl place-items-center rounded-[2rem] bg-foreground text-background">
      <TextScramble
        className={cn(
          "text-3xl font-semibold tracking-[-.04em]",
          !compact && "sm:text-6xl",
        )}
        text="DECODE THE SIGNAL"
      />
      <Hint>Hover to replay</Hint>
    </div>
  );
}

function MagneticDemo({ compact }: { compact: boolean }) {
  return (
    <div className="relative grid min-h-[290px] w-full max-w-2xl place-items-center rounded-[2rem] border border-dashed border-foreground/15 bg-card">
      <MagneticButton
        className={cn(!compact && "min-h-14 px-9 text-base")}
        strength={28}
      >
        Come closer <ArrowUpRight className="size-4" />
      </MagneticButton>
      <Hint>Approach from any side</Hint>
    </div>
  );
}

function ShimmerDemo({ compact }: { compact: boolean }) {
  return (
    <div className="relative grid min-h-[290px] w-full max-w-2xl place-items-center rounded-[2rem] border border-foreground/10 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_45%)]">
      <ShimmerButton className={cn(!compact && "min-h-14 px-9 text-base")}>
        Launch experience <Sparkles className="size-4" />
      </ShimmerButton>
      <Hint>Move over the light</Hint>
    </div>
  );
}
