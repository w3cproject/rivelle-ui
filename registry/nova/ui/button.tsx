import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl text-sm font-semibold tracking-[-0.012em] outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[.985] disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none aria-invalid:ring-destructive/35 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        default:
          "[background:var(--action-background)] [color:var(--action-foreground)] [box-shadow:var(--action-shadow)] hover:[background:var(--action-background-hover)] hover:[box-shadow:var(--action-shadow-hover)]",
        signature:
          "rounded-[0.9rem_0.9rem_0.9rem_0.35rem] bg-primary text-primary-foreground shadow-[0_10px_28px_-16px_var(--primary)] hover:bg-primary/90",
        prism:
          "rounded-lg border border-white/14 bg-[linear-gradient(112deg,color-mix(in_oklch,var(--primary)_88%,oklch(.58_.24_292)),var(--primary)_48%,color-mix(in_oklch,var(--primary)_80%,oklch(.68_.2_245)))] text-white shadow-[inset_0_1px_0_oklch(1_0_0/.22),0_10px_24px_-13px_var(--primary),0_2px_5px_-2px_color-mix(in_oklch,var(--primary)_70%,black)] before:absolute before:inset-x-2 before:top-0 before:-z-10 before:h-px before:bg-white/45 after:absolute after:inset-y-0 after:-left-1/2 after:-z-10 after:w-1/3 after:skew-x-[-22deg] after:bg-white/18 after:blur-sm after:transition-[left] after:duration-700 hover:brightness-105 hover:shadow-[inset_0_1px_0_oklch(1_0_0/.28),0_16px_32px_-15px_var(--primary),0_3px_7px_-3px_color-mix(in_oklch,var(--primary)_70%,black)] hover:after:left-[125%]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_8px_24px_-16px_var(--destructive)] hover:bg-destructive/90 focus-visible:ring-destructive/35",
        outline:
          "border border-foreground/14 bg-background/65 text-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)] backdrop-blur-md hover:border-foreground/28 hover:bg-foreground/[.045]",
        secondary:
          "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary)_12%,transparent)] hover:bg-primary/16",
        ghost: "hover:bg-foreground/[.055] hover:text-foreground",
        link: "h-auto rounded-none p-0 text-primary underline-offset-4 hover:translate-y-0 hover:underline active:scale-100",
      },
      size: {
        default: "h-10.5 px-4.5 py-2",
        sm: "h-8.5 px-3.5 text-xs",
        lg: "h-12.5 px-6 text-[0.95rem]",
        icon: "size-10.5",
        "icon-sm": "size-8.5",
        "icon-lg": "size-12.5",
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
