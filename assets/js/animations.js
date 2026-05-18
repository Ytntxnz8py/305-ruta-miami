/* =========================================
   EXPLORA MIAMI — animations.js
   Efectos 21st.dev convertidos a Vanilla JS
   taste-skill · emil-design-eng · ui-ux-pro-max
   Comentarios en español
========================================= */

/* ===== SHUTTER HERO — efecto cinematográfico letra a letra ===== */
/* Divide el h1 del hero en letras y aplica 3 capas con clip-path
   cada capa barre en dirección alterna con delay escalonado 0.045s */
(function iniciarShutter() {
  /* Respeta preferencia de movimiento reducido */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Espera a que i18n aplique el texto (≈80ms es suficiente) */
  setTimeout(function () {
    var h1 = document.querySelector('.hero__titulo');
    if (!h1) return;

    var texto = h1.textContent.trim();
    if (!texto) texto = 'EXPLORA MIAMI';

    var chars = texto.split('');

    var html = chars.map(function (char, i) {
      /* Espacio: se mantiene como bloque vacío con ancho fijo */
      if (char === ' ') {
        return '<span class="shutter-char" style="display:inline-block;width:0.38em;"> </span>';
      }

      var delay      = (i * 0.045).toFixed(3);
      var delayMid   = ((i * 0.045) + 0.04).toFixed(3);
      var delayBot   = ((i * 0.045) + 0.08).toFixed(3);
      var dur        = '0.52s';
      var ease       = 'cubic-bezier(0.2,0,0,1)';

      return (
        '<span class="shutter-char">' +
          /* Letra fantasma: reserva el espacio horizontal */
          '<span class="shutter-letter-base" aria-hidden="true">' + char + '</span>' +
          /* Capa superior: barre de izquierda a derecha */
          '<span class="shutter-layer shutter-layer--top" aria-hidden="true" ' +
               'style="animation:shutter-top ' + dur + ' ' + ease + ' ' + delay + 's both;">' +
            char +
          '</span>' +
          /* Capa media: barre de derecha a izquierda */
          '<span class="shutter-layer shutter-layer--mid" aria-hidden="true" ' +
               'style="animation:shutter-mid ' + dur + ' ' + ease + ' ' + delayMid + 's both;">' +
            char +
          '</span>' +
          /* Capa inferior: barre de izquierda a derecha */
          '<span class="shutter-layer shutter-layer--bottom" aria-hidden="true" ' +
               'style="animation:shutter-bottom ' + dur + ' ' + ease + ' ' + delayBot + 's both;">' +
            char +
          '</span>' +
        '</span>'
      );
    }).join('');

    h1.innerHTML = html;
  }, 80);
})();


/* ===== H2 BLUR REVEAL — todos los h2 entran desde blur ===== */
/* IntersectionObserver dispara .visible cuando el h2 entra al viewport */
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
/* Cards escalan levemente al centrarse en el viewport
   Card 1: max 1.05, Card 2: max 1.08, Card 3: max 1.05 */
(function iniciarZoomIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cards      = document.querySelectorAll('.intro-card');
  var escalasMax = [1.05, 1.08, 1.05];
  if (!cards.length) return;

  function actualizar() {
    var mV = window.innerHeight * 0.5; /* centro de la ventana */

    cards.forEach(function (card, i) {
      var rect   = card.getBoundingClientRect();
      var centro = rect.top + rect.height * 0.5;
      /* ratio 1 = card perfectamente centrada, 0 = fuera de vista */
      var ratio  = Math.max(0, 1 - Math.abs(centro - mV) / mV);
      var escala = 1 + (escalasMax[i] - 1) * ratio;
      card.style.transform = 'scale(' + escala.toFixed(4) + ')';
    });
  }

  window.addEventListener('scroll', actualizar, { passive: true });
  actualizar();
})();


/* ===== CHIPS DEL MAPA — fade-in escalonado 0.12s ===== */
/* Cuando el primer chip entra al viewport, todos los chips
   aparecen uno a uno con delay creciente */
(function iniciarChipsMapa() {
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chips    = document.querySelectorAll('.mapa-marcador');
  if (!chips.length) return;

  /* Si reducido, mostrar todos de inmediato */
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
        setTimeout(function () {
          chip.classList.add('visible');
        }, i * 120);
      });
      obs.disconnect();
    });
  }, { threshold: 0.15 });

  obs.observe(chips[0]);
})();


/* ===== TRABAJA BENEFICIOS — fade-up escalonado 0.10s ===== */
/* Los 4 beneficios aparecen uno a uno cuando el contenedor
   entra al 15% del viewport */
(function iniciarBeneficios() {
  var reducido    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var beneficios  = document.querySelectorAll('.trabaja-beneficio');
  var contenedor  = document.querySelector('.trabaja-beneficios');
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


/* ===== IMAGE SKELETON — cancel shimmer al cargar ===== */
/* Añade clase .img-cargada cuando la imagen termina de cargar,
   lo que cancela la animación de shimmer CSS */
(function iniciarSkeleton() {
  /* Se llama también desde renderDestinos via MutationObserver */
  function vincularImagenes() {
    document.querySelectorAll('.destino-card__img:not([data-skeleton-ok])').forEach(function (img) {
      img.setAttribute('data-skeleton-ok', '1');
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('img-cargada');
      } else {
        img.addEventListener('load',  function () { img.classList.add('img-cargada'); });
        img.addEventListener('error', function () { img.classList.add('img-cargada'); }); /* evita shimmer infinito en error */
      }
    });
  }

  /* Observa el grid para detectar cuando main.js inyecta las cards */
  var grid = document.getElementById('destinosGrid');
  if (grid) {
    var mutObs = new MutationObserver(vincularImagenes);
    mutObs.observe(grid, { childList: true });
  }

  /* Primera llamada al cargar el DOM */
  document.addEventListener('DOMContentLoaded', vincularImagenes);
})();


/* ===== FORM VALIDATION — tiempo real ===== */
/* Aplica clases .input-valido / .input-error en blur e input */
(function iniciarValidacionFormulario() {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formTrabaja');
    if (!form) return;

    var campos = form.querySelectorAll('input[required], select[required], textarea[required]');

    function validar(campo) {
      var vacio = campo.value.trim() === '';
      var ok    = campo.validity.valid && !vacio;
      campo.classList.toggle('input-valido', ok);
      /* Solo marca error si el campo fue tocado (tiene texto o perdió foco) */
      campo.classList.toggle('input-error', !ok && (campo.dataset.tocado === '1'));
    }

    campos.forEach(function (campo) {
      /* Marca el campo como "tocado" al salir */
      campo.addEventListener('blur', function () {
        campo.dataset.tocado = '1';
        validar(campo);
      });
      /* Revalida en tiempo real si ya fue tocado */
      campo.addEventListener('input', function () {
        if (campo.dataset.tocado === '1') validar(campo);
      });
    });

    /* Al intentar enviar: marca todos como tocados y valida */
    form.addEventListener('submit', function () {
      campos.forEach(function (campo) {
        campo.dataset.tocado = '1';
        validar(campo);
      });
    });
  });
})();
