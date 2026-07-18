"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type GradientMeshProps = React.ComponentProps<"div"> & {
  followPointer?: boolean;
  speed?: "slow" | "normal";
};

function GradientMesh({
  children,
  className,
  followPointer = true,
  onPointerLeave,
  onPointerMove,
  speed = "normal",
  style,
  ...props
}: GradientMeshProps) {
  const frame = React.useRef<number | null>(null);

  const setPosition = (element: HTMLDivElement, x: number, y: number) => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--mesh-x", `${x}%`);
      element.style.setProperty("--mesh-y", `${y}%`);
    });
  };

  React.useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-background text-foreground shadow-[0_40px_120px_-70px_var(--foreground)]",
        className,
      )}
      data-slot="gradient-mesh"
      onPointerLeave={(event) => {
        setPosition(event.currentTarget, 50, 50);
        onPointerLeave?.(event);
      }}
      onPointerMove={(event) => {
        if (
          followPointer &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          const bounds = event.currentTarget.getBoundingClientRect();
          setPosition(
            event.currentTarget,
            ((event.clientX - bounds.left) / bounds.width) * 100,
            ((event.clientY - bounds.top) / bounds.height) * 100,
          );
        }
        onPointerMove?.(event);
      }}
      style={
        {
          "--mesh-x": "50%",
          "--mesh-y": "50%",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-[-45%] opacity-65 blur-3xl",
          speed === "slow"
            ? "motion-safe:animate-[spin_30s_linear_infinite]"
            : "motion-safe:animate-[spin_18s_linear_infinite]",
        )}
        style={{
          background:
            "conic-gradient(from 35deg at 50% 50%, transparent 0deg, color-mix(in oklch, var(--primary) 74%, transparent) 62deg, transparent 128deg, color-mix(in oklch, var(--accent) 62%, transparent) 214deg, transparent 286deg, color-mix(in oklch, var(--chart-3) 55%, transparent) 340deg, transparent 360deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px circle at var(--mesh-x) var(--mesh-y), color-mix(in oklch, var(--primary) 48%, transparent), transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-[15%] top-[8%] size-[58%] rounded-full bg-primary/20 blur-[80px] motion-safe:animate-[pulse_7s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-[20%] right-[-8%] size-[64%] rounded-full bg-accent/25 blur-[90px] motion-safe:animate-[pulse_9s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export { GradientMesh };
export type { GradientMeshProps };
