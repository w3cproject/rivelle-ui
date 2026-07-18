"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ShimmerButtonProps = React.ComponentProps<"button">;

function ShimmerButton({
  children,
  className,
  onPointerMove,
  style,
  type = "button",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-foreground px-7 text-sm font-semibold whitespace-nowrap text-background shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_15%,transparent),0_18px_60px_-24px_var(--primary)] outline-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_35%,transparent),0_24px_80px_-24px_var(--primary)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0 active:scale-[.98] motion-reduce:transition-none",
        className,
      )}
      data-slot="shimmer-button"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--shimmer-x",
          `${event.clientX - bounds.left}px`,
        );
        onPointerMove?.(event);
      }}
      style={
        {
          "--shimmer-x": "50%",
          ...style,
        } as React.CSSProperties
      }
      type={type}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(90px circle at var(--shimmer-x) 50%, color-mix(in oklch, var(--primary) 68%, transparent), transparent 72%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[-100%] left-[-35%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-background/35 to-transparent blur-sm motion-safe:animate-[rivelle-shimmer_2.8s_ease-in-out_infinite]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      <style>{`@keyframes rivelle-shimmer { 0%, 18% { transform: translateX(-180%) rotate(12deg); } 65%, 100% { transform: translateX(520%) rotate(12deg); } }`}</style>
    </button>
  );
}

export { ShimmerButton };
export type { ShimmerButtonProps };
