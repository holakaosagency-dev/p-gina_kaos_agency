# 🎨 KAOS Agency — Sistema de diseño

Basado en el **branding nuevo de KAOS** (`docs/encargo-kaos-web/branding/NUEVO_BRANDING.pdf`) más el salvia del manual anterior, y elevado al nivel premium de agenciajumpers.com. Actualizado en octubre de 2026.
Definido en `kaos-web/css/variables.css`.

## Concepto
"Fieles al caos creativo, porque el orden nunca hizo historia." Directo, cálido y con criterio: titulares enormes en grotesca negrita de tracking ajustado (como las referencias del cliente) + grotesca limpia para UI/cuerpo. Verde profundo como base de marca, salvia como **único acento**, crema como papel.

## Color
| Rol | Hex | Uso |
|---|---|---|
| Verde principal | `#135E51` | Marca, hero, secciones oscuras |
| Verde profundo | `#0D423A` | Hover, superficies oscuras |
| Verde noche | `#08251F` | Texto sobre crema, footer |
| Salvia (ACENTO) | `#ABC685` | Único color de acento: enlaces, énfasis, CTA |
| Crema | `#FFFFF0` | Fondo papel (branding nuevo) |
| Crema profunda | `#F3F3DF` | Tarjetas, alternancia |

Regla: un solo acento (salvia), usado con intención. Nada de degradados genéricos.

## Tipografía (Google Fonts)
- **Display / titulares**: `Inter Tight` 700 (cursiva 700–800 para acentos como "Kaos" o "KAOSAGENCY™"), tracking −0,04 em → equivalente a la Neue Montreal Bold del manual.
- **UI, etiquetas y cuerpo**: `Space Grotesk` (grotesca geométrica) → equivalente a Sharp Grotesk.
- **Logotipo e isotipo**: SVG oficiales extraídos del branding nuevo (`assets/img/brand/logotipo-kaos.svg`, `isotipo-k.svg`), en línea y recoloreables con `currentColor`. No se escribe el logo con texto.
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
Nav transparente→sólido, hero full-screen (sin pantalla de carga ni animaciones de entrada: el contenido se ve al instante), marquesina CSS, bloque "Somos" centrado en verde, **acordeón de servicios** (nombre grande + línea + "+"), **contacto "¿Hablamos?"** centrado con un único formulario de líneas, tarjetas de proyecto/equipo/testimonio, modal de caso, lightbox, banner de cookies, WhatsApp flotante, botón volver-arriba, barra de progreso y **cierre "KAOSAGENCY™"** (sustituye al footer).

## Prohibido (respetado)
Degradados genéricos, sombras por todas partes, radios excesivos, emojis como decoración, look de plantilla Elementor/WordPress.
