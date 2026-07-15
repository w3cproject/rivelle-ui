"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) { return <AvatarPrimitive.Root data-slot="avatar" className={cn("relative flex size-9 shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[.04] shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_60%,transparent),0_8px_20px_-14px_var(--foreground)]", className)} {...props} /> }
function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) { return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full object-cover", className)} {...props} /> }
function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) { return <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cn("flex size-full items-center justify-center rounded-[inherit] bg-primary/8 text-xs font-semibold tracking-[-0.01em] text-primary", className)} {...props} /> }

export { Avatar, AvatarFallback, AvatarImage }
