import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Store, MapPin, MessageSquare, Star, Package } from "lucide-react"

interface Product {
  id: string
  title: string
  price: string
  description: string
}

const businessData: Record<string, {
  businessName: string; ownerName: string; ownerInitials: string;
  description: string; whatsapp: string; zone: string; rating: number;
  reviews: number; products: Product[];
}> = {
  "1": {
    businessName: "Delicias de Sofia",
    ownerName: "Sofia Lopez",
    ownerInitials: "SL",
    description: "Reposteria artesanal y tortas personalizadas. Hacemos tortas para cumpleanos, eventos y catering dulce para reuniones. Todos los ingredientes son de primera calidad. Hacemos entregas dentro del barrio.",
    whatsapp: "+5411234567891",
    zone: "Hudson &ndash; Berazategui",
    rating: 4.9,
    reviews: 23,
    products: [
      { id: "p1", title: "Torta de Chocolate Belga", price: "$18.000", description: "Torta de 3 pisos con ganache de chocolate belga. Para 12 personas." },
      { id: "p2", title: "Docena de Alfajores", price: "$8.500", description: "Alfajores de maicena con dulce de leche y coco rallado." },
      { id: "p3", title: "Box Desayuno Sorpresa", price: "$15.000", description: "Incluye medialunas, jugo, frutas, mermeladas y una taza personalizada." },
      { id: "p4", title: "Cheesecake de Frutos Rojos", price: "$12.000", description: "Cheesecake clasico con coulis de frutos rojos. Para 8 personas." },
    ],
  },
  "2": {
    businessName: "Huerta Organica del Barrio",
    ownerName: "Laura Torres",
    ownerInitials: "LT",
    description: "Verduras y hierbas organicas cultivadas en nuestra huerta dentro del barrio. Sin pesticidas, sin intermediarios. Bolsones semanales con entrega a domicilio.",
    whatsapp: "+5411345678902",
    zone: "Hudson &ndash; Berazategui",
    rating: 4.7,
    reviews: 15,
    products: [
      { id: "p5", title: "Bolson Familiar Semanal", price: "$6.500", description: "Verduras de estacion para 4 personas. Incluye tomates, lechuga, zapallo, remolacha y hierbas." },
      { id: "p6", title: "Kit de Hierbas Aromaticas", price: "$3.000", description: "Albahaca, romero, perejil y cilantro frescos." },
    ],
  },
}

export function BusinessProfilePublic({ id }: { id: string }) {
  const biz = businessData[id] || businessData["1"]
  const whatsappUrl = `https://wa.me/${biz.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola, te contacto desde VEZI por tu negocio "${biz.businessName}".`)}`

  return (
    <div className="flex flex-col gap-6">
      <Link href="/dashboard/marketplace" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="h-4 w-4" />
        Volver al mercado
      </Link>

      {/* Business header */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Banner placeholder */}
        <div className="flex h-32 items-center justify-center bg-primary/5">
          <Store className="h-10 w-10 text-primary/30" />
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Avatar className="h-14 w-14 -mt-12 ring-4 ring-card">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">{biz.ownerInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground text-balance">{biz.businessName}</h1>
              <p className="text-sm text-muted-foreground">{"Por " + biz.ownerName}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-bold text-foreground">{biz.rating}</span>
                  <span className="text-xs text-muted-foreground">({biz.reviews} resenas)</span>
                </div>
                <Badge variant="secondary" className="gap-1 text-xs">
                  <MapPin className="h-3 w-3" />
                  {biz.zone}
                </Badge>
              </div>
            </div>
            <Button asChild className="gap-2 bg-success text-success-foreground hover:bg-success/90 shrink-0">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-4 w-4" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{biz.description}</p>
        </div>
      </div>

      {/* Products grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Productos ({biz.products.length})</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {biz.products.map((product) => {
            const productWhatsappUrl = `https://wa.me/${biz.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola, me interesa "${product.title}" de ${biz.businessName} (${product.price}) - via VEZI.`)}`
            return (
              <div
                key={product.id}
                className="flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="flex h-36 items-center justify-center bg-muted/50">
                  <span className="text-2xl font-bold text-muted-foreground/20">{product.price}</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground leading-snug">{product.title}</h3>
                    <span className="shrink-0 text-base font-bold text-primary">{product.price}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="mt-auto pt-3">
                    <Button asChild variant="outline" size="sm" className="w-full gap-2 border-success/30 text-success hover:bg-success/5 hover:text-success">
                      <a href={productWhatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Contactar por WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          {"Comunidad cerrada. Sin comisiones. Contacto directo por WhatsApp."}
        </p>
      </div>
    </div>
  )
}
