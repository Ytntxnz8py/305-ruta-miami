# REPORTE — Admin v2.0: Centro de Comando
**Explora Miami · Fecha:** 2026-05-19

---

## Resumen ejecutivo

El panel de administración ha sido completamente rediseñado de v1 (single-page scroll) a v2.0 (5-tab sidebar). El nuevo admin incluye arquitectura robusta con seguridad mejorada, gráficos SVG, editor de sitio con preview en vivo, y soporte para datos reales de Google Analytics 4 a través de un proxy proxy.

---

## Archivos creados / modificados

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `.gitignore` | ✅ Creado | Protege `_privado/` y archivos sensibles de GitHub |
| `_privado/admin-secret.txt` | ✅ Creado | Contraseña en texto plano (solo local, nunca sube) |
| `_privado/gas-proxy.js` | ✅ Creado | Código Google Apps Script para proxy GA4 |
| `_privado/SETUP_GAS.md` | ✅ Creado | Guía paso a paso para desplegar el proxy |
| `assets/js/admin-config.js` | ✅ Creado | Config pública (GA4 ID, proxy URL, versión) |
| `admin.html` | ✅ Reescrito | 5 tabs + sidebar 260px + slide panel CRUD |
| `assets/css/admin.css` | ✅ Ampliado | +700 líneas: sidebar, tabs, charts, slide panel, editor |
| `assets/js/admin.js` | ✅ Reescrito | 5-tab logic, GA4, SVG charts, seguridad, CRUD completo |
| `assets/js/main.js` | ✅ Modificado | Añadido `leerConfigSitio()` |
| `assets/js/i18n.js` | ✅ Modificado | Añadido soporte de overrides desde `em_config_sitio` |

---

## Arquitectura del panel (5 tabs)

### 📊 Dashboard
- 6 tarjetas de métricas (visitas hoy/semana/mes, clics, formularios, destinos activos)
- **Gráfico SVG de líneas** — 30 días de pageviews con área bajo la curva
- **Gráfico SVG donut** — distribución de dispositivos (móvil/desktop/tablet)
- Tabla de clics por destino con barras proporcionales
- Fuente de datos: localStorage (demo) o GA4 real si el proxy está configurado

### 📍 Destinos
- Tabla completa con toggle activo/inactivo
- **Slide panel lateral** (420px) para CRUD de destinos
- Formulario completo: nombre ES/EN, descripción ES/EN, foto, coordenadas, dificultad, precio, horarios, tipo, web oficial
- Conserva campos avanzados al editar (galería, reseñas, cómo llegar)
- Badge en sidebar indica cuántos destinos están inactivos

### ✏️ Editor sitio
- Campos editables: título hero, tagline, subtítulo intro, sección destinos, color de acento, email, teléfono
- Config guardada en `localStorage.em_config_sitio`
- **Preview iframe** en tiempo real del sitio `index.html`
- Restaurar defaults con un clic

### ✉️ Mensajes
- Bandeja con tarjetas (avatar, nombre, empresa, servicio, email, tel, mensaje)
- Badge en sidebar pulsa coral cuando hay mensajes no leídos
- Exportar CSV completo con un clic
- Marca automáticamente como leídos al abrir el tab

### ⚙️ Configuración
- Guía de activación GA4 (proxy GAS) — solo visible post-login, nunca antes
- Panel de seguridad con conteo de intentos fallidos de login
- Info del sistema (versión, GA4 ID, estado proxy, counts de datos)
- Botón para limpiar datos demo

---

## Seguridad implementada

| Medida | Implementación |
|--------|----------------|
| Sin hint de contraseña en HTML | Eliminada la línea `<p class="login-hint">` |
| Sin contraseña en comentarios JS | Header de admin.js sin revelar el valor |
| Límite de intentos | 5 intentos → bloqueo via `sessionStorage` |
| Log de accesos | Éxitos y fallos guardados en `localStorage.em_log_accesos` |
| `_privado/` protegido | `.gitignore` excluye la carpeta completa |
| Guía GA4 post-login | Solo visible dentro del tab Configuración |
| `esc()` en todo HTML dinámico | Prevención de XSS en todas las salidas |
| Secret en proxy GAS | Parámetro `?secret=` verifica todas las requests |

---

## Integración GA4 con proxy

```
sitio estático (GitHub Pages)
        │
        │  XHR: GET /exec?report=pageviews30d&secret=...
        ▼
Google Apps Script Web App  (_privado/gas-proxy.js)
        │
        │  AnalyticsData.Properties.runReport(...)
        ▼
GA4 Data API (Property 538163810)
        │
        ▼
JSON response → SVG charts en Dashboard
```

**Para activar:** seguir `_privado/SETUP_GAS.md` y actualizar `GAS_PROXY_URL` en `admin-config.js`.

---

## Editor de sitio — flujo de datos

```
admin (tab Editor) → guarda em_config_sitio en localStorage
        │
        ▼
i18n.js (IIFE al cargar) → lee em_config_sitio → inyecta en TEXTOS[]
        │
        ▼
main.js (leerConfigSitio) → re-aplica aplicarIdioma() + actualiza CSS vars
        │
        ▼
DOM actualizado con textos personalizados + color de acento
```

---

## Responsive

| Breakpoint | Comportamiento |
|------------|----------------|
| ≥ 861px | Sidebar siempre visible (260px), header solo muestra fecha |
| ≤ 860px | Sidebar es drawer flotante, hamburger en header |
| ≤ 480px | Slide panel ocupa 100vw, métricas en 2 columnas |

---

## Pendiente (fuera del scope v2.0)

- [ ] Edición de galería de imágenes por destino (requiere UI adicional)
- [ ] Edición de reseñas por destino
- [ ] Soporte multi-idioma para campos del editor de sitio (EN)
- [ ] Autenticación más robusta (requiere backend o Netlify Identity)
