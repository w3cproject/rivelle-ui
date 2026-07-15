"use client"

import * as React from "react"
import { createThemeTokens, defaultTheme, fontFamily, isAccentName, isNeutralName, type AccentName, type FontName, type NeutralName, type ThemeMode } from "@rivelle/theme"

export type RuntimeTheme = { neutral: NeutralName; accent: AccentName; font: FontName; radius: string; mode: ThemeMode }

const defaults: RuntimeTheme = { ...defaultTheme, mode: "dark" }
const ThemeContext = React.createContext<{
  settings: RuntimeTheme
  update: <K extends keyof RuntimeTheme>(key: K, value: RuntimeTheme[K]) => void
  reset: () => void
} | null>(null)

export function RivelleThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<RuntimeTheme>(defaults)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    const raw = window.localStorage.getItem("rivelle-theme-config")
    const storedMode = window.localStorage.getItem("rivelle-theme")
    const systemMode: ThemeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    if (!raw) {
      setSettings({ ...defaults, mode: storedMode === "light" || storedMode === "dark" ? storedMode : systemMode })
      setHydrated(true)
      return
    }
    try {
      const value = JSON.parse(raw) as Partial<RuntimeTheme>
      setSettings({
        neutral: value.neutral && isNeutralName(value.neutral) ? value.neutral : defaults.neutral,
        accent: value.accent && isAccentName(value.accent) ? value.accent : defaults.accent,
        font: value.font === "inter" ? "inter" : "geist",
        radius: typeof value.radius === "string" ? value.radius : defaults.radius,
        mode: storedMode === "light" || storedMode === "dark" ? storedMode : value.mode === "light" ? "light" : "dark",
      })
    } catch { setSettings(defaults) }
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    applyTheme(settings)
    window.localStorage.setItem("rivelle-theme-config", JSON.stringify(settings))
    window.localStorage.setItem("rivelle-theme", settings.mode)
  }, [hydrated, settings])

  const value = React.useMemo(() => ({
    settings,
    update: <K extends keyof RuntimeTheme>(key: K, next: RuntimeTheme[K]) => setSettings((current) => ({ ...current, [key]: next })),
    reset: () => setSettings(defaults),
  }), [settings])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useRivelleTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useRivelleTheme must be used inside RivelleThemeProvider")
  return context
}

function applyTheme(settings: RuntimeTheme) {
  const root = document.documentElement
  root.classList.toggle("dark", settings.mode === "dark")
  root.style.setProperty("--radius", settings.radius)
  root.style.setProperty("--font-family-sans", fontFamily(settings.font))
  Object.entries(createThemeTokens(settings, settings.mode === "dark")).forEach(([name, value]) => root.style.setProperty(`--${name}`, value))
}
