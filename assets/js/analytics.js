/* =========================================
   EXPLORA MIAMI — analytics.js
   Tracking de eventos Google Analytics 4
   Requiere que GA4 (gtag.js) esté cargado en el <head>
   Documentación: analytics.google.com/analytics/web/
   Comentarios en español
========================================= */

/* ===== FUNCIÓN WRAPPER SEGURA ===== */
/* Si gtag no está disponible (sin conexión, bloqueador de anuncios,
   o Measurement ID aún no configurado) no lanza errores */
function trackEvent(nombreEvento, parametros) {
  if (typeof gtag === 'function') {
    gtag('event', nombreEvento, parametros || {});
  }
}

/* ===== SCROLL DEPTH: 25 / 50 / 75 / 100% ===== */
/* Mide cuánto de la página lee cada visitante */
(function () {
  var marcasAlcanzadas = {};
  var marcas = [25, 50, 75, 100];

  window.addEventListener('scroll', function () {
    var alturaTotal  = document.documentElement.scrollHeight - window.innerHeight;
    if (!alturaTotal) return;
    var pctActual = Math.round((window.scrollY / alturaTotal) * 100);

    marcas.forEach(function (marca) {
      if (pctActual >= marca && !marcasAlcanzadas[marca]) {
        marcasAlcanzadas[marca] = true;
        trackEvent('scroll_depth', {
          event_category: 'Engagement',
          event_label:    marca + '%',
          depth_percent:  marca
        });
      }
    });
  }, { passive: true });
})();

/* ===== SECCIONES VISTAS (Intersection Observer) ===== */
/* Registra cuándo el usuario llega por primera vez a cada sección */
(function () {
  if (!window.IntersectionObserver) return;

  var secciones = ['inicio', 'nosotros', 'destinos', 'mapa', 'trabaja', 'contacto'];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        trackEvent('section_view', {
          event_category: 'Navegación',
          event_label:    entry.target.id
        });
        observer.unobserve(entry.target); /* solo la primera vez */
      }
    });
  }, { threshold: 0.35 });

  secciones.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ===== CLIC EN TARJETA DE DESTINO ===== */
/* Se llama desde main.js al hacer clic en cualquier tarjeta */
function trackDestinationClick(nombreDestino, tipoDestino) {
  trackEvent('destination_click', {
    event_category: 'Destinos',
    event_label:    nombreDestino,
    destination_type: tipoDestino || 'unknown'
  });
}

/* ===== APERTURA DE MODAL DE DESTINO ===== */
function trackModalOpen(nombreDestino) {
  trackEvent('modal_open', {
    event_category: 'Modales',
    event_label:    nombreDestino
  });
}

/* ===== CLIC EN GOOGLE MAPS ===== */
function trackMapsClick(nombreDestino) {
  trackEvent('maps_click', {
    event_category: 'Mapas',
    event_label:    nombreDestino,
    map_provider:   'Google Maps'
  });
}

/* ===== CLIC EN APPLE MAPS ===== */
function trackAppleMapsClick(nombreDestino) {
  trackEvent('apple_maps_click', {
    event_category: 'Mapas',
    event_label:    nombreDestino,
    map_provider:   'Apple Maps'
  });
}

/* ===== CLIC EN VER RESEÑAS REALES ===== */
function trackReviewsClick(nombreDestino) {
  trackEvent('reviews_click', {
    event_category: 'Reseñas',
    event_label:    nombreDestino
  });
}

/* ===== FORMULARIO DE CONTACTO ===== */
document.addEventListener('DOMContentLoaded', function () {

  /* Form 'formTrabaja' eliminado: el formulario actual vive en anunciantes.html */

  /* Cambio de idioma ES ↔ EN — selector actual: .em-nav__lang */
  var btnsIdioma = document.querySelectorAll('.em-nav__lang, .em-drawer__lang-btn');
  btnsIdioma.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idiomaDestino = document.documentElement.classList.contains('lang-en') ? 'es' : 'en';
      trackEvent('language_change', {
        event_category: 'UX',
        event_label:    'Cambio a ' + idiomaDestino.toUpperCase()
      });
    });
  });

  /* Botones de filtro de destinos */
  document.querySelectorAll('.filtros__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      trackEvent('filter_click', {
        event_category: 'Filtros',
        event_label:    btn.dataset.filtro || 'todos'
      });
    });
  });
});
