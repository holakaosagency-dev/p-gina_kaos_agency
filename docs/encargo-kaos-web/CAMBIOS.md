# Cambios pedidos para la web de KAOS

Resumen de `CAMBIOS_WEB.docx` y `SERVICIOS.docx`, comparado con lo que ya hay en `kaos-web/`.

Vídeo de referencia de los servicios: `referencias/ref-servicios-video.mov` (fotogramas en `referencias/ref-servicios-video-fotogramas.jpg`). Original en Google Drive: https://drive.google.com/file/d/1nrco5GCksW4zTWaYx2EHls3QDMEpzXYZ/view?usp=sharing

## 1. Bloque "Somos KAOS Agency" (antes de los servicios)

**Qué piden**
- Título en negrita: "SOMOS KAOS AGENCY"
- Texto: "Desde el sur, en KAOS AGENCY canalizamos la creatividad para generar impacto. Somos una agencia de publicidad y marketing especializada en estrategias claras para que tu marca no solo llegue a las personas, sino que deje huella."
- Centrado en la pantalla, fondo verde y letras blancas, justo antes de los servicios
- Referencia: `referencias/ref-somos-kaos.png` (Teampacto: etiqueta "//sobre nosotros", titular enorme en grotesca negrita, texto grande y botón "hablemos")

**Estado actual**
- `index.html` ya tiene este bloque (`#somos`) con el mismo texto, centrado, en verde y antes de los servicios
- Diferencias con la referencia: el titular usa la serif Fraunces (la referencia usa una grotesca negrita), el texto es más pequeño y no hay botón

## 2. Servicios

**Qué piden**: los 8 servicios con estos nombres y textos.

| Nombre pedido | Nombre actual en la web | Texto |
|---|---|---|
| Creación de contenido | Creación de contenido | Igual |
| Gestión de RRSS | Gestión de RRSS | Igual |
| **Diseño web** | Diseño y desarrollo web | Igual |
| Estrategia digital | Estrategia digital | Igual |
| Fotos corporativas | Fotos corporativas | Igual |
| **Influencer marketing** | Marketing de influencers | Igual |
| Branding | Branding | Igual |
| Consultoría | Consultoría | Igual |

**Estado actual**
- `servicios.html` tiene los 8 con estos textos; `index.html` muestra solo 4 y un botón "Ver los 8 servicios"
- Falta: renombrar los dos servicios marcados y adaptar el diseño al vídeo de referencia

**Cómo es el vídeo de referencia** (web de Teampacto, sección de servicios)
- Etiqueta pequeña "//servicios" arriba a la izquierda y número de sección ("03") a la derecha
- Titular grande en grotesca negrita, minúsculas: "creatividad, rrss y marketing"
- Debajo, una **lista en acordeón**: cada servicio en una fila con su nombre en negrita grande, una línea fina de separación y un "+" a la derecha
- Al pulsar un servicio se despliega su descripción debajo (solo uno abierto a la vez); el "+" cambia de estado
- Fondo blanco/claro, mucho aire, sin tarjetas ni iconos

## 3. Contacto

**Qué piden**
- Estilo de `referencias/ref-contacto.png`: titular grande "¿hablamos?", subtítulo "Contacta por el canal que te sea más cómodo.", imagen a la izquierda y, a la derecha, una lista desplegable:
  - → háblanos por WhatsApp
  - → llámanos al teléfono
  - → escríbenos un mail (se abre el formulario con campos subrayados: nombre, email…)
- Imagen de la izquierda: la libreta KAOS (`referencias/ref-contacto-imagen-izquierda.png`, la misma que `assets/img/brand/kaos-lifestyle.webp`)

**Estado actual**
- `contacto.html` usa la libreta a la izquierda, pero con una lista de datos y el formulario siempre visible, no desplegable

## 4. Cierre de la web (después del contacto)

**Qué piden**: `referencias/ref-cierre-web.png`
- Fila de enlaces: instagram ↗ · tiktok ↗ · whatsapp ↗
- "KAOSAGENCY™" enorme, en grotesca negrita cursiva, verde sobre crema
- "© 2026"

**Estado actual**
- El footer actual es verde oscuro, en 4 columnas (mapa, contacto, redes) y con el lema

## Dudas abiertas

1. ¿El contacto + cierre va al final de **la home** (sustituyendo el "¿Le damos forma a tu caos?") o solo en `contacto.html`?
2. ¿El cierre sustituye al footer actual en todas las páginas o se añade encima?
3. La referencia del contacto y la de "Somos" usan una grotesca negrita en vez de la serif Fraunces. ¿Cambiamos los titulares a ese estilo o mantenemos Fraunces?

## Branding

- `branding/NUEVO_BRANDING.pdf` (y `.docx`): branding vigente. Logotipo "KAOS" en **Loubag** con "AGENCY" espaciado en **Poppins**, e isotipo K curvo. Verde `#135E51` y crema `#FFFFF0`; versiones sobre verde, crema y negro
- `branding/Manual_de_Identidad_Visual_ANTIGUO.pdf`: manual anterior (logo "KΛŌS" tipo stencil, K recta, tipografías Neue Montreal Bold / Sharp Grotesk / Dream Orphans, crema `#FFF6E7`, salvia `#ABC685`). El CSS de la web cita este manual
- Del PDF nuevo se han extraído en vector `kaos-web/assets/img/brand/logotipo-kaos.svg` e `isotipo-k.svg`

### Diferencias con la web actual
- La web usa un SVG de la K "reinterpretado" (polígonos rectos) en nav, footer, splash y favicon; el oficial es curvo → sustituir
- La web escribe "KAOS Agency" con Fraunces; el logotipo oficial es Loubag + Poppins → usar el SVG oficial
- Crema: la web usa `#FFF6E7` (manual antiguo); el branding nuevo usa `#FFFFF0` → confirmar cuál manda
