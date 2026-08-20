"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { Search, X, ArrowRight, HandHelping, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { searchModuleMeta, searchVezi, type SearchModule } from "@/lib/search"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const results = useMemo(() => searchVezi(query), [query])
  const grouped = useMemo(() => results.reduce<Partial<Record<SearchModule, typeof results>>>((groups, result) => {
    ;(groups[result.module] ??= []).push(result)
    return groups
  }, {}), [results])

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", close)
    return () => document.removeEventListener("pointerdown", close)
  }, [])

  const visible = open && query.trim().length >= 2
  return (
    <div ref={rootRef} className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(event) => { setQuery(event.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
        placeholder="Buscar cualquier cosa en VEZI..."
        aria-label="Búsqueda global"
        aria-expanded={visible}
        className="h-11 rounded-2xl border-border/70 bg-muted/40 pl-10 pr-10 text-sm shadow-sm focus-visible:ring-primary/30"
      />
      {query && <button onClick={() => { setQuery(""); setOpen(false) }} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-muted active:scale-95"><X className="h-4 w-4" /></button>}
      {visible && (
        <div className="fixed inset-x-3 top-[7.25rem] z-[70] max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain rounded-2xl border bg-background p-2 shadow-2xl sm:absolute sm:inset-x-0 sm:top-[calc(100%+.5rem)] sm:max-h-[min(32rem,calc(100vh-10rem))]">
          {results.length ? (Object.keys(searchModuleMeta) as SearchModule[]).map((module) => grouped[module]?.length ? (
            <section key={module} className="mb-1" aria-label={searchModuleMeta[module].label}>
              <h2 className={`px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider ${searchModuleMeta[module].color}`}>{searchModuleMeta[module].label}</h2>
              {grouped[module]!.slice(0, 3).map((result) => <Link onClick={() => setOpen(false)} key={result.id} href={result.href} className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-muted active:scale-[.99]">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${searchModuleMeta[module].dot}`} />
                <span className="min-w-0 flex-1"><span className="flex items-center gap-1 truncate text-sm font-semibold">{result.kind === "product" && <Package className="h-3.5 w-3.5" />}{result.title}</span><span className="block truncate text-xs text-muted-foreground">{result.subtitle}</span></span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>)}
            </section>
          ) : null) : <div className="rounded-xl bg-amber-50 p-4 text-center"><HandHelping className="mx-auto h-6 w-6 text-amber-700" /><p className="mt-2 font-bold">No encontramos eso cerca tuyo.</p><p className="mt-1 text-sm text-muted-foreground">¿Lo necesitás? Publicá una necesidad y avisamos a quienes podrían resolverlo.</p><Link onClick={() => setOpen(false)} href="/dashboard/necesito/nueva" className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-amber-600 px-4 text-sm font-bold text-white">Publicar necesidad</Link></div>}
          {results.length > 0 && <Link onClick={() => setOpen(false)} href={`/dashboard/buscar?q=${encodeURIComponent(query)}`} className="flex min-h-12 items-center justify-center gap-2 border-t pt-2 text-sm font-bold text-primary">Ver todos los resultados para “{query.trim()}” <ArrowRight className="h-4 w-4" /></Link>}
        </div>
      )}
    </div>
  )
}
