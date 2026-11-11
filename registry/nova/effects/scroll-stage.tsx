"use client";

import * as React from "react";
import {
  motion,
  MotionConfigContext,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export type ScrollStageScene = {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
};
export function ScrollStage({
  scenes,
  className,
  scrollArea = false,
}: {
  scenes: ScrollStageScene[];
  className?: string;
  scrollArea?: boolean;
}) {
  const root = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const systemReduced = useReducedMotion();
  const reduced =
    React.useContext(MotionConfigContext).reducedMotion === "always" ||
    systemReduced;
  const { scrollYProgress } = useScroll({
    target: scrollArea ? undefined : root,
    container: scrollArea ? root : undefined,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  React.useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible)
          setActive(Number((visible.target as HTMLElement).dataset.scene));
      },
      {
        root: scrollArea ? node : null,
        rootMargin: "-15% 0px -20% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    node
      .querySelectorAll("[data-scene]")
      .forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [scenes.length, scrollArea]);
  if (!scenes.length) return null;
  return (
    <div
      ref={root}
      className={cn(
        "relative",
        scrollArea &&
          "h-80 overflow-y-auto overscroll-contain rounded-xl border bg-background",
        className,
      )}
      data-slot="scroll-stage"
      data-active-scene={scenes[active]?.id}
      tabIndex={scrollArea ? 0 : undefined}
      aria-label={scrollArea ? "Scroll through product scenes" : undefined}
    >
      <div
        className={cn(
          "grid gap-8 md:grid-cols-2",
          scrollArea && "grid-cols-2 gap-4 px-5",
        )}
      >
        <div>
          {scenes.map((scene, i) => (
            <section
              key={scene.id}
              data-scene={i}
              className={cn(
                "flex flex-col justify-center py-12",
                scrollArea ? "min-h-80" : "min-h-[55vh]",
              )}
            >
              <p className="mb-4 font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(scenes.length).padStart(2, "0")}
              </p>
              <h3
                className={cn(
                  "font-medium tracking-tight",
                  scrollArea ? "text-xl" : "text-3xl",
                )}
              >
                {scene.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
                {scene.description}
              </p>
              {!scrollArea && (
                <div className="mt-6 md:hidden">{scene.content}</div>
              )}
            </section>
          ))}
        </div>
        <div className={cn(!scrollArea && "hidden md:block")}>
          <motion.div
            style={reduced ? undefined : { rotateX: rotate }}
            className={cn(
              "sticky grid overflow-hidden rounded-xl border bg-card",
              scrollArea ? "top-6 my-6 min-h-60" : "top-24 min-h-80",
            )}
            aria-live="polite"
          >
            {scenes.map((scene, i) => (
              <motion.div
                key={scene.id}
                aria-hidden={i !== active}
                inert={i !== active}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: reduced ? 0 : i === active ? 0 : 24,
                }}
                transition={{ duration: reduced ? 0 : 0.35 }}
                className={cn(
                  "col-start-1 row-start-1 p-6",
                  i !== active && "pointer-events-none",
                )}
              >
                {scene.content}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
