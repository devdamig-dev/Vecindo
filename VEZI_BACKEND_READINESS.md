# VEZI — Backend readiness

## Entidades propuestas

- `users` y `profiles`: identidad, preferencias y roles; autenticación separada del perfil público.
- `locations`: zonas normalizadas y, más adelante, coordenadas/radio de cobertura.
- `categories`: taxonomía compartida por demanda y oferta.
- `needs`: texto, categoría, ubicación, urgencia, presupuesto opcional, autor y timestamps.
- `need_responses`: propuesta, autor/prestador, estado y canal de contacto.
- `services`: oferta de profesionales/personas, cobertura y disponibilidad.
- `businesses`: base común; `business_type` distingue comercio de emprendimiento.
- `products`: catálogo opcional asociado a un negocio, no un marketplace P2P.
- `posts`: novedades secundarias de perfiles y zona.
- `favorites`: referencia polimórfica temporal a servicios, negocios, necesidades o posts.
- `notifications`: destinatario, evento, lectura y destino.
- `reviews`: reputación asociada a una interacción verificable.

## Relaciones

- Un perfil publica muchas necesidades, respuestas, ofertas y novedades.
- Una necesidad pertenece a categoría y ubicación y recibe muchas respuestas.
- Una respuesta puede vincular un servicio o negocio capaz de resolver la necesidad.
- Un negocio pertenece a un perfil propietario; puede tener productos y posts.
- Servicios y negocios cubren una o varias ubicaciones y categorías.
- Favoritos y notificaciones pertenecen a un usuario y apuntan a una entidad vigente.

## Estados

- Necesidad: `draft`, `published`, `matched`, `in_contact`, `resolved`, `cancelled`, `expired`.
- Respuesta: `sent`, `viewed`, `accepted`, `rejected`, `withdrawn`.
- Oferta/negocio/post: `draft`, `active`, `paused`, `archived`.
- Notificación: `unread`, `read`; entrega: `pending`, `sent`, `failed`.

## Datos demo a reemplazar

Hay perfiles, zona fija Hudson/Berazategui, necesidades y cantidad de respuestas, comercios, emprendimientos, servicios, reseñas, novedades, guardados, notificaciones y señales de actividad hardcodeados o persistidos en contexto/localStorage. Precios, ratings, contadores, tiempos relativos y afirmaciones como “responde rápido” deben derivarse de datos fechados, no presentarse como métricas reales.

## Componentes que deben consumir backend

Listados y detalles de los cuatro módulos; creación y respuesta de necesidades; búsqueda/filtros; perfiles; guardados; notificaciones; reseñas; novedades; configuración y “Mi actividad”. Matching, permisos, moderación, agregados, expiración y entrega de notificaciones deben vivir server-side.

## Riesgos antes de backend

1. Conviven nombres/rutas legacy (`services`/`servicios`, ayuda/comunidad y tipos marketplace) que requieren migración y redirects explícitos.
2. Las formas mock difieren entre pantallas; falta un repositorio/API adapter único.
3. No están definidos autorización, privacidad de contacto, moderación, anti-spam ni trazabilidad del match.
4. Categorías y ubicación todavía son strings; deben normalizarse antes de importar datos.
5. La UI de publicación ya valida lo básico, pero falta validación compartida, errores de red, reintentos y borradores.

## Recomendación

**NOT READY**. El core y los contratos principales están claros, pero antes de conectar Supabase hay que cerrar taxonomía, privacidad/permisos, estados/transiciones y una capa de acceso a datos consistente. Es razonable iniciar un spike técnico aislado, no una migración integral.

## Contrato de búsqueda para Supabase

La UI demo consulta un índice unificado, pero la implementación real debe exponer un endpoint/RPC que devuelva resultados agrupables con `id`, `entity_type`, `title`, `subtitle`, `url`, `location`, `category_id`, `distance`, `availability` y `rank`. Debe consultar `needs`, `services`, `businesses` y `products`; estos últimos mantienen su relación obligatoria `business_id` y nunca constituyen un marketplace separado.

Campos buscables: nombre/título, descripción, rubro/categoría, especialidades/tags y nombre/descripción de producto. Normalizar acentos, mayúsculas y sinónimos simples. Se recomiendan índices B-tree para claves/estado/categoría/ubicación y GIN sobre `tsvector` por entidad; trigramas solo si las pruebas reales justifican tolerancia a errores. El ranking inicial debe combinar relevancia textual, vigencia, misma zona, disponibilidad y cercanía simple, sin geolocalización compleja. Reservar un atributo explícito para resultados promocionados futuros sin incorporarlo al ranking orgánico ahora.

La API debe aceptar `query`, `entity_types`, `category_ids`, `location_id`, `limit` y `cursor`, devolver totales por tipo y no revelar contactos privados. Autocomplete requiere respuesta compacta y cancelable; la pantalla completa necesita paginación. Historial (`search_history`) y favoritos (`favorites`) requieren consentimiento, políticas RLS y borrado; no son requisito del primer release. Disponibilidad debe provenir de servicios/negocios activos, y ubicación de relaciones normalizadas, no de strings libres.

### Interfaz frontend pendiente

- Reemplazar `searchVezi()` por un adapter con estados `idle/loading/success/empty/error`, cancelación y debounce corto.
- Mantener la conversión del vacío en “Publicar necesidad”, conservando el texto buscado como borrador con consentimiento.
- Registrar clic/result impression solo tras definir privacidad y analytics; distinguir autocomplete de resultados completos.
- Aplicar RLS a necesidades, perfiles, negocios, productos, favoritos e historial; excluir borradores, pausados, bloqueados y vencidos.
