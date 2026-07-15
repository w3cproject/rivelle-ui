import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11.5 w-full min-w-0 rounded-xl border border-transparent bg-foreground/[.045] px-4 py-2 text-sm font-medium tracking-[-0.006em] text-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_72%,transparent),inset_0_-1px_0_color-mix(in_oklch,var(--foreground)_7%,transparent)] outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] placeholder:font-normal placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground hover:border-foreground/10 hover:bg-foreground/[.065] focus-visible:border-foreground/14 focus-visible:bg-background focus-visible:shadow-[inset_0_-2px_0_var(--primary),0_14px_34px_-24px_var(--foreground)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none aria-invalid:border-destructive/35 aria-invalid:shadow-[inset_0_-2px_0_var(--destructive)]",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
