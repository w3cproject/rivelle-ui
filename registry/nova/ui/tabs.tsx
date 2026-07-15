"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) { return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-3", className)} {...props} /> }
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) { return <TabsPrimitive.List data-slot="tabs-list" className={cn("inline-flex h-10 w-fit items-center rounded-xl border border-foreground/8 bg-foreground/[.04] p-1 text-muted-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)]", className)} {...props} /> }
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) { return <TabsPrimitive.Trigger data-slot="tabs-trigger" className={cn("inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-transparent px-3.5 text-sm font-semibold tracking-[-0.01em] whitespace-nowrap outline-none transition-[color,background-color,box-shadow,transform] duration-200 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[0_8px_18px_-12px_var(--foreground)] active:scale-[.98] focus-visible:ring-2 focus-visible:ring-ring/45 disabled:pointer-events-none disabled:opacity-45", className)} {...props} /> }
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) { return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} /> }

export { Tabs, TabsContent, TabsList, TabsTrigger }
