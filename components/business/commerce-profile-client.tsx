"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, MessageSquare, Share2 } from "lucide-react"
import type { CommerceItem, CommerceProduct } from "@/lib/commerces-data"

type Props = {
  commerce: CommerceItem
}

function formatARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function CommerceProfileClient({ commerce }: Props) {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [copied, setCopied] = useState(false)

  const adjustCart = (product: CommerceProduct, delta: number) => {
    setCart((prev) => {
      const nextQty = Math.max(0, (prev[product.id] ?? 0) + delta)
      const next = { ...prev, [product.id]: nextQty }
      if (nextQty === 0) delete next[product.id]
      return next
    })
  }

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

                  <Button size="sm" onClick={() => adjustCart(product, 1)}>
                    Agregar
                  </Button>
                </div>
              </div>
            )
          })}
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
              ))}
            </div>

            <div className="flex justify-between mt-4 font-semibold">
              <span>Total</span>
              <span>{formatARS(total)}</span>
            </div>

            <Button className="w-full mt-4" asChild>
              <a href={whatsappUrl ?? "#"} target="_blank">
                <MessageSquare className="h-4 w-4 mr-2" />
                Pedir por WhatsApp
              </a>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}