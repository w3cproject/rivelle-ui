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
      <div style={{ alignItems: "center", display: "flex", fontSize: 30, fontWeight: 650, gap: 14, letterSpacing: "-0.04em" }}>
        <svg fill="none" height="44" viewBox="0 0 32 32" width="44">
          <defs>
            <linearGradient id="rivelle-og-fill" x1="7" x2="26" y1="27" y2="5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6d5dfc" />
              <stop offset="0.52" stopColor="#895cff" />
              <stop offset="1" stopColor="#b477ff" />
            </linearGradient>
          </defs>
          <path d="M6 27V16.25C6 9.49 10.94 4.75 17.65 4.75h5.1L27 9l-4.25 4.25H18c-2.42 0-4 1.58-4 4V27H6Z" fill="url(#rivelle-og-fill)" />
          <path d="M14 17.25c0-2.42 1.58-4 4-4h4.75L27 9H17.65C10.94 9 6 12.1 6 18.85v-2.6C6 9.49 10.94 4.75 17.65 4.75h5.1L27 9l-4.25 4.25H18c-2.42 0-4 1.58-4 4v2.6c0-1.01.27-1.88.76-2.6H14Z" fill="white" fillOpacity="0.13" />
        </svg>
        rivelle
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
