"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Store, Sparkles, Plus, Eye, MessageSquare, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { commerces } from "@/lib/commerces-data"

export default function CommercePanelPage() {
  const { auth } = useAuth()
  const managedIds = auth.managesCommerceIds ?? []

  const managedProfiles = useMemo(() => {
    return commerces.filter((item) => managedIds.includes(item.id))
  }, [managedIds])

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
          <Store className="h-3.5 w-3.5" />
          Panel comercial
        </div>
        <h1 className="text-2xl font-bold text-foreground">Panel de comercios</h1>
        <p className="text-sm text-muted-foreground">Gestioná los perfiles comerciales asociados a tu cuenta.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Perfiles administrados</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{managedProfiles.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Consultas recibidas</p>
          <p className="mt-1 text-2xl font-bold text-foreground">18</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Clicks al perfil</p>
          <p className="mt-1 text-2xl font-bold text-foreground">74</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-foreground">Tus perfiles</h2>
            <p className="mt-1 text-sm text-muted-foreground">Cada perfil puede ser comercio o emprendimiento local.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/comercial">
              <Plus className="h-4 w-4" />
              Ir a Mi negocio
            </Link>
          </Button>
        </div>

        <div className="space-y-3">
          {managedProfiles.length > 0 ? (
            managedProfiles.map((item) => {
              const isCommerce = item.type === "commerce"
              return (
                <div key={item.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <Badge className={isCommerce ? "bg-sky-100 text-sky-700 hover:bg-sky-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
                          {isCommerce ? <Store className="mr-1 h-3 w-3" /> : <Sparkles className="mr-1 h-3 w-3" />}
                          {isCommerce ? "Comercio" : "Emprendimiento local"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/comercios/${item.id}`}>
                          <Eye className="h-4 w-4" />
                          Ver perfil
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                        Ver consultas
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    Editar perfil
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              )
            })
          ) : (
            <div className="rounded-xl border border-dashed border-border p-6 text-center">
              <h3 className="font-semibold text-foreground">Todavía no administrás perfiles comerciales</h3>
              <p className="mt-1 text-sm text-muted-foreground">Cuando tengas un comercio o emprendimiento activo, lo vas a ver acá.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
