"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepperStep = {
  id: string;
  title: string;
  description?: string;
  error?: string;
};
export function Stepper({
  steps,
  value,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: Omit<React.ComponentProps<"ol">, "children"> & {
  steps: StepperStep[];
  value: number;
  onValueChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <ol
      aria-label="Progress"
      className={cn(
        "flex gap-4",
        orientation === "vertical" ? "flex-col" : "flex-wrap",
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={cn(
            "flex min-w-0 items-start gap-3",
            orientation === "horizontal" && "flex-1 basis-32",
          )}
        >
          <button
            type="button"
            disabled={!onValueChange || index > value}
            onClick={() => onValueChange?.(index)}
            aria-current={index === value ? "step" : undefined}
            aria-label={`${index + 1}. ${step.title}${step.error ? `: ${step.error}` : ""}`}
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-lg border text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default",
              index <= value && "border-primary bg-primary/10 text-primary",
              step.error && "border-destructive text-destructive",
            )}
          >
            {index < value && !step.error ? (
              <Check className="size-4" />
            ) : (
              index + 1
            )}
          </button>
          <div className="min-w-0 pb-4">
            <p
              className={cn(
                "text-sm font-medium",
                index > value && "text-muted-foreground",
              )}
            >
              {step.title}
            </p>
            {(step.error || step.description) && (
              <p
                className={cn(
                  "mt-1 text-xs leading-5 text-muted-foreground",
                  step.error && "text-destructive",
                )}
              >
                {step.error || step.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
