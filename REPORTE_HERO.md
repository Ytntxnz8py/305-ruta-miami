# REPORTE_HERO — Foto-Arc Scroll Hero

**Fecha:** 2026-05-19  
**Versión:** 1.0.0  
**Branch:** main

---

## Resumen

Se reemplazó el hero de video por un sistema de 15 tarjetas fotográficas animadas que atraviesan 4 fases coreografiadas (Scatter → Línea → Círculo → Arco), con el arco final conducido por scroll virtual (wheel + touch). El resultado es un hero cinematográfico, sin dependencias externas, que pesa menos que el antiguo video.

---

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `index.html` | Sección `.hero` → `.hero-arc` con nueva estructura HTML |
| `assets/css/styles.css` | Eliminados todos los bloques `.hero__*`, añadido sistema `.hero-arc` completo |
| `assets/js/main.js` | Eliminado parallax de `hero__fondo`, añadida función `initHeroArc()` |
| `assets/js/i18n.js` | Añadidas claves `hero_scroll` (ES: 'Desliza', EN: 'Scroll') |

## Archivos creados

| Archivo | Descripción |
|---------|-------------|
| `assets/images/hero/hero-01.jpg` | Foto propia (foto mar) |
| `assets/images/hero/hero-02.jpg` | Foto propia (IMG_3617) |
| `assets/images/hero/hero-03.png` | AI tropical — ElevenLabs |
| `assets/images/hero/hero-04.png` | AI tropical — ElevenLabs |
| `assets/images/hero/hero-05.png` | AI tropical — ElevenLabs |
| `assets/images/hero/CREDITOS.md` | Licencias de todas las imágenes |
| `REPORTE_HERO.md` | Este documento |

*Imágenes hero-06 a hero-15: URLs directas de Wikimedia Commons CDN (no descargadas localmente para evitar inflar el repo).*

---

## Fases de animación

```
SCATTER  → posiciones aleatorias (basadas en sin/cos del índice)
LÍNEA    → distribución horizontal con wave suave
CÍRCULO  → anillo centrado en viewport
ARCO     → arco inferior, controlado por scrollVirtual (0–2800)
```

La secuencia de intro dura ~5 s:
- 0.08 s — fade-in scatter
- 0.9 s  — transición a línea
- 2.1 s  — transición a círculo
- 3.5 s  — transición a arco (posición de reposo)
- transitions desactivadas tras 4.9 s para que el scroll sea fluido

---

## Efecto shutter en título

Cada letra de "Explora Miami" se envuelve en `.shutter-letra > .shutter-capa`. La animación CSS `@keyframes shutter-up` (translateY 110% → 0) se activa escalonada con `animation-delay = 0.4 + i * 0.045s`. El `aria-label="Explora Miami"` en el `<h1>` garantiza accesibilidad.

---

## Paralax y mouse

- **Mouse**: `mousemove` acumula `mouseX/mouseY` (0–1), aplica rotación extra `±9°` a las tarjetas.
- **Scroll virtual**: `wheel` (passive: false dentro del hero) + `touchmove` incrementan `scrollVirtual` (0–2800). Sin modificar `window.scrollY` — el resto de la página funciona normalmente.
- **RAF**: Todas las actualizaciones de DOM se batchean con `requestAnimationFrame` + flag `rafPendiente`.

---

## Auditoría PASO 5

### Contraste WCAG AA
- Texto del hero sobre el fondo oscuro: ratio ≥ 4.5:1 (fondo `rgba(10,20,30,0.72)` + texto blanco)
- Botones: CTA primario turquesa sobre oscuro: ✅ AA
- `.hero-arc__etiqueta` con `backdrop-filter: blur`: ✅ legible

### Motion / accesibilidad
- `prefers-reduced-motion: reduce` detectado en JS → skip de intro animada, jump directo al arco
- CSS: bloque `@media (prefers-reduced-motion: reduce)` desactiva animaciones de tarjetas, orbs, scroll-pulso y shutter-capa
- `aria-hidden="true"` en `.hero-arc__fondo` y `.hero-arc__fotos` (decorativo)
- `aria-label="Hero principal"` en `<section>`
- `aria-label="Explora Miami"` en `<h1>` (el innerHTML se reemplaza por JS)

### Performance
- Imágenes 1-5 con `loading="eager"` (above-the-fold); 6-15 con `loading="lazy"`
- `decoding="async"` en todas las imágenes
- `will-change: transform, opacity` solo en `.hero-foto-card`
- `transform: translateZ(0)` activa GPU compositing
- Sin librerías externas — JS vanilla ES5, CSS inline

### Mobile
- Tarjetas reducen a 52×74 px en ≤768 px y 44×62 px en ≤480 px
- Scroll virtual funciona con `touchmove` (touch events)
- Contenido posicionado con `z-index: 10` sobre las fotos

### Brandbook
- Colores: `--turquesa`, `--coral`, `--mostaza` de la paleta oficial
- Tipografía: `'Playfair Display' italic` para el h1, `'Inter'` para tagline/etiqueta
- Gradient oscuro de fondo: `#0a141e` → `#071014` (ocean tones)

---

## Estrategia de imágenes remotas

Las 10 imágenes de Wikimedia Commons (hero-06 a hero-15) se sirven directamente desde la CDN de Wikimedia (`upload.wikimedia.org`) en lugar de descargarse localmente. Esto:
1. Mantiene el repo ligero (≈ 3 MB vs ≈ 120 MB)
2. Usa los mismos URLs que ya funcionan en las fotos de destinos del sitio
3. Los archivos están bajo licencias CC0/CC BY/CC BY-SA — atribución en `CREDITOS.md`

---

## Pendiente (post-deploy)

- [ ] Verificar que las 5 imágenes locales cargan correctamente en GitHub Pages
- [ ] Monitorear Core Web Vitals (LCP) — el hero es above-the-fold
- [ ] Considerar convertir hero-03/04/05 a WebP para reducir ~60% de peso
