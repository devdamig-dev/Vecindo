"use client"

import { useMemo, useState } from "react"
import { Minus, Plus, ShoppingCart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CommerceProduct } from "@/lib/commerces-data"

type Props = {
  products: CommerceProduct[]
  whatsapp: string
  commerceName: string
  isEntrepreneur?: boolean
  publicMode?: boolean
}

export default function CatalogWhatsAppOrder({
  products,
  whatsapp,
  commerceName,
  isEntrepreneur = false,
  publicMode = false,
}: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [buyerName, setBuyerName] = useState("")
  const [deliveryMode, setDeliveryMode] = useState("")

  const selectedProducts = useMemo(
    () => products.filter((product) => (quantities[product.id] ?? 0) > 0),
    [products, quantities],
  )

  const totalItems = selectedProducts.reduce((acc, product) => acc + (quantities[product.id] ?? 0), 0)

  const setQuantity = (productId: string, nextValue: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(0, nextValue) }))
  }

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Hola, quiero pedir a ${commerceName}:`,
      "",
      ...selectedProducts.map((product) => `• ${quantities[product.id]} x ${product.title} (${product.price})`),
      "",
      `Nombre: ${buyerName || ""}`,
      `Forma de entrega: ${deliveryMode || "retiro/envío"}`,
    ]

    return encodeURIComponent(lines.join("\n"))
  }, [buyerName, commerceName, deliveryMode, quantities, selectedProducts])

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`

  return (
    <section className={`rounded-3xl border p-6 ${publicMode ? "border-primary/20 bg-card" : isEntrepreneur ? "border-amber-200 bg-amber-50/60" : "border-emerald-200 bg-emerald-50/50"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <ShoppingCart className="h-3.5 w-3.5" />
            Pedido por WhatsApp
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">Catálogo simple para pedir sin fricción</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Sumá productos, definí cantidades y enviá el pedido por WhatsApp sin checkout complejo ni pagos dentro de la app.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm">
          <p className="text-muted-foreground">Productos seleccionados</p>
          <p className="text-xl font-semibold text-foreground">{totalItems}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const quantity = quantities[product.id] ?? 0
            return (
              <article key={product.id} className="rounded-2xl border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{product.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">{product.price}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-full border border-border bg-card">
                    <button className="px-3 py-2 text-muted-foreground hover:text-foreground" onClick={() => setQuantity(product.id, quantity - 1)} aria-label="Restar cantidad">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-foreground">{quantity}</span>
                    <button className="px-3 py-2 text-muted-foreground hover:text-foreground" onClick={() => setQuantity(product.id, quantity + 1)} aria-label="Sumar cantidad">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button variant={quantity > 0 ? "default" : "outline"} size="sm" onClick={() => setQuantity(product.id, quantity + 1)}>
                    {quantity > 0 ? "Sumar" : "Agregar"}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="rounded-2xl border border-border bg-background p-4">
          <h3 className="text-base font-semibold text-foreground">Resumen del pedido</h3>
          <p className="mt-1 text-sm text-muted-foreground">Armá un mensaje claro y enviá el pedido directo al comercio.</p>

          <div className="mt-4 space-y-3">
            {selectedProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                Todavía no sumaste productos. Elegí uno o varios para preparar el pedido.
              </div>
            ) : (
              <div className="space-y-2 rounded-2xl border border-border p-3">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-foreground">{quantities[product.id]} x {product.title}</span>
                    <span className="text-muted-foreground">{product.price}</span>
                  </div>
                ))}
              </div>
            )}

            <Input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Nombre" />
            <Input value={deliveryMode} onChange={(e) => setDeliveryMode(e.target.value)} placeholder={isEntrepreneur ? "Forma de entrega: retiro / coordinación" : "Forma de entrega: retiro / envío"} />

            <Button asChild className="w-full gap-2" disabled={selectedProducts.length === 0}>
              <a href={selectedProducts.length === 0 ? undefined : whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-4 w-4" />
                Pedir por WhatsApp
              </a>
            </Button>
          </div>
        </aside>
      </div>
    </section>
  )
}
