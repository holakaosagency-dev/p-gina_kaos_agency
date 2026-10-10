# Inventario de archivos — kaos-web

Registro de los archivos de la web que se van recopilando. Las rutas son provisionales hasta tener el HTML (se ajustarán a las que este referencie).

## Marca

| Archivo | Qué es | Notas |
|---|---|---|
| `assets/isologo.svg` | Isotipo "K" en vector (240×150) | Usa `currentColor`, se recolorea con CSS. El propio SVG avisa de que es una reinterpretación y puede sustituirse por el vector oficial |
| `assets/img/isotipo-k-fondo-verde.png` | "K" crema sobre fondo verde, 1920×1080 | Fondo `#135E51` |
| `assets/img/isotipo-k-fondo-crema.png` | "K" verde sobre fondo crema, 1920×1080 | Fondo `#FFFFF0` |
| `assets/img/mockup-libreta-kaos.webp` | Mockup: libreta con el logotipo "KAOS AGENCY", 1024×1024 | Foto de ambiente para la web |

## Logos de clientes / proyectos

| Archivo | Qué es | Notas |
|---|---|---|
| `assets/img/clientes/logo-bonilla-nutricion.png` | Logo "bonilla nutrición", 1111×1445 | Negro sobre fondo transparente (PNG con canal alfa) |
| `assets/img/clientes/logo-cordobamia-market.jpg` | Logo "Cordobamia Market", 1125×2000 | Vertical (formato story), fondo crema. Rayitas cortadas en el borde inferior |
| `assets/img/clientes/logo-loca-hamburguesa.png` | Logo "LOCA — la hamburguesa que vuelve para poner cordura", 1080×1350 | Rojo sobre blanco |

## Portfolio — mockups de perfiles de Instagram (iPhone)

WebP con fondo transparente, 970×2000 (salvo el de Jehosua: 1601×2000, iPhone en perspectiva). Cuentas gestionadas por la agencia (en todas aparece "Le siguen … agency.kaos").

| Archivo | Cuenta | Qué es |
|---|---|---|
| `assets/img/portfolio/ig-bonilla-nutricion.webp` | @bonilla.nutricion | Jose Manuel Bonilla, dietista-nutricionista |
| `assets/img/portfolio/ig-celia-zanon.webp` | @celiazanon | Celia Zanón, creadora digital (105 mil seguidores) |
| `assets/img/portfolio/ig-cordobamia-market.webp` | @cordobamia.market | Market de moda, artesanía y diseño en Córdoba |
| `assets/img/portfolio/ig-darss.webp` | @darss.one | DARSS, marca de ropa pintada a mano |
| `assets/img/portfolio/ig-debodas.webp` | @debodas_ | Debodas, eventos y detalles de boda (Málaga) |
| `assets/img/portfolio/ig-jehosua-vogele.webp` | @jehosuavogele | Jehosua Vögele, hair & makeup artist (16 mil). Mockup inclinado, ideal para hero o destacado |
| `assets/img/portfolio/ig-loca-burger.webp` | @loca_jerez | LOCA Burger, hamburguesería en Jerez |
| `assets/img/portfolio/ig-palm-tribe.webp` | @palm.tribe | Palm Tribe, trajes y complementos de flamenca (19,5 mil, verificada) |
| `assets/img/portfolio/ig-torrijas-de-la-yaya.webp` | @lastorrijasdelayaya | Las Torrijas de la Yaya, torrijas artesanas en Sevilla |

## Retratos

| Archivo | Qué es | Notas |
|---|---|---|
| `assets/img/personas/retrato-celia-zanon.jpg` | Retrato en círculo, 1125×2000 | Misma foto que el perfil de Celia Zanón (ver portfolio). Formato story con fondo desenfocado. Pendiente confirmar uso |
| `assets/img/personas/retrato-jehosua-vogele.jpg` | Retrato en círculo, 1125×2000 | Misma foto que el perfil de Jehosua Vögele (ver portfolio). Formato story con fondo desenfocado. Pendiente confirmar uso |

## Equipo Kaos

Fotos de estudio sobre fondo blanco, todas con sudadera negra de Kaos Agency. Pendiente: nombre y rol de cada persona para renombrar.

| Archivo | Qué es |
|---|---|
| `assets/img/equipo/equipo-1.jpg` | Chica de perfil mirando a cámara, sonriendo; se ve "KAOS AGENCY" en la espalda |
| `assets/img/equipo/equipo-2.jpg` | Chico de frente con brazos cruzados; K del isotipo en el pecho |
| `assets/img/equipo/equipo-3.jpg` | Chica de frente con brazos cruzados, gesto divertido; K en el pecho |

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
| `js/contact.js` | Formulario de contacto con EmailJS: validación en tiempo real, estado "Enviando…", mensajes de éxito/error con WhatsApp de respaldo, evento `generate_lead` en GA | **Pendiente:** `PUBLIC_KEY`, `SERVICE_ID`, `TEMPLATE_ID` de EmailJS + script del SDK de EmailJS en el HTML. Usa `KAOS.WA_URL` (definido en otro JS aún no recibido) |
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
- Tipografías: **Fraunces** (display, serif) y **Space Grotesk** (cuerpo/UI). Pendiente: cómo se cargan (¿Google Fonts en el HTML o archivos locales?)
- Nota: los PNG del isotipo usan un crema distinto (`#FFFFF0`) al del CSS (`#FFF6E7`)

## Pistas sobre lo que falta (según el CSS)

- Páginas: inicio (hero, marquesina, servicios, métricas, equipo, testimonios, CTA), `servicios.html`, `proyectos.html`, contacto con formulario, páginas legales (incluida política de cookies)
- JS: completo según lo que pide el CSS ✅
- Número real de WhatsApp: debe ir en el enlace `[data-wa]` del HTML

## Pendiente

- HTML, CSS, JS, fuentes y resto de imágenes.
