import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, MessageSquare } from "lucide-react"

export const listings = [
  {
    id: "1",
    title: "Parrilla Weber Genesis",
    price: "$180.000",
    priceNum: 180000,
    category: "Electrodom\u00e9sticos",
    condition: "Excelente",
    seller: "Sof\u00eda L.",
    sellerId: "seller1",
    initials: "SL",
    whatsapp: "+5411234567891",
    zone: "Hudson",
    posted: "hace 2 hrs",
    description: "Parrilla a gas de 3 quemadores, casi sin uso. Incluye funda y set de utensilios.",
    fullDescription: "Parrilla Weber Genesis de 3 quemadores a gas. Comprada hace 1 a\u00f1o, usada solo 5 veces. Estado impecable, funciona perfectamente. Incluye funda original Weber, set de 4 utensilios de acero inoxidable y 2 garrafas vac\u00edas. Motivo de venta: nos mudamos a departamento. Se retira por Hudson, cerca de la rotonda.",
    images: [
      "https://images.unsplash.com/photo-1558030006-450675393462?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "2",
    title: "Bicicleta de Monta\u00f1a - Trek Marlin 7",
    price: "$450.000",
    priceNum: 450000,
    category: "Deportes",
    condition: "Como Nueva",
    seller: "Diego P.",
    sellerId: "seller2",
    initials: "DP",
    whatsapp: "+5411345678902",
    zone: "Hudson",
    posted: "hace 5 hrs",
    description: "Modelo 2024, menos de 300 km. Cubiertas y asiento mejorados.",
    fullDescription: "Trek Marlin 7 modelo 2024, rodado 29. Color negro/verde. Menos de 300 km recorridos, siempre guardada bajo techo. Cubiertas Maxxis nuevas, asiento ergon\u00f3mico. Incluye casco y candado. Ideal para rutas o salidas de fin de semana. Vendo porque me regalaron otra.",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "3",
    title: "Hamaca para Ni\u00f1os",
    price: "$120.000",
    priceNum: 120000,
    category: "Ni\u00f1os",
    condition: "Bueno",
    seller: "Laura T.",
    sellerId: "seller3",
    initials: "LT",
    whatsapp: "+5411456789012",
    zone: "Hudson",
    posted: "hace 1 d\u00eda",
    description: "Hamaca de madera, 2 columpios y un tobog\u00e1n. Se retira, requiere desarme parcial.",
    fullDescription: "Juego de plaza de madera tratada para exterior. Incluye estructura con 2 columpios y tobog\u00e1n de 2 metros. Capacidad para ni\u00f1os de 3 a 10 a\u00f1os. Muy resistente, estuvo 3 a\u00f1os en nuestro jard\u00edn. Se desarma f\u00e1cil con herramientas comunes. Ideal para quintas o jardines grandes.",
    images: [
      "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564429238535-b2f0c834cc65?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "4",
    title: "Samsung 55\" 4K Smart TV",
    price: "$320.000",
    priceNum: 320000,
    category: "Electr\u00f3nica",
    condition: "Excelente",
    seller: "Carlos R.",
    sellerId: "seller4",
    initials: "CR",
    whatsapp: "+5411567890123",
    zone: "Hudson",
    posted: "hace 1 d\u00eda",
    description: "Modelo 2024, soporte de pared incluido. Cambiamos a 75\" as\u00ed que vendemos este.",
    fullDescription: "Samsung Crystal UHD 55 pulgadas, modelo 2024. Resoluci\u00f3n 4K, Smart TV con todas las apps (Netflix, Disney+, etc). Control remoto original y soporte de pared incluidos. Funciona perfecto, sin rayas ni manchas. Lo vendemos porque compramos uno de 75 pulgadas para el living.",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "5",
    title: "Sof\u00e1 Seccional de Cuero",
    price: "$650.000",
    priceNum: 650000,
    category: "Muebles",
    condition: "Bueno",
    seller: "Diego P.",
    sellerId: "seller2",
    initials: "DP",
    whatsapp: "+5411345678902",
    zone: "Hudson",
    posted: "hace 2 d\u00edas",
    description: "Cuero italiano, forma de L. Para 6 personas. Desgaste menor en un apoyabrazos.",
    fullDescription: "Sof\u00e1 seccional de cuero italiano color marr\u00f3n oscuro. Forma de L, 3 cuerpos + chaise longue. Capacidad 6 personas c\u00f3modamente. Tiene un peque\u00f1o desgaste en un apoyabrazos (se muestra en fotos). Muy c\u00f3modo y resistente. Se retira desarmado.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&h=400&fit=crop",
    ],
  },
  {
    id: "6",
    title: "Set de Herramientas de Jard\u00edn",
    price: "$45.000",
    priceNum: 45000,
    category: "Jard\u00edn",
    condition: "Bueno",
    seller: "Miguel H.",
    sellerId: "seller5",
    initials: "MH",
    whatsapp: "+5411789012345",
    zone: "Hudson",
    posted: "hace 3 d\u00edas",
    description: "Pala, rastrillo, tijera de podar, guantes de jardiner\u00eda. Todo en buen estado.",
    fullDescription: "Set completo de herramientas de jardiner\u00eda: pala de punta, rastrillo de metal, tijera de podar profesional Tramontina, guantes de cuero y bolsa de transporte. Todo en buen estado, con algo de uso pero funcional. Ideal para quien est\u00e1 armando su primer kit de jard\u00edn.",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&h=400&fit=crop",
    ],
  },
]

export function MarketplaceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => {
        const whatsappUrl = `https://wa.me/${listing.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${listing.seller}, me interesa "${listing.title}" (${listing.price}) publicado en VECINDO.`)}`
        return (
          <div
            key={listing.id}
            className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <Link href={`/dashboard/mercado/${listing.id}`} className="block">
              <div className="relative h-40 overflow-hidden bg-muted/50">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow">
                  {listing.price}
                </span>
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <Link href={`/dashboard/mercado/${listing.id}`} className="block">
                <h3 className="font-semibold text-foreground leading-snug hover:text-primary transition-colors">{listing.title}</h3>
              </Link>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{listing.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{listing.category}</Badge>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{listing.condition}</Badge>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <Button asChild variant="outline" size="sm" className="w-full gap-2 border-success/30 text-success hover:bg-success/5 hover:text-success">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Contactar por WhatsApp
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-muted text-foreground text-[9px]">{listing.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{listing.seller}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {listing.zone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {listing.posted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
