import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type RivelleMarkProps = ComponentPropsWithoutRef<"svg">;

export function RivelleMark({ className, ...props }: RivelleMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("rivelle-mark", className)}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        d="M6 27V16.25C6 9.49 10.94 4.75 17.65 4.75h5.1L27 9l-4.25 4.25H18c-2.42 0-4 1.58-4 4V27H6Z"
        fill="currentColor"
      />
    </svg>
  );
}

type RivelleLogoProps = ComponentPropsWithoutRef<"span"> & {
  markClassName?: string;
  wordmarkClassName?: string;
};

export function RivelleLogo({
  className,
  markClassName,
  wordmarkClassName,
  ...props
}: RivelleLogoProps) {
  return (
    <span className={cn("rivelle-logo", className)} {...props}>
      <RivelleMark className={markClassName} />
      <span className={cn("rivelle-wordmark", wordmarkClassName)}>rivelle</span>
    </span>
  );
}
