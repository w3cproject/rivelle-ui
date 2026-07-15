import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-28 w-full resize-y rounded-xl border border-transparent bg-foreground/[.045] px-4 py-3 text-sm font-medium leading-relaxed tracking-[-0.006em] text-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_72%,transparent),inset_0_-1px_0_color-mix(in_oklch,var(--foreground)_7%,transparent)] outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] placeholder:font-normal placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground hover:border-foreground/10 hover:bg-foreground/[.065] focus-visible:border-foreground/14 focus-visible:bg-background focus-visible:shadow-[inset_0_-2px_0_var(--primary),0_16px_36px_-26px_var(--foreground)] disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none aria-invalid:border-destructive/35 aria-invalid:shadow-[inset_0_-2px_0_var(--destructive)]",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
