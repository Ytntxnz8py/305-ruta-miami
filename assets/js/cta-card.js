/* ============================================================
   CTA CARD — IntersectionObserver para animación de entrada
   Activa .cta-card--visible cuando la card entra al viewport
   ES5, sin dependencias externas
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var cards = document.querySelectorAll('.cta-card');
    if (!cards.length) { return; }

    /* Sin soporte de IntersectionObserver: mostrar todo directamente */
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add('cta-card--visible');
      }
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('cta-card--visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    for (var j = 0; j < cards.length; j++) {
      io.observe(cards[j]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
