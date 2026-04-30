"use client"

import { useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, MessageSquare, ShoppingCart, X } from "lucide-react"
import type { CommerceItem, CommerceProduct } from "@/lib/commerces-data"

type Props = {
  commerce: CommerceItem
  product: CommerceProduct | null
  initialQuantity: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (productId: string, quantity: number) => void
  onWhatsAppClick?: () => void
  formatPrice: (value: number) => string
}

export function ProductDetailDrawer({
  commerce,
  product,
  initialQuantity,
  open,
  onOpenChange,
  onConfirm,
  onWhatsAppClick,
  formatPrice,
}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity || 1)

  useEffect(() => {
    if (open) {
      setQuantity(initialQuantity > 0 ? initialQuantity : 1)
    }
  }, [open, initialQuantity])

  if (!product) return null

  const productWhatsappUrl = `https://wa.me/${commerce.whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(
    `Hola ${commerce.name}, me interesa "${product.name}" x${quantity} (${formatPrice(
      product.price * quantity
    )}) desde VEZI.`
  )}`

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh]">
        <div className="flex flex-col overflow-hidden">
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-64 w-full object-cover sm:h-80"
            />
            <DrawerClose
              aria-label="Cerrar"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
            >
              <X className="h-4 w-4" />
            </DrawerClose>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 pt-5 sm:px-6">
            <div className="mx-auto flex max-w-xl flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="secondary" className="mb-2 font-normal">
                    {commerce.name}
                  </Badge>
                  <h2 className="text-xl font-semibold text-foreground">
                    {product.name}
                  </h2>
                </div>
                <span className="shrink-0 text-lg font-semibold text-foreground">
                  {formatPrice(product.price)}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.shortDescription}
              </p>

              <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3">
                <span className="text-sm font-medium text-foreground">Cantidad</span>
                <div className="flex items-center rounded-lg border border-border bg-background">
                  <button
                    type="button"
                    aria-label="Restar"
                    className="px-3 py-2 disabled:opacity-40"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-10 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Sumar"
                    className="px-3 py-2"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
            <div className="mx-auto flex max-w-xl flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className="gap-1.5"
                onClick={() => {
                  onConfirm(product.id, quantity)
                  onOpenChange(false)
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                Agregar al pedido
              </Button>

              <Button
                asChild
                className="flex-1 gap-1.5 bg-emerald-700 text-white hover:bg-emerald-800"
              >
                <a
                  href={productWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onWhatsAppClick}
                >
                  <MessageSquare className="h-4 w-4" />
                  Pedir por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
