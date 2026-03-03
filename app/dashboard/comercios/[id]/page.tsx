"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin, MessageSquare, Phone, Clock, ArrowLeft, Bookmark, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"

const commerce = {
  id: "1",
  name: "Almac\u00e9n Don Carlos",
  category: "Almac\u00e9n",
  logo: "DC",
  rating: 4.8,
  reviewCount: 42,
  description: "Almac\u00e9n de barrio con m\u00e1s de 20 a\u00f1os en la zona. Ofrecemos productos frescos del d\u00eda, fiambrer\u00eda artesanal importada, panader\u00eda propia, verdurer\u00eda org\u00e1nica y un servicio de reparto a domicilio r\u00e1pido dentro de Hudson. Trabajamos con productores locales para garantizar la mejor calidad.",
  whatsapp: "+5411234567890",
  phone: "+5411234567890",
  address: "Av. Hudson 1234, Berazategui",
  hours: "Lunes a S\u00e1bado 8:00 - 20:00 | Domingos 9:00 - 13:00",
  bannerUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=300&fit=crop",
  gallery: [
    { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop", caption: "Verduras frescas" },
    { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop", caption: "Panader\u00eda artesanal" },
    { url: "https://images.unsplash.com/photo-1556908224-c8c5f9f2dc5b?w=300&h=200&fit=crop", caption: "Fiambrer\u00eda" },
    { url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&h=200&fit=crop", caption: "L\u00e1cteos" },
  ],
  reviews: [
    { user: "Maria G.", initials: "MG", rating: 5, text: "Excelente atenci\u00f3n y productos siempre frescos. El reparto es muy r\u00e1pido.", date: "hace 3 d\u00edas" },
    { user: "Carlos R.", initials: "CR", rating: 5, text: "Los mejores fiambres de la zona, sin dudas. Muy recomendable.", date: "hace 1 semana" },
    { user: "Laura T.", initials: "LT", rating: 4, text: "Buen almac\u00e9n, precios justos. A veces se quedan sin stock de algunas cosas.", date: "hace 2 semanas" },
  ],
}

export default function CommerceProfilePage() {
  const { saveItem, isSaved, auth } = useAuth()
  const { trackProfileView, trackWhatsAppClick, trackCallClick, trackSave } = useCommerceAnalytics()
  const saved = isSaved(commerce.name)
  const waUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${commerce.name}, los contacto desde VECINDO.`)}`

  // Review form state
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviews, setReviews] = useState(commerce.reviews)

  // Track profile view on mount
  useEffect(() => {
    trackProfileView(commerce.id)
  }, [trackProfileView])

  const handleSubmitReview = () => {
    if (reviewRating === 0 || reviewText.trim() === "") return
    const newReview = {
      user: auth.profile.name.split(" ").map(n => n[0]).join("") === auth.profile.avatarInitials
        ? auth.profile.name
        : auth.profile.name,
      initials: auth.profile.avatarInitials,
      rating: reviewRating,
      text: reviewText,
      date: "ahora",
      verified: true,
    }
    setReviews([newReview, ...reviews])
    setReviewSubmitted(true)
    setReviewRating(0)
    setReviewText("")
  }

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(commerce.id)
  }

  const handleCallClick = () => {
    trackCallClick(commerce.id)
  }

  const handleSave = () => {
    trackSave(commerce.id)
    saveItem({ type: "commerce", title: commerce.name, subtitle: `${commerce.category} \u00b7 Hudson` })
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Link href="/dashboard/comercios" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="h-4 w-4" />
        Volver a Comercios
      </Link>

      {/* Banner */}
      <div className="h-40 rounded-xl overflow-hidden md:h-52 relative">
        <img
          src={commerce.bannerUrl}
          alt={commerce.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 -mt-10 mx-4 relative md:mx-8">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 shrink-0 border-4 border-card -mt-12">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">{commerce.logo}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-foreground">{commerce.name}</h1>
              <Badge variant="secondary">{commerce.category}</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(commerce.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{commerce.rating}</span>
              <span className="text-xs text-muted-foreground">({commerce.reviewCount} rese\u00f1as)</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{commerce.description}</p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            {commerce.address}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            {commerce.hours}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button asChild className="gap-2 bg-success hover:bg-success/90 text-success-foreground" onClick={handleWhatsAppClick}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2" onClick={handleCallClick}>
            <a href={`tel:${commerce.phone}`}>
              <Phone className="h-4 w-4" />
              Llamar
            </a>
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            disabled={saved}
            onClick={handleSave}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
            {saved ? "Guardado" : "Guardar"}
          </Button>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="bg-muted/50 h-48 flex items-center justify-center relative">
          <div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-px opacity-15">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-border" />
            ))}
          </div>
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
            {commerce.logo}
          </div>
          <p className="absolute bottom-3 left-3 text-xs text-muted-foreground bg-card/90 px-2 py-1 rounded border border-border">{commerce.address}</p>
        </div>
      </div>

      {/* Gallery */}
      {commerce.gallery.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-3">{"Galer\u00eda"}</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {commerce.gallery.map((img, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-[10px] text-white/90">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">Rese&ntilde;as</h2>
          <p className="text-xs text-muted-foreground">{reviews.length} rese&ntilde;as de vecinos verificados</p>
        </div>

        {/* Review Form */}
        {!reviewSubmitted ? (
          <div className="border-b border-border px-5 py-4 bg-muted/30">
            <p className="text-sm font-medium text-foreground mb-3">Dej&aacute; tu rese&ntilde;a</p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReviewRating(i + 1)}
                  className="p-0.5 transition-transform hover:scale-110"
                  aria-label={`${i + 1} estrellas`}
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      i < reviewRating ? "fill-primary text-primary" : "text-muted-foreground/30 hover:text-primary/50"
                    }`}
                  />
                </button>
              ))}
              {reviewRating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {reviewRating === 5 ? "Excelente" : reviewRating === 4 ? "Muy bueno" : reviewRating === 3 ? "Bueno" : reviewRating === 2 ? "Regular" : "Malo"}
                </span>
              )}
            </div>
            <Textarea
              placeholder="Cont&aacute; tu experiencia con este comercio..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="mb-3 resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Tu rese&ntilde;a aparece como &quot;Vecino verificado&quot;
              </p>
              <Button
                size="sm"
                onClick={handleSubmitReview}
                disabled={reviewRating === 0 || reviewText.trim() === ""}
              >
                Publicar rese&ntilde;a
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-b border-border px-5 py-4 bg-success/5">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-sm font-medium">¡Gracias por tu rese&ntilde;a!</p>
            </div>
          </div>
        )}

        <div className="divide-y divide-border">
          {reviews.map((review, i) => (
            <div key={i} className="flex gap-3 px-5 py-4">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-muted text-foreground text-xs">{review.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground">{review.user}</span>
                  {"verified" in review && review.verified && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-success border-success/30 bg-success/5">
                      <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                      Vecino verificado
                    </Badge>
                  )}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
