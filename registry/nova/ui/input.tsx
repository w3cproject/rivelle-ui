import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "h-11 w-full min-w-0 px-3.5 py-2 text-sm font-normal text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(.22,1,.36,1)] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "rounded-lg border [background:var(--control-background)] [border-color:var(--control-border)] [box-shadow:var(--control-shadow)] hover:[background:var(--control-background-hover)] hover:[border-color:var(--control-border-hover)] focus-visible:[background:var(--control-background)] focus-visible:[border-color:var(--control-focus-border)] focus-visible:[box-shadow:var(--control-focus-shadow)] aria-invalid:![border-color:color-mix(in_oklch,var(--destructive)_55%,transparent)] aria-invalid:![box-shadow:0_0_0_3px_color-mix(in_oklch,var(--destructive)_10%,transparent)]",
        prism:
          "rounded-lg border border-foreground/14 bg-background shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_78%,white),0_1px_2px_color-mix(in_oklch,var(--foreground)_7%,transparent)] hover:border-foreground/24 focus-visible:border-primary/65 focus-visible:ring-3 focus-visible:ring-primary/12 aria-invalid:border-destructive/55 aria-invalid:ring-destructive/10",
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
