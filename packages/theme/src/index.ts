export const neutralPalettes = {
  neutral: { hue: 0, chroma: 0 }, zinc: { hue: 285, chroma: 0.012 }, stone: { hue: 60, chroma: 0.012 }, mauve: { hue: 325, chroma: 0.014 }, olive: { hue: 115, chroma: 0.014 }, mist: { hue: 225, chroma: 0.012 }, taupe: { hue: 50, chroma: 0.018 },
} as const

export const accentPalettes = {
  indigo: { hue: 265, chroma: 0.22 }, violet: { hue: 295, chroma: 0.21 }, blue: { hue: 245, chroma: 0.19 }, emerald: { hue: 155, chroma: 0.15 }, rose: { hue: 20, chroma: 0.2 },
} as const

export const radiusOptions = ["0rem", "0.5rem", "0.625rem", "0.75rem", "1rem"] as const
export type NeutralName = keyof typeof neutralPalettes
export type AccentName = keyof typeof accentPalettes
export type FontName = "geist" | "inter"
export type ThemeMode = "light" | "dark"
export type ThemeSettings = { neutral: NeutralName; accent: AccentName; font: FontName; radius: string; mode?: ThemeMode }
export const defaultTheme: ThemeSettings = { neutral: "neutral", accent: "indigo", font: "geist", radius: "0.625rem", mode: "dark" }

export function createThemeTokens(settings: ThemeSettings, dark: boolean): Record<string, string> {
  const neutral = neutralPalettes[settings.neutral]
  const accent = accentPalettes[settings.accent]
  const tone = (lightness: number, multiplier = 1) => `oklch(${lightness} ${Number((neutral.chroma * multiplier).toFixed(3))} ${neutral.hue})`
  const primary = `oklch(${dark ? 0.7 : 0.54} ${Number((accent.chroma * (dark ? .78 : 1)).toFixed(4))} ${accent.hue})`
  const common = {
    primary, "destructive": dark ? "oklch(0.66 0.2 25)" : "oklch(0.61 0.22 25)", "destructive-foreground": "oklch(0.985 0 0)", ring: primary,
    "chart-1": primary, "chart-2": "oklch(0.68 0.16 210)", "chart-3": "oklch(0.7 0.17 150)", "chart-4": "oklch(0.75 0.17 80)", "chart-5": "oklch(0.64 0.2 320)",
  }
  return dark ? {
    background: tone(.15, 1.3), foreground: tone(.96, .5), card: tone(.19, 1.4), "card-foreground": tone(.96, .5), popover: tone(.19, 1.4), "popover-foreground": tone(.96, .5), ...common, "primary-foreground": tone(.16, 1.5), secondary: tone(.24, 1.4), "secondary-foreground": tone(.94, .6), muted: tone(.24, 1.15), "muted-foreground": tone(.69, 1), accent: tone(.28, 1.8), "accent-foreground": tone(.94, .6), border: "oklch(1 0 0 / 12%)", input: "oklch(1 0 0 / 14%)", sidebar: tone(.18, 1.35), "sidebar-foreground": tone(.96, .5), "sidebar-primary": primary, "sidebar-primary-foreground": tone(.16, 1.5), "sidebar-accent": tone(.25, 1.5), "sidebar-accent-foreground": tone(.94, .6), "sidebar-border": "oklch(1 0 0 / 12%)", "sidebar-ring": primary,
  } : {
    background: tone(.985, .35), foreground: tone(.18, 1.5), card: "oklch(1 0 0)", "card-foreground": tone(.18, 1.5), popover: "oklch(1 0 0)", "popover-foreground": tone(.18, 1.5), ...common, "primary-foreground": "oklch(.985 0 0)", secondary: tone(.95, .8), "secondary-foreground": tone(.27, 1.6), muted: tone(.955, .65), "muted-foreground": tone(.52, 1.2), accent: tone(.93, 1.35), "accent-foreground": tone(.25, 1.5), border: tone(.89, .9), input: tone(.89, .9), sidebar: tone(.975, .5), "sidebar-foreground": tone(.22, 1.4), "sidebar-primary": primary, "sidebar-primary-foreground": "oklch(.985 0 0)", "sidebar-accent": tone(.94, 1.1), "sidebar-accent-foreground": tone(.25, 1.5), "sidebar-border": tone(.89, .9), "sidebar-ring": primary,
  }
}

export function fontFamily(font: FontName) {
  return font === "geist" ? '"Geist Variable", "Geist", ui-sans-serif, system-ui, sans-serif' : '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif'
}

export function createThemeVariablesCss(settings: ThemeSettings) {
  const lines = (values: Record<string, string>) => Object.entries(values).map(([name, value]) => `  --${name}: ${value};`).join("\n")
  return `:root {\n${lines(createThemeTokens(settings, false))}\n  --radius: ${settings.radius};\n  --font-family-sans: ${fontFamily(settings.font)};\n}\n\n.dark {\n${lines(createThemeTokens(settings, true))}\n}`
}

export function isNeutralName(value: string): value is NeutralName { return value in neutralPalettes }
export function isAccentName(value: string): value is AccentName { return value in accentPalettes }
