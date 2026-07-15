import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type RivelleMarkProps = ComponentPropsWithoutRef<"svg">

export function RivelleMark({ className, ...props }: RivelleMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("rivelle-mark", className)}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <defs>
        <linearGradient id="rivelle-mark-fill" x1="7" x2="26" y1="27" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d5dfc" />
          <stop offset="0.52" stopColor="#895cff" />
          <stop offset="1" stopColor="#b477ff" />
        </linearGradient>
      </defs>
      <path
        d="M6 27V16.25C6 9.49 10.94 4.75 17.65 4.75h5.1L27 9l-4.25 4.25H18c-2.42 0-4 1.58-4 4V27H6Z"
        fill="url(#rivelle-mark-fill)"
      />
      <path
        d="M14 17.25c0-2.42 1.58-4 4-4h4.75L27 9H17.65C10.94 9 6 12.1 6 18.85v-2.6C6 9.49 10.94 4.75 17.65 4.75h5.1L27 9l-4.25 4.25H18c-2.42 0-4 1.58-4 4v2.6c0-1.01.27-1.88.76-2.6H14Z"
        fill="white"
        fillOpacity="0.13"
      />
    </svg>
  )
}

type RivelleLogoProps = ComponentPropsWithoutRef<"span"> & {
  markClassName?: string
  wordmarkClassName?: string
}

export function RivelleLogo({ className, markClassName, wordmarkClassName, ...props }: RivelleLogoProps) {
  return (
    <span className={cn("rivelle-logo", className)} {...props}>
      <RivelleMark className={markClassName} />
      <span className={cn("rivelle-wordmark", wordmarkClassName)}>rivelle</span>
    </span>
  )
}
