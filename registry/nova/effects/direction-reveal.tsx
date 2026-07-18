"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type Direction = "top" | "right" | "bottom" | "left";

type DirectionRevealProps = React.ComponentProps<"div"> & {
  reveal: React.ReactNode;
  revealClassName?: string;
};

const transforms: Record<Direction, string> = {
  top: "translate3d(0,-101%,0)",
  right: "translate3d(101%,0,0)",
  bottom: "translate3d(0,101%,0)",
  left: "translate3d(-101%,0,0)",
};

function getDirection(event: React.MouseEvent<HTMLDivElement>): Direction {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - bounds.left - bounds.width / 2;
  const y = event.clientY - bounds.top - bounds.height / 2;
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle >= -45 && angle < 45) return "right";
  if (angle >= 45 && angle < 135) return "bottom";
  if (angle >= -135 && angle < -45) return "top";
  return "left";
}

function DirectionReveal({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  onPointerMove,
  reveal,
  revealClassName,
  ...props
}: DirectionRevealProps) {
  const [direction, setDirection] = React.useState<Direction>("bottom");
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[2rem] border border-foreground/10 bg-card [contain:paint]",
        className,
      )}
      data-direction={direction}
      data-slot="direction-reveal"
      onMouseEnter={(event) => {
        setDirection(getDirection(event));
        setVisible(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setDirection(getDirection(event));
        setVisible(false);
        onMouseLeave?.(event);
      }}
      onPointerMove={(event) => {
        if (!visible) {
          setDirection(getDirection(event));
          setVisible(true);
        }
        onPointerMove?.(event);
      }}
      {...props}
    >
      <div className="h-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]">
        {children}
      </div>
      <div
        aria-hidden={!visible}
        className={cn(
          "absolute inset-0 z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform [backface-visibility:hidden] motion-reduce:transition-none",
          revealClassName,
        )}
        style={{
          transform: visible ? "translate3d(0,0,0)" : transforms[direction],
        }}
      >
        {reveal}
      </div>
    </div>
  );
}

export { DirectionReveal };
export type { DirectionRevealProps };
