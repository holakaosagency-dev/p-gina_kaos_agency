# Inventario de archivos — kaos-web

Todo lo recopilado de la web de KAOS Agency, ordenado con las rutas que usa el HTML. Para verla en local: `npx -y serve kaos-web -l 8765` desde la raíz del repo.

## Imágenes

Las fotos llegaron en WebP y el HTML se ha ajustado para usarlas así (pesan menos que PNG).

### Marca — `assets/img/brand/`

| Archivo | Qué es | Notas |
|---|---|---|
| `kaos-lifestyle.webp` | Mockup de libreta con "KAOS AGENCY", 1024×1024 | Se usa en inicio, contacto, servicios y como imagen social (OG) |
| `isologo.svg` | Isotipo "K" en vector, `currentColor` | El HTML lleva el SVG en línea; el archivo avisa de que es una reinterpretación del vector oficial |
| `isotipo-k-fondo-verde.png` | K crema sobre verde, 1920×1080 | Sin uso en el HTML |
| `isotipo-k-fondo-crema.png` | K verde sobre crema `#FFFFF0`, 1920×1080 | Sin uso. Su crema no es el del CSS (`#FFF6E7`) |

### Portfolio — `assets/img/portfolio/`

Mockups de iPhone con perfiles de Instagram gestionados por la agencia. WebP con fondo transparente, 970×2000 (Jehosua: 1601×2000, en perspectiva).

| Archivo | Cuenta |
|---|---|
| `celia-zanon.webp` | @celiazanon — creadora digital (105 mil) |
| `darss.webp` | @darss.one — ropa pintada a mano |
| `debodas.webp` | @debodas_ — bodas y eventos, Málaga |
| `cordobamia.webp` | @cordobamia.market — market de moda, artesanía y diseño, Córdoba |
| `bonilla.webp` | @bonilla.nutricion — dietista-nutricionista |
| `palmtribe.webp` | @palm.tribe — moda flamenca (19,5 mil, verificada) |
| `torrijas.webp` | @lastorrijasdelayaya — torrijas artesanas, Sevilla |
| `jehosua.webp` | @jehosuavogele — hair & makeup artist (16 mil) |
| `loca.webp` | @loca_jerez — hamburguesería, Jerez |
| `poderio.webp` | **FALTA** — Poderío Market (inicio, proyectos, plantilla) |

### Equipo — `assets/img/team/`

Fotos de estudio sobre fondo blanco con sudadera de KAOS, 1333×2000.

| Archivo | Persona | Rol en la web |
|---|---|---|
| `susana.jpg` | Susana | Dirección & Estrategia |
| `oscar.jpg` | Óscar | Dirección creativa & Audiovisual |
| `ainhoa.jpg` | Ainhoa | Social Media & Contenido |

### Sin uso en el HTML (guardadas por si acaso)

| Archivo | Qué es |
|---|---|
| `assets/img/clientes/logo-bonilla-nutricion.png` | Logo negro, fondo transparente |
| `assets/img/clientes/logo-cordobamia-market.jpg` | Logo en formato story; tiene una línea cortada en el borde inferior |
| `assets/img/clientes/logo-loca-hamburguesa.png` | Logo rojo sobre blanco |
| `assets/img/personas/retrato-celia-zanon.jpg` | Misma foto que su perfil, formato story |
| `assets/img/personas/retrato-jehosua-vogele.jpg` | Misma foto que su perfil, formato story |

## Raíz del sitio

| Archivo | Qué es | Pendientes (TODO) |
|---|---|---|
| `.htaccess` | Config para Hostinger/Apache: caché (HTML/CSS/JS revalidan siempre, imágenes 1 mes, fuentes 1 año), gzip, MIME, cabeceras de seguridad básicas, página 404 | Descomentar la redirección a HTTPS cuando el dominio tenga SSL |
| `favicon.svg` | K crema sobre cuadrado verde redondeado | También se usa como `apple-touch-icon`, pero iOS no admite SVG ahí: falta un PNG de 180×180 |
| `404.html` | "Puro caos." Página de error con botón de vuelta al inicio. `noindex` | — |
| `aviso-legal.html` | Aviso legal LSSI-CE | Razón social, NIF/CIF y domicilio |
| `index.html` | Inicio: splash "Entrando al caos", hero "Convertimos el Kaos de tu marca en algo que la gente recuerda.", marquesina de marcas, Somos KAOS, 4 servicios con modal, métricas, 4 proyectos con modal, el estudio, equipo (Susana, Óscar, Ainhoa), testimonios, CTA final. SEO + Open Graph + Schema.org `MarketingAgency` | Métricas reales (ahora 32+ marcas, 2.500+ piezas, 15M reproducciones, 4× crecimiento), testimonios reales y verificables, roles del equipo, imagen OG 1200×630, `favicon.ico` y `apple-touch-icon.png` |
| `manifiesto.html` | Manifiesto en frases alternas izquierda/derecha sobre verde noche, cierre "Bienvenidos al KAOS." y botón "Únete al caos" | — |
| `politica-privacidad.html` | Política de privacidad RGPD (responsable, finalidad, legitimación, conservación, destinatarios, derechos, seguridad) | NIF y domicilio del responsable |
| `politica-cookies.html` | Política de cookies (necesarias + Analytics) con botón para cambiar las preferencias | Mencionar Google Maps si se mantiene el mapa en contacto |
| `proyecto-celia-zanon.html` | Caso de estudio: reto, lo que hicimos, resultados. "Siguiente proyecto" → DARSS | Métricas reales (ahora +1.000 seguidores, x3 alcance…) |
| `proyecto-darss.html` | Caso de estudio: reto, lo que hicimos, resultados. "Siguiente proyecto" → Poderío | Métricas reales (ahora x4 notoriedad…) |
| `proyecto-debodas.html` | Caso de estudio. "Siguiente proyecto" → Celia Zanón | Métricas: 4.679 seguidores y 250 publicaciones son datos del perfil, no resultados del trabajo |
| `proyecto-plantilla.html` | Plantilla para duplicar al crear nuevos casos | **No subir al servidor** (o poner `noindex`): ahora es indexable. Además tiene un comentario antes del `<!DOCTYPE>` |
| `proyectos.html` | Portfolio completo: 10 proyectos con filtros (RRSS, Contenido, Branding, Marca personal) y lightbox | Descripciones de Córdoba Mía ("marca de ciudad") y Palm Tribe ("marca lifestyle") no cuadran con sus perfiles (market de moda/artesanía; moda flamenca) |
| `servicios.html` | 8 servicios con precio "desde", proceso en 4 pasos y CTA | Precios orientativos sin confirmar. El bloque de 4 pasos no tiene versión móvil (4 columnas fijas) |
| `robots.txt` | Permite todo menos `/assets/` y enlaza `sitemap.xml` | Bloquear `/assets/` impide que Google indexe las imágenes. `sitemap.xml` no existe todavía |
| `contacto.html` | Contacto: email, teléfono, redes, formulario EmailJS (nombre, email, teléfono, servicio, mensaje, privacidad) y mapa de Google | Teléfono real, dirección, ubicación del mapa (ahora Sevilla genérico) |

Estructura común de las páginas: nav (Servicios, Proyectos, Manifiesto, Equipo, Contacto), footer, WhatsApp flotante, volver arriba y banner de cookies. Google Fonts: Fraunces + Space Grotesk. Dominio: `holakaosagency.com`.

Datos de relleno que se repiten en todas las páginas: teléfono `+34 000 000 000` y WhatsApp `34XXXXXXXXX`.

### Páginas que el HTML enlaza y aún no tengo

- `proyecto-poderio.html` (enlazado desde inicio, proyectos y el caso de DARSS)
- `sitemap.xml` (citado en `robots.txt`)

## CSS

Orden de carga recomendado: `variables.css` → `main.css` → `components.css`.

| Archivo | Qué contiene |
|---|---|
| `css/variables.css` | Design system: colores del Manual de Identidad, tipografías, escala fluida, espaciado, radios, motion, sombras, capas. Temas `.theme-dark` y `.theme-night` |
| `css/main.css` | Reset, tipografía, layout, botones, reveal on scroll, hero, marquesina, "Somos Kaos", servicios, métricas, equipo, testimonios, CTA final, split imagen+texto, formulario, cabecera de páginas interiores, páginas legales |
| `css/components.css` | Barra de progreso, nav (con menú móvil), tarjetas de servicio y proyecto, filtros de portfolio, tarjeta de equipo, testimonios, footer, WhatsApp flotante, volver arriba, modal de proyecto, lightbox, banner de cookies, splash/loader |

## JavaScript

JS vanilla, sin dependencias propias. Comparten el objeto global `window.KAOS`.

| Archivo | Qué hace | Necesita |
|---|---|---|
| `js/analytics.js` | Carga Google Analytics 4 solo si se aceptan las cookies analíticas (IP anonimizada) | **Pendiente:** ID real de GA4 (ahora `G-XXXXXXXXXX`). Cargar antes que `cookies.js` |
| `js/cookies.js` | Banner de cookies RGPD: aceptar, solo necesarias o personalizar. Guarda la elección en `localStorage` (`kaos_consent_v1`). Expone `KAOS.resetCookieConsent()` para la política de cookies | HTML con `[data-cookie-banner]`, `[data-cookie-prefs]`, `#cookie-analytics` |
| `js/contact.js` | Formulario de contacto con EmailJS: validación en tiempo real, estado "Enviando…", mensajes de éxito/error con WhatsApp de respaldo, evento `generate_lead` en GA | **Pendiente:** `PUBLIC_KEY`, `SERVICE_ID`, `TEMPLATE_ID` de EmailJS + script del SDK de EmailJS en el HTML. Usa `KAOS.WA_URL` (de `main.js`) |
| `js/counters.js` | Contadores que suben de 0 al valor al entrar en pantalla (formato es-ES). Sin animación si hay movimiento reducido | Markup `[data-counter]` |
| `js/filters.js` | Filtro del portfolio por categoría (en `proyectos.html`) | `[data-filters]`, `[data-filter]`, `[data-work-grid]`, `[data-cats]` |
| `js/main.js` | Núcleo: splash/loader (máx. 1,5 s, solo home), nav sólido al hacer scroll, hamburguesa, scroll suave a anclas, volver arriba, barra de progreso, reveals on scroll, word reveal del hero, nav activo por sección, botones magnéticos, año dinámico. Define `KAOS.WA_URL`. Cada parte va protegida: si una falla, el resto sigue | Enlace de WhatsApp con `[data-wa]` en el HTML; si no existe usa el relleno `https://wa.me/34XXXXXXXXX` |
| `js/modals.js` | Ventana de caso de estudio: imagen, categoría, título, descripción, resultados y botón. Cierre con ✕, ESC o clic fuera; devuelve el foco al cerrar | Disparadores `[data-modal-open]` con `data-modal-*`. Resultados en formato `valor::etiqueta\|valor::etiqueta` |
| `js/lightbox.js` | Galería a pantalla completa del portfolio: flechas, teclado y cierre con ESC o clic fuera. Hace accesibles con teclado los elementos que la abren | Elementos `[data-lightbox]` (con `data-full`, `data-title`, `data-desc`) y contenedor `[data-lightbox-stage]` |

## Sistema de diseño (de `variables.css`)

- Lema: "Fieles al caos creativo, porque el orden nunca hizo historia"
- Verde principal `#135E51` · verde profundo `#0d423a` · verde noche `#08251f`
- Acento único: salvia `#ABC685` (tinte claro `#cddeb3`)
- Crema `#FFF6E7` · crema cálida `#f4e8cf`
- Tipografías: **Fraunces** (display, serif) y **Space Grotesk** (cuerpo/UI), cargadas desde Google Fonts
- Nota: los PNG del isotipo usan un crema distinto (`#FFFFF0`) al del CSS (`#FFF6E7`)

## Pendiente antes de publicar

**Falta recibir**
- [ ] Imagen `assets/img/portfolio/poderio.webp`
- [ ] Página `proyecto-poderio.html` (se puede crear desde `proyecto-plantilla.html`)
- [ ] `sitemap.xml`

**Datos reales que sustituir**
- [ ] Teléfono (`+34 000 000 000`) y WhatsApp (`34XXXXXXXXX`) en todas las páginas
- [ ] NIF/CIF, razón social y domicilio (aviso legal y privacidad)
- [ ] ID de Google Analytics 4 y claves de EmailJS
- [ ] Métricas de inicio y de cada caso de estudio, testimonios verificables, precios de servicios
- [ ] Ubicación del mapa de contacto (ahora "Sevilla")
- [ ] Usuarios reales de Instagram, TikTok y LinkedIn

**Mejoras detectadas (para QA)**
- [ ] Imagen social 1200×630 en JPG y `apple-touch-icon.png` 180×180 (iOS no usa SVG)
- [ ] Mapa de Google: cargar solo tras consentimiento o clic
- [ ] `robots.txt`: quitar `Disallow: /assets/` para que Google vea las imágenes
- [ ] No subir `proyecto-plantilla.html` (o ponerle `noindex`)
- [ ] Contraste de `.svc__idx` (salvia sobre crema)
- [ ] Bloque "Cómo trabajamos" de servicios sin versión móvil
- [ ] Descripciones de Córdoba Mía y Palm Tribe en `proyectos.html`; unificar "Córdoba Mía" / "Cordobamia Market"
- [ ] Activar redirección a HTTPS en `.htaccess` al publicar
