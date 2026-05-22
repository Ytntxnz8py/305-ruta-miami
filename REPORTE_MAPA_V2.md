# REPORTE_MAPA_V2 — Globo cobe.js + Leaflet OSM

**Fecha:** 2026-05-19  
**Commit:** 2d4f8ca  
**Branch:** main

---

## Cambios respecto a v1

| Componente | v1 (anterior) | v2 (actual) |
|---|---|---|
| Globo | Canvas vanilla — solo un punto amarillo visible | **cobe.js 0.6.3** — globo blanco punteado |
| Tiles Leaflet | CartoDB Positron (fallaba en Pages) | **tile.openstreetmap.org** — siempre disponible |
| Marcadores globo | Dibujados manualmente con Canvas 2D | Decorativo — `markers: []`, `arcs: []` |
| Fondo columna globo | Dark ocean `#071e2b` | Claro `#f8f9ff → #eef2ff` |
| Chips referencias | Colores claros sobre fondo oscuro | Colores oscuros sobre fondo claro |

---

## Globo cobe.js

### CDN cargado

```html
<script src="https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/cobe.umd.js"></script>
```

Posición: antes de `leaflet.js` y `main.js` en `<body>`. `createGlobe` está disponible cuando `initGlobo()` se llama.

### Configuración final

```javascript
createGlobe(canvas, {
  dark:           0.05,       // casi blanco
  diffuse:        1.5,        // luz difusa alta
  mapSamples:     16000,      // puntos del mapa mundial
  mapBrightness:  8,          // brillo de los puntos
  baseColor:      [0.98, 0.98, 1.0],   // blanco azulado
  markerColor:    [0.30, 0.55, 0.95],  // azul medio
  glowColor:      [0.94, 0.93, 0.91],  // halo cálido
  markers:        [],   // decorativo — sin pins
  arcs:           [],   // decorativo — sin conexiones
  opacity:        0.7
})
```

### Interactividad

| Feature | Implementación |
|---|---|
| Rotación automática | `phi += 0.003` en `onRender` |
| Drag | `pointerdown/move/up` con `setPointerCapture` |
| Pause en drag | `isPaused = true` durante el drag |
| Fade in | `canvas.style.opacity = '1'` a los 100ms |
| Resize | `ResizeObserver` llama `globo.resize()` |
| Fuera de viewport | `IntersectionObserver` → `isPaused = true` |
| Reduced motion | `if (!reducedMotion) phi += 0.003` |

### CSS del globo

```css
/* Fondo claro — el globo es blanco */
.mapa-globo-wrap {
  background: linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%) !important;
}

/* Fade-in al cargar */
.mapa-globo-canvas {
  opacity: 0;
  transition: opacity 1.2s ease;
  background: transparent;
}
```

---

## Mapa Leaflet

### Tiles corregidos

```javascript
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
})
```

**Por qué OSM:** CartoDB Positron a veces bloquea requests desde GitHub Pages con `Referrer-Policy` restrictiva. `tile.openstreetmap.org` es completamente abierto y no requiere API key.

### Fix de tiles en blanco (`invalidateSize`)

El mapa Leaflet aparecía en blanco porque el contenedor aún no tenía dimensiones CSS cuando `initMapaLeaflet()` se ejecutaba. Solución:

```javascript
// Después de crear el mapa
setTimeout(function() { mapa.invalidateSize(); }, 300);

// También al hacer scroll hacia la sección
new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) {
    setTimeout(function() { mapa.invalidateSize(); }, 100);
  }
}, { threshold: 0.1 }).observe(contenedorMapa);
```

### Retry si Leaflet no cargó

```javascript
if (typeof L === 'undefined') {
  setTimeout(initMapaLeaflet, 500);
  return;
}
```

### Destruir instancia previa (evita duplicados)

```javascript
if (contenedorMapa._leaflet_id) {
  contenedorMapa._leaflet_id = null;
  contenedorMapa.innerHTML   = '';
}
```

---

## Destinos en Leaflet

### 9 destinos principales (marcadores 16px)

| Destino | Tipo | Color |
|---|---|---|
| Everglades National Park | tierra | coral `#FF6B6B` |
| John Pennekamp Coral Reef | mar | turquesa `#00BCD4` |
| Biscayne National Park | mar | turquesa `#00BCD4` |
| Bill Baggs Cape Florida | mar | turquesa `#00BCD4` |
| Oleta River State Park | tierra | coral `#FF6B6B` |
| Virginia Key Beach Park | mar | turquesa `#00BCD4` |
| Matheson Hammock Park | mar | turquesa `#00BCD4` |
| Crandon Park | mar | turquesa `#00BCD4` |
| Arch Creek Park | tierra | coral `#FF6B6B` |

Popup: nombre en Playfair Display italic + descripción de actividades bilingüe.

### 20 referencias (marcadores 9px)

Downtown Miami, Wynwood, Miami Beach, South Beach, Coral Gables, Hialeah, Homestead, Shark Valley, Florida City, Aventura, Hollywood Beach, Coconut Grove, South Miami, Cutler Bay, Doral, Medley Wetlands, Big Cypress, Anhinga Trail, Key Biscayne, Little Havana.

---

## Auditoría PASO 7

| Check | Estado | Notas |
|---|---|---|
| cobe.js CDN cargado antes de main.js | ✅ | pos 23469 vs main.js 23803 |
| canvas opacity:0 → 1 en 100ms | ✅ | CSS + JS setTimeout |
| Fondo globo claro (#f8f9ff) | ✅ | NO oscuro |
| Tiles OSM sin API key | ✅ | tile.openstreetmap.org |
| mapa.invalidateSize() en 300ms | ✅ | + IntersectionObserver |
| Destinos 16px | ✅ | crearIcono(color, 16, 3) |
| Referencias 9px | ✅ | crearIcono(color, 9, 1.5) |
| scrollWheelZoom: false | ✅ | No bloquea scroll de página |
| markers:[] arcs:[] (decorativo) | ✅ | Globo limpio |
| prefers-reduced-motion | ✅ | Sin rotación automática |

---

## Pendiente

- [ ] Verificar visualmente en GitHub Pages que los tiles OSM cargan  
- [ ] Confirmar que el globo cobe.js aparece blanco y punteado  
- [ ] Si CartoDB funciona en el futuro, considerar volver a usarlo para el estilo visual más limpio  

---

*Generado: 2026-05-19 | Commit: 2d4f8ca*
