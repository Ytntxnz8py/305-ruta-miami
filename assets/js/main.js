/* =======================================
   EXPLORA MIAMI — main.js
   JS puro, sin librerías externas
   Comentarios en español
======================================= */

/* ===== NAVBAR: añade sombra al hacer scroll ===== */
(function () {
  var header    = document.querySelector('.header');
  var heroFondo = document.querySelector('.hero__fondo');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    /* Activa la sombra suave una vez superados 60px de scroll */
    header.classList.toggle('header--scrolled', scrollY > 60);

    /* Efecto parallax suave en el video del hero */
    if (heroFondo) {
      heroFondo.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
    }
  }, { passive: true });
})();

/* ===== MENÚ HAMBURGUESA (móvil) ===== */
(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('navMenu');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var abierto = nav.classList.toggle('abierto');
    btn.classList.toggle('abierto', abierto);
    btn.setAttribute('aria-expanded', String(abierto));
  });

  /* Cierra el menú al hacer clic en cualquier enlace */
  nav.querySelectorAll('.header__enlace').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      nav.classList.remove('abierto');
      btn.classList.remove('abierto');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ===== TYPEWRITER EN EL HERO ===== */
(function () {
  var el = document.getElementById('typewriterTexto');
  if (!el) return;

  /* Frases rotativas sobre las experiencias de Miami */
  var frases = [
    'Buceo en arrecifes de coral en Key Largo',
    'Kayak entre manglares de Biscayne Bay',
    'Senderismo en el Parque Nacional Everglades',
    'Paddle board en South Beach',
    'Escalada y camping en South Florida',
  ];

  var iFrase   = 0;
  var iChar    = 0;
  var borrando = false;

  function escribir() {
    var frase = frases[iFrase];

    if (!borrando) {
      el.textContent = frase.slice(0, iChar + 1);
      iChar++;
      if (iChar === frase.length) {
        borrando = true;
        setTimeout(escribir, 2200);
        return;
      }
    } else {
      el.textContent = frase.slice(0, iChar - 1);
      iChar--;
      if (iChar === 0) {
        borrando = false;
        iFrase = (iFrase + 1) % frases.length;
      }
    }

    setTimeout(escribir, borrando ? 38 : 68);
  }

  /* Inicia el typewriter con un pequeño retraso inicial */
  setTimeout(escribir, 900);
})();

/* ===== FILTROS DE DESTINOS (Todos / Tierra / Mar) ===== */
(function () {
  var botones  = document.querySelectorAll('.filtros__btn');
  var tarjetas = document.querySelectorAll('.destino-card');
  if (!botones.length) return;

  botones.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filtro = btn.dataset.filtro;

      /* Actualiza el estado activo del botón seleccionado */
      botones.forEach(function (b) { b.classList.remove('filtros__btn--activo'); });
      btn.classList.add('filtros__btn--activo');

      /* Muestra u oculta tarjetas según el filtro */
      tarjetas.forEach(function (tarjeta) {
        var coincide = filtro === 'todos' || tarjeta.dataset.tipo === filtro;
        tarjeta.classList.toggle('oculto', !coincide);
      });
    });
  });
})();

/* ===== FADE-IN AL HACER SCROLL (IntersectionObserver) ===== */
(function () {
  /* Aplica a tarjetas de destino e intro cards */
  var elementos = document.querySelectorAll('.destino-card, .intro-card');
  if (!elementos.length) return;

  /* Retraso escalonado: cada tarjeta en una columna aparece un poco después */
  elementos.forEach(function (el, i) {
    el.style.transitionDelay = ((i % 3) * 0.14) + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); /* Una sola animación por elemento */
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach(function (el) { observer.observe(el); });
})();
