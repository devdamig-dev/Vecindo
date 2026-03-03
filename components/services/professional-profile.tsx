import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShieldCheck, MapPin, Phone, Calendar, ArrowLeft, MessageSquare } from "lucide-react"

const proData: Record<string, {
  name: string; initials: string; title: string; category: string;
  rating: number; reviews: number; zone: string; description: string;
  tags: string[]; whatsapp: string; since: string;
  subscores: { quality: number; punctuality: number; price: number };
  gallery: { url: string; caption: string }[];
}> = {
  "1": {
    name: "Roberto M\u00e9ndez", initials: "RM", title: "Electricista Matriculado", category: "Electricidad",
    rating: 4.9, reviews: 47, zone: "Hudson", description: "M\u00e1s de 15 a\u00f1os de experiencia especializado en instalaciones de hogar inteligente, iluminaci\u00f3n de piscinas, reparaciones de emergencia y mejoras completas del sistema el\u00e9ctrico. Matriculado, asegurado y comprometido con la calidad. Disponible para emergencias el mismo d\u00eda.",
    tags: ["Matriculado", "Asegurado", "Mismo d\u00eda", "Hogar Inteligente"], whatsapp: "+5411234567890", since: "Marzo 2023",
    subscores: { quality: 4.9, punctuality: 4.8, price: 4.7 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop", caption: "Tablero el\u00e9ctrico renovado" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", caption: "Iluminaci\u00f3n de piscina" },
      { url: "https://images.unsplash.com/photo-1597739239353-50270a473397?w=400&h=300&fit=crop", caption: "Instalaci\u00f3n domiciliaria" },
      { url: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=400&h=300&fit=crop", caption: "Sistema de hogar inteligente" },
    ],
  },
  "2": {
    name: "Mar\u00eda Elena Torres", initials: "MT", title: "Pintora de Interiores", category: "Pintura",
    rating: 4.8, reviews: 31, zone: "Hudson", description: "Especialista en pintura residencial con 10 a\u00f1os de experiencia. Usa materiales ecol\u00f3gicos y de bajo VOC. Conocida por su atenci\u00f3n meticulosa al detalle y espacios de trabajo limpios.",
    tags: ["Ecol\u00f3gica", "Con referencias", "Interior", "Exterior"], whatsapp: "+5411345678901", since: "Junio 2023",
    subscores: { quality: 4.9, punctuality: 4.6, price: 4.8 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop", caption: "Living terminado" },
      { url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop", caption: "Dormitorio pintado" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop", caption: "Cocina renovada" },
    ],
  },
}

function SubScoreBar({ label, score }: { label: string; score: number }) {
  const pct = (score / 5) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-foreground w-8 text-right">{score.toFixed(1)}</span>
    </div>
  )
}

export function ProfessionalProfile({ id }: { id: string }) {
  const pro = proData[id] || proData["1"]

  const whatsappUrl = `https://wa.me/${pro.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${pro.name}, te contacto desde VECINDO por tu servicio de ${pro.category}.`)}`

  return (
    <div className="flex flex-col gap-6">
      <Link href="/dashboard/services" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="h-4 w-4" />
        Volver a servicios
      </Link>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">{pro.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{pro.name}</h1>
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground">{pro.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pro.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-warning text-warning" />
              <span className="text-xl font-bold text-foreground">{pro.rating}</span>
              <span className="text-sm text-muted-foreground">({pro.reviews} resenas)</span>
            </div>
            <Button asChild className="gap-2 bg-success text-success-foreground hover:bg-success/90">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-4 w-4" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Subscores */}
        <div className="mt-6 border-t border-border pt-6">
          <h2 className="mb-3 font-semibold text-foreground">Puntuaciones</h2>
          <div className="flex flex-col gap-2.5 max-w-md">
            <SubScoreBar label="Calidad" score={pro.subscores.quality} />
            <SubScoreBar label="Puntualidad" score={pro.subscores.punctuality} />
            <SubScoreBar label="Precio" score={pro.subscores.price} />
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <h2 className="mb-2 font-semibold text-foreground">Acerca de</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{pro.description}</p>
        </div>

        {/* Gallery */}
        {pro.gallery.length > 0 && (
          <div className="mt-6 border-t border-border pt-6">
            <h2 className="mb-3 font-semibold text-foreground">Trabajos realizados</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {pro.gallery.map((img, i) => (
                <div key={i} className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-[10px] text-white/90 leading-tight">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {pro.zone}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            {"WhatsApp: " + pro.whatsapp}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            {"Miembro desde " + pro.since}
          </div>
        </div>
      </div>
    </div>
  )
}
