"use client";

import type { ReactNode } from "react";
import { Check, Sparkles } from "lucide-react";

import { useRivelleTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function StylePreview({
  children,
  className,
  canvasClassName,
  label = "Preview style",
}: {
  children: ReactNode;
  className?: string;
  canvasClassName?: string;
  label?: string;
}) {
  const { settings } = useRivelleTheme();

  return (
    <div
      className={cn("style-preview", className)}
      data-preview-style={settings.style}
    >
      <StyleSwitch label={label} />
      <div className={cn("style-preview-canvas", canvasClassName)}>
        {children}
      </div>
    </div>
  );
}

export function StyleSwitch({
  className,
  label = "Preview style",
}: {
  className?: string;
  label?: string;
}) {
  const { settings, update } = useRivelleTheme();

  return (
    <div className={cn("style-preview-toolbar", className)}>
      <span className="style-preview-label">
        <Sparkles aria-hidden />
        {label}
      </span>
      <div aria-label={label} className="style-preview-switch" role="group">
        {(["nova", "prism"] as const).map((style) => (
          <button
            aria-pressed={settings.style === style}
            className={cn(settings.style === style && "is-active")}
            key={style}
            onClick={() => update("style", style)}
            type="button"
          >
            {style === "nova" ? "Nova" : "Prism"}
            {settings.style === style && <Check aria-hidden />}
          </button>
        ))}
      </div>
    </div>
  );
}
