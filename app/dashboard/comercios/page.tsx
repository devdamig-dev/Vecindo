"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MapPin, Star, Phone, MessageSquare, Store, ArrowRight, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useCommerceAnalytics } from "@/hooks/use-commerce-analytics"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"

const categories = ["Todos", "Gastronomía", "Almacén", "Salud", "Belleza", "Construcción", "Automotriz"]

export const commerces = [
  {
    id: "1",
    name: "Almacén Don Carlos",
    category: "Almacén",
    logo: "DC",
    rating: 4.8,
    reviewCount: 42,
    description:
      "Almacén de barrio con productos frescos, fiambrería artesanal y reparto a domicilio.",
    longDescription:
      "Almacén de barrio con más de 20 años en la zona. Ofrecemos productos frescos del día, fiambrería artesanal importada, panadería propia, verdulería orgánica y servicio de reparto a domicilio dentro de Hudson.",
    whatsapp: "+5411234567890",
    phone: "+5411234567890",
    address: "Av. Hudson 1234, Berazategui",
    hours: "Lunes a Sábado 8:00 - 20:00 | Domingos 9:00 - 13:00",
    bannerUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=300&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop", caption: "Verduras frescas" },
      { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop", caption: "Panadería artesanal" },
      { url: "https://images.unsplash.com/photo-1556908224-c8c5f9f2dc5b?w=300&h=200&fit=crop", caption: "Fiambrería" },
      { url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&h=200&fit=crop", caption: "Lácteos" },
    ],
    reviews: [
      { user: "María G.", initials: "MG", rating: 5, text: "Excelente atención y productos siempre frescos.", date: "hace 3 días" },
      { user: "Carlos R.", initials: "CR", rating: 5, text: "Los mejores fiambres de la zona.", date: "hace 1 semana" },
      { user: "Laura T.", initials: "LT", rating: 4, text: "Buenos precios y reparto rápido.", date: "hace 2 semanas" },
    ],
    subscribed: true,
  },
  {
    id: "2",
    name: "Parrilla El Recién Llegado",
    category: "Gastronomía",
    logo: "PR",
    rating: 4.9,
    reviewCount: 67,
    description:
      "Parrilla con cortes premium, empanadas caseras y catering para eventos.",
    longDescription:
      "Restaurante de parrilla con cortes premium, empanadas caseras y servicio de catering para eventos. Ideal para reuniones familiares, cumpleaños y reservas de grupos.",
    whatsapp: "+5411345678901",
    phone: "+5411345678901",
    address: "Ruta 2 km 38.5, Hudson",
    hours: "Todos los días 12:00 - 23:30",
    bannerUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=300&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop", caption: "Cortes premium" },
      { url: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop", caption: "Empanadas caseras" },
      { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300&h=200&fit=crop", caption: "Ambiente familiar" },
    ],
    reviews: [
      { user: "Sofía L.", initials: "SL", rating: 5, text: "La mejor parrilla de la zona.", date: "hace 2 días" },
      { user: "Pablo N.", initials: "PN", rating: 5, text: "Muy buena atención y porciones abundantes.", date: "hace 5 días" },
    ],
    subscribed: true,
  },
  {
    id: "3",
    name: "Veterinaria Hudson",
    category: "Salud",
    logo: "VH",
    rating: 4.7,
    reviewCount: 31,
    description:
      "Atención veterinaria integral, guardia 24hs, peluquería canina y pet shop.",
    longDescription:
      "Centro veterinario con atención clínica, vacunación, cirugía, guardia 24hs, peluquería canina y pet shop. Especialistas en perros y gatos.",
    whatsapp: "+5411456789012",
    phone: "+5411456789012",
    address: "Calle 43 Nº 567, Hudson",
    hours: "Lunes a Domingo 24 hs",
    bannerUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&h=300&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop", caption: "Consultorio" },
      { url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=300&h=200&fit=crop", caption: "Pet shop" },
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop", caption: "Peluquería canina" },
    ],
    reviews: [
      { user: "Lucía F.", initials: "LF", rating: 5, text: "Atendieron a mi perro rapidísimo.", date: "hace 4 días" },
      { user: "Martín Q.", initials: "MQ", rating: 4, text: "Muy buena guardia y atención.", date: "hace 10 días" },
    ],
    subscribed: true,
  },
  {
    id: "4",
    name: "Estudio Belleza Natural",
    category: "Belleza",
    logo: "BN",
    rating: 4.6,
    reviewCount: 28,
    description:
      "Peluquería, manicura, tratamientos faciales y corporales con productos orgánicos.",
    longDescription:
      "Centro de estética con servicios de peluquería, manicura, tratamientos faciales y corporales. Trabajamos con productos orgánicos y atención personalizada.",
    whatsapp: "+5411567890123",
    phone: "+5411567890123",
    address: "Av. Mitre 890, Berazategui",
    hours: "Martes a Sábado 9:00 - 19:00",
    bannerUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=300&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop", caption: "Peluquería" },
      { url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=300&h=200&fit=crop", caption: "Manicura" },
      { url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=200&fit=crop", caption: "Tratamientos" },
    ],
    reviews: [
      { user: "Valeria C.", initials: "VC", rating: 5, text: "Excelente atención y resultados.", date: "hace 1 semana" },
    ],
    subscribed: true,
  },
  {
    id: "5",
    name: "Corralón El Ladrillo",
    category: "Construcción",
    logo: "CL",
    rating: 4.5,
    reviewCount: 19,
    description:
      "Materiales de construcción, herramientas, sanitarios y asesoramiento técnico.",
    longDescription:
      "Corralón con materiales de construcción, sanitarios, pinturas, herramientas y asesoramiento técnico para obras chicas y grandes.",
    whatsapp: "+5411678901234",
    phone: "+5411678901234",
    address: "Ruta 36 km 24, Hudson",
    hours: "Lunes a Sábado 7:30 - 18:30",
    bannerUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=300&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=300&h=200&fit=crop", caption: "Materiales" },
      { url: "https://images.unsplash.com/photo-1581092160607-ee22731b2a3f?w=300&h=200&fit=crop", caption: "Herramientas" },
    ],
    reviews: [
      { user: "Gustavo P.", initials: "GP", rating: 4, text: "Buen surtido y buenos precios.", date: "hace 8 días" },
    ],
    subscribed: true,
  },
  {
    id: "6",
    name: "Mecánica Integral Auto Sur",
    category: "Automotriz",
    logo: "AS",
    rating: 4.4,
    reviewCount: 23,
    description:
      "Service multimarca, tren delantero, electricidad automotriz y grúa 24hs.",
    longDescription:
      "Taller mecánico integral multimarca. Service, tren delantero, electricidad automotriz, scanner y grúa 24hs para emergencias.",
    whatsapp: "+5411789012345",
    phone: "+5411789012345",
    address: "Calle 14 Nº 321, Hudson",
    hours: "Lunes a Viernes 8:00 - 18:00",
    bannerUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=300&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop", caption: "Taller" },
      { url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=300&h=200&fit=crop", caption: "Diagnóstico" },
    ],
    reviews: [
      { user: "Diego M.", initials: "DM", rating: 4, text: "Buen service y atención rápida.", date: "hace 6 días" },
    ],
    subscribed: true,
  },
]

export default function ComerciosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")
  const { auth } = useAuth()
  const { trackSearchImpression, trackWhatsAppClick, trackCallClick } = useCommerceAnalytics()
  const isResident = auth.accountType === "resident"
  const trackedImpressions = useRef(new Set<string>())

  const filtered = commerces.filter((c) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      c.name.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.address.toLowerCase().includes(term)

    const matchesCat = activeCategory === "Todos" || c.category === activeCategory
    return matchesSearch && matchesCat
  })

  useEffect(() => {
    filtered.forEach((c) => {
      const key = `${searchTerm}-${activeCategory}-${c.id}`
      if (!trackedImpressions.current.has(key)) {
        trackSearchImpression(c.id)
        trackedImpressions.current.add(key)
      }
    })
  }, [filtered, searchTerm, activeCategory, trackSearchImpression])

  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Comercios</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Guía de Comercios de la Zona</p>
        </div>

        {auth.hasCommerceProfile && (
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link href="/dashboard/comercios/panel">
              <BarChart3 className="h-4 w-4" />
              Panel de mi comercio
            </Link>
          </Button>
        )}
      </div>

      <SectionIntroBanner
        sectionId="comercios"
        title="Guía de comercios de la zona"
        description="Encontrá negocios locales verificados cerca tuyo."
        howItWorks={{
          title: "¿Cómo funciona Comercios?",
          steps: [
            "Explorá el mapa o buscá por categoría.",
            "Mirá las reseñas de otros vecinos.",
            "Contactá por WhatsApp o llamada directa.",
            "Dejá tu reseña después de tu experiencia.",
          ],
        }}
      />

      {isResident && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Store className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                ¿Tenés un comercio en la zona?
              </p>
              <p className="text-xs text-muted-foreground">
                Sumalo a la guía por $9.999/mes y aparecé en el mapa
              </p>
            </div>
          </div>

          <Button size="sm" variant="outline" asChild className="shrink-0">
            <Link href="/dashboard/suscripciones?plan=comercio">
              Inscribir
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      )}

      <div className="relative h-48 overflow-hidden rounded-xl border border-border bg-muted/50 md:h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-px opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-border" />
            ))}
          </div>
        </div>

        <div className="absolute top-[20%] left-[30%]"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">DC</div></div>
        <div className="absolute top-[35%] left-[55%]"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">PR</div></div>
        <div className="absolute top-[60%] left-[40%]"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">VH</div></div>
        <div className="absolute top-[25%] left-[75%]"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">BN</div></div>
        <div className="absolute top-[70%] left-[65%]"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">CL</div></div>
        <div className="absolute top-[50%] left-[20%]"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">AS</div></div>

        <div className="absolute bottom-3 left-3 rounded-lg bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm border border-border">
          <MapPin className="mr-1 inline h-3 w-3 text-primary" />
          Hudson – Berazategui
        </div>

        <div className="absolute top-3 right-3 rounded-lg bg-card/90 px-3 py-1.5 text-[10px] text-muted-foreground backdrop-blur-sm border border-border">
          Mapa interactivo (próximamente)
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar comercio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((commerce) => {
          const waUrl = `https://wa.me/${commerce.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            `Hola ${commerce.name}, los contacto desde VECINDO.`
          )}`

          return (
            <div
              key={commerce.id}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start gap-4 p-5">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {commerce.logo}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/dashboard/comercios/${commerce.id}`}
                    className="hover:underline underline-offset-2"
                  >
                    <h3 className="font-semibold text-foreground leading-snug">
                      {commerce.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {commerce.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{commerce.rating}</span>
                      <span className="text-muted-foreground">({commerce.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-3">
                <p className="text-xs text-muted-foreground line-clamp-2">{commerce.description}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 text-primary" />
                  {commerce.address}
                </p>
              </div>

              <div className="mt-auto flex border-t border-border">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(commerce.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-success hover:bg-success/5 transition-colors border-r border-border"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  WhatsApp
                </a>

                <a
                  href={`tel:${commerce.phone}`}
                  onClick={() => trackCallClick(commerce.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Llamar
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
          <Store className="h-10 w-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No se encontraron comercios</p>
          <p className="text-xs text-muted-foreground">
            Probá ajustando los filtros de búsqueda.
          </p>
        </div>
      )}
    </div>
  )
}