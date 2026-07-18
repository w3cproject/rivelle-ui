"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type CursorLensProps = React.ComponentProps<"div"> & {
  lensClassName?: string;
  size?: number;
  zoom?: number;
};

function CursorLens({
  children,
  className,
  lensClassName,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  size = 180,
  zoom = 1.75,
  ...props
}: CursorLensProps) {
  const [active, setActive] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [bounds, setBounds] = React.useState({ width: 0, height: 0 });
  const frame = React.useRef<number | null>(null);

  React.useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <div
      className={cn(
        "relative isolate cursor-none overflow-hidden rounded-[2rem] border border-foreground/10 bg-card",
        className,
      )}
      data-slot="cursor-lens"
      onPointerEnter={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setBounds({ width: rect.width, height: rect.height });
        setActive(true);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setActive(false);
        onPointerLeave?.(event);
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const next = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        if (frame.current !== null) cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => setPosition(next));
        onPointerMove?.(event);
      }}
      {...props}
    >
      <div className="h-full">{children}</div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-20 overflow-hidden rounded-full border border-background/50 bg-background shadow-[0_18px_70px_-20px_var(--foreground)] transition-opacity duration-200 will-change-transform [backface-visibility:hidden] motion-reduce:hidden",
          active ? "opacity-100" : "opacity-0",
          lensClassName,
        )}
        style={{
          height: size,
          transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0)`,
          width: size,
        }}
      >
        <div
          className="absolute left-0 top-0 will-change-transform [backface-visibility:hidden]"
          style={{
            height: bounds.height,
            transform: `translate3d(${size / 2 - position.x}px, ${size / 2 - position.y}px, 0) scale(${zoom})`,
            transformOrigin: `${position.x}px ${position.y}px`,
            width: bounds.width,
          }}
        >
          {children}
        </div>
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/10" />
      </div>
    </div>
  );
}

export { CursorLens };
export type { CursorLensProps };
