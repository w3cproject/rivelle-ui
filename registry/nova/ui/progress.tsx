"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({ className, value = 0, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const normalizedValue = Math.min(100, Math.max(0, value ?? 0))
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("relative h-2.5 w-full overflow-hidden rounded-full border border-foreground/8 bg-foreground/[.07] shadow-[inset_0_1px_2px_color-mix(in_oklch,var(--foreground)_8%,transparent)]", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary via-primary to-[oklch(.7_.2_285)] shadow-[0_0_20px_-5px_var(--primary)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${100 - normalizedValue}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
