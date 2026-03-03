"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { ayudaPosts, type AyudaCategory } from "../page"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  MessageSquare,
  Bookmark,
  Share2,
  CheckCircle2,
  PawPrint,
  Gift,
  Key,
  Users,
  AlertTriangle,
} from "lucide-react"

const categoryConfig: Record<AyudaCategory, { label: string; icon: typeof PawPrint; color: string }> = {
  mascotas: { label: "Mascotas", icon: PawPrint, color: "bg-amber-500/10 text-amber-600" },
  donaciones: { label: "Donaciones", icon: Gift, color: "bg-pink-500/10 text-pink-600" },
  objetos: { label: "Objetos perdidos", icon: Key, color: "bg-blue-500/10 text-blue-600" },
  personal: { label: "Personal", icon: Users, color: "bg-green-500/10 text-green-600" },
  urgente: { label: "Urgente", icon: AlertTriangle, color: "bg-destructive/10 text-destructive" },
}

export default function AyudaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const post = ayudaPosts.find((p) => p.id === id)
  const [currentImage, setCurrentImage] = useState(0)
  const { auth, saveItem, isSaved } = useAuth()
  const isResident = auth.accountType === "resident"

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
        <h1 className="text-xl font-bold text-foreground mb-2">Aviso no encontrado</h1>
        <p className="text-sm text-muted-foreground mb-6">
          El aviso que buscas no existe o fue eliminado.
        </p>
        <Link href="/dashboard/ayuda" className="text-sm text-primary hover:underline">
          Volver a Ayuda
        </Link>
      </div>
    )
  }

  const cat = categoryConfig[post.category]
  const CatIcon = cat.icon
  const saved = isSaved(post.title)
  const isAuthor = isResident && post.authorId === "resident1" // Demo: first resident is the author

  const whatsappUrl = `https://wa.me/${post.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${post.authorName}, te escribo por el aviso "${post.title}" en VECINDO.`)}`

  // Related posts (same category, excluding current)
  const relatedPosts = ayudaPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  const nextImage = () => {
    if (post.images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % post.images.length)
    }
  }

  const prevImage = () => {
    if (post.images.length > 0) {
      setCurrentImage((prev) => (prev - 1 + post.images.length) % post.images.length)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href="/dashboard/ayuda"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Ayuda
      </Link>

      {/* Image carousel */}
      {post.images.length > 0 && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
          <img
            src={post.images[currentImage]}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          {post.status === "resuelto" && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-success text-success-foreground gap-1 text-sm px-3 py-1">
                <CheckCircle2 className="h-4 w-4" />
                Resuelto
              </Badge>
            </div>
          )}
          {post.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md hover:bg-background transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md hover:bg-background transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {post.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === currentImage ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className={`${cat.color}`}>
            <CatIcon className="h-3 w-3 mr-1" />
            {cat.label}
          </Badge>
          {post.status === "resuelto" && (
            <Badge className="bg-success/10 text-success gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Resuelto
            </Badge>
          )}
          <Badge variant="secondary">
            <MapPin className="h-3 w-3 mr-1" />
            {post.zone}
          </Badge>
        </div>

        <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-muted text-foreground text-[9px]">
                {post.authorInitials}
              </AvatarFallback>
            </Avatar>
            <span>{post.authorName}</span>
          </div>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.postedAt}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-semibold text-foreground mb-2">{"Descripci\u00f3n"}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {post.fullDescription}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="flex-1 gap-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageSquare className="h-5 w-5" />
            Contactar por WhatsApp
          </a>
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className={saved ? "text-primary border-primary/30" : ""}
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
            <Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mark as resolved (author only) */}
      {isAuthor && post.status === "activo" && (
        <div className="rounded-xl border border-success/20 bg-success/5 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">{"\u00bfSe resolvi\u00f3 el aviso?"}</p>
            <p className="text-xs text-muted-foreground">{"Marc\u00e1lo como resuelto para que otros sepan."}</p>
          </div>
          <Button variant="outline" size="sm" className="border-success/30 text-success hover:bg-success/5 gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            Marcar como resuelto
          </Button>
        </div>
      )}

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-border pt-6">
          <h2 className="font-semibold text-foreground mb-4">{"M\u00e1s avisos similares"}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {relatedPosts.map((related) => {
              const relCat = categoryConfig[related.category]
              const RelIcon = relCat.icon
              return (
                <Link
                  key={related.id}
                  href={`/dashboard/ayuda/${related.id}`}
                  className="group rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/30"
                >
                  {related.images.length > 0 ? (
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-2">
                      <img
                        src={related.images[0]}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-lg bg-muted/50 flex items-center justify-center mb-2">
                      <RelIcon className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                  )}
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-1">{related.postedAt}</p>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
