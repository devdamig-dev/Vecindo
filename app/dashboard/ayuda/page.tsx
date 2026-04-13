"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"
import { CreateAyudaForm } from "@/components/ayuda/create-ayuda-form"
import { useAuth } from "@/lib/auth-context"
import {
  Heart,
  MapPin,
  Clock,
  MessageSquare,
  Bookmark,
  Plus,
  PawPrint,
  Gift,
  Key,
  Users,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"

export type AyudaCategory = "mascotas" | "donaciones" | "objetos" | "personal" | "urgente"
export type AyudaStatus = "activo" | "resuelto"

export interface AyudaPost {
  id: string
  title: string
  category: AyudaCategory
  status: AyudaStatus
  description: string
  fullDescription: string
  images: string[]
  authorId: string
  authorName: string
  authorInitials: string
  whatsapp: string
  zone: string
  postedAt: string
}

const categoryConfig: Record<AyudaCategory, { label: string; icon: typeof PawPrint; color: string }> = {
  mascotas: { label: "Mascotas", icon: PawPrint, color: "bg-amber-500/10 text-amber-600" },
  donaciones: { label: "Donaciones", icon: Gift, color: "bg-pink-500/10 text-pink-600" },
  objetos: { label: "Objetos perdidos", icon: Key, color: "bg-blue-500/10 text-blue-600" },
  personal: { label: "Personal", icon: Users, color: "bg-green-500/10 text-green-600" },
  urgente: { label: "Urgente", icon: AlertTriangle, color: "bg-destructive/10 text-destructive" },
}

export const ayudaPosts: AyudaPost[] = [
  {
    id: "1",
    title: "Perro perdido - Golden Retriever",
    category: "mascotas",
    status: "activo",
    description: "Se perdió ayer cerca de la plaza central. Responde al nombre de Max.",
    fullDescription:
      "Se perdió ayer a las 18hs cerca de la plaza central de Hudson. Es un Golden Retriever macho de 4 años, color dorado claro, tiene collar azul con chapita. Responde al nombre de Max. Es muy amigable. Por favor si lo ven avisen, estamos muy preocupados. Hay recompensa.",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=400&fit=crop",
    ],
    authorId: "resident1",
    authorName: "María G.",
    authorInitials: "MG",
    whatsapp: "+5411234567890",
    zone: "Hudson",
    postedAt: "hace 3 horas",
  },
  {
    id: "2",
    title: "Colecta para cirugía veterinaria",
    category: "donaciones",
    status: "activo",
    description: "Necesitamos ayuda para operar a un gatito rescatado de la calle.",
    fullDescription:
      "Rescatamos un gatito de 6 meses que estaba abandonado y tiene una fractura en la patita. El veterinario nos presupuestó $85.000 para la operación. Ya juntamos $40.000 pero necesitamos el resto urgente. Cualquier aporte ayuda. También aceptamos donaciones de comida para gatos o mantas. El gatito está en tránsito en mi casa y se recupera bien del susto.",
    images: [
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&h=400&fit=crop",
    ],
    authorId: "resident2",
    authorName: "Laura P.",
    authorInitials: "LP",
    whatsapp: "+5411345678901",
    zone: "Hudson",
    postedAt: "hace 5 horas",
  },
  {
    id: "3",
    title: "Llaves encontradas en calle 25",
    category: "objetos",
    status: "activo",
    description: "Encontré un llavero con 4 llaves y un control de alarma.",
    fullDescription:
      "Esta mañana encontré un llavero con 4 llaves y un control de alarma de auto marca Fiat. Estaba tirado en la esquina de calle 25 y Av. Hudson, cerca de la panadería. Si son tuyas contactame por WhatsApp y coordinamos para devolvértelas. Necesito que me describas algún detalle del llavero para confirmar que son tuyas.",
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=400&fit=crop",
    ],
    authorId: "resident3",
    authorName: "Carlos R.",
    authorInitials: "CR",
    whatsapp: "+5411456789012",
    zone: "Hudson",
    postedAt: "hace 1 día",
  },
  {
    id: "4",
    title: "Busco niñera para 2 tardes por semana",
    category: "personal",
    status: "activo",
    description: "Necesito alguien de confianza para cuidar a mis hijos martes y jueves.",
    fullDescription:
      "Busco una niñera responsable y cariñosa para cuidar a mis dos hijos (5 y 8 años) los martes y jueves de 14 a 19hs. Las tareas incluyen buscarlos del colegio, darles la merienda, ayudarlos con tareas simples y jugar con ellos. Preferentemente alguien del barrio con referencias. Pago $8.000 por tarde. Empezaría la semana que viene.",
    images: [],
    authorId: "resident4",
    authorName: "Ana M.",
    authorInitials: "AM",
    whatsapp: "+5411567890123",
    zone: "Hudson",
    postedAt: "hace 2 días",
  },
  {
    id: "5",
    title: "URGENTE: Corte de luz en manzana 12",
    category: "urgente",
    status: "resuelto",
    description: "Llevamos 8 horas sin luz, necesitamos difusión para que Edesur responda.",
    fullDescription:
      "Llevamos más de 8 horas sin luz en toda la manzana 12. Ya hicimos el reclamo a Edesur (nro 12345678) pero no dan respuesta. Hay personas mayores que necesitan equipos médicos enchufados. Necesitamos difusión para que nos den prioridad. Si alguien tiene contacto en Edesur o conoce a alguien del municipio que pueda ayudar, por favor escríbanos. ACTUALIZACIÓN: Ya volvió la luz a las 22hs, gracias a todos por la difusión.",
    images: [],
    authorId: "resident5",
    authorName: "Roberto F.",
    authorInitials: "RF",
    whatsapp: "+5411678901234",
    zone: "Hudson",
    postedAt: "hace 3 días",
  },
  {
    id: "6",
    title: "Gata encontrada - Siamesa",
    category: "mascotas",
    status: "resuelto",
    description: "Apareció en mi jardín una gatita siamesa muy mimosa.",
    fullDescription:
      "Hace 2 días apareció en mi jardín una gatita siamesa adulta, muy mimosa y bien cuidada. Claramente tiene dueño porque está acostumbrada a personas. No tiene collar. La tengo en casa temporalmente, le doy de comer y está bien. Si es tuya o conocés al dueño, contactame. ACTUALIZACIÓN: ¡Encontramos a los dueños! Era de una familia de la manzana 8.",
    images: [
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=500&h=400&fit=crop",
    ],
    authorId: "resident6",
    authorName: "Patricia L.",
    authorInitials: "PL",
    whatsapp: "+5411789012345",
    zone: "Hudson",
    postedAt: "hace 5 días",
  },
  {
    id: "7",
    title: "Donación de ropa de bebé",
    category: "donaciones",
    status: "activo",
    description: "Tengo ropa de bebé de 0 a 12 meses en buen estado para donar.",
    fullDescription:
      "Mi bebé ya creció y tengo mucha ropa de 0 a 12 meses en muy buen estado para donar. Hay bodys, enteritos, medias, gorros de invierno, etc. Todo lavado y en buenas condiciones. Prioridad para familias que realmente lo necesiten. Pasar a buscar por mi casa en Hudson, cerca del supermercado Día.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=400&fit=crop",
    ],
    authorId: "resident7",
    authorName: "Lucía S.",
    authorInitials: "LS",
    whatsapp: "+5411890123456",
    zone: "Hudson",
    postedAt: "hace 1 semana",
  },
  {
    id: "8",
    title: "Busco jardinero para mantenimiento mensual",
    category: "personal",
    status: "activo",
    description: "Necesito alguien para cortar el pasto y podar cada 15 días.",
    fullDescription:
      "Busco jardinero responsable para mantenimiento de mi jardín (aprox 200m2). Las tareas serían cortar el pasto, podar arbustos, limpiar hojas y mantener en general cada 15 días. Preferentemente alguien con herramientas propias y experiencia. Pago según presupuesto. Si tenés referencias de trabajos anteriores mejor.",
    images: [],
    authorId: "resident1",
    authorName: "María G.",
    authorInitials: "MG",
    whatsapp: "+5411234567890",
    zone: "Hudson",
    postedAt: "hace 1 semana",
  },
]

const categoryFilters: { key: AyudaCategory | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "mascotas", label: "Mascotas" },
  { key: "donaciones", label: "Donaciones" },
  { key: "objetos", label: "Objetos" },
  { key: "personal", label: "Personal" },
  { key: "urgente", label: "Urgente" },
]

const statusFilters: { key: AyudaStatus | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "activo", label: "Activos" },
  { key: "resuelto", label: "Resueltos" },
]

export default function AyudaPage() {
  const { auth, saveItem, isSaved } = useAuth()
  const isResident = auth.accountType === "resident"
  const [activeCategory, setActiveCategory] = useState<AyudaCategory | "todos">("todos")
  const [activeStatus, setActiveStatus] = useState<AyudaStatus | "todos">("todos")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filtered = ayudaPosts.filter((post) => {
    const matchesCategory = activeCategory === "todos" || post.category === activeCategory
    const matchesStatus = activeStatus === "todos" || post.status === activeStatus
    return matchesCategory && matchesStatus
  })

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
            <Heart className="h-3.5 w-3.5" />
            Ayuda comunitaria
          </div>

          <h1 className="text-2xl font-bold text-foreground">Ayuda comunitaria</h1>
          <p className="text-sm text-muted-foreground">
            Mascotas, objetos perdidos, colectas, búsquedas y avisos importantes de la zona.
          </p>
        </div>

        {isResident && (
          <Button
            size="sm"
            className="gap-1.5 bg-rose-600 text-white hover:bg-rose-700"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-4 w-4" />
            Publicar ayuda
          </Button>
        )}
      </div>

      <SectionIntroBanner
        sectionId="ayuda"
        variant="ayuda"
        title="Ayuda entre vecinos"
        description="Publicá y encontrá avisos importantes: mascotas perdidas, donaciones, objetos extraviados y más."
        howItWorks={{
          title: "¿Cómo funciona Ayuda?",
          steps: [
            "Publicá un aviso con foto, descripción y tu WhatsApp.",
            "Los vecinos lo ven y te contactan directamente.",
            "Cuando se resuelve, marcá el aviso como resuelto.",
            "También podés guardar avisos para seguirlos.",
          ],
        }}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveCategory(opt.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === opt.key
                  ? "bg-rose-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-rose-100 hover:text-rose-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {statusFilters.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveStatus(opt.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeStatus === opt.key
                  ? "bg-rose-100 text-rose-700"
                  : "text-muted-foreground hover:bg-rose-100 hover:text-rose-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-rose-200 py-16 text-center">
          <Heart className="mb-3 h-10 w-10 text-rose-300" />
          <p className="text-sm text-muted-foreground">No hay avisos en esta categoría</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => {
            const cat = categoryConfig[post.category]
            const CatIcon = cat.icon
            const whatsappUrl = `https://wa.me/${post.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${post.authorName}, te escribo por el aviso "${post.title}" en VEZI.`)}`
            const saved = isSaved(post.title)

            return (
              <div
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-rose-300 hover:shadow-sm"
              >
                <Link href={`/dashboard/ayuda/${post.id}`} className="block">
                  {post.images.length > 0 ? (
                    <div className="relative h-40 overflow-hidden bg-muted/50">
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                      {post.status === "resuelto" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                          <Badge className="gap-1 bg-success text-success-foreground">
                            <CheckCircle2 className="h-3 w-3" />
                            Resuelto
                          </Badge>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative flex h-40 items-center justify-center bg-rose-50">
                      <CatIcon className="h-12 w-12 text-rose-200" />
                      {post.status === "resuelto" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                          <Badge className="gap-1 bg-success text-success-foreground">
                            <CheckCircle2 className="h-3 w-3" />
                            Resuelto
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/dashboard/ayuda/${post.id}`} className="block min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold leading-snug text-foreground transition-colors hover:text-rose-700">
                        {post.title}
                      </h3>
                    </Link>
                  </div>

                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className={`px-1.5 py-0 text-[10px] ${cat.color}`}>
                      <CatIcon className="mr-1 h-2.5 w-2.5" />
                      {cat.label}
                    </Badge>
                    <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                      <MapPin className="mr-1 h-2.5 w-2.5" />
                      {post.zone}
                    </Badge>
                  </div>

                  <div className="mt-3 flex gap-2 border-t border-border pt-3">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-700"
                    >
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={saved ? "text-rose-700" : "text-muted-foreground"}
                      onClick={() => {
                        if (!saved) {
                          saveItem({
                            type: "ayuda",
                            title: post.title,
                            subtitle: `${cat.label} · ${post.authorName}`,
                          })
                        }
                      }}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-rose-100 text-[8px] text-rose-700">
                          {post.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{post.authorName}</span>
                    </div>

                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.postedAt}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <CreateAyudaForm open={showCreateForm} onOpenChange={setShowCreateForm} />
    </div>
  )
}