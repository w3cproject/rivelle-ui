"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:bg-foreground/[.055] hover:text-foreground active:scale-[.96] focus-visible:ring-2 focus-visible:ring-ring/45 disabled:pointer-events-none disabled:opacity-45 data-[state=on]:bg-primary/12 data-[state=on]:text-primary data-[state=on]:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary)_14%,transparent)] motion-reduce:transform-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-foreground/12 bg-background/70 shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
      },
      size: {
        default: "h-10 min-w-10 px-3",
        sm: "h-8 min-w-8 rounded-lg px-2.5 text-xs",
        lg: "h-12 min-w-12 px-4",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size }), className)} {...props} />
}

export { Toggle, toggleVariants }
