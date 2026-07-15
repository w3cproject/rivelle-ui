import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ButtonConfigurator } from "@/components/button-configurator"
import { CodeBlock } from "@/components/code-block"
import { ComponentDocDemo } from "@/components/component-doc-demo"
import { CopyCommand } from "@/components/copy-command"
import { Badge } from "@/components/ui/badge"
import { componentDocs, getComponentDoc } from "@/lib/component-docs"

export function generateStaticParams() { return componentDocs.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const component = getComponentDoc(slug)
  return component ? { title: component.name, description: component.description } : {}
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getComponentDoc(slug)
  if (!component) notFound()
  return (
    <main className="docs-content">
      <section className="docs-page-intro" id="overview"><div><div className="flex flex-wrap gap-2"><Badge variant="outline">Component</Badge><Badge variant={component.client ? "secondary" : "success"}>{component.client ? "Client component" : "Server-safe"}</Badge></div><h1>{component.name}</h1><p className="docs-lead">{component.description}</p></div></section>
      <section className="docs-section" id="installation"><h2>Installation</h2><CopyCommand command={`pnpm dlx rivelle@latest add ${component.install}`} /></section>
      <section className="docs-section" id="preview"><h2>Preview</h2><ComponentDocDemo slug={component.slug} /></section>
      {component.slug === "button" && <section className="docs-section" id="configurator"><h2>Configurator</h2><p>Explore variants and copy the resulting JSX.</p><ButtonConfigurator /></section>}
      <section className="docs-section" id="usage"><h2>Usage</h2><CodeBlock code={component.code} /></section>
      <section className="docs-section" id="api-reference"><h2>API reference</h2><div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>{component.props.map((prop) => <tr key={prop.name}><td><code>{prop.name}</code></td><td><code>{prop.type}</code></td><td><code>{prop.defaultValue}</code></td><td>{prop.description}</td></tr>)}</tbody></table></div></section>
    </main>
  )
}
