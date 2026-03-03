"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { listings } from "@/components/marketplace/marketplace-grid"
import { useAuth } from "@/lib/auth-context"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  MessageSquare,
  Bookmark,
  Share2,
  Flag,
  User,
} from "lucide-react"

export default function MarketplaceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const listing = listings.find((l) => l.id === id)
  const [currentImage, setCurrentImage] = useState(0)
  const { saveItem, isSaved } = useAuth()

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
        <h1 className="text-xl font-bold text-foreground mb-2">Publicaci\u00f3n no encontrada</h1>
        <p className="text-sm text-muted-foreground mb-6">
          El art\u00edculo que busc\u00e1s no existe o fue vendido.
        </p>
        <Link href="/dashboard/marketplace" className="text-sm text-primary hover:underline">
          Volver al Mercado
        </Link>
      </div>
    )
  }

  const saved = isSaved(listing.title)
  const whatsappUrl = `https://wa.me/${listing.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${listing.seller}, me interesa "${listing.title}" (${listing.price}) publicado en VECINDO.`)}`

  // Get other listings from the same seller
  const sellerListings = listings.filter(
    (l) => l.sellerId === listing.sellerId && l.id !== listing.id
  )

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % listing.images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length)

  const handleSave = () => {
    saveItem({
      type: "marketplace",
      title: listing.title,
      subtitle: `${listing.price} \u00b7 ${listing.seller}`,
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <Link
        href="/dashboard/marketplace"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al Mercado
      </Link>

      {/* Image Carousel */}
      <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3] sm:aspect-[16/10]">
        <img
          src={listing.images[currentImage]}
          alt={`${listing.title} - imagen ${currentImage + 1}`}
          className="h-full w-full object-cover"
        />

        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {listing.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image thumbnails */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {listing.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-12 w-12 rounded-md overflow-hidden border-2 transition-colors ${
                i === currentImage ? "border-white" : "border-transparent opacity-70"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">{listing.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">{listing.category}</Badge>
              <Badge variant="outline">{listing.condition}</Badge>
            </div>
          </div>
          <span className="text-2xl font-bold text-primary sm:text-3xl">{listing.price}</span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {listing.zone}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {listing.posted}
          </span>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <h2 className="font-semibold text-foreground mb-2">{"Descripci\u00f3n"}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {listing.fullDescription}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
          <Button asChild className="gap-2 flex-1 sm:flex-none bg-success hover:bg-success/90 text-success-foreground">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleSave} disabled={saved}>
            <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
            {saved ? "Guardado" : "Guardar"}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Seller Card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
              {listing.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{listing.seller}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" />
              Vecino de {listing.zone}
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Contactar
            </a>
          </Button>
        </div>
      </div>

      {/* More from this seller */}
      {sellerListings.length > 0 && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">{"M\u00e1s publicaciones de " + listing.seller}</h2>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {sellerListings.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/mercado/${item.id}`}
                className="group flex gap-3 rounded-lg border border-border p-3 hover:border-primary/30 transition-colors"
              >
                <div className="h-16 w-16 shrink-0 rounded-md overflow-hidden bg-muted">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-primary mt-0.5">{item.price}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.posted}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Community disclaimer */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          {"Transacci\u00f3n entre vecinos. VECINDO no interviene en pagos ni entregas."}
        </p>
      </div>
    </div>
  )
}
