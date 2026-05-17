# Explora Miami — Plataforma de experiencias outdoor en Miami

## Concepto
Directorio bilingüe (ES/EN) de experiencias outdoor en Miami con panel de administración privado.
- 🏔️ **Tierra** — senderismo, ciclismo, camping
- 🌊 **Mar** — buceo, kayak, snorkeling, paddle board

## Archivos principales
```
explora-miami/
├── index.html          ← sitio público bilingüe
├── admin.html          ← panel de administración (contraseña: miami2026)
├── CLAUDE.md
└── assets/
    ├── css/
    │   ├── styles.css  ← estilos del sitio público
    │   └── admin.css   ← estilos del panel admin
    ├── js/
    │   ├── main.js     ← JS público + datos de destinos (DESTINOS_DEFAULT)
    │   ├── admin.js    ← lógica del panel admin
    │   └── i18n.js     ← sistema de traducción ES/EN
    ├── images/
    └── videos/
        └── *.mp4       ← video hero
```

## Arquitectura de datos
- **Destinos**: `localStorage('em_destinos')` — sembrado desde `DESTINOS_DEFAULT` en `main.js` en la primera visita. Admin lee y escribe en la misma clave.
- **Contactos**: `localStorage('em_contactos')` — array de objetos `{ fecha, nombre, empresa, email, tel, servicio, mensaje }`. Exportable como CSV desde el admin.
- **Sesión admin**: `sessionStorage('em_admin') === 'ok'`
- **Idioma**: `localStorage('em_idioma')` → `'es'` o `'en'`

## Sistema de traducción (i18n)
- **Elementos estáticos**: atributo `data-i18n="clave"` — `aplicarIdioma()` en `i18n.js` actualiza el texto.
- **Placeholders**: atributo `data-i18n-ph="clave"`.
- **Contenido dinámico (tarjetas)**: spans con clase `.lang-es` / `.lang-en` dentro de cada tarjeta. La visibilidad se controla con CSS:
  ```css
  html.lang-en .lang-es { display: none; }
  html.lang-es .lang-en { display: none; }
  ```
- **Prevención de flash**: script inline en `<head>` aplica `html.lang-*` antes del render.

## Paleta de colores — sitio público
| Variable               | Hex       | Uso                        |
|------------------------|-----------|----------------------------|
| `--blanco-arena`       | `#FFFDF7` | Fondo principal            |
| `--azul-cielo-suave`   | `#E3F4FF` | Sección Mar                |
| `--verde-tropical`     | `#E8F5E9` | Sección Tierra             |
| `--coral`              | `#FF6B6B` | Acento, CTAs Tierra        |
| `--turquesa`           | `#00BCD4` | Acento, CTAs Mar           |
| `--mostaza`            | `#FFB300` | Badges, precios            |

Tipografía: **Abril Fatface** (títulos) + **Nunito** (cuerpo) vía Google Fonts.

## Destinos reales (6)
1. Everglades National Park — Senderismo y Kayak
2. John Pennekamp Coral Reef — Buceo y Snorkeling (Key Largo)
3. Biscayne Bay — Kayak y Paddle Board
4. Bill Baggs Cape Florida — Playa y Ciclismo
5. Oleta River State Park — Kayak y Mountain Bike
6. Virginia Key Beach Park — Paddle Board y Natación

## Convenciones
- Clases CSS en español con metodología BEM simplificada
- Variables CSS en `:root`
- Sin frameworks ni librerías externas
- Comentarios en español
- `esc(str)` en admin.js para prevenir XSS en el panel
- `NUNCA` fondos negro sólido — usar gradientes azul oscuro

## GitHub Pages
- Repositorio: `https://github.com/Ytntxnz8py/mi-tienda`
- URL pública: `https://ytntxnz8py.github.io/mi-tienda/`
- Branch: `main`
