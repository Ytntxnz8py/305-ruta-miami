/* ============================================
   GALERÍA SELECTOR — Explora Miami
   Acordeón interactivo de paneles fotográficos
   Desktop: expansión horizontal
   Móvil:   expansión vertical
   ES5: var, sin arrow functions, sin template literals
   ============================================ */
(function () {
  'use strict';

  /* Iconos por posición de panel */
  var ICONS = ['📸', '🌿', '🌊', '🥾'];

  /* Estado del lightbox */
  var lb = {
    el:      null,
    img:     null,
    caption: null,
    index:   0,
    images:  []
  };

  /* ── Inicialización ── */
  function init() {
    var track = document.getElementById('sgTrack');
    if (!track) return;

    var options = track.querySelectorAll('.sg-option');
    if (!options.length) return;

    var activeIndex = 0;
    var reduced = !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    /* Construir array de imágenes para el lightbox */
    lb.images = [];
    for (var k = 0; k < options.length; k++) {
      var img     = options[k].querySelector('.sg-option__img');
      var titleEl = options[k].querySelector('.sg-option__title');
      lb.images.push({
        src:     img     ? img.src          : '',
        alt:     img     ? img.alt          : '',
        caption: titleEl ? titleEl.textContent.trim() : ''
      });
    }

    /* Inyectar iconos si el div está vacío */
    for (var m = 0; m < options.length; m++) {
      var iconEl = options[m].querySelector('.sg-option__icon');
      if (iconEl && !iconEl.textContent.trim()) {
        iconEl.textContent = ICONS[m] || '📸';
      }
    }

    /* Activar primer panel */
    options[0].classList.add('is-active');

    /* Animación de entrada escalonada */
    for (var i = 0; i < options.length; i++) {
      if (reduced) {
        /* Sin animación: mostrar directamente */
        options[i].style.opacity   = '1';
        options[i].style.transform = 'none';
      } else {
        (function (opt, delay) {
          setTimeout(function () {
            opt.classList.add('sg-entered');
          }, 180 * delay);
        })(options[i], i);
      }
    }

    /* Cambiar panel activo */
    function setActive(newIndex) {
      if (newIndex === activeIndex) return;
      options[activeIndex].classList.remove('is-active');
      options[newIndex].classList.add('is-active');
      activeIndex = newIndex;
    }

    /* Eventos por panel */
    for (var j = 0; j < options.length; j++) {
      (function (opt, idx) {

        /* Click en el panel */
        opt.addEventListener('click', function () {
          if (idx === activeIndex) {
            /* Panel ya activo → abrir lightbox */
            openLightbox(idx);
          } else {
            setActive(idx);
          }
        });

        /* Teclado: Enter o Espacio */
        opt.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (idx === activeIndex) {
              openLightbox(idx);
            } else {
              setActive(idx);
            }
          }
        });

        /* Botón zoom: stop propagation + abrir lightbox */
        var zoomBtn = opt.querySelector('.sg-option__zoom');
        if (zoomBtn) {
          zoomBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openLightbox(idx);
          });
        }

      })(options[j], j);
    }

    /* ── Lightbox ── */
    lb.el      = document.getElementById('galeriaLightbox');
    lb.img     = document.getElementById('lightboxImg');
    lb.caption = document.getElementById('lightboxCaption');

    var btnCerrar = document.getElementById('lightboxCerrar');
    var btnPrev   = document.getElementById('lightboxPrev');
    var btnNext   = document.getElementById('lightboxNext');

    if (btnCerrar) {
      btnCerrar.addEventListener('click', closeLightbox);
    }
    if (btnPrev) {
      btnPrev.addEventListener('click', function () { moveLightbox(-1); });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () { moveLightbox(1); });
    }
    if (lb.el) {
      lb.el.addEventListener('click', function (e) {
        if (e.target === lb.el) closeLightbox();
      });
    }

    /* Teclado global para el lightbox */
    document.addEventListener('keydown', function (e) {
      if (!lb.el || lb.el.style.display !== 'flex') return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') moveLightbox(1);
      if (e.key === 'ArrowLeft')  moveLightbox(-1);
    });
  }

  /* ── Lightbox: abrir ── */
  function openLightbox(index) {
    if (!lb.el || !lb.img || !lb.images.length) return;
    lb.index = index;
    showLightboxImage();
    lb.el.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    var cerrar = document.getElementById('lightboxCerrar');
    if (cerrar) cerrar.focus();
  }

  /* ── Lightbox: cerrar ── */
  function closeLightbox() {
    if (!lb.el) return;
    lb.el.style.display = 'none';
    document.body.style.overflow = '';
  }

  /* ── Lightbox: navegar ── */
  function moveLightbox(dir) {
    if (!lb.images.length) return;
    lb.index = (lb.index + dir + lb.images.length) % lb.images.length;
    showLightboxImage();
  }

  /* ── Lightbox: mostrar imagen actual ── */
  function showLightboxImage() {
    var d = lb.images[lb.index];
    if (!d) return;
    lb.img.src = d.src;
    lb.img.alt = d.alt;
    if (lb.caption) lb.caption.textContent = d.caption;
  }

  /* ── Arranque ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
