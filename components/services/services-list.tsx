"use client";

import Link from "next/link";
import { ActivityChips } from "@/components/activity/activity-chips";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  Star,
  ShieldCheck,
  MapPin,
  Users,
  Zap,
  BriefcaseBusiness,
  MessageCircle,
} from "lucide-react";
import { getProfessionalCardInsights } from "@/lib/activity-insights";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export const professionals = [
  {
    id: "1",
    name: "Roberto Mendez",
    initials: "RM",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    title: "Electricista Matriculado",
    category: "Electricidad",
    rating: 4.9,
    reviews: 47,
    jobs: 32,
    zone: "Hudson",
    verified: true,
    isTop: true,
    isFast: true,
    description:
      "Mas de 15 anos de experiencia. Especialista en instalaciones de hogar inteligente, iluminacion de piscinas y reparaciones de emergencia.",
    tags: ["Matriculado", "Asegurado", "Mismo dia"],
  },
  {
    id: "2",
    name: "Maria Elena Torres",
    initials: "MT",
    avatarUrl: "https://i.pravatar.cc/150?img=20",
    title: "Pintora de Interiores",
    category: "Pintura",
    rating: 4.8,
    reviews: 31,
    jobs: 21,
    zone: "Hudson",
    verified: true,
    isTop: true,
    isFast: false,
    description:
      "Especialista en pintura residencial. Materiales ecologicos, atencion meticulosa al detalle.",
    tags: ["Ecologica", "Con referencias"],
  },
  {
    id: "3",
    name: "Alejandro Vargas",
    initials: "AV",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    title: "Arquitecto Paisajista",
    category: "Jardineria",
    rating: 4.7,
    reviews: 22,
    jobs: 18,
    zone: "Hudson, Quilmes",
    verified: true,
    isTop: false,
    isFast: false,
    description:
      "Diseno y mantenimiento de jardines. Sistemas de riego, paisajismo sustentable.",
    tags: ["Diseno", "Mantenimiento"],
  },
  {
    id: "4",
    name: "Carmen Reyes",
    initials: "CR",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    title: "Tutora de Matematicas y Ciencias",
    category: "Clases",
    rating: 5.0,
    reviews: 18,
    jobs: 14,
    zone: "Hudson",
    verified: true,
    isTop: false,
    isFast: true,
    description:
      "Docente certificada. Preparacion para examenes, algebra a calculo. Horarios flexibles.",
    tags: ["Certificada", "Primaria-Secundaria", "Examenes"],
  },
  {
    id: "5",
    name: "Luis Fernandez",
    initials: "LF",
    avatarUrl: "https://i.pravatar.cc/150?img=54",
    title: "Plomero",
    category: "Plomería",
    rating: 4.6,
    reviews: 39,
    jobs: 27,
    zone: "Hudson, Florencio Varela",
    verified: true,
    isTop: false,
    isFast: true,
    description:
      "Plomero matriculado con mas de 10 anos de experiencia. Servicio de emergencia disponible 24/7.",
    tags: ["24/7", "Matriculado", "Emergencias"],
  },
];

interface ServicesListProps {
  professionals: typeof professionals;
}

export function ServicesList({ professionals }: ServicesListProps) {
  const { saveItem, isSaved } = useAuth();

  if (professionals.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50 p-8 text-center">
        <h3 className="text-base font-semibold text-foreground">
          No encontramos resultados
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Probá con otra categoría o cambiá el texto de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {professionals.map((pro) => {
        const saved = isSaved(pro.name, "service", pro.id);

        return (
          <article
            key={pro.id}
            className="group flex flex-col gap-3 rounded-[26px] border border-sky-100/80 bg-card p-5 shadow-[0_12px_30px_rgba(14,165,233,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_16px_36px_rgba(14,165,233,0.08)] active:scale-[0.995] sm:flex-row sm:items-start"
          >
            <Link href={`/dashboard/services/${pro.id}`} className="shrink-0">
              <Avatar className="h-14 w-14">
                {pro.avatarUrl ? (
                  <img
                    src={pro.avatarUrl}
                    alt={pro.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-sky-100 font-semibold text-sky-700">
                    {pro.initials}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>

            <Link
              href={`/dashboard/services/${pro.id}`}
              className="min-w-0 flex-1"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">{pro.name}</h3>

                {pro.verified && (
                  <Badge className="gap-1 border-0 bg-sky-500/10 text-[10px] text-sky-700 hover:bg-sky-500/10">
                    <ShieldCheck className="h-3 w-3" />
                    Verificado
                  </Badge>
                )}

                {pro.isTop && (
                  <Badge className="gap-1 border-0 bg-yellow-500/10 text-[10px] text-yellow-700 hover:bg-yellow-500/10">
                    <Users className="h-3 w-3" />
                    Recomendado
                  </Badge>
                )}

                {pro.isFast && (
                  <Badge className="border-0 bg-sky-500/10 text-[10px] text-sky-700 hover:bg-sky-500/10">
                    <Zap className="mr-1 h-3 w-3" />
                    Respuesta rápida
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground">{pro.title}</p>

              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {pro.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">
                  <BriefcaseBusiness className="h-3 w-3" />
                  +{pro.jobs} trabajos realizados
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">
                  <Users className="h-3 w-3" />
                  {pro.reviews} recomendaciones
                </span>
                {pro.isFast && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">
                    <MessageCircle className="h-3 w-3" />
                    Responde rápido
                  </span>
                )}
              </div>

              <ActivityChips
                insights={getProfessionalCardInsights(pro.id, pro.category)}
                limit={2}
                className="mt-2"
              />

              <div className="mt-3 flex flex-wrap gap-1.5">
                {pro.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-1.5 py-0 text-[10px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>

            <div className="flex shrink-0 flex-col items-end gap-2 text-right">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm font-bold text-foreground">
                  {pro.rating}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {pro.reviews} reseñas
              </span>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {pro.zone}
              </div>
              <div className="mt-1 flex flex-col items-end gap-1">
                <Badge
                  variant="outline"
                  className="gap-1 border-sky-200 text-[10px] text-sky-700"
                >
                  <Users className="h-3 w-3" />
                  Confianza vecinal
                </Badge>
                {saved && (
                  <Badge
                    variant="outline"
                    className="gap-1 border-sky-200 text-[10px] text-sky-700"
                  >
                    <Bookmark className="h-3 w-3" />
                    Guardado
                  </Badge>
                )}
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="mt-1 gap-1.5 border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-700"
                onClick={() =>
                  saveItem({
                    type: "service",
                    targetId: pro.id,
                    title: pro.name,
                    subtitle: `${pro.category} · ${pro.rating} estrellas`,
                    href: `/dashboard/services/${pro.id}`,
                    activity: pro.isFast
                      ? "Respondió hace 15 min"
                      : "Recomendado por vecinos",
                  })
                }
              >
                <Bookmark
                  className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`}
                />
                {saved ? "Guardado" : "Guardar"}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
