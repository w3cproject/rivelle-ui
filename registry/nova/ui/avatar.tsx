"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) { return <AvatarPrimitive.Root data-slot="avatar" className={cn("relative flex size-9 shrink-0 overflow-hidden rounded-lg border border-foreground/10 bg-foreground/[.04]", className)} {...props} /> }
function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) { return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full object-cover", className)} {...props} /> }
function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) { return <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cn("flex size-full items-center justify-center rounded-[inherit] bg-primary/8 text-xs font-medium text-primary", className)} {...props} /> }

export { Avatar, AvatarFallback, AvatarImage }
