# VEZI – Auditoría de arquitectura y plan de corrección
## Documento de planificación. No implementar sin validación del equipo.

---

## 0. Por qué este documento existe

La iteración anterior tomó decisiones de navegación y estructura sin partir del modelo conceptual del producto. Se crearon módulos genéricos ("Descubrir", "Comunidad") que no existen en la visión de VEZI. Este documento corrige la dirección con base en la fuente de verdad del producto.

---

## 1. Los 4 pilares + Dashboard

```
┌─────────────────────────────────────────────────────────┐
│                    DASHBOARD VEZI                       │
│          Feed de novedades · Centro del ecosistema      │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │NECESITO  │ │SERVICIOS │ │COMERCIOS │ │EMPRENDIM.│  │
│  │Demanda   │ │Oferta    │ │Negocios  │ │Micro-    │  │
│  │activa    │ │profesion.│ │establec. │ │emprendedores│ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────┘
```

El Dashboard no es un módulo más. Es la capa que conecta todo: el feed de novedades que muestran la actividad de los 4 pilares.

---

## 2. Contradicciones detectadas entre estado actual y visión

### 2.1 Navegación incorrecta

| Estado actual (bottom nav) | Visión correcta |
|---|---|
| Servicios | Necesito |
| Descubrir | Servicios |
| [VEZI centro] | [VEZI centro] |
| Comunidad | Comercios |
| Mi Negocio / Perfil | Emprendimientos |

**Errores críticos:**
- "Descubrir" no existe en la visión. Fue creado incorrectamente.
- "Comunidad" no existe como pilar de navegación. Fue creado incorrectamente.
- "Necesito" debe ser el primer tab, no una sub-sección dentro de Servicios.
- "Comercios" y "Emprendimientos" son pilares independientes, no un filtro dentro de un módulo unificado.
- "Mi Negocio" no es un tab de navegación principal, es un panel de gestión contextual.

### 2.2 Módulos incorrectamente creados

| Módulo creado | Problema | Acción |
|---|---|---|
| `/dashboard/descubrir` | No existe en la visión. Mezcla conceptos que deben ser independientes. | Eliminar completamente |
| `/dashboard/comunidad` | No existe como pilar de navegación. Ayuda y Questions tienen otro destino. | Eliminar completamente |

### 2.3 Módulos que debían eliminarse y solo tienen redirect

| Ruta | Estado actual | Estado correcto |
|---|---|---|
| `/dashboard/marketplace` | Redirect a Descubrir | Eliminar completamente (no redirigir) |
| `/dashboard/espacio-comercial` | Redirect a Descubrir | Eliminar completamente |
| `/dashboard/marketplace/[id]` | Sigue existiendo | Eliminar |
| `/dashboard/marketplace/new` | Sigue existiendo | Eliminar |

### 2.4 Módulos que faltan completamente

| Módulo | Ruta requerida | Estado actual |
|---|---|---|
| Necesito | `/dashboard/necesito` | No existe |
| Comercios (listado) | `/dashboard/comercios` | Solo existe `/dashboard/comercios/[id]`, no hay página principal |
| Emprendimientos (listado) | `/dashboard/emprendimientos` | No existe |
| Emprendimientos (perfil) | `/dashboard/emprendimientos/[id]` | No existe (los perfiles están mezclados con Comercios) |

### 2.5 Modelo de datos incorrecto

| Problema | Descripción |
|---|---|
| `CommerceType = "commerce" \| "entrepreneur"` | Comercios y Emprendimientos comparten el mismo modelo `CommerceItem`. Deben separarse en entidades distintas porque tienen perfiles, campos y lógica diferente. |
| `CommercialModule` incluye `"marketplace"`, `"commercialSpace"`, `"discover"`, `"community"` | Tipos que corresponden a módulos que ya no existen o nunca debieron existir. |
| No existe entidad `Necesidad` | El módulo central de demanda no tiene modelo de datos. |
| No existe entidad `Respuesta` | Las respuestas a necesidades no tienen modelo. |

### 2.6 Componentes existentes que referencian conceptos eliminados

| Componente | Referencia problemática |
|---|---|
| `components/dashboard/quick-actions.tsx` | Links a "Mercado", "Espacio comercial" |
| `components/dashboard/mobile-header-menu.tsx` | `primaryModules` incluye `commercialSpace`, `marketplace` |
| `components/commercial/commercial-feed.tsx` | Módulo entero de Espacio Comercial, debe eliminarse |
| `components/marketplace/marketplace-grid.tsx` | Módulo entero de Mercado, debe eliminarse |
| `components/marketplace/marketplace-filters.tsx` | Módulo entero de Mercado, debe eliminarse |
| `lib/commercial.ts` | `MODULE_LABELS` y `MODULE_HREFS` con referencias a módulos eliminados |
| `app/dashboard/ayuda/page.tsx` | Exporta `ayudaPosts` y tipos como si fueran datos de una página; los tipos deben moverse a `/lib/types/` |

---

## 3. Listado completo de cambios necesarios

### 3.1 Eliminar (sin redirigir, borrado completo)

```
app/dashboard/descubrir/            ← creado incorrectamente
app/dashboard/comunidad/            ← creado incorrectamente
app/dashboard/marketplace/          ← concepto eliminado
app/dashboard/espacio-comercial/    ← concepto eliminado
components/marketplace/marketplace-grid.tsx
components/marketplace/marketplace-filters.tsx
components/commercial/commercial-feed.tsx
```

### 3.2 Crear (nuevo)

```
app/dashboard/necesito/page.tsx           ← módulo de demanda
app/dashboard/necesito/nueva/page.tsx     ← formulario publicar necesidad
app/dashboard/necesito/[id]/page.tsx      ← detalle necesidad + respuestas
app/dashboard/comercios/page.tsx          ← listado principal (falta)
app/dashboard/emprendimientos/page.tsx    ← módulo nuevo
app/dashboard/emprendimientos/[id]/page.tsx ← perfil emprendedor (separado de comercio)
lib/types/necesidad.ts                    ← entidad Necesidad
lib/types/respuesta.ts                    ← entidad Respuesta
lib/mocks/necesidades.ts                  ← datos mock para desarrollo
lib/mocks/emprendimientos.ts              ← datos mock separados de commerces
```

### 3.3 Refactorizar (modificar existentes)

```
lib/commercial.ts                         ← nuevo set de CommercialModule
lib/commerces-data.ts                     ← separar commerce y entrepreneur en arrays distintos
components/dashboard/bottom-nav.tsx       ← 4 tabs fijos: Necesito/Servicios/Comercios/Emprendimientos
components/dashboard/dashboard-sidebar.tsx ← nueva estructura
components/dashboard/mobile-header-menu.tsx ← actualizar primaryModules
components/dashboard/quick-actions.tsx    ← eliminar links a Mercado y Espacio Comercial
app/dashboard/page.tsx                    ← convertir en feed de Novedades (hoy es solo hub)
app/dashboard/services/page.tsx           ← revertir: quitar hero "Necesito" (Servicios solo muestra oferta)
app/dashboard/comercios/[id]/page.tsx     ← verificar que sea solo para type="commerce"
```

### 3.4 Mover (cambiar ubicación sin borrar contenido)

```
Tipos de AyudaPost, AyudaCategory, AyudaStatus
  → de app/dashboard/ayuda/page.tsx
  → a lib/types/ayuda.ts

ayudaPosts (datos mock)
  → de app/dashboard/ayuda/page.tsx
  → a lib/mocks/ayuda.ts

Tipos de Marketplace (Listing, etc.)
  → no mover, eliminar directamente
```

---

## 4. Nuevo sitemap

```
VEZI 2.0
│
├── [Público]
│   ├── / ................................. Landing page
│   └── /login ............................ Solo Google Login
│
└── [App — /dashboard]
    │
    ├── DASHBOARD (NOVEDADES) /dashboard
    │   ├── Feed: posts de personas, profesionales, comercios, emprendedores
    │   ├── Stories de comercios y emprendedores
    │   └── Accesos rápidos contextuales
    │
    ├── NECESITO /dashboard/necesito
    │   ├── /dashboard/necesito ........... Feed de necesidades publicadas
    │   ├── /dashboard/necesito/nueva ..... Publicar necesidad
    │   └── /dashboard/necesito/[id] ...... Detalle + respuestas recibidas
    │
    ├── SERVICIOS /dashboard/servicios (renombrar desde /services)
    │   ├── /dashboard/servicios .......... Directorio de profesionales
    │   ├── /dashboard/servicios/[id] ..... Perfil profesional
    │   ├── /dashboard/servicios/nuevo .... Publicar perfil profesional
    │   └── /dashboard/servicios/gestionar  Panel del profesional
    │
    ├── COMERCIOS /dashboard/comercios
    │   ├── /dashboard/comercios .......... Directorio de comercios
    │   └── /dashboard/comercios/[id] ..... Perfil de comercio
    │       ├── Info (horarios, ubicación, contacto)
    │       ├── Catálogo (productos)
    │       └── Reseñas
    │
    ├── EMPRENDIMIENTOS /dashboard/emprendimientos
    │   ├── /dashboard/emprendimientos .... Directorio de emprendedores
    │   └── /dashboard/emprendimientos/[id] Perfil de emprendedor
    │       ├── Historia personal
    │       ├── Catálogo (productos)
    │       └── Reseñas
    │
    ├── [Contenido social — accesible desde Dashboard]
    │   ├── /dashboard/ayuda/[id] ......... Detalle de aviso vecinal
    │   └── [posts de novedades — embebidos en el feed]
    │
    └── [Gestión y cuenta]
        ├── /dashboard/guardados .......... Guardados
        ├── /dashboard/profile ............ Perfil propio
        ├── /dashboard/settings ........... Configuración
        ├── /dashboard/suscripciones ...... Planes
        ├── /dashboard/informacion-util ... Info útil (bajo revisión de permanencia)
        └── MI NEGOCIO (panel contextual — solo roles comerciales)
            ├── /dashboard/comercial ...... Dashboard de negocio
            └── /dashboard/pro ............ Panel profesional
```

---

## 5. Nueva navegación mobile

### Bottom Nav (5 posiciones)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [Necesito]  [Servicios]  ●VEZI●  [Comercios] [Emprendim.]  │
│     🙋‍♀️          🔧         🏠        🏪        ✦           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

| Posición | Label | Ruta | Ícono | Color activo |
|---|---|---|---|---|
| 1 (izq) | Necesito | `/dashboard/necesito` | HandRaised | Amber |
| 2 (izq) | Servicios | `/dashboard/servicios` | Wrench | Sky |
| Centro | VEZI | `/dashboard` | Home | Gradient sky→violet |
| 3 (der) | Comercios | `/dashboard/comercios` | Store | Violet |
| 4 (der) | Emprendimientos | `/dashboard/emprendimientos` | Sparkles | Emerald |

**Reglas:**
- Los 4 tabs + centro son siempre visibles, sin condicionales.
- "Mi Negocio" no aparece en el bottom nav. Es un panel que se accede desde el perfil o desde dentro de cada módulo.
- El centro nunca cambia. Siempre lleva al Dashboard/Novedades.

### Flujos por tab (mobile)

**Necesito:**
- Feed de necesidades publicadas en la zona
- FAB "Publicar necesidad" (siempre visible)
- Categorías de filtro horizontal
- Tap en necesidad → detalle + respuestas
- Si el usuario es prestador → ve las necesidades como oportunidades

**Servicios:**
- Directorio de profesionales (búsqueda + filtro por categoría)
- Perfil tipo Google Business + LinkedIn
- Contacto directo por WhatsApp
- Sistema de reseñas y validaciones

**VEZI (centro):**
- Feed de Novedades cronológico/algorítmico
- Posts de cualquier tipo de usuario
- Stories de comercios y emprendedores
- Widget de necesidades recientes
- Actividad de la zona

**Comercios:**
- Directorio de negocios establecidos
- Búsqueda por nombre o categoría
- Perfil con horarios, ubicación, catálogo, reseñas

**Emprendimientos:**
- Directorio de microemprendedores
- Perfil más personal/humano
- Catálogo de productos
- Historia y contexto del emprendimiento

---

## 6. Nueva navegación desktop

### Layout general

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER: VEZI logo | zona | búsqueda | notificaciones | perfil  │
├────────────────┬─────────────────────────────────────────────────┤
│ SIDEBAR        │                                                  │
│                │  PANEL PRINCIPAL                                 │
│ ── Explorar ── │                                                  │
│  Novedades     │  (contenido según sección activa)               │
│  Necesito      │                                                  │
│  Servicios     │                                                  │
│  Comercios     │                                                  │
│  Emprendim.    │                                                  │
│                │                                                  │
│ ── Mi negocio ─│                                                  │
│  Dashboard     │  (solo si tiene rol comercial)                  │
│  Catálogo      │                                                  │
│  Pedidos       │                                                  │
│  Reputación    │                                                  │
│  Estadísticas  │                                                  │
│                │                                                  │
│ ── Mi cuenta ──│                                                  │
│  Guardados     │                                                  │
│  Planes        │                                                  │
│  Perfil        │                                                  │
│  Configuración │                                                  │
└────────────────┴─────────────────────────────────────────────────┘
```

### Desktop-first: Panel Mi Negocio

```
┌──────────────────┬───────────────────────────────────────────────┐
│ SIDEBAR          │ CONTENIDO                                      │
│ Mi Negocio       │                                               │
│ ─────────────── │ KPIs: Vistas · Contactos · Pedidos · Rating   │
│  Dashboard   ●  │                                               │
│  Catálogo       │ [Tabla/Grid de productos - edición inline]     │
│  Pedidos        │                                               │
│  Reputación     │ [Últimas reseñas]                             │
│  Estadísticas   │                                               │
│  Verificación   │ [Gráfico de alcance semanal]                  │
└──────────────────┴───────────────────────────────────────────────┘
```

**Mobile = consumir / Desktop = gestionar** (sin excepciones).

---

## 7. Plan de migración desde estructura actual

### Archivos a eliminar

```bash
# Módulos incorrectos creados en la iteración anterior
rm app/dashboard/descubrir/page.tsx
rm app/dashboard/comunidad/page.tsx

# Módulos eliminados definitivamente
rm app/dashboard/marketplace/page.tsx
rm app/dashboard/marketplace/[id]/page.tsx
rm app/dashboard/marketplace/new/page.tsx
rm app/dashboard/marketplace/marketplace-grid.tsx   # (si existe aquí)
rm app/dashboard/espacio-comercial/page.tsx

# Componentes de módulos eliminados
rm components/marketplace/marketplace-grid.tsx
rm components/marketplace/marketplace-filters.tsx
rm components/commercial/commercial-feed.tsx
```

### Renombrar rutas

| Ruta actual | Ruta nueva | Notas |
|---|---|---|
| `/dashboard/services` | `/dashboard/servicios` | Redirigir la vieja |
| `/dashboard/services/[id]` | `/dashboard/servicios/[id]` | Redirigir la vieja |
| `/dashboard/services/new` | `/dashboard/servicios/nuevo` | Redirigir la vieja |
| `/dashboard/services/manage` | `/dashboard/servicios/gestionar` | Redirigir la vieja |

### Migración de datos de `commerces-data.ts`

```typescript
// HOY: un solo array mezclado
export const commerces: CommerceItem[] = [
  { type: "commerce", ... },  // x3
  { type: "entrepreneur", ... } // x3
]

// NUEVO: arrays separados con tipos distintos
export const comercios: Comercio[] = [...]      // lib/mocks/comercios.ts
export const emprendimientos: Emprendimiento[] = [...] // lib/mocks/emprendimientos.ts
```

### Migración del módulo Ayuda

Ayuda no es un pilar de navegación, pero el contenido vecinal (mascotas perdidas, donaciones, objetos) sigue teniendo valor. Opciones:

**Opción A (recomendada):** Los posts de Ayuda se convierten en un tipo de post del feed de Novedades del Dashboard. El usuario los crea desde el Dashboard con categoría "aviso vecinal". El `/dashboard/ayuda/[id]` sigue existiendo para el deep link, pero no hay tab de navegación.

**Opción B:** Quedan dentro de Necesidades (categoría "ayuda vecinal") ya que son demandas de la comunidad.

En cualquier caso: el directorio `app/dashboard/ayuda/` con su página principal desaparece como destino de navegación directo.

### Migración de `CommercialModule` (lib/commercial.ts)

```typescript
// HOY (módulos a eliminar del tipo)
"marketplace" | "commercialSpace" | "discover" | "community"

// NUEVO (reemplazar con)
"necesito" | "comercios" | "emprendimientos"

// El tipo final quedaría:
type CommercialModule =
  | "home"                    // Dashboard/Novedades
  | "necesito"                // Módulo demanda
  | "servicios"               // Directorio profesionales
  | "comercios"               // Directorio comercios
  | "emprendimientos"         // Directorio emprendedores
  | "myBusiness"              // Panel gestión (condicional)
  | "serviceManagement"       // Panel profesional (condicional)
  | "professionalDashboard"   // (revisar si se fusiona con serviceManagement)
  | "saved"
  | "usefulInfo"
  | "subscriptions"
  | "profile"
  | "settings"
```

---

## 8. Componentes a eliminar

### Eliminación definitiva

| Componente | Motivo |
|---|---|
| `components/commercial/commercial-feed.tsx` | Módulo Espacio Comercial eliminado |
| `components/marketplace/marketplace-grid.tsx` | Módulo Mercado eliminado |
| `components/marketplace/marketplace-filters.tsx` | Módulo Mercado eliminado |
| `app/dashboard/marketplace/` (directorio completo) | Módulo Mercado eliminado |
| `app/dashboard/espacio-comercial/page.tsx` | Módulo Espacio Comercial eliminado |
| `app/dashboard/descubrir/page.tsx` | Creado incorrectamente |
| `app/dashboard/comunidad/page.tsx` | Creado incorrectamente |

### Limpieza de referencias

| Componente | Qué limpiar |
|---|---|
| `components/dashboard/quick-actions.tsx` | Eliminar links a Mercado y Espacio Comercial |
| `components/dashboard/mobile-header-menu.tsx` | Actualizar `primaryModules` con nueva nav |
| `app/dashboard/page.tsx` | Eliminar módulos cards de Mercado/Espacio Comercial |
| `lib/commercial.ts` | Eliminar entries de módulos que no existen |
| `lib/types/commercial-posts.ts` | Evaluar si `CommercialPost` sigue siendo relevante o se reemplaza por el modelo de Novedades |

---

## 9. Componentes a refactorizar

### Refactorización mayor

| Componente | Cambios necesarios |
|---|---|
| `components/dashboard/bottom-nav.tsx` | Reescribir con 4 tabs fijos: Necesito / Servicios / Comercios / Emprendimientos. Sin lógica condicional de tabs. |
| `components/dashboard/dashboard-sidebar.tsx` | Nueva estructura: Explorar (Novedades/Necesito/Servicios/Comercios/Emprendimientos) + Mi Negocio (condicional) + Mi Cuenta |
| `app/dashboard/page.tsx` | Transformar en feed de Novedades. Hoy es un hub de accesos rápidos; debe ser un feed dinámico tipo LinkedIn. |
| `app/dashboard/services/page.tsx` | Revertir cambios de la iteración anterior. Servicios es SOLO directorio de oferta. Quitar el hero "Necesito" (Necesito tiene su propio módulo). |
| `lib/commercial.ts` | Tipo CommercialModule completamente renovado. Hrefs y labels actualizados. |
| `lib/commerces-data.ts` | Separar en dos fuentes: `comercios` y `emprendimientos`. |

### Refactorización menor

| Componente | Cambios necesarios |
|---|---|
| `components/business/commerce-profile-client.tsx` | Verificar que sea exclusivo de Comercios. Si tiene lógica de Emprendimientos, extraerla. |
| `components/business/comercios-page-content.tsx` | Renombrar y asegurarse de que solo muestre type="commerce" |
| `components/services/services-list.tsx` | Renombrar internamente a "servicios". Sin cambios funcionales. |
| `components/dashboard/mobile-header-menu.tsx` | Actualizar primaryModules y contextualModules |
| Todos los imports de `@/app/dashboard/ayuda/page` | Mover tipos y datos a `/lib/types/ayuda.ts` y `/lib/mocks/ayuda.ts` |

---

## 10. Plan de implementación por etapas

### Etapa 0 — Limpieza (prerrequisito, sin nuevas features)

**Objetivo:** Dejar el código limpio antes de construir.

- [ ] Eliminar `/dashboard/descubrir` y `/dashboard/comunidad`
- [ ] Eliminar `/dashboard/marketplace` (directorio completo)
- [ ] Eliminar `/dashboard/espacio-comercial`
- [ ] Eliminar `components/marketplace/` (ambos archivos)
- [ ] Eliminar `components/commercial/commercial-feed.tsx`
- [ ] Mover tipos y datos de ayuda a `/lib/types/ayuda.ts` y `/lib/mocks/ayuda.ts`
- [ ] Limpiar referencias a módulos eliminados en `quick-actions.tsx`, `mobile-header-menu.tsx`
- [ ] Revertir `services/page.tsx` (quitar hero Necesito que fue agregado incorrectamente)
- [ ] Actualizar `lib/commercial.ts` con el nuevo tipo `CommercialModule`

**Resultado:** La app queda con Servicios como único módulo funcional de oferta, el Dashboard como hub, y sin módulos fantasma.

---

### Etapa 1 — Navegación correcta + módulos de oferta

**Objetivo:** Implementar la estructura de navegación definitiva con los módulos de oferta listos.

- [ ] Reescribir `bottom-nav.tsx`: 4 tabs fijos (Necesito / Servicios / Comercios / Emprendimientos)
- [ ] Reescribir `dashboard-sidebar.tsx`: nueva estructura
- [ ] Crear `/dashboard/comercios/page.tsx` (listado principal — falta actualmente)
- [ ] Separar datos: crear `/lib/mocks/comercios.ts` y `/lib/mocks/emprendimientos.ts`
- [ ] Crear `/dashboard/emprendimientos/page.tsx` (módulo nuevo)
- [ ] Crear `/dashboard/emprendimientos/[id]/page.tsx` (perfil emprendedor, distinto a comercio)
- [ ] Renombrar rutas de services → servicios (con redirect de la vieja)

**Resultado:** La navegación refleja los 4 pilares. Los 3 módulos de oferta (Servicios, Comercios, Emprendimientos) son independientes y navegables.

---

### Etapa 2 — Módulo Necesito

**Objetivo:** Implementar el módulo de demanda, el diferenciador central de VEZI.

- [ ] Definir entidades: `lib/types/necesidad.ts`, `lib/types/respuesta.ts`
- [ ] Crear datos mock: `lib/mocks/necesidades.ts`
- [ ] Crear `/dashboard/necesito/page.tsx` (feed de necesidades de la zona)
- [ ] Crear `/dashboard/necesito/nueva/page.tsx` (formulario: categoría / título / descripción / zona / urgencia / fotos)
- [ ] Crear `/dashboard/necesito/[id]/page.tsx` (detalle de necesidad + respuestas recibidas)
- [ ] Implementar el flujo de respuesta (prestadores pueden responder desde la app)
- [ ] (Notificaciones — diferir a Etapa 4)

**Resultado:** El módulo de demanda es funcional en su flujo básico. Los usuarios pueden publicar necesidades y recibir respuestas.

---

### Etapa 3 — Dashboard como feed de Novedades

**Objetivo:** Transformar el Dashboard de hub estático a feed dinámico.

- [ ] Definir el modelo de `NovedadPost` (quién puede publicar, qué tipos hay)
- [ ] Rediseñar `app/dashboard/page.tsx` como feed vertical
- [ ] Stories horizontales de Comercios y Emprendimientos al tope
- [ ] Feed de posts cronológico (personas, profesionales, comercios, emprendedores)
- [ ] Widget de necesidades recientes (últimas 3 del módulo Necesito)
- [ ] Integrar posts de Ayuda vecinal como tipo de publicación del feed

**Resultado:** Al abrir VEZI se ve actividad real de la zona, no accesos rápidos a módulos.

---

### Etapa 4 — Catálogos y pedidos WhatsApp

**Objetivo:** Hacer de los catálogos una feature de primer nivel.

- [ ] Definir entidad `CatalogoItem` unificada para Comercios y Emprendimientos
- [ ] CRUD de catálogo en `/dashboard/comercial` (gestión)
- [ ] Vista de catálogo en perfiles de Comercio y Emprendimiento
- [ ] Flujo "Agregar a pedido" → carrito liviano → mensaje WhatsApp generado
- [ ] (Sin checkout propio: el cierre ocurre en WhatsApp)

**Resultado:** Comercios y Emprendimientos tienen presencia digital real con catálogo gestionable. El flujo de pedido funciona sin fricción.

---

### Etapa 5 — Sistema de confianza y reputación

**Objetivo:** Hacer de la confianza una ventaja competitiva.

- [ ] Trust Level 1: Google Login (automático, ya parcialmente implementado)
- [ ] Trust Level 2: Teléfono validado (SMS OTP)
- [ ] Sistema de reseñas para Servicios, Comercios y Emprendimientos
- [ ] Sistema de recomendaciones (vecino a vecino, sobre prestadores)
- [ ] Badges de verificación en perfiles
- [ ] Trust Level 3: DNI validado (integración a definir)
- [ ] Trust Level 4: CUIT/Comercio validado

**Resultado:** La reputación es un dato concreto y visible. La confianza diferencia a VEZI de cualquier directorio genérico.

---

### Etapa 6 — Desktop Mi Negocio

**Objetivo:** Retención de usuarios con actividad comercial vía experiencia desktop.

- [ ] Layout 2 columnas para `/dashboard/comercial` (sidebar Mi Negocio + panel principal)
- [ ] Dashboard con KPIs, gráficos (Recharts — ya instalado)
- [ ] Gestión de catálogo en tabla con edición inline
- [ ] Vista de pedidos con filtros
- [ ] Estadísticas de alcance por zona
- [ ] Panel de reputación: reseñas recibidas + recomendaciones
- [ ] Wizard de verificación (Trust Levels)

**Resultado:** Usuarios con negocio tienen una herramienta real de gestión. Las sesiones desktop son productivas.

---

## Resumen visual del roadmap

```
Hoy         Etapa 0       Etapa 1       Etapa 2       Etapa 3
├── Limpiar ─┤
             ├─ Nav + ─────┤
               Oferta
                           ├── Necesito ─┤
                                         ├── Dashboard ─┤
                                           Novedades

Etapa 3       Etapa 4       Etapa 5       Etapa 6
             ├── Catálogos ─┤
                            ├── Confianza ─┤
                                          ├── Desktop ──→
```

---

## Principios para las próximas iteraciones

1. **Los 4 pilares son independientes.** Nunca fusionar Necesito + Servicios, ni Comercios + Emprendimientos en un módulo "Descubrir".
2. **Necesito es demanda. Servicios es oferta. Son complementarios, no lo mismo.**
3. **El Dashboard conecta, no duplica.** El feed muestra actividad de todos los pilares, pero no reemplaza a ninguno.
4. **Comercios ≠ Emprendimientos.** Tienen perfiles, lógica y tono distintos aunque ambos tengan catálogo.
5. **Mi Negocio es un panel de gestión contextual, no un tab de navegación.**
6. **Mercado no existe. Espacio Comercial no existe.** Si aparece alguna referencia, es un error.

---

*Fuente de verdad: documento de visión entregado por el equipo de producto (Junio 2026).*
*Este documento reemplaza a `docs/vezi-2-0-strategy.md` en todo lo que contradiga.*
