"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type DraggableStackProps = React.ComponentProps<"div"> & {
  cardClassName?: string;
  onOrderChange?: (order: number[]) => void;
  threshold?: number;
};

function DraggableStack({
  cardClassName,
  children,
  className,
  onOrderChange,
  threshold = 110,
  ...props
}: DraggableStackProps) {
  const cards = React.Children.toArray(children);
  const [order, setOrder] = React.useState(() =>
    cards.map((_, index) => index),
  );
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    setOrder(cards.map((_, index) => index));
  }, [cards.length]);

  const sendToBack = () => {
    setOrder((current) => {
      const next = [...current.slice(1), current[0]];
      onOrderChange?.(next);
      return next;
    });
  };

  return (
    <div
      className={cn("relative isolate min-h-80 w-full", className)}
      data-slot="draggable-stack"
      {...props}
    >
      {[...order].reverse().map((cardIndex, reverseIndex) => {
        const depth = order.length - 1 - reverseIndex;
        const isTop = depth === 0;
        return (
          <motion.div
            animate={{
              rotate: depth % 2 === 0 ? depth * -1.5 : depth * 1.5,
              scale: 1 - depth * 0.035,
              y: depth * 12,
            }}
            className={cn(
              "absolute inset-x-0 top-0 mx-auto w-[min(82%,340px)] cursor-grab touch-none overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-card shadow-[0_28px_80px_-45px_var(--foreground)] active:cursor-grabbing",
              !isTop && "pointer-events-none",
              cardClassName,
            )}
            drag={isTop && !reducedMotion}
            dragConstraints={{ bottom: 150, left: -170, right: 170, top: -150 }}
            dragElastic={0.18}
            key={cardIndex}
            onDragEnd={(_, info) => {
              if (Math.hypot(info.offset.x, info.offset.y) >= threshold) {
                sendToBack();
              }
            }}
            style={{ zIndex: order.length - depth }}
            transition={{ damping: 24, stiffness: 280, type: "spring" }}
            whileDrag={{ rotate: 0, scale: 1.04, zIndex: order.length + 1 }}
          >
            {cards[cardIndex]}
          </motion.div>
        );
      })}
    </div>
  );
}

export { DraggableStack };
export type { DraggableStackProps };
