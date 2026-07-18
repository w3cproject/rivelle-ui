"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MagneticButtonProps = React.ComponentProps<"button"> & {
  strength?: number;
};

function MagneticButton({
  children,
  className,
  onPointerLeave,
  onPointerMove,
  strength = 18,
  style,
  type = "button",
  ...props
}: MagneticButtonProps) {
  const frame = React.useRef<number | null>(null);

  const move = (
    element: HTMLButtonElement,
    x: number,
    y: number,
    glowX: number,
    glowY: number,
  ) => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--magnetic-x", `${x}px`);
      element.style.setProperty("--magnetic-y", `${y}px`);
      element.style.setProperty("--magnetic-glow-x", `${glowX}%`);
      element.style.setProperty("--magnetic-glow-y", `${glowY}%`);
    });
  };

  React.useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <button
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-[0_18px_50px_-24px_var(--foreground)] outline-none transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_24px_65px_-28px_var(--foreground)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
      data-slot="magnetic-button"
      onPointerLeave={(event) => {
        move(event.currentTarget, 0, 0, 50, 50);
        onPointerLeave?.(event);
      }}
      onPointerMove={(event) => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          const bounds = event.currentTarget.getBoundingClientRect();
          const relativeX = (event.clientX - bounds.left) / bounds.width;
          const relativeY = (event.clientY - bounds.top) / bounds.height;
          const x = (relativeX - 0.5) * strength * 0.72;
          const y = (relativeY - 0.5) * strength * 0.72;
          move(event.currentTarget, x, y, relativeX * 100, relativeY * 100);
        }
        onPointerMove?.(event);
      }}
      style={
        {
          "--magnetic-glow-x": "50%",
          "--magnetic-glow-y": "50%",
          "--magnetic-x": "0px",
          "--magnetic-y": "0px",
          ...style,
        } as React.CSSProperties
      }
      type={type}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70px circle at var(--magnetic-glow-x) var(--magnetic-glow-y), color-mix(in oklch, white 32%, transparent), transparent 72%)",
        }}
      />
      <span
        className="relative z-10 inline-flex items-center gap-2 transition-[color,transform] duration-150 ease-out will-change-transform [backface-visibility:hidden] group-hover:text-primary-foreground motion-reduce:transform-none"
        style={{
          transform: "translate3d(var(--magnetic-x), var(--magnetic-y), 0)",
        }}
      >
        {children}
      </span>
    </button>
  );
}

export { MagneticButton };
export type { MagneticButtonProps };
