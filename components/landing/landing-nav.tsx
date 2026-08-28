"use client"
import Link from "next/link"
import { Menu, MapPin, X } from "lucide-react"
import { useState } from "react"
import { LandingAuthLink } from "./landing-auth-link"

export function LandingNav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-[-.05em]">VEZI<span className="text-[#FF5A67]">.</span></Link>
        <div className="hidden items-center gap-7 md:flex text-sm text-muted-foreground">
          <Link href="#como-funciona">Cómo funciona</Link><Link href="#para-negocios">Para negocios</Link><Link href="#modulos">Módulos</Link>
        </div>
        <div className="hidden items-center gap-4 md:flex"><LandingAuthLink mode="login" className="text-sm font-bold">Entrar</LandingAuthLink><LandingAuthLink className="rounded-xl bg-vezi-ink px-4 py-2.5 text-sm font-bold text-white">Crear cuenta</LandingAuthLink></div>
        <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)}>{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </nav>
      {open && <div className="border-t border-border bg-background px-6 py-4 md:hidden"><div className="mb-4 flex items-center gap-2 text-xs font-bold text-[#b42336]"><MapPin className="h-3.5 w-3.5" />Todo lo que pasa cerca, conectado</div><div className="flex flex-col gap-4 text-sm"><Link onClick={() => setOpen(false)} href="#como-funciona">Cómo funciona</Link><Link onClick={() => setOpen(false)} href="#para-negocios">Para negocios</Link><Link onClick={() => setOpen(false)} href="#modulos">Módulos</Link><LandingAuthLink mode="login" className="font-bold">Entrar</LandingAuthLink><LandingAuthLink className="rounded-xl bg-vezi-ink px-4 py-3 text-center font-bold text-white">Crear cuenta</LandingAuthLink></div></div>}
    </header>
  )
}
