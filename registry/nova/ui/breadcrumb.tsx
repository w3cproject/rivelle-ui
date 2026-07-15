import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol data-slot="breadcrumb-list" className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5", className)} {...props} />
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />
}

function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return <Comp data-slot="breadcrumb-link" className={cn("rounded-md outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/45", className)} {...props} />
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-current="page" aria-disabled="true" data-slot="breadcrumb-page" className={cn("font-semibold text-foreground", className)} {...props} />
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return <li aria-hidden="true" data-slot="breadcrumb-separator" className={cn("text-foreground/25 [&>svg]:size-3.5", className)} {...props}>{children ?? <ChevronRight />}</li>
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-hidden="true" data-slot="breadcrumb-ellipsis" className={cn("grid size-8 place-items-center rounded-lg bg-foreground/[.045]", className)} {...props}><MoreHorizontal className="size-4" /><span className="sr-only">More</span></span>
}

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator }
