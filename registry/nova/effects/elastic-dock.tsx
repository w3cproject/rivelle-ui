"use client";

import * as React from "react";
import {
  motion,
  MotionConfigContext,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

export type DockItem = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};
export function ElasticDock({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) {
  const pointer = useMotionValue(Infinity);
  return (
    <nav
      aria-label="Quick navigation"
      className={cn(
        "flex min-h-24 items-end justify-center gap-2 p-4",
        className,
      )}
      onPointerMove={(e) => {
        if (e.pointerType !== "touch") pointer.set(e.clientX);
      }}
      onPointerLeave={() => pointer.set(Infinity)}
    >
      {items.map((item) => (
        <DockAction key={item.label} item={item} pointer={pointer} />
      ))}
    </nav>
  );
}
function DockAction({
  item,
  pointer,
}: {
  item: DockItem;
  pointer: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [focused, setFocused] = React.useState(false);
  const systemReduced = useReducedMotion();
  const reduced =
    React.useContext(MotionConfigContext).reducedMotion === "always" ||
    systemReduced;
  const distance = useTransform(pointer, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - r.left - r.width / 2 : Infinity;
  });
  const size = useTransform(distance, [-140, 0, 140], [44, 72, 44]);
  const spring = useSpring(size, { stiffness: 350, damping: 28 });
  const style = reduced
    ? { width: 44, height: 44 }
    : { width: spring, height: spring };
  const content = (
    <>
      {item.icon}
      <span
        className={cn(
          "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 group-hover:opacity-100",
          focused && "opacity-100",
        )}
      >
        {item.label}
      </span>
    </>
  );
  const cls =
    "group relative grid size-full place-items-center rounded-xl border bg-card text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-5";
  return (
    <motion.div
      ref={ref}
      style={style}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {item.href ? (
        <a aria-label={item.label} href={item.href} className={cls}>
          {content}
        </a>
      ) : (
        <button
          aria-label={item.label}
          type="button"
          onClick={item.onClick}
          className={cls}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
