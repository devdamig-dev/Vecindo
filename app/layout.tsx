import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "VEZI — Encontrá, pedí y resolvé cerca tuyo",
  description:
    "Buscá, descubrí, pedí, contactá o publicá lo que necesitás en tu red local.",
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
