import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-[cubic-bezier(.22,1,.36,1)] active:scale-[.98] disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none aria-invalid:ring-destructive/35 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "[background:var(--action-background)] [color:var(--action-foreground)] [box-shadow:var(--action-shadow)] hover:[background:var(--action-background-hover)] hover:[box-shadow:var(--action-shadow-hover)]",
        signature:
          "rounded-[0.65rem_0.65rem_0.65rem_0.25rem] bg-primary text-primary-foreground hover:bg-primary/90",
        prism:
          "border border-white/14 bg-[linear-gradient(112deg,color-mix(in_oklch,var(--primary)_88%,oklch(.58_.24_292)),var(--primary)_48%,color-mix(in_oklch,var(--primary)_80%,oklch(.68_.2_245)))] text-white shadow-[inset_0_1px_0_oklch(1_0_0/.2),0_2px_6px_color-mix(in_oklch,var(--primary)_28%,transparent)] after:absolute after:inset-y-0 after:-left-1/2 after:-z-10 after:w-1/3 after:skew-x-[-22deg] after:bg-white/16 after:transition-[left] after:duration-500 hover:brightness-105 hover:after:left-[125%]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/35",
        outline:
          "border border-foreground/14 bg-background text-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_70%,white)] hover:border-foreground/24 hover:bg-foreground/[.04]",
        secondary:
          "border border-transparent bg-primary/10 text-primary hover:bg-primary/15",
        ghost: "hover:bg-foreground/[.055] hover:text-foreground",
        link: "h-auto rounded-none p-0 text-primary underline-offset-4 hover:translate-y-0 hover:underline active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-5 text-[0.95rem]",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
