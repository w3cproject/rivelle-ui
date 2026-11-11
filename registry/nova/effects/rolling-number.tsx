"use client";

import * as React from "react";
import { motion, MotionConfigContext, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function RollingNumber({
  value,
  locale = "en-US",
  options,
  className,
}: {
  value: number;
  locale?: string;
  options?: Intl.NumberFormatOptions;
  className?: string;
}) {
  const systemReduced = useReducedMotion();
  const reduced =
    React.useContext(MotionConfigContext).reducedMotion === "always" ||
    systemReduced;
  const formatted = new Intl.NumberFormat(locale, options).format(value);
  return (
    <span
      className={cn(
        "inline-flex overflow-hidden align-middle tabular-nums",
        className,
      )}
      aria-label={formatted}
    >
      <span aria-hidden className="inline-flex">
        {Array.from(formatted).map((char, i) =>
          /\d/.test(char) ? (
            <span
              key={formatted.length - i}
              className="relative inline-block h-[1.15em] w-[.65em] overflow-hidden"
            >
              <motion.span
                className="absolute left-0 top-0 flex flex-col"
                initial={false}
                animate={{ y: `${-Number(char) * 1.15}em` }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 130,
                        damping: 20,
                      }
                }
              >
                {Array.from({ length: 10 }, (_, n) => (
                  <span
                    key={n}
                    className="h-[1.15em] text-center leading-[1.15]"
                  >
                    {n}
                  </span>
                ))}
              </motion.span>
            </span>
          ) : (
            <span key={formatted.length - i} className="leading-[1.15]">
              {char}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
