import type { ReactNode } from "react"

import { CopyCommand } from "@/components/copy-command"
import { cn } from "@/lib/utils"

export function ComponentPreview({
  title,
  description,
  command,
  children,
  className,
}: {
  title: string
  description: string
  command: string
  children: ReactNode
  className?: string
}) {
  return (
    <article className={cn("preview-card group", className)}>
      <div className="relative z-10 flex items-start justify-between gap-5 p-5 sm:p-6">
        <div>
          <h3 className="font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <span className="mt-1 size-2 shrink-0 rounded-full bg-primary/70 shadow-[0_0_16px_var(--primary)] transition-transform group-hover:scale-125" />
      </div>
      <div className="showcase-grid relative flex min-h-52 items-center justify-center border-y border-border/70 p-6 sm:p-10">
        <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-3">{children}</div>
      </div>
      <div className="p-3">
        <CopyCommand command={command} compact />
      </div>
    </article>
  )
}
