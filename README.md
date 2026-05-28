# Explora Miami

Directorio bilingüe (ES/EN) de experiencias outdoor en Miami y South Florida.

🌐 **Sitio live:** [ytntxnz8py.github.io/mi-tienda](https://ytntxnz8py.github.io/mi-tienda/)

---

## Qué es

Guía curada de destinos naturales en Miami: Everglades, buceo en Key Largo, kayak en Biscayne Bay, senderismo, playa y más. Diseñado para turistas hispanos y residentes que buscan actividades outdoor en South Florida.

Modelo de negocio: directorio de listings para empresas de turismo outdoor + afiliados + servicios web.

---

## Stack técnico

| Capa | Decisión |
|---|---|
| Lenguaje | HTML5 + CSS3 + JavaScript ES5 puro |
| Frameworks | Ninguno — vanilla todo |
| Build step | Ninguno — deploy directo |
| Hosting | GitHub Pages (rama `main`) |
| Fuentes | Playfair Display · Cormorant Garamond · Inter via Google Fonts |
| i18n | Bilingüe ES/EN — toggle en navbar, estado en `localStorage` |

---

## Estructura

```
explora-miami/
├── index.html              # Landing principal
├── anunciantes.html        # Para empresas (B2B)
├── blog.html               # Hub de artículos
├── aventura.html           # Próximamente
├── comida.html             # Próximamente
├── admin.html              # Panel de administración (protegido)
├── privacidad.html
├── terminos.html
├── sitemap.xml
├── robots.txt
├── HANDOFF.md              # ⭐ Documentación completa del proyecto
│
├── destinos/               # 9 páginas individuales de destino
├── blog/                   # 3 artículos
│
└── assets/
    ├── css/                # styles.css + módulos por componente
    ├── js/                 # main.js + módulos por componente
    └── images/
```

> **Nota:** `preview-imagenes.html` es una herramienta de desarrollo interna para revisar imágenes del proyecto. No forma parte del sitio público.

---

## Reglas críticas de CSS

- `overflow-x: hidden` **SOLO** en `<html>`, nunca en `<body>` — rompe `position: sticky`
- Sin `#000` ni `#fff` puros — usar siempre la paleta de variables del proyecto
- `prefers-reduced-motion` en todos los `transform` y `animation`

---

## Deploy

```bash
# Guardar y publicar
git add [archivos específicos]
git commit -m "tipo(sección): descripción del cambio"
git push origin main
# GitHub Pages despliega automáticamente en ~30 segundos
```

```bash
# NUNCA usar — riesgo de exponer archivos privados
git add -A
git add .
```

---

## Documentación completa

Ver `HANDOFF.md` para arquitectura completa, paleta de colores, componentes del sistema de diseño, datos de destinos, convenciones de código y próximos pasos.

---

Hecho con entusiasmo en Miami · 2026
