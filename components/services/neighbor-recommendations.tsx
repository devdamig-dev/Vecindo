"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { MessageSquare, Phone, Plus, Users, CheckCircle2 } from "lucide-react"

const recommendations = [
  {
    id: "r1",
    name: "Jorge (el de las piletas)",
    category: "Mantenimiento de Piletas",
    whatsapp: "+5491155667788",
    phone: "+5491155667788",
    note: "Lo recomend\u00f3 Ana del barrio Los Robles. Muy buen trabajo limpiando piletas.",
    recommendedBy: "Ana M.",
    recommendedByInitials: "AM",
  },
  {
    id: "r2",
    name: "Susana Tejidos",
    category: "Costurer\u00eda",
    whatsapp: "+5491144556677",
    phone: null,
    note: "Hace arreglos de ropa y tejidos a medida. La recomend\u00f3 Laura de Los Omb\u00faes.",
    recommendedBy: "Laura T.",
    recommendedByInitials: "LT",
  },
  {
    id: "r3",
    name: "Flavio Herrajes",
    category: "Herrer\u00eda",
    whatsapp: "+5491133445566",
    phone: "+5491133445566",
    note: "Trabaja rejas, portones y reparaciones. Recomendado por Diego de Hudson Centro.",
    recommendedBy: "Diego P.",
    recommendedByInitials: "DP",
  },
]

export function NeighborRecommendations() {
  const [showSuggestForm, setShowSuggestForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    whatsapp: "",
    note: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setShowSuggestForm(false)
      setSubmitted(false)
      setFormData({ name: "", category: "", whatsapp: "", note: "" })
    }, 2000)
  }

  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Recomendaciones de vecinos</h2>
            <p className="text-xs text-muted-foreground">Contactos sugeridos por la comunidad</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSuggestForm(true)}
          className="gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sugerir contacto</span>
        </Button>
      </div>

      <div className="divide-y divide-border">
        {recommendations.map((rec) => {
          const waUrl = `https://wa.me/${rec.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${rec.name}, te contacto por recomendaci\u00f3n de VECINDO.`)}`
          return (
            <div key={rec.id} className="flex items-start gap-4 px-5 py-4">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
                  {rec.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground">{rec.name}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{rec.category}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{rec.note}</p>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <Button asChild size="sm" variant="outline" className="h-7 gap-1.5 text-xs border-success/30 text-success hover:bg-success/5 hover:text-success">
                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="h-3 w-3" />
                      WhatsApp
                    </a>
                  </Button>
                  {rec.phone && (
                    <Button asChild size="sm" variant="ghost" className="h-7 gap-1.5 text-xs">
                      <a href={`tel:${rec.phone}`}>
                        <Phone className="h-3 w-3" />
                        Llamar
                      </a>
                    </Button>
                  )}
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    Sugerido por
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="bg-muted text-[8px]">{rec.recommendedByInitials}</AvatarFallback>
                    </Avatar>
                    {rec.recommendedBy}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Suggest Contact Modal */}
      <Dialog open={showSuggestForm} onOpenChange={setShowSuggestForm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Sugerir un contacto</DialogTitle>
            <DialogDescription>
              {"Compart\u00ed un prestador que conozcas con tu comunidad."}
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <p className="font-medium text-foreground">{"¡Gracias por tu sugerencia!"}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {"Lo revisaremos y lo agregaremos pronto."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="rec-name">Nombre del prestador</Label>
                <Input
                  id="rec-name"
                  placeholder='Ej: "Mar\u00eda (la de las tortas)"'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="rec-category">{"Categor\u00eda o servicio"}</Label>
                <Input
                  id="rec-category"
                  placeholder="Ej: Reposter\u00eda, Plomer\u00eda, etc."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="rec-whatsapp">WhatsApp o tel\u00e9fono</Label>
                <Input
                  id="rec-whatsapp"
                  placeholder="+54 11 ..."
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="rec-note">{"¿Por qu\u00e9 lo recomend\u00e1s?"}</Label>
                <Textarea
                  id="rec-note"
                  placeholder="Ej: Me hizo un trabajo excelente con..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button type="button" variant="outline" onClick={() => setShowSuggestForm(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Enviar sugerencia
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
