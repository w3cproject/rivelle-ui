"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const values = React.useMemo(() => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min], [value, defaultValue, min])
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("relative flex w-full touch-none select-none items-center data-[disabled]:opacity-45 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className="relative h-2 w-full grow overflow-hidden rounded-full border border-foreground/8 bg-foreground/[.08] shadow-[inset_0_1px_2px_color-mix(in_oklch,var(--foreground)_9%,transparent)] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2">
        <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-gradient-to-r from-primary to-[oklch(.68_.2_285)] shadow-[0_0_16px_-5px_var(--primary)] data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-5 rounded-full border-2 border-background bg-primary shadow-[0_3px_12px_color-mix(in_oklch,var(--foreground)_22%,transparent)] outline-none transition-[box-shadow,transform] duration-200 hover:scale-110 focus-visible:ring-4 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 active:scale-95 motion-reduce:transform-none"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
