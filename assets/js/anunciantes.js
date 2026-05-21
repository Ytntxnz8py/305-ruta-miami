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
        if (isMobile) {
          /* Móvil: toggle del dropdown */
          if (drop) {
            var open = drop.classList.toggle('is-open');
            colBtn.setAttribute('aria-expanded', String(open));
          }
        } else {
          /* Desktop colapsado: expandir la píldora */
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
    /* Skip pricing cards — they use CSS 3D rotate3d via .pc-wrap:hover */
    document.querySelectorAll('.precio-card').forEach(function (card) {
      if (card.closest('.seccion-precios')) return;
      bindTilt(card, 6);
    });
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

    /* Floating label para selects — añade .has-value cuando hay opción elegida */
    form.querySelectorAll('select').forEach(function (sel) {
      function actualizarSelect() {
        sel.classList.toggle('has-value', sel.value !== '');
      }
      sel.addEventListener('change', actualizarSelect);
      actualizarSelect();
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

    /* Lee palabras según idioma activo (clase en <html> o localStorage) */
    function getWords() {
      var lang = 'es';
      if (document.documentElement.classList.contains('lang-en')) {
        lang = 'en';
      } else if (typeof IDIOMA_ACTUAL !== 'undefined') {
        lang = IDIOMA_ACTUAL;
      } else if (localStorage.getItem('em_idioma') === 'en') {
        lang = 'en';
      }
      var attr = el.getAttribute('data-words-' + lang) || el.getAttribute('data-words-es') || '';
      if (attr) return attr.split('|');
      /* Fallback: divide el texto plano original por espacios */
      return (el.textContent || '').trim().split(/\s+/);
    }

    /* Construye el HTML de las palabras con slices */
    function buildHTML(words) {
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

    /* Actualiza aria-label según el idioma */
    function syncAria(words) {
      el.setAttribute('aria-label', words.join(' '));
    }

    function render() {
      var w = getWords();
      el.innerHTML = buildHTML(w);
      syncAria(w);
      el.classList.remove('hero-shutter--pending');
    }

    function play() {
      render();
      el.classList.remove('is-animating');
      /* fuerza reflow para que el navegador reinicie las animations */
      void el.offsetWidth;
      el.classList.add('is-animating');
    }

    play();

    /* Re-renderiza al cambiar idioma — observa la clase de <html> */
    if (window.MutationObserver) {
      var mo = new MutationObserver(function () { play(); });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

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

  /* ===== TOGGLE PRECIO mensual / anual (3 tiers) ===== */
  /* Llamado desde onclick="togglePrecio('mensual'|'anual')" */
  window.togglePrecio = function (modo) {
    var esAnual = (modo === 'anual');

    /* Botones del toggle */
    var btnM = document.getElementById('btnMensual');
    var btnA = document.getElementById('btnAnual');
    if (btnM) btnM.classList.toggle('precios-toggle__btn--activo', !esAnual);
    if (btnA) btnA.classList.toggle('precios-toggle__btn--activo',  esAnual);

    /* Nota de precios anuales */
    var nota = document.getElementById('notaAnual');
    if (nota) nota.style.display = esAnual ? 'inline' : 'none';

    /* Anima cada precio con ease-out cubic */
    document.querySelectorAll('.precio-card__monto[data-mensual]').forEach(function (el) {
      var from   = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10) || 0;
      var to     = parseInt(esAnual ? el.dataset.anual : el.dataset.mensual, 10) || 0;
      if (from === to) return;

      /* Fade-out → cuenta → fade-in */
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      var elRef = el;
      setTimeout(function () {
        elRef.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        elRef.style.opacity = '1';
        elRef.style.transform = 'translateY(0)';

        var dur   = 380;
        var start = null;
        function tick(now) {
          if (!start) start = now;
          var t     = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          elRef.textContent = '$' + Math.round(from + (to - from) * eased);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, 120);
    });
  };

  /* ===== ANIMATED FOLDER STEPS ===== */
  /*
    Porta AnimatedFolder (React) → vanilla ES5.
    :hover en CSS maneja el efecto en desktop.
    JS agrega soporte para teclado (Enter/Space) y touch (toggle .is-open).
  */
  function initFolders() {
    var folders = document.querySelectorAll('.cf-folder');
    if (!folders.length) return;

    var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    function openFolder(folder) {
      folders.forEach(function (f) {
        f.classList.remove('is-open');
        f.setAttribute('aria-expanded', 'false');
      });
      folder.classList.add('is-open');
      folder.setAttribute('aria-expanded', 'true');
    }

    function closeFolder(folder) {
      folder.classList.remove('is-open');
      folder.setAttribute('aria-expanded', 'false');
    }

    folders.forEach(function (folder) {
      /* Keyboard: Enter / Space toggle */
      folder.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (folder.classList.contains('is-open')) {
            closeFolder(folder);
          } else {
            openFolder(folder);
          }
        }
        if (e.key === 'Escape') { closeFolder(folder); }
      });

      /* Touch devices: tap to toggle (no :hover on mobile) */
      if (isTouchDevice) {
        folder.addEventListener('click', function (e) {
          e.stopPropagation();
          if (folder.classList.contains('is-open')) {
            closeFolder(folder);
          } else {
            openFolder(folder);
          }
        });
      }
    });

    /* Close open folder when clicking outside */
    document.addEventListener('click', function () {
      folders.forEach(function (f) {
        f.classList.remove('is-open');
        f.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== HERO CARDS — clean up entry animation so hover works ===== */
  function initHeroCards() {
    var cards = document.querySelectorAll('.hero-img-card');
    if (!cards.length) return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    /* After each card's entry animation finishes, remove animation so the
       CSS :hover transition can take over without fighting fill-mode. */
    cards.forEach(function (card) {
      card.addEventListener('animationend', function onEnd() {
        card.removeEventListener('animationend', onEnd);
        card.style.animation = 'none';
        card.style.opacity   = '1';
      });
    });
  }

  /* ===== HERO PARALLAX — mouse-tracking depth layers ===== */
  function initHeroParallax() {
    var section = document.querySelector('.seccion-hero');
    if (!section) return;
    var layers = section.querySelectorAll('[data-depth]');
    if (!layers.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var mx = 0, my = 0; /* target mouse position (−0.5 → +0.5) */
    var cx = 0, cy = 0; /* current (lerped) position */

    function onMouseMove(e) {
      var rect = section.getBoundingClientRect();
      mx = (e.clientX - rect.left)  / rect.width  - 0.5;
      my = (e.clientY - rect.top)   / rect.height - 0.5;
    }
    function onMouseLeave() {
      mx = 0; my = 0; /* drift back to center */
    }

    section.addEventListener('mousemove',  onMouseMove,  { passive: true });
    section.addEventListener('mouseleave', onMouseLeave, { passive: true });

    (function tick() {
      /* smooth lerp — 5% per frame */
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;

      layers.forEach(function(layer) {
        var d  = parseFloat(layer.dataset.depth) || 0;
        var tx = cx * d * 55;
        var ty = cy * d * 38;
        layer.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
      });
      requestAnimationFrame(tick);
    }());
  }

  /* ===== PARA QUIÉN — blob parallax + underline trigger ===== */
  function initParaQuien() {
    var section  = document.getElementById('para-quien');
    if (!section) return;
    var underline = section.querySelector('.pq-underline');
    var blob1     = section.querySelector('.pq-blob--1');
    var blob2     = section.querySelector('.pq-blob--2');

    /* Underline: IntersectionObserver → add/remove .pq-underline--on */
    if (underline) {
      var ulIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            underline.classList.add('pq-underline--on');
          } else {
            underline.classList.remove('pq-underline--on');
          }
        });
      }, { threshold: 0.3 });
      ulIO.observe(section);
    }

    /* Blobs: scroll-based translateY parallax (soft, reduced-motion safe) */
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && (blob1 || blob2)) {
      function onParaScroll() {
        var scrollTop     = window.pageYOffset;
        var sectionTop    = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var progress      = (scrollTop - sectionTop) / sectionHeight;
        if (blob1) blob1.style.transform = 'translateY(' + (-progress * 50) + 'px)';
        if (blob2) blob2.style.transform = 'translateY(' + (progress  * 50) + 'px)';
      }
      window.addEventListener('scroll', onParaScroll, { passive: true });
      onParaScroll();
    }
  }

  /* ===== IDIOMA ES / EN (anunciantes.html) ===== */
  /* Versión liviana: no requiere i18n.js — solo toggle clase en <html> */
  window.toggleIdiomaAn = function () {
    var html    = document.documentElement;
    var current = localStorage.getItem('em_idioma') || html.lang || 'es';
    var next    = current === 'es' ? 'en' : 'es';

    /* Toggle clase CSS */
    html.classList.remove('lang-es', 'lang-en');
    html.classList.add('lang-' + next);
    html.lang = next;
    localStorage.setItem('em_idioma', next);

    /* Actualizar texto del botón de idioma desktop */
    var btn = document.getElementById('btnIdioma');
    if (btn) btn.textContent = next === 'es' ? 'ES' : 'EN';
  };

  /* Sincronizar botón desktop con idioma guardado */
  function initIdiomaAn() {
    var saved = localStorage.getItem('em_idioma') || 'es';
    var html  = document.documentElement;
    html.classList.remove('lang-es', 'lang-en');
    html.classList.add('lang-' + saved);
    html.lang = saved;
    var btn = document.getElementById('btnIdioma');
    if (btn) btn.textContent = saved === 'es' ? 'ES' : 'EN';
  }

  /* ===== CARRUSEL DE PRECIOS ===== */
  function initPreciosCarousel() {
    var scrollWrap = document.getElementById('preciosScrollWrap');
    var prev       = document.getElementById('precCarPrev');
    var next       = document.getElementById('precCarNext');
    if (!scrollWrap || !prev || !next) return;

    function cardWidth() {
      var card = scrollWrap.querySelector('.precio-card');
      if (!card) return 340;
      return card.offsetWidth + 24; /* offsetWidth + gap(1.5rem≈24px) */
    }

    function updateBtns() {
      prev.disabled = scrollWrap.scrollLeft <= 2;
      next.disabled = scrollWrap.scrollLeft >= scrollWrap.scrollWidth - scrollWrap.clientWidth - 2;
    }

    prev.addEventListener('click', function () {
      scrollWrap.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      scrollWrap.scrollBy({ left:  cardWidth(), behavior: 'smooth' });
    });
    scrollWrap.addEventListener('scroll', updateBtns, { passive: true });
    updateBtns();
  }

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    initIdiomaAn();
    initHeroShutter();      /* shutter text — antes que fade-up para que no compita */
    initHeroCards();
    initHeroParallax();
    initFloatingNav();
    initMetalButtons();
    initScrollAnimation();
    initCounters();
    initCardTilts();
    initFolders();
    initParaQuien();
    initPricingToggle();
    initPreciosCarousel();
    initAccordion();
    initFormContacto();
    initSmoothScroll();
  });

}());

/* ============================================
   SISTEMA DE RESEÑAS REALES
   Guarda en localStorage.em_resenas_publicas
   ============================================ */
(function initResenas() {
  'use strict';

  var STORAGE_KEY = 'em_resenas_publicas';

  function obtenerResenas() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) { return []; }
  }

  function guardarResena(resena) {
    var lista = obtenerResenas();
    lista.unshift(resena);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lista)); } catch (e) {}
  }

  function renderEstrellas(rating) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html += i <= rating
        ? '<span aria-hidden="true">★</span>'
        : '<span class="star-empty" aria-hidden="true">★</span>';
    }
    return html;
  }

  function formatearFecha(iso) {
    try {
      var d = new Date(iso);
      var lang = document.documentElement.classList.contains('lang-en') ? 'en-US' : 'es-ES';
      return d.toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return ''; }
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }

  function renderLista() {
    var grid = document.getElementById('resenasGrid');
    var empty = document.getElementById('resenasEmpty');
    if (!grid || !empty) return;

    var lista = obtenerResenas();
    if (lista.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    var html = '';
    for (var i = 0; i < lista.length; i++) {
      var r = lista[i];
      html += '<article class="resena-card">' +
        '<div class="resena-rating" aria-label="Rating ' + r.rating + ' de 5">' +
          renderEstrellas(r.rating) +
        '</div>' +
        '<p class="resena-texto">' + escapeHTML(r.texto) + '</p>' +
        '<div class="resena-autor">' +
          '<strong>' + escapeHTML(r.nombre) + '</strong>' +
          (r.empresa ? ' &middot; ' + escapeHTML(r.empresa) : '') +
          '<span class="resena-fecha">' + escapeHTML(formatearFecha(r.fecha)) + '</span>' +
        '</div>' +
      '</article>';
    }
    grid.innerHTML = html;
  }

  function initEstrellas() {
    var stars = document.querySelectorAll('.resenas-star');
    var input = document.getElementById('resenaRating');
    if (!stars.length || !input) return;

    function actualizarEstrellas(valor) {
      for (var i = 0; i < stars.length; i++) {
        if ((i + 1) <= valor) {
          stars[i].classList.add('active');
        } else {
          stars[i].classList.remove('active');
        }
      }
    }

    actualizarEstrellas(parseInt(input.value, 10) || 5);

    for (var j = 0; j < stars.length; j++) {
      (function(star) {
        star.addEventListener('click', function() {
          var val = parseInt(star.getAttribute('data-value'), 10);
          input.value = val;
          actualizarEstrellas(val);
        });
      })(stars[j]);
    }
  }

  function initFormulario() {
    var form = document.getElementById('resenaForm');
    var exito = document.getElementById('resenaExito');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var nombre = (document.getElementById('resenaNombre').value || '').trim();
      var empresa = (document.getElementById('resenaEmpresa').value || '').trim();
      var rating = parseInt(document.getElementById('resenaRating').value, 10) || 5;
      var texto = (document.getElementById('resenaTexto').value || '').trim();

      if (nombre.length < 2 || texto.length < 20) {
        if (nombre.length < 2) document.getElementById('resenaNombre').focus();
        else document.getElementById('resenaTexto').focus();
        return;
      }

      var nueva = {
        nombre: nombre.substring(0, 60),
        empresa: empresa.substring(0, 80),
        rating: Math.min(5, Math.max(1, rating)),
        texto: texto.substring(0, 500),
        fecha: new Date().toISOString()
      };

      guardarResena(nueva);
      form.reset();
      document.getElementById('resenaRating').value = 5;
      initEstrellas();
      renderLista();

      if (exito) {
        exito.hidden = false;
        setTimeout(function() { exito.hidden = true; }, 4500);
      }

      var primera = document.querySelector('.resena-card');
      if (primera && primera.scrollIntoView) {
        primera.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  function init() {
    if (!document.getElementById('resenasGrid')) return;
    renderLista();
    initEstrellas();
    initFormulario();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
