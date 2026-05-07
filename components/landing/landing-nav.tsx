"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Menu, X } from "lucide-react"
import { useState } from "react"

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fbfaf6]/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_25px_rgba(88,112,91,0.22)]">
            <Compass className="h-5 w-5" />
          </span>
          <span className="text-xl font-semibold tracking-[-0.03em] text-stone-950">NIAR</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-stone-600 transition-colors hover:text-stone-950">
            Descubrir
          </Link>
          <Link href="#plans" className="text-sm text-stone-600 transition-colors hover:text-stone-950">
            Planes
          </Link>
          <Link href="#trust" className="text-sm text-stone-600 transition-colors hover:text-stone-950">
            Confianza
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Ingresar</Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link href="/login">Empezar a explorar</Link>
          </Button>
        </div>

        <button
          className="text-stone-950 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-stone-200/70 bg-[#fbfaf6] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#features" className="text-sm text-stone-600" onClick={() => setOpen(false)}>
              Descubrir
            </Link>
            <Link href="#plans" className="text-sm text-stone-600" onClick={() => setOpen(false)}>
              Planes
            </Link>
            <Link href="#trust" className="text-sm text-stone-600" onClick={() => setOpen(false)}>
              Confianza
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/login">Empezar a explorar</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
