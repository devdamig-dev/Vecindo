"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
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
  Store,
  Sparkles,
  Globe,
  Truck,
  ShieldCheck,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"
import type { CommerceItem, CommerceReview } from "@/lib/commerces-data"

type Props = {
  commerce: CommerceItem
  activeTab?: "comercios" | "emprendimientos"
}

export default function CommerceProfileClient({
  commerce,
  activeTab = commerce.type === "entrepreneur" ? "emprendimientos" : "comercios",
}: Props) {
  const { saveItem, isSaved, auth } = useAuth()
  const { trackProfileView, trackWhatsAppClick, trackCallClick, trackSave } = useCommerceAnalytics()

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviews, setReviews] = useState<CommerceReview[]>(commerce.reviews ?? [])

  const isCommerce = commerce.type === "commerce"
  const backHref = activeTab === "emprendimientos" ? "/dashboard/comercios?tipo=emprendimientos" : "/dashboard/comercios"
  const backLabel = activeTab === "emprendimientos" ? "Volver a Emprendimientos locales" : "Volver a Comercios"

  useEffect(() => {
    trackProfileView(commerce.id)
  }, [commerce.id, trackProfileView])

  const saved = isSaved(commerce.name)
  const waUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hola ${commerce.name}, los contacto desde VECINDO.`
  )}`

  const trustSignals = useMemo(() => {
    if (isCommerce) {
      return [
        { icon: MapPin, text: "Ubicación visible en la zona" },
        { icon: Clock, text: "Horarios y atención publicados" },
        { icon: ShieldCheck, text: "Ficha comercial institucional" },
      ]
    }

    return [
      { icon: Sparkles, text: "Proyecto local independiente" },
      { icon: Truck, text: "Entregas o coordinación por mensaje" },
      { icon: Globe, text: "Catálogo y marca sin local fijo" },
    ]
  }, [isCommerce])

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
    <div className="flex max-w-5xl flex-col gap-6">
      <Link href={backHref} className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative h-44 md:h-60">
          <img src={commerce.bannerUrl} alt={commerce.name} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 ${isCommerce ? "bg-gradient-to-t from-sky-950/60 via-sky-950/10" : "bg-gradient-to-t from-amber-950/60 via-amber-950/10"} to-transparent`} />
        </div>

        <div className="relative px-5 pb-5 md:px-8">
          <div className="-mt-10 flex flex-col gap-4 md:-mt-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="-mt-2 h-16 w-16 shrink-0 border-4 border-card md:h-20 md:w-20">
                  <AvatarFallback className={`${isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"} text-xl font-bold`}>
                    {commerce.logo}
                  </AvatarFallback>
                </Avatar>

                <div className="pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={isCommerce ? "bg-sky-100 text-sky-700 hover:bg-sky-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
                      {isCommerce ? <Store className="mr-1 h-3.5 w-3.5" /> : <Sparkles className="mr-1 h-3.5 w-3.5" />}
                      {isCommerce ? "Comercio" : "Emprendimiento local"}
                    </Badge>
                    <Badge variant="secondary">{commerce.category}</Badge>
                  </div>

                  <h1 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{commerce.name}</h1>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{commerce.longDescription}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(commerce.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{commerce.rating}</span>
                    <span className="text-xs text-muted-foreground">({reviews.length} reseñas)</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{commerce.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild className="gap-2">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(commerce.id)}>
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

            <div className="grid gap-3 md:grid-cols-3">
              {trustSignals.map((signal) => {
                const Icon = signal.icon
                return (
                  <div key={signal.text} className="rounded-xl border border-border bg-muted/30 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">{signal.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">
              {isCommerce ? "Información del comercio" : "Cómo trabaja este emprendimiento"}
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className={`h-4 w-4 ${isCommerce ? "text-sky-700" : "text-amber-700"}`} />
                  {isCommerce ? "Ubicación" : "Modalidad"}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isCommerce ? commerce.address : "Sin local físico. Coordinación por mensaje, catálogo o entrega pactada."}
                </p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className={`h-4 w-4 ${isCommerce ? "text-sky-700" : "text-amber-700"}`} />
                  {isCommerce ? "Horarios" : "Atención"}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isCommerce ? commerce.hours : "Responde por WhatsApp y coordina pedidos de forma flexible según disponibilidad."}
                </p>
              </div>
            </div>

            {!isCommerce && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="text-sm font-semibold text-amber-800">Perfil sin local físico</h3>
                <p className="mt-1 text-sm text-amber-700">
                  Este emprendimiento se presenta desde su marca, catálogo y atención personalizada. La conversión sucede por mensaje, encargos o entregas coordinadas.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">Reseñas</h2>

            <div className="mt-4 space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={`${review.user}-${index}`} className="rounded-xl border border-border p-4">
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
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  Todavía no hay reseñas. Sé la primera persona en dejar una.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {isCommerce ? (
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
              <h2 className="text-lg font-semibold text-sky-900">Ubicación en el mapa</h2>
              <p className="mt-1 text-sm text-sky-800">
                Los comercios muestran referencia geográfica visible para facilitar visitas, retiros y cercanía dentro de la zona.
              </p>

              <div className="mt-4 overflow-hidden rounded-xl border border-sky-200 bg-white">
                <div className="flex h-64 items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_18%),radial-gradient(circle_at_70%_35%,rgba(14,165,233,0.14),transparent_20%),radial-gradient(circle_at_55%_75%,rgba(14,165,233,0.12),transparent_22%),linear-gradient(to_bottom,rgba(255,255,255,1),rgba(240,249,255,1))] p-6">
                  <div className="w-full rounded-xl border border-dashed border-sky-300 bg-sky-50/80 p-5 text-center">
                    <MapPin className="mx-auto h-6 w-6 text-sky-700" />
                    <p className="mt-2 text-sm font-medium text-sky-900">{commerce.address}</p>
                    <p className="mt-1 text-xs text-sky-700">
                      Acá va el mapa geolocalizado del comercio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="text-lg font-semibold text-amber-900">Modelo de atención</h2>
              <p className="mt-1 text-sm text-amber-800">
                Los emprendimientos no dependen de un punto fijo. Lo importante acá es la confianza, el catálogo y la coordinación del pedido.
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-amber-200 bg-white/70 p-4">
                  <p className="text-sm font-medium text-amber-900">Canal principal</p>
                  <p className="mt-1 text-sm text-amber-800">WhatsApp y atención directa</p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-white/70 p-4">
                  <p className="text-sm font-medium text-amber-900">Entrega</p>
                  <p className="mt-1 text-sm text-amber-800">Coordinada según zona, pedido o disponibilidad</p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-white/70 p-4">
                  <p className="text-sm font-medium text-amber-900">Formato comercial</p>
                  <p className="mt-1 text-sm text-amber-800">Catálogo, encargos y producción a medida</p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">Dejá tu reseña</h2>
            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} type="button" onClick={() => setReviewRating(i + 1)} className="rounded-md p-1">
                  <Star className={`h-5 w-5 ${i < reviewRating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={`Contá tu experiencia con ${commerce.name}...`}
              className="mt-4 min-h-28"
            />
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={handleSubmitReview}>Enviar reseña</Button>
              {reviewSubmitted && <span className="text-sm text-emerald-600">Tu reseña fue enviada.</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
