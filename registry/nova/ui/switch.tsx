"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group inline-flex h-6.5 w-11.5 shrink-0 cursor-pointer items-center rounded-full border border-foreground/10 bg-foreground/[.09] p-0.5 shadow-[inset_0_1px_2px_color-mix(in_oklch,var(--foreground)_10%,transparent)] outline-none transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(.16,1,.3,1)] data-[state=checked]:border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_8px_20px_-14px_var(--primary)] focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 rounded-full bg-background shadow-[0_2px_8px_color-mix(in_oklch,var(--foreground)_18%,transparent)] ring-0 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 group-active:scale-90"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
