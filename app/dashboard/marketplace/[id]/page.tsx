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
  ShieldCheck,
  Eye,
} from "lucide-react"

function getConditionBadgeClass(condition: string) {
  const normalized = condition.toLowerCase()

  if (normalized.includes("como nueva")) {
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  }

  if (normalized.includes("excelente")) {
    return "bg-sky-100 text-sky-700 hover:bg-sky-100"
  }

  if (normalized.includes("bueno")) {
    return "bg-amber-100 text-amber-700 hover:bg-amber-100"
  }

  return "bg-muted text-muted-foreground hover:bg-muted"
}

function getStatusBadgeClass(status: string) {
  const normalized = status.toLowerCase()

  if (normalized.includes("disponible")) {
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  }

  if (normalized.includes("reservado")) {
    return "bg-amber-100 text-amber-700 hover:bg-amber-100"
  }

  if (normalized.includes("vendido")) {
    return "bg-muted text-muted-foreground hover:bg-muted"
  }

  return "bg-muted text-muted-foreground hover:bg-muted"
}

export default function MarketplaceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const listing = listings.find((l) => l.id === id)
  const [currentImage, setCurrentImage] = useState(0)
  const { saveItem, isSaved } = useAuth()

  if (!listing) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-2 text-xl font-bold text-foreground">Publicación no encontrada</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          El artículo que buscás no existe o ya no está disponible.
        </p>
        <Link href="/dashboard/marketplace" className="text-sm text-emerald-700 hover:underline">
          Volver al Mercado
        </Link>
      </div>
    )
  }

  const saved = isSaved(listing.title)
  const isSold = listing.status === "Vendido"
  const isReserved = listing.status === "Reservado"

  const whatsappUrl = `https://wa.me/${listing.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hola ${listing.seller}, me interesa "${listing.title}" (${listing.price}) publicado en VEZI.`
  )}`

  const sellerListings = listings.filter(
    (l) => l.sellerId === listing.sellerId && l.id !== listing.id
  )

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % listing.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length)
  }

  const handleSave = () => {
    if (saved) return

    saveItem({
      type: "marketplace",
      title: listing.title,
      subtitle: `${listing.price} · ${listing.seller}`,
    })
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <Link
        href="/dashboard/marketplace"
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al Mercado
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted sm:aspect-[16/10]">
            <img
              src={listing.images[currentImage]}
              alt={`${listing.title} - imagen ${currentImage + 1}`}
              className={`h-full w-full object-cover ${isSold ? "opacity-75" : ""}`}
            />

            {listing.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              <Badge className="bg-background/95 text-foreground hover:bg-background/95">
                {listing.category}
              </Badge>
              <Badge className={getConditionBadgeClass(listing.condition)}>
                {listing.condition}
              </Badge>
              <Badge className={getStatusBadgeClass(listing.status)}>
                {listing.status}
              </Badge>
            </div>

            {isSold && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/45">
                <Badge className="bg-background text-foreground hover:bg-background">
                  Vendido
                </Badge>
              </div>
            )}
          </div>

          {listing.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`overflow-hidden rounded-xl border-2 transition-colors ${
                    i === currentImage
                      ? "border-emerald-500"
                      : "border-transparent hover:border-emerald-200"
                  }`}
                >
                  <div className="aspect-square bg-muted">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-2 text-lg font-semibold text-foreground">Descripción</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {listing.fullDescription}
            </p>
          </div>

          {sellerListings.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <h2 className="font-semibold text-foreground">
                  Más publicaciones de {listing.seller}
                </h2>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2">
                {sellerListings.map((item) => (
                  <Link
                    key={item.id}
                    href={`/dashboard/marketplace/${item.id}`}
                    className="group flex gap-3 rounded-xl border border-border p-3 transition-colors hover:border-emerald-300"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-emerald-700">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-bold text-emerald-700">{item.price}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.posted}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-emerald-200 bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{listing.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {listing.zone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {listing.posted}
                  </span>
                </div>
              </div>

              <span className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                {listing.price}
              </span>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-emerald-100 text-sm font-bold text-emerald-700">
                    {listing.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{listing.seller}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Vecino de {listing.zone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <Button
                asChild
                className="w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                disabled={isSold}
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-4 w-4" />
                  {isSold
                    ? "Producto no disponible"
                    : isReserved
                    ? "Consultar si sigue disponible"
                    : "Contactar por WhatsApp"}
                </a>
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="gap-2" onClick={handleSave} disabled={saved}>
                  <Bookmark
                    className={`h-4 w-4 ${saved ? "fill-emerald-700 text-emerald-700" : ""}`}
                  />
                </Button>

                <Button variant="outline" size="icon" className="text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" className="text-muted-foreground">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Información útil</h2>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Eye className="mt-0.5 h-4 w-4 shrink-0" />
                Revisá bien el producto antes de concretar la compra.
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0" />
                Coordiná entrega y pago directamente con el vendedor.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                Las publicaciones circulan dentro de la comunidad.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">
              Transacción entre vecinos. VEZI no interviene en pagos ni entregas.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}