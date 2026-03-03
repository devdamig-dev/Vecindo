"use client"

import { useAuth, type BusinessProduct } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Store, Plus, Trash2, ImagePlus, Package } from "lucide-react"
import { useState } from "react"

export function BusinessProfileEditor() {
  const { auth, updateBusinessProfile, addProduct, removeProduct, updateProduct } = useAuth()
  const biz = auth.businessProfile
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<BusinessProduct, "id">>({
    title: "",
    price: "",
    description: "",
    image: "",
  })

  if (!biz) return null

  const handleAddProduct = () => {
    if (newProduct.title && newProduct.price) {
      addProduct(newProduct)
      setNewProduct({ title: "", price: "", description: "", image: "" })
      setShowNewProduct(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Store className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Perfil de Negocio</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Info del negocio */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="biz-name">Nombre del negocio</Label>
            <Input
              id="biz-name"
              value={biz.businessName}
              onChange={(e) => updateBusinessProfile({ businessName: e.target.value })}
              placeholder="Ej: Delicias de Maria"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="biz-whatsapp">WhatsApp del negocio</Label>
            <Input
              id="biz-whatsapp"
              value={biz.whatsapp}
              onChange={(e) => updateBusinessProfile({ whatsapp: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="biz-desc">Descripcion</Label>
          <Textarea
            id="biz-desc"
            value={biz.description}
            onChange={(e) => updateBusinessProfile({ description: e.target.value })}
            rows={3}
            placeholder="Describe tu negocio, que ofreces, horarios..."
          />
        </div>

        {/* Banner */}
        <div className="flex flex-col gap-1.5">
          <Label>Imagen de portada</Label>
          <button
            className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            aria-label="Subir imagen de portada"
          >
            <div className="flex flex-col items-center gap-1">
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">Subir imagen de portada</span>
            </div>
          </button>
        </div>

        <Button className="w-fit">Guardar Perfil de Negocio</Button>

        {/* Productos */}
        <div className="border-t border-border pt-4 mt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Productos</h3>
              <span className="text-xs text-muted-foreground">({biz.products.length})</span>
            </div>
            <Button size="sm" variant="outline" className="gap-1" onClick={() => setShowNewProduct(true)}>
              <Plus className="h-3.5 w-3.5" />
              Agregar
            </Button>
          </div>

          {/* Formulario de nuevo producto */}
          {showNewProduct && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Nuevo Producto</h4>
              <div className="flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>Titulo</Label>
                    <Input
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                      placeholder="Nombre del producto"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Precio</Label>
                    <Input
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Ej: $15.000"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Descripcion</Label>
                  <Textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={2}
                    placeholder="Descripcion breve del producto"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddProduct}>Agregar Producto</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowNewProduct(false)}>Cancelar</Button>
                </div>
              </div>
            </div>
          )}

          {/* Lista de productos */}
          {biz.products.length === 0 && !showNewProduct ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-8 text-center">
              <Package className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No hay productos todavia</p>
              <p className="text-xs text-muted-foreground">Agrega productos para que aparezcan en tu perfil de negocio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {biz.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                      IMG
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{product.title}</p>
                      <p className="text-xs text-primary font-semibold">{product.price}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeProduct(product.id)}
                    aria-label={`Eliminar ${product.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
