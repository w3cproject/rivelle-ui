"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group inline-flex h-6 w-10.5 shrink-0 cursor-pointer items-center rounded-full border border-foreground/10 bg-foreground/[.09] p-0.5 outline-none transition-[background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(.22,1,.36,1)] data-[state=checked]:border-primary data-[state=checked]:bg-primary focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 rounded-full bg-background shadow-sm ring-0 transition-transform duration-150 ease-[cubic-bezier(.22,1,.36,1)] data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0 group-active:scale-95"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
