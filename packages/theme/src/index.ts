export const neutralPalettes = {
  neutral: { hue: 0, chroma: 0 },
  zinc: { hue: 285, chroma: 0.012 },
  stone: { hue: 60, chroma: 0.012 },
  mauve: { hue: 325, chroma: 0.014 },
  olive: { hue: 115, chroma: 0.014 },
  mist: { hue: 225, chroma: 0.012 },
  taupe: { hue: 50, chroma: 0.018 },
} as const;

export const accentPalettes = {
  indigo: { hue: 265, chroma: 0.22 },
  violet: { hue: 295, chroma: 0.21 },
  blue: { hue: 245, chroma: 0.19 },
  emerald: { hue: 155, chroma: 0.15 },
  rose: { hue: 20, chroma: 0.2 },
} as const;

export const radiusOptions = [
  "0rem",
  "0.5rem",
  "0.625rem",
  "0.75rem",
  "1rem",
] as const;
export type NeutralName = keyof typeof neutralPalettes;
export type AccentName = keyof typeof accentPalettes;
export type FontName = "geist" | "inter";
export type StyleName = "nova" | "prism";
export type ThemeMode = "light" | "dark";
export type ThemeSettings = {
  neutral: NeutralName;
  accent: AccentName;
  font: FontName;
  radius: string;
  style?: StyleName;
  mode?: ThemeMode;
};
export const defaultTheme: ThemeSettings = {
  neutral: "neutral",
  accent: "indigo",
  font: "geist",
  radius: "0.625rem",
  style: "nova",
  mode: "dark",
};

export function createThemeTokens(
  settings: ThemeSettings,
  dark: boolean,
): Record<string, string> {
  const neutral = neutralPalettes[settings.neutral];
  const accent = accentPalettes[settings.accent];
  const style = settings.style ?? "nova";
  const tone = (lightness: number, multiplier = 1) =>
    `oklch(${lightness} ${Number((neutral.chroma * multiplier).toFixed(3))} ${neutral.hue})`;
  const primary = `oklch(${dark ? 0.7 : 0.54} ${Number((accent.chroma * (dark ? 0.78 : 1)).toFixed(4))} ${accent.hue})`;
  const prismPrimary = `oklch(${dark ? 0.72 : 0.57} ${Number((accent.chroma * (dark ? 0.9 : 1.08)).toFixed(4))} ${accent.hue})`;
  const activePrimary = style === "prism" ? prismPrimary : primary;
  const common = {
    primary: activePrimary,
    destructive: dark ? "oklch(0.66 0.2 25)" : "oklch(0.61 0.22 25)",
    "destructive-foreground": "oklch(0.985 0 0)",
    ring: activePrimary,
    "chart-1": activePrimary,
    "chart-2": "oklch(0.68 0.16 210)",
    "chart-3": "oklch(0.7 0.17 150)",
    "chart-4": "oklch(0.75 0.17 80)",
    "chart-5": "oklch(0.64 0.2 320)",
  };
  if (style === "prism")
    return dark
      ? {
          background: "oklch(.145 .025 274)",
          foreground: "oklch(.965 .012 270)",
          card: "oklch(.19 .032 274)",
          "card-foreground": "oklch(.965 .012 270)",
          popover: "oklch(.18 .032 274)",
          "popover-foreground": "oklch(.965 .012 270)",
          ...common,
          "primary-foreground": "oklch(.99 .004 270)",
          secondary: "oklch(.24 .038 274)",
          "secondary-foreground": "oklch(.95 .014 270)",
          muted: "oklch(.225 .027 274)",
          "muted-foreground": "oklch(.72 .035 270)",
          accent:
            "color-mix(in oklch, var(--primary) 18%, oklch(.21 .035 274))",
          "accent-foreground": "oklch(.96 .014 270)",
          border: "oklch(.78 .06 275 / 16%)",
          input: "oklch(.78 .06 275 / 18%)",
          sidebar: "oklch(.165 .03 274)",
          "sidebar-foreground": "oklch(.96 .012 270)",
          "sidebar-primary": activePrimary,
          "sidebar-primary-foreground": "oklch(.99 .004 270)",
          "sidebar-accent": "oklch(.235 .045 276)",
          "sidebar-accent-foreground": "oklch(.96 .014 270)",
          "sidebar-border": "oklch(.78 .06 275 / 15%)",
          "sidebar-ring": activePrimary,
          "action-background":
            "linear-gradient(112deg,color-mix(in oklch,var(--primary) 88%,oklch(.58 .24 292)),var(--primary) 48%,color-mix(in oklch,var(--primary) 80%,oklch(.68 .2 245)))",
          "action-foreground": "oklch(.99 .004 270)",
          "action-background-hover":
            "linear-gradient(112deg,color-mix(in oklch,var(--primary) 94%,oklch(.62 .25 292)),color-mix(in oklch,var(--primary) 94%,white),color-mix(in oklch,var(--primary) 84%,oklch(.72 .2 245)))",
          "action-shadow":
            "inset 0 1px 0 oklch(1 0 0 / 22%), 0 10px 24px -13px var(--primary), 0 2px 5px -2px color-mix(in oklch,var(--primary) 70%,black)",
          "action-shadow-hover":
            "inset 0 1px 0 oklch(1 0 0 / 28%), 0 16px 34px -15px var(--primary), 0 3px 8px -3px color-mix(in oklch,var(--primary) 72%,black)",
          "control-background": "oklch(.205 .032 274)",
          "control-background-hover": "oklch(.225 .038 274)",
          "control-border": "oklch(.78 .08 275 / 20%)",
          "control-border-hover": "oklch(.8 .09 275 / 30%)",
          "control-focus-border":
            "color-mix(in oklch,var(--primary) 68%,white)",
          "control-shadow":
            "inset 0 1px 0 oklch(1 0 0 / 7%), 0 1px 2px oklch(0 0 0 / 16%)",
          "control-shadow-hover":
            "inset 0 1px 0 oklch(1 0 0 / 9%), 0 4px 14px -10px oklch(0 0 0 / 55%)",
          "control-focus-shadow":
            "inset 0 1px 0 oklch(1 0 0 / 10%), 0 0 0 4px color-mix(in oklch,var(--primary) 16%,transparent), 0 12px 30px -18px var(--primary)",
          "surface-background":
            "color-mix(in oklch,var(--card) 94%,var(--primary))",
          "surface-border": "oklch(.78 .08 275 / 18%)",
          "surface-shadow":
            "inset 0 1px 0 oklch(1 0 0 / 8%), 0 18px 55px -36px oklch(0 0 0 / 85%)",
          "surface-shadow-hover":
            "inset 0 1px 0 oklch(1 0 0 / 10%), 0 24px 65px -38px color-mix(in oklch,var(--primary) 40%,black)",
        }
      : {
          background: "oklch(.985 .008 270)",
          foreground: "oklch(.205 .035 273)",
          card: "oklch(1 .003 270)",
          "card-foreground": "oklch(.205 .035 273)",
          popover: "oklch(1 .004 270)",
          "popover-foreground": "oklch(.205 .035 273)",
          ...common,
          "primary-foreground": "oklch(.99 .004 270)",
          secondary: "oklch(.955 .018 270)",
          "secondary-foreground": "oklch(.29 .045 273)",
          muted: "oklch(.96 .014 270)",
          "muted-foreground": "oklch(.53 .045 273)",
          accent: "color-mix(in oklch, var(--primary) 10%, white)",
          "accent-foreground": "oklch(.27 .06 274)",
          border: "oklch(.72 .055 274 / 28%)",
          input: "oklch(.72 .055 274 / 32%)",
          sidebar: "oklch(.975 .011 270)",
          "sidebar-foreground": "oklch(.23 .04 273)",
          "sidebar-primary": activePrimary,
          "sidebar-primary-foreground": "oklch(.99 .004 270)",
          "sidebar-accent": "oklch(.945 .025 272)",
          "sidebar-accent-foreground": "oklch(.27 .055 274)",
          "sidebar-border": "oklch(.72 .055 274 / 25%)",
          "sidebar-ring": activePrimary,
          "action-background":
            "linear-gradient(112deg,color-mix(in oklch,var(--primary) 88%,oklch(.58 .24 292)),var(--primary) 48%,color-mix(in oklch,var(--primary) 80%,oklch(.68 .2 245)))",
          "action-foreground": "oklch(.99 .004 270)",
          "action-background-hover":
            "linear-gradient(112deg,color-mix(in oklch,var(--primary) 94%,oklch(.62 .25 292)),color-mix(in oklch,var(--primary) 94%,white),color-mix(in oklch,var(--primary) 84%,oklch(.72 .2 245)))",
          "action-shadow":
            "inset 0 1px 0 oklch(1 0 0 / 30%), 0 10px 24px -13px var(--primary), 0 2px 5px -2px color-mix(in oklch,var(--primary) 65%,black)",
          "action-shadow-hover":
            "inset 0 1px 0 oklch(1 0 0 / 36%), 0 16px 34px -15px var(--primary), 0 3px 8px -3px color-mix(in oklch,var(--primary) 68%,black)",
          "control-background": "oklch(1 .004 270)",
          "control-background-hover": "oklch(.992 .009 270)",
          "control-border": "oklch(.65 .065 274 / 34%)",
          "control-border-hover": "oklch(.57 .08 274 / 46%)",
          "control-focus-border":
            "color-mix(in oklch,var(--primary) 72%,white)",
          "control-shadow":
            "inset 0 1px 0 white, 0 1px 2px oklch(.25 .04 274 / 8%), 0 5px 14px -12px oklch(.25 .04 274 / 35%)",
          "control-shadow-hover":
            "inset 0 1px 0 white, 0 2px 5px oklch(.25 .04 274 / 10%), 0 8px 20px -15px oklch(.25 .04 274 / 45%)",
          "control-focus-shadow":
            "inset 0 1px 0 white, 0 0 0 4px color-mix(in oklch,var(--primary) 13%,transparent), 0 10px 28px -18px var(--primary)",
          "surface-background":
            "color-mix(in oklch,var(--card) 97%,var(--primary))",
          "surface-border": "oklch(.65 .065 274 / 25%)",
          "surface-shadow":
            "inset 0 1px 0 white, 0 18px 55px -38px oklch(.28 .07 274 / 45%)",
          "surface-shadow-hover":
            "inset 0 1px 0 white, 0 24px 65px -40px color-mix(in oklch,var(--primary) 42%,oklch(.28 .07 274))",
        };
  return dark
    ? {
        background: tone(0.15, 1.3),
        foreground: tone(0.96, 0.5),
        card: tone(0.19, 1.4),
        "card-foreground": tone(0.96, 0.5),
        popover: tone(0.19, 1.4),
        "popover-foreground": tone(0.96, 0.5),
        ...common,
        "primary-foreground": tone(0.16, 1.5),
        secondary: tone(0.24, 1.4),
        "secondary-foreground": tone(0.94, 0.6),
        muted: tone(0.24, 1.15),
        "muted-foreground": tone(0.69, 1),
        accent: tone(0.28, 1.8),
        "accent-foreground": tone(0.94, 0.6),
        border: "oklch(1 0 0 / 12%)",
        input: "oklch(1 0 0 / 14%)",
        sidebar: tone(0.18, 1.35),
        "sidebar-foreground": tone(0.96, 0.5),
        "sidebar-primary": activePrimary,
        "sidebar-primary-foreground": tone(0.16, 1.5),
        "sidebar-accent": tone(0.25, 1.5),
        "sidebar-accent-foreground": tone(0.94, 0.6),
        "sidebar-border": "oklch(1 0 0 / 12%)",
        "sidebar-ring": activePrimary,
        "action-background": "var(--foreground)",
        "action-foreground": "var(--background)",
        "action-background-hover":
          "color-mix(in oklch,var(--foreground) 92%,transparent)",
        "action-shadow":
          "0 1px 0 color-mix(in oklch,var(--background) 28%,transparent), 0 8px 24px -14px var(--foreground)",
        "action-shadow-hover":
          "0 1px 0 color-mix(in oklch,var(--background) 32%,transparent), 0 14px 30px -16px var(--foreground)",
        "control-background":
          "color-mix(in oklch,var(--foreground) 4.5%,transparent)",
        "control-background-hover":
          "color-mix(in oklch,var(--foreground) 6.5%,transparent)",
        "control-border": "transparent",
        "control-border-hover":
          "color-mix(in oklch,var(--foreground) 10%,transparent)",
        "control-focus-border":
          "color-mix(in oklch,var(--foreground) 14%,transparent)",
        "control-shadow":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 72%,transparent), inset 0 -1px 0 color-mix(in oklch,var(--foreground) 7%,transparent)",
        "control-shadow-hover":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 72%,transparent), inset 0 -1px 0 color-mix(in oklch,var(--foreground) 9%,transparent)",
        "control-focus-shadow":
          "inset 0 -2px 0 var(--primary), 0 14px 34px -24px var(--foreground)",
        "surface-background":
          "color-mix(in oklch,var(--foreground) 2.5%,transparent)",
        "surface-border":
          "color-mix(in oklch,var(--foreground) 10%,transparent)",
        "surface-shadow":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 72%,transparent), 0 18px 50px -38px var(--foreground)",
        "surface-shadow-hover":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 76%,transparent), 0 24px 60px -38px var(--foreground)",
      }
    : {
        background: tone(0.985, 0.35),
        foreground: tone(0.18, 1.5),
        card: "oklch(1 0 0)",
        "card-foreground": tone(0.18, 1.5),
        popover: "oklch(1 0 0)",
        "popover-foreground": tone(0.18, 1.5),
        ...common,
        "primary-foreground": "oklch(.985 0 0)",
        secondary: tone(0.95, 0.8),
        "secondary-foreground": tone(0.27, 1.6),
        muted: tone(0.955, 0.65),
        "muted-foreground": tone(0.52, 1.2),
        accent: tone(0.93, 1.35),
        "accent-foreground": tone(0.25, 1.5),
        border: tone(0.89, 0.9),
        input: tone(0.89, 0.9),
        sidebar: tone(0.975, 0.5),
        "sidebar-foreground": tone(0.22, 1.4),
        "sidebar-primary": activePrimary,
        "sidebar-primary-foreground": "oklch(.985 0 0)",
        "sidebar-accent": tone(0.94, 1.1),
        "sidebar-accent-foreground": tone(0.25, 1.5),
        "sidebar-border": tone(0.89, 0.9),
        "sidebar-ring": activePrimary,
        "action-background": "var(--foreground)",
        "action-foreground": "var(--background)",
        "action-background-hover":
          "color-mix(in oklch,var(--foreground) 92%,transparent)",
        "action-shadow":
          "0 1px 0 color-mix(in oklch,var(--background) 28%,transparent), 0 8px 24px -14px var(--foreground)",
        "action-shadow-hover":
          "0 1px 0 color-mix(in oklch,var(--background) 32%,transparent), 0 14px 30px -16px var(--foreground)",
        "control-background":
          "color-mix(in oklch,var(--foreground) 4.5%,transparent)",
        "control-background-hover":
          "color-mix(in oklch,var(--foreground) 6.5%,transparent)",
        "control-border": "transparent",
        "control-border-hover":
          "color-mix(in oklch,var(--foreground) 10%,transparent)",
        "control-focus-border":
          "color-mix(in oklch,var(--foreground) 14%,transparent)",
        "control-shadow":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 72%,transparent), inset 0 -1px 0 color-mix(in oklch,var(--foreground) 7%,transparent)",
        "control-shadow-hover":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 72%,transparent), inset 0 -1px 0 color-mix(in oklch,var(--foreground) 9%,transparent)",
        "control-focus-shadow":
          "inset 0 -2px 0 var(--primary), 0 14px 34px -24px var(--foreground)",
        "surface-background":
          "color-mix(in oklch,var(--foreground) 2.5%,transparent)",
        "surface-border":
          "color-mix(in oklch,var(--foreground) 10%,transparent)",
        "surface-shadow":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 72%,transparent), 0 18px 50px -38px var(--foreground)",
        "surface-shadow-hover":
          "inset 0 1px 0 color-mix(in oklch,var(--background) 76%,transparent), 0 24px 60px -38px var(--foreground)",
      };
}

export function fontFamily(font: FontName) {
  return font === "geist"
    ? '"Geist Variable", "Geist", ui-sans-serif, system-ui, sans-serif'
    : '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif';
}

export function createThemeVariablesCss(settings: ThemeSettings) {
  const lines = (values: Record<string, string>) =>
    Object.entries(values)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n");
  return `:root {\n${lines(createThemeTokens(settings, false))}\n  --radius: ${settings.radius};\n  --font-family-sans: ${fontFamily(settings.font)};\n}\n\n.dark {\n${lines(createThemeTokens(settings, true))}\n}`;
}

export function isNeutralName(value: string): value is NeutralName {
  return value in neutralPalettes;
}
export function isAccentName(value: string): value is AccentName {
  return value in accentPalettes;
}
export function isStyleName(value: string): value is StyleName {
  return value === "nova" || value === "prism";
}
