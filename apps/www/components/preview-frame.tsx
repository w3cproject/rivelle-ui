"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";
import { PreviewFrameContext } from "@/components/preview-frame-context";
import { useRivelleTheme } from "@/components/theme-provider";
import { isAccentName, isNeutralName, isStyleName } from "@rivelle/theme";

export function PreviewFrame({ children }: { children: React.ReactNode }) {
  const { update, ready } = useRivelleTheme();
  const applied = React.useRef(false);
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !event.defaultPrevented &&
        window.parent !== window
      )
        window.parent.postMessage(
          { type: "rivelle:preview:escape" },
          window.location.origin,
        );
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  React.useEffect(() => {
    if (!ready || applied.current) return;
    applied.current = true;
    const params = new URLSearchParams(window.location.search);
    const style = params.get("style"),
      accent = params.get("accent"),
      neutral = params.get("neutral"),
      mode = params.get("mode"),
      font = params.get("font"),
      radius = params.get("radius");
    if (style && isStyleName(style)) update("style", style);
    if (accent && isAccentName(accent)) update("accent", accent);
    if (neutral && isNeutralName(neutral)) update("neutral", neutral);
    if (mode === "light" || mode === "dark") update("mode", mode);
    if (font === "geist" || font === "inter") update("font", font);
    if (radius && /^\d+(\.\d+)?rem$/.test(radius)) update("radius", radius);
    setReduced(params.get("reduced") === "true");
  }, [ready, update]);
  return (
    <PreviewFrameContext.Provider value={true}>
      <MotionConfig reducedMotion={reduced ? "always" : "user"}>
        <div
          data-preview-reduced={reduced || undefined}
          className="min-h-dvh bg-background p-4"
        >
          {children}
        </div>
      </MotionConfig>
    </PreviewFrameContext.Provider>
  );
}
