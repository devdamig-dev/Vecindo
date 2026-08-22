"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, MapPin, X } from "lucide-react"
import { useState } from "react"

export function LandingNav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-[#f7f2e8]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-[-.05em]">VEZI<span className="text-orange-500">.</span></Link>
        <div className="hidden items-center gap-7 md:flex text-sm text-muted-foreground">
          <Link href="#como-funciona">Cómo funciona</Link><Link href="#universos">Universos</Link><Link href="#para-ofrecer">Para ofrecer</Link><Link href="#novedades">Novedades</Link>
        </div>
        <div className="hidden md:flex"><Button asChild className="rounded-xl bg-slate-950 text-white"><Link href="/dashboard">Entrar a VEZI</Link></Button></div>
        <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)}>{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </nav>
      {open && <div className="border-t border-border bg-[#f7f2e8] px-6 py-4 md:hidden"><div className="mb-4 flex items-center gap-2 text-xs font-bold text-orange-700"><MapPin className="h-3.5 w-3.5" />Lo que necesitás, cerca tuyo</div><div className="flex flex-col gap-4 text-sm"><Link onClick={() => setOpen(false)} href="#como-funciona">Cómo funciona</Link><Link onClick={() => setOpen(false)} href="#universos">Universos</Link><Link onClick={() => setOpen(false)} href="#para-ofrecer">Para ofrecer</Link><Link onClick={() => setOpen(false)} href="#novedades">Novedades</Link><Button asChild className="bg-slate-950"><Link href="/dashboard">Entrar a VEZI</Link></Button></div></div>}
    </header>
  )
}
