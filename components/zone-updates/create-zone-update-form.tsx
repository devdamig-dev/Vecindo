"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, AlertCircle } from "lucide-react"

interface CreateZoneUpdateFormProps {
  open: boolean
  onClose: () => void
}

export function CreateZoneUpdateForm({ open, onClose }: CreateZoneUpdateFormProps) {
  const [type, setType] = useState<string>("")
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [ctaTarget, setCtaTarget] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [fileName, setFileName] = useState("")

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Mock submit: in a real app this would POST to the API
    onClose()
    setType("")
    setTitle("")
    setCaption("")
    setCtaTarget("")
    setWhatsapp("")
    setFileName("")
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-md max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publicar Novedad</DialogTitle>
          <DialogDescription>
            Comparte una promo, turno disponible o novedad con tu zona.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Type */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="update-type">Tipo de publicacion</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="update-type">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service">Servicio</SelectItem>
                <SelectItem value="business">Emprendimiento</SelectItem>
                <SelectItem value="marketplace">Mercado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="update-title">Titulo</Label>
            <Input
              id="update-title"
              placeholder='Ej: "Promo", "Turnos hoy", "Novedad"'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={30}
            />
            <p className="text-xs text-muted-foreground">{title.length}/30 caracteres</p>
          </div>

          {/* Caption */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="update-caption">Descripcion</Label>
            <Textarea
              id="update-caption"
              placeholder="Cuenta de que se trata tu publicacion..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">{caption.length}/200 caracteres</p>
          </div>

          {/* Image upload */}
          <div className="flex flex-col gap-2">
            <Label>Imagen</Label>
            <label
              htmlFor="update-image"
              className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-center transition-colors hover:border-primary/40 hover:bg-muted/50"
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {fileName || "Arrastra o selecciona una imagen"}
              </span>
              <span className="text-xs text-muted-foreground">JPG, PNG hasta 5MB</span>
              <input
                id="update-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* CTA Target */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="update-cta">Destino del boton</Label>
            <Select value={ctaTarget} onValueChange={setCtaTarget}>
              <SelectTrigger id="update-cta">
                <SelectValue placeholder="A donde lleva el boton?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profile">Mi perfil profesional</SelectItem>
                <SelectItem value="listing">Mi publicacion en el mercado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="update-whatsapp">
              Link de WhatsApp <span className="text-muted-foreground font-normal">(opcional)</span>
            </Label>
            <Input
              id="update-whatsapp"
              placeholder="https://wa.me/549..."
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          {/* Limit warning */}
          <div className="flex items-start gap-2 rounded-lg bg-warning/10 px-3 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
            <p className="text-xs text-warning-foreground leading-relaxed">
              {"M\u00e1x. 3 publicaciones por semana. Las novedades expiran a las 24 horas."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!type || !title || !caption}
            >
              Publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
