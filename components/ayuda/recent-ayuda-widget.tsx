"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ArrowRight,
  PawPrint,
  Gift,
  Key,
  Users,
  AlertTriangle,
  Clock,
} from "lucide-react"

type AyudaCategory = "mascotas" | "donaciones" | "objetos" | "personal" | "urgente"

const categoryConfig: Record<AyudaCategory, { icon: typeof PawPrint; color: string }> = {
  mascotas: { icon: PawPrint, color: "text-amber-600" },
  donaciones: { icon: Gift, color: "text-pink-600" },
  objetos: { icon: Key, color: "text-blue-600" },
  personal: { icon: Users, color: "text-green-600" },
  urgente: { icon: AlertTriangle, color: "text-destructive" },
}

// Show only active posts
const recentPosts = [
  {
    id: "1",
    title: "Perro perdido - Golden Retriever",
    category: "mascotas" as AyudaCategory,
    postedAt: "hace 3h",
  },
  {
    id: "2",
    title: "Colecta para cirug\u00eda veterinaria",
    category: "donaciones" as AyudaCategory,
    postedAt: "hace 5h",
  },
  {
    id: "3",
    title: "Llaves encontradas en calle 25",
    category: "objetos" as AyudaCategory,
    postedAt: "hace 1d",
  },
]

export function RecentAyudaWidget() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Ayuda reciente</h3>
        </div>
        <Link
          href="/dashboard/ayuda"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Ver todos
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="divide-y divide-border">
        {recentPosts.map((post) => {
          const cat = categoryConfig[post.category]
          const CatIcon = cat.icon
          return (
            <Link
              key={post.id}
              href={`/dashboard/ayuda/${post.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted ${cat.color}`}>
                <CatIcon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {post.postedAt}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
