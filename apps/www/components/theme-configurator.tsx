"use client"

import * as React from "react"
import { Check, Copy, Moon, RotateCcw, Sun } from "lucide-react"
import {
  accentPalettes as accents,
  createThemeVariablesCss,
  neutralPalettes as neutrals,
  radiusOptions as radii,
  type AccentName,
  type FontName,
  type NeutralName,
} from "@rivelle/theme"

import { useRivelleTheme, type RuntimeTheme } from "@/components/theme-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function ThemeConfigurator() {
  const { settings, update, reset } = useRivelleTheme()
  const [copied, setCopied] = React.useState(false)
  const [copiedCommand, setCopiedCommand] = React.useState(false)

  const css = createCss(settings)
  const initCommand = `pnpm dlx rivelle@latest init --font ${settings.font} --base-color ${settings.neutral} --accent ${settings.accent} --radius ${settings.radius}`

  async function copyCss() {
    await navigator.clipboard.writeText(css)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  async function copyCommand() {
    await navigator.clipboard.writeText(initCommand)
    setCopiedCommand(true)
    window.setTimeout(() => setCopiedCommand(false), 1500)
  }

  return (
    <div className="theme-studio">
      <div className="theme-controls">
        <div className="theme-control-heading"><div><span>Theme studio</span><strong>Shape the foundations</strong></div><button aria-label="Reset theme" onClick={reset} type="button"><RotateCcw /></button></div>

        <ThemeGroup label="Neutral palette">
          <div className="theme-swatch-grid">
            {(Object.keys(neutrals) as NeutralName[]).map((name) => <button className={cn(settings.neutral === name && "is-active")} key={name} onClick={() => update("neutral", name)} type="button"><i style={{ background: neutralSwatch(name) }} />{name}<Check /></button>)}
          </div>
        </ThemeGroup>

        <ThemeGroup label="Accent">
          <div className="theme-accent-row">
            {(Object.keys(accents) as AccentName[]).map((name) => <button aria-label={name} className={cn(settings.accent === name && "is-active")} key={name} onClick={() => update("accent", name)} style={{ background: accentSwatch(name) }} type="button"><Check /></button>)}
          </div>
        </ThemeGroup>

        <ThemeGroup label="Font">
          <div className="theme-segmented">{(["geist", "inter"] as FontName[]).map((font) => <button className={cn(settings.font === font && "is-active")} key={font} onClick={() => update("font", font)} type="button">{font === "geist" ? "Geist" : "Inter"}</button>)}</div>
        </ThemeGroup>

        <ThemeGroup label="Radius">
          <div className="theme-radius-row">{radii.map((radius) => <button className={cn(settings.radius === radius && "is-active")} key={radius} onClick={() => update("radius", radius)} type="button"><i style={{ borderRadius: radius }} />{radius === "0rem" ? "0" : radius.replace("rem", "")}</button>)}</div>
        </ThemeGroup>

        <ThemeGroup label="Appearance">
          <div className="theme-segmented"><button className={cn(settings.mode === "light" && "is-active")} onClick={() => update("mode", "light")} type="button"><Sun /> Light</button><button className={cn(settings.mode === "dark" && "is-active")} onClick={() => update("mode", "dark")} type="button"><Moon /> Dark</button></div>
        </ThemeGroup>
      </div>

      <div className="theme-preview" id="preview">
        <div className="theme-preview-bar"><span><i /> Live preview</span><small>{settings.neutral} · {settings.accent} · {settings.font}</small></div>
        <div className="theme-preview-stage showcase-grid">
          <Card className="w-full max-w-[390px] shadow-xl shadow-black/5">
            <CardHeader><div className="mb-3 flex items-center justify-between"><Badge>New project</Badge><Switch aria-label="Enable project" defaultChecked /></div><CardTitle>Launch with clarity.</CardTitle><CardDescription>A compact preview using the same tokens as every Rivelle component.</CardDescription></CardHeader>
            <CardContent className="space-y-4"><Input placeholder="Project name" /><div className="flex gap-2"><Button className="flex-1">Create project</Button><Button variant="outline">Cancel</Button></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary" />Tokens update instantly</div></CardContent>
          </Card>
        </div>
      </div>

      <div className="theme-code" id="css-variables">
        <div><span>globals.css</span><span className="theme-code-actions"><button onClick={copyCommand} type="button">{copiedCommand ? <Check /> : <Copy />}{copiedCommand ? "Copied" : "Copy init"}</button><button onClick={copyCss} type="button">{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy CSS"}</button></span></div>
        <div className="theme-command-line"><span>$</span>{initCommand}</div>
        <pre><code>{css}</code></pre>
      </div>
    </div>
  )
}

function ThemeGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return <fieldset className="theme-group"><legend>{label}</legend>{children}</fieldset>
}

function createCss(settings: RuntimeTheme) {
  return createThemeVariablesCss(settings)
}

function neutralSwatch(name: NeutralName) { const item = neutrals[name]; return `oklch(.62 ${item.chroma * 2} ${item.hue})` }
function accentSwatch(name: AccentName) { const item = accents[name]; return `oklch(.62 ${item.chroma} ${item.hue})` }
