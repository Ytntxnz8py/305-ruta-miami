/* =========================================
   EXPLORA MIAMI — admin-config.js
   Configuración pública del panel admin
   SIN contraseñas ni credenciales privadas
   Las credenciales privadas están en _privado/
========================================= */

var ADMIN_CONFIG = {
  /* Google Analytics 4 */
  GA4_MEASUREMENT_ID: 'G-7HMBMBQNQZ',
  GA4_PROPERTY_ID:    '538163810',

  /* URL del Google Apps Script proxy desplegado */
  GAS_PROXY_URL: 'https://script.google.com/macros/s/AKfycbxN93TLAIPXRsyyZaLNlr_JUjDVlN7BdXaEw4Kca7GVCO72PZaOoGpvqOhOVPj-BX6_Yw/exec',

  /* Secret compartido con el GAS proxy — debe coincidir con gas-proxy.js */
  GAS_SECRET: 'explora_miami_gas_2026',

  /* Versión del admin panel */
  VERSION: '2.0.0'
};
