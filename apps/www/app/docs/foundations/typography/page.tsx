import { Badge } from "@/components/ui/badge"

const specimens = [
  { label: "Display", className: "text-display font-semibold", text: "Interface with intent." },
  { label: "Heading 1", className: "text-h1 font-semibold", text: "A clear visual voice." },
  { label: "Heading 2", className: "text-h2 font-semibold", text: "Designed for hierarchy." },
  { label: "Heading 3", className: "text-h3 font-semibold", text: "Reusable by default." },
  { label: "Body", className: "text-base leading-7", text: "Rivelle uses a restrained type scale with deliberate rhythm, tight display tracking, and comfortable reading width." },
  { label: "Small", className: "text-sm leading-6 text-muted-foreground", text: "Supporting copy stays quiet without losing clarity." },
]

export default function TypographyPage() {
  return (
    <main className="docs-content">
      <section className="docs-page-intro" id="overview"><div><Badge variant="outline">Foundations / Typography</Badge><h1>Type with a point of view.</h1><p className="docs-lead">Geist is the Rivelle default. Inter is available during <code>rivelle init</code>. Both use the same semantic scale, so switching the family never changes your component API.</p></div></section>

      <section className="docs-section" id="scale">
        <h2>Scale</h2>
        <p>Responsive display styles for product surfaces, with stable body styles for dense interfaces.</p>
        <div className="overflow-hidden rounded-2xl border border-border bg-card/80">
          {specimens.map((specimen) => (
            <div className="grid gap-5 border-b border-border p-6 last:border-b-0 md:grid-cols-[110px_1fr] md:p-8" key={specimen.label}>
              <span className="pt-1 font-mono text-[11px] uppercase tracking-[.14em] text-muted-foreground">{specimen.label}</span>
              <p className={specimen.className}>{specimen.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section" id="css-contract">
        <h2>CSS contract</h2>
        <p>Typography is exposed through Tailwind theme variables, while the selected family lives in one replaceable semantic token.</p>
        <pre className="docs-code-block overflow-x-auto p-5 text-sm leading-7 text-white"><code>{`--font-family-sans: "Geist", ui-sans-serif, system-ui;\n--text-display: clamp(3.5rem, 8vw, 7rem);\n--text-h1: clamp(2.5rem, 5vw, 4.5rem);\n\n<h1 className="text-h1 font-semibold">...</h1>`}</code></pre>
      </section>
    </main>
  )
}
