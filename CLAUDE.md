# CLAUDE.md — 305 Ruta Miami
> **Fuente de verdad ÚNICA y VIVA del proyecto.** Si otro documento contradice a este, este gana.
> Última actualización: 11 junio 2026. Tras cada fase completada, actualizar la sección "Estado".
> PROHIBIDO guardar secretos aquí (contraseñas, llaves, tokens). Este archivo se commitea al repo público.

---

## 1. Qué es este proyecto

**305 Ruta Miami** (`305rutamiami.com`) — directorio bilingüe (español primero, EN segundo) de
experiencias en Miami, monetizado con listings de negocios pagados (B2B, suscripción mensual).

**Estrategia vigente — cabeza de playa:** la PESCA es el nicho principal (charters, renta de botes,
jetski — el cluster náutico). Todo contenido nuevo e inversión de venta se concentra ahí hasta
dominarlo; las demás categorías (playa, buceo, exploración, bares/restaurantes) se mantienen como
activos SEO pero no reciben inversión nueva. Expansión a otras categorías SOLO después de ganar pesca.

**Diferenciador:** información local confiable, precisa y honesta — datos reales o nada.
Jamás inventar ratings, cifras de tráfico, reseñas ni estadísticas sin fuente.

**Modelo de operación:** sistema de mínima intervención. La operación (cobros, altas de suscriptores,
métricas) se automatiza; la calidad del contenido y el alta de cada listing pasan por Calixto.

---

## 2. Infraestructura (hechos, sin secretos)

| Pieza | Valor |
|---|---|
| Dominio | `305rutamiami.com` (Namecheap, DNS allí) |
| Hosting | GitHub Pages, repo `Ytntxnz8py/305-ruta-miami`, branch `main` |
| Carpeta local | `C:/Users/calil/OneDrive/Documentos/explora-miami` |
| Backend | Supabase, proyecto `305-ruta-miami` (us-east-2 Ohio) — esquema en `_bitacora/schema.sql` |
| Analítica | GA4 `G-7HMBMBQNQZ` (Property `538163810`) + proxy GAS para el admin |
| Email marketing | Brevo (gratis). Lista "Suscriptores 305 Ruta Miami" = **#3**. Dominio autenticado (DKIM/DMARC ✓) |
| Formularios B2B | Formspree (anunciantes.html) |
| Correo del negocio | contacto@305rutamiami.com (Zoho) |
| Pagos | Stripe — integración completa pendiente (Fase 7) |

Secretos: viven SOLO en `_privado/` (gitignored) o en los paneles de cada servicio. Nunca en código ni docs.

---

## 3. Stack y convenciones de código

- **HTML/CSS/JS puro, ES5 (`var`)** — sin frameworks, sin build step, sin ES6 modules.
- **Bilingüe SIEMPRE:** spans `.lang-es`/`.lang-en` o `data-i18n`, según el patrón de cada página.
- **CSS:** clases en español (BEM simplificado), variables en `:root` antes de hardcodear,
  NUNCA negro sólido (gradientes azul oscuro), `!important` solo en overrides documentados.
- **Animaciones:** toda animación/transform tiene contraparte `prefers-reduced-motion`.
- **Comentarios en español.** `esc(str)` para todo HTML dinámico (anti-XSS).
- Campo de rating en código = `rating` (no `calificacion`).
- Fotos: convención `nombre--autor.jpg` para atribución; fuentes CC0 (Unsplash/Pexels/Pixabay/NPS/Wikimedia
  verificando licencia). Licencias del hero en `assets/images/hero/CREDITOS.md`.

---

## 4. Reglas de trabajo PERMANENTES (no negociables)

1. Siempre en **rama**, nunca `main` directo. Verificar → confirmar con Calixto → fusionar (`--no-ff`) → borrar rama (`-d`).
2. **Nunca `git add .` / `-A`** — añadir archivos por nombre. Commitear ANTES de fusionar.
3. **Auditar primero:** leer el código real y reportar (archivo:línea) antes de implementar. Piloto antes de replicar.
4. **Datos reales o nada.** Estados vacíos honestos. Nada de claims sin fuente.
5. Reutilizar CSS/clases existentes; **no CSS nuevo** salvo que la tarea lo pida explícitamente.
6. Un commit por tema. Diff resumido al final. Calixto autoriza el merge, siempre.
7. **Nada provisional ni cabos sueltos:** cada módulo se cierra completo antes del siguiente.
8. Coaching de terminal un paso a la vez; Calixto envía capturas y verifica en vivo (hard refresh) tras cada deploy.
9. Si surge una decisión de negocio a mitad de tarea: FRENAR y preguntar. El que edita no decide alcance.

---

## 5. Precios y oferta (verdad = Supabase, tabla `planes`)

- **Esencial $99/mes · Profesional $149/mes · Élite $249/mes.** Sin plan anual. Sin centavos.
- **Precio de fundador, sin cupo:** quien entra congela su tarifa de por vida (mientras la suscripción
  siga activa; reactivación ≤30 días de la fecha de renovación conserva el precio — cláusula 11 de términos).
  La congelación es automática: las suscripciones existentes de Stripe no se tocan al subir precios de lista.
- PROHIBIDO en beneficios: "gerente de cuenta", "llamadas mensuales" o cualquier obligación recurrente
  de tiempo personal. Servicios incluidos tipo GBP son de configuración ÚNICA.

---

## 6. Estado actual y plan de fases

**Completado:** Supabase Módulos 1-2 (7 tablas + RLS + triggers + auth + admin creado) ·
Fase 1 entera (GA4 en todas las páginas, precios verdaderos + banda fundador, copy honesto,
disclaimer Formspree, newsletter→Brevo con doble opt-in + gracias.html, dominio autenticado,
repo limpio). 21 páginas de destinos vivas.

**Pendiente, en orden (una fase = una rama):**
- **F2** Categorías náuticas: `renta-botes` y `jetski` en Supabase + charters/botes/jetski en anunciantes
  (sección "¿encaja aquí?" + formulario). Incluye micro-fixes: badge fundador que se parte en móvil,
  "panel de anunciante" → "reporte mensual", JS muerto de togglePrecio.
- **F3** Hub `/pesca` — LA guía de pesca de Miami (laboratorio de la dirección de diseño v1).
- **F4** Conexión Supabase: anon key + fetch ES5 + sembrar 2-3 charters reales + RLS verificada en vivo.
- **F5** Index gira al mar (solo-visitante) + página `/destinos` con selector y buscador.
- **F6** Blog de pesca (artículos cola larga, continuo).
- **F7** Stripe COMPLETO: 7a auth portal/admin (Supabase Auth — aquí se rota y cierra el ADMIN_PASS),
  7b Checkout (Edge Function), 7c webhooks → `suscripciones`/`pagos` automáticos.
- **F8** Flujos Brevo: bienvenida automática + newsletter mensual + plantilla DOI con marca.
- **F9** Kit de venta + publicidad (solo cuando todo lo anterior esté firme).

**Pendientes menores anotados:** og:image propia (falta foto elegida) · renombrar propiedad GA4 e infra
GAS a marca 305 · mover repo fuera de OneDrive si reaparece el error mmap de git.

---

## 7. Dirección de diseño v1 (EN EXPLORACIÓN — se valida en el hub de pesca, F3)

- **Una página, un público:** index = solo visitante; anunciantes = solo B2B; portal = solo clientes.
- Base CLARA y aireada (blanco-arena); blanco puro #FFF para tarjetas/cuadros de contenido.
- Agua cristalina como atmósfera (hero, transiciones, ≤15% opacidad) — NUNCA detrás de texto.
- Acentos editoriales: peces locales (pez vela, dorado, tarpon, atún, tiburón) en fotos degradadas
  con mask CSS, como acento de sección, nunca bajo texto.
- Tarjetas de destino finas: foto 4:3 arriba, texto pequeño DEBAJO (no encima), chip de categoría,
  1 línea de gancho + 2 datos. Única firma de movimiento: lift 4px + zoom sutil de foto al hover.
- Menú de categorías fino estilo barra: emoji pequeño con micro-animación al hover + etiqueta corta.
- El dark ocean actual queda reservado como "momento de profundidad" (hub pesca) — narrativa
  aguas claras → azul profundo.
- Regla anti-deuda: cada pass de diseño REEMPLAZA al anterior, no se apila. Revisión de identidad
  solo entre fases, nunca a mitad de una.

---

## 8. Documentación — orden permanente

- **`CLAUDE.md` (este archivo):** única fuente viva. Se actualiza al cerrar cada fase.
- **`_bitacora/`:** registros históricos de sesiones y referencias técnicas (`schema.sql` es la
  referencia reproducible del backend). No se reescriben; se agregan.
- **`_archivo/`:** documentos de épocas superadas (Explora Miami, HANDOFF viejo). Solo lectura, gitignored.
- **`_privado/`:** secretos y setup sensible. Gitignored SIEMPRE.
- PROHIBIDO crear nuevos `.md` de "estado del proyecto" en la raíz — el estado vive aquí.
