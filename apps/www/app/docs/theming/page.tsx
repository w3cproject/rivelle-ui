import { ThemeConfigurator } from "@/components/theme-configurator"

export default function ThemingPage() {
  return (
    <main className="docs-content docs-content-wide">
      <section className="docs-page-intro" id="overview"><div><p className="docs-eyebrow">Foundations / Theming</p><h1>Make it unmistakably yours.</h1><p className="docs-lead">Tune Rivelle’s semantic tokens and preview every decision in context. The generated CSS remains readable, portable and entirely yours.</p></div></section>
      <section className="docs-section" id="configurator"><h2>Configurator</h2><p>Choose a neutral palette, brand accent, typeface, radius and appearance.</p><ThemeConfigurator /></section>
    </main>
  )
}
