"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Package,
  Truck,
  MapPinned,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"
import type { CommerceItem, CommerceReview } from "@/lib/commerces-data"

type Props = {
  commerce: CommerceItem
  activeTab?: "comercios" | "emprendimientos"
}

function ratingStars(value: number) {
  return Array.from({ length: 5 }).map((_, i) => i < Math.floor(value))
}

export default function CommerceProfileClient({ commerce, activeTab }: Props) {
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
  const isCommerce = commerce.type === "commerce"
  const cameFromEntrepreneurTab = activeTab === "emprendimientos"

  const backHref = cameFromEntrepreneurTab
    ? "/dashboard/comercios?tipo=emprendimientos"
    : "/dashboard/comercios"

  const backLabel = cameFromEntrepreneurTab
    ? "Volver a Emprendimientos locales"
    : "Volver a Comercios"

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

  const trustBullets = useMemo(() => {
    return isCommerce
      ? [
          "Ubicación visible en la zona",
          "Horarios y atención publicados",
          "Ficha comercial institucional",
        ]
      : [
          "Atención directa por WhatsApp",
          "Pedidos o encargos coordinados",
          "Entrega o retiro a convenir",
        ]
  }, [isCommerce])

  return (
    <div className="flex max-w-6xl flex-col gap-6">
      <Link href={backHref} className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="relative h-52 overflow-hidden md:h-64">
          <img src={commerce.bannerUrl} alt={commerce.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        </div>

        <div className="relative px-6 pb-6 pt-0 md:px-8">
          <div className="-mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
            <div className="min-w-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 shrink-0 border-4 border-card md:h-20 md:w-20">
                  <AvatarFallback className={isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}>
                    <span className="text-xl font-bold">{commerce.logo}</span>
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 pt-2">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className={isCommerce ? "bg-sky-100 text-sky-700 hover:bg-sky-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
                      {isCommerce ? (
                        <><Store className="mr-1 h-3.5 w-3.5" /> Comercio</>
                      ) : (
                        <><Sparkles className="mr-1 h-3.5 w-3.5" /> Emprendimiento</>
                      )}
                    </Badge>
                    <Badge variant="secondary">{commerce.category}</Badge>
                  </div>

                  <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {commerce.name}
                  </h1>

                  <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground">
                    {commerce.longDescription}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1">
                        {ratingStars(commerce.rating).map((filled, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-foreground">{commerce.rating}</span>
                      <span>({reviews.length} reseñas)</span>
                    </div>
                    <span>•</span>
                    <span>{commerce.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end md:pt-6">
              <Button asChild className="gap-2 bg-emerald-700 text-white hover:bg-emerald-800">
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

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {trustBullets.map((text, index) => (
              <div key={index} className="rounded-2xl border border-border bg-background p-4">
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}`}>
                  {index === 0 ? <MapPin className="h-5 w-5" /> : index === 1 ? <Clock className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                </div>
                <p className="font-medium text-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {isCommerce ? (
            <>
              <div className="rounded-3xl border border-sky-200 bg-sky-50/70 p-6">
                <div className="mb-4 flex items-center gap-2 text-sky-700">
                  <MapPinned className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Ubicación y atención presencial</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-sky-200 bg-white p-4">
                    <p className="text-sm font-medium text-foreground">Dirección visible</p>
                    <p className="mt-1 text-sm text-muted-foreground">{commerce.address}</p>
                  </div>
                  <div className="rounded-2xl border border-sky-200 bg-white p-4">
                    <p className="text-sm font-medium text-foreground">Horarios publicados</p>
                    <p className="mt-1 text-sm text-muted-foreground">{commerce.hours}</p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-sky-200 bg-white">
                  <div className="flex h-60 items-center justify-center bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_100%)] text-center">
                    <div>
                      <MapPinned className="mx-auto h-8 w-8 text-sky-700" />
                      <p className="mt-3 font-medium text-foreground">Mapa de geolocalización</p>
                      <p className="mt-1 text-sm text-muted-foreground">Acá se visualiza la ubicación del comercio dentro de la zona.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Qué vas a encontrar</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-border p-4">
                    <p className="font-medium text-foreground">Atención en local</p>
                    <p className="mt-1 text-sm text-muted-foreground">Experiencia presencial, asesoramiento y compra directa en la zona.</p>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <p className="font-medium text-foreground">Beneficios para vecinos</p>
                    <p className="mt-1 text-sm text-muted-foreground">Promociones, convenios o ventajas exclusivas dentro de Vecindo.</p>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <p className="font-medium text-foreground">Ficha institucional</p>
                    <p className="mt-1 text-sm text-muted-foreground">Perfil más formal para generar confianza y facilitar la elección.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6">
                <div className="mb-4 flex items-center gap-2 text-amber-700">
                  <Package className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Cómo trabaja este emprendimiento</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-amber-200 bg-white p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-foreground">Pedido directo</p>
                    <p className="mt-1 text-sm text-muted-foreground">Consultás por WhatsApp, coordinás detalles y resolvés sin vueltas.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-white p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Clock className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-foreground">Producción o armado</p>
                    <p className="mt-1 text-sm text-muted-foreground">Ideal para encargos, trabajos a pedido o productos con tiempos coordinados.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-white p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Truck className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-foreground">Entrega o retiro</p>
                    <p className="mt-1 text-sm text-muted-foreground">Entrega pactada, retiro o coordinación flexible según cada caso.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Qué destaca de este perfil</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-border p-4">
                    <p className="font-medium text-foreground">Catálogo o propuesta propia</p>
                    <p className="mt-1 text-sm text-muted-foreground">Productos o servicios con identidad, especialización y trato directo.</p>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <p className="font-medium text-foreground">Atención personalizada</p>
                    <p className="mt-1 text-sm text-muted-foreground">Conversación directa con quien emprende, sin intermediarios.</p>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <p className="font-medium text-foreground">Modelo flexible</p>
                    <p className="mt-1 text-sm text-muted-foreground">Ideal para pedidos especiales, producción a medida o encargos.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Reseñas</h2>

            <div className="mt-4 space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={`${review.user}-${index}`} className="rounded-2xl border border-border p-4">
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
                <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  Todavía no hay reseñas. Sé la primera persona en dejar una.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">Datos clave</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Zona</p>
                <p className="mt-1 text-muted-foreground">{commerce.location}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Categoría</p>
                <p className="mt-1 text-muted-foreground">{commerce.category}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Atención</p>
                <p className="mt-1 text-muted-foreground">{commerce.hours}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Dirección / modalidad</p>
                <p className="mt-1 text-muted-foreground">{isCommerce ? commerce.address : "Coordinación directa según pedido o entrega."}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">Dejá tu reseña</h2>
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
              placeholder="Contá tu experiencia con este perfil..."
              className="mt-4 min-h-28"
            />
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={handleSubmitReview}>Enviar reseña</Button>
              {reviewSubmitted && <span className="text-sm text-emerald-600">Tu reseña fue enviada.</span>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
