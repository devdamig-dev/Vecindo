import { redirect } from "next/navigation"

export default function AyudaRedirect() {
  redirect("/dashboard/comunidad")
}

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

export const ayudaPosts: AyudaPost[] = [
  {
    id: "1",
    title: "Perro perdido - Golden Retriever",
    category: "mascotas",
    status: "activo",
    description: "Se perdió ayer cerca de la plaza central. Responde al nombre de Max.",
    fullDescription: "Se perdió ayer a las 18hs cerca de la plaza central de Hudson. Es un Golden Retriever macho de 4 años, color dorado claro, tiene collar azul con chapita. Responde al nombre de Max. Es muy amigable. Por favor si lo ven avisen, estamos muy preocupados. Hay recompensa.",
    images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=400&fit=crop", "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=400&fit=crop"],
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
    fullDescription: "Rescatamos un gatito de 6 meses que estaba abandonado y tiene una fractura en la patita. El veterinario nos presupuestó $85.000 para la operación. Ya juntamos $40.000 pero necesitamos el resto urgente. Cualquier aporte ayuda.",
    images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=400&fit=crop"],
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
    fullDescription: "Esta mañana encontré un llavero con 4 llaves y un control de alarma de auto marca Fiat. Estaba tirado en la esquina de calle 25 y Av. Hudson.",
    images: ["https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=400&fit=crop"],
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
    fullDescription: "Busco una niñera responsable y cariñosa para cuidar a mis dos hijos (5 y 8 años) los martes y jueves de 14 a 19hs.",
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
    fullDescription: "Llevamos más de 8 horas sin luz en toda la manzana 12. ACTUALIZACIÓN: Ya volvió la luz a las 22hs, gracias a todos por la difusión.",
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
    fullDescription: "Hace 2 días apareció en mi jardín una gatita siamesa adulta, muy mimosa y bien cuidada. ACTUALIZACIÓN: ¡Encontramos a los dueños!",
    images: ["https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=400&fit=crop"],
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
    fullDescription: "Mi bebé ya creció y tengo mucha ropa de 0 a 12 meses en muy buen estado para donar.",
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=400&fit=crop"],
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
    fullDescription: "Busco jardinero responsable para mantenimiento de mi jardín (aprox 200m2) cada 15 días.",
    images: [],
    authorId: "resident1",
    authorName: "María G.",
    authorInitials: "MG",
    whatsapp: "+5411234567890",
    zone: "Hudson",
    postedAt: "hace 1 semana",
  },
]
