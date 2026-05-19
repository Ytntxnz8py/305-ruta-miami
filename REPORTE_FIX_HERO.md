# REPORTE_FIX_HERO — Hero-Arc Fix Completo

**Fecha:** 2026-05-19  
**Commit:** 34012d9  
**Branch:** main

---

## PASO 1 — Fotos

### Fotos copiadas de `-hero/` (ya estaban en assets/images/hero/)
| Nombre final | Origen | Tamaño |
|---|---|---|
| hero-01.jpg | foto mar.jpg | 136 KB |
| hero-02.jpg | IMG_3617.JPG | 695 KB |
| hero-03.png | ElevenLabs AI (1) | 2,041 KB |
| hero-04.png | ElevenLabs AI (2) | 2,078 KB |
| hero-05.png | ElevenLabs AI (3) | 1,987 KB |

*Nota: Los 2 archivos `.mp4` de `-hero/` se omitieron — no son imágenes.*

### Fotos descargadas de Wikimedia Commons
| Nombre | URL | Resultado | Tamaño |
|---|---|---|---|
| hero-06.jpg | Everglades_Landscape (49833757502) | ✅ OK | 12,503 KB |
| hero-07.jpg | Gfp-florida-everglades-national-park-landscape | ✅ OK | 1,206 KB |
| hero-08.jpg | Gfp-florida-biscayne-national-park-biscayne-shoreline | ✅ OK | 620 KB |
| hero-09.jpg | Gfp-florida-biscayne-national-park-islandlandscape | ✅ OK | 1,052 KB |
| hero-10.jpg | Bill_Baggs_Cape_Florida_State_Park | ✅ OK | 4,168 KB |
| hero-11.jpg | Cape_Florida_Lighthouse_(5) | ✅ OK | 3,960 KB |
| hero-12.jpg | Matheson_Hammock_Clouds | ✅ OK | 3,310 KB |
| hero-13.jpg | Sunrise_at_Matheson | ✅ OK | 10,244 KB |
| hero-14.jpg | Crandon_Beach | ✅ OK | 1,820 KB |
| hero-15.jpg | North_Miami_FL_Arch_Creek_bridge02 | ✅ OK | 3,130 KB |

**Total descargado:** 10/10 — 0 fallos.  
Verificación: magic bytes JPEG (`FFD8FF`) confirmados en todos los archivos.

### Array HERO_FOTOS final (en `assets/js/main.js`)
```javascript
var HERO_FOTOS = [
  'assets/images/hero/hero-01.jpg',   // Foto propia — mar tropical
  'assets/images/hero/hero-02.jpg',   // Foto propia — IMG_3617
  'assets/images/hero/hero-03.png',   // ElevenLabs AI tropical
  'assets/images/hero/hero-04.png',   // ElevenLabs AI tropical
  'assets/images/hero/hero-05.png',   // ElevenLabs AI tropical
  'assets/images/hero/hero-06.jpg',   // Everglades Landscape
  'assets/images/hero/hero-07.jpg',   // Everglades — alligators & heron
  'assets/images/hero/hero-08.jpg',   // Biscayne National Park shoreline
  'assets/images/hero/hero-09.jpg',   // Biscayne National Park island
  'assets/images/hero/hero-10.jpg',   // Bill Baggs Cape Florida SP
  'assets/images/hero/hero-11.jpg',   // Cape Florida Lighthouse
  'assets/images/hero/hero-12.jpg',   // Matheson Hammock Clouds
  'assets/images/hero/hero-13.jpg',   // Sunrise at Matheson
  'assets/images/hero/hero-14.jpg',   // Crandon Beach
  'assets/images/hero/hero-15.jpg'    // North Miami — Arch Creek
];
```

---

## PASO 2 — Performance: Animación Fluida

### Cambios aplicados

| Fix | Descripción |
|---|---|
| `transition` en `.hero-foto-card` | Eliminadas `transform 0.7s` y `opacity 0.5s`. Solo queda `box-shadow 0.2s ease` para hover. |
| `initHeroArc()` reescrita | RAF continuo con `requestAnimationFrame(loop)` + lerp suavizado. |
| Suavizado dual | `SUAVIZADO_INTRO = 0.12` (lento, cinematográfico), `SUAVIZADO_SCROLL = 0.28` (rápido, responsivo). |
| `posScatter` precomputado | Posiciones de scatter calculadas una vez al inicio, no en cada frame. |
| `estadoActual[]` per-card | Cada card mantiene su estado actual para lerp correcto. |
| `hayMovimiento` flag | El loop RAF se auto-detiene cuando dx/dy < 0.3px — cero trabajo cuando está quieto. |
| Scroll check con `getBoundingClientRect()` | `wheel` solo intercepta cuando `rect.top <= 0 && rect.bottom >= innerHeight * 0.3` — el scroll de la página pasa libremente cuando el hero no está activo. |
| `img.onerror` fallback | Si una imagen falla, carga `hero-01.jpg` como fallback. |

---

## PASO 3 — Fixes CSS

| Fix | Antes | Después |
|---|---|---|
| Título `font-size` | `clamp(3.2rem, 10vw, 8rem)` | `clamp(2.2rem, 6vw, 4.8rem)` |
| `.hero-arc__contenido` | `background: rgba(7,30,43,0.30)`, `blur(3px)`, `border-radius: 24px` | `background: transparent`, sin blur, sin radius |
| `.shutter-capa` `text-shadow` | ninguna | `0 2px 24px rgba(0,0,0,0.65), 0 1px 6px rgba(0,0,0,0.45)` |
| `.hero-arc__tagline` `text-shadow` | ninguna | `0 1px 14px rgba(0,0,0,0.55)` |
| `.hero-foto-card` GPU | `transform-style: preserve-3d` | `transform: translateZ(0)`, `backface-visibility: hidden` |

---

## Secuencia de intro (tiempos)

```
0 ms    — Cards en scatter, opacity 0
300 ms  — Scatter visible (lerp opacity → 1)
500 ms  — Inicio shutter título (letra a letra, delay 0.048s/letra)
1,200 ms — → Fase LÍNEA (lerp suavizado 0.12)
2,800 ms — → Fase CÍRCULO (lerp suavizado 0.12)
4,500 ms — introHecho = true → suavizado cambia a 0.28
```

**Total intro:** ~4.5 segundos. El arco se forma al hacer scroll (fase circle → arc).

---

## Comportamiento del scroll

- **Durante intro** (`introHecho === false`): wheel no bloqueado — la página scrollea normal.
- **Después del intro, hero visible** (`rect.top <= 0 && rect.bottom >= 30% viewport`): wheel mueve `scrollVirtual` (0–2800), animando de círculo a arco.
- **Cuando scrollVirtual llega a MAX_SCROLL**: el wheel pasa al scroll nativo de la página.
- **Touch**: `touchmove` en la sección, misma lógica.

---

*Generado: 2026-05-19 | Commit: 34012d9*
