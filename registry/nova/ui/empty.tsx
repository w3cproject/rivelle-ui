import * as React from "react";

import { cn } from "@/lib/utils";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "relative flex min-h-72 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-foreground/16 bg-foreground/[.018] px-6 py-12 text-center before:pointer-events-none before:absolute before:inset-x-1/4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/65 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  );
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "icon" }) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn(
        "mb-3 flex items-center justify-center text-muted-foreground data-[variant=icon]:size-13 data-[variant=icon]:rounded-2xl data-[variant=icon]:border data-[variant=icon]:border-foreground/10 data-[variant=icon]:bg-background data-[variant=icon]:text-foreground data-[variant=icon]:shadow-[0_12px_30px_-20px_var(--foreground),inset_0_1px_0_color-mix(in_oklch,var(--background)_80%,transparent)] data-[variant=icon]:[&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-title"
      className={cn("text-lg font-semibold tracking-[-0.03em]", className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "mt-6 flex w-full max-w-sm flex-col items-center gap-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};
