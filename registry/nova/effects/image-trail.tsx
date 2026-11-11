"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  MotionConfigContext,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

export function ImageTrail({
  images,
  children,
  className,
  threshold = 70,
}: {
  images: string[];
  children?: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const [trail, setTrail] = React.useState<
    { id: number; x: number; y: number; src: string; rotate: number }[]
  >([]);
  const sequence = React.useRef(0),
    last = React.useRef({ x: -1000, y: -1000 });
  const timers = React.useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const systemReduced = useReducedMotion();
  const reduced =
    React.useContext(MotionConfigContext).reducedMotion === "always" ||
    systemReduced;
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  React.useEffect(() => {
    if (reduced) setTrail([]);
  }, [reduced]);
  return (
    <div
      className={cn(
        "relative isolate min-h-80 overflow-hidden rounded-xl border bg-muted/30",
        className,
      )}
      onPointerMove={(e) => {
        if (reduced || e.pointerType === "touch" || !images.length) return;
        const rect = e.currentTarget.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
        if (
          Math.hypot(x - last.current.x, y - last.current.y) <
          Math.max(12, threshold)
        )
          return;
        last.current = { x, y };
        const id = sequence.current++;
        setTrail((items) => [
          ...items.slice(-7),
          {
            id,
            x,
            y,
            src: images[id % images.length],
            rotate: ((id % 5) - 2) * 7,
          },
        ]);
        const timer = setTimeout(() => {
          setTrail((items) => items.filter((i) => i.id !== id));
          timers.current.delete(timer);
        }, 850);
        timers.current.add(timer);
      }}
      onPointerLeave={() => {
        last.current = { x: -1000, y: -1000 };
      }}
    >
      <div className="relative z-20 grid min-h-80 place-items-center p-8">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 hidden justify-center gap-3 [@media(pointer:coarse)]:flex">
        {images.slice(0, 3).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-16 w-12 rounded object-cover"
          />
        ))}
      </div>
      <AnimatePresence>
        {trail.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-10 h-36 w-28 rounded-lg object-cover shadow-lg"
            style={{ left: item.x - 56, top: item.y - 72 }}
            initial={{
              opacity: 0,
              scale: 0.65,
              rotate: item.rotate - 12,
              y: 24,
            }}
            animate={{ opacity: 1, scale: 1, rotate: item.rotate, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -30 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
