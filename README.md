# Sistema de Webs Premium — Tu equipo de agentes

Este es un sistema completo para fabricar webs profesionales y vendibles (que parezcan de 10.000 €) usando Claude como si tuvieras una agencia entera trabajando para ti.

Incluye:

- **`PLAYBOOK.md`** — el manual maestro: qué stack usar y por qué, cómo se conecta todo (frontend + backend + auth), cómo desplegar, cómo orquestar a los agentes y cómo venderlo caro.
- **`agentes/`** — 9 "empleados" especializados. Cada archivo es un rol con instrucciones detalladas que puedes invocar para cada parte del proyecto.

## Cómo usar los agentes

Tienes dos formas, según dónde trabajes con Claude:

### Opción A — Pegar el rol en el chat (la más simple, funciona ya)
Abre el agente que necesites (por ejemplo `agentes/03-frontend.md`), copia su contenido y pégalo al inicio de tu mensaje cuando le pidas esa parte del trabajo. Claude adoptará ese rol.

### Opción B — Instalarlos como skills/subagentes (reutilizable)
Si usas Claude Code o Cowork con skills, cada agente lleva una cabecera (`name`, `description`) compatible. Copia cada carpeta de agente a tu directorio de skills o de subagentes y Claude los activará solo cuando detecte que encajan con la tarea.

## El flujo en una frase

`Orquestador` reparte el trabajo → `Arquitecto` decide stack y estructura → `Diseñador` define el look premium → `Frontend` y `Backend` construyen en paralelo → `Auth/Seguridad` blinda el acceso → `Copy/SEO` rellena con texto que vende → `QA` revisa todo → `Comercial/Entrega` lo empaqueta y se lo pasa al cliente.

Empieza siempre por el **PLAYBOOK**.

> 📌 **En este repositorio** los 9 agentes ya están instalados como skills en `.claude/skills/` (en lugar de la carpeta `agentes/`), junto con la skill `playbook-webs-premium`. El manual completo está en `PLAYBOOK.md`.
