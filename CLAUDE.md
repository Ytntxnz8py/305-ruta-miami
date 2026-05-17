# mi-tienda — Tienda de Aventura Outdoor

Tienda online de equipamiento outdoor dividida en **dos mundos**:
- 🏔️ **Tierra** — senderismo, escalada, camping
- 🌊 **Mar** — buceo, kayak, snorkeling

## Tecnologías

- HTML5, CSS3, JavaScript vanilla — sin frameworks ni dependencias externas
- Servidor de desarrollo: `npx serve -l 3456 .` (configurado en `.claude/launch.json`)
- Comentarios en español en todo el código

## Estructura de carpetas

```
mi-tienda/
├── index.html          — página única (single-page)
├── css/
│   └── styles.css      — todos los estilos (mobile-first)
├── js/
│   └── main.js         — toda la lógica interactiva
├── image/              — imágenes de productos y fondos (iStock, 612×612 jpg)
├── video/
│   └── hero-tierra.mp4.mp4 — vídeo de fondo del hero (autoplay, mute, loop)
└── .claude/
    └── launch.json     — configuración del servidor de desarrollo
```

> **Nota:** la carpeta de imágenes se llama `image/` (singular), no `images/`.

## Paleta de colores

Todas las variables están en `:root` dentro de `css/styles.css`.

| Variable         | Hex / Valor                   | Uso                                  |
|------------------|-------------------------------|--------------------------------------|
| `--verde-oscuro` | `#1a2e1a`                     | Fondo mundo Tierra, banner tierra     |
| `--azul-marino`  | `#0d1b2a`                     | Fondo mundo Mar, banner mar           |
| `--naranja`      | `#e8521a`                     | CTA principal, flip-cards Mar        |
| `--amarillo`     | `#f5a623`                     | Acento secundario, precios, Tierra   |
| `--blanco`       | `#f0ede8`                     | Texto principal                       |
| `--gris-oscuro`  | `#111111`                     | Fondo body, sección mundos            |
| `--sombra`       | `0 4px 20px rgba(0,0,0,0.4)` | Sombra en botones al hacer hover      |
| `--radio`        | `8px`                         | Border-radius global                  |
| `--transicion`   | `0.35s ease`                  | Transición CSS global                 |
| `--fuente`       | `'Segoe UI', system-ui, sans-serif` | Fuente del body               |

Color adicional no variable: `#5bc8e8` (azul claro) para títulos y tags del mundo Mar.

## Secciones HTML (`index.html`)

| Sección         | ID / clase        | Descripción                                      |
|-----------------|-------------------|--------------------------------------------------|
| Header fijo     | `.header`         | Logo, nav hamburguesa, contador carrito          |
| Hero            | `#inicio`         | Vídeo de fondo, texto typewriter, CTA            |
| Dos Mundos      | `#mundos`         | Tarjetas clicables Tierra / Mar                  |
| Productos       | `#productos`      | Grid de flip-cards con filtros                   |
| Banner mundos   | `.banner-mundos`  | Dos paneles con gradiente de transición          |
| Footer          | `#contacto`       | Logo, navegación, datos de contacto              |

## Lógica JavaScript (`js/main.js`)

Todos los módulos están en un único archivo sin clases ni módulos ES. Flujo lineal:

1. **Menú hamburguesa** — toggle de clase `abierto` en `#nav` y `#menuBtn`; cierra al hacer clic en cualquier enlace.
2. **Typewriter** — cicla 5 frases con `setTimeout` recursivo. Velocidades: escribir 70 ms/char, borrar 35 ms/char, pausa final 2000 ms. Arranca 1400 ms después de la carga.
3. **Filtros de productos** — botones `.filtros__btn[data-filtro]` añaden/quitan clase `oculto` en `.flip-card[data-mundo]`. Aplica animación `subir 0.4s` al mostrar (force-reflow con `offsetHeight`).
4. **Carrito** — contador `#contadorCarrito` en memoria (`cantidadCarrito`). Delegación de eventos en `document` para `.btn-carrito`. Muestra notificación emergente con clase `visible`.
5. **Scroll del navbar** — `window.scroll` (passive) añade `.header--scrolled` cuando `scrollY > 60`.
6. **Flecha hero** — `#flechaHero` hace scroll suave a `#mundos`.
7. **Tarjetas de mundo** — `.mundo-card[data-mundo]` activa el botón de filtro correspondiente y hace scroll a `#productos`.

## CSS — Arquitectura (`css/styles.css`)

### Metodología
BEM simplificado en español. Ejemplos:
- Bloque: `.flip-card`
- Elemento: `.flip-card__frente`, `.flip-card__reverso`, `.flip-card__imagen`
- Modificador: `.flip-card--tierra`, `.flip-card--mar`

### Animaciones (@keyframes)
| Nombre            | Efecto                                         |
|-------------------|------------------------------------------------|
| `subir`           | `opacity 0→1` + `translateY(30px→0)` — entradas del hero |
| `cursorParpadeo`  | `opacity 1→0→1` en 0.7 s — cursor typewriter  |
| `rebotar`         | `translateY(0→10px)` en 2 s — flecha del hero |

### Flip cards 3D
- `perspective: 1000px` en `.flip-card`, `transform-style: preserve-3d` en `.flip-card__inner`
- Hover: `rotateY(180deg)` en `.flip-card__inner` vía transición `0.65s cubic-bezier(0.4,0,0.2,1)`
- Reverso parte con `rotateY(180deg)` y `backface-visibility: hidden`
- Tierra: reverso con gradiente verde oscuro y borde amarillo semitransparente
- Mar: reverso con gradiente azul marino y borde azul claro semitransparente

### Responsive (mobile-first)
| Breakpoint | Cambios principales                                                     |
|-----------|-------------------------------------------------------------------------|
| Base       | 1 columna en todos los grids, menú hamburguesa visible                  |
| `≥768px`   | Nav horizontal, 2 col mundos, 2 col productos, banner lado a lado       |
| `≥1024px`  | 3 col productos, flip-card altura 400 px, imagen 230 px                 |
| `≥1200px`  | 4 col productos                                                          |

## Catálogo de productos

8 productos, definidos directamente en el HTML como artículos `<article class="flip-card">`:

| Producto                      | Mundo  | Precio  | Botón CTA       |
|-------------------------------|--------|---------|-----------------|
| Mochila Senderismo Pro 65L    | Tierra | $189.00 | `.btn--amarillo` |
| Kit Escalada Vertical         | Tierra | $340.00 | `.btn--amarillo` |
| Carpa Expedición 4 Estaciones | Tierra | $275.00 | `.btn--amarillo` |
| Bastones Trekking Carbono     | Tierra | $120.00 | `.btn--amarillo` |
| Equipo Buceo Profesional      | Mar    | $520.00 | `.btn--naranja`  |
| Kayak Inflable Explorer       | Mar    | $430.00 | `.btn--naranja`  |
| Set Snorkeling Coral          | Mar    | $95.00  | `.btn--naranja`  |
| Tabla Paddle Surf Inflable    | Mar    | $380.00 | `.btn--naranja`  |

Cada artículo lleva `data-mundo="tierra|mar"` y `data-nombre="Nombre del producto"` en el botón de carrito.

## Convenciones para modificaciones

- **Añadir un producto**: copiar un `<article class="flip-card flip-card--{mundo}">` existente en `index.html`. Añadir imagen a `image/`. Usar `.btn--amarillo` para Tierra, `.btn--naranja` para Mar.
- **Añadir una frase al typewriter**: agregar el string al array `frases` en `js/main.js:28`.
- **Nuevos estilos**: agregar variables a `:root`; respetar la escala de z-index (header 1000, menú 1100, notificación 2000).
- **No usar JavaScript externo** ni librerías CSS; todo el JS va en `main.js`.
- **No crear archivos HTML adicionales**; es un sitio single-page con anclas.
- Escribir comentarios en español, siguiendo el estilo de bloques `/* ===== SECCIÓN ===== */`.

## Flujo de desarrollo

```bash
# Iniciar servidor local en http://localhost:3456
npx serve -l 3456 .
```

El servidor está preconfigurado en `.claude/launch.json` y Claude Code lo arranca automáticamente.

No hay proceso de build, bundling, linting ni tests. Los cambios se reflejan al recargar el navegador.
