# AUDITORÍA "LISTO PARA MERCADO" — 305 Ruta Miami
> Solo lectura. Fecha: 2026-06-07. Sitio en vivo: https://305rutamiami.com
> Objetivo: ¿qué está roto o falta para que el producto sea **vendible y creíble** antes de salir a vender listings?
> Nada fue modificado. Hallazgos basados en lectura directa del código (archivo:línea citados).

---

## ⚡ VEREDICTOS (tareas 1 y 2)

### 1. ¿Puede un negocio contactarme HOY y yo me entero? → **PARCIAL / RIESGOSO**
- El **formulario de contacto B2B** (`#formEmpresas`, anunciantes.html) **NO entrega nada**. Guarda solo en `localStorage` del navegador del visitante (`anunciantes.js:341-347`). **Tú nunca recibes esos envíos.**
- El **único canal real** es el enlace **`mailto:hola@305rutamiami.com`** (`anunciantes.html:1125`). Funciona *si y solo si* ese buzón existe y lo revisas. **No verificable desde el código — confírmalo tú.**
- Ese email **solo aparece en anunciantes.html**. No está en el home ni en ninguna otra página. No hay teléfono ni WhatsApp de negocio en ningún lado.
- **Agravante (engaño):** tras "enviar", el form muestra *"Mensaje enviado. Nos pondremos en contacto en menos de 24 horas. Revisa tu email — también te mandamos una confirmación."* (`anunciantes.html:1219-1220`). **Es falso:** no se envía nada ni se manda confirmación. Un prospecto queda esperando una respuesta que nunca llega.

### 2. ¿Puede un negocio pagar o iniciar el alta HOY? → **NO**
- No hay checkout, link de pago, Stripe, PayPal ni pasarela alguna. `portal/assets/portal.js:10` lo dice explícito: *"NO incluye: autenticación real, fetch a backend, Supabase, Stripe."*
- Todos los CTAs de precios ("Empezar ahora", "Elegir Profesional", "Ver planes") hacen scroll al formulario `#contacto-empresas` (`anunciantes.html:467, 526, 581`) → que va a localStorage → callejón sin salida.
- El **portal de clientes es una cáscara**: el login no autentica; cualquier submit (incluso campos vacíos) navega a `panel.html` (`portal/index.html:110-118`). Avisa "Autenticación próximamente" (`portal/index.html:92`).
- **Vía de alta real hoy:** únicamente escribir al email `hola@`. No hay forma automatizada de convertirse en cliente que paga.

---

## 🔴 BLOQUEANTE — no se puede vender sin esto

| # | Hallazgo | Evidencia | Impacto |
|---|----------|-----------|---------|
| B1 | **El formulario B2B no entrega.** Solo `localStorage` del visitante. Nunca recibes leads. | `anunciantes.js:320-354` | Pierdes el 100% de leads que usan el form en vez del email. |
| B2 | **El mensaje de éxito miente.** Promete respuesta en 24h + email de confirmación que no existe. | `anunciantes.html:1219-1220` | El prospecto cree que te contactó → ghosting involuntario → daña reputación. |
| B3 | **No hay vía de pago/alta.** CTAs de precios mueren en el form de localStorage. Sin checkout. | `anunciantes.html:467,526,581`; `portal.js:10` | Aunque alguien quiera pagar, no puede. Cero conversión automatizada. |
| B4 | **El portal de clientes es preview falso.** Login no valida; "sesión" es decorativa. | `portal/index.html:110-118`, `:92`; `portal/panel.html:38` | Si vendes prometiendo "portal para gestionar tu listing", el cliente paga y no hay nada funcional. |
| B5 | **El newsletter del home tampoco entrega.** Solo `localStorage.em_newsletter`. | `main.js:2352-2354` | No capturas ni un email. La lista de suscriptores no existe. |

**Mínimo para desbloquear la venta:** (a) que el form entregue de verdad (Formspree/EmailJS/Apps Script → tu correo), (b) corregir el mensaje de éxito para que no mienta, (c) un camino de pago/alta aunque sea manual y honesto ("te enviamos link de pago al confirmar"), (d) verificar que `hola@305rutamiami.com` existe y lo revisas.

---

## 🟠 CREDIBILIDAD — daña la confianza del cliente

| # | Hallazgo | Evidencia |
|---|----------|-----------|
| C1 | **Redes sociales muertas en TODO el sitio.** Instagram/TikTok/Facebook con `href="#"` — no llevan a nada. 3 por página, en las ~30 páginas. | `index.html:864,868,872` y todas las demás (`grep href="#"` → 3 por archivo). Un negocio que evalúa anunciarse revisa tus redes; no encontrarlas (o que no existan) resta seriedad. |
| C2 | **`og:image` del home es un placeholder de istock genérico** (no branded). Al compartir el link en WhatsApp/redes sale una foto de stock sin marca. | `index.html:17` → `istockphoto-155372056-612x612.jpg` (el archivo existe, no está roto, pero no es tuyo). |
| C3 | **Claims de tráfico sin sustento: "miles de aventureros / miles de usuarios".** Aparece 5× en la página de ventas. | `anunciantes.html:14,201,204,318,1101`. Si el sitio es nuevo y no tiene ese tráfico, es una promesa que no puedes respaldar (contradice la política honesta aplicada en el Lote 1). |
| C4 | **Nota legal del form ambigua.** "Tu información se guarda localmente para que nuestro equipo pueda contactarte" — técnicamente cierto pero engañoso: el equipo NO puede acceder a esa data (está en el navegador del visitante). | `anunciantes.html:1210-1211` |
| C5 | **Contacto invisible fuera de anunciantes.** El home, blog, destinos y footers no muestran email ni forma de contacto de negocio. El `id="contacto"` del footer es solo el pie, sin datos de contacto. | `index.html:764` (footer = `#contacto` sin email/tel) |
| C6 | **Panel con funciones "próximamente".** Subida de imágenes deshabilitada ("Subida disponible próximamente"). | `portal/panel.html:216,233` |

---

## 🟡 PULIDO — mejora, no bloquea

| # | Hallazgo | Evidencia |
|---|----------|-----------|
| P1 | **Reseñas solo en localStorage.** El sistema de reseñas públicas guarda por navegador; nadie más las ve y no persisten. | `anunciantes.js:802-817` |
| P2 | **Contenido demo en el mockup de ventas** ("Desde $65/tour", "Miami Kayak Tours"). Es un mockup ilustrativo, pero conviene que se lea claramente como ejemplo. | `anunciantes.html:336,159` |
| P3 | **Teléfonos `tel:` en páginas de destino** son los de los parques/NPS (correcto), no de tu negocio — solo aclarar que no son canal de contacto contigo. | `destinos/*.html` (p.ej. `everglades.html:868`) |
| P4 | **GA4 activo** (`G-7HMBMBQNQZ`) — bien para medir, pero hoy no hay conversión que medir porque el funnel no entrega. | `index.html` head |

---

## 🧭 Mapa del funnel de venta actual (lo que vive el prospecto)

```
Home (index.html)
  └─ "Para empresas" → anunciantes.html
       ├─ Precios reales y creíbles ($149/$249/$399 mes · $119/$199/$319 anual)   ✅ OK  (anunciantes.html:437,488,547)
       ├─ CTA "Empezar ahora / Elegir plan" → scroll a #contacto-empresas
       │     └─ Formulario → localStorage del visitante → ⛔ NADIE LO RECIBE
       │           └─ Éxito: "te contactamos en 24h + confirmación por email" → ⛔ MENTIRA
       ├─ "¿Prefieres escribirnos directamente?" → mailto:hola@305rutamiami.com → ✅ ÚNICO CANAL REAL (si el buzón existe)
       └─ "Acceder a mi portal" → portal/index.html → login falso → panel.html (preview) → ⛔ SIN BACKEND
```

**Conclusión:** la oferta (planes/precios/propuesta) está bien construida y es creíble. Lo que está roto es **la mecánica de captura y conversión**: ningún formulario entrega, no hay pago, el portal es preview, y un mensaje de éxito promete cosas que no ocurren. Con el sitio tal cual, **un negocio interesado solo puede llegarte si decide escribir manualmente al email `hola@` — y aún así, debes confirmar que ese buzón existe y lo monitoreas.**

---

## ✅ Lo que SÍ está sólido (no tocar)
- Precios, planes y propuesta de valor claros y honestos (3 tiers, anual/mensual, Schema.org Service). `anunciantes.html:437-602`
- 21 destinos con páginas indexables, bilingüe ES/EN, diseño consistente.
- Email de contacto presente (falta verificar buzón) y visible en la página de ventas.
- GA4 instalado para medición.

---
*Auditoría de solo lectura. No se modificó, creó ni borró ningún archivo del sitio (salvo este reporte). Próximo paso sugerido: priorizar B1+B2+B5 (hacer que los formularios entreguen y dejar de mentir en los mensajes de éxito) antes de cualquier llamada de venta.*
