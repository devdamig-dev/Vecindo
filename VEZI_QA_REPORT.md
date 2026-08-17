# QA integral de VEZI

Fecha: 2026-08-15. Alcance: inspección funcional y visual del repositorio, inventario de rutas, búsqueda de enlaces/conceptos legacy, validación responsive local y checks de calidad. El entorno no permitió acceder al deployment de Vercel (respuesta 401/403), por lo que la validación ejecutable se realizó contra el build local.

## 🔴 Bloqueantes

- **Flujo principal incompleto:** “Publicar necesidad” apuntaba a una ruta inexistente; tampoco existía detalle. Se añadieron creación simplificada, confirmación y detalle/respuesta.
- **Notificaciones sin destino:** la campana era un botón sin acción. Ahora abre una bandeja coherente con respuestas a necesidades.
- **Enlaces rotos en Guardados:** el estado vacío enviaba a Mercado y Espacio comercial, rutas inexistentes/legacy. Se reemplazaron por Necesidades, Servicios y Comercios.
- **Backend:** faltan permisos, privacidad de contacto, moderación, estados y adapter de datos. No conectar producción hasta resolverlos.

## 🟠 Importantes

- Persisten rutas y tipos internos legacy para compatibilidad. Deben migrarse con estrategia de datos, no borrarse a ciegas.
- Los datos demo se mezclan con lenguaje de actividad real. Toda métrica debe etiquetarse como demo o calcularse desde eventos.
- Formularios secundarios aún no comparten validación/esquemas ni estados uniformes de error/red.
- Novedades/ayuda/comunidad se solapan conceptualmente; conviene consolidarlos en una única capa secundaria “Novedades”.
- La búsqueda actual necesita un índice común sobre necesidades, servicios, comercios y emprendimientos.

## 🟢 Mejoras

- El dashboard dejó de ser una grilla de accesos: ahora comienza con demanda, muestra necesidades activas, oferta capaz de resolverlas y novedades al final.
- Se reforzó el ritmo de color conservando ámbar, celeste, violeta y esmeralda por módulo.
- Las cards ahora distinguen intención principal, demanda activa, descubrimiento, información de sistema y novedades.
- El formulario principal usa divulgación progresiva: intención, categoría, ubicación y urgencia; descripción/presupuesto son opcionales.
- Próximo refinamiento: tests E2E del matching, accesibilidad con lector de pantalla y screenshots de regresión por breakpoint.

## ¿VEZI está realmente listo para backend?

**No: NOT READY.** La dirección de producto ya es consistente y el recorrido crítico tiene una base funcional, pero el frontend aún contiene modelos legacy y mocks heterogéneos. La conexión definitiva sería prematura sin resolver autorización/privacidad, normalizar categorías/ubicaciones, definir transiciones de estado y colocar un adapter entre componentes y Supabase. Esas decisiones reducen retrabajo y evitan convertir datos demo en comportamiento contractual accidental.
