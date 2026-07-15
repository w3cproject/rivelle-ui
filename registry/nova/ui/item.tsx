import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const itemVariants = cva(
  "group/item relative flex w-full items-center gap-4 rounded-2xl border text-left outline-none transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-ring/45 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-45",
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent hover:bg-foreground/[.04]",
        outline:
          "border-foreground/10 bg-background/65 shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_70%,transparent)] hover:border-foreground/16 hover:bg-foreground/[.025]",
        muted:
          "border-transparent bg-foreground/[.04] hover:bg-foreground/[.065]",
      },
      size: {
        default: "p-4",
        sm: "gap-3 rounded-xl p-3",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Item({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "icon" | "image" }) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(
        "flex shrink-0 items-center justify-center text-muted-foreground data-[variant=icon]:size-10 data-[variant=icon]:rounded-xl data-[variant=icon]:bg-primary/10 data-[variant=icon]:text-primary data-[variant=image]:size-12 data-[variant=image]:overflow-hidden data-[variant=image]:rounded-xl [&_svg]:size-5 [&_img]:size-full [&_img]:object-cover",
        className,
      )}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("min-w-0 flex-1 space-y-1", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn("text-sm font-semibold tracking-[-0.012em]", className)}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex w-full items-center justify-between gap-3",
        className,
      )}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex w-full items-center justify-between gap-3",
        className,
      )}
      {...props}
    />
  );
}

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="item-separator"
      className={cn("mx-4 h-px bg-border/80", className)}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  itemVariants,
};
