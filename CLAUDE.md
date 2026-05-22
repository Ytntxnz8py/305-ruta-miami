# Explora Miami — Guía completa del proyecto

> **Fecha de última actualización:** 22 mayo 2026
> Documento diseñado para que cualquier instancia de Claude retome el proyecto desde cero sin perder contexto.

---

## 1. Concepto y objetivo

Directorio bilingüe (ES/EN) de experiencias outdoor en Miami con panel de administración privado. Monetizado con listings de empresas locales, afiliados Amazon y servicios web.

**Categorías de destinos:**
- 🔶 **Tierra** — senderismo, ciclismo, camping, arqueología
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
| **Directorio local** | `C:/Users/calil/OneDrive/Documentos/explora-miami/` |
| **Dominio propio** | ⏳ Pendiente comprar en Namecheap |

### Flujo obligatorio de deploy
```bash
cd "C:/Users/calil/OneDrive/Documentos/explora-miami"
git add <archivos modificados>
git commit -m "descripción del cambio"
git push origin main
# GitHub Pages despliega en ~1 min
```
⚠️ **Regla crítica:** Después de CADA cambio → commit + push. Sin excepción.

---

## 3. Estructura completa de archivos

```
explora-miami/
├── index.html              ← sitio público bilingüe — landing principal
├── anunciantes.html        ← página para empresas B2B — planes y precios
├── blog.html               ← hub de artículos — esfera 3D interactiva de fotos
├── admin.html              ← panel de administración privado
├── privacidad.html         ← política de privacidad (ES/EN, noindex)
├── terminos.html           ← términos de uso (ES/EN, noindex)
├── CLAUDE.md               ← este archivo
├── skills-lock.json        ← registro de skills instaladas
├── blog/
│   ├── kayak-miami-principiantes.html
│   ├── buceo-key-largo-guia.html
│   └── everglades-un-dia.html
├── assets/
│   ├── css/
│   │   ├── navbar.css      ← navbar universal + reglas bilinguales (CARGADO EN TODAS LAS PÁGINAS)
│   │   ├── styles.css      ← estilos sitio público (~3750+ líneas)
│   │   ├── anunciantes.css ← estilos página de anunciantes (~2700+ líneas)
│   │   ├── blog.css        ← estilos blog + esfera 3D
│   │   ├── liquid-btn.css  ← botón líquido reutilizable
│   │   └── admin.css       ← estilos del panel admin
│   ├── js/
│   │   ├── navbar.js       ← navbar universal IIFE (hide-on-scroll, drawer móvil)
│   │   ├── main.js         ← lógica pública + datos de destinos (~1500 líneas)
│   │   ├── anunciantes.js  ← lógica anunciantes (hero shutter, orbital, reseñas)
│   │   ├── sphere-hero.js  ← esfera 3D Fibonacci para blog.html (IIFE ES5)
│   │   ├── admin.js        ← panel admin con tab de reseñas
│   │   ├── i18n.js         ← sistema de traducción ES/EN
│   │   └── analytics.js    ← eventos GA4 custom
│   ├── images/
│   │   ├── hero/           ← hero-01.jpg … hero-15.jpg (fotos hero y esfera)
│   │   └── miami/          ← 18 fotos Miami uso libre con descripciones honestas
│   └── videos/
│       └── hero-tierra.mp4.mp4  ← ⚠️ YA NO SE USA (video eliminado de index.html)
```

---

## 4. Stack técnico

- **HTML / CSS / JS puro** — sin frameworks, sin librerías externas
- **ES5 obligatorio** — `var`, sin arrow functions, sin template literals, sin ES6 modules
- **Mobile-first** — breakpoints principales: 560px y 768px
- **Fuentes** (Google Fonts): Playfair Display (títulos, italic) + Inter (cuerpo)
- **Comentarios** en español
- Sin transpilación, sin build step — desplegable directamente en GitHub Pages
- **`overflow-x: hidden`** SOLO en `<html>`, NUNCA en `<body>`

---

## 5. Paleta de colores — OFICIAL (no inventar colores)

```css
--coral:           #FF6B6B   /* acento tierra, CTAs */
--turquesa:        #00BCD4   /* acento mar, interactivos */
--mostaza:         #FFB300   /* badges, precios */
--blanco-arena:    #FFFDF7   /* fondo de TODAS las secciones */
--azul-profundo:   #071e2b   /* hero oscuro, footer */
--ocean-ini:       #071e2b
--ocean-mid:       #0a2d3f
--tinta:           #1a2a35   /* texto principal */
--texto-medio:     #4a6070   /* texto secundario */
--texto-suave:     #4a6f82   /* texto terciario (WCAG AA ✓ 5.4:1) */
--turquesa-oscuro: #00434F   /* hover turquesa */
--coral-oscuro:    #B83E3E   /* hover coral */
--ease:            cubic-bezier(0.2, 0, 0, 1)
--serif:           'Playfair Display', Georgia, serif
--sans:            'Inter', system-ui, sans-serif
```

**Reglas absolutas:**
- ✅ SIEMPRE `var(--blanco-arena)` en todas las secciones (no heros con foto/video)
- ❌ NUNCA negro sólido — usar gradientes azul oscuro
- ❌ NUNCA `overflow-x: hidden` en `<body>`

---

## 6. Sistema bilingüe ES/EN

### Dos mecanismos coexisten

**A) Clases `.lang-es` / `.lang-en`** — el más usado en HTML estático:
```html
<span class="lang-es">Texto en español</span>
<span class="lang-en">English text</span>
```

**B) Atributo `data-i18n="clave"`** — para elementos simples:
```html
<h2 data-i18n="destinos_titulo">Destinos en Miami</h2>
```
La clave debe existir en `assets/js/i18n.js` para ES y EN.

### CSS de visibilidad — vive en `navbar.css` (universal)
```css
html.lang-es .lang-en { display: none !important; }
html.lang-en .lang-es { display: none !important; }
html:not(.lang-es):not(.lang-en) .lang-en { display: none; }
```
⚠️ Estas reglas están en `navbar.css` (no en `styles.css`) para que funcionen en TODAS las páginas incluidos blog posts.

### Prevención de flash (FOUC)
Script inline en `<head>` aplica `html.lang-*` antes del primer render.

### Regla de traducción
**Todo texto que se suba a GitHub debe tener versión ES y EN.** Sin excepción.

---

## 7. Navbar universal

### Archivo: `assets/css/navbar.css` + `assets/js/navbar.js`

Cargado en **todas** las páginas del proyecto. Reemplaza cualquier menú anterior.

**Clases HTML:**
```html
<nav class="em-nav" id="emNav" role="navigation">
  <div class="em-nav__inner">
    <a class="em-nav__logo" href="/mi-tienda/">
      <span class="em-nav__logo-explora">Explora</span>
      <span class="em-nav__logo-miami">Miami</span>
    </a>
    <ul class="em-nav__links">...</ul>
    <button class="em-nav__lang">ES</button>
    <button class="em-nav__hamburger">...</button>
  </div>
  <div class="em-nav__drawer">...</div>
</nav>
```

**Comportamiento JS (navbar.js IIFE):**
- Oculta al scrollear hacia abajo (`em-nav--hidden`)
- Reaparece al scrollear hacia arriba
- `em-nav--top` — sin sombra en la cima
- `em-nav--scrolled` — más opaco al scrollear
- `em-nav--open` — drawer móvil abierto (hamburger animado a ✕)
- `setActiveLink()` — marca el link actual con `em-nav__link--active`
- Integra con `cambiarIdioma()` de `i18n.js`

**⚠️ El Circle Menu `.cm-wrap` fue eliminado** — era redundante con el navbar universal.

---

## 8. Arquitectura de datos (localStorage)

| Clave | Tipo | Descripción |
|---|---|---|
| `em_destinos` | JSON array | Destinos — sembrado desde `DESTINOS_DEFAULT` en `main.js` |
| `em_destinos_version` | número | Versión actual: `4`. Si cambia, re-siembra. |
| `em_contactos` | JSON array | Formularios de contacto general |
| `em_contactos_empresas` | JSON array | Formularios de contacto de empresas (anunciantes) |
| `em_resenas_publicas` | JSON array | Reseñas reales de visitantes (sistema nuevo) |
| `em_visitas` | JSON object | `{ "YYYY-MM-DD": número }` |
| `em_clics` | JSON object | `{ "idDestino": número }` |
| `em_idioma` | string | `'es'` o `'en'` |
| `em_admin` (sessionStorage) | string | `'ok'` cuando hay sesión admin activa |

**Versión de datos:** `DESTINOS_VERSION = 4` en `main.js` y `admin.js` — deben coincidir.

---

## 9. Estado actual — funcionalidades implementadas

### ✅ index.html — Landing principal

**Hero (SpinningText SVG):**
- Foto local AVIF `photo-1595323397978-65433d24fc23.avif` — Miami skyline
- Texto circular girando en SVG `<textPath>`: "EXPLORA MIAMI ✦ SOUTH FLORIDA ✦"
- Tags glassmorphism, 2 CTAs, hero trail de imágenes al mover el mouse
- `initHeroTrail()` en main.js

**Sección Intro `#nosotros` (`seccion-intro`):**
- ✅ Fondo `var(--blanco-arena)` — SIN VIDEO (eliminado)
- Layout 2 columnas: texto izq (eyebrow + título animado + 3 features) + shuffle grid der
- **Animación del título "¿Por qué Explora Miami?":**
  - `tituloSlideIn` — desliza desde izquierda con colapso de letter-spacing (0.75s)
  - `tituloLineaReveal` — línea gradiente coral→turquesa crece bajo el título (delay 0.6s)
  - Activada cuando `.si-col-texto` recibe clase `.visible` (IntersectionObserver)
  - Respeta `prefers-reduced-motion`

**Sección Destinos `#destinos`:**
- Dark ocean bg (`#071e2b`) — glassmorphism cards
- Filtros Tierra/Mar/Todos, 9 destinos renderizados por JS
- Mouse 3D tilt, modal pantalla completa con galería

**Roadmap animado:**
- SVG path scroll-animated, 9 milestones principales + 15 icónicos
- Tooltip glassmorphism fixed sigue al cursor
- IntersectionObserver stagger 80ms

**Sección "Trabaja" `#trabaja`:**
- Teaser B2B → enlaza a `anunciantes.html`
- Pills con ✓ checkmarks: Card en el directorio / Página de detalle / ES & EN / Métricas mensuales
- **Efecto `pillWiggle`** al hover: rebote rotacional con micro-escala (0.52s)
- Respeta `prefers-reduced-motion`

### ✅ anunciantes.html — Página para empresas

**Hero con shutter animado** (initHeroShutter)

**Orbital 3D** (reemplaza stat cards):
- 6 nodos girando: valores del negocio sin números hardcodeados
- `initOrbital()` en anunciantes.js

**Sección de features** (`.feature-item`):
- 6 items: 📋 Card en grid, 🖼️ Página de detalle, 🌐 ES+EN, 📞 Datos prácticos, 🗺️ Mapas, 📊 Métricas
- **Efecto `featureShake`** al hover sobre el ítem: sacudida + escala del ícono (0.55s)

**Precios** (3 tiers: Esencial / Profesional / Premium):
- `.precio-check` — checkmarks ✓ en cada ítem de la lista
- **Efecto `checkBounce`** al hover sobre el `<li>`: escala + rotación del check (0.48s)
- Todos respetan `prefers-reduced-motion`

**Reseñas reales** (reemplaza testimonios falsos):
- Formulario 5 estrellas + texto → localStorage `em_resenas_publicas`
- Moderación en admin.html → tab "Reseñas"

**FAQ y formulario de contacto**

### ✅ blog.html — Hub de artículos

**Esfera 3D Fibonacci** (`sphere-hero.js`):
- 33 nodos: 15 `hero/` + 18 `miami/`
- Drag para rotar, auto-rotate 0.25°/frame, momentum 0.95
- Modal al hacer clic en un nodo
- Mobile: máximo 18 nodos visibles
- Fondo `var(--blanco-arena)` — SIN puntos azules

**3 artículos publicados:**
- Kayak en Miami para principiantes
- Buceo en Key Largo — guía completa
- Everglades en un día

### ✅ admin.html — Panel de administración
- Login `miami2026` → sessionStorage
- Dashboard: visitas, clics, formularios, destinos activos
- CRUD de destinos
- Mensajes: `em_contactos` + `em_contactos_empresas` con badge `_origen`
- **Tab "Reseñas"**: moderar reseñas de `em_resenas_publicas`
- Exportar CSV

### ✅ privacidad.html + terminos.html
- Contenido legal completo ES/EN
- `<meta name="robots" content="noindex">`

---

## 10. Los 9 destinos

`DESTINOS_DEFAULT` en `main.js`. Cada destino tiene campos completos ES+EN.

| # | Nombre | Tipo | Precio |
|---|---|---|---|
| 1 | Everglades National Park | tierra | $35/vehículo 7 días |
| 2 | John Pennekamp Coral Reef SP | mar | $8 + tours $32+ |
| 3 | Biscayne National Park | mar | Gratis + tours $45–65 |
| 4 | Bill Baggs Cape Florida SP | mar | $8/vehículo |
| 5 | Oleta River State Park | tierra | $6/vehículo |
| 6 | Virginia Key Beach Park | mar | $8/vehículo |
| 7 | Matheson Hammock Park | mar | $8/vehículo |
| 8 | Crandon Park | mar | $8/vehículo |
| 9 | Arch Creek Park | tierra | Gratis |

---

## 11. Fotos del proyecto

### `assets/images/hero/` — hero-01.jpg … hero-15.jpg
Usadas en el hero y la esfera 3D del blog. Fotos reales de Miami y naturaleza de Florida.

### `assets/images/miami/` — 18 fotos uso libre
Fotos con descripciones HONESTAS (no inventadas). Algunas son genéricas ("Playa urbana", "Skyline") porque no se pudo identificar el lugar exacto.

**Regla crítica:** Las descripciones deben ser fieles a lo que muestra la foto. No etiquetar una foto de Dubai como "Key Biscayne". Si no se puede identificar, usar descripción genérica honesta.

13 fotos irrelevantes fueron **eliminadas** (contenían: Burj Khalifa, Maasai africanos, desiertos, etc. etiquetadas como lugares de Miami).

---

## 12. Convenciones de animaciones CSS

### Patrón estándar
```css
@keyframes nombreAnimacion {
  from { ... }
  to   { ... }
}

.elemento:hover { animation: nombreAnimacion 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97); }

/* Obligatorio — prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .elemento:hover { animation: none; transform: none; }
}
```

### Animaciones activas en el proyecto

| Nombre | Archivo | Dónde | Trigger |
|---|---|---|---|
| `hero-spin-anim` | styles.css | SpinningText SVG | continua |
| `orbs-drift` | styles.css | Hero orbs | continua |
| `fade-up` + `.visible` | styles.css | Todos los elementos con fade-up | IntersectionObserver |
| `tituloSlideIn` | styles.css | Título "¿Por qué Explora Miami?" | `.si-col-texto.visible` |
| `tituloLineaReveal` | styles.css | Línea bajo el título intro | `.si-col-texto.visible` |
| `pillWiggle` | styles.css | Pills ✓ en sección Trabaja | hover |
| `featureShake` | anunciantes.css | Íconos feature en anunciantes | hover |
| `checkBounce` | anunciantes.css | Checks ✓ en pricing cards | hover |
| `rdm-ring-pulse` | styles.css | Anillos pulsantes del roadmap | continua |

---

## 13. Flujo JS — main.js

```
DOMContentLoaded
  → leerConfigSitio()
  → registrarVisita()
  → renderDestinos(filtro)
      → initScrollAnimation()   ← IntersectionObserver, threshold 0.10, añade .visible
      → bindCardTilt(card)      ← 3D mouse tilt
  → initScrollAnimation()       ← segunda llamada para elementos estáticos
  → initHeroTrail()
  → initRoadmap()               ← SVG path scroll + IntersectionObserver milestones
  → initRoadmapTooltip()        ← tarjeta flotante hover
```

---

## 14. Google Analytics 4

- **ID:** `G-7HMBMBQNQZ` (hardcoded en index.html)
- ⚠️ Verificar que este ID corresponde a una propiedad real en analytics.google.com

| Evento | Disparador |
|---|---|
| `scroll_depth` | 25/50/75/100% scroll |
| `destination_click` | Clic en card de destino |
| `modal_open` | Apertura de modal |
| `language_change` | Cambio ES ↔ EN |
| `filter_click` | Filtro Tierra/Mar/Todos |
| `contact_form_submit` | Envío formulario |

---

## 15. Errores técnicos documentados (no repetir)

### ❌ `filter` + `background-clip: text` en el mismo elemento
**Síntoma:** El texto desaparece en Chrome/Safari.
**Solución:** Nunca combinar. Usar wrapper externo para el `filter` o SpinningText SVG.

### ❌ `opacity < 1` en `position: absolute` con `overflow: hidden` en el padre
**Síntoma:** Imagen de fondo invisible.
**Solución:** `background-image` directo en el elemento contenedor, no en hijo con opacity.

### ❌ Blog mostrando ES + EN simultáneamente
**Causa:** Las reglas `html.lang-es .lang-en { display:none }` vivían solo en `styles.css`, que los blog posts no cargan.
**Solución:** Moverlas a `navbar.css` (universal, cargado en todas las páginas).

### ❌ `overflow-x: hidden` en `<body>`
**Síntoma:** Problemas con `position: sticky`, `fixed` y `transform` en iOS Safari.
**Solución:** Solo aplicar en `<html>`, nunca en `<body>`.

### ❌ Video en `seccion-intro` — ELIMINADO
**Situación anterior:** `<video autoplay muted loop>` con `hero-tierra.mp4.mp4`.
**Acción:** Eliminado completamente de `index.html` y `styles.css`. Fondo ahora es `var(--blanco-arena)` limpio.

---

## 16. SpinningText SVG — referencia técnica

```html
<div class="hero-spin-wrapper" id="heroTitulo" role="heading" aria-level="1" aria-label="Explora Miami">
  <svg viewBox="0 0 100 100" class="hero-spin-svg" aria-hidden="true">
    <g class="hero-spin-group">
      <path id="heroSpinPath"
            d="M 50,50 m -25,0 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
            fill="none"/>
      <text class="hero-spin-text">
        <textPath href="#heroSpinPath" startOffset="0%">
          EXPLORA MIAMI ✦ SOUTH FLORIDA ✦ EXPLORA MIAMI ✦ SOUTH FLORIDA ✦
        </textPath>
      </text>
    </g>
    <circle cx="50" cy="50" r="1.8" class="hero-spin-center"/>
  </svg>
</div>
```

**CSS crítico:** `transform-origin: 50px 50px` (centro del viewBox SVG, no `50% 50%`).
**Reduced motion:** `animation-duration: 60s` (frena, no para).

---

## 17. Roadmap — posicionamiento geográfico

**Fórmula lat/lng → CSS:**
```
Bounds: 26.05°N → 25.05°N, -81.12°W → -79.86°W
top%  = (26.05 - lat) * 100
left% = (lon + 81.12) / 1.26 * 100
```

**9 milestones principales** (idx 0–8): coral=tierra, turquesa=mar, anillo pulsante, dot 14px
**15 icónicos** (idx 9–23): coral, sin anillo, dot 8px, bubble pequeño

---

## 18. Skills instaladas

| Paquete | Skill(s) | Uso |
|---|---|---|
| `emilkowalski/skill` | `emil-design-eng` | Componentes, animaciones, CSS avanzado |
| `pbakaus/impeccable` | `impeccable` | Auditoría anti-patrones UI — `/impeccable audit` |
| `Leonxlnx/taste-skill` | `brandkit`, `design-taste-frontend`, `minimalist-ui`, y 9 más | Gusto visual |
| `nextlevelbuilder/ui-ux-pro-max-skill` | `ui-ux-pro-max` | Referencia UX/UI — accesibilidad, motion, formularios |

---

## 19. Historial de cambios principales

| Fecha | Descripción |
|---|---|
| 18 mayo 2026 | Premium 3D redesign — dark ocean, glassmorphism, mouse tilt |
| 18 mayo 2026 | Hero ImageTrail + landing blanco arena |
| 19 mayo 2026 | AnimatedRoadmap SVG + hero foto dominante + tooltip |
| 20 mayo 2026 | Fix hero foto invisible (opacity stacking context bug) |
| 20 mayo 2026 | SpinningText SVG (port React MagicUI → vanilla) |
| 21 mayo 2026 | **Navbar universal** hide-on-scroll + hamburger drawer |
| 21 mayo 2026 | **Circle Menu eliminado** (redundante con navbar) |
| 21 mayo 2026 | **Sistema bilingüe completo** — todas las páginas, blog incluido |
| 21 mayo 2026 | **Reseñas reales** — formulario 5★ + moderación admin |
| 21 mayo 2026 | **Stat "9 destinos"** eliminado del hero de anunciantes |
| 21 mayo 2026 | **Orbital 3D** en anunciantes (reemplaza stat cards) |
| 21 mayo 2026 | **Fondos unificados** a `var(--blanco-arena)` en todo el proyecto |
| 21 mayo 2026 | **Esfera 3D Fibonacci** en blog.html (port React SphereImageGrid) |
| 21 mayo 2026 | **18 fotos Miami** con descripciones honestas; 13 irrelevantes eliminadas |
| 22 mayo 2026 | **Video eliminado** de `seccion-intro` en index.html |
| 22 mayo 2026 | **Animación título** "¿Por qué Explora Miami?" — slideIn + línea gradiente |
| 22 mayo 2026 | **Efectos vibración** en pills ✓ (index) y checks/features (anunciantes) |

---

## 20. Pendientes

### Alta prioridad
- [ ] **Verificar GA4** — confirmar `G-7HMBMBQNQZ` en analytics.google.com
- [ ] **Dominio propio** — Namecheap + CNAME GitHub Pages
- [ ] **Panel admin métricas reales** — integrar GA4 Reporting API

### Media prioridad
- [ ] **Más destinos** — ampliar de 9 a 15–20
- [ ] **Imágenes propias** — fotos reales de Miami
- [ ] **Tooltip táctil** en el roadmap (tap en lugar de hover)
- [ ] **Afiliados Amazon** — sección equipamiento recomendado

### Baja prioridad
- [ ] **Filtros avanzados** — dificultad, precio, distancia, mejor época
- [ ] **Compartir destinos** — WhatsApp, X, Instagram
- [ ] **Click en milestone** → abrir modal del destino

---

## 21. Seguridad del panel admin

- Contraseña hardcoded en `admin.js`: `var ADMIN_PASS = 'miami2026'`
- Sesión en `sessionStorage` — no persiste al cerrar pestaña
- No hay backend — autenticación client-side únicamente
- Para producción: migrar a Firebase Auth o Supabase
- `esc(str)` en todo HTML dinámico del admin (prevención XSS)
