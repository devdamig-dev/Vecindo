import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MapPin,
  Clock,
  MessageSquare,
  Eye,
  ShieldCheck,
  Bookmark,
} from "lucide-react"

export const listings = [
  {
    id: "1",
    title: "Parrilla Weber Genesis",
    price: "$180.000",
    priceNum: 180000,
    category: "Electrodomésticos",
    condition: "Excelente",
    status: "Disponible",
    seller: "Sofía L.",
    sellerId: "seller1",
    initials: "SL",
    whatsapp: "+5411234567891",
    zone: "Hudson",
    posted: "hace 2 hrs",
    description: "Parrilla a gas de 3 quemadores, casi sin uso. Incluye funda y set de utensilios.",
    fullDescription:
      "Parrilla Weber Genesis de 3 quemadores a gas. Comprada hace 1 año, usada solo 5 veces. Estado impecable, funciona perfectamente. Incluye funda original Weber, set de 4 utensilios de acero inoxidable y 2 garrafas vacías. Motivo de venta: nos mudamos a departamento. Se retira por Hudson, cerca de la rotonda.",
    images: [
      "https://images.unsplash.com/photo-1558030006-450675393462?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "2",
    title: "Bicicleta de Montaña - Trek Marlin 7",
    price: "$450.000",
    priceNum: 450000,
    category: "Deportes",
    condition: "Como Nueva",
    status: "Disponible",
    seller: "Diego P.",
    sellerId: "seller2",
    initials: "DP",
    whatsapp: "+5411345678902",
    zone: "Hudson",
    posted: "hace 5 hrs",
    description: "Modelo 2024, menos de 300 km. Cubiertas y asiento mejorados.",
    fullDescription:
      "Trek Marlin 7 modelo 2024, rodado 29. Color negro/verde. Menos de 300 km recorridos, siempre guardada bajo techo. Cubiertas Maxxis nuevas, asiento ergonómico. Incluye casco y candado. Ideal para rutas o salidas de fin de semana. Vendo porque me regalaron otra.",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "3",
    title: "Hamaca para Niños",
    price: "$120.000",
    priceNum: 120000,
    category: "Niños",
    condition: "Bueno",
    status: "Reservado",
    seller: "Laura T.",
    sellerId: "seller3",
    initials: "LT",
    whatsapp: "+5411456789012",
    zone: "Hudson",
    posted: "hace 1 día",
    description: "Hamaca de madera, 2 columpios y un tobogán. Se retira, requiere desarme parcial.",
    fullDescription:
      "Juego de plaza de madera tratada para exterior. Incluye estructura con 2 columpios y tobogán de 2 metros. Capacidad para niños de 3 a 10 años. Muy resistente, estuvo 3 años en nuestro jardín. Se desarma fácil con herramientas comunes. Ideal para quintas o jardines grandes.",
    images: [
      "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564429238535-b2f0c834cc65?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "4",
    title: 'Samsung 55" 4K Smart TV',
    price: "$320.000",
    priceNum: 320000,
    category: "Electrónica",
    condition: "Excelente",
    status: "Disponible",
    seller: "Carlos R.",
    sellerId: "seller4",
    initials: "CR",
    whatsapp: "+5411567890123",
    zone: "Hudson",
    posted: "hace 1 día",
    description: 'Modelo 2024, soporte de pared incluido. Cambiamos a 75" así que vendemos este.',
    fullDescription:
      "Samsung Crystal UHD 55 pulgadas, modelo 2024. Resolución 4K, Smart TV con todas las apps (Netflix, Disney+, etc). Control remoto original y soporte de pared incluidos. Funciona perfecto, sin rayas ni manchas. Lo vendemos porque compramos uno de 75 pulgadas para el living.",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "5",
    title: "Sofá Seccional de Cuero",
    price: "$650.000",
    priceNum: 650000,
    category: "Muebles",
    condition: "Bueno",
    status: "Vendido",
    seller: "Diego P.",
    sellerId: "seller2",
    initials: "DP",
    whatsapp: "+5411345678902",
    zone: "Hudson",
    posted: "hace 2 días",
    description: "Cuero italiano, forma de L. Para 6 personas. Desgaste menor en un apoyabrazos.",
    fullDescription:
      "Sofá seccional de cuero italiano color marrón oscuro. Forma de L, 3 cuerpos + chaise longue. Capacidad 6 personas cómodamente. Tiene un pequeño desgaste en un apoyabrazos (se muestra en fotos). Muy cómodo y resistente. Se retira desarmado.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "6",
    title: "Set de Herramientas de Jardín",
    price: "$45.000",
    priceNum: 45000,
    category: "Jardín",
    condition: "Bueno",
    status: "Disponible",
    seller: "Miguel H.",
    sellerId: "seller5",
    initials: "MH",
    whatsapp: "+5411789012345",
    zone: "Hudson",
    posted: "hace 3 días",
    description: "Pala, rastrillo, tijera de podar, guantes de jardinería. Todo en buen estado.",
    fullDescription:
      "Set completo de herramientas de jardinería: pala de punta, rastrillo de metal, tijera de podar profesional Tramontina, guantes de cuero y bolsa de transporte. Todo en buen estado, con algo de uso pero funcional. Ideal para quien está armando su primer kit de jardín.",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&h=400&fit=crop",
    ],
  },
]

interface MarketplaceGridProps {
  listings: typeof listings
}

function getConditionBadgeClass(condition: string) {
  const normalized = condition.toLowerCase()

  if (normalized.includes("como nueva")) {
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  }

  if (normalized.includes("excelente")) {
    return "bg-sky-100 text-sky-700 hover:bg-sky-100"
  }

  if (normalized.includes("bueno")) {
    return "bg-amber-100 text-amber-700 hover:bg-amber-100"
  }

  return "bg-muted text-muted-foreground hover:bg-muted"
}

function getStatusBadgeClass(status: string) {
  const normalized = status.toLowerCase()

  if (normalized.includes("disponible")) {
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  }

  if (normalized.includes("reservado")) {
    return "bg-amber-100 text-amber-700 hover:bg-amber-100"
  }

  if (normalized.includes("vendido")) {
    return "bg-muted text-muted-foreground hover:bg-muted"
  }

  return "bg-muted text-muted-foreground hover:bg-muted"
}

export function MarketplaceGrid({ listings }: MarketplaceGridProps) {
  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50 p-8 text-center">
        <h3 className="text-base font-semibold text-foreground">No encontramos publicaciones</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Probá con otra categoría o cambiá el texto de búsqueda.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => {
        const whatsappUrl = `https://wa.me/${listing.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
          `Hola ${listing.seller}, me interesa "${listing.title}" (${listing.price}) publicado en VEZI.`
        )}`

        const detailHref = `/dashboard/marketplace/${listing.id}`
        const isSold = listing.status.toLowerCase() === "vendido"

        return (
          <article
            key={listing.id}
            className={`group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md ${
              isSold ? "opacity-75" : ""
            }`}
          >
            <Link href={detailHref} className="block">
              <div className="relative h-52 overflow-hidden bg-muted/40">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {isSold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Badge className="bg-background text-foreground hover:bg-background">
                      Vendido
                    </Badge>
                  </div>
                )}

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <Badge className="bg-background/90 text-foreground hover:bg-background/90">
                    {listing.category}
                  </Badge>
                  <Badge className={getConditionBadgeClass(listing.condition)}>
                    {listing.condition}
                  </Badge>
                  <Badge className={getStatusBadgeClass(listing.status)}>
                    {listing.status}
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-3 rounded-xl bg-background/95 px-3 py-2 shadow-sm">
                  <p className="text-lg font-bold leading-none text-foreground">{listing.price}</p>
                </div>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={detailHref} className="block">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors hover:text-emerald-700">
                      {listing.title}
                    </h3>
                  </Link>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {listing.zone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {listing.posted}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {listing.description}
              </p>

              <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-emerald-100 text-[10px] font-medium text-emerald-700">
                        {listing.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">{listing.seller}</p>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                        <ShieldCheck className="h-3 w-3" />
                        Vecino de la zona
                      </div>
                    </div>
                  </div>

                  <Link
                    href={detailHref}
                    className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Ver más
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  asChild
                  size="sm"
                  disabled={isSold}
                  className="flex-1 gap-2 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {isSold ? "No disponible" : "Consultar"}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Link href={detailHref}>
                    <Bookmark className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}