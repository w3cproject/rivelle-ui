import * as React from "react";

import { cn } from "@/lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-md border border-foreground/12 bg-foreground/[.055] px-1.5 py-0.5 font-mono text-[0.68rem] font-semibold leading-none text-muted-foreground shadow-[inset_0_-1px_0_color-mix(in_oklch,var(--foreground)_10%,transparent),inset_0_1px_0_color-mix(in_oklch,var(--background)_75%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
