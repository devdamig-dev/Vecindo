"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { VeziLogo } from "@/components/shared/vezi-logo"

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <VeziLogo href="/" />

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Funcionalidades
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Cómo funciona
          </Link>
          <Link href="#trust" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Confianza
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Ingresar</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Solicitar acceso</Link>
          </Button>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-card px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#features" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              Funcionalidades
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              Cómo funciona
            </Link>
            <Link href="#trust" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              Confianza
            </Link>
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" asChild className="flex-1">
                <Link href="/login">Ingresar</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/login">Solicitar acceso</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
