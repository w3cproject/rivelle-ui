import { ImageResponse } from "next/og"

export const alt = "Rivelle — Own your interface"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        background: "#09090b",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 80px",
        width: "100%",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", fontSize: 30, fontWeight: 650, letterSpacing: "-0.04em" }}>
        Rivelle
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900 }}>
        <div style={{ fontSize: 82, fontWeight: 650, letterSpacing: "-0.055em", lineHeight: 1 }}>
          Own your interface.
        </div>
        <div style={{ color: "#a1a1aa", fontSize: 31, lineHeight: 1.35 }}>
          Beautiful, editable React components for products with taste.
        </div>
      </div>
      <div style={{ alignItems: "center", color: "#a1a1aa", display: "flex", fontSize: 24, justifyContent: "space-between", width: "100%" }}>
        <span>React · Next.js · Tailwind CSS</span>
        <span style={{ color: "#fafafa" }}>rivelle.dev</span>
      </div>
    </div>,
    size,
  )
}
