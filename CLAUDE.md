# Kaos Agency — Fábrica de webs premium

Este repositorio es el sistema de trabajo de la agencia: un equipo de agentes especializados para crear webs que parecen de 10.000 € y venderlas por lo que valen.

## Manual de referencia

Sigue siempre el PLAYBOOK: stacks (Tier 1 / Tier 2), cómo se conecta todo, flujo de trabajo, checklist maestro y cómo vender.

@PLAYBOOK.md

> Nota: donde el PLAYBOOK habla de la carpeta `agentes/`, los roles están instalados como skills en `.claude/skills/`. La versión resumida del manual también está disponible como skill: `playbook-webs-premium`.

## El equipo (skills en `.claude/skills/`)

| Fase | Skill | Cuándo |
|------|-------|--------|
| 0. Encargo | `orquestador-web` | SIEMPRE al empezar un proyecto o si no sabes por dónde seguir |
| 1. Cimientos | `arquitecto-web` | Stack, carpetas, modelo de datos, variables de entorno |
| 2. Dirección de arte | `disenador-ux-ui` | Brand book antes de maquetar |
| 3. Interfaz | `frontend-web` | Páginas y componentes |
| 4. Datos y lógica* | `backend-web` | Tablas, RLS, API, Stripe, emails |
| 5. Acceso* | `auth-seguridad` | Login, registro, rutas protegidas |
| 6. Palabras | `copy-seo` | Textos que venden + metadatos |
| 7. Calidad | `qa-testing` | Antes de entregar, siempre |
| 8. Cierre | `comercial-entrega` | Despliegue, traspaso, propuesta y precio |

\* Solo Tier 2 (webs con login, datos por usuario o pagos).

## Reglas de la casa

- Empieza siempre en Tier 1; sube a Tier 2 solo si el proyecto lo pide.
- Nunca expongas claves secretas en el cliente y activa RLS en todas las tablas con datos de usuario.
- No se entrega nada con fallos bloqueantes en QA.
- Responde en español, con tono cercano y profesional.
