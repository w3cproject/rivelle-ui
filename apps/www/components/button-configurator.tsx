"use client"

import * as React from "react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"

const variants = ["default", "signature", "destructive", "outline", "secondary", "ghost", "link"] as const
const sizes = ["default", "sm", "lg"] as const

export function ButtonConfigurator() {
  const [variant, setVariant] = React.useState<(typeof variants)[number]>("default")
  const [size, setSize] = React.useState<(typeof sizes)[number]>("default")
  const [disabled, setDisabled] = React.useState(false)
  const jsx = `<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}>\n  Button\n</Button>`
  return (
    <div className="configurator">
      <div className="showcase-grid flex min-h-56 items-center justify-center border-b p-8"><Button disabled={disabled} size={size} variant={variant}>Button</Button></div>
      <div className="grid gap-5 p-5 sm:grid-cols-3">
        <label className="config-field"><span>Variant</span><select onChange={(e) => setVariant(e.target.value as typeof variant)} value={variant}>{variants.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="config-field"><span>Size</span><select onChange={(e) => setSize(e.target.value as typeof size)} value={size}>{sizes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="config-field"><span>Disabled</span><button aria-pressed={disabled} className="config-toggle" data-active={disabled} onClick={() => setDisabled((value) => !value)} type="button"><span /> {disabled ? "On" : "Off"}</button></label>
      </div>
      <div className="border-t p-3"><CodeBlock code={jsx} /></div>
    </div>
  )
}
