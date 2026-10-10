# ✅ KAOS Agency — Informe de QA

Probado en servidor local (Chromium preview) en desktop (1280) y móvil (375). Sin errores en consola.

## Funcionalidad
| Prueba | Resultado |
|---|---|
| Loader (home, ≤1,5s, doble red de seguridad CSS+JS) | ✅ |
| Nav transparente → sólida al hacer scroll | ✅ |
| Scrollspy (resalta sección activa) | ✅ |
| Menú hamburguesa móvil (abre/cierra, anima ☰→✕) | ✅ |
| Scroll suave por anclas + botón volver-arriba | ✅ |
| Barra de progreso de scroll | ✅ |
| Marquesina CSS en loop (pausa al hover) | ✅ |
| Contadores animados al entrar en viewport | ✅ |
| Portfolio: filtro por categoría (Todos/RRSS/Contenido/Branding/Personal) | ✅ verificado (branding → DARSS, Palm Tribe, LOCA) |
| Lightbox: abre, prev/next, ESC, clic fuera, teclado | ✅ |
| Modal de caso/servicio: abre con datos, 3 métricas, ESC/✕/backdrop | ✅ |
| Formulario: validación en tiempo real (5 campos requeridos) | ✅ |
| Formulario: estado sin EmailJS configurado → aviso + enlace WhatsApp | ✅ |
| WhatsApp flotante (pulso, tooltip, URL con mensaje) | ✅ |
| Banner de cookies (aceptar/necesarias/personalizar, localStorage) | ✅ |
| Analytics condicional (solo tras aceptar) | ✅ (lógica; activar con ID real) |

## Responsive
- ✅ Móvil 375px: hero, menú full-screen, grids a 1 columna, sin desbordes horizontales.
- ✅ Desktop 1280/1440: composición editorial con aire.
- Grids: servicios/testimonios/equipo colapsan correctamente; portfolio 2→1 col.

## SEO / Accesibilidad
- ✅ `<title>` y `meta description` únicos en las 14 páginas.
- ✅ Open Graph + Twitter Card en todas; Schema.org `MarketingAgency` en home.
- ✅ `canonical`, `robots`, `sitemap.xml`, `robots.txt`, `404.html`.
- ✅ Todas las imágenes con `alt` descriptivo (la única con `alt=""` es el `<img>` del modal, oculto, que se rellena al abrirlo).
- ✅ Hero sin imagen bloqueante; portfolio/equipo con `loading="lazy"`.
- ✅ `:focus-visible`, roles ARIA en modal/lightbox/cookies, `aria-label` en iconos.

## Imágenes / rendimiento
- 9 imágenes en home, ninguna rota.
- ⚠️ Recomendado convertir JPG/PNG a **WebP** antes de producción (no había Python/Pillow en el entorno; se mantienen los originales del cliente, plenamente soportados).

## Pendiente de configuración (no son bugs — requieren datos del cliente)
- 🔧 Número de **WhatsApp** (`34XXXXXXXXX`).
- 🔧 Credenciales **EmailJS** (`js/contact.js`).
- 🔧 **Google Analytics** Measurement ID (`js/analytics.js`).
- 🔧 Usuarios reales de **RRSS** (LinkedIn por confirmar).
- 🔧 Datos legales (razón social, NIF, domicilio, teléfono).
- 🔧 Dominio final en URLs canónicas/OG/sitemap si difiere de holakaosagency.com.
- 🔧 Imagen `og-image` 1200×630 y `favicon.ico` / `apple-touch-icon.png`.

Ver detalle en **ENTREGA_CLIENTE.md**.
