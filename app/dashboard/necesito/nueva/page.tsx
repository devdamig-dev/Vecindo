"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const categories = ["Hogar", "Educación", "Tecnología", "Cuidado", "Diseño", "Gastronomía", "Otro"]

export default function NuevaNecesidadPage() {
  const router = useRouter()
  const [text, setText] = useState("")
  const [category, setCategory] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) return <section className="rounded-[2rem] bg-emerald-600 p-7 text-center text-white shadow-xl"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700"><Check /></div><h1 className="mt-4 text-2xl font-bold">Simulación completada</h1><p className="mx-auto mt-2 max-w-md text-sm text-emerald-50">La experiencia de publicación funciona en esta demo, pero la necesidad todavía no se guarda ni se envía a personas o negocios hasta conectar la persistencia real.</p><Button onClick={() => router.push("/dashboard/necesito")} className="mt-6 bg-white text-emerald-800 hover:bg-emerald-50">Volver a necesidades</Button></section>

  return <form onSubmit={submit} className="space-y-6">
    <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Volver</button>
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white"><Sparkles className="absolute right-5 top-5 h-12 w-12 text-white/20" /><p className="text-xs font-bold uppercase tracking-wider text-amber-100">Publicar una intención</p><h1 className="mt-2 text-3xl font-bold">¿Qué necesitás?</h1><p className="mt-2 text-sm text-white/85">Empezá con una frase. Solo te pedimos lo necesario para encontrar quién pueda ayudarte.</p></section>
    <div className="space-y-2"><Label htmlFor="need" className="text-base">Contalo con tus palabras</Label><Textarea id="need" required minLength={10} value={text} onChange={e => setText(e.target.value)} className="min-h-28 rounded-2xl text-base" placeholder="Ej: Necesito una profesora particular de matemática para secundaria" /><p className="text-xs text-muted-foreground">Mínimo 10 caracteres · {text.length}/280</p></div>
    <fieldset><legend className="mb-2 text-sm font-semibold">Categoría sugerida</legend><div className="flex flex-wrap gap-2">{categories.map(item => <button type="button" key={item} onClick={() => setCategory(item)} className={`rounded-full px-3 py-2 text-xs font-semibold ${category === item ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-900 hover:bg-amber-100"}`}>{item}</button>)}</div></fieldset>
    <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="location">Ubicación</Label><div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="location" required defaultValue="Hudson, Berazategui" className="pl-9" /></div></div><div className="space-y-2"><Label htmlFor="urgency">¿Para cuándo?</Label><select id="urgency" className="h-10 w-full rounded-md border bg-background px-3 text-sm"><option>Esta semana</option><option>Lo antes posible</option><option>Sin apuro</option></select></div></div>
    <details className="rounded-2xl border bg-card p-4"><summary className="cursor-pointer text-sm font-semibold">Agregar detalles opcionales</summary><div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="details">Descripción</Label><Textarea id="details" placeholder="Horarios, contexto o preferencias" /></div><div className="space-y-2"><Label htmlFor="budget">Presupuesto estimado</Label><Input id="budget" placeholder="Ej: $20.000–$40.000" /></div></div></details>
    <Button disabled={text.trim().length < 10} className="min-h-12 w-full bg-orange-600 text-base font-bold text-white hover:bg-orange-700">Publicar y conectar <ArrowRight className="ml-2 h-4 w-4" /></Button>
  </form>
}
