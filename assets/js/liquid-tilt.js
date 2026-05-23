/* ============================================================
   LIQUID TILT — Efecto 3D en botones
   Explora Miami · ES5 · sin frameworks

   Cuando el cursor entra en un botón, este se inclina hacia
   el punto de contacto simulando un objeto físico en el espacio.
   Al salir regresa suavemente a la posición plana.

   EXCLUIDOS del tilt:
   - .destinos-carousel__btn (usa translateY(-50%) absoluto)
   ============================================================ */
(function () {
  'use strict';

  /* Grados máximos de inclinación */
  var MAX_X = 8;    /* eje X (arriba-abajo) */
  var MAX_Y = 12;   /* eje Y (izquierda-derecha) */
  var SCALE = 1.05; /* escala en hover */

  /* Transición rápida al mover, suave al salir */
  var T_MOVE  = 'transform 0.08s ease, box-shadow 0.22s ease, opacity 0.2s ease';
  var T_LEAVE = 'transform 0.45s cubic-bezier(0.2,0,0,1), box-shadow 0.25s ease, opacity 0.2s ease';

  /* Selectores con efecto — carousel excluido */
  var SELECTORS = [
    '.metal-btn-wrap',
    '.em-nav__cta',
    '.blog-hero__cta',
    '.quiz-btn-siguiente',
    '.quiz-btn-reiniciar',
    '.destino-card__overlay-btn',
    '.precios-toggle__btn--activo'
  ].join(',');

  function initTilt() {
    /* Respetar prefers-reduced-motion */
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var els = document.querySelectorAll(SELECTORS);

    Array.prototype.forEach.call(els, function (el) {
      /* Guard: evitar doble binding */
      if (el.getAttribute('data-tilt-init')) return;
      el.setAttribute('data-tilt-init', '1');

      /* ── mousemove: calcular inclinación ── */
      el.addEventListener('mousemove', function (e) {
        /* No tilt durante el press del MetalButton */
        if (el.classList.contains('is-pressed')) return;

        var rect = el.getBoundingClientRect();
        var x  = e.clientX - rect.left;
        var y  = e.clientY - rect.top;
        var cx = rect.width  / 2;
        var cy = rect.height / 2;

        /* Normalizar a [-1, 1] */
        var nx = (x - cx) / cx;
        var ny = (y - cy) / cy;

        /* Inclinación: mouse arriba → parte superior "hacia ti" (rotX negativo) */
        var rotX = ny * -MAX_X;
        var rotY = nx *  MAX_Y;

        el.style.transition = T_MOVE;
        el.style.transform  =
          'perspective(600px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale3d(' +
          SCALE + ',' + SCALE + ',' + SCALE + ')';
      });

      /* ── mouseleave: volver al plano ── */
      el.addEventListener('mouseleave', function () {
        el.style.transition = T_LEAVE;
        el.style.transform  =
          'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      });

      /* ── mousedown: hunde el botón (complementa is-pressed en MetalButton) ── */
      el.addEventListener('mousedown', function () {
        el.style.transition = 'transform 0.08s ease';
        el.style.transform  =
          'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(0.97,0.97,0.97)';
      });

      /* ── mouseup: restaura el tilt activo ── */
      el.addEventListener('mouseup', function () {
        el.style.transition = T_LEAVE;
        el.style.transform  =
          'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      });
    });
  }

  /* Exponer para re-inicializar si se inyectan botones dinámicos */
  window.initLiquidTilt = window.initLiquidTilt || initTilt;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTilt);
  } else {
    initTilt();
  }

})();
