#!/usr/bin/env node

import { existsSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from "node:path"
import * as p from "@clack/prompts"
import { accentPalettes, createThemeVariablesCss, isAccentName, isNeutralName, neutralPalettes, type AccentName, type FontName, type NeutralName } from "@rivelle/theme"
import { Command } from "commander"
import { execa } from "execa"
import pc from "picocolors"
import ts from "typescript"
import { z } from "zod"

const DEFAULT_REGISTRY = "https://rivelle.dev/r"
const THEME_START = "/* rivelle:theme:start */"
const THEME_END = "/* rivelle:theme:end */"

const configSchema = z.object({
  $schema: z.string().optional(), style: z.string().default("nova"), rsc: z.boolean().default(true), tsx: z.boolean().default(true),
  tailwind: z.object({ config: z.string().default(""), css: z.string(), baseColor: z.string(), cssVariables: z.boolean().default(true), prefix: z.string().default("") }),
  aliases: z.object({ components: z.string(), ui: z.string(), lib: z.string(), hooks: z.string(), utils: z.string() }),
  registries: z.record(z.string(), z.string()),
})
type Config = z.infer<typeof configSchema>

const rivelleSchema = z.object({
  version: z.literal(1), framework: z.enum(["next", "vite", "react"]), sourceRoot: z.string(),
  theme: z.object({ font: z.enum(["geist", "inter"]), neutral: z.string(), accent: z.string(), radius: z.string() }),
})
type RivelleConfig = z.infer<typeof rivelleSchema>

const registryFileSchema = z.object({ path: z.string(), type: z.string(), target: z.string().optional(), content: z.string() })
const registryItemSchema = z.object({ name: z.string(), dependencies: z.array(z.string()).optional().default([]), registryDependencies: z.array(z.string()).optional().default([]), files: z.array(registryFileSchema) })

type InitAnswers = { css: string; font: FontName; baseColor: NeutralName; accent: AccentName; radius: string; rsc: boolean; tsx: boolean; install: boolean; sourceRoot: string; framework: RivelleConfig["framework"] }

const program = new Command().name("rivelle").description("Add editable UI component source code to your application.").version("0.1.0")

program.command("init")
  .description("Configure a React, Vite or Next.js project for Rivelle.")
  .option("-c, --cwd <path>", "project directory", process.cwd())
  .option("--css <path>", "global Tailwind CSS file")
  .option("--registry <url>", "registry base URL", DEFAULT_REGISTRY)
  .option("-y, --yes", "use detected defaults without prompting")
  .option("--font <font>", "font family: geist or inter")
  .option("--base-color <color>", "neutral palette")
  .option("--accent <color>", "accent palette")
  .option("--radius <value>", "base radius, e.g. 0.625rem")
  .option("--javascript", "generate JavaScript instead of TypeScript")
  .option("--no-rsc", "disable React Server Components")
  .option("--force", "replace existing Rivelle configuration and theme")
  .option("--skip-install", "do not install npm dependencies")
  .action(async (options) => {
    const cwd = resolve(options.cwd)
    const configPath = join(cwd, "components.json")
    if (existsSync(configPath) && !options.force) fail("components.json already exists. Use --force to replace it.")

    const detected = await detectProject(cwd)
    const answers = await getInitAnswers(options, detected)
    const aliases = { components: "@/components", ui: "@/components/ui", lib: "@/lib", hooks: "@/hooks", utils: "@/lib/utils" }
    const config: Config = configSchema.parse({
      $schema: "https://ui.shadcn.com/schema.json", style: "nova", rsc: answers.rsc, tsx: answers.tsx,
      tailwind: { config: "", css: answers.css, baseColor: answers.baseColor, cssVariables: true, prefix: "" }, aliases,
      registries: { "@rivelle": `${options.registry.replace(/\/$/, "")}/{name}.json` },
    })
    const rivelle: RivelleConfig = { version: 1, framework: answers.framework, sourceRoot: answers.sourceRoot, theme: { font: answers.font, neutral: answers.baseColor, accent: answers.accent, radius: answers.radius } }

    await writeText(configPath, `${JSON.stringify(config, null, 2)}\n`, true)
    await writeText(join(cwd, "rivelle.json"), `${JSON.stringify(rivelle, null, 2)}\n`, true)
    await ensureProjectAlias(cwd, answers)
    await writeText(resolveWithin(cwd, answers.sourceRoot, `lib/utils.${answers.tsx ? "ts" : "js"}`), answers.tsx ? utilsSource : utilsSourceJs, options.force)
    await mergeTheme(resolveWithin(cwd, answers.css), answers)

    if (answers.install) {
      const fontPackage = answers.font === "geist" ? "@fontsource-variable/geist" : "@fontsource-variable/inter"
      await install(cwd, ["clsx", "tailwind-merge", "tw-animate-css", fontPackage])
    }
    if (!options.yes && process.stdin.isTTY) p.outro("Rivelle is ready. Try: rivelle add button")
    else success("Rivelle is configured. Try: rivelle add button")
  })

program.command("add")
  .description("Install one or more components from the registry.")
  .argument("<components...>", "component names, e.g. button card")
  .option("-c, --cwd <path>", "project directory", process.cwd())
  .option("--overwrite", "replace files that already exist")
  .option("--skip-install", "do not install npm dependencies")
  .action(async (components: string[], options) => {
    const cwd = resolve(options.cwd)
    const config = await readConfig(cwd)
    const rivelle = await readRivelleConfig(cwd, config)
    const installed = new Set<string>()
    const resolving = new Set<string>()
    const packages = new Set<string>()
    for (const component of components) await addItem(component, { cwd, config, rivelle, overwrite: options.overwrite, installed, resolving, packages })
    if (!options.skipInstall && packages.size > 0) await install(cwd, [...packages])
    success(`Added ${[...installed].join(", ")}.`)
  })

program.parseAsync().catch((error: unknown) => fail(error instanceof Error ? error.message : String(error)))

async function detectProject(cwd: string) {
  const packageJson = await readJsonIfExists(join(cwd, "package.json")) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> } | undefined
  const dependencies = { ...packageJson?.dependencies, ...packageJson?.devDependencies }
  const framework: RivelleConfig["framework"] = dependencies.next ? "next" : dependencies.vite ? "vite" : "react"
  const sourceRoot = existsSync(join(cwd, "src")) ? "src" : ""
  const candidates = ["src/app/globals.css", "app/globals.css", "src/index.css", "src/globals.css", "index.css"]
  const css = candidates.find((path) => existsSync(join(cwd, path))) ?? (framework === "next" ? joinSlash(sourceRoot, "app/globals.css") : joinSlash(sourceRoot, "index.css"))
  return { framework, sourceRoot, css, tsx: existsSync(join(cwd, "tsconfig.json")), rsc: framework === "next" }
}

async function getInitAnswers(options: Record<string, any>, detected: Awaited<ReturnType<typeof detectProject>>): Promise<InitAnswers> {
  const defaults = validateInitAnswers({ css: options.css ?? detected.css, font: options.font ?? "geist", baseColor: options.baseColor ?? "neutral", accent: options.accent ?? "indigo", radius: options.radius ?? "0.625rem", rsc: options.rsc !== false && detected.rsc, tsx: options.javascript ? false : detected.tsx, install: !options.skipInstall, sourceRoot: detected.sourceRoot, framework: detected.framework })
  if (options.yes || !process.stdin.isTTY || !process.stdout.isTTY) return defaults
  p.intro(pc.bgCyan(pc.black(" Rivelle init ")))
  const result = await p.group({
    font: () => p.select({ message: "Which font should Rivelle use?", initialValue: defaults.font, options: [{ value: "geist", label: "Geist", hint: "recommended" }, { value: "inter", label: "Inter" }] }),
    baseColor: () => p.select({ message: "Choose a neutral palette", initialValue: defaults.baseColor, options: Object.keys(neutralPalettes).map(option) }),
    accent: () => p.select({ message: "Choose an accent color", initialValue: defaults.accent, options: Object.keys(accentPalettes).map(option) }),
    radius: () => p.select({ message: "Choose the base radius", initialValue: defaults.radius, options: ["0rem", "0.5rem", "0.625rem", "0.75rem", "1rem"].map((value) => ({ value, label: value })) }),
    css: () => p.text({ message: "Where is your global CSS file?", initialValue: defaults.css }),
    tsx: () => p.confirm({ message: "Use TypeScript?", initialValue: defaults.tsx }),
    rsc: () => p.confirm({ message: "Use React Server Components?", initialValue: defaults.rsc }),
    install: () => p.confirm({ message: "Install dependencies now?", initialValue: defaults.install }),
  }, { onCancel: () => { p.cancel("Initialization cancelled."); process.exit(0) } })
  return validateInitAnswers({ ...defaults, ...result } as InitAnswers)
}

function option(value: string) { return { value, label: value[0].toUpperCase() + value.slice(1) } }
function validateInitAnswers(answers: InitAnswers) {
  if (answers.font !== "geist" && answers.font !== "inter") throw new Error("Font must be either geist or inter.")
  if (!isNeutralName(answers.baseColor)) throw new Error("Unsupported base color.")
  if (!isAccentName(answers.accent)) throw new Error("Unsupported accent color.")
  if (!/^\d+(\.\d+)?(rem|px)$/.test(answers.radius)) throw new Error("Radius must use rem or px units.")
  return answers
}

async function addItem(name: string, context: { cwd: string; config: Config; rivelle: RivelleConfig; overwrite: boolean; installed: Set<string>; resolving: Set<string>; packages: Set<string> }) {
  if (context.installed.has(name)) return
  if (context.resolving.has(name)) throw new Error(`Circular registry dependency detected at ${name}.`)
  context.resolving.add(name)
  try {
    const url = resolveItemUrl(name, context.config)
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) })
    if (!response.ok) throw new Error(`Could not fetch ${name} (${response.status}) from ${url}`)
    const item = registryItemSchema.parse(await response.json())
    for (const dependency of item.registryDependencies) await addItem(dependency.startsWith(`${DEFAULT_REGISTRY}/`) ? dependency.replace(DEFAULT_REGISTRY, registryBase(context.config)) : dependency, context)
    for (const dependency of item.dependencies) context.packages.add(dependency)

    for (const file of item.files) {
      const target = resolveTarget(file, context)
      let content = file.content
      if (!context.config.rsc) content = content.replace(/^"use client"\s*\n+/, "")
      if (!context.config.tsx && /\.(tsx?|mts|cts)$/.test(file.path)) content = toJavaScript(content, file.path.endsWith("x"))
      const written = await writeText(target, content.endsWith("\n") ? content : `${content}\n`, context.overwrite)
      if (written) console.log(`${pc.green("+")} ${relative(context.cwd, target)}`)
    }
    context.installed.add(item.name)
  } finally {
    context.resolving.delete(name)
  }
}

function resolveTarget(file: z.infer<typeof registryFileSchema>, context: { cwd: string; config: Config; rivelle: RivelleConfig }) {
  const extension = context.config.tsx ? extname(file.path) : extname(file.path).replace("ts", "js")
  const filename = `${basename(file.path, extname(file.path))}${extension}`
  if (file.target?.startsWith("~/")) return resolveWithin(context.cwd, file.target.slice(2))
  if (file.target?.startsWith("@ui/")) return resolveWithin(context.cwd, context.rivelle.sourceRoot, "components/ui", `${basename(file.target.slice(4), extname(file.target))}${extension}`)
  if (file.type === "registry:lib") return resolveWithin(context.cwd, context.rivelle.sourceRoot, "lib", filename)
  return resolveWithin(context.cwd, context.rivelle.sourceRoot, "components/ui", filename)
}

function toJavaScript(content: string, jsx: boolean) {
  return ts.transpileModule(content, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: jsx ? ts.JsxEmit.Preserve : undefined, verbatimModuleSyntax: false } }).outputText
}

async function readConfig(cwd: string) {
  const path = join(cwd, "components.json")
  if (!existsSync(path)) throw new Error("components.json was not found. Run `rivelle init` first.")
  return configSchema.parse(JSON.parse(await readFile(path, "utf8")))
}

async function readRivelleConfig(cwd: string, config: Config): Promise<RivelleConfig> {
  const path = join(cwd, "rivelle.json")
  if (existsSync(path)) return rivelleSchema.parse(JSON.parse(await readFile(path, "utf8")))
  const sourceRoot = config.tailwind.css.startsWith("src/") ? "src" : ""
  return { version: 1, framework: config.rsc ? "next" : "react", sourceRoot, theme: { font: "geist", neutral: config.tailwind.baseColor, accent: "indigo", radius: "0.625rem" } }
}

async function writeText(path: string, content: string, overwrite = false) {
  if (existsSync(path) && !overwrite) { console.log(`${pc.yellow("~")} skipped ${path} (already exists)`); return false }
  await mkdir(dirname(path), { recursive: true }); await writeFile(path, content, "utf8"); return true
}

async function mergeTheme(path: string, answers: InitAnswers) {
  let current = existsSync(path) ? await readFile(path, "utf8") : '@import "tailwindcss";\n'
  current = current.replace(/^@import "@fontsource-variable\/(geist|inter)";\s*\r?\n?/gm, "").replace(/^@import "tw-animate-css";\s*\r?\n?/gm, "")
  const imports = `@import "${answers.font === "geist" ? "@fontsource-variable/geist" : "@fontsource-variable/inter"}";\n@import "tw-animate-css";`
  const theme = createThemeSource(answers)
  const pattern = new RegExp(`${escapeRegex(THEME_START)}[\\s\\S]*?${escapeRegex(THEME_END)}`, "m")
  current = pattern.test(current) ? current.replace(pattern, theme) : `${current.trim()}\n\n${theme}`
  await mkdir(dirname(path), { recursive: true }); await writeFile(path, `${imports}\n${current.trim()}\n`, "utf8")
}

async function ensureProjectAlias(cwd: string, answers: InitAnswers) {
  const configName = answers.tsx ? "tsconfig.json" : "jsconfig.json"
  const configPath = join(cwd, configName)
  const existing = existsSync(configPath) ? await readFile(configPath, "utf8") : "{}"
  const parsed = ts.parseConfigFileTextToJson(configPath, existing)
  if (parsed.error) throw new Error(`Could not update ${configName} with the @/* alias.`)
  const json = parsed.config as Record<string, any>
  json.compilerOptions = json.compilerOptions ?? {}
  json.compilerOptions.baseUrl = json.compilerOptions.baseUrl ?? "."
  json.compilerOptions.paths = { ...json.compilerOptions.paths, "@/*": [`./${answers.sourceRoot ? `${answers.sourceRoot}/` : ""}*`] }
  await writeText(configPath, `${JSON.stringify(json, null, 2)}\n`, true)

  if (answers.framework === "vite") await ensureViteAlias(cwd, answers.sourceRoot)
}

async function ensureViteAlias(cwd: string, sourceRoot: string) {
  const candidates = ["vite.config.ts", "vite.config.js", "vite.config.mts", "vite.config.mjs"]
  const existingName = candidates.find((name) => existsSync(join(cwd, name)))
  const configPath = join(cwd, existingName ?? "vite.config.js")
  const aliasTarget = `./${sourceRoot || "."}`
  if (!existingName) {
    await writeText(configPath, `import { defineConfig } from "vite"\nimport { fileURLToPath, URL } from "node:url"\n\nexport default defineConfig({\n  resolve: { alias: { "@": fileURLToPath(new URL("${aliasTarget}", import.meta.url)) } },\n})\n`, true)
    return
  }

  let source = await readFile(configPath, "utf8")
  if (/alias\s*:\s*\{[\s\S]*?["']@?["']?\s*:/.test(source)) return
  if (!/defineConfig\s*\(\s*\{/.test(source)) {
    console.warn(pc.yellow(`Could not safely add the @ alias to ${existingName}. Configure it to point to ${aliasTarget}.`))
    return
  }
  if (!source.includes('from "node:url"') && !source.includes("from 'node:url'")) source = `import { fileURLToPath, URL } from "node:url"\n${source}`
  source = source.replace(/defineConfig\s*\(\s*\{/, (match) => `${match}\n  resolve: { alias: { "@": fileURLToPath(new URL("${aliasTarget}", import.meta.url)) } },`)
  await writeText(configPath, source, true)
}

async function install(cwd: string, dependencies: string[]) {
  const manager = detectPackageManager(cwd)
  const args = manager === "npm" ? ["install", ...dependencies] : ["add", ...dependencies]
  console.log(pc.dim(`${manager} ${args.join(" ")}`)); await execa(manager, args, { cwd, stdio: "inherit" })
}

function detectPackageManager(cwd: string) {
  let directory = cwd
  while (true) {
    if (existsSync(join(directory, "pnpm-lock.yaml"))) return "pnpm"
    if (existsSync(join(directory, "yarn.lock"))) return "yarn"
    if (existsSync(join(directory, "bun.lockb")) || existsSync(join(directory, "bun.lock"))) return "bun"
    const parent = dirname(directory); if (parent === directory) break; directory = parent
  }
  return "npm"
}

function resolveItemUrl(name: string, config: Config) {
  if (/^https?:\/\//.test(name)) return name
  const [namespace, item] = name.startsWith("@") ? name.split("/", 2) : ["@rivelle", name]
  const template = config.registries[namespace]
  if (!template) throw new Error(`Registry ${namespace} is not configured in components.json.`)
  return template.replace("{name}", item)
}
function registryBase(config: Config) { return config.registries["@rivelle"].replace(/\/{name}\.json$/, "") }
function joinSlash(...parts: string[]) { return parts.filter(Boolean).join("/") }
function resolveWithin(root: string, ...parts: string[]) {
  const target = resolve(root, ...parts)
  const pathFromRoot = relative(root, target)
  if (pathFromRoot.startsWith("..") || isAbsolute(pathFromRoot)) throw new Error(`Refusing to write outside the project: ${target}`)
  return target
}
function escapeRegex(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") }
async function readJsonIfExists(path: string) { return existsSync(path) ? JSON.parse(await readFile(path, "utf8")) : undefined }
function success(message: string) { console.log(`${pc.green("✓")} ${message}`) }
function fail(message: string): never { console.error(`${pc.red("✖")} ${message}`); process.exit(1) }

const utilsSource = `import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`
const utilsSourceJs = `import { clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs))\n}\n`

function createThemeSource({ font, baseColor, accent, radius }: InitAnswers) {
  return `${THEME_START}\n/* --rivelle-theme: generated by rivelle init. */\n@custom-variant dark (&:is(.dark *));\n\n${createThemeVariablesCss({ font, neutral: baseColor, accent, radius })}\n\n${themeBridgeSource}\n${THEME_END}`
}

const themeBridgeSource = `@theme inline {
  --color-background: var(--background); --color-foreground: var(--foreground);
  --color-card: var(--card); --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover); --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary); --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary); --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted); --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent); --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive); --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border); --color-input: var(--input); --color-ring: var(--ring);
  --color-chart-1: var(--chart-1); --color-chart-2: var(--chart-2); --color-chart-3: var(--chart-3); --color-chart-4: var(--chart-4); --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar); --color-sidebar-foreground: var(--sidebar-foreground); --color-sidebar-primary: var(--sidebar-primary); --color-sidebar-primary-foreground: var(--sidebar-primary-foreground); --color-sidebar-accent: var(--sidebar-accent); --color-sidebar-accent-foreground: var(--sidebar-accent-foreground); --color-sidebar-border: var(--sidebar-border); --color-sidebar-ring: var(--sidebar-ring);
  --font-sans: var(--font-family-sans); --font-mono: var(--font-family-mono);
  --text-display: clamp(3.5rem, 8vw, 7rem); --text-display--line-height: .92; --text-display--letter-spacing: -.065em;
  --text-h1: clamp(2.5rem, 5vw, 4.5rem); --text-h1--line-height: .98; --text-h1--letter-spacing: -.055em;
  --text-h2: clamp(2rem, 3.5vw, 3rem); --text-h2--line-height: 1.05; --text-h2--letter-spacing: -.04em;
  --text-h3: 1.5rem; --text-h3--line-height: 1.2; --text-h3--letter-spacing: -.025em;
  --radius-sm: calc(var(--radius) * .6); --radius-md: calc(var(--radius) * .8); --radius-lg: var(--radius); --radius-xl: calc(var(--radius) * 1.4); --radius-2xl: calc(var(--radius) * 1.8); --radius-3xl: calc(var(--radius) * 2.2); --radius-4xl: calc(var(--radius) * 2.6);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background font-sans text-foreground antialiased; }
  h1, h2, h3 { text-wrap: balance; }
  p { text-wrap: pretty; }
}`
