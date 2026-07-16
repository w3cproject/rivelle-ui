import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "h-11.5 w-full min-w-0 px-4 py-2 text-sm font-medium tracking-[-0.006em] text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] placeholder:font-normal placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border [background:var(--control-background)] [border-color:var(--control-border)] [box-shadow:var(--control-shadow)] hover:[background:var(--control-background-hover)] hover:[border-color:var(--control-border-hover)] hover:[box-shadow:var(--control-shadow-hover)] focus-visible:[background:var(--control-background)] focus-visible:[border-color:var(--control-focus-border)] focus-visible:[box-shadow:var(--control-focus-shadow)] aria-invalid:![border-color:color-mix(in_oklch,var(--destructive)_55%,transparent)] aria-invalid:![box-shadow:0_0_0_4px_color-mix(in_oklch,var(--destructive)_10%,transparent)]",
        prism:
          "rounded-lg border border-foreground/14 bg-background shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_78%,white),0_1px_2px_color-mix(in_oklch,var(--foreground)_8%,transparent),0_5px_14px_-12px_var(--foreground)] hover:border-foreground/24 hover:shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_82%,white),0_2px_5px_color-mix(in_oklch,var(--foreground)_9%,transparent)] focus-visible:border-primary/65 focus-visible:ring-4 focus-visible:ring-primary/12 focus-visible:shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_82%,white),0_8px_24px_-16px_var(--primary)] aria-invalid:border-destructive/55 aria-invalid:ring-destructive/10",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
