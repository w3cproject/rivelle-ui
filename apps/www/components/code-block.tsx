"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { highlight } from "sugar-high"

export function CodeBlock({ code, label = "tsx" }: { code: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)
  const source = code.trim()
  const highlighted = React.useMemo(() => highlight(source), [source])
  async function copy() { await navigator.clipboard.writeText(source); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }
  return (
    <div className="docs-code-block">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] text-white/40">{label}</span>
        <button aria-label="Copy code" className="text-white/40 transition-colors hover:text-white" onClick={copy} type="button">{copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}</button>
      </div>
      <pre className="docs-code-pre"><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
    </div>
  )
}
