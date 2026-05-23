/* ============================================
   GALERÍA RADIAL — Explora Miami
   Rueda giratoria con GSAP ScrollTrigger
   ES5: var, sin arrow functions, sin template literals
   ============================================ */
(function () {
  'use strict';

  /* ── Configuración ── */
  var CFG = {
    radio_d:  550,   /* radio rueda desktop (px) */
    radio_m:  220,   /* radio rueda móvil   (px) */
    visible:  45,    /* % del círculo visible sobre el fold */
    scroll:   2500,  /* px de scroll para completar 360°    */
    card_d:   162,   /* ancho tarjeta desktop (px) */
    card_m:   118    /* ancho tarjeta móvil   (px) */
  };

  /* ── Utilidades ── */
  function esMobil()   { return window.innerWidth < 768; }
  function getRadio()  { return esMobil() ? CFG.radio_m : CFG.radio_d; }
  function getCardW()  { return esMobil() ? CFG.card_m  : CFG.card_d;  }
  function getCardH(w) { return Math.round(w * 4 / 3); }

  /* ── Calcula y aplica el layout ── */
  function calcLayout(wheel, stage) {
    var r      = getRadio();
    var d      = r * 2;
    var cw     = getCardW();
    var ch     = getCardH(cw);
    var visDec = CFG.visible / 100;
    var hidDec = 1 - visDec;

    /* Altura del stage = porción visible + margen para las tarjetas */
    var stageH = Math.round(d * visDec + ch * 0.78 + 55);
    stage.style.height = stageH + 'px';

    /* Posición de la rueda — centrada sin transform (deja transform libre para GSAP) */
    wheel.style.width      = d + 'px';
    wheel.style.height     = d + 'px';
    wheel.style.left       = '50%';
    wheel.style.marginLeft = (-r) + 'px';
    wheel.style.bottom     = (-(d * hidDec)) + 'px';
    wheel.style.position   = 'absolute';

    /* Posicionar cada radio en la circunferencia */
    var spokes = wheel.querySelectorAll('.radial-gallery__spoke');
    var n      = spokes.length;
    for (var i = 0; i < n; i++) {
      var angulo = (i / n) * 2 * Math.PI;
      var x      = r * Math.cos(angulo);
      var y      = r * Math.sin(angulo);
      var deg    = (angulo * 180 / Math.PI) + 90;

      /* transform: centrado + posición en círculo + rotación de orientación */
      spokes[i].style.transform =
        'translate(-50%, -50%) ' +
        'translate3d(' + x + 'px, ' + y + 'px, 0) ' +
        'rotate(' + deg + 'deg)';

      /* Dimensiones y centrado de la tarjeta por top/left (sin transform) */
      var card = spokes[i].querySelector('.radial-gallery__card');
      if (card) {
        card.style.width  = cw + 'px';
        card.style.height = ch + 'px';
        card.style.left   = (-cw / 2) + 'px';
        card.style.top    = (-ch / 2) + 'px';
      }
    }
  }

  /* ── Hover: activar/desactivar estados ── */
  function bindHover(wheel) {
    var spokes = wheel.querySelectorAll('.radial-gallery__spoke');
    for (var j = 0; j < spokes.length; j++) {
      (function (spoke) {
        var card = spoke.querySelector('.radial-gallery__card');
        if (!card) return;

        function onEnter() {
          wheel.classList.add('has-hover');
          spoke.classList.add('radial-gallery__spoke--hovered');
        }
        function onLeave() {
          wheel.classList.remove('has-hover');
          spoke.classList.remove('radial-gallery__spoke--hovered');
        }

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        card.addEventListener('focus',      onEnter);
        card.addEventListener('blur',       onLeave);
      })(spokes[j]);
    }
  }

  /* ── Mostrar todos los spokes sin animación (fallback) ── */
  function mostrarSpokes(wheel) {
    var spokes = wheel.querySelectorAll('.radial-gallery__spoke');
    for (var k = 0; k < spokes.length; k++) {
      spokes[k].style.opacity    = '1';
      spokes[k].style.visibility = 'visible';
    }
  }

  /* ── Inicialización principal ── */
  function init() {
    var pin   = document.getElementById('galeriaRadial');
    var stage = document.getElementById('galeriaStage');
    var wheel = document.getElementById('galeriaWheel');
    if (!pin || !stage || !wheel) return;

    var reducido = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Layout inicial */
    calcLayout(wheel, stage);

    /* Sin GSAP o con prefers-reduced-motion: mostrar estático */
    if (!window.gsap || !window.ScrollTrigger || reducido) {
      mostrarSpokes(wheel);
      bindHover(wheel);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* Animación de entrada: spokes aparecen con fade escalonado */
    gsap.fromTo(
      wheel.querySelectorAll('.radial-gallery__spoke'),
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.85,
        ease: 'power2.out',
        stagger: 0.10,
        scrollTrigger: {
          trigger: pin,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    /* Rotación 360° impulsada por scroll — pina la sección */
    gsap.to(wheel, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        pin: true,
        start: 'center center',
        end: '+=' + CFG.scroll,
        scrub: 1.4,
        invalidateOnRefresh: true
      }
    });

    bindHover(wheel);

    /* Recalcular al redimensionar */
    var timerResize;
    window.addEventListener('resize', function () {
      clearTimeout(timerResize);
      timerResize = setTimeout(function () {
        calcLayout(wheel, stage);
        ScrollTrigger.refresh();
      }, 180);
    });
  }

  /* ── Arranque ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
