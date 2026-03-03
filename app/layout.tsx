import type { Metadata, Viewport } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import "./globals.css"

import type { ReactNode } from "react"
import { Providers } from "@/components/providers"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
})

export const metadata: Metadata = {
  title: "VECINDO - Servicios de Confianza para tu Comunidad",
  description:
    "Plataforma privada de reputacion y servicios para comunidades cerradas. Encontra profesionales verificados, conecta con vecinos y construi confianza.",
}

export const viewport: Viewport = {
  themeColor: "#2d6a4f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}