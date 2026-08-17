import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "VEZI — Lo que necesitás, cerca tuyo",
  description:
    "Conectá lo que necesitás con servicios, comercios y emprendimientos cerca tuyo.",
}

export const viewport: Viewport = {
  themeColor: "#2d6a4f",
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
