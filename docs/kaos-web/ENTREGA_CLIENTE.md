# 🚀 KAOS Agency — Guía de entrega y configuración

Web estática premium lista para **arrastrar y soltar en Hostinger**. Sin build, sin frameworks, sin npm.

Carpeta a subir: **`kaos-web/`** (todo su contenido).

---

## 1. Antes de publicar — CHECKLIST DE CONFIGURACIÓN

Estos son los únicos datos que faltan por rellenar. Busca `TODO` en los archivos para encontrarlos rápido.

### ✅ 1.1 WhatsApp (obligatorio para que el botón funcione)
- Archivo: **todas las páginas `.html`**, busca `34XXXXXXXXX`.
- Sustituye `34XXXXXXXXX` por el número real con prefijo de país, **sin** `+`, espacios ni guiones.
  - Ejemplo: para `+34 612 345 678` → `34612345678`.
- Aparece en el botón flotante, en el enlace "whatsapp ↗" del cierre de cada página y en "Háblanos por WhatsApp" (home y contacto).

### ✅ 1.2 EmailJS (para que el formulario envíe emails reales)
1. Crea una cuenta gratis en **https://www.emailjs.com**.
2. **Email Services** → conecta tu Gmail/Outlook → copia el **Service ID**.
3. **Email Templates** → crea una plantilla con estas variables (tal cual):
   `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{service}}`, `{{message}}`.
   - En "To Email" pon: `contacto@holakaosagency.com`.
4. **Account** → copia tu **Public Key**.
5. Abre **`kaos-web/js/contact.js`** y reemplaza arriba del todo:
   ```js
   var PUBLIC_KEY  = "TU_PUBLIC_KEY";
   var SERVICE_ID  = "TU_SERVICE_ID";
   var TEMPLATE_ID = "TU_TEMPLATE_ID";
   ```
   Mientras no se configure, el formulario valida y muestra un aviso con enlace a WhatsApp (no se rompe).

### ✅ 1.3 Google Analytics 4 (opcional pero recomendado)
- Crea una propiedad GA4 en **https://analytics.google.com** y copia el **Measurement ID** (`G-XXXXXXXXXX`).
- Abre **`kaos-web/js/analytics.js`** y reemplaza:
  ```js
  var GA_ID = "G-XXXXXXXXXX";
  ```
- Analytics **solo se activa si el visitante acepta las cookies** (cumplimiento RGPD).

### ✅ 1.4 Redes sociales (verifica los usuarios)
- Busca en los `.html`: `instagram.com/agency.kaos`, `tiktok.com/@agency.kaos`, `linkedin.com/company/kaos-agency`.
- Ajusta los usuarios si alguno cambia (LinkedIn está por confirmar).

### ✅ 1.5 Datos legales (importante por ley)
- En **`aviso-legal.html`** y **`politica-privacidad.html`** rellena los `TODO`: razón social, NIF/CIF y domicilio.
- Teléfono: busca `+34 000 000 000` y `+34000000000` y pon el real (o elimina la línea si no tienen).

### ✅ 1.6 Dominio en las URLs (SEO)
- Si el dominio final **no** es `holakaosagency.com`, reemplázalo en:
  `<link rel="canonical">`, etiquetas `og:url`/`og:image`, `sitemap.xml` y `robots.txt`.

### ✅ 1.7 Imagen para compartir en redes (recomendado)
- Crea una imagen **1200×630 px** con el logo y guárdala como `kaos-web/assets/img/brand/og-image.jpg`.
- Actualiza las metas `og:image` / `twitter:image` (ahora apuntan a `kaos-lifestyle.webp`).

### ✅ 1.8 Favicon (recomendado)
- Ya hay un `favicon.svg`. Para máxima compatibilidad, genera también `favicon.ico` y `apple-touch-icon.png` (180×180) en https://realfavicongenerator.net y súbelos a la raíz.

---

## 2. Cómo subir a Hostinger (paso a paso)

1. Entra en **hPanel** de Hostinger → tu dominio → **Administrador de archivos**.
2. Abre la carpeta **`public_html`**.
3. (Si hay archivos de demo, bórralos).
4. Selecciona **todo el contenido de la carpeta `kaos-web/`** (no la carpeta, su interior) y **arrástralo** dentro de `public_html`.
   - Asegúrate de subir también `.htaccess` (activa "mostrar archivos ocultos" si no lo ves).
5. Espera a que termine la subida. Visita tu dominio: la web ya está online.
6. **Activa SSL**: hPanel → Seguridad → SSL (gratis). Cuando esté activo, descomenta el bloque "Redirección a HTTPS" en `.htaccess`.

> Alternativa por FTP: usa FileZilla con los datos FTP de hPanel y copia el contenido de `kaos-web/` a `public_html`.

---

## 3. Tras cada actualización (importante)

Cuando edites un `.css` o `.js`, **sube el `?v=20261010`** que verás en las etiquetas `<link>`/`<script>` de los `.html` a una fecha nueva (ej. `?v=20261115`). Así los visitantes ven los cambios sin esperar a que caduque la caché. El `.htaccess` ya está configurado para esto.

---

## 4. Cómo actualizar contenido sin tocar "código difícil"

- **Textos**: abre el `.html` correspondiente y edita el texto entre etiquetas. No toques lo que esté dentro de `< >`.
- **Fotos del equipo**: reemplaza los archivos en `assets/img/team/` manteniendo el mismo nombre (`susana.jpg`, `oscar.jpg`, `ainhoa.jpg`).
- **Proyectos del portfolio**: las imágenes están en `assets/img/portfolio/`. Para añadir un proyecto nuevo en `proyectos.html`, copia un bloque `<article class="work ...">` y cambia imagen, título y categorías (`data-cats`).
- **Añadir un caso de estudio**: duplica `proyecto-plantilla.html`, renómbralo `proyecto-nombre.html` y rellena los textos marcados.
- **Servicios y precios**: en `servicios.html`, busca la palabra `price` para editar tarifas.
- **Métricas de la home**: en `index.html`, busca `data-counter` y cambia el número (`data-counter="32"`).

> Consejo: optimiza las imágenes a **WebP** antes de subirlas (https://squoosh.app). Pesan menos y la web carga más rápido. Mantén el mismo nombre cambiando la extensión y actualiza la referencia en el HTML si procede.

---

## 5. Comprobación final (cuando esté online)

- [ ] El botón de WhatsApp abre tu chat con el mensaje predefinido.
- [ ] El formulario de contacto envía un email de prueba a `contacto@holakaosagency.com`.
- [ ] Instagram, TikTok y LinkedIn abren las cuentas correctas en pestaña nueva.
- [ ] El banner de cookies aparece la primera vez y no vuelve si aceptas.
- [ ] Se ve bien en el móvil.

¡Listo! Bienvenidos al KAOS. 🖤💚
