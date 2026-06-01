/* ============================================================
   NAVBAR UNIVERSAL — Explora Miami
   ES5 puro (var, sin arrow functions, sin template literals)
   - Hide-on-scroll (threshold 80px). Siempre visible si scrollY <= 10.
   - Drawer móvil con backdrop.
   - setActiveLink basado en pathname + hash.
   - Toggle idioma: usa cambiarIdioma() si existe, fallback localStorage.
   ============================================================ */
(function () {
  'use strict';

  /* Espera DOM listo */
  function onReady(fn) {
    if (document.readyState !== 'loading') { fn(); return; }
    document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {

    var nav       = document.querySelector('.em-nav');
    var burger    = document.querySelector('.em-nav__burger');
    var drawer    = document.querySelector('.em-drawer');
    var backdrop  = document.querySelector('.em-drawer__backdrop');
    var btnLang   = document.querySelector('.em-nav__lang');
    var btnLangs  = document.querySelectorAll('.em-drawer__lang-btn');

    if (!nav) return;

    /* ===== Altura real del navbar → variable CSS ===== */
    /* Permite que cualquier sección hero se posicione exactamente */
    function actualizarNavHeight() {
      var h = nav.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-h', Math.round(h) + 'px');
    }
    actualizarNavHeight();
    window.addEventListener('resize', actualizarNavHeight, { passive: true });

    /* ===== Scroll hide/show ===== */
    var lastY      = window.pageYOffset || 0;
    var threshold  = 80;
    var ticking    = false;

    function onScroll() {
      var y = window.pageYOffset || 0;

      /* Sombra al alejarse del top */
      if (y > 10) nav.classList.add('is-scrolled');
      else        nav.classList.remove('is-scrolled');

      /* Siempre visible cerca del top */
      if (y <= 10) {
        nav.classList.remove('is-hidden');
      } else {
        /* Hide al bajar, show al subir, con threshold */
        var delta = y - lastY;
        if (delta > 6 && y > threshold) {
          nav.classList.add('is-hidden');
        } else if (delta < -6) {
          nav.classList.remove('is-hidden');
        }
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    /* Llamada inicial */
    onScroll();

    /* ===== Drawer móvil ===== */
    function openDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      if (burger) burger.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
    }
    function closeDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
    }

    /* ===== Desplegable "Destinos" con las 5 categorías =====
       Progressive enhancement: el HTML mantiene un link simple "Destinos"
       como fallback; aquí lo convertimos en un menú accesible. Se aplica
       igual en todas las páginas (el navbar está duplicado en cada una). */
    var CATS_NAV = [
      { cat: 'playa',       es: '🏖️ Playa',                en: '🏖️ Beach',             emoji: '🏖️', esN: 'Playa',                enN: 'Beach' },
      { cat: 'buceo',       es: '🤿 Buceo',                en: '🤿 Diving',            emoji: '🤿', esN: 'Buceo',                enN: 'Diving' },
      { cat: 'pesca',       es: '🎣 Pesca',                en: '🎣 Fishing',           emoji: '🎣', esN: 'Pesca',                enN: 'Fishing' },
      { cat: 'exploracion', es: '🧭 Exploración',          en: '🧭 Exploration',       emoji: '🧭', esN: 'Exploración',          enN: 'Exploration' },
      { cat: 'bares',       es: '🍹 Bares y Restaurantes',  en: '🍹 Bars & Restaurants', emoji: '🍹', esN: 'Bares y Restaurantes',  enN: 'Bars & Restaurants' }
    ];

    function prefijoIndex(href) {
      var i = href.indexOf('index.html');
      return i >= 0 ? href.substring(0, i) : '';
    }

    function construirDropdownDestinos() {
      /* --- Desktop: navbar --- */
      var destLink = nav.querySelector('.em-nav__links a.em-nav__link[href*="#destinos"]');
      if (destLink && destLink.parentNode) {
        var prefix = prefijoIndex(destLink.getAttribute('href') || '');
        var li = destLink.parentNode;
        var nuevo = document.createElement('li');
        nuevo.className = 'em-nav__item em-nav__item--dropdown';
        var html =
          '<button type="button" class="em-nav__dropdown-toggle" aria-haspopup="true" aria-expanded="false">' +
            '<span class="lang-es">Destinos</span><span class="lang-en">Destinations</span>' +
            '<span class="em-nav__caret" aria-hidden="true"></span>' +
          '</button>' +
          '<ul class="em-nav__menu" role="menu">';
        for (var k = 0; k < CATS_NAV.length; k++) {
          var c = CATS_NAV[k];
          html +=
            '<li role="none"><a role="menuitem" class="em-nav__menu-link" ' +
              'href="' + prefix + 'index.html?cat=' + c.cat + '#destinos">' +
              '<span class="lang-es">' + c.es + '</span><span class="lang-en">' + c.en + '</span>' +
            '</a></li>';
        }
        html += '</ul>';
        nuevo.innerHTML = html;
        li.parentNode.replaceChild(nuevo, li);

        var toggle = nuevo.querySelector('.em-nav__dropdown-toggle');
        var items  = nuevo.querySelectorAll('.em-nav__menu-link');
        function abrirMenu()  { nuevo.classList.add('is-open');    toggle.setAttribute('aria-expanded', 'true'); }
        function cerrarMenu() { nuevo.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }

        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          if (nuevo.classList.contains('is-open')) cerrarMenu(); else abrirMenu();
        });
        /* Click fuera cierra */
        document.addEventListener('click', function (e) {
          if (!nuevo.classList.contains('is-open')) return;
          if (nuevo.contains(e.target)) return;
          cerrarMenu();
        });
        /* Teclado: Escape cierra; flechas navegan los items */
        nuevo.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' || e.keyCode === 27) { cerrarMenu(); toggle.focus(); return; }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!nuevo.classList.contains('is-open')) abrirMenu();
            var arr = Array.prototype.slice.call(items);
            var idx = arr.indexOf(document.activeElement);
            var next = e.key === 'ArrowDown' ? (idx + 1) % arr.length : (idx - 1 + arr.length) % arr.length;
            if (idx === -1) next = 0;
            arr[next].focus();
          }
        });
        for (var m = 0; m < items.length; m++) {
          items[m].addEventListener('click', function () { cerrarMenu(); });
        }
      }

      /* --- Móvil: drawer (categorías como sub-enlaces tras "Destinos") --- */
      if (drawer) {
        var dDest = drawer.querySelector('a.em-drawer__link[href*="#destinos"]');
        if (dDest && dDest.parentNode) {
          var dprefix = prefijoIndex(dDest.getAttribute('href') || '');
          var ref = dDest.nextSibling;
          for (var n = 0; n < CATS_NAV.length; n++) {
            var cc = CATS_NAV[n];
            var a = document.createElement('a');
            a.className = 'em-drawer__link em-drawer__sublink';
            a.setAttribute('href', dprefix + 'index.html?cat=' + cc.cat + '#destinos');
            a.innerHTML = '<span class="em-drawer__emoji">' + cc.emoji + '</span>' +
                          '<span class="lang-es">' + cc.esN + '</span><span class="lang-en">' + cc.enN + '</span>';
            dDest.parentNode.insertBefore(a, ref);
          }
        }
      }
    }
    construirDropdownDestinos();

    if (burger) {
      burger.addEventListener('click', function () {
        var open = burger.getAttribute('aria-expanded') === 'true';
        if (open) closeDrawer();
        else      openDrawer();
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }
    /* Cierre con tecla escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) closeDrawer();
    });
    /* Cierre al pulsar un link del drawer */
    if (drawer) {
      var dLinks = drawer.querySelectorAll('a.em-drawer__link, a.em-drawer__cta');
      for (var i = 0; i < dLinks.length; i++) {
        dLinks[i].addEventListener('click', function () { closeDrawer(); });
      }
    }
    /* Cierre al hacer click fuera del drawer (en área del nav, no del drawer) */
    document.addEventListener('click', function (e) {
      if (!drawer || !drawer.classList.contains('is-open')) return;
      var t = e.target;
      if (drawer.contains(t)) return;
      if (burger && burger.contains(t)) return;
      if (backdrop && backdrop.contains(t)) return;
      closeDrawer();
    });

    /* ===== Set active link según URL ===== */
    function setActiveLink() {
      var path = window.location.pathname.split('/').pop() || 'index.html';
      var hash = window.location.hash || '';
      var current = path + hash;
      /* Normaliza: si está en raíz sin nombre, usa index.html */
      if (path === '' || path === '/') path = 'index.html';

      var links = document.querySelectorAll('.em-nav__link, .em-drawer__link');
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href') || '';
        links[i].classList.remove('is-active');

        /* Match flexible: por archivo o por archivo+hash */
        var hrefFile = href.split('#')[0].split('/').pop();
        if (!hrefFile && href.indexOf('#') === 0) hrefFile = path; /* solo hash */

        if (hrefFile === path) {
          /* Si el link tiene hash, sólo activar si coincide con el hash actual */
          var hrefHash = href.indexOf('#') >= 0 ? href.substring(href.indexOf('#')) : '';
          if (hrefHash && hash) {
            if (hrefHash === hash) links[i].classList.add('is-active');
          } else if (!hrefHash && !hash) {
            links[i].classList.add('is-active');
          } else if (!hrefHash && hash) {
            /* link sin hash en página con hash: marcar como activo solo si es el link principal */
            /* dejarlo neutro */
          }
        }
      }
    }
    setActiveLink();
    window.addEventListener('hashchange', setActiveLink);

    /* ===== Toggle idioma ===== */
    function toggleIdioma() {
      var actual = (localStorage.getItem('em_idioma') || 'es');
      var nuevo  = actual === 'es' ? 'en' : 'es';

      /* Si la página tiene una función global, delegar */
      if (typeof window.cambiarIdioma === 'function') {
        window.cambiarIdioma(nuevo);
      } else if (typeof window.toggleIdiomaAn === 'function') {
        window.toggleIdiomaAn();
      } else {
        /* Fallback: aplica clases y guarda */
        localStorage.setItem('em_idioma', nuevo);
        document.documentElement.classList.remove('lang-es', 'lang-en');
        document.documentElement.classList.add('lang-' + nuevo);
        document.documentElement.lang = nuevo;
      }
      actualizarLabelLang();
    }

    function actualizarLabelLang() {
      var actual = (localStorage.getItem('em_idioma') || 'es');
      /* El botón muestra el idioma DESTINO (el otro) */
      var destino = actual === 'es' ? 'EN' : 'ES';
      if (btnLang) btnLang.textContent = destino;
      /* Toggle visual en drawer */
      for (var i = 0; i < btnLangs.length; i++) {
        var lang = btnLangs[i].getAttribute('data-lang');
        if (lang === actual) btnLangs[i].classList.add('is-active');
        else                 btnLangs[i].classList.remove('is-active');
      }
    }

    if (btnLang) {
      btnLang.addEventListener('click', toggleIdioma);
    }
    for (var j = 0; j < btnLangs.length; j++) {
      (function (b) {
        b.addEventListener('click', function () {
          var lang = b.getAttribute('data-lang');
          var actual = (localStorage.getItem('em_idioma') || 'es');
          if (lang === actual) return;
          toggleIdioma();
        });
      })(btnLangs[j]);
    }
    actualizarLabelLang();
  });
})();
