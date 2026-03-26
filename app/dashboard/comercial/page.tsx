export default function ComercialPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi espacio comercial</h1>
        <p className="text-sm text-muted-foreground">
          Gestioná tus publicaciones, perfil y consultas dentro de la comunidad.
        </p>
      </div>

      {/* CTA principal */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Empezá a vender en tu zona</p>
          <p className="text-sm text-muted-foreground">
            Creá publicaciones, armá tu perfil y conectá con vecinos.
          </p>
        </div>
        <button className="rounded-md bg-amber-600 px-4 py-2 text-white text-sm hover:bg-amber-700">
          Nueva publicación
        </button>
      </div>

      {/* métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Publicaciones</p>
          <p className="text-xl font-bold">3</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Consultas</p>
          <p className="text-xl font-bold">12</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Clicks WhatsApp</p>
          <p className="text-xl font-bold">28</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Guardados</p>
          <p className="text-xl font-bold">7</p>
        </div>
      </div>

      {/* publicaciones */}
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-2">Mis publicaciones</h2>
        <p className="text-sm text-muted-foreground">
          Acá vas a poder ver y gestionar tus productos.
        </p>
      </div>

      {/* perfil */}
      <div className="rounded-xl border border-dashed p-4">
        <h2 className="font-semibold mb-2">Perfil comercial</h2>
        <p className="text-sm text-muted-foreground">
          Completá tu perfil para generar más confianza.
        </p>
      </div>
    </div>
  )
}