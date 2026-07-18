"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type TagInputProps = Omit<
  React.ComponentProps<"input">,
  "defaultValue" | "onChange" | "value"
> & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  validateTag?: (value: string) => boolean;
  onInvalidTag?: (value: string) => void;
  maxTags?: number;
  allowDuplicates?: boolean;
  addOnBlur?: boolean;
  delimiters?: string[];
  inputClassName?: string;
  tagClassName?: string;
};

function TagInput({
  value,
  defaultValue = [],
  onValueChange,
  inputValue,
  defaultInputValue = "",
  onInputValueChange,
  validateTag,
  onInvalidTag,
  maxTags,
  allowDuplicates = false,
  addOnBlur = false,
  delimiters = [","],
  className,
  inputClassName,
  tagClassName,
  disabled,
  readOnly,
  name,
  placeholder = "Add a tag...",
  onBlur,
  onKeyDown,
  onPaste,
  ...props
}: TagInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [internalInputValue, setInternalInputValue] =
    React.useState(defaultInputValue);
  const tags = value ?? internalValue;
  const draft = inputValue ?? internalInputValue;

  const updateTags = React.useCallback(
    (next: string[]) => {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  const updateDraft = React.useCallback(
    (next: string) => {
      if (inputValue === undefined) setInternalInputValue(next);
      onInputValueChange?.(next);
    },
    [inputValue, onInputValueChange],
  );

  const addTags = React.useCallback(
    (candidates: string[]) => {
      if (disabled || readOnly) return;

      const next = [...tags];
      let changed = false;

      for (const candidate of candidates) {
        const tag = candidate.trim();
        if (!tag) continue;
        if (maxTags !== undefined && next.length >= maxTags) break;

        const isDuplicate = next.some(
          (item) => item.toLocaleLowerCase() === tag.toLocaleLowerCase(),
        );
        if ((!allowDuplicates && isDuplicate) || validateTag?.(tag) === false) {
          onInvalidTag?.(tag);
          continue;
        }

        next.push(tag);
        changed = true;
      }

      if (changed) updateTags(next);
      updateDraft("");
    },
    [
      allowDuplicates,
      disabled,
      maxTags,
      onInvalidTag,
      readOnly,
      tags,
      updateDraft,
      updateTags,
      validateTag,
    ],
  );

  const removeTag = (index: number) => {
    if (disabled || readOnly) return;
    updateTags(tags.filter((_, tagIndex) => tagIndex !== index));
  };

  const atLimit = maxTags !== undefined && tags.length >= maxTags;

  return (
    <div
      className={cn(
        "flex min-h-11.5 w-full flex-wrap items-center gap-1.5 rounded-xl border px-2.5 py-2 [background:var(--control-background)] [border-color:var(--control-border)] [box-shadow:var(--control-shadow)] transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:[background:var(--control-background-hover)] hover:[border-color:var(--control-border-hover)] hover:[box-shadow:var(--control-shadow-hover)] focus-within:[background:var(--control-background)] focus-within:[border-color:var(--control-focus-border)] focus-within:[box-shadow:var(--control-focus-shadow)] has-[[aria-invalid=true]]:![border-color:color-mix(in_oklch,var(--destructive)_55%,transparent)] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45",
        className,
      )}
      data-disabled={disabled || undefined}
      data-slot="tag-input"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          event.currentTarget
            .querySelector<HTMLInputElement>("input:not([type=hidden])")
            ?.focus();
        }
      }}
    >
      {name
        ? tags.map((tag, index) => (
            <input
              key={`${tag}-${index}`}
              name={name}
              type="hidden"
              value={tag}
            />
          ))
        : null}
      {tags.map((tag, index) => (
        <span
          className={cn(
            "inline-flex h-7 max-w-full items-center gap-1 rounded-lg border border-primary/12 bg-primary/9 px-2.5 text-xs font-semibold text-primary shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_55%,transparent)]",
            tagClassName,
          )}
          data-slot="tag-input-tag"
          key={`${tag}-${index}`}
        >
          <span className="truncate">{tag}</span>
          {!readOnly ? (
            <button
              aria-label={`Remove ${tag}`}
              className="-mr-1 inline-flex size-5 shrink-0 items-center justify-center rounded-md text-primary/65 outline-none transition-colors hover:bg-primary/12 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
              disabled={disabled}
              onClick={() => removeTag(index)}
              type="button"
            >
              <X className="size-3" />
            </button>
          ) : null}
        </span>
      ))}
      <input
        className={cn(
          "h-7 min-w-28 flex-1 bg-transparent px-1.5 text-sm font-medium text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/70 disabled:cursor-not-allowed",
          inputClassName,
        )}
        data-slot="tag-input-control"
        disabled={disabled}
        name={undefined}
        onBlur={(event) => {
          if (addOnBlur && draft) addTags([draft]);
          onBlur?.(event);
        }}
        onChange={(event) => updateDraft(event.target.value)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;

          if (event.key === "Enter" || delimiters.includes(event.key)) {
            if (draft) {
              event.preventDefault();
              addTags([draft]);
            }
          } else if (event.key === "Backspace" && !draft && tags.length) {
            event.preventDefault();
            removeTag(tags.length - 1);
          }
        }}
        onPaste={(event) => {
          onPaste?.(event);
          if (event.defaultPrevented) return;

          const pasted = event.clipboardData.getData("text");
          const separator = new RegExp(
            `[${delimiters.map(escapeRegExp).join("")}\\n]`,
          );
          if (separator.test(pasted)) {
            event.preventDefault();
            addTags(pasted.split(separator));
          }
        }}
        placeholder={tags.length || atLimit ? undefined : placeholder}
        readOnly={readOnly || atLimit}
        value={draft}
        {...props}
      />
    </div>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export { TagInput };
export type { TagInputProps };
