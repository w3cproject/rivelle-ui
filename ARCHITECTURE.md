# Rivelle architecture

Rivelle is a source registry, not a runtime component package. Consumers receive editable primitives under `components/ui`, expressive interactions under `components/effects`, composed sections under `components/blocks`, and complete interfaces under `components/templates`, while Rivelle owns the generation, contracts, defaults and documentation.

## System boundaries

1. `registry/nova` is the source of truth for components and shared utilities.
2. `registry.json` describes files and their exact npm and registry dependencies using the official shadcn schema.
3. `shadcn build` produces immutable HTTP payloads in `apps/www/public/r`.
4. `packages/cli` detects the consumer project, installs theme foundations and copies registry source into it.
5. `apps/www` renders the same source files used by the registry; previews cannot silently diverge from shipped components.
6. `packages/theme` is the shared deterministic theme engine used by both the CLI and the documentation configurator.

## Consumer contract

- `rivelle init` creates `components.json`, `rivelle.json`, the `@/*` alias, `lib/utils`, font and motion imports, semantic CSS tokens and light/dark values.
- Generated theme CSS lives between stable markers. Re-running `init --force` replaces that block instead of duplicating it.
- `rivelle add` resolves registry dependencies recursively, rejects cycles, prevents writes outside the consumer project and never overwrites component files unless `--overwrite` is passed.
- TypeScript is the default when detected. `--javascript` emits `.js/.jsx` with TypeScript syntax removed.
- Component source is owned by the consumer: public `className` is merged last and variants are exported when useful.

## React Server Components

Display-only primitives stay server-safe. A file receives `"use client"` only when its implementation uses a hook, browser behavior, or a Radix client primitive. Importing a client primitive from a Server Component creates the normal Next.js client boundary; it does not force unrelated Rivelle components onto the client.

Do not add `"use client"` to documentation demos as a workaround for a component boundary problem. Fix the boundary in the component source.

## Styling and motion

- Components consume semantic tokens such as `background`, `foreground`, `primary`, `muted`, `border`, `ring` and `destructive`.
- Neutral and accent palettes, font and radius are foundations generated from one theme engine.
- Geist is the default; Inter is the supported alternative.
- Rivelle's default language uses calm rounded geometry, low-contrast inset surfaces and an accent edge for focus. Asymmetric geometry is opt-in through explicit variants such as `Button`'s `signature`; it is never a global default.
- Floating surfaces share the same border, translucent background, blur, depth and entrance curve so Select, Dialog, Sheet, Popover, Command and menus feel related.
- Motion uses CSS transitions and `tw-animate-css`. Reduced-motion behavior must remain usable and no interaction may depend on animation to communicate state.
- Fixed palette utilities are reserved for genuinely semantic states that are not part of the main accent system; otherwise use tokens.

## Component acceptance contract

A component is complete only when all of the following are true:

- The API is composable, typed and forwards native or Radix props and refs where the underlying primitive supports them.
- Keyboard interaction, focus visibility, disabled state and `aria-invalid` behavior are present where relevant.
- Light and dark themes use semantic tokens without unreadable state combinations.
- The source has correct npm dependencies and registry dependencies in `registry.json`.
- A documentation page shows installation, a live preview, usage and API notes.
- `pnpm verify` passes, including real HTTP installation into TypeScript and JavaScript fixtures.

## Release gate

Run `pnpm verify` before publishing. A release is blocked by type errors, CLI bundle errors, registry build errors, Next.js build errors, missing registry payloads, failed HTTP installation, duplicated theme markers, broken JS conversion or alias configuration regressions.

Before the first public release, the remaining operational work is external rather than component architecture: confirm the npm package ownership and production domain, add CI for `pnpm verify`, define versioning/changelog policy, and publish signed or provenance-enabled releases.
