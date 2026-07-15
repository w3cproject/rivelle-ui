"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return <RadioGroupPrimitive.Item data-slot="radio-group-item" className={cn("aspect-square size-[1.125rem] shrink-0 rounded-full border border-foreground/16 bg-foreground/[.045] text-primary shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)] outline-none transition-[border-color,box-shadow,transform] duration-200 data-[state=checked]:border-primary data-[state=checked]:shadow-[0_6px_16px_-10px_var(--primary)] active:scale-90 focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-45", className)} {...props}><RadioGroupPrimitive.Indicator className="grid place-items-center data-[state=checked]:animate-in data-[state=checked]:zoom-in-75"><Circle className="size-2.5 fill-current" strokeWidth={0} /></RadioGroupPrimitive.Indicator></RadioGroupPrimitive.Item>
}

export { RadioGroup, RadioGroupItem }
