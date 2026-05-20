/* =========================================
   EXPLORA MIAMI — anunciantes.js
   Página de ventas B2B para anunciantes
   ES5 puro, IIFE, sin librerías externas
========================================= */
(function () {
  'use strict';

  /* ===== FLOATING PILL NAV ===== */
  function initFloatingNav() {
    var nav    = document.getElementById('floatingNav');
    var colBtn = nav && nav.querySelector('.fn__collapse-icon');
    var drop   = document.getElementById('fnDropdown');
    if (!nav) return;

    var isMobile      = window.innerWidth <= 768;
    var isExpanded    = true;
    var lastScrollY   = window.pageYOffset;
    var collapseAtY   = 0;
    var EXPAND_DELTA  = 80;
    var expandedWidth = 0;

    function measureWidth() {
      nav.style.width = '';
      expandedWidth = nav.offsetWidth;
      nav.style.width = expandedWidth + 'px';
    }

    function collapse() {
      if (!isExpanded || isMobile) return;
      isExpanded = false;
      nav.classList.add('is-collapsed');
      nav.style.width = '48px';
      if (drop) drop.classList.remove('is-open');
      if (colBtn) colBtn.setAttribute('aria-expanded', 'false');
    }

    function expand() {
      if (isExpanded) return;
      isExpanded = true;
      nav.classList.remove('is-collapsed');
      nav.style.width = expandedWidth + 'px';
      if (drop) drop.classList.remove('is-open');
      if (colBtn) colBtn.setAttribute('aria-expanded', 'false');
      nav.addEventListener('transitionend', function onEnd(e) {
        if (e.propertyName !== 'width') return;
        nav.removeEventListener('transitionend', onEnd);
        nav.style.width = '';
      });
    }

    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      if (!isMobile) {
        if (isExpanded && y > lastScrollY && y > 150) {
          collapseAtY = y;
          collapse();
        } else if (!isExpanded && y < lastScrollY && (collapseAtY - y > EXPAND_DELTA)) {
          expand();
        }
      }
      lastScrollY = y;
    }, { passive: true });

    nav.addEventListener('click', function (e) {
      if (!isExpanded && !isMobile) {
        e.stopPropagation();
        expand();
      }
    });

    if (colBtn) {
      colBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (drop) {
          var open = drop.classList.toggle('is-open');
          colBtn.setAttribute('aria-expanded', String(open));
        } else if (!isExpanded && !isMobile) {
          expand();
        }
      });
    }

    document.addEventListener('click', function () {
      if (drop) drop.classList.remove('is-open');
    });

    if (drop) {
      drop.querySelectorAll('.fn__dd-link').forEach(function (a) {
        a.addEventListener('click', function () {
          drop.classList.remove('is-open');
          if (colBtn) colBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    window.addEventListener('resize', function () {
      isMobile = window.innerWidth <= 768;
      if (!isMobile && isExpanded) {
        nav.style.width = '';
        measureWidth();
      }
    });

    requestAnimationFrame(function () {
      measureWidth();
      lastScrollY = window.pageYOffset;
    });
  }

  /* ===== METAL BUTTONS ===== */
  function initMetalButtons(root) {
    var scope = root || document;
    scope.querySelectorAll('.metal-btn-wrap').forEach(function (wrap) {
      if (wrap.dataset.metalInit) return;
      wrap.dataset.metalInit = '1';
      wrap.addEventListener('mousedown',   function () { wrap.classList.add('is-pressed'); });
      wrap.addEventListener('mouseup',     function () { wrap.classList.remove('is-pressed'); });
      wrap.addEventListener('mouseleave',  function () {
        wrap.classList.remove('is-pressed');
        wrap.classList.remove('is-hovered');
      });
      wrap.addEventListener('mouseenter',  function () { wrap.classList.add('is-hovered'); });
      wrap.addEventListener('touchstart',  function () { wrap.classList.add('is-pressed'); },  { passive: true });
      wrap.addEventListener('touchend',    function () { wrap.classList.remove('is-pressed'); });
      wrap.addEventListener('touchcancel', function () { wrap.classList.remove('is-pressed'); });
    });
  }

  /* ===== SCROLL ANIMATION (fade-up) ===== */
  function initScrollAnimation() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-up').forEach(function (el) { io.observe(el); });
  }

  /* ===== COUNTERS ===== */
  function initCounters() {
    var items = document.querySelectorAll('[data-count]');
    if (!items.length) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);

        var el      = entry.target;
        var target  = parseFloat(el.dataset.count);
        var suffix  = el.dataset.suffix  || '';
        var prefix  = el.dataset.prefix  || '';
        var isFloat = el.dataset.count.indexOf('.') !== -1;

        if (reduced) {
          el.textContent = prefix + (isFloat ? target.toFixed(1) : Math.round(target)) + suffix;
          return;
        }

        var dur   = 1600;
        var start = null;

        function tick(now) {
          if (!start) start = now;
          var elapsed  = now - start;
          var progress = Math.min(elapsed / dur, 1);
          var eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
          var value    = target * eased;
          el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ===== 3D CARD TILT ===== */
  function bindTilt(el, maxTilt) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    maxTilt = maxTilt || 8;

    el.addEventListener('mousemove', function (e) {
      el.classList.add('tilting');
      var rect = el.getBoundingClientRect();
      var cx   = rect.left + rect.width  / 2;
      var cy   = rect.top  + rect.height / 2;
      var dx   = (e.clientX - cx) / (rect.width  / 2);
      var dy   = (e.clientY - cy) / (rect.height / 2);
      var rotY = dx * maxTilt;
      var rotX = -dy * maxTilt * 0.65;
      el.style.transform =
        'perspective(1000px) rotateY(' + rotY.toFixed(2) + 'deg) rotateX(' + rotX.toFixed(2) + 'deg) translateZ(8px)';
    });

    el.addEventListener('mouseleave', function () {
      el.classList.remove('tilting');
      el.style.transform = '';
    });
  }

  function initCardTilts() {
    document.querySelectorAll('.precio-card').forEach(function (card) { bindTilt(card, 6); });
    /* Tilt en la escena del mockup (no en la card directamente para no romper transform 3D) */
    var scene = document.querySelector('.mockup-scene');
    if (scene) {
      scene.addEventListener('mousemove', function (e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var card = scene.querySelector('.mockup-card');
        if (!card) return;
        var rect = scene.getBoundingClientRect();
        var cx   = rect.left + rect.width  / 2;
        var cy   = rect.top  + rect.height / 2;
        var dx   = (e.clientX - cx) / (rect.width  / 2);
        var dy   = (e.clientY - cy) / (rect.height / 2);
        var rotY = -15 + dx * 10;
        var rotX =   5 + dy * -4;
        card.style.transition = 'none';
        card.style.transform =
          'rotateY(' + rotY.toFixed(2) + 'deg) rotateX(' + rotX.toFixed(2) + 'deg) scale(0.94)';
      });
      scene.addEventListener('mouseleave', function () {
        var card = scene.querySelector('.mockup-card');
        if (!card) return;
        card.style.transition = 'transform 0.55s var(--ease, cubic-bezier(0.2,0,0,1))';
        card.style.transform  = 'rotateY(-15deg) rotateX(5deg) scale(0.92)';
      });
    }
  }

  /* ===== FAQ ACCORDION — height real + clip-path spring ===== */
  function initAccordion() {
    var items  = document.querySelectorAll('.faq-item');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Cierra un ítem con animación */
    function closeItem(item) {
      var wrap    = item.querySelector('.faq-respuesta-wrap');
      var trigger = item.querySelector('.faq-trigger');
      if (!wrap || !item.classList.contains('is-open')) return;

      if (reduced) {
        item.classList.remove('is-open');
        wrap.style.height = '0';
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        return;
      }

      /* Congela la altura actual antes de quitar la clase */
      wrap.style.height = wrap.scrollHeight + 'px';
      item.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');

      /* Siguiente frame: anima a 0 */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          wrap.style.height = '0';
        });
      });
    }

    /* Abre un ítem con animación */
    function openItem(item) {
      var wrap    = item.querySelector('.faq-respuesta-wrap');
      var trigger = item.querySelector('.faq-trigger');
      if (!wrap || item.classList.contains('is-open')) return;

      /* Añade clase primero → activa clip-path CSS */
      item.classList.add('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');

      if (reduced) {
        wrap.style.height = 'auto';
        return;
      }

      /* scrollHeight devuelve el alto real aunque height:0 overflow:hidden */
      var fullH = wrap.scrollHeight;
      wrap.style.height = '0';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          wrap.style.height = fullH + 'px';
        });
      });

      /* Tras la transición: libera a 'auto' para que el contenido pueda crecer */
      function onEnd(e) {
        if (e.propertyName !== 'height') return;
        if (item.classList.contains('is-open')) wrap.style.height = 'auto';
        wrap.removeEventListener('transitionend', onEnd);
      }
      wrap.addEventListener('transitionend', onEnd);
    }

    /* Bind de triggers */
    items.forEach(function (item) {
      var trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        /* Cierra todos los abiertos */
        items.forEach(function (i) { closeItem(i); });
        /* Abre el actual solo si estaba cerrado */
        if (!isOpen) openItem(item);
      });
    });
  }

  /* ===== FORMULARIO DE CONTACTO ===== */
  function initFormContacto() {
    var form  = document.getElementById('formEmpresas');
    var exito = document.getElementById('formEmpresasExito');
    if (!form) return;

    var campos = form.querySelectorAll('input[required], select[required], textarea[required]');

    function validateField(campo) {
      var grupo  = campo.parentElement;
      var errMsg = grupo ? grupo.querySelector('.form-error-msg') : null;
      var valid  = campo.checkValidity();
      if (grupo) grupo.classList.toggle('has-error', !valid);
      if (errMsg) errMsg.style.display = valid ? 'none' : 'block';
      return valid;
    }

    campos.forEach(function (campo) {
      campo.addEventListener('blur', function () { validateField(campo); });
      campo.addEventListener('input', function () {
        if (campo.parentElement && campo.parentElement.classList.contains('has-error')) {
          validateField(campo);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      campos.forEach(function (campo) { if (!validateField(campo)) allValid = false; });
      if (!allValid) return;

      function val(name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el ? el.value : '';
      }

      var data = {
        nombre:  val('nombre'),
        empresa: val('empresa'),
        email:   val('email'),
        tel:     val('tel'),
        tipo:    val('tipo'),
        mensaje: val('mensaje'),
        fecha:   new Date().toISOString()
      };

      try {
        var lista = [];
        try { lista = JSON.parse(localStorage.getItem('em_contactos_empresas') || '[]'); }
        catch (e2) { lista = []; }
        lista.push(data);
        localStorage.setItem('em_contactos_empresas', JSON.stringify(lista));
      } catch (err) { /* continúa sin localStorage */ }

      form.style.display = 'none';
      if (exito) {
        exito.removeAttribute('style');
        exito.setAttribute('aria-live', 'polite');
      }
    });
  }

  /* ===== HERO SHUTTER TEXT ===== */
  /*
   * Porta el efecto HeroText React → vanilla ES5.
   * Divide el H1 en palabras, cada una con 3 capas de clip-path
   * que barren la tipografía (top/mid/bot) mientras el texto
   * principal hace blur-fade-in. Stagger por palabra via CSS var(--sw-d).
   */
  function initHeroShutter() {
    var el = document.getElementById('heroShutter');
    if (!el) return;

    var words = [
      'Tu','negocio','frente','a','miles','de','aventureros'
    ];

    /* Construye el HTML de las palabras con slices */
    function buildHTML() {
      return words.map(function (word, i) {
        var delay = (i * 0.13).toFixed(2) + 's';
        return (
          '<span class="sw" style="--sw-d:' + delay + '" aria-hidden="true">' +
            '<span class="sw__main">' + word + '</span>' +
            '<span class="sw__slice sw__slice--top">' + word + '</span>' +
            '<span class="sw__slice sw__slice--mid">' + word + '</span>' +
            '<span class="sw__slice sw__slice--bot">' + word + '</span>' +
          '</span>'
        );
      }).join(' ');
    }

    /* Inyecta el HTML, quita el estado pending y dispara */
    el.innerHTML = buildHTML();
    el.classList.remove('hero-shutter--pending');

    function play() {
      el.classList.remove('is-animating');
      /* fuerza reflow para que el navegador reinicie las animations */
      void el.offsetWidth;
      el.classList.add('is-animating');
    }

    play();

    /* Expuesto globalmente para el botón onclick en HTML */
    window.replayHeroShutter = play;
  }

  /* ===== PRICING TOGGLE — mensual / anual con número animado ===== */
  function initPricingToggle() {
    var monthBtn = document.getElementById('pricingMonthly');
    var yearBtn  = document.getElementById('pricingYearly');
    var slider   = document.getElementById('pricingSlider');
    if (!monthBtn || !yearBtn || !slider) return;

    /* Mueve el slider blanco bajo el botón activo */
    function positionSlider(btn) {
      slider.style.width     = btn.offsetWidth  + 'px';
      /* btn.offsetLeft ya incluye el padding del toggle; el slider empieza en left:4px, ajustamos */
      slider.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)';
    }

    /* Anima el dígito con ease-out cubic (mismo patrón que initCounters) */
    function animateNum(el, from, to) {
      var dur   = 420;
      var start = null;
      function tick(now) {
        if (!start) start = now;
        var t     = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(from + (to - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    /* Actualiza todos los precios y sufijos */
    function updatePrices(isYearly) {
      document.querySelectorAll('.precio-valor[data-monthly]').forEach(function (el) {
        var from = parseInt(el.textContent, 10);
        var to   = parseInt(isYearly ? el.dataset.yearly : el.dataset.monthly, 10);
        if (from === to) return;
        /* Fade out → actualiza → fade in con animación */
        el.classList.add('is-switching');
        var elRef = el;
        setTimeout(function () {
          elRef.classList.remove('is-switching');
          animateNum(elRef, from, to);
        }, 130);
      });

      document.querySelectorAll('.precio-periodo[data-monthly]').forEach(function (el) {
        el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
      });

      var nota = document.getElementById('precioAnualNota');
      if (nota) nota.style.display = isYearly ? 'block' : 'none';
    }

    function activateBtn(active, inactive, isYearly) {
      active.classList.add('is-active');
      inactive.classList.remove('is-active');
      active.setAttribute('aria-pressed', 'true');
      inactive.setAttribute('aria-pressed', 'false');
      positionSlider(active);
      updatePrices(isYearly);
    }

    monthBtn.addEventListener('click', function () { activateBtn(monthBtn, yearBtn, false); });
    yearBtn.addEventListener('click',  function () { activateBtn(yearBtn, monthBtn, true);  });

    /* Posición inicial del slider (debe pintarse el layout primero) */
    requestAnimationFrame(function () { positionSlider(monthBtn); });
  }

  /* ===== TESTIMONIOS SCROLL — pausa en focus para accesibilidad ===== */
  function initTestimoniosScroll() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cols = document.querySelectorAll('.testimonios-col');
    if (!cols.length) return;

    /* Si el usuario prefiere movimiento reducido, CSS ya detiene la animación.
       Aquí reforzamos vía JS para garantía cross-browser. */
    if (reduced) {
      cols.forEach(function (col) {
        var track = col.querySelector('.testimonios-track');
        if (track) track.style.animationPlayState = 'paused';
      });
      return;
    }

    /* Pausa cuando el foco de teclado entra en la columna (accesibilidad) */
    cols.forEach(function (col) {
      var track = col.querySelector('.testimonios-track');
      if (!track) return;

      col.addEventListener('focusin', function () {
        track.style.animationPlayState = 'paused';
      });
      col.addEventListener('focusout', function () {
        track.style.animationPlayState = '';
      });
    });
  }

  /* ===== SMOOTH SCROLL para anclas internas ===== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id     = a.getAttribute('href');
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ===== BOTÓN: scroll a sección por id ===== */
  /* Expuesto como global para onclick inline en HTML */
  window.anScrollTo = function (id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroShutter();      /* shutter text — antes que fade-up para que no compita */
    initFloatingNav();
    initMetalButtons();
    initScrollAnimation();
    initCounters();
    initCardTilts();
    initPricingToggle();
    initAccordion();
    initTestimoniosScroll();
    initFormContacto();
    initSmoothScroll();
  });

}());
