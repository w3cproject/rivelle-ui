# Rivelle roadmap

This document collects possible directions for Rivelle after the core component and block catalog is mature. It is a set of product ideas, not a commitment to specific dates or releases. Issues and focused proposals are welcome before implementation begins.

## Near-term foundations

### Project diagnostics

- Add `rivelle doctor` to validate aliases, dependencies, theme tokens, CSS setup and React Server Component boundaries.
- Detect locally modified or outdated registry items.
- Offer `rivelle doctor --fix` only for safe, reviewable repairs.

### Safer component updates

- Add `rivelle diff <name>` and `rivelle upgrade <name>`.
- Preserve consumer customizations while presenting upstream registry changes.
- Detect conflicts instead of overwriting owned source files silently.

### Visual theme studio

- Build a live Nova and Prism theme editor on `rivelle.dev`.
- Configure typography, palettes, radii, shadows, density, motion and light/dark modes.
- Export CSS or a shareable preset that can be consumed by the CLI.

## Developer tooling

### MCP integration

- Provide a guided MCP setup for Codex, Cursor, Claude and other compatible clients.
- Make components, blocks, themes and metadata discoverable through natural-language workflows.
- Explore Rivelle-specific tools for project audits, theme application and component upgrades.

### Playground

- Add editable template previews with responsive controls and Nova/Prism switching.
- Generate shareable preview URLs and installation commands.
- Support opening templates in external browser IDEs.

### Editor extension

- Explore a VS Code-compatible extension for registry search, installation and component previews.
- Surface variants, documentation, project diagnostics and local-versus-registry diffs inside the editor.

### Static analysis

- Explore an `@rivelle/eslint-plugin` for semantic-token usage, accessibility, variant conventions and unnecessary client boundaries.
- Share applicable checks between ESLint and `rivelle doctor`.

## Additional collections

### Effects expansion

- Grow the focused effect collection with cursor, background, text, button, scroll and 3D experiments; keep complete interface compositions in Blocks.
- Prioritize distinctive hero treatments, product storytelling, navigation, data presentation and micro-interactions.
- Keep every effect token-driven, reduced-motion aware and independently installable without turning the foundational UI catalog into an animation framework.

### Agent interface components

- Explore composable UI for conversations, prompts, streaming output, sources, reasoning, tool calls, approvals, artifacts, code diffs and task plans.
- Keep provider integrations optional and preserve source ownership.

### Community registry

- Allow community-authored components, blocks, themes, hooks and templates under registry namespaces.
- Add automated validation, previews and a review process before trusted items are listed.
- Explore private registries and shared team presets without limiting the open-source core.

### AI-assisted block creation

- Explore generating editable blocks from natural-language descriptions using Rivelle components and tokens.
- Validate generated output for dependencies, accessibility, responsive behavior and registry compatibility.

## Design ecosystem

- Maintain a Figma library aligned with code variants and theme variables.
- Explore Figma Code Connect mappings for production JSX templates.
- Consider browser developer tools for inspecting Rivelle components and exporting live token changes.

## Principles

- Keep the core registry and CLI open source.
- Prefer source ownership over opaque runtime abstractions.
- Make automation reviewable and reversible.
- Keep server-safe components server-safe by default.
- Treat accessibility, customization and upgrade safety as product features.
