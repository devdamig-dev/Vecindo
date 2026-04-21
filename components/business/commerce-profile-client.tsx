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
  ShoppingCart,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"
import type { CommerceItem, CommerceReview } from "@/lib/commerces-data"

type Props = {
  commerce: CommerceItem
  activeTab?: "comercios" | "emprendimientos"
}

type CatalogProduct = {
  id: string
  title: string
  price: string
  description: string
}

const CATALOG_BY_COMMERCE: Record<string, CatalogProduct[]> = {
  "1": [
    { id: "f-ibuprofeno", title: "Ibuprofeno 400mg", price: "$4.200", description: "Caja x20 comprimidos para alivio sintomático." },
    { id: "f-vitamina-c", title: "Vitamina C + Zinc", price: "$6.800", description: "Suplemento diario para reforzar defensas." },
    { id: "f-dermocrema", title: "Crema dermoprotectora", price: "$9.300", description: "Hidratación intensiva para uso diario." },
  ],
  "2": [
    { id: "pc-cafe", title: "Combo café + medialuna", price: "$3.500", description: "Ideal para desayuno o merienda en local." },
    { id: "pc-torta", title: "Porción de torta del día", price: "$4.100", description: "Sabores rotativos según producción diaria." },
    { id: "pc-pack", title: "Pack brunch para 2", price: "$13.800", description: "Incluye cafetería, bakery y opción salada." },
  ],
  "3": [
    { id: "mn-mesa", title: "Mesa comedor nórdica", price: "$389.000", description: "Madera maciza con terminación natural mate." },
    { id: "mn-rack", title: "Rack TV minimalista", price: "$215.000", description: "Con puertas corredizas y módulo de guardado." },
    { id: "mn-sillon", title: "Sillón 2 cuerpos", price: "$492.000", description: "Tapizado premium, fabricación local." },
  ],
  "4": [
    { id: "md-mesa", title: "Mesa ratona artesanal", price: "$148.000", description: "Fabricación a pedido con medidas personalizadas." },
    { id: "md-escritorio", title: "Escritorio compacto", price: "$179.000", description: "Diseño funcional para home office." },
    { id: "md-estanteria", title: "Estantería modular", price: "$126.000", description: "Terminaciones a elección y entrega coordinada." },
  ],
  "5": [
    { id: "lc-set", title: "Set desayuno cerámica", price: "$58.000", description: "Taza + plato + bowl hechos a mano." },
    { id: "lc-jarron", title: "Jarrón decorativo", price: "$34.000", description: "Pieza artesanal esmaltada, edición limitada." },
    { id: "lc-plato", title: "Plato de autor", price: "$19.000", description: "Modelado manual para vajilla de diseño." },
  ],
  "6": [
    { id: "ds-torta", title: "Torta personalizada", price: "$72.000", description: "Diseño por encargo para eventos especiales." },
    { id: "ds-box", title: "Box mini pastelería", price: "$29.500", description: "Selección de mini piezas para compartir." },
    { id: "ds-mesa", title: "Mesa dulce premium", price: "$185.000", description: "Propuesta integral para cumpleaños/eventos." },
  ],
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
  const [cart, setCart] = useState<Record<string, number>>({})

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
  const catalogProducts = CATALOG_BY_COMMERCE[commerce.id] ?? []
  const cartCount = Object.values(cart).reduce((acc, qty) => acc + qty, 0)
  const cartSummary = catalogProducts
    .filter((product) => cart[product.id])
    .map((product) => `• ${product.title} x${cart[product.id]}`)
    .join("\n")
  const cartWhatsappUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hola ${commerce.name}, quiero pedir:\n${cartSummary}\n\nGracias.`
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

  const profileContextItems = isCommerce
    ? [
        { label: "Tipo de negocio", value: "Comercio con atención presencial" },
        { label: "Presencia física", value: "Sí, dirección visible para vecinos" },
        { label: "Modalidad de entrega", value: "Retiro en local y coordinación por WhatsApp" },
        { label: "Canal principal", value: "Atención presencial + contacto directo" },
        { label: "Metadata de confianza", value: commerce.meta },
      ]
    : [
        { label: "Tipo de negocio", value: "Emprendimiento local independiente" },
        { label: "Presencia física", value: "Sin local físico, atención directa" },
        { label: "Modalidad de entrega", value: "Entrega o retiro coordinado según pedido" },
        { label: "Canal principal", value: "Atención por WhatsApp y encargos a medida" },
        { label: "Metadata de confianza", value: commerce.meta },
      ]

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + 1,
    }))
  }

  return (
    <div className="flex max-w-6xl flex-col gap-5 md:gap-6">
      <Link href={backHref} className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="relative h-52 overflow-hidden md:h-64">
          <img src={commerce.bannerUrl} alt={commerce.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        </div>

        <div className="relative px-4 pb-6 pt-0 sm:px-6 md:px-8">
          <div className="-mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
            <div className="min-w-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 shrink-0 border-4 border-card md:h-20 md:w-20">
                  <AvatarFallback className={isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}>
                    <span className="text-xl font-bold">{commerce.logo}</span>
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 pt-4 sm:pt-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className={isCommerce ? "bg-sky-100 text-sky-700 hover:bg-sky-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
                      {isCommerce ? (
                        <><Store className="mr-1 h-3.5 w-3.5" /> Comercio</>
                      ) : (
                        <><Sparkles className="mr-1 h-3.5 w-3.5" /> Emprendimiento local</>
                      )}
                    </Badge>
                    <Badge variant="secondary">{commerce.category}</Badge>
                  </div>

                  <h1 className="max-w-3xl pr-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
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
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span>{commerce.hours}</span>
                    <span>•</span>
                    <span>{isCommerce ? commerce.address : "Sin local físico · entrega/retiro coordinado"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end md:pt-8">
              <Button asChild variant="secondary" className="gap-2">
                <a href="#catalogo">
                  <Package className="h-4 w-4" />
                  Ver catálogo
                </a>
              </Button>

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

          <div className="mt-6 rounded-2xl border border-border bg-background p-4">
            <h2 className="text-base font-semibold text-foreground">Contexto del perfil</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {profileContextItems.map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
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

          <div id="catalogo" className="rounded-3xl border border-border bg-card p-6 scroll-mt-32">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Catálogo</h2>
                <p className="text-sm text-muted-foreground">
                  Productos disponibles con pedido directo y coordinación por WhatsApp.
                </p>
              </div>
              <Badge variant="secondary">{catalogProducts.length} productos</Badge>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {catalogProducts.map((product) => {
                const productWhatsappUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hola ${commerce.name}, me interesa "${product.title}" (${product.price}) desde VEZI.`
                )}`

                return (
                  <article key={product.id} className="rounded-2xl border border-border bg-background p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-foreground">{product.title}</h3>
                      <span className="text-sm font-semibold text-foreground">{product.price}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleAddToCart(product.id)}>
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Agregar al carrito{cart[product.id] ? ` (${cart[product.id]})` : ""}
                      </Button>
                      <Button size="sm" asChild className="gap-1.5 bg-emerald-700 text-white hover:bg-emerald-800">
                        <a href={productWhatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(commerce.id)}>
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
            <h2 className="text-base font-semibold text-foreground">Pedido rápido</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {cartCount > 0
                ? `${cartCount} producto(s) agregado(s). Enviá tu pedido directo al comercio.`
                : "Agregá productos del catálogo para armar un pedido rápido."}
            </p>
            <Button
              asChild
              className="mt-4 w-full gap-2 bg-emerald-700 text-white hover:bg-emerald-800"
              disabled={cartCount === 0}
            >
              <a href={cartWhatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(commerce.id)}>
                <MessageSquare className="h-4 w-4" />
                Enviar pedido por WhatsApp
              </a>
            </Button>
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
