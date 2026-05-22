# REPORTE_MAPA — Sección Mapa Rediseñada

**Fecha:** 2026-05-19  
**Commit:** 4719f81  
**Branch:** main

---

## Resumen

Se reemplazó el iframe de Google Maps (que requería API key y limitaba interacción) por un layout de dos columnas:

- **Columna izquierda:** Globo 3D interactivo sobre `<canvas>` — sin librerías, puro Canvas 2D con matrices de rotación
- **Columna derecha:** Mapa Leaflet.js con tiles CartoDB Positron (sin API key) — 9 destinos principales + 20 referencias

---

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `index.html` | Reemplaza toda la `<section class="seccion-mapa">` con nueva estructura HTML |
| `assets/css/styles.css` | Nuevo bloque ~150 líneas: `.mapa-grid`, `.mapa-globo-wrap`, `.mapa-leaflet-wrap`, chips, leyenda, Leaflet overrides |
| `assets/js/main.js` | Añade `initGlobo()`, `initReferenciasGlobo()`, `initMapaLeaflet()`; actualiza `DOMContentLoaded` |
| `assets/js/i18n.js` | Nuevas claves: `mapa_sub` (actualizada) y `mapa_globo_label` en ES y EN |

---

## Globo 3D Canvas

### Técnica de renderizado

```
latLng → coordenadas esféricas (x0, y0, z0)
       → rotación horizontal phi (eje Y)
       → rotación vertical theta (eje X)
       → proyección ortográfica a canvas 2D
```

Función clave: `latLngTo3D(lat, lng, phiR, thetaR, radio)` devuelve `{x, y, visible}`.

### Features del globo

| Feature | Detalle |
|---------|---------|
| Rotación automática | `phi += 0.003` por frame |
| Drag interactivo | `pointerdown/move/up` con `setPointerCapture` |
| Grid lat/lng | Líneas cada 20° — solo puntos visibles (cara frontal) |
| Arcos animados | 4 arcos desde Miami → destinos; elevación con `Math.sin` |
| 8 marcadores | Miami (amarillo), Everglades/Oleta/Downtown (distintos colores) |
| Brillo especular | `RadialGradient` desplazado arriba-izquierda |
| IntersectionObserver | Detiene RAF cuando el canvas no está en viewport |
| `prefers-reduced-motion` | Sin rotación automática; globo estático |

### Marcadores en el globo

| Lugar | Lat | Lng | Color | Radio |
|-------|-----|-----|-------|-------|
| Miami | 25.77 | -80.19 | turquesa | 5 |
| Everglades | 25.28 | -80.89 | coral | 4 |
| Key Largo | 25.12 | -80.40 | turquesa | 4 |
| Biscayne | 25.47 | -80.33 | turquesa | 4 |
| Bill Baggs | 25.66 | -80.15 | turquesa | 3 |
| Oleta River | 25.91 | -80.13 | coral | 3 |
| Virginia Key | 25.73 | -80.15 | turquesa | 3 |
| Downtown Miami | 25.76 | -80.19 | mostaza | 6 |

---

## Mapa Leaflet.js

### Configuración

```javascript
L.map('mapaLeaflet', {
  center: [25.75, -80.30],
  zoom: 10,
  scrollWheelZoom: false   // no bloquea scroll de página
})
```

Tiles: `CartoDB Positron` — estilo claro, minimalista, sin API key.

### Destinos principales (9 marcadores grandes, 14px)

| Destino | Tipo | Color |
|---------|------|-------|
| Everglades National Park | tierra | coral |
| John Pennekamp Coral Reef | mar | turquesa |
| Biscayne National Park | mar | turquesa |
| Bill Baggs Cape Florida | mar | turquesa |
| Oleta River State Park | tierra | coral |
| Virginia Key Beach Park | mar | turquesa |
| Matheson Hammock Park | mar | turquesa |
| Crandon Park | mar | turquesa |
| Arch Creek Park | tierra | coral |

### Referencias (20 marcadores pequeños, 8px)

Downtown Miami, Wynwood, Miami Beach, South Beach, Coral Gables, Hialeah, Miramar, Homestead, Shark Valley, Florida City, Aventura, Hollywood Beach, Coconut Grove, South Miami, Cutler Bay, Doral, Medley Wetlands, Big Cypress, Anhinga Trail, Key Biscayne.

---

## Chips de Referencias (22 chips bajo el globo)

5 categorías con colores diferenciados:

| Categoría | Color | Ejemplos |
|-----------|-------|---------|
| `--playa` | turquesa | South Beach, Virginia Key, Hollywood Beach |
| `--parque` | verde | Big Cypress, Matheson Hammock, Crandon Park |
| `--cultura` | mostaza | Wynwood, Coconut Grove, Little Havana |
| `--aventura` | coral | Everglades, Shark Valley, Homestead |
| `--agua` | azul claro | Biscayne Bay, Oleta River, Florida Keys |

---

## CSS — Estructura responsive

```
Desktop (>900px): grid 1fr 1fr
Mobile (≤900px):  grid 1fr (globo arriba, mapa abajo)
```

Leaflet height: 480px → 360px en ≤768px.

---

## i18n — Claves nuevas/actualizadas

| Clave | ES | EN |
|-------|----|----|
| `mapa_titulo` | Mapa de Destinos | Destinations Map |
| `mapa_sub` | Descubre experiencias outdoor en Miami y South Florida | Discover outdoor experiences in Miami and South Florida |
| `mapa_globo_label` | Miami · South Florida | Miami · South Florida |

---

## Auditoría PASO 9

### Performance
- `scrollWheelZoom: false` — Leaflet no bloquea scroll de página
- IntersectionObserver en globo — RAF se detiene fuera de viewport
- `window.addEventListener('load', initMapaLeaflet)` — Leaflet carga después de DOMContentLoaded
- SRI integrity en Leaflet CSS y JS (`sha256-...`)

### Accesibilidad (WCAG AA)
- `role="img"` + `aria-label` en `<canvas>`
- `aria-label` en `<div id="mapaLeaflet">`
- Leyenda visual con texto (no solo color)
- `prefers-reduced-motion`: globo estático + CSS `animation: none`

### Responsive
- Grid 1fr/1fr → 1fr en ≤900px
- Globo: `aspect-ratio: 1/1` — cuadrado adaptable
- Leaflet: 480px → 360px mobile

### Brandbook
- Paleta: `--turquesa`, `--coral`, `--mostaza` — colores oficiales
- Tipografía: Playfair Display italic en popups de destinos
- Fondo globo: gradiente `--ocean-ini` → `--ocean-mid`
- Fondo sección: `--azul-cielo-suave`

### Seguridad
- Sin API key expuesta en HTML (CartoDB Positron es gratuito sin key)
- `innerHTML` en `bindPopup`: sin datos de usuario, solo strings literales hardcoded
- Leaflet cargado con `integrity` + `crossorigin="anonymous"` (SRI)

---

## Sin dependencias nuevas

| Librería | Versión | Carga | Key requerida |
|----------|---------|-------|---------------|
| Leaflet.js | 1.9.4 | CDN unpkg + SRI | ❌ No |
| Globe Canvas | — | Inline vanilla JS | ❌ No |

---

*Generado: 2026-05-19 | Commit: 4719f81*
