/* ============================================
   DESTINO — JS compartido para páginas de destino
   ES5 puro: var, sin arrow functions, sin template literals
   Comentarios en español
   ============================================ */
(function () {
  'use strict';

  /* ── 1. Aplicar idioma antes del primer render ── */
  function aplicarIdiomaInicial() {
    var idioma = localStorage.getItem('em_idioma') || 'es';
    var html = document.documentElement;
    html.classList.remove('lang-es', 'lang-en');
    html.classList.add('lang-' + idioma);
    /* Actualizar botón del navbar si ya existe en el DOM */
    var btn = document.querySelector('.em-nav__lang');
    if (btn) btn.textContent = idioma === 'es' ? 'EN' : 'ES';
  }

  /* ── 2. Fade-up con IntersectionObserver ── */
  function initScrollAnimation() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: mostrar todo de inmediato */
      document.querySelectorAll('.fade-up').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }
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

  /* ── 3. Parallax suave del hero ── */
  function initHeroParallax() {
    var heroBg = document.querySelector('.destino-hero__bg');
    if (!heroBg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.addEventListener('scroll', function () {
      var offset = window.scrollY * 0.35;
      heroBg.style.transform = 'translateY(' + offset + 'px)';
    }, { passive: true });
  }

  /* ── 4. Barra de progreso de lectura ── */
  function initReadingProgress() {
    var bar = document.querySelector('.reading-progress');
    if (!bar) return;
    document.addEventListener('scroll', function () {
      var total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      var pct = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── 5. Smooth scroll para links internos ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ── 6. Lightbox de galería ── */
  function initLightbox() {
    var items = document.querySelectorAll('.galeria-item');
    var lightbox = document.getElementById('galeriaLightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var cerrar = document.getElementById('lightboxCerrar');
    var prev = document.getElementById('lightboxPrev');
    var next = document.getElementById('lightboxNext');

    if (!lightbox || !items.length) return;

    var currentIndex = 0;
    var images = [];

    items.forEach(function (item, i) {
      var img = item.querySelector('img');
      var caption = item.querySelector('.galeria-item__overlay');
      if (!img) return;
      images.push({
        src: img.src,
        alt: img.alt,
        caption: caption ? caption.textContent.trim() : ''
      });
      item.addEventListener('click', function () { openLightbox(i); });
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') openLightbox(i);
      });
    });

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = images[index].src;
      lightboxImg.alt = images[index].alt;
      if (lightboxCaption) lightboxCaption.textContent = images[index].caption;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      if (cerrar) cerrar.focus();
    }

    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      if (lightboxCaption) lightboxCaption.textContent = images[currentIndex].caption;
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      if (lightboxCaption) lightboxCaption.textContent = images[currentIndex].caption;
    }

    if (cerrar) cerrar.addEventListener('click', closeLightbox);
    if (next) next.addEventListener('click', showNext);
    if (prev) prev.addEventListener('click', showPrev);

    /* Clic en fondo del lightbox cierra */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    /* Teclado */
    document.addEventListener('keydown', function (e) {
      if (lightbox.style.display !== 'flex') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    /* Touch swipe en móvil */
    var touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showNext();
        else showPrev();
      }
    });
  }

  /* ── 7. Quiz interactivo ── */

  /* Datos del quiz — usa datos específicos de la página si están disponibles,
     sino usa las 5 preguntas de los Everglades como fallback */
  var QUIZ_DATA = window.DESTINO_QUIZ || [
    {
      pregunta_es: '¿Qué animal NO vive en los Everglades?',
      pregunta_en: 'Which animal does NOT live in the Everglades?',
      emoji: '🐊',
      opciones_es: ['Caimán americano', 'Cocodrilo americano', 'Manatí', 'Oso grizzly'],
      opciones_en: ['American alligator', 'American crocodile', 'Manatee', 'Grizzly bear'],
      correcta: 3,
      dato_es: 'El oso grizzly vive en el norte de América. Los Everglades son el único lugar del mundo donde conviven caimanes y cocodrilos en estado salvaje.',
      dato_en: 'Grizzly bears live in northern America. The Everglades is the only place in the world where alligators and crocodiles coexist in the wild.'
    },
    {
      pregunta_es: '¿Cuál es la temperatura del agua en verano?',
      pregunta_en: 'What temperature does the water reach in summer?',
      emoji: '🌡️',
      opciones_es: ['55–65 °F (13–18 °C)', '65–75 °F (18–24 °C)', '82–90 °F (28–32 °C)', '95–105 °F (35–41 °C)'],
      opciones_en: ['55–65 °F (13–18 °C)', '65–75 °F (18–24 °C)', '82–90 °F (28–32 °C)', '95–105 °F (35–41 °C)'],
      correcta: 2,
      dato_es: 'En verano el agua alcanza 82–90 °F (28–32 °C). Por eso los mosquitos son tan intensos entre junio y septiembre: es mejor visitar en temporada seca.',
      dato_en: 'In summer the water reaches 82–90 °F (28–32 °C). That\'s why mosquitoes are so intense between June and September: visit in dry season instead.'
    },
    {
      pregunta_es: '¿Qué es el "sawgrass" que cubre los Everglades?',
      pregunta_en: 'What is the "sawgrass" that covers the Everglades?',
      emoji: '🌿',
      opciones_es: ['Un tipo de cactus', 'Una hierba acuática con bordes cortantes', 'Un árbol de manglar', 'Una alga marina'],
      opciones_en: ['A type of cactus', 'An aquatic grass with sharp edges', 'A mangrove tree', 'A sea algae'],
      correcta: 1,
      dato_es: 'El sawgrass (Cladium jamaicense) es una hierba acuática con bordes afilados como sierra. Cubre más del 70% de los Everglades, dando origen al nombre "río de hierba".',
      dato_en: 'Sawgrass (Cladium jamaicense) is an aquatic grass with saw-like sharp edges. It covers over 70% of the Everglades, giving origin to the name "river of grass".'
    },
    {
      pregunta_es: '¿Cuál es la mejor hora para ver fauna en Anhinga Trail?',
      pregunta_en: 'What\'s the best time to spot wildlife on Anhinga Trail?',
      emoji: '⏰',
      opciones_es: ['12pm – 3pm', '3pm – 6pm', '6am – 9am', '6pm – 9pm'],
      opciones_en: ['12pm – 3pm', '3pm – 6pm', '6am – 9am', '6pm – 9pm'],
      correcta: 2,
      dato_es: 'Las primeras horas de la mañana la fauna está más activa y el calor es soportable. Los caimanes suelen estar fuera del agua al sol. Después del mediodía el calor es extremo.',
      dato_en: 'Early morning wildlife is most active and the heat is manageable. Alligators are usually out of the water sunbathing. After noon the heat becomes extreme.'
    },
    {
      pregunta_es: '¿En qué año fueron declarados Patrimonio de la Humanidad?',
      pregunta_en: 'In what year were they declared a UNESCO World Heritage Site?',
      emoji: '🌍',
      opciones_es: ['1955', '1979', '1992', '2001'],
      opciones_en: ['1955', '1979', '1992', '2001'],
      correcta: 1,
      dato_es: 'En 1979 la UNESCO los declaró Patrimonio de la Humanidad. También están en la Lista del Patrimonio en Peligro por la degradación de la calidad del agua.',
      dato_en: 'UNESCO declared them a World Heritage Site in 1979. They are also on the List of World Heritage in Danger due to declining water quality.'
    }
  ];

  /* Estado del quiz */
  var quizState = {
    preguntaActual: 0,
    puntaje: 0
  };

  function initQuiz() {
    var card = document.getElementById('quizCard');
    var reiniciar = document.getElementById('quizReiniciar');
    var siguiente = document.getElementById('quizSiguiente');
    if (!card) return;

    renderPregunta(0);

    if (siguiente) {
      siguiente.addEventListener('click', function () {
        quizState.preguntaActual++;
        if (quizState.preguntaActual < QUIZ_DATA.length) {
          renderPregunta(quizState.preguntaActual);
        } else {
          mostrarResultado();
        }
      });
    }

    if (reiniciar) {
      reiniciar.addEventListener('click', function () {
        quizState.preguntaActual = 0;
        quizState.puntaje = 0;
        var resultado = document.getElementById('quizResultado');
        if (resultado) resultado.style.display = 'none';
        if (card) card.style.display = 'block';
        renderPregunta(0);
      });
    }
  }

  function renderPregunta(index) {
    var data = QUIZ_DATA[index];
    var idioma = localStorage.getItem('em_idioma') || 'es';
    var preguntaEl = document.getElementById('quizPregunta');
    var emojiEl = document.getElementById('quizEmoji');
    var opcionesEl = document.getElementById('quizOpciones');
    var feedbackEl = document.getElementById('quizFeedback');
    var siguienteEl = document.getElementById('quizSiguiente');
    var progresoBar = document.getElementById('quizProgresoBar');

    if (preguntaEl) {
      preguntaEl.textContent = idioma === 'es' ? data.pregunta_es : data.pregunta_en;
    }
    if (emojiEl) emojiEl.textContent = data.emoji;
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.textContent = '';
      feedbackEl.className = 'quiz-feedback';
    }
    if (siguienteEl) siguienteEl.style.display = 'none';

    /* Barra de progreso */
    if (progresoBar) {
      progresoBar.style.width = ((index / QUIZ_DATA.length) * 100) + '%';
    }

    /* Renderizar opciones */
    if (opcionesEl) {
      opcionesEl.innerHTML = '';
      var opciones = idioma === 'es' ? data.opciones_es : data.opciones_en;
      opciones.forEach(function (opcion, i) {
        var btn = document.createElement('button');
        btn.className = 'quiz-opcion';
        btn.textContent = opcion;
        btn.type = 'button';
        btn.addEventListener('click', function () {
          seleccionarOpcion(i, data, opcionesEl, feedbackEl, siguienteEl, idioma);
        });
        opcionesEl.appendChild(btn);
      });
    }
  }

  function seleccionarOpcion(index, data, opcionesEl, feedbackEl, siguienteEl, idioma) {
    var todosBtn = opcionesEl.querySelectorAll('.quiz-opcion');
    var esCorrecta = (index === data.correcta);

    /* Deshabilitar todas las opciones */
    todosBtn.forEach(function (b) { b.disabled = true; });

    /* Marcar la elegida y la correcta */
    todosBtn[index].classList.add(esCorrecta ? 'quiz-opcion--correcta' : 'quiz-opcion--incorrecta');
    if (!esCorrecta) {
      todosBtn[data.correcta].classList.add('quiz-opcion--correcta');
    }

    /* Puntaje */
    if (esCorrecta) quizState.puntaje++;

    /* Feedback con dato interesante */
    if (feedbackEl) {
      var icono = esCorrecta ? '✅ ' : '❌ ';
      var intro = esCorrecta
        ? (idioma === 'es' ? '¡Correcto! ' : 'Correct! ')
        : (idioma === 'es' ? 'Casi. ' : 'Not quite. ');
      var dato = idioma === 'es' ? data.dato_es : data.dato_en;

      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = icono + '<strong>' + intro + '</strong>' + dato;
      feedbackEl.className = 'quiz-feedback quiz-feedback--' +
        (esCorrecta ? 'correcto' : 'incorrecto');
    }

    if (siguienteEl) siguienteEl.style.display = 'inline-flex';
  }

  function mostrarResultado() {
    var card = document.getElementById('quizCard');
    var resultado = document.getElementById('quizResultado');
    var idioma = localStorage.getItem('em_idioma') || 'es';

    if (card) card.style.display = 'none';
    if (!resultado) return;
    resultado.style.display = 'block';

    /* Actualizar barra al 100% */
    var bar = document.getElementById('quizProgresoBar');
    if (bar) bar.style.width = '100%';

    var pct = quizState.puntaje / QUIZ_DATA.length;
    var emoji, titulo, desc;

    if (pct === 1) {
      emoji = '🏆';
      titulo = idioma === 'es' ? '¡Experto de los Everglades!' : 'Everglades Expert!';
      desc = idioma === 'es'
        ? 'Conoces los Everglades mejor que la mayoría de los guías. ¡Estás listo para ir!'
        : 'You know the Everglades better than most guides. You\'re ready to go!';
    } else if (pct >= 0.6) {
      emoji = '🌿';
      titulo = idioma === 'es' ? '¡Buen conocimiento!' : 'Good knowledge!';
      desc = idioma === 'es'
        ? 'Sabes bastante sobre los Everglades. Un poco más de investigación y estarás listo.'
        : 'You know quite a bit about the Everglades. A little more research and you\'ll be ready.';
    } else {
      emoji = '🐊';
      titulo = idioma === 'es' ? 'El caimán te ganó esta vez.' : 'The alligator got you this time.';
      desc = idioma === 'es'
        ? 'No importa — visítalo y aprenderás todo en persona. Es la mejor forma.'
        : 'No worries — visit in person and you\'ll learn everything firsthand. That\'s the best way.';
    }

    var emojiEl = document.getElementById('resultadoEmoji');
    var tituloEl = document.getElementById('resultadoTitulo');
    var descEl = document.getElementById('resultadoDesc');
    var scoreEl = document.getElementById('resultadoScore');

    if (emojiEl) emojiEl.textContent = emoji;
    if (tituloEl) tituloEl.textContent = titulo;
    if (descEl) descEl.textContent = desc;
    if (scoreEl) {
      scoreEl.textContent = quizState.puntaje + '/' + QUIZ_DATA.length + ' ' +
        (idioma === 'es' ? 'correctas' : 'correct');
    }
  }

  /* ── Init ── */
  aplicarIdiomaInicial();

  document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimation();
    initHeroParallax();
    initReadingProgress();
    initSmoothScroll();
    initLightbox();
    initQuiz();
  });

})();
