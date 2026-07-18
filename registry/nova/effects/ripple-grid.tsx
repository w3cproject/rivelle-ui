"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RippleGridProps = React.ComponentProps<"div"> & {
  columns?: number;
  rows?: number;
};

function RippleGrid({
  className,
  columns = 12,
  onPointerLeave,
  onPointerMove,
  rows = 8,
  ...props
}: RippleGridProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const cells = Array.from({ length: columns * rows });

  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-[2rem] border border-foreground/10 bg-background",
        className,
      )}
      data-active-index={active ?? undefined}
      data-slot="ripple-grid"
      onPointerLeave={(event) => {
        setActive(null);
        onPointerLeave?.(event);
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const column = Math.min(
          columns - 1,
          Math.max(
            0,
            Math.floor(
              ((event.clientX - bounds.left) / bounds.width) * columns,
            ),
          ),
        );
        const row = Math.min(
          rows - 1,
          Math.max(
            0,
            Math.floor(((event.clientY - bounds.top) / bounds.height) * rows),
          ),
        );
        setActive(row * columns + column);
        onPointerMove?.(event);
      }}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      {...props}
    >
      {cells.map((_, index) => {
        const activeRow = active === null ? 0 : Math.floor(active / columns);
        const activeColumn = active === null ? 0 : active % columns;
        const row = Math.floor(index / columns);
        const column = index % columns;
        const distance =
          active === null
            ? 0
            : Math.hypot(row - activeRow, column - activeColumn);

        return (
          <span
            aria-hidden="true"
            className={cn(
              "aspect-square border-b border-r border-foreground/[.07] bg-transparent transition-[background-color,transform,box-shadow] duration-500 ease-out will-change-transform motion-reduce:transition-none",
              active !== null &&
                distance < 4.8 &&
                "scale-[.88] rounded-md bg-primary/[.22] shadow-[inset_0_0_28px_color-mix(in_oklch,var(--primary)_28%,transparent),0_0_24px_color-mix(in_oklch,var(--primary)_14%,transparent)]",
              active !== null &&
                distance < 1.2 &&
                "scale-[.68] rounded-lg bg-primary/75",
            )}
            key={index}
            style={{
              transitionDelay:
                active === null ? "0ms" : `${Math.round(distance * 28)}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

export { RippleGrid };
export type { RippleGridProps };
