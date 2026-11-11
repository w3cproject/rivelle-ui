import type { Metadata } from "next";

import { RivelleThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rivelle — Editable React interface source",
    template: "%s | Rivelle",
  },
  description:
    "Install editable React and Next.js components, interaction effects, blocks and templates directly into your project.",
  applicationName: "Rivelle",
  keywords: [
    "React",
    "Next.js",
    "UI components",
    "animated React components",
    "design system",
    "shadcn",
    "Tailwind CSS",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Rivelle",
    title: "Rivelle — Editable React interface source",
    description:
      "Install editable React and Next.js components, interaction effects, blocks and templates directly into your project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivelle — Editable React interface source",
    description:
      "Install editable React and Next.js components, interaction effects, blocks and templates directly into your project.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body>
        <RivelleThemeProvider>{children}</RivelleThemeProvider>
      </body>
    </html>
  );
}
