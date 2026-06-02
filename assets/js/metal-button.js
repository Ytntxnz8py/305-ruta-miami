/* ============================================
   METAL BUTTON — JS universal
   305 Ruta Miami · Componente compartido ES5
   Cargado en TODAS las páginas del proyecto
   ============================================ */
(function() {
  'use strict';

  /**
   * initMetalButtons(root)
   * Inicializa todos los .metal-btn-wrap dentro de `root`.
   * Si root es null, busca en todo el documento.
   * Guard anti-doble-binding con data-metal-init.
   */
  function initMetalButtons(root) {
    var scope = root || document;
    var wraps = scope.querySelectorAll('.metal-btn-wrap');

    Array.prototype.forEach.call(wraps, function(wrap) {
      /* Guard: evitar doble binding */
      if (wrap.getAttribute('data-metal-init')) return;
      wrap.setAttribute('data-metal-init', '1');

      /* Press — mouse */
      wrap.addEventListener('mousedown', function() {
        wrap.classList.add('is-pressed');
      });
      wrap.addEventListener('mouseup', function() {
        wrap.classList.remove('is-pressed');
      });
      wrap.addEventListener('mouseleave', function() {
        wrap.classList.remove('is-pressed');
        wrap.classList.remove('is-hovered');
      });
      wrap.addEventListener('mouseenter', function() {
        wrap.classList.add('is-hovered');
      });

      /* Press — touch */
      wrap.addEventListener('touchstart', function() {
        wrap.classList.add('is-pressed');
      }, { passive: true });
      wrap.addEventListener('touchend', function() {
        wrap.classList.remove('is-pressed');
      });
      wrap.addEventListener('touchcancel', function() {
        wrap.classList.remove('is-pressed');
      });
    });
  }

  /* Exponer globalmente para que main.js / anunciantes.js puedan llamarlo */
  window.initMetalButtons = window.initMetalButtons || initMetalButtons;

  /* Auto-init al cargar el DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initMetalButtons();
    });
  } else {
    initMetalButtons();
  }

})();
