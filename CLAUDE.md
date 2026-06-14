# CLAUDE.md — 305 Ruta Miami
> **Fuente de verdad ÚNICA y VIVA del proyecto.** Si otro documento contradice a este, este gana.
> Última actualización: 14 junio 2026 (logo y favicon de marca integrados en todo el sitio). Tras cada fase completada, actualizar la sección "Estado".
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
- **Fotos de especies (pesca):** son ORIGINALES creadas por Calixto (autor = dueño del proyecto), por lo
  que NO requieren atribución de terceros ni la convención `nombre--autor`. Único filtro pendiente:
  verificación propia de que cada foto corresponde a la especie correcta.

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
repo limpio). 21 páginas de destinos vivas. F2 categorías náuticas · F3 hub `/pesca` vivo ·
**F4 COMPLETA:** frontend conectado a Supabase (fetch ES5 + anon key pública en
`assets/js/pesca-charters.js`), 3 charters curados sembrados (con `zona`, `atiende_es`),
grants modelo mínimo seguro (anon+authenticated solo leen negocios/categorias/planes),
RLS verificada en vivo (clientes/suscripciones/pagos = permission denied para anon).
`archivos` queda sin grant para anon; se le dará GRANT cuando el frontend muestre
galerías (F7/Lote C). Pendiente F7: vista `negocios_publicos` para filtrar columnas.

**Diseño v2 — Lote A (index + `/destinos`) COMPLETO.** Index migrado al sistema v2 (Airbnb-limpio) +
nueva página `/destinos`. Pulido final del index cerrado, verificado en móvil y escritorio:
- Iconos v3 de categoría: SVG con color, bounce-in al cargar, gesto SOLO al hover (la bota patea en exploración).
- Sistema ÚNICO de color de categorías: cada chip usa el color de su icono — pesca coral, playa dorado,
  buceo turquesa, exploración verde, bares rosa.
- Tarjetas con sombra al hover y esquinas más redondeadas.
- Hero rediseñado: foto reducida + cuadro de texto sobrepuesto con sombra fija.
- Barra de categorías colapsable al scroll (coreografía tipo Airbnb).
- Evento `destination_click` RECONECTADO (estaba muerto desde antes del rediseño).
- Ajuste móvil posterior: tarjetas a 2 columnas (no 1 gigante), hero con aire (el cuadro no tapa la foto)
  y fotos de especies cortadas RE-ENCUADRADAS (la caja toma el ratio real de la imagen: el pez se ve completo).

**Marca — logo y favicon en todo el sitio COMPLETO** (rama `feat/logo-favicon`). Sistema de marca aplicado a las 42 páginas públicas:
- **Navbar:** símbolo `logo-horizontal.png` (marlin) + wordmark "305RutaMiami" en Playfair real al lado (Opción A); imagen decorativa, el `<a>` lo nombra con `aria-label`. En móvil (<560px) se muestra SOLO el símbolo, para no solapar con "Anuncia tu negocio".
- **Footer:** `logo-sello.png` reemplaza el wordmark de texto en los DOS sistemas (v2-footer ×2 a 48px, cf-footer ×40 a 72px).
- **Favicon:** set completo (`favicon.ico` + PNG 16/32/48/180/192/512) enlazado en el `<head>` de las 42 (ico + png 32/16 + apple-touch 180).
- **og:image:** `logo-limpio.png` en index/destinos/anunciantes (sustituye el istockphoto genérico) + twitter:image; añadido en gracias/privacidad/terminos. Se RESPETARON las og:image propias y buenas: `og-pesca` (hub + 10 especies) y las fotos hero de los 21 destinos y el blog.
- **Rutas ABSOLUTAS** (`/assets/images/logo/...`): sirven igual en raíz, `/destinos/` y `/pesca/especies/` (verificado `200` en las tres profundidades). Funciona por el dominio apex; se romperían solo en un sub-path tipo `usuario.github.io/repo/`.
- Archivos de marca en `assets/images/logo/` (10 archivos). Maestro original: `logo-oficial.png` (raíz, sin trackear).

**Pendiente, en orden (una fase = una rama):**
- **F5** Index gira al mar (solo-visitante) + página `/destinos` con selector y buscador.
- **F6** Blog de pesca (artículos cola larga, continuo).
- **F7** Stripe COMPLETO: 7a auth portal/admin (Supabase Auth — aquí se rota y cierra el ADMIN_PASS),
  7b Checkout (Edge Function), 7c webhooks → `suscripciones`/`pagos` automáticos.
- **F8** Flujos Brevo: bienvenida automática + newsletter mensual + plantilla DOI con marca.
- **F9** Kit de venta + publicidad (solo cuando todo lo anterior esté firme).
- **Lote SEO (arrancar pronto, corre en paralelo — el SEO tarda meses):** optimizar meta-descriptions,
  títulos y schema de TODAS las páginas (nuevas y existentes); actualizar `sitemap.xml`; registrar en
  Google Search Console para indexación. Favicon de marca = HECHO (set completo). og:image base = HECHO
  (`logo-limpio` en index/destinos/anunciantes, respetando `og-pesca`). **Pendiente del lote:** sustituir
  ese logo por una `og:image` de **foto 1200×630 con el logo encima**, por página o por sección (el logo
  es solución temporal de marca, no la óptima para compartir). Objetivo doble: indexación en buscadores
  Y citabilidad por motores de IA (misma base: contenido claro + datos estructurados).

**Decisión de producto PENDIENTE — Élite automático en destacados de portada:** cuando un negocio con
plan Élite esté activo, debe aparecer automáticamente en los destinos destacados del index y desplazar a
uno de los destinos curados (`destacado_home`) NO patrocinados. Preguntas abiertas: nº de slots Élite en
portada · comportamiento cuando hay más Élite que slots (rotación/orden) · fuente de datos del grid (hoy
`DESTINOS_DEFAULT` en JS; probablemente requiere migrar el grid del index a Supabase, como el hub de
pesca). Distinguir SIEMPRE `destacado_home` (curatorial) de `destacado` (plan pago). Abordar junto con la
migración del index a Supabase, post-Stripe.

**Pendientes menores anotados:** og:image propia (falta foto elegida) · renombrar propiedad GA4 e infra
GAS a marca 305 · mover repo fuera de OneDrive si reaparece el error mmap de git.

---

## 7. Dirección de diseño v1 (SUPERADA — ver §7b "Ley de diseño v2"; se conserva como historia)

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

## 7b. Ley de diseño v2 (APROBADA — rige todo rediseño desde F4)

**Tokens base:**
- Fondo `#FFF` puro · hairline `#EAEAEA` · radio `12px` · UNA sombra, solo en hover.
- Tipografía: Playfair SOLO en H1/H2; todo lo demás Inter.
- Color de acción visitante: `#007487`. Color de acción B2B: `#C0392B` — SOLO en
  anunciantes + el "susurro" B2B; jamás en páginas de visitante.
- Mostaza: SOLO para el badge "Destacado". Chips de categoría: pasteles.

**Componentes:**
- Tarjeta de destino: foto 1:1 + título + 1 línea. Grid `minmax(182px, 1fr)`.
- Heroes compactos (no pantallas completas de hero).
- Etiqueta B2B: ES "Anuncia tu negocio" / EN "List your business".

**Kill list (eliminar al pasar por cada página):**
quiz · números inventados/∞ · globo de emojis · marquesina · emojis de UI (→ SVG) ·
botones metálicos/tilt/shine · lenguaje auto-certificante de cara al público.

**Contrato de no-ruptura (verificar tras cada pass):**
preservar selectores que usa `analytics.js` · sistema i18n (`.lang-es`/`.lang-en`) ·
formularios (Formspree/Brevo) · JSON-LD, canonical, OG y URLs · fetch de charters
(`pesca-charters.js` y la sección `#nautico`).

**Lotes de aplicación (en orden):**
- **A** index + `/destinos` + tokens globales ✅ **COMPLETO** · **B** anunciantes (listing explotado) ·
- **C** hub pesca + especies · **D** páginas de destino individuales · **E** blog + legales + barrido final.

---

## 8. Documentación — orden permanente

- **`CLAUDE.md` (este archivo):** única fuente viva. Se actualiza al cerrar cada fase.
- **`_bitacora/`:** registros históricos de sesiones y referencias técnicas (`schema.sql` es la
  referencia reproducible del backend). No se reescriben; se agregan.
- **`_archivo/`:** documentos de épocas superadas (Explora Miami, HANDOFF viejo). Solo lectura, gitignored.
- **`_privado/`:** secretos y setup sensible. Gitignored SIEMPRE.
- PROHIBIDO crear nuevos `.md` de "estado del proyecto" en la raíz — el estado vive aquí.
