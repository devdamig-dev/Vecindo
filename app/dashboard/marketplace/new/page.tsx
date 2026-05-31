"use client"

import Link from "next/link"
import { FormEvent, useMemo, useState } from "react"
import { ArrowLeft, CheckCircle2, ImagePlus, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { canPublishMarketplaceItem } from "@/lib/commercial"

const categoryOptions = ["Tecnología", "Hogar", "Muebles", "Ropa", "Deportes", "Mascotas", "Otros"] as const
const productStates = ["nuevo", "usado", "reservado"] as const

type ProductState = (typeof productStates)[number]

export default function NewMarketplaceProductPage() {
  const { auth } = useAuth()
  const canPublish = canPublishMarketplaceItem(auth)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState<ProductState | "">("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [contact, setContact] = useState("")
  const [mockImage, setMockImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const missingFields = useMemo(() => {
    const missing: string[] = []
    if (title.trim().length < 4) missing.push("título")
    if (!category) missing.push("categoría")
    if (!condition) missing.push("estado")
    if (!price.trim()) missing.push("precio")
    if (description.trim().length < 12) missing.push("descripción")
    if (!location.trim()) missing.push("ubicación/zona")
    if (!contact.trim()) missing.push("WhatsApp o contacto")
    return missing
  }, [title, category, condition, price, description, location, contact])

  const isValid = missingFields.length === 0

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmitting(false)
    setIsPublished(true)
  }

  const handleMockImage = () => {
    setMockImage("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop")
  }

  if (!canPublish) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
        <Link href="/dashboard/marketplace" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Volver a Mercado
        </Link>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/75 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mercado es para miembros de la comunidad</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Publicar en Mercado requiere una cuenta activa dentro de la red local VEZI.
              </p>
              <Button asChild className="mt-4 rounded-full bg-violet-600 text-white hover:bg-violet-700">
                <Link href="/dashboard/espacio-comercial">Ir a Espacio comercial</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <Link href="/dashboard/marketplace" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver a Mercado
      </Link>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Publicar producto</h1>
        <p className="text-sm text-muted-foreground">Publicá tu producto para vender entre vecinos de tu zona, con contacto directo y sin comisiones.</p>
      </div>

      {isPublished ? (
        <div className="rounded-2xl border border-success/30 bg-success/5 p-4">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
            <div>
              <p className="font-semibold text-foreground">Tu producto fue publicado en Mercado</p>
              <p className="text-sm text-muted-foreground">Podés volver y revisar cómo se vería tu publicación en el listado.</p>
            </div>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="space-y-2"><Label htmlFor="product-title">Título del producto *</Label><Input id="product-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ej: Bicicleta rodado 29 casi nueva" /></div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>Categoría *</Label><Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue placeholder="Seleccioná categoría" /></SelectTrigger><SelectContent>{categoryOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Estado *</Label><Select value={condition} onValueChange={(value) => setCondition(value as ProductState)}><SelectTrigger><SelectValue placeholder="Seleccioná estado" /></SelectTrigger><SelectContent>{productStates.map((item) => <SelectItem key={item} value={item} className="capitalize">{item}</SelectItem>)}</SelectContent></Select></div>
        </div>

        <div className="space-y-2"><Label htmlFor="price">Precio *</Label><Input id="price" type="number" min="0" inputMode="numeric" placeholder="Ej: 85000" value={price} onChange={(event) => setPrice(event.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="description">Descripción *</Label><Textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Contá estado, detalles, medidas y condiciones de entrega." className="min-h-[110px]" /></div>
        <div className="space-y-2"><Label htmlFor="location">Ubicación / zona *</Label><Input id="location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Ej: Caballito norte, cerca del parque" /></div>
        <div className="space-y-2"><Label htmlFor="contact">WhatsApp o contacto *</Label><Input id="contact" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Ej: +54 11 1234-5678" /></div>

        <div className="space-y-2">
          <Label>Imagen (opcional)</Label>
          <div className="flex items-center gap-3"><Button type="button" variant="outline" onClick={handleMockImage} className="gap-2"><ImagePlus className="h-4 w-4" /> Agregar imagen mock</Button>{mockImage ? <span className="text-xs text-muted-foreground">Imagen de ejemplo agregada</span> : null}</div>
          {mockImage ? <img src={mockImage} alt="Vista previa del producto" className="h-32 w-full rounded-lg object-cover sm:h-44" /> : <div className="rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">No agregaste imagen todavía.</div>}
        </div>

        {!isValid ? <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">Completá estos campos: {missingFields.join(", ")}.</div> : null}

        <Button type="submit" disabled={!isValid || isSubmitting} className="w-full bg-foreground text-background hover:bg-foreground/90 sm:w-auto">{isSubmitting ? "Publicando..." : "Publicar producto"}</Button>
      </form>
    </div>
  )
}
