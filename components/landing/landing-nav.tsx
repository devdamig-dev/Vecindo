"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Menu, Shield, X } from "lucide-react"
import { useState } from "react"

export function LandingNav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2"><Shield className="h-7 w-7 text-primary" /><span className="text-xl font-bold">VEZI</span></Link>
        <div className="hidden items-center gap-7 md:flex text-sm text-muted-foreground">
          <Link href="#como-funciona">Cómo funciona</Link><Link href="#servicios">Servicios</Link><Link href="#comercios">Comercios</Link><Link href="#sponsor">Sponsor</Link>
        </div>
        <div className="hidden items-center gap-2 md:flex"><Button variant="ghost" asChild><Link href="/login">Entrar a VEZI</Link></Button><Button asChild><Link href="/login">Empezar ahora</Link></Button></div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </nav>
      {open && <div className="border-t border-border bg-white/95 px-6 py-4 md:hidden"><div className="mb-3 flex items-center gap-2 text-xs text-primary"><MapPin className="h-3.5 w-3.5" />Red local moderna</div><div className="flex flex-col gap-3 text-sm"><Link href="#como-funciona">Cómo funciona</Link><Link href="#servicios">Servicios</Link><Link href="#comercios">Comercios</Link><Button asChild><Link href="/login">Crear cuenta</Link></Button></div></div>}
    </header>
  )
}
