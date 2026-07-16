import * as React from "react";

import { cn } from "@/lib/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "group/input-group relative flex min-h-11.5 w-full min-w-0 items-center overflow-hidden rounded-xl border [background:var(--control-background)] [border-color:var(--control-border)] [box-shadow:var(--control-shadow)] transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:[background:var(--control-background-hover)] hover:[border-color:var(--control-border-hover)] hover:[box-shadow:var(--control-shadow-hover)] focus-within:[background:var(--control-background)] focus-within:[border-color:var(--control-focus-border)] focus-within:[box-shadow:var(--control-focus-shadow)] has-[[aria-invalid=true]]:![border-color:color-mix(in_oklch,var(--destructive)_55%,transparent)] has-[[data-align=block-start]]:flex-wrap has-[[data-align=block-end]]:flex-wrap",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
}) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex shrink-0 items-center gap-2 px-3 text-sm text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0 data-[align=inline-end]:order-last data-[align=block-start]:w-full data-[align=block-start]:border-b data-[align=block-start]:border-foreground/8 data-[align=block-end]:order-last data-[align=block-end]:w-full data-[align=block-end]:border-t data-[align=block-end]:border-foreground/8",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        "h-11.5 min-w-0 flex-1 bg-transparent px-1 text-sm font-medium text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/70 first:pl-4 last:pr-4 disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(
        "min-h-24 min-w-0 flex-1 resize-y bg-transparent px-4 py-3 text-sm font-medium text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "text-xs font-semibold tracking-[-0.01em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
