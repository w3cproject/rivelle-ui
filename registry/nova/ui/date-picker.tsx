"use client";

import * as React from "react";
import { CalendarDays, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  locale = "en-US",
  disabled,
  clearable = false,
  className,
}: {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  locale?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(
    defaultValue,
  );
  const selected = value ?? internalValue;

  function update(next: Date | undefined) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
    if (next) setOpen(false);
  }

  return (
    <div data-slot="date-picker" className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            className={cn(
              "h-11.5 w-full justify-start px-4 text-left font-medium hover:-translate-y-0",
              !selected && "text-muted-foreground",
              clearable && selected && "pr-11",
            )}
          >
            <CalendarDays className="text-primary" />
            {selected
              ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
                  selected,
                )
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={update}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      {clearable && selected && !disabled && (
        <button
          type="button"
          aria-label="Clear date"
          className="absolute right-2 top-1/2 z-10 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[.055] hover:text-foreground"
          onClick={() => update(undefined)}
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export { DatePicker };
