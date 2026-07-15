"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return <SelectPrimitive.Trigger data-slot="select-trigger" className={cn("flex h-11.5 w-full items-center justify-between gap-2 rounded-xl border border-transparent bg-foreground/[.045] px-4 text-sm font-medium tracking-[-0.006em] shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_72%,transparent),inset_0_-1px_0_color-mix(in_oklch,var(--foreground)_7%,transparent)] outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] data-[placeholder]:font-normal data-[placeholder]:text-muted-foreground/70 hover:border-foreground/10 hover:bg-foreground/[.065] focus-visible:border-foreground/14 focus-visible:bg-background focus-visible:shadow-[inset_0_-2px_0_var(--primary),0_14px_34px_-24px_var(--foreground)] disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-180", className)} {...props}>{children}<SelectPrimitive.Icon asChild><ChevronDown /></SelectPrimitive.Icon></SelectPrimitive.Trigger>
}

function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return <SelectPrimitive.Portal><SelectPrimitive.Content data-slot="select-content" position={position} className={cn("relative z-50 max-h-80 min-w-[8rem] overflow-hidden rounded-2xl border border-foreground/12 bg-popover/96 text-popover-foreground shadow-[0_24px_70px_-24px_color-mix(in_oklch,var(--foreground)_28%,transparent),inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)] backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", position === "popper" && "data-[side=bottom]:translate-y-1.5 data-[side=top]:-translate-y-1.5", className)} {...props}><SelectScrollUpButton /><SelectPrimitive.Viewport className={cn("p-1.5", position === "popper" && "h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]")}>{children}</SelectPrimitive.Viewport><SelectScrollDownButton /></SelectPrimitive.Content></SelectPrimitive.Portal>
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) { return <SelectPrimitive.Label className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)} {...props} /> }
function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) { return <SelectPrimitive.Item className={cn("relative flex w-full cursor-default select-none items-center rounded-xl py-2 pl-3 pr-9 text-sm font-medium outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary data-[state=checked]:text-primary data-[disabled]:opacity-45", className)} {...props}><span className="absolute right-3 grid size-4 place-items-center"><SelectPrimitive.ItemIndicator><Check className="size-3.5" strokeWidth={2.5} /></SelectPrimitive.ItemIndicator></span><SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText></SelectPrimitive.Item> }
function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) { return <SelectPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} /> }
function SelectScrollUpButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) { return <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1" {...props}><ChevronUp className="size-4" /></SelectPrimitive.ScrollUpButton> }
function SelectScrollDownButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) { return <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1" {...props}><ChevronDown className="size-4" /></SelectPrimitive.ScrollDownButton> }

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue }
