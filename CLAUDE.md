# Explora Miami — Guía completa del proyecto

> **Fecha de última actualización:** 18 mayo 2026
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
├── index.html              ← sitio público bilingüe (447 líneas)
├── admin.html              ← panel de administración privado
├── CLAUDE.md               ← este archivo
├── skills-lock.json        ← registro de skills instaladas
├── assets/
│   ├── css/
│   │   ├── styles.css      ← estilos del sitio público (1,700+ líneas)
│   │   └── admin.css       ← estilos del panel admin
│   ├── js/
│   │   ├── main.js         ← lógica pública + datos de destinos (~900 líneas)
│   │   ├── admin.js        ← lógica del panel admin
│   │   ├── i18n.js         ← sistema de traducción ES/EN
│   │   └── analytics.js    ← eventos GA4 custom
│   ├── images/
│   └── videos/
│       └── *.mp4           ← video del hero
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
- **Mobile-first** — breakpoints: 640px y 768px
- **Fuentes**: Playfair Display italic (títulos) + Inter (cuerpo) vía Google Fonts
- **Comentarios** en español
- Sin transpilación, sin build step — desplegable directamente en GitHub Pages
- Variables ES5 (`var`) — sin ES6 modules para máxima compatibilidad

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
- **Hero cinematográfico** con video de fondo, overlay gradiente, etiqueta cristalina, título en Playfair Display italic, tagline, 2 CTAs glass, scroll indicator animado, parallax en el fondo
- **Hero orbs** — 3 luces flotantes animadas (turquesa/coral/mostaza) con `@keyframes orbs-drift`
- **Sección intro** — 3 cards con identidad de color por posición (turquesa, mostaza, coral) con `border-top` acento
- **Sección destinos** — dark ocean background (`#071e2b → #0a2d3f → #051822`) con filtros por tipo (Todos / Tierra / Mar) y grid de 9 destinos
- **Glassmorphism cards** — `backdrop-filter: blur(22px)`, glass border, sheen diagonal, sombras en capas
- **Animación cinética de entrada** — columna izquierda gira desde la izquierda, central cae desde arriba, derecha gira desde la derecha (inspirado en ScrollTiltedGrid)
- **Grid escalonado** — columna central con `margin-top: 3rem` en desktop
- **Mouse 3D tilt** — `perspective(1000px) rotateY/rotateX` en mousemove, reset suave en mouseleave
- **Modal a pantalla completa** — galería de 4 fotos con prev/next y thumbnails, descripción larga, datos prácticos, reseñas de visitantes, botones Google Maps / Apple Maps / Sitio web / Reseñas, mapa embed
- **Sección mapa** — iframe de Google Maps + 6 chips de marcadores de destinos destacados
- **Sección "Trabaja con nosotros"** — beneficios con iconos gradiente, formulario de contacto de 6 campos, mensaje de éxito
- **Footer** — gradiente azul oscuro, logo, navegación, lista de destinos, íconos sociales, copyright, enlace al admin
- **Bilingüe completo** — ES / EN con toggle en navbar
- **SEO completo** — meta description, Open Graph, Twitter Card, Schema.org JSON-LD (WebSite, Organization, ItemList)
- **Canonical URL** definida
- **prefers-reduced-motion** — desactiva todas las animaciones 3D y de entrada

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

`styles.css` tiene tres grandes bloques acumulativos. **No eliminar ninguno** — cada uno corrige o extiende al anterior.

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

## 12. Flujo JS — main.js

```
DOMContentLoaded
  → registrarVisita()          — guarda visita de hoy en em_visitas
  → renderDestinos()           — lee em_destinos, filtra por tipo, genera HTML de cards
      → initScrollAnimation()  — IntersectionObserver threshold 0.10, añade .visible
      → bindCardTilt(card)     — 3D mouse tilt en cada card
  → initScrollAnimation()      — segunda llamada para elementos estáticos fade-up
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

**Parallax hero:**
```javascript
// IIFE en DOMContentLoaded
window.addEventListener('scroll', function() {
  heroFondo.style.transform = 'translateY(' + (scrollY * 0.28) + 'px)';
}, { passive: true });
```

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
- [ ] **Verificar GA4** — confirmar que `G-7HMBMBQNQZ` es el ID real de la propiedad, o crear propiedad nueva y actualizar
- [ ] **Dominio propio** — comprar en Namecheap, configurar CNAME en GitHub Pages, actualizar canonical y OG URLs en `index.html`
- [ ] **Panel admin con métricas reales** — actualmente las visitas se siembran con datos demo. Integrar con GA4 Reporting API o Data API para datos reales

### Media prioridad
- [ ] **Monetización listings** — crear página/sección para que empresas contraten listing. Formulario de alta con campos: nombre empresa, actividad, precio, descripción, fotos, datos de contacto
- [ ] **Afiliados Amazon** — agregar sección "Equipamiento recomendado" con enlaces de afiliado a kayaks, snorkels, mochilas, etc.
- [ ] **Imágenes propias** — reemplazar fotos de Unsplash por fotos reales de los destinos (Unsplash OK para MVP, no ideal para SEO)
- [ ] **Más destinos** — ampliar de 9 a 15–20 destinos. Usar la misma estructura de objeto en `DESTINOS_DEFAULT`

### Baja prioridad
- [ ] **Blog/contenido** — artículos de SEO sobre actividades outdoor en Miami
- [ ] **Mapa interactivo** — reemplazar iframe de Google Maps por Leaflet.js con marcadores custom para todos los destinos
- [ ] **Filtros avanzados** — por dificultad, precio, distancia desde Miami, mejor época
- [ ] **Compartir destinos** — botones de share por destino (WhatsApp, X, Instagram)

---

## 17. Objetivo del negocio y plan de monetización

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

| Fecha | Cambio |
|---|---|
| — | Creación inicial del proyecto — 6 destinos, estructura básica |
| — | Ampliación a 9 destinos reales verificados con galería, reseñas y datos completos |
| — | Implementación GA4 con eventos custom en `analytics.js` |
| — | Impeccable audit — fixes WCAG AA en contraste, motion, line-height |
| — | taste-skill soft — tipografía, jerarquía visual, identidad de color por sección |
| — | Instalación de `nextlevelbuilder/ui-ux-pro-max-skill` y revisión de seguridad |
| 18 mayo 2026 | **Premium 3D redesign** — dark ocean section, glassmorphism cards, hero orbs, animaciones cinéticas de entrada por columna, grid escalonado, mouse tilt 3D |
