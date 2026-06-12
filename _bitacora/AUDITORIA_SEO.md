# Auditoría SEO — 305 Ruta Miami
> Estado real del repo · solo lectura · 2 junio 2026
> Sitio: https://305rutamiami.com · HTML/CSS/JS puro · GitHub Pages

---

## 1. Inventario de páginas HTML

| Archivo en repo | URL pública | Indexable |
|---|---|---|
| `index.html` | `https://305rutamiami.com/` | ✅ sí |
| `anunciantes.html` | `/anunciantes.html` | ✅ sí |
| `blog.html` | `/blog.html` | ✅ sí |
| `privacidad.html` | `/privacidad.html` | ✅ sí |
| `terminos.html` | `/terminos.html` | ✅ sí |
| `destinos/everglades.html` | `/destinos/everglades.html` | ✅ sí |
| `destinos/john-pennekamp.html` | `/destinos/john-pennekamp.html` | ✅ sí |
| `destinos/biscayne.html` | `/destinos/biscayne.html` | ✅ sí |
| `destinos/bill-baggs.html` | `/destinos/bill-baggs.html` | ✅ sí |
| `destinos/oleta-river.html` | `/destinos/oleta-river.html` | ✅ sí |
| `destinos/virginia-key.html` | `/destinos/virginia-key.html` | ✅ sí |
| `destinos/matheson-hammock.html` | `/destinos/matheson-hammock.html` | ✅ sí |
| `destinos/crandon-park.html` | `/destinos/crandon-park.html` | ✅ sí |
| `destinos/arch-creek.html` | `/destinos/arch-creek.html` | ✅ sí |
| `blog/buceo-key-largo-guia.html` | `/blog/buceo-key-largo-guia.html` | ✅ sí |
| `blog/everglades-un-dia.html` | `/blog/everglades-un-dia.html` | ✅ sí |
| `blog/kayak-miami-principiantes.html` | `/blog/kayak-miami-principiantes.html` | ✅ sí |
| `admin.html` | `/admin.html` | 🚫 `noindex,nofollow` (correcto) |
| `portal/index.html` | `/portal/` | 🚫 `noindex,nofollow` (correcto) |
| `portal/panel.html` | `/portal/panel.html` | 🚫 `noindex,nofollow` (correcto) |

**20 páginas HTML.** 17 indexables + 3 con `noindex` (admin, portal×2).

---

## 2. Destinos — el hallazgo más importante

- **Total en datos:** **21 destinos** en `DESTINOS_DEFAULT` (`assets/js/main.js`).
- **Con página HTML individual propia:** **solo 9** (mapeados en `DESTINO_URLS`, ids 1–9).
- **Solo modal (sin URL propia, invisibles para Google):** **12** (ids 10–21).

| # | Destino | ¿Tiene página? |
|---|---|---|
| 1 | Everglades National Park | ✅ `/destinos/everglades.html` |
| 2 | John Pennekamp Coral Reef State Park | ✅ `/destinos/john-pennekamp.html` |
| 3 | Biscayne National Park | ✅ `/destinos/biscayne.html` |
| 4 | Bill Baggs Cape Florida State Park | ✅ `/destinos/bill-baggs.html` |
| 5 | Oleta River State Park | ✅ `/destinos/oleta-river.html` |
| 6 | Virginia Key Beach Park | ✅ `/destinos/virginia-key.html` |
| 7 | Matheson Hammock Park | ✅ `/destinos/matheson-hammock.html` |
| 8 | Crandon Park | ✅ `/destinos/crandon-park.html` |
| 9 | Arch Creek Park | ✅ `/destinos/arch-creek.html` |
| 10 | South Beach (Lummus Park) | ❌ solo modal |
| 11 | Neptune Memorial Reef | ❌ solo modal |
| 12 | Half Moon Wreck Preserve | ❌ solo modal |
| 13 | South Pointe Park Pier | ❌ solo modal |
| 14 | Haulover Park (Jetty) | ❌ solo modal |
| 15 | Rickenbacker Causeway | ❌ solo modal |
| 16 | Newport Fishing Pier | ❌ solo modal |
| 17 | Deering Estate | ❌ solo modal |
| 18 | Versailles | ❌ solo modal |
| 19 | Joe's Stone Crab | ❌ solo modal |
| 20 | Ball & Chain | ❌ solo modal |
| 21 | Mango's Tropical Cafe | ❌ solo modal |

➡️ **Más de la mitad de los destinos (12/21) no existen como página y son inindexables.**

---

## 3. Tabla SEO por página

### Páginas principales / legales
| Página | `<title>` único | meta desc | canonical → 305rutamiami | OG | JSON-LD | h1 |
|---|---|---|---|---|---|---|
| `/` (index) | ✅ "305 Ruta Miami — Directorio…" | ✅ | ✅ | ✅ (og:image = **placeholder istock**) | ✅ WebSite + Organization + ItemList | ⚠️ **2 h1** (uno `visually-hidden` + hero) |
| `/anunciantes.html` | ✅ | ✅ | ✅ | ✅ | — | 1 |
| `/blog.html` | ✅ | ✅ | ✅ | ✅ | — | 1 |
| `/privacidad.html` | ✅ | ✅ | ✅ | — | — | 1 |
| `/terminos.html` | ✅ | ✅ | ✅ | — | — | 1 |

### Páginas de destino (las 9) — bien optimizadas, modelo a replicar
Ejemplo `destinos/everglades.html` (representativo de las 9):
- `<title>` único: "Everglades National Park — Guía Completa… | 305 Ruta Miami" ✅
- meta description ✅ · canonical → `305rutamiami.com` ✅
- Open Graph completo (og:title, og:description, og:image, og:url) ✅
- **JSON-LD rico:** `TouristAttraction` + `BreadcrumbList` + `GeoCoordinates` + `PostalAddress` ✅
- Exactamente **1 `<h1>`** = nombre del destino ✅
- **Contenido único** por destino (descripción larga, cómo llegar, galería, etc.) ✅

### Blog (3 artículos)
Títulos únicos, canonical correcto, contenido único. ✅

---

## 4. sitemap.xml
- **Existe**, 17 `<loc>`, **todas con `305rutamiami.com`** (0 con dominio viejo). ✅ dominio correcto.
- **Incluye solo las 9 páginas de destino** existentes. ❌ **Faltan los 12 destinos modal** (no tienen URL).
- `<lastmod>` = **`2026-05-28` en todas** → ⚠️ **desactualizado** (anterior al rebrand y a los últimos cambios).
- URLs listadas: home, anunciantes, blog, 9 destinos, 3 blog, privacidad, terminos.

---

## 5. robots.txt
```
User-agent: *
Allow: /

Sitemap: https://305rutamiami.com/sitemap.xml
```
✅ Correcto: permite todo y apunta al sitemap en el dominio nuevo.

---

## 6. Enlazado interno (clave)
Las tarjetas de destino se generan por **JavaScript** (`renderDestinos` inyecta `innerHTML`). El mecanismo de navegación (`main.js` L925–963):

- **9 destinos con página:** el botón "Ver destino →" SÍ es un **`<a href="destinos/X.html">`** (crawlable). La tarjeta además navega con `onclick="window.location.href=..."`. → Google puede seguir el enlace (y además están en el sitemap).
- **12 destinos modal:** el botón es **`<button onclick="abrirModal(id)">`** — **no hay ningún `<a href>`**. Solo JavaScript. → **Google no tiene ninguna URL que seguir ni indexar.**

**Cómo se navega hoy a un destino:**
- A uno de los 9 → clic en la tarjeta o en "Ver destino" → carga `destinos/X.html` (página real).
- A uno de los 12 → clic → `abrirModal(id)` abre una superposición en la misma página (`index.html`), sin cambiar la URL.

⚠️ Matiz: incluso los `<a href>` de los 9 se inyectan por JS. Google ejecuta JS, pero enlaces estáticos serían más robustos. El sitemap mitiga esto para los 9; los 12 no tienen ni sitemap ni href.

---

## 7. Bilingüe / hreflang
- **`hreflang`: NINGUNA página lo tiene.** ❌
- **Manejo de idioma:** una **sola URL por página** sirve ES y EN simultáneamente; se alterna con clases CSS `.lang-es` / `.lang-en` (toggle client-side, estado en `localStorage('em_idioma')`). Ambos idiomas están en el DOM; el inactivo se oculta con CSS.
- **Impacto en indexación:**
  - Google ve **contenido mixto ES+EN en una misma URL** (el texto oculto sigue en el HTML).
  - No hay señales `hreflang` → no se pueden targetear las versiones ES vs EN por separado en buscadores.
  - Riesgo de relevancia diluida: una sola URL compite para consultas en ambos idiomas.

---

## 8. Imágenes
- **`alt`:** las tarjetas usan `alt="<nombre del destino>"` (descriptivo) ✅. La galería del modal usa `alt="<nombre> — foto N"` / `miniatura N` ✅.
- **Nombres de archivo:**
  - 12 destinos nuevos: `assets/images/destinos/<slug>/<slug>-N.jpg` → **descriptivos** (ej. `south-beach-1.jpg`, `versailles-1.jpg`) ✅.
  - 9 destinos originales: aún usan **hotlinks de Wikipedia** (URLs largas, dependencia externa) — pueden romperse y no son propias.

---

## 9. Hallazgos priorizados (mayor → menor impacto)

| # | Severidad | Hallazgo | Impacto |
|---|---|---|---|
| 1 | 🔴 Crítico | **12 destinos (10–21) sin página ni URL** (solo modal) | Más de la mitad del catálogo es **inindexable**; cero posibilidad de rankear por esos lugares (South Beach, Versailles, Joe's, etc., términos de alto volumen) |
| 2 | 🟠 Alto | **sitemap desactualizado**: `lastmod` 2026-05-28 + faltan los 12 destinos | Google no descubre los nuevos; señales de frescura viejas |
| 3 | 🟠 Alto | **Enlazado interno dependiente de JS**; los 12 modal sin `<a href>` | Crawl frágil; los 12 no tienen ninguna ruta que seguir |
| 4 | 🟡 Medio | **Sin `hreflang`**; ES/EN en la misma URL vía CSS | No se targetean idiomas; contenido mixto en una URL |
| 5 | 🟡 Medio | **`og:image` de index = placeholder istockphoto** (no branded) | Previews pobres al compartir en redes/WhatsApp |
| 6 | 🟡 Medio | **index con 2 `<h1>`** (visually-hidden + hero) | Debería haber un solo h1 por página |
| 7 | 🟢 Bajo | **9 destinos originales con fotos hotlink de Wikipedia** | Riesgo de imágenes rotas; no son activos propios |

### Inconsistencias verificadas
- ✅ **Dominio:** 0 referencias al dominio viejo `ytntxnz8py.github.io` ni a "explora" en sitemap/canonicals (rebrand limpio).
- ✅ **Canonicals:** todos apuntan a `305rutamiami.com`.
- ✅ **Títulos/descripciones:** únicos por página (no duplicados).
- ❌ **Páginas huérfanas/ausentes:** los 12 destinos modal son "páginas fantasma" — existen como dato pero no como URL.

### Lo que ya está bien (no tocar)
- Las **9 páginas de destino** están muy bien optimizadas (canonical, OG, JSON-LD `TouristAttraction`, h1 único, contenido único). **Son el modelo exacto a replicar para los 12 que faltan.**
- robots.txt correcto · admin y portal con `noindex` · dominio nuevo consistente.

---

## Recomendación de orden para la Etapa 3b (cuando se apruebe construir)
1. Generar las **12 páginas de destino faltantes** replicando la plantilla de las 9 (con su JSON-LD, OG, canonical, h1, contenido único).
2. Añadirlas a `DESTINO_URLS`, al `sitemap.xml` (y refrescar `lastmod`).
3. Asegurar `<a href>` reales hacia los 21 destinos.
4. Reemplazar `og:image` placeholder por una imagen branded.
5. Evaluar estrategia de idioma / `hreflang`.
6. Migrar fotos de los 9 originales a locales.

*(Auditoría solo lectura — no se modificó ningún archivo del sitio.)*
