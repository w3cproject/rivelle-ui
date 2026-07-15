"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return <CheckboxPrimitive.Root data-slot="checkbox" className={cn("peer size-[1.125rem] shrink-0 rounded-md border border-foreground/16 bg-foreground/[.045] shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)] outline-none transition-[background-color,border-color,box-shadow,transform] duration-200 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-[0_6px_16px_-10px_var(--primary)] active:scale-90 focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-45", className)} {...props}><CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-items-center text-current data-[state=checked]:animate-in data-[state=checked]:zoom-in-75"><Check className="size-3" strokeWidth={3} /></CheckboxPrimitive.Indicator></CheckboxPrimitive.Root>
}

export { Checkbox }
