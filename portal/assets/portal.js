/* ============================================================
   305 RUTA MIAMI — PORTAL DE CLIENTES · portal.js
   FASE 1 — Cáscara visual (sin backend)

   Responsabilidades de esta fase:
   - i18n ES/EN reutilizando la MISMA clave localStorage del sitio ('em_idioma')
   - Navegación de pestañas del panel (post-carga, accesible)
   - Estados vacíos (no hay datos reales — nada de números falsos)

   NO incluye: autenticación real, fetch a backend, Supabase, Stripe.
   Esos se conectan en fases posteriores.
   ES5 puro · sin frameworks · sin dependencias del sitio principal
   ============================================================ */
(function () {
  'use strict';

  /* Clave compartida con el sitio principal para idioma consistente */
  var LANG_KEY = 'em_idioma';

  /* ===== IDIOMA ===== */
  function idiomaActual() {
    try {
      return localStorage.getItem(LANG_KEY) || 'es';
    } catch (e) {
      return 'es';
    }
  }

  /* Aplica la clase de idioma en <html> (mismo patrón .lang-es / .lang-en
     que styles.css del sitio) + traduce placeholders bilingües. */
  function aplicarIdioma(lang) {
    var html = document.documentElement;
    html.classList.remove('lang-es', 'lang-en');
    html.classList.add('lang-' + lang);
    html.lang = lang;

    /* Placeholders: data-ph-es / data-ph-en */
    var campos = document.querySelectorAll('[data-ph-es][data-ph-en]');
    Array.prototype.forEach.call(campos, function (el) {
      var val = el.getAttribute('data-ph-' + lang);
      if (val !== null) el.placeholder = val;
    });

    /* Etiqueta del botón de idioma: muestra el idioma DESTINO */
    var botones = document.querySelectorAll('[data-portal-lang]');
    Array.prototype.forEach.call(botones, function (btn) {
      btn.textContent = lang === 'es' ? 'EN' : 'ES';
    });
  }

  function alternarIdioma() {
    var nuevo = idiomaActual() === 'es' ? 'en' : 'es';
    try { localStorage.setItem(LANG_KEY, nuevo); } catch (e) {}
    aplicarIdioma(nuevo);
  }

  function initIdioma() {
    aplicarIdioma(idiomaActual());
    var botones = document.querySelectorAll('[data-portal-lang]');
    Array.prototype.forEach.call(botones, function (btn) {
      btn.addEventListener('click', alternarIdioma);
    });
  }

  /* ===== PESTAÑAS DEL PANEL ===== */
  function initTabs() {
    var tabs = document.querySelectorAll('[data-tab]');
    if (!tabs.length) return;

    function activar(nombre) {
      Array.prototype.forEach.call(tabs, function (tab) {
        var activo = tab.getAttribute('data-tab') === nombre;
        tab.classList.toggle('is-activo', activo);
        tab.setAttribute('aria-selected', activo ? 'true' : 'false');
        tab.setAttribute('tabindex', activo ? '0' : '-1');
      });
      var vistas = document.querySelectorAll('[data-vista]');
      Array.prototype.forEach.call(vistas, function (vista) {
        vista.classList.toggle('is-activo', vista.getAttribute('data-vista') === nombre);
      });
    }

    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        activar(tab.getAttribute('data-tab'));
      });
      /* Navegación con flechas (accesibilidad de tablist) */
      tab.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        var lista = Array.prototype.slice.call(tabs);
        var i = lista.indexOf(tab);
        var sig = e.key === 'ArrowRight'
          ? (i + 1) % lista.length
          : (i - 1 + lista.length) % lista.length;
        lista[sig].focus();
        activar(lista[sig].getAttribute('data-tab'));
      });
    });

    /* Activa la primera pestaña por defecto */
    activar(tabs[0].getAttribute('data-tab'));
  }

  /* ===== INIT ===== */
  function init() {
    initIdioma();
    initTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
