import {
  ArrowRight,
  Check,
  Code2,
  Github,
  Layers3,
  MousePointer2,
  Orbit,
} from "lucide-react";

import { ComponentPreview } from "@/components/component-preview";
import { CopyCommand } from "@/components/copy-command";
import { EffectPreview } from "@/components/effect-preview";
import { RivelleLogo } from "@/components/rivelle-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
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

const principles = [
  {
    number: "01",
    title: "The source is the product",
    description:
      "Components are copied into your repository, so the final abstraction belongs to your application.",
  },
  {
    number: "02",
    title: "Server-first boundaries",
    description:
      "A client boundary appears only when interaction needs one. Static primitives stay server-safe.",
  },
  {
    number: "03",
    title: "Expression by choice",
    description:
      "Nova handles product UI. Prism and Effects add stronger visual moments when the interface calls for them.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-5 sm:px-8">
          <a className="flex items-center gap-3" href="#top">
            <RivelleLogo />
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              {siteConfig.version}
            </span>
          </a>
          <nav className="ml-auto hidden items-center gap-6 text-sm text-muted-foreground md:flex">
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
            <a className="nav-link" href="/docs">
              Docs
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-1 md:ml-5">
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
        className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[0.78fr_1.22fr] lg:items-center"
        id="top"
      >
        <div className="max-w-xl">
          <p className="section-kicker reveal-up">
            Editable React interface source
          </p>
          <h1 className="reveal-up delay-1 mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            Start with a system. End with your own.
          </h1>
          <p className="reveal-up delay-2 mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Rivelle installs accessible React and Next.js components directly
            into your codebase, with server-safe defaults, semantic tokens and
            optional interaction effects.
          </p>
          <div className="reveal-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="/docs/components">
                Browse components <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/docs">
                <Code2 /> Read the docs
              </a>
            </Button>
          </div>
          <div className="reveal-up delay-4 mt-6 max-w-md">
            <CopyCommand command="pnpm dlx rivelle@latest init" />
          </div>
        </div>

        <div className="float-panel hero-workbench">
          <div className="flex h-11 items-center justify-between border-b border-border px-4">
            <span className="font-mono text-[11px] text-muted-foreground">
              preview / button.tsx
            </span>
            <span className="rivelle-cut font-mono text-[11px] text-muted-foreground">
              server-safe
            </span>
          </div>
          <div className="grid min-h-[430px] md:grid-cols-[0.9fr_1.1fr]">
            <div className="showcase-grid flex items-center justify-center border-b border-border p-8 md:border-b-0 md:border-r">
              <div className="flex flex-col items-center gap-4">
                <Button size="lg">
                  Create project <ArrowRight />
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
              <p className="mt-5">
                <span className="code-purple">export default function</span>{" "}
                <span className="code-blue">Page</span>() {"{"}
              </p>
              <p className="pl-4">
                <span className="code-purple">return</span> (
              </p>
              <p className="pl-8">
                &lt;<span className="code-blue">Button</span>{" "}
                <span className="code-amber">variant</span>=
                <span className="code-green">&quot;default&quot;</span>&gt;
              </p>
              <p className="pl-12 text-foreground">Create project</p>
              <p className="pl-8">
                &lt;/<span className="code-blue">Button</span>&gt;
              </p>
              <p className="pl-4">)</p>
              <p>{"}"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40" id="principles">
        <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {principles.map((item) => (
            <article
              className="py-10 md:px-8 md:first:pl-0 md:last:pr-0"
              key={item.number}
            >
              <span className="font-mono text-xs text-primary">
                {item.number}
              </span>
              <h2 className="mt-5 text-lg font-medium">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
          <div>
            <p className="section-kicker">
              <Orbit /> Interaction primitives
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.025em] sm:text-5xl">
              Motion belongs to a mechanic, not to the chrome.
            </h2>
          </div>
          <div>
            <p className="text-sm leading-6 text-muted-foreground">
              Pointer-aware fields, spatial surfaces and kinetic actions. Every
              effect installs as editable source and respects reduced motion.
            </p>
            <a
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
              href="/effects"
            >
              View {effectDocs.length} effects <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="effect-frame">
            <EffectPreview compact slug="compare-slider" />
          </div>
          <div className="effect-frame">
            <EffectPreview compact slug="gradient-mesh" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/25" id="components">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">
                <Layers3 /> Registry
              </p>
              <h2 className="mt-5 text-4xl font-medium tracking-[-0.025em] sm:text-5xl">
                The working set for product UI.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Composable primitives with readable source, consistent states
                and no package-level styling lock-in.
              </p>
            </div>
            <p className="font-mono text-xs leading-6 text-muted-foreground">
              {componentDocs.length} components
              <br />
              {blockDocs.length} blocks · {templateDocs.length} templates
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <ComponentPreview
              command="rivelle add button"
              description="Clear hierarchy, six sizes and composition through asChild."
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
              description="Compact metadata and status without decorative glow."
              title="Badge"
            >
              <Badge>Default</Badge>
              <Badge variant="secondary">In progress</Badge>
              <Badge variant="success">
                <Check /> Ready
              </Badge>
              <Badge variant="outline">Draft</Badge>
            </ComponentPreview>
            <ComponentPreview
              command="rivelle add input textarea"
              description="Quiet fields with explicit focus, invalid and disabled states."
              title="Form controls"
            >
              <div className="w-full max-w-sm space-y-3">
                <Input placeholder="you@example.com" type="email" />
                <Textarea
                  className="min-h-20"
                  placeholder="What are you building?"
                />
              </div>
            </ComponentPreview>
            <ComponentPreview
              command="rivelle add switch separator"
              description="Accessible interaction with compact, predictable states."
              title="Settings controls"
            >
              <div className="w-full max-w-xs rounded-xl border bg-background p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Product updates</p>
                    <p className="text-xs text-muted-foreground">
                      Monthly release notes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Usage report</p>
                    <p className="text-xs text-muted-foreground">
                      Weekly project summary
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </ComponentPreview>
            <ComponentPreview
              className="lg:col-span-2"
              command="rivelle add card button badge"
              description="A neutral surface that lets the content establish hierarchy."
              title="Card"
            >
              <Card className="w-full max-w-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="success">Active</Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      R-104
                    </span>
                  </div>
                  <CardTitle className="pt-3 text-xl">
                    Component source stays local.
                  </CardTitle>
                  <CardDescription>
                    Install the primitive, inspect the implementation and adapt
                    the API to your product.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <span className="text-sm text-muted-foreground">4 files</span>
                  <Button size="sm">
                    View source <ArrowRight />
                  </Button>
                </CardFooter>
              </Card>
            </ComponentPreview>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28"
        id="install"
      >
        <div className="install-panel overflow-hidden rounded-2xl border border-white/10 p-7 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-xs text-white/45">
                CLI / two commands
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-medium tracking-[-0.025em] text-white sm:text-5xl">
                Install only what the project needs.
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-white/60">
                Initialize the semantic tokens once, then add individual
                components, effects, blocks or complete templates as source.
              </p>
            </div>
            <div className="space-y-3">
              <CopyCommand command="pnpm dlx rivelle@latest init" />
              <CopyCommand command="pnpm dlx rivelle@latest add button" />
              <p className="pt-2 text-xs text-white/40">
                React · Next.js · Tailwind CSS v4 · TypeScript
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <RivelleLogo markClassName="size-5" wordmarkClassName="text-sm" />
          <p>Open source under MIT. Components stay in your repository.</p>
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
