"use client"

import Link from "next/link"
import { FormEvent, ReactNode, useState } from "react"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormData = {
  title: string
  category: string
  description: string
  experience: string
  zone: string
  modality: string
  availability: string
  contact: string
  price: string
}

const initialFormData: FormData = {
  title: "",
  category: "",
  description: "",
  experience: "",
  zone: "",
  modality: "",
  availability: "",
  contact: "",
  price: "",
}

export default function NewServicePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {}

    if (formData.title.trim().length < 4) nextErrors.title = "Ingresá un título más descriptivo (mínimo 4 caracteres)."
    if (!formData.category.trim()) nextErrors.category = "Seleccioná o escribí una categoría."
    if (formData.description.trim().length < 20) nextErrors.description = "Contá un poco más sobre tu servicio (mínimo 20 caracteres)."
    if (formData.experience.trim().length < 10) nextErrors.experience = "Sumá una breve presentación o experiencia (mínimo 10 caracteres)."
    if (!formData.zone.trim()) nextErrors.zone = "Indicá la zona donde atendés."
    if (!formData.modality.trim()) nextErrors.modality = "Elegí una modalidad de atención."
    if (!formData.availability.trim()) nextErrors.availability = "Completá tu disponibilidad horaria."
    if (!formData.contact.trim()) nextErrors.contact = "Agregá un contacto para que te escriban."

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage("")
      return
    }

    setSuccessMessage("Tu servicio fue publicado en VEZI. Cuando conectemos el backend, quedará guardado en tu perfil.")
    setFormData(initialFormData)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-2">
        <Link href="/dashboard/services" className="inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-800">
          <ArrowLeft className="h-4 w-4" /> Volver a Servicios
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Publicar mi servicio</h1>
        <p className="text-[15px] text-muted-foreground">
          Compartí lo que sabés hacer y empezá a recibir consultas de vecinos de tu zona.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-5"
      >
        <Field label="Título del servicio" htmlFor="service-title" error={errors.title}>
          <Input
            id="service-title"
            value={formData.title}
            onChange={(event) => handleChange("title", event.target.value)}
            placeholder="Ej: Clases de apoyo de matemática"
            className="text-[15px]"
          />
        </Field>

        <Field label="Categoría" htmlFor="service-category" error={errors.category}>
          <Input
            id="service-category"
            value={formData.category}
            onChange={(event) => handleChange("category", event.target.value)}
            placeholder="Ej: Educación, Hogar, Estética, Mascotas"
            className="text-[15px]"
          />
        </Field>

        <Field label="Descripción" htmlFor="service-description" error={errors.description}>
          <Textarea
            id="service-description"
            value={formData.description}
            onChange={(event) => handleChange("description", event.target.value)}
            placeholder="Contá qué ofrecés y cómo trabajás para ayudar a los vecinos."
            className="min-h-[110px] text-[15px]"
          />
        </Field>

        <Field label="Experiencia o breve presentación" htmlFor="service-experience" error={errors.experience}>
          <Textarea
            id="service-experience"
            value={formData.experience}
            onChange={(event) => handleChange("experience", event.target.value)}
            placeholder="Ej: Hace 3 años doy clases particulares en la zona."
            className="min-h-[90px] text-[15px]"
          />
        </Field>

        <Field label="Zona donde atendés" htmlFor="service-zone" error={errors.zone}>
          <Input
            id="service-zone"
            value={formData.zone}
            onChange={(event) => handleChange("zone", event.target.value)}
            placeholder="Ej: Hudson, Plátanos, Berazategui centro"
            className="text-[15px]"
          />
        </Field>

        <Field label="Modalidad" htmlFor="service-modality" error={errors.modality}>
          <select
            id="service-modality"
            value={formData.modality}
            onChange={(event) => handleChange("modality", event.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[15px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Seleccionar modalidad</option>
            <option value="A domicilio">A domicilio</option>
            <option value="En domicilio propio">En domicilio propio</option>
            <option value="Online">Online</option>
            <option value="A coordinar">A coordinar</option>
          </select>
        </Field>

        <Field label="Disponibilidad horaria" htmlFor="service-availability" error={errors.availability}>
          <Input
            id="service-availability"
            value={formData.availability}
            onChange={(event) => handleChange("availability", event.target.value)}
            placeholder="Ej: Lunes a viernes de 9 a 18 hs"
            className="text-[15px]"
          />
        </Field>

        <Field label="WhatsApp o contacto" htmlFor="service-contact" error={errors.contact}>
          <Input
            id="service-contact"
            value={formData.contact}
            onChange={(event) => handleChange("contact", event.target.value)}
            placeholder="Ej: +54 9 11 1234 5678"
            className="text-[15px]"
          />
        </Field>

        <Field label="Precio orientativo (opcional)" htmlFor="service-price" error={errors.price}>
          <Input
            id="service-price"
            value={formData.price}
            onChange={(event) => handleChange("price", event.target.value)}
            placeholder="Ej: Desde $15.000 por visita"
            className="text-[15px]"
          />
        </Field>

        <Button type="submit" className="w-full bg-sky-600 text-white hover:bg-sky-700 sm:w-auto">
          Publicar servicio
        </Button>

        {successMessage && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{successMessage}</p>
        )}
      </form>
    </div>
  )
}

type FieldProps = {
  children: ReactNode
  error?: string
  htmlFor: string
  label: string
}

function Field({ children, error, htmlFor, label }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-[13px] font-medium">
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
