"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TextScrambleProps = Omit<React.ComponentProps<"span">, "children"> & {
  text: string;
  duration?: number;
  characters?: string;
  playOnHover?: boolean;
};

function TextScramble({
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>—+*",
  className,
  duration = 780,
  onPointerEnter,
  playOnHover = true,
  text,
  ...props
}: TextScrambleProps) {
  const [display, setDisplay] = React.useState(text);
  const frame = React.useRef<number | null>(null);

  const play = React.useCallback(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(text);
      return;
    }

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    const startedAt = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const resolved = Math.floor(progress * text.length);
      setDisplay(
        Array.from(text)
          .map((character, index) => {
            if (/\s/.test(character) || index < resolved) return character;
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(update);
      else frame.current = null;
    };

    frame.current = requestAnimationFrame(update);
  }, [characters, duration, text]);

  React.useEffect(() => {
    play();
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [play]);

  return (
    <span
      aria-label={text}
      className={cn("inline-block font-mono", className)}
      data-slot="text-scramble"
      onPointerEnter={(event) => {
        if (playOnHover) play();
        onPointerEnter?.(event);
      }}
      {...props}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

export { TextScramble };
export type { TextScrambleProps };
