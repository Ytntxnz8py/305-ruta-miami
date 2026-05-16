# mi-tienda — Tienda de Aventura Outdoor

## Concepto
Tienda online de equipamiento outdoor dividida en **dos mundos**:
- 🏔️ **Tierra** — senderismo, escalada, camping
- 🌊 **Mar** — buceo, kayak, snorkeling

## Tecnologías
- HTML5, CSS3, JavaScript vanilla
- Sin frameworks ni dependencias externas
- Comentarios en español

## Paleta de colores
| Variable          | Hex       | Uso                        |
|-------------------|-----------|----------------------------|
| `--verde-oscuro`  | `#1a2e1a` | Fondo mundo Tierra, header |
| `--azul-marino`   | `#0d1b2a` | Fondo mundo Mar            |
| `--naranja`       | `#e8521a` | Acento principal, CTAs     |
| `--amarillo`      | `#f5a623` | Acento secundario, precios |
| `--blanco`        | `#f0ede8` | Texto principal, fondos    |

## Diseño
- **Mobile-first**: base para móvil, breakpoints en 768px y 1024px
- **Hero**: imagen/degradado de montaña con texto animado (typewriter)
- **Tarjetas de producto**: efecto flip 3D en hover (CSS transform)
- **Filtros**: botones para mostrar Todos / Tierra / Mar

## Estructura de carpetas
```
mi-tienda/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
└── CLAUDE.md
```

## Convenciones
- Clases CSS en español con metodología BEM simplificada
- Variables CSS definidas en `:root`
- Animaciones declaradas en `@keyframes`
- Todo el JS en `main.js`, sin librerías
