"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type PerspectiveGridProps = React.ComponentProps<"div"> & {
  fade?: boolean;
};

function PerspectiveGrid({
  children,
  className,
  fade = true,
  onPointerLeave,
  onPointerMove,
  style,
  ...props
}: PerspectiveGridProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-foreground text-background",
        className,
      )}
      data-slot="perspective-grid"
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--grid-rx", "58deg");
        event.currentTarget.style.setProperty("--grid-rz", "0deg");
        onPointerLeave?.(event);
      }}
      onPointerMove={(event) => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          event.currentTarget.style.setProperty(
            "--grid-rx",
            `${58 - y * 24}deg`,
          );
          event.currentTarget.style.setProperty("--grid-rz", `${x * 16}deg`);
        }
        onPointerMove?.(event);
      }}
      style={
        {
          "--grid-rx": "58deg",
          "--grid-rz": "0deg",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[-35%] bottom-[-32%] h-[88%] origin-bottom transition-transform duration-200 ease-out will-change-transform [backface-visibility:hidden] [transform:perspective(520px)_rotateX(var(--grid-rx))_rotateZ(var(--grid-rz))] motion-reduce:transition-none"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--primary) 44%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--primary) 44%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[26%] left-1/2 h-px w-[70%] -translate-x-1/2 bg-primary/70 shadow-[0_0_40px_8px_color-mix(in_oklch,var(--primary)_45%,transparent)]"
      />
      {fade ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,transparent_5%,var(--foreground)_72%)] opacity-80"
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export { PerspectiveGrid };
export type { PerspectiveGridProps };
