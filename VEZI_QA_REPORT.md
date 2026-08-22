# VEZI — QA final de frontend

Fecha: 2026-08-22
Alcance: cierre pre-backend y landing v2.

## Cambios realizados

- Se reconstruyó la landing alrededor del flujo **necesidad → matching local → solución**, con hero conectado visualmente al producto, ejemplos cotidianos, explicación en tres pasos, cuatro módulos independientes, experiencia de resultado, propuesta para oferentes, Novedades, beneficios sin cifras inventadas y CTA final.
- Se reemplazó la paleta genérica sky/violet por la dirección Pulso Local: Ink, Off White, gradiente coral–magenta y colores diferenciados por módulo.
- Se resolvió la navegación mobile de la landing con estado expandido, etiquetas accesibles, cierre al navegar y destinos reales a Dashboard y creación de necesidad.
- En las fichas comerciales se consolidó la acción de producto como **Agregar al pedido** y el cierre como **Enviar pedido por WhatsApp**. El resumen Pedido rápido se presenta una sola vez por viewport (contenido móvil o sidebar desktop).
- Se retiraron de las superficies activas referencias al Mercado P2P, publicaciones usadas, guardados heredados y “Espacio comercial”. Los catálogos de Comercios y Emprendimientos se mantienen.
- El acceso a “Mi negocio” continúa condicionado por `canAccessMyBusiness`; una cuenta vecina ya no recibe un CTA a un marketplace anterior.

## Problemas encontrados

- El script `lint` no puede ejecutarse en este checkout porque ESLint 10 no encuentra un `eslint.config.*` y el proyecto no declara `eslint-config-next`.
- El modelo demo conserva tipos y adaptadores legacy de marketplace en la capa interna para compatibilidad de estado. Ya no se exponen en las superficies revisadas; su migración debe decidirse junto al esquema real.
- No hay navegador automatizado instalado en el entorno, por lo que la inspección visual y de consola se limitó a validación estática y build.

## Problemas pendientes

- Hacer smoke test visual en dispositivos reales (especialmente Safari iOS) antes de publicar.
- Definir política de migración o descarte para guardados legacy al conectar Supabase.
- Incorporar configuración ESLint compatible con Next 16 como tarea de tooling, sin mezclarla con el cierre funcional.
- Sustituir los eventos demo por telemetría real cuando exista backend; no crear cifras de producción hasta entonces.

## Verificaciones realizadas

- TypeScript sin errores con `npx tsc --noEmit`.
- Build de producción completo con 26 rutas generadas.
- Revisión por búsqueda textual de conceptos legacy y de lenguaje de carrito.
- Jerarquía de landing: un H1, secciones H2, navegación por anchors y CTAs a rutas existentes.

## Recomendación

### BACKEND READY

El frontend ya expresa el modelo aprobado y puede avanzar a integración con Supabase. Los pendientes son de tooling, migración de datos demo y QA visual final; no requieren agregar profundidad funcional.
