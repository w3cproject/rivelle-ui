"use client";

import * as React from "react";
import {
  LayoutGroup,
  motion,
  MotionConfigContext,
  useReducedMotion,
} from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function MorphingSurface({
  title,
  description,
  media,
  children,
  className,
}: {
  title: string;
  description: string;
  media: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);
  const systemReduced = useReducedMotion();
  const reduced =
    React.useContext(MotionConfigContext).reducedMotion === "always" ||
    systemReduced;
  return (
    <LayoutGroup id={id}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.button
            layoutId={reduced ? undefined : "surface"}
            className={cn(
              "w-full max-w-sm overflow-hidden rounded-xl border bg-card text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
              className,
            )}
          >
            <motion.div
              layoutId={reduced ? undefined : "media"}
              className="aspect-[16/9] overflow-hidden"
            >
              {media}
            </motion.div>
            <div className="p-5">
              <motion.h3
                layoutId={reduced ? undefined : "title"}
                className="text-lg font-medium"
              >
                {title}
              </motion.h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
              <span className="mt-5 inline-block text-xs text-primary">
                Open details ↗
              </span>
            </div>
          </motion.button>
        </DialogTrigger>
        <DialogContent className="max-h-[85dvh] overflow-y-auto p-0 sm:max-w-2xl">
          <motion.div
            layoutId={reduced ? undefined : "surface"}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
              duration: reduced ? 0 : undefined,
            }}
          >
            {open && (
              <>
                <motion.div
                  layoutId={reduced ? undefined : "media"}
                  className="aspect-[16/9] overflow-hidden"
                >
                  {media}
                </motion.div>
                <div className="p-6">
                  <DialogTitle asChild>
                    <motion.h2 layoutId={reduced ? undefined : "title"}>
                      {title}
                    </motion.h2>
                  </DialogTitle>
                  <DialogDescription className="mt-2">
                    {description}
                  </DialogDescription>
                  <div className="mt-6 text-sm leading-7">{children}</div>
                </div>
              </>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </LayoutGroup>
  );
}
