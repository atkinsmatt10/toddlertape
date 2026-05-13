import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Toddler Tape | The Tape Toddlers Can Eat",
  description: "A satisfying sensory strip designed to tear, taste, dissolve quickly, and keep tiny hands busy. Starter packs coming soon.",
  keywords: ["toddler tape", "sensory play", "toddler activity", "dissolvable tape", "fine motor skills"],
  generator: "v0.app",
  openGraph: {
    title: "Toddler Tape | The Tape Toddlers Can Eat",
    description: "A satisfying sensory strip designed to tear, taste, dissolve quickly, and keep tiny hands busy.",
    type: "website",
    url: appUrl,
    siteName: "Toddler Tape",
    images: [
      {
        url: "/brand/og-toddlertape.png",
        width: 1200,
        height: 630,
        alt: "ToddlerTape - The tape toddlers can eat.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toddler Tape | The Tape Toddlers Can Eat",
    description: "A satisfying sensory strip designed to tear, taste, dissolve quickly, and keep tiny hands busy.",
    images: ["/brand/og-toddlertape.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#E8735A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${jetbrainsMono.variable} bg-[#FFFBF5]`}>
      <body className="font-sans antialiased bg-[#FFFBF5] text-[#1A1A1A]">
        <ClickSpark
          sparkColor="#E8735A"
          sparkSize={10}
          sparkRadius={18}
          sparkCount={6}
          duration={350}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  )
}
