# Rivelle

[![CI](https://github.com/w3cproject/rivelle-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/w3cproject/rivelle-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/rivelle?color=111111)](https://www.npmjs.com/package/rivelle)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111.svg)](./LICENSE)

An editable component, effect and block registry for React and Next.js. Rivelle installs source code into the consumer's project instead of hiding it inside `node_modules`. Explore the documentation at [rivelle.dev](https://rivelle.dev).

## What is included

- A publishable `rivelle` CLI with `init` and `add` commands.
- An official shadcn registry schema, so the same components can be consumed by either CLI.
- Tailwind CSS v4 semantic tokens powered by OKLCH colors and light/dark themes.
- Server Component-safe primitives by default; `"use client"` exists only where interaction requires it.
- CVA variants, `className` overrides, Radix composition, accessible states, and subtle motion.
- 55 primitives, from Button and form controls to Calendar, Carousel, Tag Input, Multi Select, Table, Toast, and navigation.
- 11 focused effects spanning comparison, directional reveal, magnification, drag physics, cursor fields, buttons, typography and 3D depth.
- 8 editable application blocks for authentication, marketing, dashboards and settings.

## Consumer usage

After the `rivelle` package and registry are published:

```bash
pnpm dlx rivelle@latest init
pnpm dlx rivelle@latest add button card input
pnpm dlx rivelle@latest add compare-slider cursor-lens draggable-stack
```

or:

```bash
npx rivelle@latest init
npx rivelle@latest add button
```

`init` detects Next.js, Vite or React plus `src/`, the global CSS entry, TypeScript and RSC. Its arrow-key wizard configures the Nova or Prism component style, Geist or Inter, neutral and accent palettes, radius, CSS, TypeScript, RSC and dependency installation. It also creates the `@/*` path alias and the matching Vite runtime alias when applicable. For CI, use `rivelle init --yes`; overrides include `--style prism`, `--font inter`, `--base-color zinc`, `--accent violet`, `--radius 0.75rem`, `--javascript`, and `--no-rsc`.

Then use the editable source directly:

```tsx
import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button variant="outline">Button</Button>;
}
```

Every component accepts `className`, so local overrides remain straightforward:

```tsx
<Button className="rounded-full px-8" variant="secondary">
  Custom button
</Button>
```

Effects use the same command, but install into a separate owned directory:

```tsx
import { CompareSlider } from "@/components/effects/compare-slider";

export default function Signal() {
  return (
    <CompareSlider
      after={<div className="h-full bg-black" />}
      before={<div className="h-full bg-white" />}
      className="h-80"
    />
  );
}
```

Components can also be installed with the upstream CLI:

```bash
pnpm dlx shadcn@latest add https://rivelle.dev/r/button.json
```

## Repository workflow

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm test:registry
pnpm verify
```

`pnpm dev` opens the Next.js showcase at [http://localhost:3000](http://localhost:3000). The showcase imports components directly from `registry/nova`, so every preview renders the exact source delivered by the CLI.

`pnpm build` compiles the CLI and turns [`registry.json`](./registry.json) into static payloads under `apps/www/public/r`, where Next.js serves them as `/r/*.json`. `pnpm test:registry` serves those payloads over an isolated HTTP server and installs all components into temporary TypeScript and JavaScript projects. `pnpm verify` is the release gate combining type checks, production builds and that installation test.

Generated registry payloads and CLI bundles are intentionally ignored by Git. CI and deployments always rebuild them from `registry.json` and `registry/nova`.

The system boundaries, RSC policy and component acceptance contract are documented in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

Possible future directions for project diagnostics, safer upgrades, a visual theme studio, MCP integration, editor tooling and community registries are tracked in [`ROADMAP.md`](./ROADMAP.md).

For local CLI development:

```bash
pnpm --filter rivelle build
node packages/cli/dist/index.js --help
```

## Component authoring rules

1. Keep display-only components server-safe; add `"use client"` only for hooks, browser APIs, or interactive client primitives.
2. Export the component and its CVA recipe when variants should be reusable.
3. Use semantic tokens (`bg-primary`, `text-muted-foreground`) instead of fixed palette colors.
4. Put foundational primitives in `components/ui`, expressive effects in `components/effects`, composed sections in `components/blocks`, and full interfaces in `components/templates`.
5. Merge public `className` last through `cn()` so the consumer owns the final styling.
6. Add the source file and exact dependency metadata to `registry.json`, then run `pnpm verify`.

## Publishing

Publishing is automated from `.github/workflows/publish.yml`. The `v<version>` tag must match `packages/cli/package.json`; GitHub Actions verifies the workspace and publishes through npm trusted publishing with provenance.

Deployment and first-release setup are documented in [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

## Contributing

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`ARCHITECTURE.md`](./ARCHITECTURE.md) before opening a pull request. Bugs and feature proposals should use the repository issue forms. Security reports follow [`SECURITY.md`](./SECURITY.md).

All contributions are released under the [MIT License](./LICENSE). Community participation is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md).

The registry format follows the current official [shadcn registry specification](https://ui.shadcn.com/docs/registry/registry-json) and [components.json conventions](https://ui.shadcn.com/docs/components-json).
