import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function NewServicePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Publicar servicio</h1>
        <p className="text-[15px] text-muted-foreground">
          Completá este formulario para publicar tu servicio en VEZI.
        </p>
      </div>

      <form className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="space-y-2">
          <Label htmlFor="service-title" className="text-[13px] font-medium">Título</Label>
          <Input id="service-title" placeholder="Ej: Electricista matriculado" className="text-[15px]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service-category" className="text-[13px] font-medium">Categoría</Label>
          <Input id="service-category" placeholder="Ej: Electricidad" className="text-[15px]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service-description" className="text-[13px] font-medium">Descripción</Label>
          <Textarea
            id="service-description"
            placeholder="Contá qué ofrecés, tu zona de cobertura y cómo te pueden contactar."
            className="min-h-[120px] text-[15px]"
          />
        </div>

        <Button type="button" className="bg-sky-600 text-white hover:bg-sky-700">
          Publicar servicio
        </Button>
      </form>
    </div>
  )
}
