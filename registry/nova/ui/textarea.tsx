import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-28 w-full resize-y rounded-lg border [background:var(--control-background)] [border-color:var(--control-border)] px-3.5 py-3 text-sm font-normal leading-relaxed text-foreground [box-shadow:var(--control-shadow)] outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(.22,1,.36,1)] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground hover:[background:var(--control-background-hover)] hover:[border-color:var(--control-border-hover)] focus-visible:[background:var(--control-background)] focus-visible:[border-color:var(--control-focus-border)] focus-visible:[box-shadow:var(--control-focus-shadow)] disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none aria-invalid:![border-color:color-mix(in_oklch,var(--destructive)_55%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
