"use client";

import * as React from "react";
import { MotionConfigContext, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function PixelDisplacement({
  src,
  alt,
  columns = 18,
  strength = 26,
  className,
}: {
  src: string;
  alt: string;
  columns?: number;
  strength?: number;
  className?: string;
}) {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const pointer = React.useRef({ x: -1000, y: -1000 });
  const systemReduced = useReducedMotion();
  const reduced =
    React.useContext(MotionConfigContext).reducedMotion === "always" ||
    systemReduced;
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const node = canvas.current;
    if (!node || reduced) {
      setReady(false);
      return;
    }
    const context = node.getContext("2d");
    if (!context) return;
    let frame = 0,
      disposed = false,
      visible = true;
    const image = new Image();
    const resize = () => {
      const box = node.getBoundingClientRect();
      node.width = Math.round(box.width * devicePixelRatio);
      node.height = Math.round(box.height * devicePixelRatio);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    resize();
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(node);
    const tiles: { x: number; y: number }[] = [];
    image.onload = () => {
      if (disposed) return;
      setReady(true);
      const draw = () => {
        if (visible && !document.hidden) {
          const w = node.width / devicePixelRatio,
            h = node.height / devicePixelRatio;
          context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
          context.clearRect(0, 0, w, h);
          const count = Math.max(4, Math.min(64, columns)),
            cell = w / count,
            rows = Math.ceil(h / cell);
          const scale = Math.max(w / image.width, h / image.height),
            sw = w / scale,
            sh = h / scale;
          const sx = (image.width - sw) / 2,
            sy = (image.height - sh) / 2;
          for (let y = 0; y < rows; y++)
            for (let x = 0; x < count; x++) {
              const index = y * count + x,
                px = x * cell,
                py = y * cell;
              const dx = px + cell / 2 - pointer.current.x,
                dy = py + cell / 2 - pointer.current.y;
              const distance = Math.hypot(dx, dy),
                force = Math.max(0, 1 - distance / 140) * strength;
              const tile = tiles[index] ?? (tiles[index] = { x: 0, y: 0 });
              tile.x += ((dx / (distance || 1)) * force - tile.x) * 0.16;
              tile.y += ((dy / (distance || 1)) * force - tile.y) * 0.16;
              const ch = Math.min(cell, h - py);
              context.drawImage(
                image,
                sx + px / scale,
                sy + py / scale,
                cell / scale,
                ch / scale,
                px + tile.x,
                py + tile.y,
                cell + 0.5,
                ch + 0.5,
              );
            }
        }
        frame = requestAnimationFrame(draw);
      };
      draw();
    };
    image.src = src;
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
    };
  }, [src, columns, strength, reduced]);
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-xl bg-muted",
        className,
      )}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      }}
      onPointerLeave={() => {
        pointer.current = { x: -1000, y: -1000 };
      }}
    >
      {/* The image remains the accessible and reduced-motion fallback. */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "absolute inset-0 size-full object-cover",
          ready && "opacity-0",
        )}
      />
      <canvas
        aria-hidden
        ref={canvas}
        className={cn("absolute inset-0 size-full", !ready && "hidden")}
      />
    </div>
  );
}
