import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="skeleton" className={cn("animate-pulse rounded-lg bg-gradient-to-r from-foreground/[.045] via-foreground/[.085] to-foreground/[.045] bg-[length:200%_100%]", className)} {...props} /> }

export { Skeleton }
