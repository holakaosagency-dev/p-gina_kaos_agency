---
name: playbook-webs-premium
description: Manual maestro para crear y vender webs profesionales premium (que parezcan de 10.000 €). Consúltalo al planificar, construir o presupuestar cualquier web. Cubre qué stack usar (Tier 1 estático / Tier 2 Next.js+Supabase+Stripe) y por qué, la arquitectura, cómo se conectan frontend, backend y autenticación, las reglas de diseño que hacen que una web parezca cara, el flujo de trabajo con los agentes especializados, el despliegue y cómo fijar precios premium.
---

# PLAYBOOK — Cómo fabricar webs premium y vendibles

Manual maestro para crear, de forma repetible, webs que parecen de 10.000 €. Cubre el stack, la arquitectura, cómo se conecta cada parte (frontend + backend + autenticación), el despliegue, cómo orquestar al equipo de agentes y cómo venderlo caro. (Mayo 2026.)

## 1. La idea en una frase

No vendes "páginas": vendes un sistema. Tienes un **equipo de 9 agentes especializados** (orquestador, arquitecto, diseñador, frontend, backend, auth/seguridad, copy/SEO, QA, comercial/entrega) y dos **stacks estándar** según el proyecto. Tú diriges; los agentes ejecutan. El resultado es consistente, rápido de producir y caro de aspecto.

## 2. Los dos tiers (elige según el proyecto)

Regla: ¿la web necesita usuarios que inicien sesión o datos guardados por usuario?

**Tier 1 — Sitio estático premium.** Para landings, webs de negocio, restaurantes, clínicas, agencias, portfolios, lanzamientos. Stack: HTML + CSS moderno + JS vanilla (o **Astro** si hay muchas páginas/blog). Hosting: Hostinger, Netlify o Vercel. Rapidísimo, baratísimo de hospedar (márgenes altos). Funcionalidad sin backend: formularios (Formspree/Netlify Forms), reservas (Calendly incrustado), pagos simples (enlaces de Stripe).

**Tier 2 — App con usuarios.** Para SaaS, áreas de cliente, e-commerce con cuentas, reservas con gestión, paneles, cualquier cosa con login o pagos recurrentes. Stack:
- **Frontend**: Next.js (App Router) + React + TypeScript + Tailwind CSS + shadcn/ui
- **Base de datos + backend**: Supabase (Postgres) con Row Level Security (RLS)
- **Autenticación**: Supabase Auth (cookies con `@supabase/ssr`)
- **Pagos**: Stripe · **Email**: Resend
- **Despliegue**: Vercel (frontend) + Supabase gestionado

Por qué este stack: es el que tiene **más soporte en herramientas de IA** (más ejemplos = se construye mejor y con menos errores), **APIs estables**, patrones predecibles, y cuesta **0 €/mes** en MVP y menos de ~200 €/mes con tracción. Estándar de facto para SaaS en 2026.

> Empieza siempre en Tier 1. Sube a Tier 2 solo cuando el proyecto pida login, datos por usuario o pagos recurrentes.

## 3. Cómo se conecta todo (Tier 2)

Flujo de una petición:

```
Usuario (navegador)
  → Frontend Next.js (Server Components renderizan en el servidor)
  → Server Action / Route Handler  (aquí viven la lógica y los secretos)
  → Cliente de Supabase (envía el JWT del usuario vía cookies @supabase/ssr)
  → Postgres con Row Level Security (RLS)
  → La política RLS lee auth.uid() del JWT y SOLO devuelve las filas de ese usuario
```

Las piezas:

1. **Autenticación es el pegamento.** Al hacer login, Supabase Auth guarda la sesión en cookies. `@supabase/ssr` hace que esa sesión viaje en cada petición del servidor, así la base de datos siempre sabe **quién** pide los datos.
2. **RLS es la seguridad real.** Activas Row Level Security en cada tabla con datos de usuario y escribes políticas con `auth.uid()`. Aunque la clave pública esté en el navegador, nadie puede leer datos de otro. Sin RLS, esa clave deja los datos al descubierto: es el error nº 1.
3. **Dos claves, dos mundos.** La **pública** (`anon` / `sb_publishable_...`) puede ir al navegador (protegida por RLS). La **secreta** (`service_role` / `sb_secret_...`) JAMÁS sale al cliente; solo en servidor (salta RLS). Las antiguas funcionan hasta finales de 2026, pero conviene usar ya las nuevas.
4. **El frontend no toca la base de datos para cosas sensibles**: pasa por server actions/route handlers, donde validas la entrada y guardas secretos.
5. **Pagos**: Stripe. El checkout lo lanza el servidor; un webhook (verificado con firma) confirma el pago y actualiza la base de datos.
6. **Tipos compartidos**: genera los tipos TypeScript desde el esquema de Supabase para que Frontend y Backend hablen el mismo idioma.

Variables de entorno típicas: `NEXT_PUBLIC_SUPABASE_URL` + clave pública (cliente); clave secreta de Supabase, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` (solo servidor). En Vercel + Supabase, la integración oficial inyecta varias automáticamente.

En Tier 1 es lineal: navegador → HTML/CSS/JS del host; los formularios envían a un servicio externo. Sin base de datos propia.

## 4. El equipo de agentes y cómo orquestarlo

| Fase | Agente | Entregable |
|------|--------|-----------|
| 0. Encargo | orquestador-web | Tipo de web, stack elegido, plan por fases |
| 1. Cimientos | arquitecto-web | Estructura de carpetas, modelo de datos, mapa de conexión |
| 2. Dirección de arte | disenador-ux-ui | Brand book: tipografía, color, espaciado, motion |
| 3. Interfaz | frontend-web | Páginas y componentes responsive y pulidos |
| 4. Datos y lógica* | backend-web | Tablas, RLS, API, Stripe, emails |
| 5. Acceso* | auth-seguridad | Login, registro, rutas protegidas, blindaje |
| 6. Palabras | copy-seo | Textos que venden + metadatos |
| 7. Calidad | qa-testing | Informe de revisión, bugs corregidos |
| 8. Cierre | comercial-entrega | Despliegue, traspaso, propuesta y precio |

\* Fases 4 y 5 solo en Tier 2.

Frontend y Backend pueden avanzar en paralelo una vez el Arquitecto fija la estructura. Apóyate además en las skills `design-reference`, `frontend-design`, `static-taste-frontend` y `adrian-saenz-hostinger-premium-website` para el diseño y el frontend estático.

## 5. Qué hace que una web parezca de 10.000 €

El cliente decide en milisegundos (efecto halo): un hero pulido hace que asuma que todo lo demás es igual de bueno. Palancas:

- **Tipografía con carácter**: titulares grandes, pareja de fuentes con personalidad (idealmente variable), escala clara. Lo que más sube de gama.
- **Espacio generoso**: el aire es lujo. Secciones amontonadas = barato.
- **Un solo acento de color** + neutros bien escalados. Nada de arcoíris ni gradientes morado-azul genéricos.
- **Motion sutil**: fade-in al scroll, hover suave, transiciones de página. Respeta `prefers-reduced-motion`.
- **Hero impecable**: un titular, una idea, una imagen fuerte, un CTA claro.
- **Detalles**: estados de carga/vacío/error, microcopy, imágenes optimizadas (no stock obvio), responsive perfecto.
- **Velocidad**: Lighthouse > 90. Rápido se percibe como caro y Google lo premia.

Antipatrones que delatan lo barato/IA: múltiples acentos compitiendo, emojis como iconos, sombras duras, tarjetas iguales sin jerarquía, "lorem ipsum" olvidado, stock sin tratar.

## 6. Flujo paso a paso (checklist maestro)

1. Briefing: tipo de web, marca, funcionalidad, contenido, plazo, presupuesto.
2. Decisión de tier y plan de fases.
3. Arquitectura (Tier 2): carpetas, modelo de datos, variables de entorno.
4. Brand book: fuentes, paleta, espaciado, motion.
5. Maquetación: páginas + componentes, responsive, estados.
6. Backend + Auth (Tier 2): tablas, RLS, login, pagos, emails.
7. Copy + SEO: textos que convierten + title/meta/OG/schema/sitemap.
8. QA: funcionalidad, responsive (360/768/1280), Lighthouse, accesibilidad, seguridad (un usuario no ve datos de otro), pulido.
9. Despliegue: producción en dominio del cliente, servicios en modo live, HTTPS, analítica.
10. Traspaso: documento de uso + propuesta de mantenimiento.

No entregues nada con fallos bloqueantes en QA.

## 7. Cómo venderlo (precio premium)

- **Vende resultado, no horas**: más reservas, más clientes, más confianza.
- **Paquetiza en niveles** (Esencial / Profesional / Premium): el cliente elige y sube de gama solo.
- **Justifica el precio de agencia**: diseño a medida, copy que convierte, SEO técnico, velocidad, seguridad real, soporte.
- **Cobra mantenimiento mensual** (hosting + cambios + soporte + seguridad): recurrente y rentable.
- **Demuestra**: antes/después, captura de Lighthouse, casos.

Plantilla de propuesta: Proyecto · Incluye (diseño premium, [n] páginas, copy + SEO, [login/pagos], optimización y seguridad, despliegue y formación) · Inversión · Mantenimiento/mes · Plazo · Garantía.

## 8. Errores caros que NO debes cometer

1. Exponer la clave secreta en el cliente. Solo servidor.
2. Olvidar activar RLS: dejaría los datos al descubierto.
3. Confiar solo en validaciones del cliente: valida en servidor.
4. Webhooks de Stripe sin verificar la firma.
5. Meter Tier 2 cuando bastaba una landing.
6. Entregar sin QA real en móvil ni probar el aislamiento entre usuarios.
7. Dejar "lorem ipsum", enlaces rotos o imágenes pesadas.
