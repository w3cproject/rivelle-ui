"use client";

import * as React from "react";
import {
  Check,
  SlidersHorizontal,
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Maximize2,
} from "lucide-react";
import { MotionConfig } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PreviewFrameContext } from "@/components/preview-frame-context";

import { useRivelleTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function StylePreview({
  children,
  className,
  canvasClassName,
  label = "Preview style",
  previewSrc,
}: {
  children: React.ReactNode;
  className?: string;
  canvasClassName?: string;
  label?: string;
  previewSrc?: string;
}) {
  const { settings } = useRivelleTheme();
  const framed = React.useContext(PreviewFrameContext);
  const fullscreenFrame = React.useRef<HTMLIFrameElement>(null);
  const [size, setSize] = React.useState("auto"),
    [replay, setReplay] = React.useState(0),
    [reduced, setReduced] = React.useState(false),
    [fullscreen, setFullscreen] = React.useState(false);
  React.useEffect(() => {
    const closeFromFrame = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.source === fullscreenFrame.current?.contentWindow &&
        event.data?.type === "rivelle:preview:escape"
      )
        setFullscreen(false);
    };
    window.addEventListener("message", closeFromFrame);
    return () => window.removeEventListener("message", closeFromFrame);
  }, []);
  if (framed) return <>{children}</>;
  const width = size === "mobile" ? 390 : size === "tablet" ? 768 : 1280;
  const src = previewSrc
    ? `${previewSrc}?${new URLSearchParams({ style: settings.style, mode: settings.mode, neutral: settings.neutral, accent: settings.accent, font: settings.font, radius: settings.radius, reduced: String(reduced), replay: String(replay) })}`
    : undefined;
  const toolbar = (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b p-3 text-xs">
      <div className="flex gap-1" role="group" aria-label="Preview viewport">
        {[
          ["auto", "Fit", Monitor],
          ["desktop", "Desktop", Monitor],
          ["tablet", "Tablet", Tablet],
          ["mobile", "Mobile", Smartphone],
        ].map(([key, name, Icon]) => {
          const ViewIcon = Icon as typeof Monitor;
          return (
            <button
              key={String(key)}
              type="button"
              aria-pressed={size === key}
              aria-label={String(name)}
              title={String(name)}
              onClick={() => setSize(String(key))}
              className={cn(
                "flex items-center gap-1 rounded-md px-2 py-2 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                size === key && "bg-muted",
              )}
            >
              <ViewIcon className="size-3.5" />
              <span className="hidden sm:inline">{String(name)}</span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={reduced}
            onChange={(e) => setReduced(e.target.checked)}
          />
          Reduced motion
        </label>
        <button
          type="button"
          aria-label="Replay preview"
          title="Replay"
          onClick={() => setReplay((n) => n + 1)}
          className="rounded p-2 hover:bg-muted"
        >
          <RotateCcw className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="Open full-screen preview"
          title="Full screen"
          onClick={() => setFullscreen(true)}
          className="rounded p-2 hover:bg-muted"
        >
          <Maximize2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
  const frame = (full: boolean) => (
    <div className="overflow-x-auto bg-muted/20 p-2">
      <iframe
        ref={full ? fullscreenFrame : undefined}
        key={`${src}-${full}`}
        title={`${label} isolated preview`}
        src={src}
        style={{
          width: size === "auto" ? "100%" : width,
          maxWidth: "none",
          height: full ? "calc(100dvh - 180px)" : 680,
        }}
        className="mx-auto block border bg-background"
      />
    </div>
  );

  return (
    <div
      className={cn("style-preview", className)}
      data-preview-style={settings.style}
    >
      <StyleSwitch label={label} />
      {previewSrc && toolbar}
      {previewSrc && size !== "auto" ? (
        frame(false)
      ) : (
        <MotionConfig reducedMotion={reduced ? "always" : "user"}>
          <div
            key={replay}
            data-preview-reduced={reduced || undefined}
            className={cn("style-preview-canvas", canvasClassName)}
          >
            {children}
          </div>
        </MotionConfig>
      )}
      {previewSrc && (
        <Dialog open={fullscreen} onOpenChange={setFullscreen}>
          <DialogContent className="!inset-2 !left-2 !top-2 !z-[100] !h-[calc(100dvh-16px)] !w-[calc(100vw-16px)] !max-w-none !translate-x-0 !translate-y-0 overflow-auto p-4">
            <DialogTitle>Isolated preview</DialogTitle>
            <DialogDescription>
              Choose a viewport, interact with the example, or press Escape to
              close.
            </DialogDescription>
            {toolbar}
            {frame(true)}
          </DialogContent>
        </Dialog>
      )}
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
        <SlidersHorizontal aria-hidden />
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
