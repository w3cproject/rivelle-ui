"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) { return <CommandPrimitive data-slot="command" className={cn("flex size-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-popover/96 text-popover-foreground shadow-[0_24px_70px_-30px_color-mix(in_oklch,var(--foreground)_30%,transparent),inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)] backdrop-blur-xl", className)} {...props} /> }
function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) { return <div className="flex h-12 items-center gap-2.5 border-b border-foreground/8 px-4"><Search className="size-4 shrink-0 text-primary" /><CommandPrimitive.Input className={cn("flex h-11 w-full bg-transparent py-3 text-sm font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground/70 disabled:opacity-45", className)} {...props} /></div> }
function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) { return <CommandPrimitive.List className={cn("max-h-72 overflow-y-auto overflow-x-hidden p-1.5", className)} {...props} /> }
function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) { return <CommandPrimitive.Empty className="py-8 text-center text-sm text-muted-foreground" {...props} /> }
function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) { return <CommandPrimitive.Group className={cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.66rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase", className)} {...props} /> }
function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) { return <CommandPrimitive.Separator className={cn("-mx-1 h-px bg-border", className)} {...props} /> }
function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) { return <CommandPrimitive.Item className={cn("relative flex cursor-default select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors data-[disabled=true]:pointer-events-none data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary data-[disabled=true]:opacity-45 [&_svg]:size-4", className)} {...props} /> }
function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) { return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} /> }

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut }
