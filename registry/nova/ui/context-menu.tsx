"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return <ContextMenuPrimitive.Portal><ContextMenuPrimitive.Content data-slot="context-menu-content" className={cn("z-50 min-w-48 overflow-hidden rounded-2xl border border-foreground/12 bg-popover/96 p-1.5 text-popover-foreground shadow-[0_24px_70px_-24px_color-mix(in_oklch,var(--foreground)_28%,transparent),inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)] backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 motion-reduce:animate-none", className)} {...props} /></ContextMenuPrimitive.Portal>
}

function ContextMenuItem({ className, inset, variant = "default", ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }) {
  return <ContextMenuPrimitive.Item data-slot="context-menu-item" data-inset={inset} data-variant={variant} className={cn("relative flex cursor-default select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary data-[inset=true]:pl-9 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 data-[disabled]:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0", className)} {...props} />
}

function ContextMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return <ContextMenuPrimitive.CheckboxItem data-slot="context-menu-checkbox-item" className={cn("relative flex cursor-default select-none items-center rounded-xl py-2.5 pl-9 pr-3 text-sm font-medium outline-none transition-colors data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary data-[disabled]:opacity-45", className)} checked={checked} {...props}><span className="absolute left-3 grid size-4 place-items-center"><ContextMenuPrimitive.ItemIndicator><Check className="size-3.5" strokeWidth={2.5} /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.CheckboxItem>
}

function ContextMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return <ContextMenuPrimitive.RadioItem data-slot="context-menu-radio-item" className={cn("relative flex cursor-default select-none items-center rounded-xl py-2.5 pl-9 pr-3 text-sm font-medium outline-none transition-colors data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary data-[disabled]:opacity-45", className)} {...props}><span className="absolute left-3 grid size-4 place-items-center"><ContextMenuPrimitive.ItemIndicator><Circle className="size-2 fill-current" /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.RadioItem>
}

function ContextMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & { inset?: boolean }) {
  return <ContextMenuPrimitive.Label data-slot="context-menu-label" data-inset={inset} className={cn("px-3 py-2 text-[0.66rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase data-[inset=true]:pl-9", className)} {...props} />
}

function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator data-slot="context-menu-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="context-menu-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
}

function ContextMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return <ContextMenuPrimitive.SubTrigger data-slot="context-menu-sub-trigger" data-inset={inset} className={cn("flex cursor-default select-none items-center rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors data-[state=open]:bg-primary/10 data-[state=open]:text-primary data-[inset=true]:pl-9", className)} {...props}>{children}<ChevronRight className="ml-auto size-4" /></ContextMenuPrimitive.SubTrigger>
}

function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return <ContextMenuPrimitive.SubContent data-slot="context-menu-sub-content" className={cn("z-50 min-w-40 overflow-hidden rounded-2xl border border-foreground/12 bg-popover/96 p-1.5 text-popover-foreground shadow-[0_20px_60px_-24px_color-mix(in_oklch,var(--foreground)_28%,transparent)] backdrop-blur-xl", className)} {...props} />
}

export { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger }
