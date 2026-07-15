import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-lg border px-2.5 py-1.5 text-[0.68rem] font-semibold leading-none tracking-[0.045em] whitespace-nowrap uppercase shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_55%,transparent)] transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-foreground/10 bg-foreground text-background",
        secondary: "border-primary/12 bg-primary/10 text-primary",
        outline: "border-foreground/14 bg-background/60 text-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        success: "border-emerald-500/20 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
