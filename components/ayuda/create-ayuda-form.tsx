"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import {
  AlertCircle,
  ImagePlus,
  X,
  PawPrint,
  Gift,
  Key,
  Users,
  AlertTriangle,
} from "lucide-react"
import type { AyudaCategory } from "@/app/dashboard/ayuda/page"

const categoryOptions: { value: AyudaCategory; label: string; icon: typeof PawPrint }[] = [
  { value: "mascotas", label: "Mascotas", icon: PawPrint },
  { value: "donaciones", label: "Donaciones / Colectas", icon: Gift },
  { value: "objetos", label: "Objetos perdidos", icon: Key },
  { value: "personal", label: "Búsqueda de personal", icon: Users },
  { value: "urgente", label: "Ayuda urgente", icon: AlertTriangle },
]

interface CreateAyudaFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAyudaForm({ open, onOpenChange }: CreateAyudaFormProps) {
  const { auth } = useAuth()
  const [category, setCategory] = useState<AyudaCategory | "">("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [whatsapp, setWhatsapp] = useState(auth.profile.whatsapp)
  const [mockImages, setMockImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddMockImage = () => {
    const placeholders = [
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop",
    ]
    if (mockImages.length < 4) {
      setMockImages([...mockImages, placeholders[mockImages.length % placeholders.length]])
    }
  }

  const handleRemoveImage = (index: number) => {
    setMockImages(mockImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !title || !description) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)

    setCategory("")
    setTitle("")
    setDescription("")
    setLocation("")
    setMockImages([])
    onOpenChange(false)
  }

  const isValid = category && title.length >= 5 && description.length >= 20

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publicar aviso de ayuda</DialogTitle>
          <DialogDescription>
            Compartí un aviso importante con tus vecinos de la zona.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as AyudaCategory)}>
              <SelectTrigger id="category" className="focus:border-rose-500 focus:ring-2 focus:ring-rose-500">
                <SelectValue placeholder="Seleccioná una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      <opt.icon className="h-4 w-4" />
                      {opt.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Ej: Perro perdido cerca de la plaza"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              className="focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
            />
            <p className="text-xs text-muted-foreground">{title.length}/80 caracteres</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Detallá lo más posible: características, ubicación, horarios, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
              className="focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
            />
            <p className="text-xs text-muted-foreground">{description.length}/500 caracteres</p>
          </div>

          <div className="space-y-2">
            <Label>Imágenes (opcional)</Label>
            <div className="flex flex-wrap gap-2">
              {mockImages.map((img, i) => (
                <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-background"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {mockImages.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddMockImage}
                  className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-rose-200 text-rose-400 transition-colors hover:border-rose-400 hover:text-rose-600"
                >
                  <ImagePlus className="h-6 w-6" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Máximo 4 imágenes</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación aproximada (opcional)</Label>
            <Input
              id="location"
              placeholder="Ej: Cerca de la plaza central"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp de contacto *</Label>
            <Input
              id="whatsapp"
              placeholder="+54 11 2345-6789"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-rose-100 px-3 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
            <p className="text-xs leading-relaxed text-rose-700">
              Máx. 2 publicaciones por semana. Los avisos expiran a los 7 días si no se marcan como resueltos.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-rose-600 text-white hover:bg-rose-700"
            >
              {isSubmitting ? "Publicando..." : "Publicar aviso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}