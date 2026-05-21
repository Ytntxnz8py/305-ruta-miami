/* ============================================
   BLOG — JS compartido índice + artículos
   Explora Miami · blog.js
   ES5 puro — sin const/let, sin arrow functions
   ============================================ */

(function () {
  'use strict';

  /* ─── 1. Fade-up reveal con IntersectionObserver ─── */
  function initScrollAnimation() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ─── 2. Navbar scroll state ─── */
  function initNavbarScroll() {
    var nav = document.querySelector('.fn');
    if (!nav) return;

    var onScroll = function () {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── 3. Hamburguesa — menú móvil ─── */
  function initMobileNav() {
    var btn      = document.querySelector('.fn__collapse-icon');
    var dropdown = document.getElementById('fnDropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', function () {
      var abierto = dropdown.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    /* Cierra al hacer clic fuera */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.fn-wrap')) {
        dropdown.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── 4. Botón idioma (blog usa mismo sistema que index) ─── */
  function initIdioma() {
    var btn = document.getElementById('btnIdioma');
    if (!btn) return;

    /* Aplica idioma guardado al cargar */
    var idioma = localStorage.getItem('em_idioma') || 'es';
    document.documentElement.classList.remove('lang-es', 'lang-en');
    document.documentElement.classList.add('lang-' + idioma);
    document.documentElement.lang = idioma;
    btn.textContent = idioma === 'es' ? 'EN' : 'ES';

    btn.addEventListener('click', function () {
      var actual = localStorage.getItem('em_idioma') || 'es';
      var nuevo  = actual === 'es' ? 'en' : 'es';
      localStorage.setItem('em_idioma', nuevo);
      document.documentElement.classList.remove('lang-es', 'lang-en');
      document.documentElement.classList.add('lang-' + nuevo);
      document.documentElement.lang = nuevo;
      btn.textContent = nuevo === 'es' ? 'EN' : 'ES';
      /* Sincronizar botón en dropdown si existe */
      var btnDd = document.getElementById('btnIdiomaDropdown');
      if (btnDd) btnDd.textContent = nuevo === 'es' ? 'EN' : 'ES';
    });
  }

  /* ─── 5. Tiempo de lectura estimado ─── */
  function initReadingTime() {
    var cuerpo = document.querySelector('.articulo-cuerpo');
    var metaEl = document.querySelector('[data-reading-time]');
    if (!cuerpo || !metaEl) return;

    var palabras = cuerpo.innerText.split(/\s+/).length;
    var minutos  = Math.ceil(palabras / 200);
    metaEl.textContent = minutos + ' min lectura';
  }

  /* ─── 6. Smooth scroll para anchors internos ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ─── 7. Barra de progreso de lectura ─── */
  function initReadingProgress() {
    var bar = document.querySelector('.reading-progress');
    if (!bar) return;

    var onScroll = function () {
      var total    = document.body.scrollHeight - window.innerHeight;
      var progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    };

    document.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── 8. MetalButtons — hover + press ─── */
  function initMetalButtons() {
    document.querySelectorAll('.metal-btn-wrap').forEach(function (wrap) {
      if (wrap.dataset.metalInit) return;
      wrap.dataset.metalInit = '1';

      wrap.addEventListener('mousedown',  function () { wrap.classList.add('is-pressed'); });
      wrap.addEventListener('mouseup',    function () { wrap.classList.remove('is-pressed'); });
      wrap.addEventListener('mouseleave', function () {
        wrap.classList.remove('is-pressed');
        wrap.classList.remove('is-hovered');
      });
      wrap.addEventListener('mouseenter', function () { wrap.classList.add('is-hovered'); });
      wrap.addEventListener('touchstart', function () { wrap.classList.add('is-pressed'); }, { passive: true });
      wrap.addEventListener('touchend',   function () { wrap.classList.remove('is-pressed'); });
      wrap.addEventListener('touchcancel',function () { wrap.classList.remove('is-pressed'); });
    });
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimation();
    initNavbarScroll();
    initMobileNav();
    initIdioma();
    initReadingTime();
    initSmoothScroll();
    initReadingProgress();
    initMetalButtons();
  });

})();
