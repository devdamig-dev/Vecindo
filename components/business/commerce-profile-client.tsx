"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
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
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Package,
  Truck,
  Share2,
  Minus,
  Plus,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"
import type { CommerceItem, CommerceReview } from "@/lib/commerces-data"

type Props = {
  commerce: CommerceItem
  activeTab?: "comercios" | "emprendimientos"
}

function formatARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function CommerceProfileClient({ commerce, activeTab }: Props) {
  const { saveItem, isSaved, auth } = useAuth()
  const {
    trackProfileView,
    trackWhatsAppClick,
    trackCallClick,
    trackSave,
  } = useCommerceAnalytics()

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviews, setReviews] = useState<CommerceReview[]>(commerce.reviews ?? [])
  const [cart, setCart] = useState<Record<string, number>>({})
  const [copied, setCopied] = useState(false)

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
    `Hola ${commerce.name}, los contacto desde VEZI.`
  )}`

  const openStatus = useMemo(() => {
    const normalized = commerce.hours.toLowerCase()

    if (normalized.includes("cerrado")) return "Cerrado"
    if (normalized.includes("pedido")) return "Atención por pedidos"
    if (normalized.includes("whatsapp")) return "Atención por WhatsApp"

    return "Abierto hoy"
  }, [commerce.hours])

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0
    const total = reviews.reduce((acc, review) => acc + review.rating, 0)
    return total / reviews.length
  }, [reviews])

  const cartItems = useMemo(() => {
    return (commerce.products ?? [])
      .filter((product) => (cart[product.id] ?? 0) > 0)
      .map((product) => ({
        product,
        quantity: cart[product.id] ?? 0,
        total: product.price * (cart[product.id] ?? 0),
      }))
  }, [cart, commerce.products])

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.total, 0),
    [cartItems]
  )

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  )

  const cartSummary = useMemo(() => {
    return cartItems.map((item) => `• ${item.product.name} x${item.quantity}`).join("\n")
  }, [cartItems])

  const cartWhatsappUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    cartItems.length > 0
      ? `Hola ${commerce.name}, quiero pedir:\n${cartSummary}\n\nTotal estimado: ${formatARS(total)}`
      : `Hola ${commerce.name}, quiero hacer una consulta desde VEZI.`
  )}`

  const trustBullets = useMemo(() => {
    return isCommerce
      ? [
          "Ubicación visible en la zona",
          "Horarios y atención publicados",
          "Perfil comercial con datos claros",
        ]
      : [
          "Atención directa por WhatsApp",
          "Pedidos o encargos coordinados",
          "Entrega o retiro a convenir",
        ]
  }, [isCommerce])

  const addressLabel = isCommerce
    ? commerce.address
    : "Sin local físico · entrega/retiro coordinado"

  const deliveryLabel = isCommerce
    ? "Retiro en local / coordinación"
    : "Entrega o retiro coordinado"

  const adjustCart = (productId: string, delta: number) => {
    setCart((prev) => {
      const nextQty = Math.max((prev[productId] ?? 0) + delta, 0)

      if (nextQty === 0) {
        const { [productId]: _, ...rest } = prev
        return rest
      }

      return {
        ...prev,
        [productId]: nextQty,
      }
    })
  }

  const handleAddToCart = (productId: string) => {
    adjustCart(productId, 1)
  }

  const handleSave = () => {
    trackSave(commerce.id)
    saveItem({
      type: "commerce",
      title: commerce.name,
      subtitle: `${commerce.category} · ${commerce.location}`,
    })
  }

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

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""

    if (!url) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: commerce.name,
          text: "Mirá este catálogo en VEZI",
          url,
        })
        return
      } catch {
        // fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // no-op
    }
  }

  return (
    <div className="flex max-w-6xl flex-col gap-5 md:gap-6">
      <Link
        href={backHref}
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative h-52 overflow-hidden md:h-64">
              <img
                src={commerce.bannerUrl}
                alt={commerce.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>

            <div className="relative px-4 pb-6 pt-0 sm:px-6 md:px-8">
              <div className="-mt-10">
                <Avatar className="h-20 w-20 border-4 border-card shadow-sm md:h-24 md:w-24">
                  <AvatarFallback
                    className={
                      isCommerce
                        ? "bg-sky-100 text-sky-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    <span className="text-2xl font-bold">{commerce.logo}</span>
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-4 flex flex-col gap-5 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge
                      className={
                        isCommerce
                          ? "bg-sky-100 text-sky-700 hover:bg-sky-100"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }
                    >
                      {isCommerce ? (
                        <>
                          <Store className="mr-1 h-3.5 w-3.5" />
                          Comercio
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-1 h-3.5 w-3.5" />
                          Emprendimiento local
                        </>
                      )}
                    </Badge>

                    <Badge variant="secondary">{commerce.category}</Badge>

                    {saved && (
                      <Badge
                        variant="outline"
                        className="gap-1 border-emerald-200 text-emerald-700"
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                        Guardado
                      </Badge>
                    )}
                  </div>

                  <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {commerce.name}
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {commerce.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(averageRating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-foreground">
                        {averageRating > 0 ? averageRating.toFixed(1) : "Nuevo"}
                      </span>
                      <span>({reviews.length} reseñas)</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {commerce.location}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {addressLabel}
                    </Badge>

                    <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {commerce.hours}
                    </Badge>

                    <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                      <Truck className="h-3.5 w-3.5" />
                      {deliveryLabel}
                    </Badge>

                    <Badge
                      className={
                        openStatus === "Cerrado"
                          ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                          : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      }
                    >
                      {openStatus}
                    </Badge>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">{commerce.meta}</p>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end md:pt-2">
                  <Button asChild variant="secondary" className="gap-2">
                    <a href="#catalogo">
                      <Package className="h-4 w-4" />
                      Ver catálogo
                    </a>
                  </Button>

                  <Button
                    asChild
                    className="gap-2 bg-emerald-700 text-white hover:bg-emerald-800"
                  >
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
                    <a
                      href={`tel:${commerce.phone}`}
                      onClick={() => trackCallClick(commerce.id)}
                    >
                      <Phone className="h-4 w-4" />
                      Llamar
                    </a>
                  </Button>

                  <Button variant="outline" className="gap-2" onClick={share}>
                    <Share2 className="h-4 w-4" />
                    {copied ? "Copiado" : "Compartir"}
                  </Button>

                  <Button variant="outline" className="gap-2" onClick={handleSave}>
                    <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                    {saved ? "Guardado" : "Guardar"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="catalogo"
            className="scroll-mt-32 rounded-3xl border border-border bg-card p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Catálogo</h2>
                <p className="text-sm text-muted-foreground">
                  Productos disponibles con pedido directo y coordinación por WhatsApp.
                </p>
              </div>

              <Badge variant="secondary">{commerce.products.length} productos</Badge>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {commerce.products.map((product) => {
                const qty = cart[product.id] ?? 0
                const productWhatsappUrl = `https://wa.me/${commerce.whatsapp.replace(
                  /[^0-9]/g,
                  ""
                )}?text=${encodeURIComponent(
                  `Hola ${commerce.name}, me interesa "${product.name}" (${formatARS(
                    product.price
                  )}) desde VEZI.`
                )}`

                return (
                  <article
                    key={product.id}
                    className="rounded-2xl border border-border bg-background p-4"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-40 w-full rounded-xl object-cover"
                    />

                    <div className="mt-3 flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <span className="text-sm font-semibold text-foreground">
                        {formatARS(product.price)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {product.shortDescription}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          className="px-3 py-2"
                          onClick={() => adjustCart(product.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-8 text-center text-sm">{qty}</span>

                        <button
                          type="button"
                          className="px-3 py-2"
                          onClick={() => adjustCart(product.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <Button size="sm" onClick={() => handleAddToCart(product.id)}>
                        Agregar
                      </Button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Agregar al carrito{qty ? ` (${qty})` : ""}
                      </Button>

                      <Button
                        size="sm"
                        asChild
                        className="gap-1.5 bg-emerald-700 text-white hover:bg-emerald-800"
                      >
                        <a
                          href={productWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick(commerce.id)}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          Pedir por WhatsApp
                        </a>
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 lg:hidden">
            <h2 className="text-base font-semibold text-foreground">Pedido rápido</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {cartCount > 0
                ? `${cartCount} producto(s) agregado(s). Enviá tu pedido directo al comercio.`
                : "Agregá productos del catálogo para armar un pedido rápido."}
            </p>

            {cartItems.length > 0 && (
              <div className="mt-4 space-y-2 rounded-2xl border border-border bg-background p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium">{formatARS(item.total)}</span>
                  </div>
                ))}

                <div className="border-t border-border pt-2 text-sm font-semibold text-foreground">
                  Total estimado: {formatARS(total)}
                </div>
              </div>
            )}

            <Button
              asChild
              className="mt-4 w-full gap-2 bg-emerald-700 text-white hover:bg-emerald-800"
              disabled={cartCount === 0}
            >
              <a
                href={cartWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(commerce.id)}
              >
                <MessageSquare className="h-4 w-4" />
                Enviar pedido por WhatsApp
              </a>
            </Button>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Reseñas</h2>

            <div className="mt-4 space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={`${review.user}-${index}`}
                    className="rounded-2xl border border-border p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{review.initials}</AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">
                              {review.user}
                            </p>
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
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
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

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">Dejá tu reseña</h2>

            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReviewRating(i + 1)}
                  className="rounded-md p-1"
                >
                  <Star
                    className={`h-5 w-5 ${
                      i < reviewRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
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
              {reviewSubmitted && (
                <span className="text-sm text-emerald-600">Tu reseña fue enviada.</span>
              )}
            </div>
          </div>
        </div>

        <aside className="hidden space-y-6 lg:block">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">Pedido rápido</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {cartCount > 0
                ? `${cartCount} producto(s) agregado(s). Enviá tu pedido directo al comercio.`
                : "Agregá productos del catálogo para armar un pedido rápido."}
            </p>

            {cartItems.length > 0 && (
              <div className="mt-4 space-y-2 rounded-2xl border border-border bg-background p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium">{formatARS(item.total)}</span>
                  </div>
                ))}

                <div className="border-t border-border pt-2 text-sm font-semibold text-foreground">
                  Total estimado: {formatARS(total)}
                </div>
              </div>
            )}

            <Button
              asChild
              className="mt-4 w-full gap-2 bg-emerald-700 text-white hover:bg-emerald-800"
              disabled={cartCount === 0}
            >
              <a
                href={cartWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(commerce.id)}
              >
                <MessageSquare className="h-4 w-4" />
                Enviar pedido por WhatsApp
              </a>
            </Button>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">Señales de confianza</h2>

            <div className="mt-4 space-y-3">
              {trustBullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <p className="text-sm text-muted-foreground">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}