# HANDOFF — 305 Ruta Miami · Estado tras Lote 1 SEO
> Documento de traspaso para una nueva sesión de Claude Code. Fecha: 2026-06-03.
> Léelo completo antes de actuar. Lo único PENDIENTE es decidir si borrar una rama de respaldo (ver §7).

---

## 0. Resumen en una línea
Sitio estático (HTML/CSS/JS puro, GitHub Pages) del directorio outdoor **305 Ruta Miami**. Se acaba de completar y **fusionar a `main`** el **Lote 1 SEO**: 8 nuevas páginas de destino indexables + saneamiento honesto de los ratings de las 9 páginas existentes + sitemap y enlaces crawlables. Todo está pusheado y en producción.

---

## 1. Rutas y entorno (IMPORTANTE — hay dos carpetas)
- **Repo real / archivos del sitio:** `C:\Users\calil\OneDrive\Documentos\explora-miami`  ← TODOS los edits del sitio van aquí.
- **CWD de la sesión (NO es el repo):** `C:\Users\calil\Downloads\yony-fix_1_files`  ← aquí viven scripts temporales fuera del repo. No confundir.
- **Shell:** Git Bash en Windows. Tras cada comando el cwd se resetea a `Downloads\yony-fix_1_files`, así que usa **rutas absolutas** o `cd "C:/Users/calil/OneDrive/Documentos/explora-miami" && ...` al inicio de cada comando.
- **EOL:** los archivos originales del repo usan **CRLF**. Los archivos nuevos se generaron en LF y git los normaliza a CRLF al commitear (warnings inofensivos). Si editas con scripts Node, detecta el EOL y respétalo (`const CRLF = s.includes('\r\n')`).
- **Node** está disponible para scripts (`node script.mjs`). `xmllint` NO está.

## 2. Repo / deploy
- GitHub: **`Ytntxnz8py/305-ruta-miami`**, dominio **305rutamiami.com** (CNAME). Deploy = push a `main` → GitHub Pages (~1–2 min).
- Rama por defecto: `main`. Último commit en main: **`4996b25`** ("Lote 1 SEO: 8 destinos indexables + ratings honestos…").
- **Reglas de git de este cliente (RESPÉTALAS):** trabajar en ramas feature, **nunca** `git add .`/`-A` (añadir por nombre), **no fusionar ni borrar ramas sin que el usuario lo pida**; el usuario revisa y fusiona. Mensajes de commit terminan con `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## 3. Arquitectura del sitio (lo que necesitas saber)
- **Bilingüe ES/EN** en una sola URL: spans `.lang-es`/`.lang-en`, toggle por clase en `<html>`, estado en `localStorage('em_idioma')`. JS en ES5 (var, sin arrow ni template literals en el código del sitio).
- **Datos de destinos:** `assets/js/main.js` → array `DESTINOS_DEFAULT` (21 destinos, ids 1–21). Campos por destino: nombre_es/en, descripcion(_larga)_es/en, como_llegar_es/en, foto, galeria[], lat/lng, precio/horarios/tipo/categoria, telefono, web_oficial, google_maps_url, apple_maps_url, resenas_url, rating, etc.
- **`DESTINO_URLS`** (en main.js): mapa id→ruta HTML. El render de tarjetas (`renderDestinos`, ~L919) usa `DESTINO_URLS[id]` para decidir `<a href>` (crawlable) vs `<button onclick=abrirModal>`. **Ahora tiene ids 1–17** (los 17 con página). ids 18–21 (Versailles, Joe's Stone Crab, Ball & Chain, Mango's) siguen siendo **solo modal** (editoriales, `es_editorial:true`).
- **`DESTINOS_VERSION = 7`** (re-seed de localStorage). NO cambió en el Lote 1 (no se tocó DESTINOS_DEFAULT). Increméntalo solo si modificas DESTINOS_DEFAULT.
- **Quiz por destino:** `destino.js` lee `window.DESTINO_QUIZ` (array de 5) inyectado inline en cada página, entre `i18n.js` y `destino.js`. Formato de cada item: `{pregunta_es, pregunta_en, emoji, opciones_es[], opciones_en[], correcta(idx), dato_es, dato_en}`.
- **CSS/JS reutilizable:** navbar, destino.css, selector-gallery, metal-button (data-variant: turquesa|coral|gold|tierra|ghost|dark), liquid-btn, cta-card, footer. **Regla del cliente: NO agregar CSS nuevo ni alterar el diseño establecido**; reusar clases/variables existentes.
- **GA4:** `G-7HMBMBQNQZ`. Admin (`admin.html`) + portal con `noindex`. El secreto del proxy GA vive solo en `admin-config.js` (gitignored); ya fue rotado en una tarea previa.

## 4. Lo que se hizo en el Lote 1 (ya en main)
### 4a. 8 páginas de destino nuevas (ids 10–17) — antes solo modal, ahora indexables
| id | archivo | categoría | fotos |
|----|---------|-----------|-------|
| 10 | `destinos/south-beach.html` | Playa | 6 |
| 11 | `destinos/neptune-memorial-reef.html` | Buceo | 4 |
| 12 | `destinos/half-moon-wreck.html` | Buceo | 2 |
| 13 | `destinos/south-pointe-park.html` | Pesca | 1 |
| 14 | `destinos/haulover-park.html` | Pesca | 2 |
| 15 | `destinos/rickenbacker-causeway.html` | Pesca | 2 |
| 16 | `destinos/newport-fishing-pier.html` | Pesca | 2 |
| 17 | `destinos/deering-estate.html` | Exploración | 2 |

Cada una: réplica EXACTA del esqueleto del piloto South Beach (que a su vez clonó `everglades.html`): head SEO único (title/meta/canonical/OG og:type=article/og:image=hero real), JSON-LD `TouristAttraction`+`BreadcrumbList`+`GeoCoordinates`+`PostalAddress`, 1 `<h1>`, hero+badges+stats, gancho+pullquote, galería selector (nº real de fotos), quiz 5 veraz, actividades, prep, datos prácticos, **sección de ratings honesta**, CTA anunciante honesto, relacionados con `<a href>` reales. Fotos en `assets/images/destinos/<carpeta>/`. **Ojo:** las carpetas de imágenes a veces NO coinciden con el slug de la página (p.ej. página `neptune-memorial-reef.html` usa carpeta `neptune-reef/`; `south-pointe-park.html`→`south-pointe-pier/`; `haulover-park.html`→`haulover/`; `newport-fishing-pier.html`→`newport-pier/`).

### 4b. Política de ratings HONESTA (definitiva — aplícala siempre)
- Sección "Lo que dice internet": tarjetas **logo + etiqueta + enlace** a la fuente real (Google Maps reseñas vía `google_maps_url`, Apple Maps, Sitio oficial si hay `web_oficial`). **NUNCA** puntaje (4.8) ni conteo ("+13,000 reseñas") inventado.
- Si no hay ninguna URL real de reseñas → se omite la sección.
- En las 8 nuevas, la `.rating-grid` lleva un **`style` inline** para centrar 2–3 tarjetas: `style="grid-template-columns:repeat(N,1fr);max-width:N*230px;margin-inline:auto"` (ajuste de instancia, sin CSS nuevo).

### 4c. Saneamiento de las 9 páginas existentes (integridad)
Tenían 3 puntajes FABRICADOS cada una (4.x copiados de la plantilla, sin fuente) + conteos inventados. Se eliminaron puntajes/estrellas, los conteos se normalizaron a "Reseñas de visitantes"/"Visitor reviews", subtítulo y nota honestos, y se conservaron sus enlaces reales (Google/TripAdvisor/AllTrails + 4ª tarjeta factual UNESCO/Florida SP/NPS con año). También se reemplazó el copy de anunciantes con reclamos de tráfico falsos ("Miles de… visitan esta página cada mes") por el copy honesto del directorio, con `[LUGAR]` por destino. Archivos: everglades, john-pennekamp, biscayne, bill-baggs, oleta-river, virginia-key, matheson-hammock, crandon-park, arch-creek.

### 4d. Integración
- `DESTINO_URLS` += ids 10–17 (main.js). → tarjetas del index de los 8 ahora son `<a href>` crawlable (verificado: 17 enlaces de destino en el index).
- `sitemap.xml`: +8 URLs (total **25**) y todos los `<lastmod>` → **2026-06-03**.

### 4e. Copy honesto de anunciantes (regla 11) — texto canónico
- **Eyebrow:** `{emoji} ¿Tu negocio opera en {LUGAR}?` / `{emoji} Does your business operate in {LUGAR}?`
- **Título:** "El directorio outdoor de Miami para el público hispanohablante" / "Miami's outdoor directory for the Spanish-speaking audience"
- **Desc ES:** "Listamos los mejores destinos de aventura de South Florida en español e inglés. Suma tu negocio — tours, alquileres, escuelas de buceo, guías de pesca — y aparece frente a quienes planean su próxima salida a {LUGAR}."
- **Desc EN:** "We list South Florida's best adventure spots in Spanish and English. Add your business — tours, rentals, dive schools, fishing guides — and show up in front of people planning their next trip to {LUGAR}."

## 5. Verificación hecha
- Validación estructural de las 8 (1 h1, quiz 5 parsea, 0 score fabricado, JSON-LD parsea, todas las imágenes referenciadas existen, relacionados apuntan a archivos existentes). Todo ✓.
- Live smoke test (servidor local): hero/galería/quiz interactivo (clic→feedback)/toggle idioma OK; ratings honestos renderizan 3 tarjetas centradas; index muestra los 17 `<a href>`; everglades muestra ratings sin puntaje + CTA honesto.
- `git push origin main`: `d0f95e8..4996b25  main -> main`, fast-forward, **sin conflictos**.

## 6. Scripts generadores (fuera del repo, en `C:\Users\calil\Downloads\yony-fix_1_files`)
- `gen-destinos.mjs` + `gen-destinos-data.mjs` → generan las 8 páginas desde el esqueleto + objetos de contenido. Re-ejecutar: `cd "C:/Users/calil/Downloads/yony-fix_1_files" && node gen-destinos.mjs` (escribe a rutas absolutas del repo).
- `fix-existentes.mjs` → aplica el saneamiento de ratings + CTA a las 9 existentes (EOL-aware, idempotente).
No están commiteados (intencional, para no contaminar el repo).

## 7. ⚠️ ÚNICO PENDIENTE / dónde se cortó la sesión
El usuario pidió fusionar (hecho) y dejar la rama **`feat/destinos-naturaleza`** como respaldo "hasta verificar en vivo". Luego dijo "todo perfecto procede" → intenté **borrar la rama de respaldo** (local + remota) pero **un clasificador de seguridad lo bloqueó** porque "procede" no levanta de forma inequívoca el límite previo de "no la borres todavía". **No se borró nada; la rama sigue intacta local y remota.**

**Acción para la nueva sesión:** pídele al usuario confirmación EXPLÍCITA y luego ejecuta (si confirma):
```
cd "C:/Users/calil/OneDrive/Documentos/explora-miami"
git branch -d feat/destinos-naturaleza
git push origin --delete feat/destinos-naturaleza
```
Si el clasificador vuelve a bloquear, explica y deja que el usuario decida (no buscar rodeos).

## 8. Cabos sueltos / no incluido a propósito
- **`_bitacora/`** (incluye `AUDITORIA_SEO.md` y este `HANDOFF_LOTE1.md`) está **untracked, sin commitear**. El usuario pidió dejarlo fuera. No subir sin que lo pida.
- **ids 18–21** (Versailles, Joe's Stone Crab, Ball & Chain, Mango's) siguen solo-modal e inindexables → posible "Lote 2" (son `es_editorial:true`, contenido temporal a reemplazar por cliente pagado).
- Los 9 destinos originales aún usan algunas imágenes hotlink de Wikipedia (ver AUDITORIA_SEO.md §8) y existe `hero.jpg` local en cada carpeta. Migración pendiente, baja prioridad.
- Sin `hreflang` en ninguna página (ES/EN en misma URL). Pendiente de estrategia, prioridad media.
- `og:image` del index sigue siendo un placeholder de istock (no branded).

## 9. Preview local (para verificar antes de tocar nada)
```
cd "C:\Users\calil\OneDrive\Documentos\explora-miami"
python -m http.server 8000
```
Abrir `http://localhost:8000/index.html` o directo `http://localhost:8000/destinos/deering-estate.html`. (En la sesión anterior se usó el MCP de preview en el puerto 7830 sirviendo esa misma carpeta; el screenshot del preview se colgaba en páginas con imágenes pesadas, así que se verificó por DOM vía `preview_eval` — útil saberlo.)

---
*Generado al cierre de la sesión del Lote 1. Verdad por encima de adornos: nada de datos/reseñas inventadas, replicar el diseño existente, no CSS nuevo, git por nombre, no borrar/fusionar ramas sin permiso explícito.*
