import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"

export default function DocsPage() {
  return (
    <main className="docs-content">
      <section className="docs-page-intro" id="overview"><div><p className="docs-eyebrow">Rivelle documentation</p><h1>Build interfaces you own.</h1><p className="docs-lead">Rivelle gives React and Next.js projects editable component source, considered defaults, and a small semantic design system.</p></div></section>
      <section className="docs-section" id="installation"><h2>Installation</h2><p>Run the initializer in an existing Next.js, Vite or React project. Rivelle detects your source root, CSS entry, TypeScript and RSC setup, then configures the theme and <code>@/*</code> alias.</p><CopyCommand command="pnpm dlx rivelle@latest init" /><div className="mt-3"><CopyCommand command="pnpm dlx rivelle@latest add button" /></div></section>
      <section className="docs-section" id="theming"><h2>Theming</h2><p>Colors, typography and radii are expressed as semantic CSS variables with light and dark values.</p><Link className="docs-inline-link" href="/docs/theming">Open theme studio <ArrowRight /></Link></section>
      <section className="docs-section" id="cli"><h2>CLI</h2><p>The arrow-key initializer lets you choose Geist or Inter, neutral and accent palettes, radius, TypeScript, React Server Components and dependency installation. Re-running it with <code>--force</code> safely replaces the generated theme block.</p><Link className="docs-inline-link" href="/docs/components">Browse all 33 components <ArrowRight /></Link></section>
    </main>
  )
}
