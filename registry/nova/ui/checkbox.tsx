"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return <CheckboxPrimitive.Root data-slot="checkbox" className={cn("peer size-[1.125rem] shrink-0 rounded-[0.3rem] border border-foreground/16 bg-foreground/[.04] outline-none transition-[background-color,border-color,box-shadow,transform] duration-150 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-45", className)} {...props}><CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-items-center text-current data-[state=checked]:animate-in data-[state=checked]:zoom-in-90"><Check className="size-3" strokeWidth={3} /></CheckboxPrimitive.Indicator></CheckboxPrimitive.Root>
}

export { Checkbox }
