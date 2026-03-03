"use client"

import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ShieldCheck, Briefcase } from "lucide-react"

export function ProfileEditor() {
  const { auth, updateProfile } = useAuth()
  const { profile, accountType } = auth

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-semibold text-foreground mb-4">Informacion Personal</h2>
      <div className="flex flex-col gap-5">
        {/* Avatar y tipo de cuenta */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
              {profile.avatarInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{profile.name}</p>
            <div className="flex items-center gap-2 mt-1">
              {accountType === "resident" ? (
                <Badge className="gap-1 bg-primary/10 text-primary border-0">
                  <ShieldCheck className="h-3 w-3" />
                  Residente
                </Badge>
              ) : (
                <Badge className="gap-1 bg-chart-2/10 text-chart-2 border-0">
                  <Briefcase className="h-3 w-3" />
                  Profesional Externo
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Campos */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={profile.whatsapp}
              onChange={(e) => updateProfile({ whatsapp: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bio">Biografia breve</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Zona</Label>
          <Input value={profile.zone} disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">La zona se asigna durante el proceso de validacion.</p>
        </div>

        <Button className="w-fit">Guardar Cambios</Button>
      </div>
    </div>
  )
}
