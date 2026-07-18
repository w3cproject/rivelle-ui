import {
  ArrowRight,
  Blocks,
  Check,
  Code2,
  Github,
  Layers3,
  MousePointer2,
  Orbit,
  Sparkles,
  Zap,
} from "lucide-react";

import { ComponentPreview } from "@/components/component-preview";
import { EffectPreview } from "@/components/effect-preview";
import { CopyCommand } from "@/components/copy-command";
import { RivelleLogo } from "@/components/rivelle-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { blockDocs } from "@/lib/block-docs";
import { componentDocs } from "@/lib/component-docs";
import { effectDocs } from "@/lib/effect-docs";
import { templateDocs } from "@/lib/template-docs";
import { siteConfig } from "@/lib/site";

const features = [
  {
    icon: Code2,
    title: "Source, not a dependency",
    description:
      "Every component lands in your codebase. Read it, reshape it, make it unmistakably yours.",
  },
  {
    icon: Layers3,
    title: "Server-first by default",
    description:
      "No client boundary unless interaction truly needs one. Built for modern Next.js applications.",
  },
  {
    icon: Sparkles,
    title: "Quietly expressive",
    description:
      "Purposeful motion, tactile states and strong defaults without visual noise.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-5 sm:px-8">
          <a
            className="group flex items-center gap-2.5 font-semibold tracking-tight"
            href="#top"
          >
            <RivelleLogo />
            <Badge className="hidden sm:inline-flex" variant="secondary">
              v{siteConfig.version}
            </Badge>
          </a>
          <nav className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="nav-link" href="/docs/components">
              Components
            </a>
            <a className="nav-link" href="/effects">
              Effects
            </a>
            <a className="nav-link" href="/blocks">
              Blocks
            </a>
            <a className="nav-link" href="/templates">
              Templates
            </a>
            <a className="nav-link" href="#principles">
              Principles
            </a>
            <a className="nav-link" href="#install">
              Install
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-1 md:ml-6">
            <Button
              aria-label="Open Rivelle on GitHub"
              asChild
              size="icon-sm"
              variant="ghost"
            >
              <a href={siteConfig.github} rel="noreferrer" target="_blank">
                <Github />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section
        className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28"
        id="top"
      >
        <div className="hero-grid absolute inset-x-0 top-0 -z-10 h-[650px] opacity-60" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="reveal-up inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl">
            <Sparkles className="size-3.5 text-primary" />
            Beautiful components. Entirely yours.
          </div>
          <h1 className="reveal-up delay-1 mt-8 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[5.75rem]">
            Own your interface.
            <span className="gradient-text block">Shape every detail.</span>
          </h1>
          <p className="reveal-up delay-2 mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Rivelle is an open-source registry of {componentDocs.length}{" "}
            foundations and {effectDocs.length} expressive effects for teams who
            care about craft, speed and complete control.
          </p>
          <div className="reveal-up delay-3 mx-auto mt-9 flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <a href="/docs/components">
                Explore components <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
            >
              <a href="#install">
                <Code2 /> Get started
              </a>
            </Button>
          </div>
          <div className="reveal-up delay-4 mx-auto mt-7 max-w-md">
            <CopyCommand command="pnpm dlx rivelle@latest init" />
          </div>
        </div>

        <div className="float-panel mx-auto mt-20 max-w-5xl">
          <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
            <span className="size-2.5 rounded-full bg-rose-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 text-xs text-muted-foreground">
              rivelle / button.tsx
            </span>
          </div>
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="showcase-grid flex min-h-72 items-center justify-center border-b border-border/70 p-8 md:border-b-0 md:border-r">
              <div className="flex flex-col items-center gap-4">
                <Button size="lg">
                  <Sparkles /> Create something
                </Button>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Preview
                  </Button>
                  <Button size="sm" variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
            <div className="code-window min-w-0 p-6 font-mono text-[13px] leading-7">
              <p>
                <span className="code-purple">import</span> {"{ Button }"}{" "}
                <span className="code-purple">from</span>
              </p>
              <p className="pl-4 code-green">
                &quot;@/components/ui/button&quot;
              </p>
              <p className="mt-4">
                <span className="code-purple">export default function</span>{" "}
                <span className="code-blue">Page</span>() {"{"}
              </p>
              <p className="pl-4">
                <span className="code-purple">return</span> (
              </p>
              <p className="pl-8">
                &lt;<span className="code-blue">Button</span>{" "}
                <span className="code-amber">variant</span>=
                <span className="code-green">&quot;outline&quot;</span>&gt;
              </p>
              <p className="pl-12 text-foreground">Create something</p>
              <p className="pl-8">
                &lt;/<span className="code-blue">Button</span>&gt;
              </p>
              <p className="pl-4">)</p>
              <p>{"}"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge variant="outline">
              <Orbit /> Rivelle Effects
            </Badge>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.055em] sm:text-6xl">
              The foundation is quiet. The moments can be unforgettable.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              Pointer-aware surfaces, kinetic type and atmospheric scenes that
              install as editable source and inherit the same semantic theme.
            </p>
          </div>
          <Button asChild size="lg" variant="outline">
            <a href="/effects">
              Explore {effectDocs.length} effects <ArrowRight />
            </a>
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-foreground/[.02] p-2">
            <EffectPreview compact slug="compare-slider" />
          </div>
          <div className="overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-foreground/[.02] p-2">
            <EffectPreview compact slug="gradient-mesh" />
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/35" id="principles">
        <div className="mx-auto grid max-w-7xl divide-y divide-border/70 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              className="feature-item py-10 md:px-8 md:first:pl-0 md:last:pr-0"
              key={title}
            >
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl border bg-background shadow-sm">
                <Icon className="size-4.5 text-primary" />
              </div>
              <h2 className="font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
        id="components"
      >
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Badge variant="outline">
              <Blocks /> The collection
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Small pieces. Serious polish.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Accessible primitives with elegant defaults, designed to be
              composed and changed.
            </p>
          </div>
          <Badge variant="secondary">
            {componentDocs.length} components · {effectDocs.length} effects ·{" "}
            {blockDocs.length} blocks · {templateDocs.length} templates
          </Badge>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <ComponentPreview
            command="rivelle add button"
            description="Eight variants, six sizes and full composition through asChild."
            title="Button"
          >
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button size="icon">
              <MousePointer2 />
            </Button>
          </ComponentPreview>

          <ComponentPreview
            command="rivelle add badge"
            description="Compact signals for status, categories and metadata."
            title="Badge"
          >
            <Badge>
              <Sparkles /> New
            </Badge>
            <Badge variant="secondary">In progress</Badge>
            <Badge variant="success">
              <Check /> Ready
            </Badge>
            <Badge variant="outline">Draft</Badge>
          </ComponentPreview>

          <ComponentPreview
            command="rivelle add input textarea"
            description="Calm, legible fields with refined focus and invalid states."
            title="Form controls"
          >
            <div className="w-full max-w-sm space-y-3">
              <Input placeholder="you@example.com" type="email" />
              <Textarea
                className="min-h-20"
                placeholder="Tell us what you are building…"
              />
            </div>
          </ComponentPreview>

          <ComponentPreview
            command="rivelle add switch separator"
            description="Accessible Radix interactions with a tactile, responsive feel."
            title="Switch & separator"
          >
            <div className="w-full max-w-xs rounded-xl border bg-background/80 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Product updates</p>
                  <p className="text-xs text-muted-foreground">
                    A thoughtful note, occasionally.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Usage insights</p>
                  <p className="text-xs text-muted-foreground">
                    Weekly performance digest.
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </ComponentPreview>

          <ComponentPreview
            className="lg:col-span-2"
            command="rivelle add card button badge"
            description="Composable structure for products, settings, dashboards and editorial layouts."
            title="Card"
          >
            <Card className="w-full max-w-md hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="success">Active</Badge>
                  <Zap className="size-4 text-primary" />
                </div>
                <CardTitle className="pt-3 text-xl">
                  Launch faster, stay in control.
                </CardTitle>
                <CardDescription>
                  Start with a considered foundation and change every detail as
                  your product evolves.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Separator />
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-sm text-muted-foreground">
                  Source included
                </span>
                <Button size="sm">
                  View source <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32"
        id="install"
      >
        <div className="install-panel relative overflow-hidden rounded-3xl border p-7 sm:p-12 lg:p-16">
          <div className="install-glow" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <Badge
                className="border-white/10 bg-white/10 text-white"
                variant="outline"
              >
                Ready when you are
              </Badge>
              <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">
                One command. Your code.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                Initialize the tokens, add only what you need, then build
                without fighting someone else&apos;s abstraction.
              </p>
            </div>
            <div className="space-y-3">
              <CopyCommand command="pnpm dlx rivelle@latest init" />
              <CopyCommand command="pnpm dlx rivelle@latest add button" />
              <p className="pt-2 text-center text-xs text-white/40">
                React · Next.js · Tailwind CSS v4 · TypeScript
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <RivelleLogo markClassName="size-5" wordmarkClassName="text-sm" />
          <p>MIT licensed · Built for interfaces worth remembering.</p>
          <div className="flex items-center gap-4">
            <a
              className="hover:text-foreground"
              href={siteConfig.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              className="hover:text-foreground"
              href={siteConfig.npm}
              rel="noreferrer"
              target="_blank"
            >
              npm
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
