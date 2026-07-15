"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { DayPicker, type ChevronProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "w-fit rounded-2xl border border-foreground/10 bg-background/80 p-3 shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_75%,transparent)]",
        className,
      )}
      classNames={{
        months: "relative flex flex-col gap-5 sm:flex-row",
        month: "flex w-full flex-col gap-4",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "size-8 hover:-translate-y-0",
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "size-8 hover:-translate-y-0",
        ),
        month_caption: "flex h-8 items-center justify-center px-9",
        caption_label: "text-sm font-semibold tracking-[-0.02em]",
        dropdowns:
          "flex h-8 items-center justify-center gap-1 text-sm font-semibold",
        dropdown_root:
          "relative rounded-lg border border-foreground/10 bg-foreground/[.035] px-2 py-1",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 rounded-md text-center text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center text-sm [&:has([aria-selected].range-end)]:rounded-r-xl [&:has([aria-selected].range-start)]:rounded-l-xl [&:has([aria-selected])]:bg-primary/10",
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "size-9 rounded-xl p-0 font-medium hover:-translate-y-0",
        ),
        range_start: "range-start",
        range_middle:
          "aria-selected:bg-primary/10 aria-selected:text-foreground aria-selected:rounded-none",
        range_end: "range-end",
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:shadow-[0_8px_20px_-12px_var(--primary)]",
        today:
          "[&>button]:border [&>button]:border-primary/35 [&>button]:text-primary",
        outside: "text-muted-foreground/45 opacity-60",
        disabled: "text-muted-foreground/35 opacity-40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{ Chevron: CalendarChevron, ...props.components }}
      {...props}
    />
  );
}

function CalendarChevron({ orientation, className, ...props }: ChevronProps) {
  const Icon =
    orientation === "left"
      ? ChevronLeft
      : orientation === "right"
        ? ChevronRight
        : orientation === "up"
          ? ChevronUp
          : ChevronDown;
  return <Icon className={cn("size-4", className)} {...props} />;
}

export { Calendar };
