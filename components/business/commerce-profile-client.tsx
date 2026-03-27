"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin, MessageSquare, Phone, Clock, ArrowLeft, Bookmark, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"
import type { CommerceItem, CommerceReview } from "@/lib/commerces-data"

type Props = {
  commerce: CommerceItem
}

export function CommerceProfileClient({ commerce }: Props) {
  const { saveItem, isSaved, auth } = useAuth()
  const { trackProfileView, trackWhatsAppClick, trackCallClick, trackSave } = useCommerceAnalytics()

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviews, setReviews] = useState<CommerceReview[]>(commerce.reviews ?? [])

  useEffect(() => {
    trackProfileView(commerce.id)
  }, [commerce.id, trackProfileView])

  const saved = isSaved(commerce.name)
  const waUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hola ${commerce.name}, los contacto desde VECINDO.`
  )}`

  const handleSubmitReview = () => {
    if (reviewRating === 0 || reviewText.trim() === "") return

    const newReview: CommerceReview = {
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
      subtitle: `${commerce.category} · ${commerce.location}`,
    })
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <Link href="/dashboard/comercios" className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a Comercios
      </Link>

      <div className="relative h-40 overflow-hidden rounded-xl md:h-52">
        <img src={commerce.bannerUrl} alt={commerce.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative -mt-10 mx-4 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 md:mx-8">
        <div className="flex items-start gap-4">
          <Avatar className="-mt-12 h-16 w-16 shrink-0 border-4 border-card">
            <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">{commerce.logo}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{commerce.name}</h1>
              <Badge variant="secondary">{commerce.category}</Badge>
            </div>

            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(commerce.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{commerce.rating}</span>
              <span className="text-xs text-muted-foreground">({reviews.length} reseñas)</span>
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{commerce.longDescription}</p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {commerce.address}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            {commerce.hours}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button asChild className="gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(commerce.id)}
            >
              <MessageSquare className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <a href={`tel:${commerce.phone}`} onClick={() => trackCallClick(commerce.id)}>
              <Phone className="h-4 w-4" />
              Llamar
            </a>
          </Button>

          <Button variant="outline" className="gap-2" onClick={handleSave}>
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            {saved ? "Guardado" : "Guardar"}
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Reseñas</h2>

        <div className="mt-4 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={`${review.user}-${index}`} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{review.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{review.user}</p>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Verificado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
              Todavía no hay reseñas. Sé la primera persona en dejar una.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Dejá tu reseña</h2>
        <div className="mt-4 flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} type="button" onClick={() => setReviewRating(i + 1)} className="rounded-md p-1">
              <Star className={`h-5 w-5 ${i < reviewRating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
            </button>
          ))}
        </div>
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Contá tu experiencia con este perfil..."
          className="mt-4 min-h-28"
        />
        <div className="mt-4 flex items-center gap-3">
          <Button onClick={handleSubmitReview}>Enviar reseña</Button>
          {reviewSubmitted && <span className="text-sm text-emerald-600">Tu reseña fue enviada.</span>}
        </div>
      </div>
    </div>
  )
}
