/* =========================================
   305 RUTA MIAMI — admin-config.example.js  (PLANTILLA)

   Copia este archivo a  admin-config.js  (que está GITIGNORED) y rellena
   los valores. admin-config.js NO se commitea porque contiene GAS_SECRET.

   ⚠️ El secreto del proxy GA NUNCA debe vivir en un archivo del repo
   público. admin.html es client-side y cualquiera puede leer su JS, así
   que el GA4 en vivo del admin solo funciona en local (donde existe
   admin-config.js con el secreto). En el sitio desplegado, el admin cae
   a métricas de localStorage. La solución definitiva es un backend
   (Etapa 4 — Supabase).
========================================= */

var ADMIN_CONFIG = {
  /* Google Analytics 4 — el Measurement ID ya es público (está en el gtag del HTML) */
  GA4_MEASUREMENT_ID: 'G-7HMBMBQNQZ',
  GA4_PROPERTY_ID:    'TU_PROPERTY_ID',

  /* URL del Google Apps Script proxy desplegado */
  GAS_PROXY_URL: 'https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec',

  /* Secret compartido con el GAS proxy — debe coincidir con gas-proxy.js.
     Rellénalo SOLO en admin-config.js (gitignored). Nunca aquí. */
  GAS_SECRET: 'PON_AQUI_EL_SECRETO_ROTADO',

  VERSION: '2.0.0'
};
