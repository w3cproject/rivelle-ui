# Contributing to Rivelle

Thanks for helping make Rivelle better. Contributions of all sizes are welcome: bug reports, accessibility improvements, documentation, component refinements and new primitives.

## Before opening an issue

- Search existing issues and discussions first.
- Use the bug form for reproducible defects and the feature form for proposals.
- Security vulnerabilities must follow `SECURITY.md` and must not be posted publicly.

## Local development

Requirements: Node.js 20 or newer and pnpm 10.

```bash
pnpm install
pnpm dev
```

The documentation runs at `http://localhost:3000`. Component sources live in `registry/nova/ui`; the documentation imports those exact files.

Before submitting a pull request:

```bash
pnpm verify
```

## Component contributions

A component contribution must:

- use semantic theme tokens instead of fixed palette colors;
- keep `className` as the final style override;
- remain Server Component-safe unless interaction requires `"use client"`;
- include keyboard, focus, disabled and invalid behavior where relevant;
- declare exact npm and registry dependencies in `registry.json`;
- include a live documentation example and usage snippet;
- work in light and dark themes and respect reduced motion;
- pass TypeScript and JavaScript registry installation tests.

Read `ARCHITECTURE.md` before changing the registry, CLI, theme engine or public component API.

## Pull requests

Keep pull requests focused. Explain the motivation, include screenshots for visual changes and call out breaking API or token changes explicitly. Maintainers may request revisions to preserve accessibility, consistency or source ownership guarantees.

By contributing, you agree that your contribution is licensed under the MIT License.
