# PLAYBOOK — Cómo fabricar webs premium y vendibles con Claude

Manual maestro para crear, de forma repetible, webs que parecen de 10.000 € usando Claude como si fueras una agencia entera. Cubre el stack, la arquitectura, cómo se conecta cada parte (frontend + backend + autenticación), el despliegue, cómo orquestar a tu equipo de agentes y cómo venderlo caro.

Última actualización: mayo 2026.

---

## 1. La idea en una frase

No vendes "páginas": vendes un sistema. Tienes un **equipo de 9 agentes especializados** (carpeta `agentes/`) que cubren cada parte de una web profesional, y dos **stacks estándar** según el proyecto. Tú diriges; los agentes ejecutan. El resultado es consistente, rápido de producir y caro de aspecto.

---

## 2. Los dos tiers (elige según el proyecto)

Como vendes de todo un poco, trabajas con dos configuraciones. La regla es simple: **¿la web necesita usuarios que inicien sesión o datos guardados por usuario?**

### Tier 1 — Sitio estático premium
**Para**: landings, webs de negocio, restaurantes, clínicas, agencias, portfolios, lanzamientos.
**Stack**: HTML + CSS moderno + JavaScript vanilla (o **Astro** si hay muchas páginas o blog).
**Hosting**: Hostinger, Netlify o Vercel. Sin build complejo.
**Por qué**: rapidísimo, baratísimo de hospedar (márgenes altos para ti), y con las skills de diseño que ya tienes (`adrian-saenz-hostinger-premium-website`, `static-taste-frontend`) el acabado es de agencia.
**Funcionalidad extra sin backend**: formularios (Formspree/Netlify Forms), reservas (incrustar Calendly), pagos simples (enlaces de Stripe).

### Tier 2 — App con usuarios
**Para**: SaaS, áreas de cliente, e-commerce con cuentas, reservas con gestión, paneles, cualquier cosa con login o pagos recurrentes.
**Stack**:
- **Frontend**: Next.js (App Router) + React + TypeScript + Tailwind CSS + shadcn/ui
- **Base de datos + backend**: Supabase (Postgres) con Row Level Security (RLS)
- **Autenticación**: Supabase Auth (cookies con `@supabase/ssr`)
- **Pagos**: Stripe · **Email**: Resend
- **Despliegue**: Vercel (frontend) + Supabase gestionado

**Por qué este stack y no otro**: es el que tiene **más soporte en herramientas de IA** (más ejemplos = Claude lo construye mejor y con menos errores), **APIs estables**, patrones predecibles, y cuesta **0 €/mes** en MVP y menos de ~200 €/mes con tracción. Es el estándar de facto para SaaS en 2026. Traducido a tu negocio: produces más rápido, con menos bugs, y escalas sin rehacer.

> Regla de oro: empieza siempre en Tier 1. Sube a Tier 2 solo cuando el proyecto pida login, datos por usuario o pagos recurrentes. No metas complejidad que el cliente no necesita.

---

## 3. Cómo se conecta todo (la parte que casi nadie explica bien)

### En Tier 1 es lineal
Navegador → HTML/CSS/JS servido por el host. Los formularios envían a un servicio externo (Formspree/Netlify). No hay base de datos propia. Simple y robusto.

### En Tier 2, el flujo de una petición es así

```
Usuario (navegador)
        │
        ▼
Frontend Next.js  ── Server Components renderizan en el servidor
        │
        ▼
Server Action / Route Handler   ← aquí vive la lógica y los secretos
        │
        ▼
Cliente de Supabase  ── envía el JWT del usuario (vía cookies @supabase/ssr)
        │
        ▼
Postgres con Row Level Security (RLS)
        │
        ▼
La política RLS lee auth.uid() del JWT y SOLO devuelve las filas de ese usuario
```

Las piezas y cómo encajan:

1. **Autenticación es el pegamento.** Cuando el usuario hace login, Supabase Auth guarda la sesión en **cookies**. El paquete `@supabase/ssr` hace que esa sesión viaje en cada petición del servidor, de modo que la base de datos siempre sabe **quién** está pidiendo los datos.

2. **RLS es la seguridad real.** Activas Row Level Security en cada tabla con datos de usuario y escribes políticas con `auth.uid()`. Así, aunque la clave pública esté en el navegador, **nadie puede leer datos de otro**. Sin RLS, esa clave dejaría los datos al descubierto: es el error nº 1 que hay que evitar.

3. **Dos claves, dos mundos:**
   - Clave **pública** (`anon` / `sb_publishable_...`): puede ir al navegador. Está protegida por RLS.
   - Clave **secreta** (`service_role` / `sb_secret_...`): **JAMÁS** sale al cliente. Solo en código de servidor. Salta RLS, así que es peligrosa si se filtra.
   - (Las claves `anon`/`service_role` antiguas funcionan hasta finales de 2026, pero conviene usar ya las nuevas `publishable`/`secret`.)

4. **El frontend no habla con la base de datos para cosas sensibles.** Pasa por server actions/route handlers. Ahí validas la entrada, aplicas la lógica y guardas los secretos.

5. **Pagos**: Stripe. El checkout lo lanza el servidor; un **webhook** (verificado con firma) confirma el pago y actualiza la base de datos. La clave secreta de Stripe vive solo en el servidor.

6. **Tipos compartidos**: generas los tipos TypeScript desde el esquema de Supabase, así Frontend y Backend hablan el mismo idioma y se evitan bugs.

### Variables de entorno típicas (Tier 2)
- `NEXT_PUBLIC_SUPABASE_URL` y la clave **pública** → visibles en cliente.
- Clave **secreta** de Supabase, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` → solo servidor.
En Vercel + Supabase, la integración oficial inyecta varias de estas variables automáticamente al desplegar.

---

## 4. El equipo de agentes y cómo orquestarlo

Tienes 9 roles en `agentes/`. Cada uno es un "empleado" con instrucciones detalladas. El flujo de un proyecto típico:

| Fase | Agente | Entregable |
|------|--------|-----------|
| 0. Encargo | **Orquestador** | Tipo de web, stack elegido, plan por fases |
| 1. Cimientos | **Arquitecto** | Estructura de carpetas, modelo de datos, mapa de conexión |
| 2. Dirección de arte | **Diseñador UX/UI** | Brand book: tipografía, color, espaciado, motion |
| 3. Interfaz | **Frontend** | Páginas y componentes responsive y pulidos |
| 4. Datos y lógica* | **Backend** | Tablas, RLS, API, Stripe, emails |
| 5. Acceso* | **Auth/Seguridad** | Login, registro, rutas protegidas, blindaje |
| 6. Palabras | **Copy/SEO** | Textos que venden + metadatos |
| 7. Calidad | **QA/Testing** | Informe de revisión, bugs corregidos |
| 8. Cierre | **Comercial/Entrega** | Despliegue, traspaso, propuesta y precio |

\* Fases 4 y 5 solo en Tier 2.

### Tres formas de usar a los agentes
1. **Pegar el rol en el chat**: abre el `.md` del agente, copia su contenido y pégalo antes de tu petición. Rápido y funciona en cualquier sitio.
2. **Como skills/subagentes**: si usas Claude Code o Cowork con skills, cada archivo lleva cabecera compatible; instálalos y Claude los activa solo.
3. **En paralelo**: Frontend y Backend pueden avanzar a la vez una vez el Arquitecto fijó la estructura. El Orquestador reparte y luego junta.

### Apóyate en lo que ya tienes
Las skills `design-reference`, `frontend-design`, `static-taste-frontend` y `adrian-saenz-hostinger-premium-website` ya cubren gran parte del diseño y el frontend estático. Los agentes nuevos (Arquitecto, Backend, Auth, QA, Copy/SEO, Comercial) añaden lo que falta para una web completa de Tier 2 y para venderla.

---

## 5. Qué hace que una web parezca de 10.000 €

El cliente decide en milisegundos (efecto halo): un hero pulido hace que asuma que todo lo demás es igual de bueno. Las palancas concretas:

- **Tipografía con carácter**: titulares grandes, una pareja de fuentes con personalidad (idealmente variable), escala clara. Es lo que más "sube de gama".
- **Espacio generoso**: el aire es lujo. Secciones amontonadas = barato.
- **Un solo acento de color** + neutros bien escalados. Nada de arcoíris ni gradientes morado-azul genéricos.
- **Motion sutil**: fade-in al hacer scroll, hover suave, transiciones de página. Sutil gana a espectacular en webs de negocio. Respeta `prefers-reduced-motion`.
- **Hero impecable**: un titular, una idea, una imagen fuerte, un CTA claro.
- **Detalles de acabado**: estados de carga/vacío/error, microcopy cuidado, imágenes optimizadas y tratadas (no stock obvio), responsive perfecto.
- **Velocidad**: Lighthouse > 90. Una web rápida se percibe como cara y Google la premia.

Antipatrones que delatan lo barato/IA: múltiples acentos compitiendo, emojis como iconos, sombras duras, tarjetas todas iguales sin jerarquía, "lorem ipsum" olvidado, stock photos sin tratar.

---

## 6. Flujo de trabajo paso a paso (checklist maestro)

1. **Briefing** (Orquestador): tipo de web, marca, funcionalidad, contenido, plazo, presupuesto.
2. **Decisión de tier** y plan de fases.
3. **Arquitectura** (solo si Tier 2): carpetas, modelo de datos, variables de entorno.
4. **Brand book** (Diseñador): fuentes, paleta, espaciado, motion.
5. **Maquetación** (Frontend): páginas + componentes, responsive, estados.
6. **Backend + Auth** (Tier 2): tablas, RLS, login, pagos, emails.
7. **Copy + SEO**: textos que convierten + title/meta/OG/schema/sitemap.
8. **QA**: funcionalidad, responsive (360/768/1280), Lighthouse, accesibilidad, seguridad (un usuario no ve datos de otro), pulido visual.
9. **Despliegue** (Comercial): producción en dominio del cliente, servicios en modo live, HTTPS, analítica.
10. **Traspaso**: documento de uso + propuesta de mantenimiento.

No entregues nada con fallos bloqueantes en QA.

---

## 7. Cómo venderlo (que pague precio premium)

- **Vende resultado, no horas**: más reservas, más clientes, más confianza. No "5 páginas".
- **Paquetiza en niveles** (Esencial / Profesional / Premium): el cliente elige y sube de gama solo.
- **Justifica el precio de agencia** con lo que de verdad das: diseño a medida, copy que convierte, SEO técnico, velocidad, seguridad real y soporte.
- **Cobra mantenimiento mensual** (hosting + cambios + soporte + seguridad). Es lo que hace el negocio rentable y recurrente.
- **Demuestra**: antes/después, captura de Lighthouse, un par de casos.

Plantilla de propuesta:

> **Proyecto**: web a medida para [cliente]
> **Incluye**: diseño premium, [n] páginas, copy + SEO, [login/pagos si aplica], optimización y seguridad, despliegue y formación.
> **Inversión**: [precio] · **Mantenimiento**: [cuota]/mes · **Plazo**: [semanas] · **Garantía**: [revisiones]

---

## 8. Errores caros que NO debes cometer

1. Exponer la clave **secreta** (`service_role`/`sb_secret`) en el cliente. Solo servidor.
2. Olvidar **activar RLS**: la clave pública dejaría los datos al descubierto.
3. Confiar en validaciones solo del cliente: valida siempre en el servidor.
4. Webhooks de Stripe sin verificar la firma.
5. Meter Tier 2 (login, base de datos) cuando el cliente solo necesitaba una landing.
6. Entregar sin QA real en móvil y sin probar que un usuario no accede a datos de otro.
7. Dejar "lorem ipsum", enlaces rotos o imágenes pesadas: mata la percepción de calidad.

---

## 9. Referencias

- [The Best SaaS Stack in 2026 — Makerkit](https://makerkit.dev/blog/saas/saas-stack-2026)
- [Best Tech Stack to Build a SaaS in 2026 — Startupa](https://startupa.ge/blog/best-tech-stack-saas-2026)
- [Build a User Management App with Next.js — Supabase Docs](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security in Supabase (Next.js, 2026) — Starmorph](https://blog.starmorph.com/blog/row-level-security-supabase-tables-nextjs)
- [Stripe & Supabase SaaS Starter Kit — Vercel](https://vercel.com/templates/next.js/stripe-supabase-saas-starter-kit)
- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Web Design Trends 2026 — Figma](https://www.figma.com/resource-library/web-design-trends/)
- [Design Psychology: Premium Web Design 2026 — Ariel Digital](https://www.arieldigitalmarketing.com/blog/design-psychology-premium-web-design-2026/)
