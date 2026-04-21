"use client"

import { useMemo, useState } from "react"
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

  const cartItems = useMemo(() => {
    return commerce.products
      .filter((p) => cart[p.id] > 0)
      .map((p) => ({
        product: p,
        quantity: cart[p.id],
        total: p.price * cart[p.id],
      }))
  }, [cart, commerce.products])

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.total, 0),
    [cartItems]
  )

  const whatsappUrl = useMemo(() => {
    if (cartItems.length === 0) return null

    const lines = cartItems
      .map((item) => `- ${item.quantity}x ${item.product.name} (${formatARS(item.total)})`)
      .join("\n")

    const text = `Hola ${commerce.name}, quiero hacer este pedido:\n\n${lines}\n\nTotal estimado: ${formatARS(
      total
    )}`

    return `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      text
    )}`
  }, [cartItems, total, commerce])

  const share = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: commerce.name,
          text: "Mirá este catálogo en VEZI",
          url,
        })
        return
      } catch {}
    }

    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
      ]
    : [
        { label: "Tipo de negocio", value: "Emprendimiento local independiente" },
        { label: "Presencia física", value: "Sin local físico, atención directa" },
        { label: "Modalidad de entrega", value: "Entrega o retiro coordinado según pedido" },
        { label: "Canal principal", value: "Atención por WhatsApp y encargos a medida" },
      ]

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + 1,
    }))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* COLUMNA PRINCIPAL */}
      <div className="space-y-6">
        {/* BLOQUE DESTACADO */}
        <div className="rounded-2xl border p-4 bg-amber-50 border-amber-200">
          <p className="font-semibold">Este perfil tiene catálogo activo</p>
          <p className="text-sm text-muted-foreground mt-1">
            Podés explorar productos y enviar el pedido por WhatsApp en segundos.
          </p>

          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline">
              Ver catálogo
            </Button>

            <Button size="sm" onClick={share}>
              <Share2 className="h-4 w-4 mr-1" />
              {copied ? "Copiado" : "Compartir"}
            </Button>
          </div>
        </div>

        {/* CATÁLOGO */}
        <div className="grid gap-4 sm:grid-cols-2">
          {commerce.products.map((product) => {
            const qty = cart[product.id] ?? 0

            return (
              <div key={product.id} className="border rounded-xl p-4">
                <img
                  src={product.imageUrl}
                  className="h-32 w-full object-cover rounded-md"
                />

                <div className="mt-3 flex justify-between">
                  <p className="font-medium">{product.name}</p>
                  <p className="font-semibold">{formatARS(product.price)}</p>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {product.shortDescription}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border rounded-md">
                    <button onClick={() => adjustCart(product, -1)}>
                      <Minus className="h-4 w-4 px-2" />
                    </button>

                    <span className="px-2">{qty}</span>

                    <button onClick={() => adjustCart(product, 1)}>
                      <Plus className="h-4 w-4 px-2" />
                    </button>
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

                  <Button size="sm" onClick={() => adjustCart(product, 1)}>
                    Agregar
                  </Button>
                </div>
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

      {/* CARRITO */}
      <div className="border rounded-xl p-4 h-fit sticky top-20">
        <h3 className="font-semibold mb-3">Tu carrito</h3>

        {cartItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Agregá productos para armar tu pedido.
          </p>
        ) : (
          <>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.product.id} className="text-sm">
                  {item.quantity}x {item.product.name}
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

            <div className="flex justify-between mt-4 font-semibold">
              <span>Total</span>
              <span>{formatARS(total)}</span>
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