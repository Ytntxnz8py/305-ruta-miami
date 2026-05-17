# Explora Miami — directorio de experiencias outdoor en Miami

## Concepto
Directorio de experiencias outdoor en Miami dividido en **dos mundos**:
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
- **Mobile-first**: base para móvil, breakpoints en 768px, 1024px y 1200px
- **Hero**: video de fondo con texto animado (typewriter) y efecto parallax
- **Navbar**: transparente al inicio, sólido oscuro con blur al hacer scroll
- **Tarjetas de actividad**: efecto 3D hover + animación de entrada con IntersectionObserver
- **Tarjetas de producto**: efecto flip 3D en hover (CSS transform)
- **Filtros**: botones para mostrar Todos / Tierra / Mar
- **Transición gradiente**: franja visual entre sección Tierra y sección Mar

## Estructura de carpetas
```
explora-miami/
├── index.html
├── CLAUDE.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    ├── images/
    │   └── *.jpg
    └── videos/
        └── hero-tierra.mp4.mp4
```

## Convenciones
- Clases CSS en español con metodología BEM simplificada
- Variables CSS definidas en `:root`
- Animaciones declaradas en `@keyframes`
- Todo el JS en `main.js`, sin librerías
