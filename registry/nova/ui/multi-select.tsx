"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type MultiSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  maxSelected?: number;
  maxCount?: number;
  selectAllText?: string;
  clearText?: string;
  closeOnSelect?: boolean;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
};

function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Select options",
  searchPlaceholder = "Search options...",
  emptyText = "No results found.",
  maxSelected,
  maxCount = 2,
  selectAllText = "Select all",
  clearText = "Clear selection",
  closeOnSelect = false,
  disabled,
  className,
  contentClassName,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const selectedValues = value ?? internalValue;
  const selectedSet = React.useMemo(
    () => new Set(selectedValues),
    [selectedValues],
  );
  const selectedOptions = options.filter((option) =>
    selectedSet.has(option.value),
  );
  const enabledOptions = options.filter((option) => !option.disabled);
  const allSelected =
    enabledOptions.length > 0 &&
    enabledOptions.every((option) => selectedSet.has(option.value));
  const canSelectAll =
    maxSelected === undefined || maxSelected >= enabledOptions.length;

  const updateValue = (next: string[]) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  const toggle = (option: MultiSelectOption) => {
    if (option.disabled) return;

    if (selectedSet.has(option.value)) {
      updateValue(selectedValues.filter((item) => item !== option.value));
    } else if (
      maxSelected === undefined ||
      selectedValues.length < maxSelected
    ) {
      updateValue([...selectedValues, option.value]);
    }

    if (closeOnSelect) setOpen(false);
  };

  const toggleAll = () => {
    if (allSelected) {
      updateValue(
        selectedValues.filter(
          (value) => !enabledOptions.some((option) => option.value === value),
        ),
      );
      return;
    }

    const existing = selectedValues.filter(
      (value) => !enabledOptions.some((option) => option.value === value),
    );
    const available = enabledOptions.map((option) => option.value);
    updateValue(
      maxSelected === undefined
        ? [...existing, ...available]
        : [...existing, ...available].slice(0, maxSelected),
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "h-auto min-h-11.5 w-full justify-between gap-3 px-3.5 py-2 font-medium hover:-translate-y-0",
            !selectedOptions.length && "text-muted-foreground",
            className,
          )}
          data-slot="multi-select"
          disabled={disabled}
          role="combobox"
          variant="outline"
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {selectedOptions.length ? (
              <>
                {selectedOptions.slice(0, maxCount).map((option) => (
                  <span
                    className="inline-flex h-7 max-w-44 items-center rounded-lg border border-primary/12 bg-primary/9 px-2.5 text-xs font-semibold text-primary"
                    key={option.value}
                  >
                    <span className="truncate">{option.label}</span>
                  </span>
                ))}
                {selectedOptions.length > maxCount ? (
                  <span className="inline-flex h-7 items-center rounded-lg border border-foreground/10 bg-muted/70 px-2.5 text-xs font-semibold text-muted-foreground">
                    +{selectedOptions.length - maxCount}
                  </span>
                ) : null}
              </>
            ) : (
              <span className="truncate">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-[var(--radix-popover-trigger-width)] p-0",
          contentClassName,
        )}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList role="listbox" aria-multiselectable="true">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {canSelectAll ? (
                <CommandItem onSelect={toggleAll} value={selectAllText}>
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded border border-foreground/20",
                      allSelected &&
                        "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    <Check
                      className={cn("size-3", !allSelected && "opacity-0")}
                    />
                  </span>
                  {selectAllText}
                </CommandItem>
              ) : null}
              {options.map((option) => {
                const selected = selectedSet.has(option.value);
                const atLimit =
                  !selected &&
                  maxSelected !== undefined &&
                  selectedValues.length >= maxSelected;

                return (
                  <CommandItem
                    aria-selected={selected}
                    disabled={option.disabled || atLimit}
                    key={option.value}
                    onSelect={() => toggle(option)}
                    value={`${option.label} ${option.value}`}
                  >
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded border border-foreground/20",
                        selected &&
                          "border-primary bg-primary text-primary-foreground",
                      )}
                    >
                      <Check
                        className={cn("size-3", !selected && "opacity-0")}
                      />
                    </span>
                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length ? (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-muted-foreground"
                    onSelect={() => updateValue([])}
                    value={clearText}
                  >
                    <X className="size-3.5" />
                    {clearText}
                  </CommandItem>
                </CommandGroup>
              </>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
export type { MultiSelectOption, MultiSelectProps };
