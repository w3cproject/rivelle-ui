"use client"

import * as React from "react"
import { CheckCircle2, Info, LoaderCircle, TriangleAlert, XCircle } from "lucide-react"
import { Toaster as Sonner, type ToasterProps, toast } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <XCircle className="size-4" />,
        loading: <LoaderCircle className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast rounded-2xl! border-foreground/12! bg-background/94! text-foreground! shadow-[0_24px_70px_-24px_color-mix(in_oklch,var(--foreground)_34%,transparent),inset_0_1px_0_color-mix(in_oklch,var(--background)_70%,transparent)]! backdrop-blur-xl!",
          title: "font-semibold! tracking-[-0.012em]!",
          description: "text-muted-foreground!",
          actionButton: "rounded-lg! bg-primary! text-primary-foreground!",
          cancelButton: "rounded-lg! bg-muted! text-muted-foreground!",
          success: "[&_[data-icon]]:text-[oklch(.62_.17_150)]!",
          error: "[&_[data-icon]]:text-destructive!",
          warning: "[&_[data-icon]]:text-[oklch(.72_.16_75)]!",
          info: "[&_[data-icon]]:text-primary!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
