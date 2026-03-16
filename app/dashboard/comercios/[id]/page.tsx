type CommerceReview = {
  user: string
  initials: string
  rating: number
  text: string
  date: string
  verified?: boolean
}

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  MapPin,
  MessageSquare,
  Phone,
  Clock,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"
import { commerces } from "../page"

export default function CommerceProfilePage() {
  const params = useParams<{ id: string }>()
  const { saveItem, isSaved, auth } = useAuth()
  const { trackProfileView, trackWhatsAppClick, trackCallClick, trackSave } = useCommerceAnalytics()

  const commerce = commerces.find((item) => item.id === params.id)

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviews, setReviews] = useState<CommerceReview[]>(commerce?.reviews ?? [])

  useEffect(() => {
    if (commerce) {
      trackProfileView(commerce.id)
    }
  }, [commerce, trackProfileView])

  if (!commerce) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/comercios" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit">
          <ArrowLeft className="h-4 w-4" />
          Volver a Comercios
        </Link>

        <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <h1 className="text-xl font-bold text-foreground">Comercio no encontrado</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            El comercio que querés ver no existe o fue removido.
          </p>
        </div>
      </div>
    )
  }

  const saved = isSaved(commerce.name)
  const waUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hola ${commerce.name}, los contacto desde VECINDO.`
  )}`

  const handleSubmitReview = () => {
    if (reviewRating === 0 || reviewText.trim() === "") return

    const newReview = {
      user: auth.profile.name,
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

  const handleSave = () => {
    trackSave(commerce.id)
    saveItem({
      type: "commerce",
      title: commerce.name,
      subtitle: `${commerce.category} · Hudson`,
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Link href="/dashboard/comercios" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="h-4 w-4" />
        Volver a Comercios
      </Link>

      <div className="h-40 rounded-xl overflow-hidden md:h-52 relative">
        <img
          src={commerce.bannerUrl}
          alt={commerce.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 -mt-10 mx-4 relative md:mx-8">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 shrink-0 border-4 border-card -mt-12">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
              {commerce.logo}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-foreground">{commerce.name}</h1>
              <Badge variant="secondary">{commerce.category}</Badge>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(commerce.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{commerce.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({reviews.length} reseñas)
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{commerce.longDescription}</p>

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
          <Button
            asChild
            className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
            onClick={() => trackWhatsAppClick(commerce.id)}
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="gap-2"
            onClick={() => trackCallClick(commerce.id)}
          >
            <a href={`tel:${commerce.phone}`}>
              <Phone className="h-4 w-4" />
              Llamar
            </a>
          </Button>

          <Button variant="outline" className="gap-2" disabled={saved} onClick={handleSave}>
            <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
            {saved ? "Guardado" : "Guardar"}
          </Button>
        </div>
      </div>

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
          <p className="absolute bottom-3 left-3 text-xs text-muted-foreground bg-card/90 px-2 py-1 rounded border border-border">
            {commerce.address}
          </p>
        </div>
      </div>

      {commerce.gallery.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-3">Galería</h2>
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

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">Reseñas</h2>
          <p className="text-xs text-muted-foreground">{reviews.length} reseñas de vecinos verificados</p>
        </div>

        {!reviewSubmitted ? (
          <div className="border-b border-border px-5 py-4 bg-muted/30">
            <p className="text-sm font-medium text-foreground mb-3">Dejá tu reseña</p>

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
                      i < reviewRating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30 hover:text-primary/50"
                    }`}
                  />
                </button>
              ))}

              {reviewRating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {reviewRating === 5
                    ? "Excelente"
                    : reviewRating === 4
                    ? "Muy bueno"
                    : reviewRating === 3
                    ? "Bueno"
                    : reviewRating === 2
                    ? "Regular"
                    : "Malo"}
                </span>
              )}
            </div>

            <Textarea
              placeholder="Contá tu experiencia con este comercio..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="mb-3 resize-none"
              rows={3}
            />

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Tu reseña aparece como "Vecino verificado"
              </p>

              <Button
                size="sm"
                onClick={handleSubmitReview}
                disabled={reviewRating === 0 || reviewText.trim() === ""}
              >
                Publicar reseña
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-b border-border px-5 py-4 bg-success/5">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-sm font-medium">¡Gracias por tu reseña!</p>
            </div>
          </div>
        )}

        <div className="divide-y divide-border">
          {reviews.map((review, i) => (
            <div key={i} className="flex gap-3 px-5 py-4">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-muted text-foreground text-xs">
                  {review.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground">{review.user}</span>

                  {review.verified ? (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 text-success border-success/30 bg-success/5"
                  >
                    <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                    Vecino verificado
                  </Badge>
                ) : null}

                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-3 w-3 ${
                          j < review.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
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