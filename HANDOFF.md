> ⭐ FUENTE DE VERDAD ÚNICA del proyecto. Si existe otro documento de contexto, este tiene prioridad.
> Actualiza ESTE archivo cada vez que cambie la arquitectura, precios, estructura de archivos o stack.
> Última actualización confirmada: 27 mayo 2026

# HANDOFF — Explora Miami
> Estado del proyecto al **27 mayo 2026** · 175 commits · GitHub Pages

---

## 1. Qué es el proyecto

**Explora Miami** es un directorio de experiencias outdoor en Miami y South Florida.
Público: viajeros hispanos + angloparlantes que buscan actividades en la naturaleza.
Modelo de negocio: B2C orgánico + B2B (empresas de tours que contratan espacio en la
página `anunciantes.html`).

URL live: `https://ytntxnz8py.github.io/mi-tienda/`

---

## 2. Stack técnico

| Capa | Decisión |
|---|---|
| Lenguaje | HTML5 + CSS3 + **ES5 puro** (sin frameworks, sin build) |
| JS | `var`, function declarations, **sin arrow functions**, **sin template literals** |
| Deploy | **GitHub Pages** — rama `main`, repo `Ytntxnz8py/mi-tienda` |
| Fuentes | Playfair Display · Cormorant Garamond · Inter (Google Fonts CDN) |
| Analytics | Google Analytics `G-7HMBMBQNQZ` ⚠️ pendiente reemplazar por ID real |
| Schema | JSON-LD en `index.html` (WebSite + Organization + ItemList) |
| i18n | Bilingüe ES/EN — toggle en navbar, estado en `localStorage('em_idioma')` |

**Reglas de CSS inamovibles:**
- `overflow-x: hidden` SOLO en `<html>`, NUNCA en `<body>` (rompería `position:sticky`)
- Sin `#000` / `#fff` puro — usar siempre colores de la paleta
- `prefers-reduced-motion` en todos los `transform` / `animation`

---

## 3. Paleta oficial

```css
/* Acentos */
--coral:          #FF6B6B   /* CTA, badges mar */
--turquesa:       #00BCD4   /* primario, links, activos */
--mostaza:        #FFB300   /* advertencias, badges tierra */

/* Fondos */
--blanco-arena:   #FFFDF7   /* fondo global del sitio */
--azul-profundo:  #071e2b   /* hero oscuro, footer */
--ocean-ini:      #071e2b
--ocean-mid:      #0a2d3f

/* Texto */
--tinta:          #1a2a35   /* títulos principales */
--texto-medio:    #4a6070   /* cuerpo de texto */
--texto-suave:    #4a6f82   /* meta, labels (corregido de #8aacba — fallaba WCAG AA) */

/* Bordes / sombras */
--borde:          rgba(0, 188, 212, 0.18)
--sombra-suave:   0 4px 24px rgba(0,0,0,0.06)
--sombra-card:    0 8px 36px rgba(0,0,0,0.09)
--sombra-hover:   0 22px 56px rgba(0,188,212,0.28), 0 8px 20px rgba(0,188,212,0.14)

/* Footer exclusivo */
--footer-ini: #00434F · --footer-mid: #003240 · --footer-fin: #002530
```

**Tipografía:**
- Títulos: `'Playfair Display', Georgia, serif` (`--fuente-titulo`)
- Cuerpo: `'Inter', 'Helvetica Neue', sans-serif` (`--fuente-cuerpo`)
- Escala: xs 0.75rem · sm 0.875rem · base 1rem · lg 1.0625rem

**Motion:**
- Easing estándar: `cubic-bezier(0.2, 0, 0, 1)` — guardar como `--ease`
- Entrada de elementos: `fade-up` class (opacity+translateY, 0.6s)
- Navbar: hide/show con `transform: translateY(-110%)`, `transition 0.32s`

---

## 4. Estructura de archivos

```
explora-miami/
│
├── index.html                  # Landing principal — 9 tarjetas destino
├── blog.html                   # Hub de artículos
├── anunciantes.html            # Para empresas (B2B)
├── comida.html                 # (stub — contenido pendiente)
├── aventura.html               # (stub — contenido pendiente)
├── admin.html                  # Panel admin (protegido por contraseña)
├── privacidad.html             # Política de privacidad
├── terminos.html               # Términos de uso
├── preview-imagenes.html       # Herramienta interna de preview
│
├── destinos/                   # 9 páginas de destino individuales
│   ├── everglades.html
│   ├── john-pennekamp.html
│   ├── biscayne.html
│   ├── bill-baggs.html
│   ├── oleta-river.html
│   ├── virginia-key.html
│   ├── matheson-hammock.html
│   ├── crandon-park.html
│   └── arch-creek.html
│
├── blog/                       # 3 artículos individuales
│   ├── buceo-key-largo-guia.html
│   ├── everglades-un-dia.html
│   └── kayak-miami-principiantes.html
│
├── assets/
│   ├── css/
│   │   ├── styles.css          # Variables globales, reset, layout base (5.673 líneas)
│   │   ├── navbar.css          # Navbar universal (320 líneas)
│   │   ├── footer.css          # Footer cinemático con aurora
│   │   ├── metal-button.css    # Sistema MetalButton universal
│   │   ├── liquid-btn.css      # Efecto Liquid Sweep (botones hero)
│   │   ├── cta-card.css        # Componente CTA compartido
│   │   ├── destino.css         # Páginas individuales de destino
│   │   ├── selector-gallery.css
│   │   ├── blog.css            # Hub blog + artículos
│   │   ├── admin.css           # Panel admin
│   │   └── anunciantes.css     # Página Para Empresas (3.321 líneas)
│   │
│   └── js/
│       ├── main.js             # Datos DESTINOS_DEFAULT + render tarjetas + modal (2.146 líneas)
│       ├── navbar.js           # Hide-on-scroll + drawer + idioma universal
│       ├── i18n.js             # Sistema bilingüe global
│       ├── metal-button.js     # Press/hover MetalButton
│       ├── liquid-tilt.js      # Efecto tilt 3D en tarjetas
│       ├── sphere-hero.js      # Esfera 3D en hero landing
│       ├── anunciantes.js      # Lógica completa Para Empresas (1.518 líneas)
│       ├── blog.js             # Hub blog
│       ├── destino.js          # Páginas individuales
│       ├── selector-gallery.js
│       ├── cta-card.js         # IntersectionObserver para CTA
│       ├── analytics.js        # Tracking custom (clics, visitas)
│       └── admin-config.js     # Panel admin
│
└── _privado/                   # ⛔ NUNCA commits — .gitignore
    ├── admin-secret.txt        # ADMIN_PASS=miami2026
    └── explora-miami-3f4a9c5f58ea.json  # Clave PEM Google Cloud
```

---

## 5. Componentes del sistema de diseño

### 5.1 Navbar universal (`navbar.css` + `navbar.js`)

- **Comportamiento:** fijo, se oculta al scrollear abajo (threshold 80px), reaparece al subir
- **Altura dinámica:** `navbar.js` mide el navbar real y escribe `--nav-h` en `:root`; todas las páginas usan `calc(var(--nav-h, 68px) + X)` para el padding del hero
- **Fallback CSS:** `:root { --nav-h: 68px }` para antes de que cargue el JS
- **Variante oscura:** `.em-nav.em-nav--dark-hero` para heroes con fondo oscuro — vuelve a claro al scrollear
- **Drawer móvil:** activo bajo 900px, animado con backdrop, cierre por Escape
- **Toggle idioma:** muestra el idioma destino (botón dice "EN" cuando estás en ES); delega a `window.cambiarIdioma()` si existe, o fallback localStorage

**Clases estado:**
```
.is-hidden    → translateY(-110%)
.is-scrolled  → sombra + fondo más opaco
.is-open      → drawer abierto (hamburguesa → X)
```

### 5.2 MetalButton (`metal-button.css` + `metal-button.js`)

Sistema de botón premium con efecto de borde metálico.

```html
<div class="metal-btn-wrap" data-variant="default|gold|turquesa|coral" data-size="sm|md|lg">
  <div class="metal-btn-inner"></div>
  <button class="metal-btn">
    <div class="metal-btn-shine"></div>
    <div class="metal-btn-hover-glow"></div>
    Texto del botón
  </button>
</div>
```

- `metal-btn-wrap`: Marco metálico con borde gradiente top→bottom #111→#A0A0A0
- `metal-btn-inner`: Capa de sombra interior
- `metal-btn-shine`: Reflejo diagonal superior
- `metal-btn-hover-glow`: Glow en hover (color según variante)
- Press físico: `transform: scale(0.96)` en 90ms (activado por `metal-button.js`)

### 5.3 Liquid Sweep (`liquid-btn.css`)

Efecto de fill líquido en hover sobre botones CTA del hero. Pseudoelemento `::before` con overflow:hidden que hace slide desde la izquierda.

### 5.4 CTA Card (`cta-card.css` + `cta-card.js`)

Componente compartido bilingüe. Fondo océano oscuro, max-width 770px, border-radius 1.25rem.
Activación por `IntersectionObserver` → clase `.cta-card--visible`.
Usado en: `blog.html` (CTA empresas) y `index.html` (newsletter).

### 5.5 Footer cinemático (`footer.css`)

- Fondo: gradiente `#071e2b → #092637 → #051820`
- Aurora: dos blobs `::before` / `::after` animados con blur(90px)
- Full-height: `min-height: 100svh` (con fallback `100vh`)
- Navegación: pills glass con hover border turquesa
- Variante `--mini`: sin aurora, reducido para páginas de destino

### 5.6 Orbital 3D (`anunciantes.js` + `anunciantes.css`)

Animación orbital en la sección "Cómo trabaja Explora Miami":

- Motor: `requestAnimationFrame` (rAF) con timestamp — **reemplazó setInterval en commit 6be6f07**
- Velocidad: `DEG_PER_SEC = 15` — constante independiente de frame rate
- dt capeado a 100ms para evitar saltos al volver de pestaña inactiva
- Perspectiva 3D: `Y_SCALE = 0.42` (desktop) / `0.62` (móvil) — aplana el eje Y
- Profundidad: scale varía 0.72→1.0 según sin(ángulo)
- Nodo CSS: `transition: none` (elimina conflicto con JS que causaba temblor en móvil)
- Anillo: elipse CSS — 400×168px desktop / 260×161px tablet / 200×124px móvil
- `IntersectionObserver`: pausa rAF cuando la sección sale del viewport

---

## 6. Sistema bilingüe

El toggle ES/EN se controla mediante clase en `<html>`:

```
html.lang-es → .lang-en { display: none !important }
html.lang-en → .lang-es { display: none !important }
html:not(.lang-es):not(.lang-en) .lang-en → oculto por defecto (evita flash)
```

**Implementación por página:**
- `styles.css` y `navbar.css` contienen las reglas `.lang-*` base
- Cada página tiene función `cambiarIdioma(lang)` que actualiza classList + localStorage
- `i18n.js` aplica el idioma guardado al cargar la página
- El navbar delega a `window.cambiarIdioma()` si existe (o fallback localStorage)

**Estado en localStorage:** `em_idioma` = `'es'` | `'en'`

---

## 7. Datos de destinos

Los 9 destinos viven en `DESTINOS_DEFAULT` dentro de `main.js` (líneas 9–464).
Cada objeto tiene:

```javascript
{
  id, nombre_es, nombre_en,
  descripcion_es, descripcion_en,        // corta (tarjeta)
  descripcion_larga_es, descripcion_larga_en, // larga (modal)
  como_llegar_es, como_llegar_en,
  foto, galeria[],                        // URLs Wikipedia
  lat, lng,
  dificultad_es, dificultad_en, dificultad_clase,
  precio, precio_en, horarios, horarios_en,
  tipo,                                   // 'mar' | 'tierra'
  tipo_es, tipo_en,
  telefono, web_oficial,
  mejor_epoca, mejor_epoca_en,
  google_maps_url, apple_maps_url, resenas_url,
  rating,                                 // Google Maps mayo 2026
  activo,
  resenas: [{ nombre, inicial, color, fecha, estrellas, texto_es, texto_en }]
}
```

**Versioning:** `DESTINOS_VERSION = 5` — auto-migra datos en localStorage si la versión es inferior.

**Caché localStorage:** `em_destinos` + `em_destinos_version`

---

## 8. Panel de administración

- URL: `/admin.html`
- Contraseña: `miami2026` (también en `admin.js:8` como `var ADMIN_PASS = 'miami2026'`)
- ⚠️ **Seguridad baja**: contraseña en client-side visible en código fuente — solo válido para MVP
- Funciones: crear/editar/desactivar destinos, ver métricas de clics y visitas
- Métricas en localStorage: `em_visitas` (por fecha) + `em_clics` (por ID de destino)

---

## 9. Avances recientes (últimos 15 commits)

| Commit | Descripción |
|---|---|
| `6be6f07` | fix(orbital): rAF 60fps, elipse perspectiva, transition:none |
| `d45a805` | fix(anunciantes): overflow:visible + padding hero móvil |
| `64a632b` | fix(anunciantes): flex:0 0 auto corrige fotos cortadas móvil |
| `a439ee3` | fix(ux): hero clearance navbar + MetalButton móvil + --nav-h dinámico |
| `a51b045` | fix(ux): elimina barra de progreso y scroll hint de destinos/blogs |
| `4d8c4d7` | fix(navbar): añade Privacidad y Términos al navbar de 9 páginas destino |
| `8c0eb61` | feat(footer): footer cinemático en destinos y blogs; variante --mini |
| `736ee53` | feat(destinos): reemplaza CTA plana con cta-card--blog en 9 destinos |
| `f48d076` | feat(blog): reemplaza CTA plana con cta-card--blog en 3 artículos |
| `09c93a6` | fix: como-funciona carpetas reparadas y -20% tamaño |
| `8340c25` | fix: cta-card -30% ancho (1100→770px) +15% alto |
| `9e729e3` | fix: cta-card fondo blanco, altura reducida, botón píldora |
| `4449471` | feat: cta-card component — blog CTA empresas + newsletter index |
| `a879785` | fix: precios -15% tamaño uniforme todas dimensiones |
| `57e46b7` | fix: precios compactos + MetalButton oficial restaurado |

---

## 10. Deuda técnica y huecos conocidos

### 🔴 Críticos

| Problema | Ubicación | Descripción |
|---|---|---|
| Google Analytics placeholder | `index.html:78` | `G-7HMBMBQNQZ` es placeholder — no trackea tráfico real hasta reemplazar por ID real |
| Admin password client-side | `admin.js:8` | `var ADMIN_PASS = 'miami2026'` visible en fuente — MVP only, no producción |
| Open Graph image | `index.html:17` | Apunta a `istockphoto-155372056-612x612.jpg` — imagen no branded, pendiente reemplazar |
| Canonical URL | Todas las páginas | Apunta a `/mi-tienda/` (nombre del repo) — no es un dominio propio |

### 🟡 Importantes

| Problema | Ubicación | Descripción |
|---|---|---|
| Fotos de destinos — Wikipedia | `main.js DESTINOS_DEFAULT` | Todas las imágenes son URLs de Wikipedia — pueden desaparecer; migrar a `/assets/images/` |
| `comida.html` stub | `comida.html` | Página referenciada en el navbar pero sin contenido real |
| `aventura.html` stub | `aventura.html` | Ídem |
| Modal legacy vs. páginas HTML | `main.js:571-602` | Los 9 destinos tienen páginas propias pero el código aún mantiene el sistema de modal como fallback — duplicidad de lógica |
| Rating hardcoded | `main.js` cada destino | `/* Google Maps — mayo 2026 */` — ratings estáticos, no se actualizan |

### 🟠 Diseño / UX

| Problema | Ubicación | Descripción |
|---|---|---|
| Estrellas de rating — emojis ⭐ | `main.js:547-552` + `styles.css` | Las tarjetas usan `⭐⭐⭐⭐⭐` como emojis Unicode — se ven distinto en cada OS; pendiente migrar a SVG o CSS stars |
| `meta-icono` con emojis | `main.js:645-653` | Iconos 💲 ⏰ renderizados como emojis — inconsistente entre plataformas |
| `preview-imagenes.html` | raíz del proyecto | Herramienta de desarrollo expuesta públicamente |
| Tarjeta Matheson Hammock | `main.js id:7` | Solo 2 fotos en galería (vs 4 en otros destinos) |
| Tarjeta Virginia Key | `main.js id:6` | Solo 2 fotos en galería |

### 🟢 Menores / Mejoras

| Área | Descripción |
|---|---|
| SEO | `hreflang` alternates no configurados (ES vs EN) |
| Favicon | Falta favicon del proyecto |
| `robots.txt` | No existe — indexación no controlada |
| Sitemap | No existe `sitemap.xml` |
| Lazy loading | `loading="lazy"` en tarjetas pero no en imágenes above-the-fold |
| Error de font en `styles.css` | Comentario dice "Abril Fatface + Nunito" pero las fuentes cargadas son Playfair Display + Inter — artefacto de iteración previa |

---

## 11. Seguridad

### ⛔ Archivos privados — NUNCA en git

```
_privado/admin-secret.txt           # ADMIN_PASS=miami2026
_privado/explora-miami-3f4a9c5f58ea.json  # Clave PEM real de Google Cloud
_privado/gas-proxy.js               # Google Apps Script proxy
```

Verificado en `.gitignore`. Cualquier `git add -A` podría exponer estos archivos si `.gitignore` se corrompe — usar siempre `git add <archivo>` específico.

### ⚠️ Vectores de riesgo aceptados (MVP)

1. **Admin password visible**: `admin.js` está en el repo público. La contraseña `miami2026` es legible por cualquiera. Mitigación actual: cero datos sensibles de usuarios en el admin, solo contenido editorial.
2. **localStorage sin cifrado**: datos de destinos y métricas en localStorage — sin datos personales de usuarios, riesgo bajo.
3. **Sin CSP headers**: GitHub Pages no permite configurar headers de seguridad — sin mitigación posible en este stack.

---

## 12. Cómo se cargan los scripts (orden)

Todas las páginas siguen este patrón al final del `<body>`:

```html
<!-- 1. Datos y lógica global -->
<script src="../assets/js/main.js"></script>      <!-- o ruta relativa -->

<!-- 2. Componentes compartidos -->
<script src="../assets/js/metal-button.js"></script>
<script src="../assets/js/liquid-tilt.js"></script>
<script src="../assets/js/cta-card.js"></script>

<!-- 3. Navbar (siempre) -->
<script src="../assets/js/navbar.js"></script>

<!-- 4. i18n (siempre) -->
<script src="../assets/js/i18n.js"></script>

<!-- 5. Específico de la página -->
<script src="../assets/js/anunciantes.js"></script>  <!-- solo en anunciantes -->
<script src="../assets/js/blog.js"></script>          <!-- solo en blog -->
<script src="../assets/js/destino.js"></script>       <!-- solo en /destinos/ -->
```

`navbar.js` y `i18n.js` asumen que `main.js` ya cargó `DESTINOS_DEFAULT` y funciones globales como `cambiarIdioma`.

---

## 13. Variable CSS `--nav-h` — guía de uso

`navbar.js` mide la altura real del navbar y escribe `--nav-h` al cargar + en resize.
Fallback en `navbar.css`: `:root { --nav-h: 68px }`.

**Fórmula para heroes:**

```css
/* Páginas normales (fondo claro) */
padding-top: calc(var(--nav-h, 68px) + 40px);  /* landing */
padding-top: calc(var(--nav-h, 68px) + 32px);  /* blog */

/* Móvil */
@media (max-width: 900px) {
  padding: calc(var(--nav-h, 68px) + 32px) 1.25rem 3.5rem;
}
```

---

## 14. Próximos pasos recomendados

### Prioridad alta
1. **Reemplazar `G-7HMBMBQNQZ`** por el Measurement ID real en todas las páginas (actualmente solo en `index.html`)
2. **Migrar imágenes de Wikipedia** a `/assets/images/` — copiar las 9×4 fotos localmente
3. **Estrellas de rating SVG** — reemplazar emojis `⭐` por SVG o CSS puro para consistencia cross-platform
4. **Contenido de `comida.html` y `aventura.html`** — actualmente stubs sin contenido

### Prioridad media
5. **Dominio propio** — configurar CNAME en GitHub Pages y actualizar todos los canonicals
6. **Favicon** del proyecto
7. **`robots.txt` + `sitemap.xml`** — mejorar indexación SEO
8. **`hreflang` alternates** — declarar ES y EN en `<head>` de cada página

### Prioridad baja
9. **Eliminar sistema modal legacy** de `main.js` — ya no se usa, todos los destinos tienen página propia
10. **Migrar admin a servidor** con autenticación real (actualmente MVP client-side)
11. **`preview-imagenes.html`** — ocultar de producción o eliminar

---

## 15. Comandos útiles

```bash
# Ver estado del repo
git status --short

# Deploy (siempre es push a main — GitHub Pages auto-despliega)
git add assets/css/archivo.css assets/js/archivo.js
git commit -m "fix(seccion): descripcion del cambio"
git push origin main

# Ver historial visual
git log --oneline -20

# NUNCA
git add -A   # riesgo de incluir _privado/
git add .    # ídem
```

---

*Generado el 27 mayo 2026 — Claude Sonnet 4.6*
