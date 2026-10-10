# 🏗️ KAOS Agency — Arquitectura

Sitio **estático Tier 1**: HTML + CSS + Vanilla JS. Sin build, sin npm, sin backend. Funcionalidad real vía servicios externos (EmailJS, Google Analytics).

## Estructura de carpetas (`kaos-web/`)
```
kaos-web/
├── index.html                 Home
├── servicios.html
├── proyectos.html             (filtros + lightbox)
├── proyecto-plantilla.html    Plantilla reutilizable de caso
├── proyecto-poderio.html      Casos de estudio
├── proyecto-debodas.html
├── proyecto-celia-zanon.html
├── proyecto-darss.html
├── manifiesto.html
├── contacto.html              (formulario EmailJS + mapa)
├── aviso-legal.html
├── politica-privacidad.html
├── politica-cookies.html
├── 404.html
├── sitemap.xml · robots.txt · favicon.svg · .htaccess
├── css/
│   ├── variables.css          Tokens del design system
│   ├── main.css               Reset, layout, secciones, hero, formularios
│   └── components.css         Nav, footer, tarjetas, modal, lightbox, cookie, whatsapp
└── assets/img/
    ├── brand/  team/  portfolio/  clients/
```

## JavaScript (IIFE, sin módulos ES — robusto en file:// y CDNs)
Namespace compartido `window.KAOS`. Cada `init*` envuelto en `safe()` (un fallo no rompe el resto).

| Archivo | Responsabilidad | Depende de |
|---|---|---|
| `analytics.js` | Carga GA4 condicional (`window.KAOS.loadAnalytics`) | — |
| `cookies.js` | Banner RGPD + consentimiento en localStorage; activa/desactiva GA | analytics.js |
| `main.js` | Loader, nav sticky, hamburguesa, scroll suave, volver-arriba, barra progreso, reveals (IntersectionObserver + red de seguridad 6s), scrollspy, magnético, año, expone `WA_URL` | — |
| `counters.js` | Contadores animados al entrar en viewport | — |
| `lightbox.js` | Visor de portfolio (teclado + ratón, prev/next, ESC) | — |
| `modals.js` | Modal de caso/servicio desde `data-*` | — |
| `contact.js` | Validación en tiempo real + envío EmailJS + estados | EmailJS SDK, main.js (WA_URL) |
| `filters.js` | Filtro de portfolio por categoría (`data-cats`) | — |

Orden de carga por página (al final del `<body>`, con `defer`): analytics → cookies → main → (counters/modals/lightbox/filters/contact según la página).

## Carga de scripts por página
- **index**: analytics, cookies, main, counters, modals.
- **proyectos**: analytics, cookies, main, filters, lightbox.
- **contacto**: EmailJS SDK, analytics, cookies, main, contact.
- **servicios**: analytics, cookies, main, modals.
- **resto**: analytics, cookies, main.

## Decisiones técnicas
- **Sin `<script type="module">`**: evita fallos en `file://` y problemas de caché.
- **Cache-busting** `?v=AAAAMMDD` en css/js + `.htaccess` (HTML/CSS/JS sin caché, imágenes/fuentes 1 mes).
- **Contenido en HTML**, JS solo enriquece (si falla el JS, la web se lee igual).
- **Logo** como SVG inline recoloreable (`currentColor`) para nitidez y temas claro/oscuro.
