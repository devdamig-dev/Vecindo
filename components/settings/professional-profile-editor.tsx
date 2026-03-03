"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ImagePlus, X } from "lucide-react"
import { useState } from "react"

const categories = [
  "Electricidad", "Plomeria", "Pintura", "Jardineria", "Limpieza",
  "Clases", "Cerrajeria", "Albañileria", "Veterinaria", "Otro",
]

export function ProfessionalProfileEditor() {
  const { auth, updateProfessionalProfile } = useAuth()
  const pro = auth.professionalProfile
  const [newSubcat, setNewSubcat] = useState("")

  if (!pro) return null

  const addSubcategory = () => {
    if (newSubcat.trim() && !pro.subcategories.includes(newSubcat.trim())) {
      updateProfessionalProfile({ subcategories: [...pro.subcategories, newSubcat.trim()] })
      setNewSubcat("")
    }
  }

  const removeSubcategory = (sub: string) => {
    updateProfessionalProfile({ subcategories: pro.subcategories.filter((s) => s !== sub) })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Perfil Profesional</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Categoria */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pro-category">Categoria principal</Label>
          <select
            id="pro-category"
            value={pro.category}
            onChange={(e) => updateProfessionalProfile({ category: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Seleccionar categoria...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Subcategorias */}
        <div className="flex flex-col gap-1.5">
          <Label>Subcategorias / Especialidades</Label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {pro.subcategories.map((sub) => (
              <Badge key={sub} variant="secondary" className="gap-1 pr-1">
                {sub}
                <button
                  onClick={() => removeSubcategory(sub)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted"
                  aria-label={`Quitar ${sub}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Agregar especialidad..."
              value={newSubcat}
              onChange={(e) => setNewSubcat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubcategory())}
            />
            <Button variant="outline" size="sm" onClick={addSubcategory}>Agregar</Button>
          </div>
        </div>

        {/* Descripcion */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pro-desc">Descripcion del servicio</Label>
          <Textarea
            id="pro-desc"
            value={pro.description}
            onChange={(e) => updateProfessionalProfile({ description: e.target.value })}
            rows={4}
            placeholder="Describe tu experiencia, especialidades y lo que te diferencia..."
          />
        </div>

        {/* Matricula */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pro-matricula">Matricula / Credencial (opcional)</Label>
            <Input
              id="pro-matricula"
              value={pro.matricula}
              onChange={(e) => updateProfessionalProfile({ matricula: e.target.value })}
              placeholder="Ej: MAT-2847"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pro-area">Area de servicio</Label>
            <Input
              id="pro-area"
              value={pro.serviceArea}
              onChange={(e) => updateProfessionalProfile({ serviceArea: e.target.value })}
              placeholder="Ej: Hudson, Quilmes"
            />
          </div>
        </div>

        {/* Galeria */}
        <div className="flex flex-col gap-1.5">
          <Label>Galeria de trabajos</Label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: pro.galleryCount }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs"
              >
                {"Foto " + (i + 1)}
              </div>
            ))}
            <button
              onClick={() => updateProfessionalProfile({ galleryCount: pro.galleryCount + 1 })}
              className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              aria-label="Agregar foto"
            >
              <ImagePlus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Button className="w-fit">Guardar Perfil Profesional</Button>
      </div>
    </div>
  )
}
