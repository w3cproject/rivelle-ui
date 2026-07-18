"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TiltCardProps = React.ComponentProps<"div"> & {
  intensity?: number;
};

function TiltCard({
  children,
  className,
  intensity = 16,
  onPointerLeave,
  onPointerMove,
  style,
  ...props
}: TiltCardProps) {
  return (
    <div className="[perspective:900px]">
      <div
        className={cn(
          "group relative isolate overflow-hidden rounded-[2rem] border border-foreground/10 bg-card text-card-foreground shadow-[0_34px_90px_-55px_var(--foreground)] transition-transform duration-200 ease-out will-change-transform [backface-visibility:hidden] [transform:rotateX(var(--tilt-x))_rotateY(var(--tilt-y))] [transform-style:preserve-3d] motion-reduce:transform-none motion-reduce:transition-none",
          className,
        )}
        data-slot="tilt-card"
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--tilt-x", "0deg");
          event.currentTarget.style.setProperty("--tilt-y", "0deg");
          event.currentTarget.style.setProperty("--glare-x", "50%");
          event.currentTarget.style.setProperty("--glare-y", "50%");
          onPointerLeave?.(event);
        }}
        onPointerMove={(event) => {
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;
            event.currentTarget.style.setProperty(
              "--tilt-x",
              `${(0.5 - y) * intensity}deg`,
            );
            event.currentTarget.style.setProperty(
              "--tilt-y",
              `${(x - 0.5) * intensity}deg`,
            );
            event.currentTarget.style.setProperty("--glare-x", `${x * 100}%`);
            event.currentTarget.style.setProperty("--glare-y", `${y * 100}%`);
          }
          onPointerMove?.(event);
        }}
        style={
          {
            "--glare-x": "50%",
            "--glare-y": "50%",
            "--tilt-x": "0deg",
            "--tilt-y": "0deg",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--glare-x) var(--glare-y), color-mix(in oklch, var(--primary) 52%, transparent), transparent 68%)",
          }}
        />
        <div className="relative z-10 [transform:translateZ(28px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export { TiltCard };
export type { TiltCardProps };
