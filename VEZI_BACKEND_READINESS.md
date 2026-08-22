# VEZI — Backend readiness

Fecha: 2026-08-22

## Cambios que impactan backend

- El producto queda organizado alrededor de **Necesidades, Servicios, Comercios, Emprendimientos y Novedades**. Los productos no son una entidad de marketplace independiente: siempre pertenecen al catálogo de un Comercio o Emprendimiento.
- El pedido comercial es una selección temporal de productos que genera contacto directo por WhatsApp. En esta etapa no implica carrito persistente, checkout, pagos, stock reservado ni orden procesada por VEZI.
- Las capacidades existentes se usan para mostrar “Mi negocio” sólo cuando corresponde. El backend debe modelar capacidades combinables (vecino, prestador, comercio y emprendimiento), no un rol único excluyente.
- Los guardados visibles aceptan comercios, productos de catálogo, servicios, publicaciones comerciales, ayuda y novedades. Los registros `marketplace_item` quedan ocultos y requieren una decisión explícita de migración o descarte.
- Las métricas y señales actuales son demo. Los componentes deben recibir agregados derivados de eventos reales; ningún valor demo debe persistirse como dato productivo.

## Decisiones cerradas

1. Novedades permanece como capa de actividad local y en la parte superior del Dashboard.
2. El buscador global conserva alcance transversal; los módulos mantienen buscadores internos.
3. Comercios y Emprendimientos son módulos independientes aunque puedan compartir infraestructura de catálogo.
4. Una Necesidad puede recibir respuestas y vincularse con oferta local relevante.
5. No se implementan planes pagos, sponsors, delivery, garantías, verificación ni matching avanzado en esta etapa.

## Problemas encontrados

- Existen tipos internos históricos (`marketplace_item`, flags y contadores relacionados) dentro del estado demo. No bloquean la UI ni el backend nuevo, pero no deben trasladarse automáticamente al esquema productivo.
- Los mocks combinan contenido de presentación con señales calculadas; al integrar Supabase se debe separar entidad, evento y agregado analítico.

## Pendientes de implementación backend

- Autenticación y perfiles con capacidades combinables.
- CRUD, estados, respuestas y notificaciones de Necesidades.
- Perfiles de Servicios, Comercios y Emprendimientos, con catálogos asociados.
- Novedades por zona y reglas de visibilidad.
- Guardados polimórficos sólo para entidades vigentes.
- Registro de eventos para vistas, búsquedas, apertura de catálogo, consultas y pedidos iniciados.
- Políticas RLS, moderación mínima, estados vacíos/reintentos y observabilidad.

## Mejoras futuras (no bloqueantes)

- Validación visual automatizada multi-viewport.
- Definición de analítica y retención después de contar con eventos reales.
- Monetización o prioridad de exposición sólo después de validar el piloto.

## Recomendación

### BACKEND READY

La arquitectura de frontend está suficientemente cerrada para comenzar Supabase. La primera migración debe excluir el marketplace P2P histórico y tratar las métricas demo como placeholders, no como datos iniciales.
