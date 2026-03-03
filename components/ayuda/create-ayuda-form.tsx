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
  { value: "personal", label: "B\u00fasqueda de personal", icon: Users },
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
    // Demo: add a placeholder image
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    
    // Reset form
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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publicar aviso de ayuda</DialogTitle>
          <DialogDescription>
            {"Compart\u00ed un aviso con tus vecinos de la zona."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">{"Categor\u00eda"} *</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as AyudaCategory)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecciona una categor\u00eda" />
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

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{"T\u00edtulo"} *</Label>
            <Input
              id="title"
              placeholder="Ej: Perro perdido cerca de la plaza"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
            />
            <p className="text-xs text-muted-foreground">{title.length}/80 caracteres</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{"Descripci\u00f3n"} *</Label>
            <Textarea
              id="description"
              placeholder={"Detalla lo m\u00e1s posible: caracter\u00edsticas, ubicaci\u00f3n, horarios, etc."}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">{description.length}/500 caracteres</p>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>{"Im\u00e1genes (opcional)"}</Label>
            <div className="flex flex-wrap gap-2">
              {mockImages.map((img, i) => (
                <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-background"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {mockImages.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddMockImage}
                  className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <ImagePlus className="h-6 w-6" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{"M\u00e1ximo 4 im\u00e1genes"}</p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">{"Ubicaci\u00f3n aproximada (opcional)"}</Label>
            <Input
              id="location"
              placeholder="Ej: Cerca de la plaza central"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp de contacto *</Label>
            <Input
              id="whatsapp"
              placeholder="+54 11 2345-6789"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          {/* Anti-spam note */}
          <div className="flex items-start gap-2 rounded-lg bg-warning/10 px-3 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
            <p className="text-xs text-warning-foreground leading-relaxed">
              {"M\u00e1x. 2 publicaciones por semana. Los avisos expiran a los 7 d\u00edas si no se marcan como resueltos."}
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar aviso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
