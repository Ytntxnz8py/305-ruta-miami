/* =========================================
   EXPLORA MIAMI — animations.js
   Animaciones Vanilla JS — sin frameworks
   Comentarios en español
========================================= */

/* NOTA: El hero title (h1) usa animación CSS pura definida en styles.css.
   No se manipula el DOM del h1 para evitar conflictos con i18n y fuentes
   itálicas grandes. Ver @keyframes hero-title-in en styles.css. */


/* ===== H2 BLUR REVEAL — todos los h2 entran desde blur ===== */
/* IntersectionObserver dispara .visible cuando el h2 entra al 15% del viewport.
   La clase h2-reveal está definida en CSS: filter blur(10px) → blur(0). */
(function iniciarH2Reveal() {
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var h2s = document.querySelectorAll('h2');
  if (!h2s.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  h2s.forEach(function (el) {
    el.classList.add('h2-reveal');
    if (reducido) {
      el.classList.add('visible');
    } else {
      obs.observe(el);
    }
  });
})();


/* ===== INTRO CARDS — zoom parallax al scroll ===== */
/* Las 3 cards escalan levemente cuando se centran en el viewport.
   Card 1 y 3: máximo 1.05 — Card 2 (central): máximo 1.08.
   El zoom se aplica como transform:scale() inline para no pisar el fade-up. */
(function iniciarZoomIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cards      = document.querySelectorAll('.intro-card');
  var escalasMax = [1.05, 1.08, 1.05];
  if (!cards.length) return;

  function actualizar() {
    var centroVentana = window.innerHeight * 0.5;

    cards.forEach(function (card, i) {
      var rect   = card.getBoundingClientRect();
      var centro = rect.top + rect.height * 0.5;
      /* ratio: 1 cuando la card está perfectamente centrada, 0 fuera de vista */
      var ratio  = Math.max(0, 1 - Math.abs(centro - centroVentana) / centroVentana);
      var escala = 1 + (escalasMax[i] - 1) * ratio;
      card.style.transform = 'scale(' + escala.toFixed(4) + ')';
    });
  }

  window.addEventListener('scroll', actualizar, { passive: true });
  actualizar();
})();


/* ===== CHIPS DEL MAPA — fade-in escalonado 120ms ===== */
/* Cuando el primer chip entra al viewport, todos aparecen
   en secuencia con delay creciente de 120ms entre cada uno. */
(function iniciarChipsMapa() {
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chips    = document.querySelectorAll('.mapa-marcador');
  if (!chips.length) return;

  if (reducido) {
    chips.forEach(function (c) { c.classList.add('visible'); });
    return;
  }

  var disparado = false;
  var obs = new IntersectionObserver(function (entries) {
    if (disparado) return;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      disparado = true;
      chips.forEach(function (chip, i) {
        setTimeout(function () { chip.classList.add('visible'); }, i * 120);
      });
      obs.disconnect();
    });
  }, { threshold: 0.15 });

  obs.observe(chips[0]);
})();


/* ===== TRABAJA BENEFICIOS — fade-up escalonado 100ms ===== */
/* Los 4 íconos de beneficios aparecen uno a uno cuando el
   contenedor .trabaja-beneficios entra al viewport. */
(function iniciarBeneficios() {
  var reducido   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var beneficios = document.querySelectorAll('.trabaja-beneficio');
  var contenedor = document.querySelector('.trabaja-beneficios');
  if (!contenedor || !beneficios.length) return;

  if (reducido) {
    beneficios.forEach(function (b) { b.classList.add('visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      beneficios.forEach(function (b, i) {
        setTimeout(function () { b.classList.add('visible'); }, i * 100);
      });
      obs.disconnect();
    });
  }, { threshold: 0.15 });

  obs.observe(contenedor);
})();


/* ===== IMAGE SKELETON — cancela shimmer al cargar ===== */
/* Añade .img-cargada a cada imagen cuando termina de cargar,
   lo que cancela la animación CSS de shimmer turquesa.
   Usa MutationObserver para detectar cuando main.js inyecta las cards. */
(function iniciarSkeleton() {
  function vincularImagenes() {
    document.querySelectorAll('.destino-card__img:not([data-sk])').forEach(function (img) {
      img.setAttribute('data-sk', '1');
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('img-cargada');
      } else {
        img.addEventListener('load',  function () { img.classList.add('img-cargada'); });
        img.addEventListener('error', function () { img.classList.add('img-cargada'); });
      }
    });
  }

  var grid = document.getElementById('destinosGrid');
  if (grid) {
    new MutationObserver(vincularImagenes).observe(grid, { childList: true });
  }

  document.addEventListener('DOMContentLoaded', vincularImagenes);
})();


/* ===== FORM VALIDATION — tiempo real ===== */
/* Aplica .input-valido / .input-error en tiempo real.
   Solo marca error después de que el usuario ha interactuado (data-tocado). */
(function iniciarValidacion() {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formTrabaja');
    if (!form) return;

    var campos = form.querySelectorAll('input[required], select[required], textarea[required]');

    function validar(campo) {
      var ok = campo.validity.valid && campo.value.trim() !== '';
      campo.classList.toggle('input-valido', ok);
      campo.classList.toggle('input-error', !ok && campo.dataset.tocado === '1');
    }

    campos.forEach(function (campo) {
      campo.addEventListener('blur', function () {
        campo.dataset.tocado = '1';
        validar(campo);
      });
      campo.addEventListener('input', function () {
        if (campo.dataset.tocado === '1') validar(campo);
      });
    });

    form.addEventListener('submit', function () {
      campos.forEach(function (campo) {
        campo.dataset.tocado = '1';
        validar(campo);
      });
    });
  });
})();
