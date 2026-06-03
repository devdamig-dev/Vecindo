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
