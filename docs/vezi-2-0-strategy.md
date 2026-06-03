# VEZI 2.0 — Análisis Estratégico de Producto y Arquitectura

> **Estado:** Documento de planificación estratégica. No implementar hasta validación del equipo.
> **Fecha:** Junio 2026
> **Alcance:** Replanteo completo de producto, arquitectura de información y roadmap de evolución.

---

## Resumen Ejecutivo

VEZI evoluciona de "app para barrios cerrados" hacia **una red local de confianza** que conecta personas, servicios, emprendedores y comercios cercanos. Este documento define la nueva arquitectura, los modelos de datos, la navegación y el camino de migración desde la versión actual sin romper funcionalidades existentes.

El cambio no es cosmético. Es un reposicionamiento del modelo mental del usuario: de *"¿qué ofrece VEZI?"* a *"¿qué necesito yo hoy en mi barrio?"*.

---

## 1. Nueva Arquitectura de Información

### 1.1 Problema con la arquitectura actual

La IA actual está organizada desde la oferta:

| Módulo actual | Lógica implícita |
|---|---|
| Servicios | "Busco un profesional" |
| Espacio Comercial | "Quiero ver negocios" |
| Mercado | "Quiero comprar/vender cosas" |
| Ayuda | "Necesito reportar algo" |

El usuario debe entender **4 modelos mentales diferentes** para usar la plataforma. Cada módulo tiene su propia lógica, terminología y flujo. Esto genera fricción en el onboarding y limita la propuesta de valor integrada.

### 1.2 Nueva lógica: Demanda → Descubrimiento → Confianza

La nueva IA se organiza desde la **intención del usuario**:

```
¿Tengo una necesidad concreta? → NECESITO
¿Quiero explorar qué hay cerca?  → DESCUBRIR
¿Quiero conectar con mi comunidad? → COMUNIDAD
¿Tengo un negocio que gestionar?   → MI NEGOCIO
```

### 1.3 Principios de diseño de la nueva IA

1. **Demanda visible:** Las necesidades de la comunidad son contenido de primera clase, no solo búsquedas privadas.
2. **Oferta unificada:** Emprendedores, comercios y profesionales viven en el mismo espacio de descubrimiento.
3. **Confianza como infraestructura:** El sistema de verificación y reputación atraviesa todos los módulos.
4. **Sin checkout propio:** El cierre ocurre en WhatsApp. VEZI facilita, no intermedia.
5. **Desktop para gestionar, mobile para consumir:** Experiencias diferenciadas por dispositivo y contexto.

---

## 2. Nuevo Sitemap

```
VEZI 2.0
│
├── [Público]
│   ├── / ........................... Landing page
│   ├── /login ...................... Acceso (solo Google Login)
│   └── /unirse ..................... Onboarding inicial (zona, tipo de perfil)
│
└── [App autenticada — /app]
    │
    ├── INICIO (/app) ............... Feed personalizado
    │   ├── Historias de comercios y emprendedores
    │   ├── Nuevos en la zona
    │   ├── Necesidades recientes
    │   ├── Recomendaciones de vecinos
    │   └── Actividad de comunidad
    │
    ├── NECESITO (/app/necesito)
    │   ├── /app/necesito ........... Feed de necesidades de la zona
    │   ├── /app/necesito/nueva ..... Publicar necesidad
    │   ├── /app/necesito/[id] ...... Detalle de necesidad + postulaciones
    │   └── /app/necesito/mis ....... Mis necesidades publicadas
    │
    ├── DESCUBRIR (/app/descubrir)
    │   ├── /app/descubrir .......... Vista unificada con filtros
    │   ├── /app/descubrir?tipo=comercios
    │   ├── /app/descubrir?tipo=emprendedores
    │   ├── /app/descubrir?tipo=servicios
    │   └── /app/descubrir?tipo=productos
    │
    ├── PERFILES DE OFERTA
    │   ├── /app/comercio/[id] ...... Perfil público de comercio
    │   │   ├── Info (horarios, ubicación, contacto)
    │   │   ├── Catálogo (productos + servicios)
    │   │   └── Reseñas y recomendaciones
    │   └── /app/emprendedor/[id] ... Perfil público de emprendedor
    │       ├── Portafolio
    │       ├── Servicios y productos
    │       └── Reseñas y recomendaciones
    │
    ├── COMUNIDAD (/app/comunidad)
    │   ├── /app/comunidad .......... Feed comunitario
    │   ├── /app/comunidad/nueva .... Publicar en comunidad
    │   └── /app/comunidad/[id] ..... Detalle de publicación
    │
    ├── PERFIL (/app/perfil)
    │   ├── /app/perfil/[id] ........ Perfil público de cualquier usuario
    │   └── /app/perfil/editar ...... Editar mi perfil
    │
    ├── GUARDADOS (/app/guardados)
    │
    ├── CONFIGURACIÓN (/app/configuracion)
    │   ├── Cuenta y seguridad
    │   ├── Notificaciones
    │   ├── Privacidad
    │   └── Zona y ubicación
    │
    └── MI NEGOCIO (/app/mi-negocio) [solo roles emprendedor/comercio]
        ├── /app/mi-negocio ......... Dashboard resumen
        ├── /app/mi-negocio/catalogo
        │   ├── Lista de items
        │   ├── /catalogo/nuevo
        │   └── /catalogo/[id]/editar
        ├── /app/mi-negocio/pedidos . Pedidos recibidos vía VEZI
        ├── /app/mi-negocio/reputacion
        │   ├── Reseñas recibidas
        │   └── Recomendaciones
        ├── /app/mi-negocio/estadisticas
        │   ├── Vistas, contactos, conversiones
        │   └── Alcance por zona
        └── /app/mi-negocio/verificacion
            ├── Nivel de confianza actual
            └── Pasos para subir de nivel
```

---

## 3. Nuevo Modelo de Entidades

### 3.1 Entidades de Usuario

```typescript
// Perfil base — todos los usuarios
interface Persona {
  id: string
  name: string
  email: string
  avatarUrl?: string
  bio?: string
  zone: string
  neighborhood?: string
  memberSince: Date

  // Sistema de confianza
  trustLevel: 1 | 2 | 3 | 4 | 5
  verified: {
    google: boolean         // nivel 1 — automático con login
    phone: boolean          // nivel 2 — SMS
    dni: boolean            // nivel 3 — documento
  }

  // Reputación
  reputation: {
    score: number
    reviewsCount: number
    recommendationsReceived: number
    yearsActive: number
  }

  // Roles activos
  roles: UserRole[]
}

type UserRole = "persona" | "emprendedor" | "comercio"

// Extensión para emprendedores
interface EmprendedorProfile {
  userId: string
  businessName?: string
  headline: string           // "Fotografía de eventos y familias"
  category: string
  subcategories: string[]
  description: string
  whatsapp: string
  portfolio: PortfolioItem[]
  catalog: CatalogoItem[]
  verified: boolean
  verifiedAt?: Date
}

// Extensión para comercios
interface ComercioProfile {
  userId: string
  name: string
  description: string
  category: string
  address: string
  location: { lat: number; lng: number }
  hours: BusinessHours
  phone?: string
  whatsapp: string
  catalog: CatalogoItem[]

  // Verificación nivel 4
  verified: boolean
  cuit?: string
  verifiedAt?: Date
}
```

### 3.2 Entidades de Demanda

```typescript
// Necesidad publicada por un usuario
interface Necesidad {
  id: string
  userId: string
  title: string              // "Necesito plomero urgente"
  description: string
  category: NecesidadCategory
  urgency: "inmediata" | "esta_semana" | "sin_urgencia"
  budget?: {
    from?: number
    to?: number
    currency: "ARS"
    type: "hora" | "proyecto" | "mes"
  }
  location?: string          // zona genérica, no dirección exacta
  attachments: string[]      // imágenes opcionales
  status: "abierta" | "en_proceso" | "resuelta" | "cancelada"
  postulaciones: Postulacion[]
  createdAt: Date
  expiresAt?: Date
}

type NecesidadCategory =
  | "plomeria" | "electricidad" | "carpinteria" | "pintura"
  | "limpieza" | "mudanza" | "cuidado_personas" | "cuidado_animales"
  | "clases" | "tecnologia" | "diseno" | "fotografia"
  | "catering" | "eventos" | "otro"

// Postulación de un proveedor a una necesidad
interface Postulacion {
  id: string
  needId: string
  applicantId: string        // emprendedor o comercio
  message: string
  proposedPrice?: {
    amount: number
    currency: "ARS"
    type: "hora" | "proyecto" | "total"
  }
  status: "pendiente" | "aceptada" | "rechazada" | "retirada"
  createdAt: Date
}
```

### 3.3 Entidades de Oferta

```typescript
// Item de catálogo unificado (productos + servicios)
interface CatalogoItem {
  id: string
  ownerId: string
  ownerType: "emprendedor" | "comercio"
  type: "producto" | "servicio"
  name: string
  description: string
  price?: {
    amount: number
    currency: "ARS"
    unit?: string             // "por hora", "por kg", etc.
    isRange?: boolean
    max?: number
  }
  images: string[]
  category: string
  tags: string[]
  available: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// Pedido vía WhatsApp (no es checkout, es intención capturada)
interface PedidoWhatsApp {
  id: string
  customerId: string
  vendorId: string
  vendorType: "emprendedor" | "comercio"
  items: {
    catalogItemId: string
    name: string
    quantity: number
    unitPrice?: number
  }[]
  total?: number
  note?: string
  status: "borrador" | "enviado_a_whatsapp"
  createdAt: Date
}
```

### 3.4 Entidades de Comunidad

```typescript
// Post comunitario (fusiona Ayuda + Questions actuales)
interface ComunidadPost {
  id: string
  userId: string
  type: ComunidadPostType
  title?: string
  content: string
  images?: string[]
  location?: string
  tags?: string[]
  status: "activo" | "resuelto" | "cerrado"
  likes: number
  comments: ComunidadComment[]
  createdAt: Date
}

type ComunidadPostType =
  | "consulta"          // Pregunta a la comunidad
  | "recomendacion"     // "Recomiendo a..."
  | "aviso"             // Objetos perdidos, donaciones
  | "alerta"            // Urgencias, seguridad
  | "evento"            // Actividades del barrio

interface ComunidadComment {
  id: string
  userId: string
  content: string
  createdAt: Date
}
```

### 3.5 Entidades de Reputación

```typescript
// Reseña de servicio o producto
interface Resena {
  id: string
  reviewerId: string
  targetId: string
  targetType: "emprendedor" | "comercio" | "catalogo_item"
  score: 1 | 2 | 3 | 4 | 5
  title?: string
  content: string
  verified: boolean         // proviene de un pedido real
  helpful: number           // votos "fue útil"
  createdAt: Date
}

// Recomendación personal (estilo LinkedIn)
interface Recomendacion {
  id: string
  fromUserId: string
  toUserId: string
  targetType: "persona" | "emprendedor" | "comercio"
  relationship: string      // "cliente", "vecino", "colaborador"
  skills: string[]          // habilidades destacadas
  content: string
  createdAt: Date
}
```

### 3.6 Sistema de Confianza

```typescript
const TRUST_LEVELS = {
  1: {
    name: "Usuario registrado",
    badge: null,
    requirements: ["google_login"],
    capabilities: ["publicar_comunidad", "guardar_items", "contactar_via_whatsapp"]
  },
  2: {
    name: "Teléfono verificado",
    badge: "📱 Teléfono verificado",
    requirements: ["google_login", "phone_sms"],
    capabilities: ["publicar_necesidades", "postularse", "comprar_catalogo"]
  },
  3: {
    name: "Identidad verificada",
    badge: "✓ Identidad verificada",
    requirements: ["phone", "dni_scan"],
    capabilities: ["perfil_emprendedor", "recibir_recomendaciones"]
  },
  4: {
    name: "Comercio validado",
    badge: "🏪 Comercio validado",
    requirements: ["identity", "cuit", "address_proof"],
    capabilities: ["perfil_comercio_completo", "estadisticas_avanzadas"]
  },
  5: {
    name: "Profesional validado",
    badge: "⭐ Profesional verificado",
    requirements: ["identity", "matricula_or_certification"],
    capabilities: ["badge_profesional", "perfil_destacado"]
  }
} as const
```

---

## 4. Nueva Navegación Mobile

### 4.1 Bottom Navigation (5 ítems)

La nueva barra de navegación inferior reemplaza el modelo de 4 pestañas actuales.

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [  Inicio  ] [Necesito] [Descubrir] [Comunidad] [●]│
│     🏠  ·        🙋         🔍          👥      Mi  │
│                                               Negocio│
└─────────────────────────────────────────────────────┘
```

| Tab | Ícono | Color | Visible para |
|---|---|---|---|
| Inicio | Casa | Emerald | Todos |
| Necesito | Mano levantada | Amber | Todos (nivel 2+) |
| Descubrir | Brújula | Sky | Todos |
| Comunidad | Personas | Violet | Todos |
| Mi Negocio | Maletín | Rose | Solo emprendedor/comercio |

Cuando el usuario es solo Persona (sin negocio), el 5º tab muestra **Perfil** (ícono de persona).

### 4.2 Flujo de cada tab (mobile)

**Inicio:**
- Feed vertical tipo Instagram/LinkedIn
- Stories horizontales al tope (comercios + emprendedores)
- Cards de necesidades recientes
- Cards de nuevos en la zona
- Actividad de comunidad

**Necesito:**
- Lista de necesidades de la zona (para proveedores)
- Botón flotante "Publicar necesidad" (para usuarios)
- Filtros por categoría y urgencia
- Estado de mis necesidades (si el usuario publicó)

**Descubrir:**
- Chips de filtro sticky: Todo / Comercios / Emprendedores / Servicios / Productos
- Grid/lista según contenido
- Búsqueda con typeahead
- Mapa opcional (toggle)

**Comunidad:**
- Feed de posts locales
- Filtros: Consultas / Recomendaciones / Avisos / Alertas
- FAB para crear publicación
- Posts resolución visual (badge "Resuelto")

**Mi Negocio (mobile simplificado):**
- Resumen de actividad (notificaciones de pedidos, vistas, postulaciones)
- Acceso rápido a catálogo
- Acceso rápido a pedidos
- Deep link a vista desktop para gestión completa

---

## 5. Nueva Navegación Desktop

### 5.1 Layout general

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER: [VEZI logo] [zona] [búsqueda global] [notificaciones] [●] │
├────────────────┬─────────────────────────────────────────────────┤
│ SIDEBAR        │                                                 │
│                │  CONTENIDO PRINCIPAL                            │
│ Navegación     │                                                 │
│ principal      │  (varía según la sección seleccionada)          │
│                │                                                 │
│ Mi Negocio     │                                                 │
│ (expandible)   │                                                 │
│                │                                                 │
│ ── separador ──│                                                 │
│ Guardados      │                                                 │
│ Configuración  │                                                 │
│ Perfil/cuenta  │                                                 │
└────────────────┴─────────────────────────────────────────────────┘
```

### 5.2 Sidebar (desktop)

**Sección principal:**
```
○  Inicio
○  Necesito
○  Descubrir
○  Comunidad
```

**Mi Negocio (expandible, condicional):**
```
▼  Mi Negocio
   ○  Dashboard
   ○  Catálogo
   ○  Pedidos
   ○  Reputación
   ○  Estadísticas
   ○  Verificación
```

**Parte inferior:**
```
──────────────────
○  Guardados
○  Configuración
○  [Avatar] Mi perfil
   [Badge nivel de confianza]
```

### 5.3 Desktop-first: Mi Negocio

La sección Mi Negocio en desktop tiene un layout de 2 columnas:

```
┌──────────────────────────────────────────────────────────────────┐
│ SIDEBAR mi negocio  │  PANEL PRINCIPAL                           │
│                     │                                            │
│ Dashboard           │  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ Catálogo            │  │ Vistas   │ │ Pedidos  │ │ Reseñas  │  │
│   + Agregar item    │  │   1.2k   │ │    23    │ │   4.8★   │  │
│ Pedidos             │  └──────────┘ └──────────┘ └──────────┘  │
│ Reputación          │                                            │
│ Estadísticas        │  [Tabla de pedidos recientes / Catálogo]  │
│ Verificación        │                                            │
└─────────────────────┴────────────────────────────────────────────┘
```

**Dashboard:** KPIs, notificaciones, resumen semanal.
**Catálogo:** Tabla con imagen, nombre, precio, estado. Edición inline.
**Pedidos:** Lista de pedidos recibidos, estado, botón de respuesta en WhatsApp.
**Reputación:** Reseñas recibidas, recomendaciones, resumen de score.
**Estadísticas:** Gráficos de vistas, alcance, categorías más buscadas.
**Verificación:** Wizard de pasos para subir el nivel de confianza.

---

## 6. Migraciones Necesarias desde la Estructura Actual

### 6.1 Módulos → Nueva estructura

| Módulo actual | Destino nuevo | Tipo de migración |
|---|---|---|
| `/dashboard/services` (browse) | `/app/descubrir?tipo=servicios` | Redireccionamiento + refactor UI |
| `/dashboard/services/[id]` | `/app/emprendedor/[id]` | Renombrar ruta + unificar con Comercio profile |
| `/dashboard/services/manage` | `/app/mi-negocio/catalogo` | Absorber en Mi Negocio |
| `/dashboard/espacio-comercial` | `/app/inicio` (feed) | Contenido pasa al Home feed |
| `/dashboard/comercios` | `/app/descubrir?tipo=comercios` | Redireccionamiento |
| `/dashboard/comercios/[id]` | `/app/comercio/[id]` | Renombrar ruta |
| `/dashboard/marketplace` | `/app/descubrir?tipo=productos` | Filtro en Descubrir |
| `/dashboard/marketplace/[id]` | `/app/descubrir/[id]` | Ruta unificada |
| `/dashboard/ayuda` | `/app/comunidad` | Fusión de módulos |
| `/dashboard/questions` | `/app/comunidad` | Fusión de módulos |
| `/dashboard/pro` | `/app/mi-negocio` | Fusión de dashboards |
| `/dashboard/comercial` | `/app/mi-negocio` | Fusión de dashboards |
| `/dashboard/guardados` | `/app/guardados` | Solo cambio de ruta |
| `/dashboard/profile` | `/app/perfil` | Solo cambio de ruta |
| `/dashboard/settings` | `/app/configuracion` | Solo cambio de ruta |
| `/dashboard/suscripciones` | `/app/configuracion/planes` | Absorber en Configuración |
| `/dashboard/informacion-util` | Deprecar o mover a Comunidad | Evaluar uso real |
| `/dashboard/mi-barrio` | Deprecar (stub sin uso) | Eliminar |
| `/dashboard/pets` | Deprecar o mover a Comunidad | Evaluar uso real |

### 6.2 Tipos de usuario → Nueva taxonomía

| Tipo actual | Tipo nuevo | Cambio requerido |
|---|---|---|
| `"resident"` | `Persona` (trustLevel 1) | Renombrar |
| `"external_professional"` | `Persona` + rol `"emprendedor"` | Desacoplar tipo de rol |
| `"external_business"` | `Persona` + rol `"comercio"` | Desacoplar tipo de rol |
| *(nuevo)* | `Persona` con ambos roles | Soportar roles múltiples |

**Cambio clave:** El tipo de cuenta deja de ser un campo fijo. Un `Persona` puede activar el rol `emprendedor`, el rol `comercio`, o ambos. Esto elimina el concepto de `AccountType` como enum excluyente.

### 6.3 Modelos de datos → Nuevos esquemas

| Entidad actual | Entidad nueva | Cambios |
|---|---|---|
| `Service` (domain.ts) | `CatalogoItem` (type=servicio) | Unificar con productos |
| `CommerceItem` (commerces-data.ts) | `ComercioProfile` | Agregar location, hours verificados |
| `MarketplacePost` | `CatalogoItem` (type=producto, condition=usado) | Absorber en catálogo |
| `AyudaPost` (en componentes) | `ComunidadPost` (type=aviso/alerta) | Migrar tipo |
| `Question` (en componentes) | `ComunidadPost` (type=consulta) | Fusionar |
| *(no existe)* | `Necesidad` | Entidad nueva |
| *(no existe)* | `Postulacion` | Entidad nueva |
| *(no existe)* | `Resena` | Reemplaza reviews inline |
| *(no existe)* | `Recomendacion` | Entidad nueva |
| *(no existe)* | `PedidoWhatsApp` | Entidad nueva |

### 6.4 Migraciones de base de datos (Supabase)

**Tabla `profiles` — modificar:**
```sql
ALTER TABLE profiles ADD COLUMN trust_level INTEGER DEFAULT 1;
ALTER TABLE profiles ADD COLUMN verified_phone BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN verified_dni BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN roles TEXT[] DEFAULT ARRAY['persona'];
```

**Tabla `services` — deprecar:**
```sql
-- Migrar datos a catalogo_items con type='servicio'
-- Mantener tabla como legacy hasta migración completa
```

**Tabla `businesses` — modificar:**
```sql
ALTER TABLE businesses ADD COLUMN profile_type TEXT DEFAULT 'comercio';
-- profile_type: 'comercio' | 'emprendedor'
ALTER TABLE businesses ADD COLUMN cuit TEXT;
ALTER TABLE businesses ADD COLUMN verified_level INTEGER DEFAULT 0;
```

**Nuevas tablas:**
```sql
CREATE TABLE necesidades (...);
CREATE TABLE postulaciones (...);
CREATE TABLE catalogo_items (...);
CREATE TABLE pedidos_whatsapp (...);
CREATE TABLE comunidad_posts (...);  -- fusiona ayuda + questions
CREATE TABLE resenas (...);
CREATE TABLE recomendaciones (...);
```

### 6.5 Autenticación — simplificación

| Actual | Nuevo |
|---|---|
| Email + contraseña | Eliminar |
| Email + contraseña | Mantener solo para transición |
| Google Login | Obligatorio, flujo principal |
| Apple Login | Agregar (iOS) |
| Phone OTP | Agregar para verificación nivel 2 |

---

## 7. Riesgos y Oportunidades

### 7.1 Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| **Scope creep:** el replanteo genera una lista de features infinita | Alta | Alto | Priorizar por módulo. Separar análisis de implementación. |
| **Confusión de usuarios actuales** con el nuevo modelo de navegación | Media | Medio | Onboarding contextual, tooltips, migración progresiva (no big bang) |
| **Módulo Necesito requiere sistema de matching + notificaciones** complejo | Alta | Alto | Lanzar versión simple (sin algoritmo) primero: necesidades como posts planos |
| **Verificación DNI/CUIT** requiere integración con terceros (Renaper, AFIP) | Alta | Alto | Niveles 1-2 primero. DNI y CUIT en fase tardía. |
| **WhatsApp Business API** puede cambiar políticas o costos | Media | Medio | Mantener flujo de link directo (wa.me) que no depende de API oficial |
| **Desktop redesign duplica superficie de UI** sin equipo de diseño adicional | Alta | Medio | Desktop solo para Mi Negocio en fases iniciales. No rediseñar mobile + desktop simultáneamente. |
| **Migración de base de datos** desde estructura actual con datos de producción | Baja (hoy) → Alta (post-launch) | Alto | Planificar migraciones con backward compatibility. No eliminar tablas viejas hasta estabilizar. |
| **Supabase aún no integrado** (Sprint 2 pendiente): el replanteo añade complejidad sobre una base inestable | Alta | Alto | Completar integración Supabase antes de ejecutar el replanteo. |

### 7.2 Oportunidades

| Oportunidad | Potencial | Notas |
|---|---|---|
| **First-mover en red local LATAM** con modelo de confianza progresiva | Alto | No hay competidor directo que combine los 5 modelos de referencia en ecosistema local |
| **Módulo Necesito** crea demanda activa y visible, diferenciador único | Alto | Transforma VEZI de directorio pasivo a mercado activo |
| **Sistema de reputación** genera lock-in orgánico: el historial del usuario tiene valor | Alto | Similar al efecto de red de LinkedIn para profesionales |
| **WhatsApp como checkout** = cero fricción en conversión = adopción más rápida | Alto | Elimina la barrera del pago online en contexto LATAM |
| **Catálogo unificado** permite a emprendedores informales tener presencia digital estructurada | Alto | Segmento sub-atendido por plataformas actuales |
| **Desktop-first Mi Negocio** habilita sesiones largas de gestión = mayor retención | Medio | Diferenciador frente a apps solo mobile |
| **Perfil de Emprendedor** llena el gap entre "persona" y "empresa" para freelancers y micro-negocios | Alto | Enorme segmento en Argentina (fotografía, diseño, gastronomía casera, etc.) |
| **Trust levels como upsell** natural: verificar el DNI o CUIT es valor percibido, no solo paywall | Medio | Monetización no intrusiva vinculada a funcionalidades reales |

---

## 8. Roadmap Recomendado

El objetivo es **evolucionar sin romper**: cada fase entrega valor independientemente y el producto siempre es funcional.

### Fase 0 — Fundación (ahora → Sprint 3)
*Antes de rediseñar, consolidar la base.*

- [ ] Completar integración Supabase (tablas profiles, services, businesses)
- [ ] Unificar Ayuda + Questions → Comunidad (cambio de ruta + fusión de UI)
- [ ] Mover Mercado a un filtro dentro de Espacio Comercial (reduce tabs)
- [ ] Google Login como opción principal (mantener email como fallback)
- [ ] Definir nueva taxonomía de rutas (`/app/*` vs `/dashboard/*`)
- [ ] Crear `TRUST_LEVELS` enum en tipos
- [ ] **Resultado:** Base técnica más limpia. 2 módulos fusionados. Menos fricción de navegación.

### Fase 1 — Nueva Navegación y Descubrir (Sprint 4–5)
*Implementar el nuevo esqueleto navegacional visible.*

- [ ] Nuevo bottom nav (5 ítems: Inicio, Necesito, Descubrir, Comunidad, Perfil/Mi Negocio)
- [ ] Página `/app/descubrir` con filtros unificados (Comercios, Emprendedores, Servicios, Productos)
- [ ] Migrar Espacio Comercial → feed en `/app/inicio`
- [ ] Nuevos modelos: `Persona`, `EmprendedorProfile`, `ComercioProfile` (con roles desacoplados)
- [ ] Trust Level 1 automático + Level 2 (verificación por SMS)
- [ ] Rutas `/app/comercio/[id]` y `/app/emprendedor/[id]` con perfiles unificados
- [ ] **Resultado:** Usuario ve una sola forma de descubrir todo. IA visible y simple.

### Fase 2 — Necesito (Sprint 6–7)
*El diferenciador de producto.*

- [ ] Crear entidades `Necesidad` y `Postulacion` en Supabase
- [ ] Página `/app/necesito` con feed de necesidades de la zona
- [ ] Formulario `/app/necesito/nueva` con categorías, urgencia, presupuesto opcional
- [ ] Vista `/app/necesito/[id]` con postulaciones visibles
- [ ] Flujo de postulación para emprendedores/comercios
- [ ] Notificaciones básicas (email/in-app) para nuevas postulaciones
- [ ] **Resultado:** VEZI tiene demanda activa. Los proveedores ven oportunidades sin buscar.

### Fase 3 — Catálogos como Core (Sprint 8–9)
*La herramienta de negocio central.*

- [ ] Crear tabla `catalogo_items` en Supabase
- [ ] Mi Negocio → Catálogo (CRUD completo con imágenes)
- [ ] Items de catálogo visibles en perfil público de emprendedor/comercio
- [ ] Items de catálogo visibles en Descubrir (filtro productos/servicios)
- [ ] Flujo WhatsApp: seleccionar items → generar mensaje → abrir WhatsApp
- [ ] Migrar productos de `CommerceItem` actual a `catalogo_items`
- [ ] **Resultado:** Emprendedores y comercios tienen presencia digital real con catálogo gestionable.

### Fase 4 — Reputación y Confianza (Sprint 10–11)
*El moat competitivo.*

- [ ] Sistema de Reseñas (después de pedido/contacto)
- [ ] Sistema de Recomendaciones (LinkedIn-style, usuario a usuario)
- [ ] Badges de verificación visibles en perfiles
- [ ] Trust Level 3 (DNI) — integración básica manual o semi-automática
- [ ] Trust Level 4 (CUIT) — verificación de comercio
- [ ] Score de reputación visible en perfiles y Descubrir
- [ ] **Resultado:** La confianza se vuelve un dato concreto y visible. Red más segura.

### Fase 5 — Desktop Management (Sprint 12+)
*Retención de vendedores y proveedores.*

- [ ] Redesign desktop-first de Mi Negocio
- [ ] Layout 2 columnas: sidebar de Mi Negocio + panel principal
- [ ] Dashboard con KPIs, gráficos (Recharts existente), alertas
- [ ] Gestión de catálogo en tabla con edición inline
- [ ] Vista de pedidos con filtros y exportación
- [ ] Estadísticas de alcance por zona
- [ ] **Resultado:** Usuarios con negocio tienen razón para estar en VEZI desde desktop. Sesiones más largas y productivas.

### Vista de alto nivel del roadmap

```
Hoy          Q3 2026         Q4 2026         Q1 2027        Q2 2027
├── Fase 0 ──┤
             ├─── Fase 1 ────┤
                             ├─── Fase 2 ────┤
                                             ├─── Fase 3 ───┤
                                                            ├── Fase 4 ──┤
                                                                        ├── Fase 5 ──→
```

---

## Apéndice: Comparativa navegación actual vs nueva

### Mobile — Bottom Nav

```
ACTUAL (4 tabs)                    NUEVO (5 tabs)
┌────────────────────────┐         ┌────────────────────────────┐
│ Servicios│Comercial│   │         │Inicio│Necesito│Descubrir│  │
│ Ayuda   │Mercado   │   │         │Comunidad│Mi Negocio       │
└────────────────────────┘         └────────────────────────────┘

Problema: lógica de oferta          Solución: lógica de intención
```

### Cambio de modelo mental

```
ANTES: "¿En qué sección está lo que busco?"
   → Servicios (profesionales)
   → Espacio Comercial (negocios)
   → Mercado (cosas)
   → Ayuda (comunidad)

DESPUÉS: "¿Qué quiero hacer ahora?"
   → Descubrir qué hay cerca (Descubrir)
   → Publicar que necesito algo (Necesito)
   → Hablar con la comunidad (Comunidad)
   → Gestionar mi negocio (Mi Negocio)
```

---

*Documento generado como parte del proceso de replanteo estratégico de VEZI 2.0.*
*Próximo paso: validar con el equipo y definir qué fase iniciar primero según recursos disponibles.*
