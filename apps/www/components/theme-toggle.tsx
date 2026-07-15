"use client"

import { Moon, Sun } from "lucide-react"

import { useRivelleTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { settings, update } = useRivelleTheme()
  const dark = settings.mode === "dark"

  function toggleTheme() {
    const next = !dark
    update("mode", next ? "dark" : "light")
  }

  return (
    <Button
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      className="rounded-full"
      onClick={toggleTheme}
      size="icon-sm"
      variant="ghost"
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}
