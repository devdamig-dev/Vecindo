"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, MessageSquare, Phone, Star, Store, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { CommerceItem } from "@/lib/commerces-data"
import CatalogWhatsAppOrder from "@/components/business/catalog-whatsapp-order"
import { VeziLogo } from "@/components/shared/vezi-logo"

function ratingStars(value: number) {
  return Array.from({ length: 5 }).map((_, i) => i < Math.floor(value))
}

export default function PublicCommerceCatalog({ commerce }: { commerce: CommerceItem }) {
  const isCommerce = commerce.type === "commerce"
  const waUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${commerce.name}, llegué desde tu catálogo público de VEZI.`)}`

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <VeziLogo href="/" compact />
          <Button asChild variant="outline"><Link href="/login">Entrar a VEZI</Link></Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
        <Link href="/" className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        <section className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative h-48 overflow-hidden md:h-60">
            <img src={commerce.bannerUrl} alt={commerce.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
          <div className="px-5 pb-6 pt-0 md:px-8">
            <div className="-mt-10 grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-4 border-card md:h-20 md:w-20">
                  <AvatarFallback className={isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}>{commerce.logo}</AvatarFallback>
                </Avatar>
                <div className="pt-2">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className={isCommerce ? "bg-sky-100 text-sky-700 hover:bg-sky-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>{isCommerce ? <><Store className="mr-1 h-3.5 w-3.5" />Comercio</> : <><Sparkles className="mr-1 h-3.5 w-3.5" />Emprendimiento</>}</Badge>
                    <Badge variant="secondary">{commerce.category}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{commerce.name}</h1>
                  <p className="mt-2 max-w-3xl text-base text-muted-foreground">{commerce.longDescription}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">{ratingStars(commerce.rating).map((filled, i) => <Star key={i} className={`h-4 w-4 ${filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />)}</div>
                    <span>{commerce.rating}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{commerce.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:pt-6">
                <Button asChild className="gap-2"><a href={waUrl} target="_blank" rel="noopener noreferrer"><MessageSquare className="h-4 w-4" />Contactar por WhatsApp</a></Button>
                <Button asChild variant="outline" className="gap-2"><a href={`tel:${commerce.phone}`}><Phone className="h-4 w-4" />Llamar</a></Button>
              </div>
            </div>
          </div>
        </section>

        <CatalogWhatsAppOrder products={commerce.products} whatsapp={commerce.whatsapp} commerceName={commerce.name} isEntrepreneur={!isCommerce} publicMode />
      </main>
    </div>
  )
}
