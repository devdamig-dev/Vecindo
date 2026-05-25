# VEZI Backend MVP Spec (Supabase/Postgres)

## 1) Visión del producto (MVP)

VEZI se define como una red local moderna de servicios, comercios y personas.
En backend MVP, el foco es:

- **Servicios como core** (descubrimiento, perfil, contacto, confianza básica).
- **Espacio comercial** como feed económico local (posts + catálogo básico).
- **Mercado** como módulo secundario y opcional.
- **Sponsor** como upgrade premium de visibilidad (sin pagos automáticos todavía).

Principios MVP:

- Un solo tipo de cuenta (`users`) con capacidades activables.
- Modelo simple y auditable en Postgres.
- Permisos claros con RLS de Supabase.
- Métricas básicas de uso (sin analytics complejas).
- Preparado para escalar sin sobreingeniería.

---

## 2) Modelo de usuario único

### 2.1. Concepto

No hay roles rígidos (residente/prestador/comercio). Existe **usuario único** y el usuario activa capacidades según necesidad.

Capacidades base:

- `offer_services`
- `has_business`
- `sponsor_enabled`
- `marketplace_enabled`

Esto ya está alineado con el tipado actual de frontend (`CapabilityKey`).

### 2.2. Diseño de tablas

- `users` (núcleo de identidad/autenticación)
- `user_profiles` (perfil visible y datos de cuenta)

Recomendación Supabase:

- `users.id` referencia a `auth.users.id` (UUID).
- Mantener información sensible en columnas privadas de `user_profiles`.
- Separar flags/capacidades en `users.capabilities` como `jsonb` o en columnas booleanas explícitas.

**Decisión MVP recomendada:** usar columnas booleanas en `users` para simplicidad inicial:

- `offer_services boolean default false`
- `has_business boolean default false`
- `sponsor_enabled boolean default false`
- `marketplace_enabled boolean default false`

---

## 3) Entidades principales (MVP)

### 3.1 `users`

Responsabilidad: identidad del usuario y estado global de cuenta.

Campos sugeridos:

- `id uuid pk` (igual a `auth.users.id`)
- `email text unique not null`
- `status text` (`active`, `paused`, `banned`)
- `offer_services boolean`
- `has_business boolean`
- `sponsor_enabled boolean`
- `marketplace_enabled boolean`
- `created_at timestamptz`
- `updated_at timestamptz`

### 3.2 `user_profiles`

Responsabilidad: perfil del usuario, datos públicos y privados.

Campos sugeridos:

- `user_id uuid pk fk -> users.id`
- `display_name text`
- `avatar_url text`
- `bio text`
- `zone_id uuid fk -> zones.id` (zona principal)
- `whatsapp_public text null` (si desea mostrar)
- `whatsapp_private text null` (interno/validación)
- `created_at`, `updated_at`

### 3.3 `zones`

Responsabilidad: segmentación territorial del piloto.

Campos:

- `id uuid pk`
- `name text unique`
- `slug text unique`
- `is_active boolean`
- `created_at`

### 3.4 `service_profiles`

Responsabilidad: configuración del usuario para ofrecer servicios.

Campos:

- `id uuid pk`
- `user_id uuid fk -> users.id unique`
- `headline text`
- `description text`
- `categories text[]`
- `service_zone_ids uuid[]` (MVP simple)
- `availability_text text`
- `is_public boolean default true`
- `rating_avg numeric(2,1) default 0`
- `reviews_count int default 0`
- `created_at`, `updated_at`

### 3.5 `services`

Responsabilidad: servicios concretos publicados por usuario.

Campos:

- `id uuid pk`
- `service_profile_id uuid fk -> service_profiles.id`
- `title text`
- `description text`
- `category text`
- `price_from numeric null`
- `is_active boolean default true`
- `created_at`, `updated_at`

### 3.6 `businesses`

Responsabilidad: entidad comercial administrada por usuario.

Campos:

- `id uuid pk`
- `owner_user_id uuid fk -> users.id`
- `zone_id uuid fk -> zones.id`
- `business_type text` (`commerce`, `entrepreneur`)
- `is_active boolean`
- `created_at`, `updated_at`

### 3.7 `business_profiles`

Responsabilidad: perfil público del negocio.

Campos:

- `business_id uuid pk fk -> businesses.id`
- `business_name text`
- `category text`
- `description text`
- `address_text text null`
- `hours_text text null`
- `whatsapp text`
- `phone text null`
- `logo_url text null`
- `banner_url text null`
- `rating_avg numeric(2,1) default 0`
- `reviews_count int default 0`
- `created_at`, `updated_at`

### 3.8 `products`

Responsabilidad: catálogo simple por negocio.

Campos:

- `id uuid pk`
- `business_id uuid fk -> businesses.id`
- `name text`
- `short_description text`
- `price numeric`
- `image_url text null`
- `is_active boolean`
- `created_at`, `updated_at`

### 3.9 `commercial_posts`

Responsabilidad: publicaciones del espacio comercial/feed.

Campos:

- `id uuid pk`
- `business_id uuid fk -> businesses.id`
- `post_type text` (promotion/news/event/launch/etc.)
- `title text`
- `description text`
- `image_url text null`
- `related_product_id uuid null fk -> products.id`
- `cta_label text null`
- `cta_url text null`
- `cta_intent text null`
- `zone_id uuid fk -> zones.id`
- `is_featured boolean default false`
- `is_sponsored boolean default false`
- `status text` (`draft`, `active`, `archived`)
- `published_at timestamptz null`
- `created_at`, `updated_at`

### 3.10 `sponsor_placements`

Responsabilidad: configuración de visibilidad premium (manual/operativa).

Campos:

- `id uuid pk`
- `business_id uuid fk -> businesses.id`
- `placement text` (`home_featured`, `stories`, `category_highlight`, `nearby_boost`)
- `status text` (`draft`, `active`, `paused`, `ended`)
- `starts_at timestamptz`
- `ends_at timestamptz`
- `priority int default 0`
- `created_by uuid fk -> users.id`
- `created_at`, `updated_at`

### 3.11 `saved_items`

Responsabilidad: guardados del usuario (servicios, comercios, productos, posts, etc.).

Campos:

- `id uuid pk`
- `user_id uuid fk -> users.id`
- `item_type text`
- `item_id uuid`
- `created_at`

Constraint sugerido:

- `unique(user_id, item_type, item_id)`

### 3.12 `reviews`

Responsabilidad: reseñas de servicios/negocios.

Campos:

- `id uuid pk`
- `author_user_id uuid fk -> users.id`
- `target_type text` (`service_profile`, `business`)
- `target_id uuid`
- `rating int check (rating between 1 and 5)`
- `comment text`
- `is_verified boolean default false`
- `created_at`, `updated_at`

### 3.13 `contact_events`

Responsabilidad: evento de contacto iniciado desde VEZI.

Campos:

- `id uuid pk`
- `actor_user_id uuid fk -> users.id`
- `target_type text` (`service_profile`, `business`, `commercial_post`, `product`)
- `target_id uuid`
- `channel text` (`whatsapp`, `phone`, `external_link`)
- `context text` (`directory`, `feed`, `product`, `marketplace`)
- `created_at`

### 3.14 `whatsapp_clicks`

Responsabilidad: métrica mínima de clics a WhatsApp.

Campos:

- `id uuid pk`
- `actor_user_id uuid fk -> users.id null` (si no logueado, null)
- `target_type text`
- `target_id uuid`
- `source_screen text`
- `created_at`

### 3.15 `notifications`

Responsabilidad: notificaciones in-app básicas.

Campos:

- `id uuid pk`
- `user_id uuid fk -> users.id`
- `type text`
- `title text`
- `body text`
- `data jsonb default '{}'`
- `read_at timestamptz null`
- `created_at`

---

## 4) Relaciones clave

- `users 1-1 user_profiles`
- `users 1-0..1 service_profiles`
- `service_profiles 1-N services`
- `users 1-N businesses` (aunque MVP puede iniciar con 1-N y política de producto de 1 activo)
- `businesses 1-1 business_profiles`
- `businesses 1-N products`
- `businesses 1-N commercial_posts`
- `businesses 1-N sponsor_placements`
- `users 1-N saved_items`
- `users 1-N reviews` (como autor)
- `users 1-N contact_events`
- `users 1-N notifications`
- `zones 1-N user_profiles/businesses/commercial_posts`

---

## 5) Datos públicos vs privados

### Públicos (lectura abierta)

- `user_profiles`: `display_name`, `avatar_url`, `bio`, `zone_id`, `whatsapp_public`.
- `service_profiles`: contenido visible del perfil y reputación agregada.
- `services`: listado activo.
- `business_profiles`, `products`, `commercial_posts` activos.
- `reviews` (sin datos sensibles del autor).

### Privados (solo dueño/admin)

- Flags internas de cuenta en `users`.
- `whatsapp_private` y cualquier dato operativo interno.
- Eventos (`contact_events`, `whatsapp_clicks`) a nivel fila de actor/propietario.
- `notifications` del usuario.
- Drafts y contenido inactivo.

---

## 6) Permisos MVP (RLS Supabase)

Patrón general:

- **read public** para contenido activo/publicado.
- **owner write**: solo dueño puede crear/editar/borrar sus recursos.
- **admin override** fuera de RLS vía service role en backend admin.

Resumen por entidad:

- `users`, `user_profiles`: usuario solo gestiona su propio registro.
- `service_profiles/services`: crear/editar solo si `users.offer_services = true`.
- `businesses/business_profiles/products/commercial_posts`: solo owner y solo si `users.has_business = true`.
- `sponsor_placements`: lectura pública si `status='active'`; escritura solo admin-operación (o owner + validaciones si se habilita autogestión).
- `saved_items`: solo el usuario dueño.
- `reviews`: cualquier usuario autenticado puede crear; edición/borrado solo autor.
- `contact_events`, `whatsapp_clicks`: inserción autenticada (o anónima parcial), lectura restringida a dueño del recurso y admin.
- `notifications`: solo destinatario.

---

## 7) Flujos MVP

### 7.1 Onboarding + capacidades

1. Usuario se registra (Supabase Auth).
2. Se crea `users` + `user_profiles`.
3. Usuario activa capacidades desde settings.
4. Backend habilita acciones según flags.

### 7.2 Publicar servicio

1. Requiere `offer_services=true`.
2. Crea/edita `service_profiles`.
3. Crea `services`.
4. Queda visible en directorio si `is_public` y `is_active`.

### 7.3 Crear espacio comercial

1. Requiere `has_business=true`.
2. Crea `businesses` + `business_profiles`.
3. Opcional: carga `products`.
4. Publica `commercial_posts`.

### 7.4 Sponsor (sin pagos reales)

1. Usuario con negocio solicita sponsor (flag `sponsor_enabled` y/o solicitud operativa).
2. Equipo VEZI activa `sponsor_placements` manualmente.
3. Feed prioriza posts con placement activo (`is_sponsored=true` cuando corresponda).

### 7.5 Guardados

1. Usuario guarda recurso en `saved_items`.
2. Se evita duplicado por constraint único.

### 7.6 Reseñas

1. Usuario autenticado deja reseña en `reviews`.
2. Trigger/recalc simple actualiza `rating_avg` y `reviews_count` en perfil objetivo.

### 7.7 Métrica básica de actividad

1. Cada click a WhatsApp crea `whatsapp_clicks`.
2. Cada CTA relevante crea `contact_events`.
3. Dashboard muestra agregados simples por rango de fechas.

---

## 8) Qué puede editar cada usuario

- Su propio `user_profiles`.
- Su `service_profiles` y sus `services` (si capacidad activa).
- Sus `businesses` relacionadas y su contenido (`business_profiles`, `products`, `commercial_posts`).
- Sus `saved_items`.
- Sus reseñas (solo edición propia).

No puede editar:

- Recursos de otros usuarios.
- `sponsor_placements` de forma directa en MVP (operación interna).

---

## 9) Orden recomendado de implementación

### Fase 1 — Base de cuenta y zona

1. Supabase Auth + tabla `users`.
2. `user_profiles`.
3. `zones`.
4. RLS base de dueño/public.

### Fase 2 — Core Servicios

5. `service_profiles`.
6. `services`.
7. `reviews` para servicios.
8. `saved_items`.

### Fase 3 — Espacio Comercial

9. `businesses` + `business_profiles`.
10. `products`.
11. `commercial_posts`.
12. `reviews` para negocios.

### Fase 4 — Sponsor + Métrica básica

13. `sponsor_placements` (operado manualmente).
14. `contact_events` + `whatsapp_clicks`.
15. `notifications` básicas.

### Fase 5 — Marketplace secundario

16. Activar modelo de marketplace como módulo aparte usando `marketplace_enabled`.

---

## 10) Fuera de alcance MVP

- Chat interno.
- Pagos/recaudación automática de sponsors.
- IA generativa/recomendaciones inteligentes.
- Analytics avanzadas (cohortes, atribución multicanal, etc.).
- Moderación automática compleja (solo herramientas básicas manuales).
- Multi-sucursal compleja por negocio.

---

## 11) Preparación específica para Supabase

- Usar `uuid` en todas las PK/FK.
- RLS habilitado en todas las tablas con datos de usuario.
- Índices mínimos:
  - `services(category, is_active)`
  - `businesses(zone_id, is_active)`
  - `commercial_posts(zone_id, status, published_at desc)`
  - `saved_items(user_id)`
  - `whatsapp_clicks(target_type, target_id, created_at)`
- Triggers:
  - `updated_at` automático.
  - Recalcular rating agregada en `service_profiles` y `business_profiles` al cambiar `reviews`.
- Vistas simples para frontend (ej. `commercial_feed_view`) evitando lógica duplicada.

---

## 12) Checklist de aceptación (este documento)

- [x] Existe `docs/backend-mvp-spec.md`.
- [x] Refleja modelo de usuario único con capacidades activables.
- [x] Define entidades mínimas solicitadas.
- [x] Define relaciones.
- [x] Define permisos.
- [x] Define flujos MVP.
- [x] Define orden de construcción.
- [x] No implementa backend todavía.
