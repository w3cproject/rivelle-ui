import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva("relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 overflow-hidden rounded-2xl border px-5 py-4 text-sm shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_65%,transparent)] before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:rounded-full has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5", { variants: { variant: { default: "border-foreground/10 bg-foreground/[.03] text-card-foreground before:bg-primary [&>svg]:text-primary", destructive: "border-destructive/20 bg-destructive/[.045] text-destructive before:bg-destructive [&>svg]:text-destructive", success: "border-emerald-500/20 bg-emerald-500/[.045] text-emerald-700 before:bg-emerald-500 dark:text-emerald-300" } }, defaultVariants: { variant: "default" } })
function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) { return <div role="alert" data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} /> }
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="alert-title" className={cn("col-start-2 font-semibold leading-none tracking-[-0.015em]", className)} {...props} /> }
function AlertDescription({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="alert-description" className={cn("col-start-2 text-sm leading-relaxed text-muted-foreground", className)} {...props} /> }

export { Alert, AlertDescription, AlertTitle, alertVariants }
