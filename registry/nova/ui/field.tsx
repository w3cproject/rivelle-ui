import * as React from "react";

import { cn } from "@/lib/utils";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("grid min-w-0 gap-6", className)}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1 font-semibold tracking-[-0.025em] data-[variant=legend]:text-lg data-[variant=label]:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("grid w-full gap-5", className)}
      {...props}
    />
  );
}

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal" | "responsive";
}) {
  return (
    <div
      data-slot="field"
      data-orientation={orientation}
      className={cn(
        "group/field grid min-w-0 gap-2 data-[orientation=horizontal]:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)] data-[orientation=horizontal]:items-start data-[orientation=responsive]:grid-cols-1 data-[orientation=responsive]:sm:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)] data-[orientation=responsive]:sm:items-start",
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-semibold tracking-[-0.012em] group-has-[:disabled]/field:opacity-45",
        className,
      )}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("grid min-w-0 gap-2", className)}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-sm font-semibold tracking-[-0.012em]", className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-xs leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
        className,
      )}
      {...props}
    />
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content =
    children ??
    errors
      ?.filter(Boolean)
      .map((error) => error?.message)
      .filter(Boolean)
      .join(", ");
  if (!content) return null;
  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  );
}

function FieldSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      className={cn(
        "relative my-1 flex h-5 items-center justify-center text-xs text-muted-foreground before:absolute before:inset-x-0 before:h-px before:bg-foreground/10",
        className,
      )}
      {...props}
    >
      {children && (
        <span className="relative bg-background px-3">{children}</span>
      )}
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
