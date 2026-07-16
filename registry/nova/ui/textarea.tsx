import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-28 w-full resize-y rounded-xl border [background:var(--control-background)] [border-color:var(--control-border)] px-4 py-3 text-sm font-medium leading-relaxed tracking-[-0.006em] text-foreground [box-shadow:var(--control-shadow)] outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] placeholder:font-normal placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground hover:[background:var(--control-background-hover)] hover:[border-color:var(--control-border-hover)] hover:[box-shadow:var(--control-shadow-hover)] focus-visible:[background:var(--control-background)] focus-visible:[border-color:var(--control-focus-border)] focus-visible:[box-shadow:var(--control-focus-shadow)] disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none aria-invalid:![border-color:color-mix(in_oklch,var(--destructive)_55%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
