"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
function TooltipContent({ className, sideOffset = 7, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) { return <TooltipPrimitive.Portal><TooltipPrimitive.Content data-slot="tooltip-content" sideOffset={sideOffset} className={cn("z-50 rounded-lg border border-background/10 bg-foreground px-3 py-2 text-[0.7rem] font-semibold tracking-[0.015em] text-background shadow-[0_12px_30px_-14px_var(--foreground)] data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95", className)} {...props} /></TooltipPrimitive.Portal> }

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
