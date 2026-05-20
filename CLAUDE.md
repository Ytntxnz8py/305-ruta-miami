# Explora Miami — Guía completa del proyecto

> **Fecha de última actualización:** 20 mayo 2026
> Documento diseñado para que cualquier instancia de Claude retome el proyecto desde cero sin perder contexto.

---

## 1. Concepto y objetivo

Directorio bilingüe (ES/EN) de experiencias outdoor en Miami con panel de administración privado. Monetizado con listings de empresas locales, afiliados Amazon y servicios web.

**Categorías de destinos:**
- 🏔️ **Tierra** — senderismo, ciclismo, camping, arqueología
- 🌊 **Mar** — buceo, kayak, snorkeling, paddle board, playa

---

## 2. Deploy y acceso

| Item | Valor |
|---|---|
| **URL pública** | `https://ytntxnz8py.github.io/mi-tienda/` |
| **Repositorio** | `https://github.com/Ytntxnz8py/mi-tienda` |
| **Branch** | `main` |
| **Admin URL** | `https://ytntxnz8py.github.io/mi-tienda/admin.html` |
| **Contraseña admin** | `miami2026` |
| **Dominio propio** | ⏳ Pendiente comprar en Namecheap |

---

## 3. Estructura completa de archivos

```
explora-miami/
├── index.html              ← sitio público bilingüe (776 líneas)
├── admin.html              ← panel de administración privado
├── CLAUDE.md               ← este archivo
├── skills-lock.json        ← registro de skills instaladas
├── assets/
│   ├── css/
│   │   ├── styles.css      ← estilos del sitio público (2,970+ líneas)
│   │   └── admin.css       ← estilos del panel admin
│   ├── js/
│   │   ├── main.js         ← lógica pública + datos de destinos (1,823 líneas)
│   │   ├── admin.js        ← lógica del panel admin
│   │   ├── i18n.js         ← sistema de traducción ES/EN
│   │   └── analytics.js    ← eventos GA4 custom
│   ├── images/
│   │   ├── hero-bg.png                           ← ElevenLabs AI imagen (respaldo)
│   │   ├── photo-1595323397978-65433d24fc23.avif ← Foto hero actual (Miami skyline, uso libre)
│   │   ├── hero/                                 ← subcarpeta con hero-01..15.jpg + avif
│   │   └── istockphoto-*.jpg                     ← fotos de destinos
│   └── videos/
│       └── hero-tierra.mp4.mp4                   ← video de fondo sección intro
└── .agents/
    └── skills/
        ├── emil-design-eng/    ← emilkowalski/skill
        ├── impeccable/         ← pbakaus/impeccable
        ├── brandkit/           ← Leonxlnx/taste-skill (y 11 skills más)
        └── ui-ux-pro-max/      ← nextlevelbuilder/ui-ux-pro-max-skill
```

---

## 4. Stack técnico

- **HTML / CSS / JS puro** — sin frameworks, sin librerías externas
- **Mobile-first** — breakpoints: 560px y 768px
- **Fuentes** (Google Fonts): Cormorant Garamond (hero, ultra-thin italic) + Playfair Display (subtítulos) + Inter (cuerpo)
- **Comentarios** en español
- Sin transpilación, sin build step — desplegable directamente en GitHub Pages
- Variables ES5 (`var`) — sin ES6 modules para máxima compatibilidad
- **Imagen formats**: AVIF nativa (photo-1595323397978-65433d24fc23.avif) para hero

---

## 5. Paleta de colores

### Sitio público

| Variable CSS | Hex | Uso |
|---|---|---|
| `--blanco-arena` | `#FFFDF7` | Fondo principal |
| `--azul-cielo-suave` | `#E3F4FF` | Sección Mar |
| `--verde-tropical` | `#E8F5E9` | Sección Tierra |
| `--coral` | `#FF6B6B` | Acento, CTAs Tierra |
| `--turquesa` | `#00BCD4` | Acento, CTAs Mar |
| `--mostaza` | `#FFB300` | Badges, precios |
| `--texto-oscuro` | `#1a2a3a` | Texto principal |
| `--texto-medio` | `#4a6070` | Texto secundario |
| `--texto-suave` | `#4a6f82` | Texto terciario (WCAG AA ✓ 5.4:1) |
| `--turquesa-oscura` | `#0097a7` | Hover turquesa |
| `--coral-oscura` | `#c0392b` | Hover coral / badge difícil |
| `--verde-tierra` | `#7CB342` | Acento tierra |
| `--footer-ini` | `#00434F` | Footer gradiente inicio |
| `--footer-mid` | `#003240` | Footer gradiente medio |
| `--footer-fin` | `#002530` | Footer gradiente fin |

### Premium 3D (dark ocean section)

| Variable CSS | Hex | Uso |
|---|---|---|
| `--ocean-ini` | `#071e2b` | Fondo sección destinos |
| `--ocean-mid` | `#0a2d3f` | Fondo sección destinos |
| `--ocean-fin` | `#051822` | Fondo sección destinos |
| `--glass-bg` | `rgba(255,255,255,0.065)` | Fondo glassmorphism |
| `--glass-border` | `rgba(255,255,255,0.11)` | Borde glass |
| `--glass-blur` | `blur(22px) saturate(180%)` | Filtro glass |
| `--glass-shadow` | (layered) | Sombra multi-capa glass |

**Regla crítica:** NUNCA usar negro sólido — usar gradientes azul oscuro.

---

## 6. Arquitectura de datos (localStorage)

| Clave | Tipo | Descripción |
|---|---|---|
| `em_destinos` | JSON array | Destinos — sembrado desde `DESTINOS_DEFAULT` en `main.js` en la primera visita. Admin lee y escribe en la misma clave. |
| `em_destinos_version` | número | Versión actual: `2`. Si cambia, `obtenerDestinos()` re-siembra. |
| `em_contactos` | JSON array | Objetos `{ fecha, nombre, empresa, email, tel, servicio, mensaje }`. Exportable como CSV desde el admin. |
| `em_visitas` | JSON object | `{ "YYYY-MM-DD": número }` — un registro por día. Se siembran 14 días de datos demo en el primer acceso al admin. |
| `em_clics` | JSON object | `{ "idDestino": número }` — cuenta clics por destino. Registrado en `registrarClic(id)` en `main.js`. |
| `em_idioma` | string | `'es'` o `'en'` |
| `em_admin` (sessionStorage) | string | `'ok'` cuando hay sesión admin activa. sessionStorage (no persiste al cerrar pestaña). |

**Versión de datos:** `DESTINOS_VERSION = 2` en `main.js` y `admin.js` — ambos deben ser iguales. Al incrementarlo, `obtenerDestinos()` re-siembra el localStorage con los nuevos `DESTINOS_DEFAULT`.

---

## 7. Sistema de traducción i18n

### Elementos estáticos
- Atributo `data-i18n="clave"` → `aplicarIdioma()` en `i18n.js` actualiza `textContent`
- Atributo `data-i18n-ph="clave"` → actualiza `placeholder`

### Contenido dinámico (tarjetas JS)
- Spans con clase `.lang-es` / `.lang-en` dentro de cada tarjeta generada por JS
- Visibilidad controlada por CSS:
  ```css
  html.lang-en .lang-es { display: none; }
  html.lang-es .lang-en { display: none; }
  ```

### Prevención de flash (FOUC)
Script inline en `<head>` de `index.html` aplica `html.lang-*` antes del primer render, usando el valor de `localStorage('em_idioma')`.

### Toggle de idioma
Botón en el header llama `cambiarIdioma()` en `i18n.js` → guarda en localStorage → aplica clase en `<html>` → actualiza todos los `data-i18n`.

---

## 8. Estado actual del sitio — funcionalidades implementadas

### ✅ Sitio público (index.html)

#### Hero — Foto dominante Miami (estado actual)
- **Foto local AVIF** `photo-1595323397978-65433d24fc23.avif` — Miami skyline al atardecer; fondo directo en `.hero-arc` (NO en `.hero-bg`) — arquitectura corregida en commit `ad0d934`
- **Overlay gradiente** `165deg` oscuro (22%→90%) para legibilidad sobre foto
- **Fondo base** `#05131e` mientras carga la imagen
- **Eyebrow decorativo** `— South Florida —` con líneas horizontales (1px, 44px) a ambos lados del texto
- **TÍTULO: SpinningText SVG** (commit `7db83fa`) — texto "EXPLORA MIAMI ✦ SOUTH FLORIDA ✦" girando en círculo continuo sobre un `<path>` circular SVG de radio 25 en viewBox 100×100. Gira a 12s/vuelta con `@keyframes hero-spin-anim`. Ver sección 21 para detalle técnico completo.
- **Tags organizados** en fila horizontal con glassmorphism: ✨ Aventuras · 🌊 Playas · ☀️ Sol todo el año · 🌿 Naturaleza · 🐠 Arrecifes
- **Tagline** blanco trazo fino (weight 300, letter-spacing 0.06em)
- **2 CTAs glass** — Ver destinos / Ver mapa
- **Hero trail** — rastro de imágenes al mover el mouse (JS: `initHeroTrail`)
- **Scroll indicator** animado (flecha + línea)

#### Secciones
- **Intro** — 3 cards con video de fondo, identidad de color por posición
- **Destinos** — dark ocean bg (`#071e2b`) con filtros Tierra/Mar y grid de 9 destinos
- **Glassmorphism cards** — `backdrop-filter: blur(22px)`, mouse 3D tilt
- **Modal a pantalla completa** — galería 4 fotos, descripción larga, reseñas, mapas, botones

#### Roadmap Animado de Destinos (reemplaza mapa + globo desde commit 50bcb08)
- **SVG path animado por scroll** — `strokeDashoffset` se reduce según posición vertical del canvas en viewport. Gradiente mostaza→coral→coral
- **9 destinos principales** (rdm-milestone--tierra/mar) — dot de 14px, anillo pulsante, bubble glassmorphism
- **15 lugares icónicos de ref** (rdm-milestone--ref) — dot de 8px coral, sin anillo, bubble pequeño. Reducidos de 20→15 en commit `93e414d` eliminando los 5 más solapados; reposicionados con separación mínima de 8%
- **IntersectionObserver stagger** — 80ms entre cada milestone; tierra/mar primero (idx 0-8), ref después (idx 9-23)
- **Tooltip flotante** `initRoadmapTooltip()` — tarjeta `position: fixed` con descripción ~30 palabras, aparece en mouseenter y desaparece en mouseleave
  - Barra acento coral→mostaza
  - Nombre extraído del atributo `title` (antes de ` — `)
  - Clampeado al viewport (no se sale de pantalla)
  - Oculto en táctil (`@media hover: none`)
- **Cursor** — `cursor: pointer` (antes era `cursor: help` que mostraba ícono ❓ del navegador)
- **Dots con doble anillo** — `box-shadow: 0 0 0 3px white, 0 0 0 5.5px rgba(0,0,0,0.22)` para contraste sobre fondo arena
- **Bubbles (etiquetas)** — fondo `rgba(255,255,255,0.96)` con borde sutil, `font-weight: 600`
- **Leyenda** — tierra / mar / lugares icónicos / ruta del viajero

#### Otras secciones
- **"Trabaja con nosotros"** — formulario de 6 campos, validación, mensaje de éxito
- **Footer** — gradiente azul oscuro, logo, navegación, íconos sociales
- **Bilingüe** ES/EN — toggle en navbar, `data-i18n` + `.lang-es/.lang-en`
- **SEO** — meta, OG, Twitter Card, Schema JSON-LD, canonical
- **prefers-reduced-motion** — desactiva todas las animaciones

### ✅ Panel admin (admin.html)
- Login con contraseña (`miami2026`) — sesión en sessionStorage
- Dashboard con métricas reales de localStorage:
  - Visitas hoy / semana / mes
  - Total clics en destinos
  - Formularios de contacto recibidos
  - Destinos activos
- Gráfico de barras CSS — visitas últimos 7 días por día de la semana
- Tabla de clics por destino — ranking con barra de porcentaje, ordenado descendente
- CRUD de destinos — editar cualquier campo de los 9 destinos
- Gestión de mensajes — lista de formularios recibidos, marcar como leídos
- Exportar contactos como CSV
- Datos demo — siembra 14 días de visitas históricas en el primer acceso
- XSS protection — función `esc(str)` en todo el admin que genera HTML dinámico

---

## 9. Los 9 destinos reales

Todos los destinos están en `DESTINOS_DEFAULT` en `main.js` (líneas 9–451). Cada uno tiene:
- `id`, `nombre_es/en`, `descripcion_es/en`, `descripcion_larga_es/en`
- `como_llegar_es/en`, `foto`, `galeria` (4 fotos Unsplash)
- `lat`, `lng`, `dificultad_es/en`, `dificultad_clase` (facil/moderado/dificil)
- `precio`, `horarios`, `tipo` (mar/tierra), `tipo_es/en`
- `telefono`, `web_oficial`, `mejor_epoca`
- `google_maps_url`, `apple_maps_url`, `resenas_url`
- `activo: true`
- `resenas` — array de 3 reseñas con `nombre`, `inicial`, `color`, `fecha`, `estrellas`, `texto_es/en`

| # | Nombre | Tipo | Coordenadas | Precio |
|---|---|---|---|---|
| 1 | Everglades National Park | tierra | 25.2866, -80.8987 | $35/vehículo 7 días |
| 2 | John Pennekamp Coral Reef SP | mar | 25.1288, -80.4072 | $8/pers + tours $32+ |
| 3 | Biscayne National Park | mar | 25.4729, -80.3340 | Gratis + tours $45–65 |
| 4 | Bill Baggs Cape Florida SP | mar | 25.6671, -80.1584 | $8/vehículo |
| 5 | Oleta River State Park | tierra | 25.9103, -80.1390 | $6/vehículo |
| 6 | Virginia Key Beach Park | mar | 25.7355, -80.1573 | $8/vehículo |
| 7 | Matheson Hammock Park | mar | 25.6680, -80.2747 | $8/vehículo |
| 8 | Crandon Park | mar | 25.7024, -80.1556 | $8/vehículo |
| 9 | Arch Creek Park | tierra | 25.8955, -80.1678 | Gratis |

---

## 10. Google Analytics 4

- **Archivo:** `assets/js/analytics.js`
- **Measurement ID en código:** `G-7HMBMBQNQZ` (actualmente en `index.html` línea 75 y 80)
- **Estado:** ⚠️ El ID `G-7HMBMBQNQZ` está hardcodeado pero puede ser un placeholder. Verificar en `analytics.google.com` que corresponde a una propiedad real y activa.
- **Para conectar un ID real:** Reemplazar `G-7HMBMBQNQZ` en 3 lugares de `index.html` (script src, window.dataLayer, gtag config).

### Eventos implementados en analytics.js

| Evento | Disparador |
|---|---|
| `scroll_depth` | 25 / 50 / 75 / 100% de scroll |
| `section_view` | Sección visible por primera vez (threshold 35%) |
| `destination_click` | Clic en tarjeta de destino |
| `modal_open` | Apertura de modal de destino |
| `maps_click` | Clic en botón Google Maps |
| `apple_maps_click` | Clic en botón Apple Maps |
| `reviews_click` | Clic en "Ver reseñas" |
| `contact_form_click` | Primer clic en formulario Trabaja |
| `contact_form_submit` | Envío del formulario |
| `language_change` | Cambio ES ↔ EN |
| `filter_click` | Clic en filtro Tierra / Mar / Todos |

Todos los eventos usan la función wrapper `trackEvent(nombre, params)` que silencia errores si `gtag` no está disponible (sin conexión, ad-blockers).

---

## 11. Diseño — historial completo de passes CSS

`styles.css` tiene **cinco grandes bloques acumulativos**. **No eliminar ninguno** — cada uno corrige o extiende al anterior.

### Pass 1: Impeccable Audit (blockers + improvements)
Aplicado vía auditoría de `/impeccable`. Fixes:
- **BLOCKER:** `--texto-suave` `#8aacba → #4a6f82` (contraste 2.27:1 → 5.4:1 WCAG AA)
- **BLOCKER:** `.fade-up` `translateY(44px → 20px)` (demasiado brusco)
- **BLOCKER:** `.hero__titulo` `line-height: 0.95 → 1.0`
- **BLOCKER:** badge moderado `color #F57C00 → #A04800` (2.57:1 → 5.8:1)
- **BLOCKER:** badge difícil `color #FF6B6B → #c0392b` (2.64:1 → 5.15:1)
- **IMPROVEMENT:** Variables de footer en lugar de colores hardcoded
- **IMPROVEMENT:** Escala tipográfica con variables `--text-xs/sm/base/lg`
- **IMPROVEMENT:** `cubic-bezier(0.2, 0, 0, 1)` como timing estándar
- **IMPROVEMENT:** `@media (prefers-reduced-motion: reduce)` completo

### Pass 2: taste-skill soft
Aplicado variante soft — solo tipografía, espaciado, composición. No toca HTML ni JS.
- `.seccion-titulo`: `clamp(2rem, 4.5vw, 3.2rem)`, `letter-spacing: -0.025em`, subrayado gradiente tricolor
- Intro cards: background tintado + `border-top` de color por posición (turquesa/mostaza/coral)
- Destination cards: `border-top` por tipo que se intensifica en hover
- Hero overlay: gradiente diagonal `rgba(0,55,68,0.52) → rgba(0,150,180,0.28) → rgba(190,55,40,0.46)`
- Hero etiqueta: `backdrop-filter: blur(6px)`, border sutil
- Benefits: iconos con gradiente rotado por `nth-child`
- Form labels: acento de 3px con gradiente turquesa→mostaza
- Navbar: subrayado animado `scaleX(0 → 1)` en hover con gradiente turquesa→coral
- Footer: `max-width: 22ch` en tagline, underline offset en hover

### Pass 3: Premium 3D Redesign
El bloque más reciente. Implementa el look agencia $20K.

**Dark ocean section:**
```css
.seccion-destinos {
  background: linear-gradient(160deg, #071e2b 0%, #0a2d3f 48%, #051822 100%);
}
```
Con luces de ambiente turquesa/coral difuminadas vía `::before` radial-gradients.

**Glassmorphism cards:**
```css
.destino-card {
  background: rgba(255,255,255,0.065);
  backdrop-filter: blur(22px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.11);
  box-shadow: 0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10);
}
```

**Hero orbs:**
```css
.hero::before {
  background:
    radial-gradient(ellipse 42% 52% at 18% 28%, rgba(0,188,212,0.22) 0%, transparent 62%),
    radial-gradient(ellipse 36% 46% at 82% 72%, rgba(255,107,107,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 28% 38% at 62% 18%, rgba(255,179,0,0.12) 0%, transparent 55%);
  animation: orbs-drift 14s ease-in-out infinite alternate;
}
```

**Animación cinética de entrada (3 columnas):**
```css
/* Izquierda: rotateY(-10deg) */
#destinosGrid .destino-card:nth-child(3n+1).fade-up { transform: translateY(40px) rotateX(8deg) rotateY(-10deg); }
/* Centro: cae desde arriba con más profundidad */
#destinosGrid .destino-card:nth-child(3n+2).fade-up { transform: translateY(80px) rotateX(18deg); }
/* Derecha: rotateY(+10deg) */
#destinosGrid .destino-card:nth-child(3n+3).fade-up { transform: translateY(40px) rotateX(8deg) rotateY(10deg); }
/* .visible resetea todo a 0 */
```

**Grid escalonado:**
```css
@media (min-width: 768px) {
  #destinosGrid .destino-card:nth-child(3n+2) { margin-top: 3rem; }
}
#destinosGrid { perspective: 1400px; }
```

**Mouse 3D tilt (JS en main.js):**
```javascript
function bindCardTilt(card) {
  // mousemove: calcula dx/dy relativo al centro, aplica perspective(1000px) rotateY/rotateX
  // mouseleave: limpia style.transform → transición CSS suave
  // Respeta prefers-reduced-motion
}
// Llamado en renderDestinos() para cada card
```

---

### Pass 4: Landing Blanco Arena + Diseño Miami (commits 8d6ebbd → cce15cf)

**Objetivo:** Unificar toda la página en `var(--blanco-arena)` #FFFDF7. Corregir errores de visibilidad de cards. Añadir identidad Miami a etiquetas y subtítulos.

```css
/* Todas las secciones en blanco arena */
.seccion-intro, .seccion-destinos, .seccion-mapa, .seccion-trabaja {
  background: var(--blanco-arena) !important;
}
/* Cards blancas limpias */
.destino-card { background: #ffffff !important; }
/* Corrección clase: .destino-card__desc (no __descripcion) */
.destino-card__desc { color: var(--texto-medio) !important; }
/* Hero tagline — gradiente naranja→mostaza */
.hero-arc__tagline {
  background: linear-gradient(100deg, var(--coral) 0%, var(--mostaza) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
/* Etiqueta — acento mostaza */
.hero-arc__etiqueta { color: var(--mostaza) !important; }
/* Frases ambient — coral */
.hfa-item { color: var(--coral) !important; }
/* Fade bands desactivadas (color uniforme) */
.fade-band { height: 0 !important; overflow: hidden !important; }
```

**Correcciones de bugs:**
- `destino-card__descripcion` → `destino-card__desc` (nombre real de clase)
- Globe cobe.js invisible: fondo azul cielo para contraste (primer intento)
- Globe cobe.js invisible root cause: `canvas.offsetWidth = 0` en DOMContentLoaded → ResizeObserver pattern

### Pass 5: AnimatedRoadmap + Hero Foto Dominante + Tooltip (commits 50bcb08 → ebd99d6)

**Objetivo:** Reemplazar globo 3D + mapa Leaflet por roadmap animado geográfico. Rediseño del hero con foto dominante. Tooltips interactivos en el mapa.

**5a — AnimatedRoadmap** (commit 50bcb08):
```css
.seccion-roadmap { background: var(--blanco-arena) !important; }
.rdm-canvas { aspect-ratio: 8 / 5; border-radius: 28px; /* fondo canvas geográfico */ }
.rdm-milestone { width: 14px; height: 14px; opacity: 0; scale: 0.3; transition: opacity + scale cubic-bezier; }
.rdm-milestone.visible { opacity: 1; scale: 1; }
.rdm-ring { animation: rdm-ring-pulse 2.6s ease-out infinite; }
.rdm-bubble { backdrop-filter: blur(10px); border-radius: 999px; }
```

**5b — Hero Foto Dominante** (commit fe4f88c):
- Foto Unsplash icónica Miami → luego reemplazada por local avif
- Cormorant Garamond weight 300 italic
- Eyebrow `— South Florida —` con líneas decorativas
- Hero-tags en fila (glassmorphism pills)
- Tagline blanco trazo fino (cancelar gradiente anterior con `!important`)
- Overlay oscuro `::after` sobre `.hero-bg` para legibilidad
- 20 `rdm-milestone--ref` (dots mostaza 8px, sin anillo, bubble pequeño)
```css
.hero-arc__titulo { font-family: 'Cormorant Garamond' ... font-weight: 300 !important; color: #fff !important; }
.hero-arc__tagline { background: none !important; -webkit-text-fill-color: rgba(255,255,255,0.85) !important; }
.hero-eyebrow { display: flex; align-items: center; gap: 1rem; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 0.55rem; }
.hero-tag { backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.22); }
.rdm-milestone--ref { width: 8px !important; } /* sin anillo, dot mostaza */
```

**5c — Tooltip Roadmap** (commit ebd99d6):
- Foto hero: local AVIF opacity 0.01
- `initRoadmapTooltip()` — `position: fixed`, sigue al cursor, clampeado al viewport
- 29 `data-desc` attributes en todos los milestones (~30 palabras c/u)
```css
.rdm-tooltip { position: fixed; z-index: 9999; backdrop-filter: blur(16px);
  border-radius: 16px; opacity: 0; transform: translateY(8px) scale(0.96); }
.rdm-tooltip--visible { opacity: 1; transform: translateY(0) scale(1); }
.rdm-tooltip__barra { background: linear-gradient(90deg, var(--coral), var(--mostaza)); }
@media (hover: none) { .rdm-tooltip { display: none !important; } }
```

---

## 12. Flujo JS — main.js (estado actual)

```
DOMContentLoaded
  → leerConfigSitio()          — lee configuración del sitio desde localStorage
  → registrarVisita()          — guarda visita de hoy en em_visitas
  → renderDestinos()           — lee em_destinos, filtra por tipo, genera HTML de cards
      → initScrollAnimation()  — IntersectionObserver threshold 0.10, añade .visible
      → bindCardTilt(card)     — 3D mouse tilt en cada card
  → initScrollAnimation()      — segunda llamada para elementos estáticos fade-up
  → initHeroTrail()            — rastro de imágenes al mover el mouse en el hero
  → initRoadmap()              — SVG path scroll-animation + IntersectionObserver milestones
  → initRoadmapTooltip()       — tarjeta flotante hover en cada milestone
  [initGlobo / initMapaLeaflet ELIMINADOS — sección mapa reemplazada por roadmap]
```

**Función `renderDestinos(filtro)`:**
- Lee destinos de `obtenerDestinos()` (lee localStorage o siembra desde DESTINOS_DEFAULT)
- Filtra por `filtro` ('todos', 'tierra', 'mar')
- Genera HTML de `<article class="destino-card fade-up">` con `transition-delay: (i%3)*0.12s`
- Llama `initScrollAnimation()` → IntersectionObserver añade `.visible`
- Llama `bindCardTilt(card)` en cada card

**Función `abrirModal(idDestino)`:**
- Busca el destino en `obtenerDestinos()`
- Puebla galería, badges, nombre, descripciones, datos prácticos, reseñas, mapa, botones de acción
- Activa el modal con `classList.add('activo')`

**initRoadmap()** (AnimatedRoadmap port, main.js línea ~1706):
```javascript
// 1. getTotalLength() → strokeDasharray/Dashoffset → scroll listener RAF
// 2. IntersectionObserver: threshold 0.15, 80ms stagger por data-idx
// milestones: .rdm-milestone[data-idx] — idx 0-8 = principales, 9-28 = ref
function initRoadmap() {
  var path = document.getElementById('rdmPath');
  var pathLen = path.getTotalLength();
  path.style.strokeDasharray = pathLen;
  path.style.strokeDashoffset = pathLen;
  // scroll: (winH - rect.top) / (winH + rect.height) → mapped a [0.12, 0.80]
  // io.observe todos los .rdm-milestone; delay = idx * 80ms
}
```

**initRoadmapTooltip()** (main.js línea ~1751):
```javascript
function initRoadmapTooltip() {
  // Crea div.rdm-tooltip en document.body (position: fixed)
  // mouseenter: muestra tooltip con m.title + m.dataset.desc
  // mousemove: reposiciona clampeado a viewport (x+18 o x-tw-18 si se sale)
  // mouseleave: oculta tooltip (remove rdm-tooltip--visible)
  // visibilitychange: oculta si document.hidden
}
```

**Parallax hero (removido):** El hero ya no usa video — usa foto AVIF estática. El parallax original fue sustituido por el overlay oscuro `::after`.

---

## 13. Skills instaladas

### Cómo funcionan
Las skills se instalan con `npx skills add <usuario>/<repo>` y se guardan en `.agents/skills/`. Claude las usa como conocimiento de referencia al ejecutar tareas de diseño/código. Invocarlas con `/nombre-skill` en el chat.

### Skills disponibles

| Paquete | Skill(s) | Uso |
|---|---|---|
| `emilkowalski/skill` | `emil-design-eng` | Ingeniería de diseño — componentes, animaciones, CSS avanzado |
| `pbakaus/impeccable` | `impeccable` | Auditoría de anti-patrones UI — tipografía, color, espaciado, motion. Uso: `/impeccable audit` |
| `Leonxlnx/taste-skill` | `brandkit`, `industrial-brutalist-ui`, `gpt-taste`, `image-to-code`, `imagegen-frontend-mobile`, `imagegen-frontend-web`, `minimalist-ui`, `full-output-enforcement`, `redesign-existing-projects`, `high-end-visual-design`, `stitch-design-taste`, `design-taste-frontend` | Gusto visual — variantes: soft (minimal), alta gama, brutalista. Uso: `/design-taste-frontend variante soft` |
| `nextlevelbuilder/ui-ux-pro-max-skill` | `ui-ux-pro-max` | Base de conocimiento de UX/UI — accesibilidad, touch, performance, animaciones, formularios. 659 líneas de referencia en `SKILL.md`. Los scripts Python son symlinks rotos (no funcionales) — usar solo como referencia de conocimiento. |

> **Nota sobre ui-ux-pro-max:** Los archivos `scripts` y `data` dentro de `.agents/skills/ui-ux-pro-max/` son archivos de texto que contienen una ruta de symlink (`../../../src/ui-ux-pro-max/`) a un directorio que no existe. El SKILL.md en sí es válido y seguro como referencia.

---

## 14. Convenciones de código

- **Clases CSS** en español con metodología BEM simplificada: `.seccion-destinos__contenedor`, `.destino-card__nombre`
- **Variables CSS** en `:root` — siempre agregar aquí antes de hardcodear un valor
- **Sin frameworks** ni librerías externas — vanilla HTML/CSS/JS
- **Comentarios** en español
- **`esc(str)`** en `admin.js` — usar siempre al generar HTML dinámico en el panel para prevenir XSS
- **NUNCA** fondos negro sólido — usar gradientes azul oscuro
- **NUNCA** `!important` salvo para overrides de dark section y passes de diseño (están documentados)
- **`prefers-reduced-motion`** — todo efecto visual que usa `transform` o `animation` debe tener su contraparte reducida

---

## 15. Google Analytics — estado y pendientes

El código GA4 está en `index.html` con el ID `G-7HMBMBQNQZ`. Verificar:
1. Entrar a `analytics.google.com`
2. Confirmar que la propiedad `G-7HMBMBQNQZ` existe y tiene datos
3. Si el ID es placeholder, crear una nueva propiedad GA4 y reemplazar las 3 ocurrencias en `index.html`
4. También está referenciado en `admin.html` — reemplazar ahí también

---

## 16. Próximos pasos pendientes

### Alta prioridad
- [ ] **Verificar GA4** — confirmar que `G-7HMBMBQNQZ` es el ID real, o crear propiedad nueva y reemplazar en `index.html` (3 ocurrencias)
- [ ] **Dominio propio** — comprar en Namecheap, CNAME en GitHub Pages, actualizar canonical y OG URLs
- [ ] **Opacidad hero foto** — actualmente en 1% (casi invisible). El usuario puede querer ajustar este valor para que la foto sea más visible. Cambiar en `.hero-bg { opacity: X; }` en el bloque "HERO FOTO DOMINANTE v2" al final de `styles.css`
- [ ] **Panel admin con métricas reales** — visitas actuales son datos demo. Integrar GA4 Reporting API

### Media prioridad
- [ ] **Monetización listings** — formulario de alta para empresas locales
- [ ] **Afiliados Amazon** — sección "Equipamiento recomendado"
- [ ] **Imágenes propias** — reemplazar fotos de Wikipedia/iStock por fotos reales
- [ ] **Más destinos** — ampliar de 9 a 15–20. Usar la misma estructura de objeto en `DESTINOS_DEFAULT`
- [ ] **Tooltip táctil** — adaptar tooltip del roadmap para dispositivos táctiles (tap en lugar de hover)

### Baja prioridad
- [ ] **Blog/contenido** — artículos de SEO sobre actividades outdoor en Miami
- [ ] **Filtros avanzados** — por dificultad, precio, distancia desde Miami, mejor época
- [ ] **Compartir destinos** — botones de share por destino (WhatsApp, X, Instagram)
- [ ] **Clickear milestone → abrir modal** del destino (actualmente solo muestra tooltip)

---

## 17. Errores técnicos documentados (para no repetir)

### ❌ `filter` + `background-clip: text` en el mismo elemento
**Síntoma:** El texto desaparece completamente.
**Causa:** `filter: drop-shadow()` aplicado al mismo elemento que `background-clip: text` abre un nuevo contexto de composición en Chrome y Safari. El navegador rasteriza el elemento ANTES de aplicar el clip, resultando en texto invisible.
**Solución:** Nunca usar `filter` y `background-clip: text` en el mismo elemento. Usar un wrapper externo para el `filter` o usar `text-shadow` clásico (pero incompatible con clip-text). La solución adoptada fue reemplazar el clip-text por el SpinningText SVG.

### ❌ `opacity < 1` en elemento `position: absolute` con `overflow: hidden` en el padre
**Síntoma:** La imagen de fondo del hero no se ve aunque esté declarada.
**Causa:** `opacity` crea nuevo contexto de composición. El navegador compone `.hero-bg` (con la foto) ANTES de aplicarlo al padre, y si el padre tiene `overflow: hidden`, la foto queda fuera del stacking context visible.
**Solución adoptada (commit `ad0d934`):** Mover `background-image` directamente al elemento `.hero-arc` usando multi-layer CSS (`linear-gradient, url(foto)`). El `.hero-bg` se oculta con `display: none !important`.

### ❌ `initShutter()` en JS sobreescribe el HTML estático del título
**Síntoma:** La `<h1>` con contenido estático (palabras, SVG) queda en blanco.
**Causa:** `initShutter()` hace `titulo.innerHTML = ''` y reconstruye el título como letras individuales animadas.
**Solución:** Guard al inicio de `initShutter()`:
```javascript
if (titulo.querySelector('svg') || titulo.textContent.trim() !== '') return;
```

---

## 18. Roadmap — milestones geográficos (referencia de posicionamiento)

### Fórmula de coordenadas a posición CSS
```
Bounds del mapa: 26.05°N → 25.05°N (top: 0%→100%), -81.12°W → -79.86°W (left: 0%→100%)
top%  = (26.05 - lat) * 100
left% = (lon + 81.12) / 1.26 * 100
```

### 9 destinos principales (rdm-milestone--tierra / --mar)

| idx | Lugar | top% | left% | tipo | data-desc |
|---|---|---|---|---|---|
| 0 | Oleta River SP | 12 | 77 | tierra | ✓ |
| 1 | Arch Creek Park | 20 | 64 | tierra | ✓ |
| 2 | Virginia Key Beach | 37 | 80 | mar | ✓ |
| 3 | Crandon Park | 46 | 77 | mar | ✓ |
| 4 | Bill Baggs Cape Florida | 54 | 85 | mar | ✓ |
| 5 | Matheson Hammock | 57 | 66 | mar | ✓ |
| 6 | Biscayne National Park | 67 | 60 | mar | ✓ |
| 7 | Everglades National Park | 76 | 17 | tierra | ✓ |
| 8 | John Pennekamp | 86 | 52 | mar | ✓ |

### 15 lugares icónicos de referencia — estado actual (commit `93e414d`)
> Eliminados: Bayfront Park (idx 11), Hialeah (20), Palmetto Bay (25), Hard Rock (26), Opa-locka (28) — demasiado solapados.

| idx HTML | Lugar | top% | left% | Separación mínima |
|---|---|---|---|---|
| 9 | Aventura | 7 | 80 | ✓ |
| 10 | Design District | 18 | 76 | ✓ |
| 11 | Wynwood Walls | 22 | 69 | ✓ |
| 12 | South Beach / Ocean Drive | 26 | 84 | ✓ |
| 13 | Little Havana / Calle Ocho | 27 | 63 | ✓ |
| 14 | Coconut Grove | 33 | 70 | ✓ |
| 15 | Miami Seaquarium | 34 | 83 | ✓ |
| 16 | Venetian Pool | 38 | 62 | ✓ |
| 17 | Vizcaya Museum & Gardens | 40 | 74 | ✓ |
| 18 | Key Biscayne | 44 | 82 | ✓ |
| 19 | Fairchild Tropical Garden | 44 | 68 | ✓ |
| 20 | Zoo Miami | 48 | 54 | ✓ |
| 21 | Deering Estate | 51 | 61 | ✓ |
| 22 | Homestead | 61 | 47 | ✓ |
| 23 | Flamingo (Everglades) | 91 | 15 | ✓ |

### CSS de los tipos de milestone
```css
/* Primario tierra: coral, anillo pulsante, doble anillo contraste */
.rdm-milestone--tierra .rdm-dot { background: var(--coral); }
.rdm-milestone--tierra .rdm-dot,
.rdm-milestone--mar    .rdm-dot {
  box-shadow:
    0 0 0 3px rgba(255,255,255,0.95),
    0 0 0 5.5px rgba(0,0,0,0.22),
    0 4px 16px rgba(0,0,0,0.28);
}
/* Primario mar: turquesa, anillo pulsante */
.rdm-milestone--mar .rdm-dot { background: var(--turquesa); }
/* Referencia: coral (cambiado de mostaza), sin anillo, dot 8px, doble anillo */
.rdm-milestone--ref { width: 8px !important; }
.rdm-milestone--ref .rdm-ring { display: none !important; }
.rdm-milestone--ref .rdm-dot {
  background: var(--coral) !important;
  box-shadow:
    0 0 0 2.5px rgba(255,255,255,0.97),
    0 0 0 4.5px rgba(0,0,0,0.20),
    0 3px 10px rgba(255,100,80,0.35) !important;
}
/* Bubbles — alta visibilidad sobre fondo arena */
.rdm-bubble {
  background: rgba(255,255,255,0.96) !important;
  color: var(--texto-oscuro) !important;
  border: 1px solid rgba(0,0,0,0.10) !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.14) !important;
  font-weight: 600 !important;
}
```

---

## 19. SpinningText SVG — documentación técnica completa

### Origen
Port del componente React `SpinningText` (MagicUI) a vanilla HTML/CSS.

### Problema que reemplaza
El efecto anterior (`background-clip: text` con foto de arrecife turquesa) no funcionaba porque `filter: drop-shadow()` aplicado al mismo `<h1>` cancelaba el clip en Chrome/Safari.

### Estructura HTML
```html
<div class="hero-spin-wrapper" id="heroTitulo"
     role="heading" aria-level="1" aria-label="Explora Miami">
  <svg viewBox="0 0 100 100" class="hero-spin-svg"
       aria-hidden="true" focusable="false"
       xmlns="http://www.w3.org/2000/svg">
    <g class="hero-spin-group">
      <!-- Ruta circular: centro (50,50), radio 25 -->
      <path id="heroSpinPath"
            d="M 50,50 m -25,0 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
            fill="none"/>
      <!-- Texto sigue la ruta circular -->
      <text class="hero-spin-text">
        <textPath href="#heroSpinPath" startOffset="0%">
          EXPLORA MIAMI ✦ SOUTH FLORIDA ✦ EXPLORA MIAMI ✦ SOUTH FLORIDA ✦
        </textPath>
      </text>
    </g>
    <!-- Punto decorativo en el centro -->
    <circle cx="50" cy="50" r="1.8" class="hero-spin-center"/>
  </svg>
</div>
```

### CSS clave
```css
@keyframes hero-spin-anim {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.hero-spin-wrapper {
  width: 210px; height: 210px;
  margin: 0 auto 0.5rem;
}

/* CRÍTICO: transform-origin debe ser el centro del viewBox (50px 50px),
   NO el default CSS 50% 50% — en SVG el default es 0 0 */
.hero-spin-group {
  transform-origin: 50px 50px !important;
  animation: hero-spin-anim 12s linear infinite !important;
}

.hero-spin-text {
  font-size: 4.2px;           /* unidades del viewBox, no px reales */
  fill: rgba(255,255,255,0.88);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Reducción de movimiento — en lugar de parar, frena a 60s */
@media (prefers-reduced-motion: reduce) {
  .hero-spin-group { animation-duration: 60s !important; }
}
```

### Equivalencias React → Vanilla

| React prop | Vanilla |
|---|---|
| `radius={25}` | `r="25"` en el path SVG |
| `speed={12}` | `animation-duration: 12s` |
| `direction="normal"` | `animation-direction: normal` (default) |
| `textClassName="text-[4px]"` | `font-size: 4.2px` |
| `className="origin-center animate-spin"` | `transform-origin: 50px 50px` + `@keyframes` |
| `xlinkHref` | `href` (estándar moderno, xlinkHref deprecado) |
| `fill-muted-foreground` | `fill: rgba(255,255,255,0.88)` |
| `tracking-widest` | `letter-spacing: 0.04em` |

### Guard JS en initShutter
```javascript
// En initHeroTrail() → initShutter IIFE:
if (titulo.querySelector('svg') || titulo.textContent.trim() !== '') return;
// Detecta el SVG hijo y evita sobreescribir el SpinningText
```

---

## 20. Objetivo del negocio y plan de monetización  

### Modelo de ingresos

| Canal | Precio | Escala |
|---|---|---|
| **Listings de empresas locales** | $80–100/mes por empresa | Tour operators, rentals, escuelas de buceo |
| **Afiliados Amazon** | 3–8% comisión | Equipamiento outdoor (kayaks, snorkels, tiendas de campaña) |
| **Servicios web a negocios locales** | $500–2,000 por proyecto | Diseño web, SEO, publicidad digital para negocios outdoor |

### Público objetivo
- Turistas hispanohablantes visitando Miami (principal)
- Residentes de Miami buscando actividades de fin de semana
- Empresas de turismo outdoor buscando visibilidad digital

### Propuesta de valor para listings
> "Tu empresa en el directorio outdoor #1 de Miami para la comunidad hispanohablante — $80/mes, sin contratos largos, con métricas reales de clics e impresiones."

---

## 18. Notas de seguridad del panel admin

- Contraseña hardcoded en `admin.js` línea 8: `var ADMIN_PASS = 'miami2026'`
- Sesión en `sessionStorage('em_admin')` — no persiste al cerrar la pestaña
- No hay backend — toda la "autenticación" es client-side y puede ser bypaseada por cualquier usuario técnico
- Para producción real: migrar a autenticación server-side (Firebase Auth, Supabase, etc.)
- Por ahora es suficiente como protección básica — la URL del admin no está enlazada públicamente (solo en el footer)

---

## 19. Comandos git frecuentes

```bash
# Guardar cambios y publicar
cd "C:/Users/calil/OneDrive/Documentos/explora-miami"
git add assets/css/styles.css assets/js/main.js index.html admin.html
git commit -m "descripción del cambio"
git push origin main

# Ver estado
git status
git log --oneline -5

# Si hay conflicto con remote
git pull --rebase origin main && git push origin main
```

---

## 20. Historial de cambios principales (cronológico)

| Fecha | Commit | Cambio |
|---|---|---|
| — | — | Creación inicial — 6 destinos, estructura básica |
| — | — | Ampliación a 9 destinos reales con galería, reseñas y datos completos |
| — | — | GA4 con eventos custom en `analytics.js` |
| — | — | Impeccable audit — fixes WCAG AA en contraste, motion, line-height |
| — | — | taste-skill soft — tipografía, jerarquía visual, identidad de color |
| — | — | Instalación skills + revisión de seguridad |
| 18 mayo 2026 | `1c53ab4` | **Premium 3D redesign** — dark ocean, glassmorphism cards, hero orbs, animaciones cinéticas, grid escalonado, mouse tilt 3D |
| 18 mayo 2026 | `8d6ebbd` | Hero ImageTrail + landing blanco arena + globo rutas Miami |
| 18 mayo 2026 | `cce15cf` | Imagen de fondo hero-bg.png (ElevenLabs) insertada en CSS |
| 18 mayo 2026 | `a5423ec` | GlobeStickers vanilla JS port + hero Miami style + mapa grid rediseñado |
| 18 mayo 2026 | `ae9c3ac` | Fix globo invisible — fondo azul cielo + dark 0.12 (fix contraste) |
| 18 mayo 2026 | `6d77eb5` | Fix globo root cause — ResizeObserver pattern (canvas.offsetWidth=0 bug) |
| 19 mayo 2026 | `50bcb08` | **Sección mapa → AnimatedRoadmap** — SVG path scroll-animated, 9 milestones geográficos, IntersectionObserver stagger, paleta coral/turquesa/mostaza |
| 19 mayo 2026 | `fe4f88c` | **Hero foto dominante + 20 landmarks icónicos** — Cormorant Garamond 300 italic, eyebrow decorativo, hero-tags glassmorphism, 20 rdm-milestone--ref con posición lat/lng real |
| 19 mayo 2026 | `ebd99d6` | **Hero foto local AVIF 1% + Tooltip roadmap** — `initRoadmapTooltip()`, 29 data-desc, tarjeta glassmorphism fixed que sigue al cursor |
| 20 mayo 2026 | `ad0d934` | **Fix hero foto invisible** — bug root cause: `opacity` en `.hero-bg` crea stacking context que hace invisible la foto. Solución: `background-image` directo en `.hero-arc`, `.hero-bg { display:none }` |
| 20 mayo 2026 | `c11f3db` | CLAUDE.md actualizado con documentación completa de la sesión |
| 20 mayo 2026 | `93e414d` | **Roadmap deoverlap + cursor fix + contraste dots/bubbles** — 20→15 ref-milestones, reposicionados, `cursor:pointer`, doble anillo box-shadow, bubbles sólidas |
| 20 mayo 2026 | `14f9f31` | Intento clip-text con hero-01.jpg (arrecife turquesa) — no funciona por conflicto `filter`+`background-clip:text` en Chrome/Safari |
| 20 mayo 2026 | `7db83fa` | **SpinningText SVG** — port React MagicUI → vanilla. Título "Explora Miami" reemplazado por texto circular giratorio en `<textPath>` SVG, 12s/vuelta. Ver sección 19 para documentación técnica completa. |
