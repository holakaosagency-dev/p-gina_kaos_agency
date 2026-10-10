# 🎨 KAOS Agency — Sistema de diseño

Basado en el **Manual de Identidad Visual de KAOS** y elevado al nivel premium de agenciajumpers.com.
Definido en `kaos-web/css/variables.css`.

## Concepto
"Fieles al caos creativo, porque el orden nunca hizo historia." Editorial, cálido y con criterio: serif de alto contraste para titulares + grotesca limpia para UI/cuerpo. Verde profundo como base de marca, salvia como **único acento**, crema como papel.

## Color (del manual)
| Rol | Hex | Uso |
|---|---|---|
| Verde principal | `#135E51` | Marca, hero, secciones oscuras |
| Verde profundo | `#0D423A` | Hover, superficies oscuras |
| Verde noche | `#08251F` | Texto sobre crema, footer |
| Salvia (ACENTO) | `#ABC685` | Único color de acento: enlaces, énfasis, CTA |
| Crema | `#FFF6E7` | Fondo papel |
| Crema cálida | `#F4E8CF` | Tarjetas, alternancia |

Regla: un solo acento (salvia), usado con intención. Nada de degradados genéricos.

## Tipografía (Google Fonts)
- **Display / titulares**: `Fraunces` (serif óptico, alto contraste) → equivalente premium del "Dream Orphans / Opción I" del manual.
- **UI, etiquetas y cuerpo**: `Space Grotesk` (grotesca geométrica) → equivalente a Neue Montreal / Sharp Grotesk.
- Contraste editorial marcado: serif display vs grotesca de cuerpo.
- Escala fluida con `clamp()` (`--fs-mega` … `--fs-label`).

## Espaciado y layout
- Ritmo de sección generoso: `--space-section: clamp(4.5rem, 10vw, 9rem)`.
- Ancho máximo de contenido 1320px; de texto 68ch.
- Mobile-first, breakpoints en 520/640/720/820/880px.

## Forma y motion
- **Un solo sistema de radios**: 4px (inputs), 16px (tarjetas/medios), pill (botones).
- Sombra mínima e intencional (solo flotantes y modales).
- Easing principal `cubic-bezier(0.22,1,0.36,1)`.
- Animaciones funcionales (hover, reveal, marquesina, contadores) **no** se desactivan con `prefers-reduced-motion`; solo lo intrusivo (pulso del scroll).

## Componentes clave
Loader, nav transparente→sólido, hero full-screen con reveal de palabras, marquesina CSS, tarjetas de servicio/proyecto/equipo/testimonio, modal de caso, lightbox, banner de cookies, WhatsApp flotante, botón volver-arriba, barra de progreso.

## Prohibido (respetado)
Degradados genéricos, sombras por todas partes, radios excesivos, emojis como decoración, look de plantilla Elementor/WordPress.
