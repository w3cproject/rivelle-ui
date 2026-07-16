import type { Metadata } from "next";

import { RivelleThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rivelle — Own your interface",
    template: "%s | Rivelle",
  },
  description:
    "Open-source, editable React and Next.js components with Nova and Prism styles.",
  applicationName: "Rivelle",
  keywords: [
    "React",
    "Next.js",
    "UI components",
    "design system",
    "shadcn",
    "Tailwind CSS",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Rivelle",
    title: "Rivelle — Own your interface",
    description:
      "Open-source, editable React and Next.js components with Nova and Prism styles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivelle — Own your interface",
    description:
      "Open-source, editable React and Next.js components with Nova and Prism styles.",
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
