import type { Metadata } from "next"

import { RivelleThemeProvider } from "@/components/theme-provider"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://rivelle.dev"),
  title: {
    default: "Rivelle — Own your interface",
    template: "%s | Rivelle",
  },
  description: "Beautiful, editable React components for products with taste.",
  applicationName: "Rivelle",
  keywords: ["React", "Next.js", "UI components", "design system", "shadcn", "Tailwind CSS"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rivelle.dev",
    siteName: "Rivelle",
    title: "Rivelle — Own your interface",
    description: "Beautiful, editable React components for products with taste.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivelle — Own your interface",
    description: "Beautiful, editable React components for products with taste.",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body><RivelleThemeProvider>{children}</RivelleThemeProvider></body>
    </html>
  )
}
