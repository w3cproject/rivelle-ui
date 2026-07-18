"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type CompareSliderProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  after: React.ReactNode;
  before: React.ReactNode;
  defaultValue?: number;
  mode?: "drag" | "hover";
  onValueChange?: (value: number) => void;
  value?: number;
};

function CompareSlider({
  after,
  before,
  className,
  defaultValue = 50,
  mode = "drag",
  onPointerLeave,
  onPointerMove,
  onValueChange,
  value,
  ...props
}: CompareSliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [dragging, setDragging] = React.useState(false);
  const currentValue = value ?? internalValue;

  const update = React.useCallback(
    (nextValue: number) => {
      const clamped = Math.min(100, Math.max(0, nextValue));
      if (value === undefined) setInternalValue(clamped);
      onValueChange?.(clamped);
    },
    [onValueChange, value],
  );

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    update(((event.clientX - bounds.left) / bounds.width) * 100);
  };

  return (
    <div
      className={cn(
        "relative isolate touch-none select-none overflow-hidden rounded-[2rem] border border-foreground/10 bg-card outline-none",
        className,
      )}
      data-slot="compare-slider"
      onPointerDown={(event) => {
        if (mode !== "drag") return;
        setDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event);
      }}
      onPointerLeave={(event) => {
        if (mode === "hover") update(50);
        onPointerLeave?.(event);
      }}
      onPointerMove={(event) => {
        if (mode === "hover" || dragging) updateFromPointer(event);
        onPointerMove?.(event);
      }}
      onPointerUp={(event) => {
        setDragging(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      {...props}
    >
      <div className="absolute inset-0">{after}</div>
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - currentValue}% 0 0)` }}
      >
        {before}
      </div>
      <div
        aria-label="Comparison position"
        aria-orientation="horizontal"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(currentValue)}
        className="absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-background/90 shadow-[0_0_18px_rgba(0,0,0,.28)] outline-none"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") update(currentValue - 2);
          if (event.key === "ArrowRight") update(currentValue + 2);
          if (event.key === "Home") update(0);
          if (event.key === "End") update(100);
        }}
        role="slider"
        style={{ bottom: 0, left: `${currentValue}%`, top: 0 }}
        tabIndex={0}
      >
        <span
          className="absolute left-1/2 flex h-11 w-8 items-center justify-center rounded-full border border-background/40 bg-foreground text-background shadow-xl"
          style={{ top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <ChevronLeft className="size-3.5" />
          <ChevronRight className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

export { CompareSlider };
export type { CompareSliderProps };
