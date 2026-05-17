/* =========================================
   EXPLORA MIAMI — main.js
   Lógica del sitio público
   JS puro, sin librerías externas
   Comentarios en español
========================================= */

/* ===== DATOS DE DESTINOS POR DEFECTO ===== */
var DESTINOS_DEFAULT = [
  {
    id: 1,
    nombre_es: 'Everglades National Park',
    nombre_en: 'Everglades National Park',
    descripcion_es: 'El humedal más grande de EE.UU. — senderismo, kayak y avistamiento de caimanes, flamencos y aves exóticas en un ecosistema único en el mundo.',
    descripcion_en: 'The largest wetland in the US — hiking, kayaking and spotting alligators, flamingos and exotic birds in a unique world ecosystem.',
    foto: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    lat: 25.2866, lng: -80.8987,
    dificultad_es: 'Fácil — Moderado', dificultad_en: 'Easy — Moderate', dificultad_clase: 'facil',
    precio: '$35 / vehículo', horarios: '24 horas',
    tipo: 'tierra', tipo_es: 'Senderismo · Kayak', tipo_en: 'Hiking · Kayak',
    activo: true
  },
  {
    id: 2,
    nombre_es: 'John Pennekamp Coral Reef',
    nombre_en: 'John Pennekamp Coral Reef',
    descripcion_es: 'El primer parque marino subacuático de EE.UU., en Key Largo. Buceo y snorkeling entre corales multicolores y peces tropicales.',
    descripcion_en: 'The first underwater park in the US, in Key Largo. Scuba diving and snorkeling among colorful corals and tropical fish.',
    foto: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80',
    lat: 25.1265, lng: -80.4087,
    dificultad_es: 'Moderado', dificultad_en: 'Moderate', dificultad_clase: 'moderado',
    precio: 'Desde $30', horarios: '8am – Sunset',
    tipo: 'mar', tipo_es: 'Buceo · Snorkeling', tipo_en: 'Scuba · Snorkeling',
    activo: true
  },
  {
    id: 3,
    nombre_es: 'Biscayne Bay',
    nombre_en: 'Biscayne Bay',
    descripcion_es: 'Aguas cristalinas en el corazón de Miami para kayak, paddle board y snorkeling, con vistas al skyline más icónico de Florida.',
    descripcion_en: "Crystal-clear waters in the heart of Miami for kayaking, paddle boarding and snorkeling, with views of Florida's most iconic skyline.",
    foto: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    lat: 25.4687, lng: -80.3275,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Desde $35', horarios: 'Amanecer – Atardecer',
    tipo: 'mar', tipo_es: 'Kayak · Paddle Board', tipo_en: 'Kayak · Paddle Board',
    activo: true
  },
  {
    id: 4,
    nombre_es: 'Bill Baggs Cape Florida',
    nombre_en: 'Bill Baggs Cape Florida',
    descripcion_es: 'Playa prístina, ciclismo costero y el faro histórico de Key Biscayne. El escape perfecto a minutos del centro de Miami.',
    descripcion_en: 'Pristine beach, coastal cycling and the historic Key Biscayne lighthouse. The perfect escape just minutes from downtown Miami.',
    foto: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    lat: 25.6671, lng: -80.1555,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$8 / vehículo', horarios: '8am – Sunset',
    tipo: 'tierra', tipo_es: 'Playa · Ciclismo', tipo_en: 'Beach · Cycling',
    activo: true
  },
  {
    id: 5,
    nombre_es: 'Oleta River State Park',
    nombre_en: 'Oleta River State Park',
    descripcion_es: 'El parque urbano más grande de Florida: kayak entre manglares, mountain bike y campismo a orillas del río Oleta en North Miami Beach.',
    descripcion_en: 'The largest urban park in Florida: kayaking through mangroves, mountain biking and camping on the banks of the Oleta River.',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    lat: 25.9265, lng: -80.1390,
    dificultad_es: 'Moderado', dificultad_en: 'Moderate', dificultad_clase: 'moderado',
    precio: '$6 / persona', horarios: '8am – Sunset',
    tipo: 'tierra', tipo_es: 'Kayak · Mountain Bike', tipo_en: 'Kayak · Mountain Bike',
    activo: true
  },
  {
    id: 6,
    nombre_es: 'Virginia Key Beach Park',
    nombre_en: 'Virginia Key Beach Park',
    descripcion_es: 'Playa histórica de Miami con aguas calmadas, ideal para paddle board, natación y kayak. Un tesoro escondido a minutos del Downtown.',
    descripcion_en: 'Historic Miami beach with calm waters, ideal for paddle boarding, swimming and kayaking. A hidden gem minutes from Downtown.',
    foto: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=800&q=80',
    lat: 25.7333, lng: -80.1583,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$10 / vehículo', horarios: '7am – 7pm',
    tipo: 'mar', tipo_es: 'Paddle Board · Natación', tipo_en: 'Paddle Board · Swimming',
    activo: true
  }
];

/* Siembra localStorage en la primera visita */
if (!localStorage.getItem('em_destinos')) {
  localStorage.setItem('em_destinos', JSON.stringify(DESTINOS_DEFAULT));
}

/* Obtiene destinos de localStorage */
function obtenerDestinos() {
  try {
    var d = JSON.parse(localStorage.getItem('em_destinos'));
    return (d && d.length) ? d : DESTINOS_DEFAULT;
  } catch (e) { return DESTINOS_DEFAULT; }
}

/* ===== RENDER DE TARJETAS DE DESTINO ===== */
var filtroActivo = 'todos';

function renderDestinos(filtro) {
  filtro = filtro || filtroActivo;
  var grid = document.getElementById('destinosGrid');
  if (!grid) return;

  var lista = obtenerDestinos().filter(function (d) {
    return d.activo && (filtro === 'todos' || d.tipo === filtro);
  });

  /* Construye el HTML de cada tarjeta con spans .lang-es / .lang-en */
  grid.innerHTML = lista.map(function (d, i) {
    var delay = (i % 3) * 0.12;
    var mapsUrl = 'https://www.google.com/maps?q=' + d.lat + ',' + d.lng;
    return (
      '<article class="destino-card fade-up" data-tipo="' + d.tipo + '" style="transition-delay:' + delay + 's">' +
        '<div class="destino-card__img-cont">' +
          '<img src="' + d.foto + '" alt="' + d.nombre_es + '" class="destino-card__img" loading="lazy" />' +
          '<span class="destino-card__badge destino-card__badge--tipo destino-card__badge--' + d.tipo + '">' +
            '<span class="lang-es">' + d.tipo_es + '</span>' +
            '<span class="lang-en">' + d.tipo_en + '</span>' +
          '</span>' +
          '<span class="destino-card__badge destino-card__badge--dif destino-card__badge--' + d.dificultad_clase + '">' +
            '<span class="lang-es">' + d.dificultad_es + '</span>' +
            '<span class="lang-en">' + d.dificultad_en + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="destino-card__info">' +
          '<h3 class="destino-card__nombre">' +
            '<span class="lang-es">' + d.nombre_es + '</span>' +
            '<span class="lang-en">' + d.nombre_en + '</span>' +
          '</h3>' +
          '<p class="destino-card__desc">' +
            '<span class="lang-es">' + d.descripcion_es + '</span>' +
            '<span class="lang-en">' + d.descripcion_en + '</span>' +
          '</p>' +
          '<div class="destino-card__meta">' +
            '<span class="destino-card__meta-item"><span class="meta-icono">💲</span>' + d.precio + '</span>' +
            '<span class="destino-card__meta-item"><span class="meta-icono">⏰</span>' + d.horarios + '</span>' +
            '<span class="destino-card__meta-item"><span class="meta-icono">📍</span>' +
              '<a href="' + mapsUrl + '" target="_blank" rel="noopener">GPS</a>' +
            '</span>' +
          '</div>' +
          '<a href="' + mapsUrl + '" target="_blank" rel="noopener" class="btn btn--primario destino-card__btn">' +
            '<span class="lang-es">Ver en mapa</span>' +
            '<span class="lang-en">View on map</span>' +
          '</a>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  /* Activa animaciones en los elementos nuevos */
  initScrollAnimation();
}

/* ===== NAVBAR: scroll → sombra + parallax hero ===== */
(function () {
  var header    = document.querySelector('.header');
  var heroFondo = document.querySelector('.hero__fondo');
  if (!header) return;

  window.addEventListener('scroll', function () {
    var sy = window.scrollY;
    header.classList.toggle('header--scrolled', sy > 60);
    if (heroFondo) heroFondo.style.transform = 'translateY(' + (sy * 0.28) + 'px)';
  }, { passive: true });
})();

/* ===== MENÚ HAMBURGUESA ===== */
(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('navMenu');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var ab = nav.classList.toggle('abierto');
    btn.classList.toggle('abierto', ab);
    btn.setAttribute('aria-expanded', String(ab));
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('abierto');
      btn.classList.remove('abierto');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ===== BOTÓN ES / EN ===== */
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('btnIdioma');
  if (btn) {
    btn.addEventListener('click', function () {
      cambiarIdioma(IDIOMA_ACTUAL === 'es' ? 'en' : 'es');
    });
  }
});

/* ===== FILTROS DE DESTINOS ===== */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.filtros__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      filtroActivo = btn.dataset.filtro;
      document.querySelectorAll('.filtros__btn').forEach(function (b) {
        b.classList.remove('filtros__btn--activo');
      });
      btn.classList.add('filtros__btn--activo');
      renderDestinos(filtroActivo);
    });
  });
});

/* ===== FORMULARIO "TRABAJA CON NOSOTROS" ===== */
document.addEventListener('DOMContentLoaded', function () {
  var form  = document.getElementById('formTrabaja');
  var exito = document.getElementById('formExito');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Guarda el contacto en localStorage */
    var contacto = {
      fecha:    new Date().toISOString(),
      nombre:   form.querySelector('[name="nombre"]').value,
      empresa:  form.querySelector('[name="empresa"]').value,
      email:    form.querySelector('[name="email"]').value,
      tel:      form.querySelector('[name="tel"]').value,
      servicio: form.querySelector('[name="servicio"]').value,
      mensaje:  form.querySelector('[name="mensaje"]').value
    };
    try {
      var lista = JSON.parse(localStorage.getItem('em_contactos')) || [];
      lista.push(contacto);
      localStorage.setItem('em_contactos', JSON.stringify(lista));
    } catch (err) { /* silencioso */ }

    /* Muestra el mensaje de éxito */
    form.style.display = 'none';
    if (exito) exito.style.display = 'flex';
  });
});

/* ===== ANIMACIONES FADE-UP AL SCROLL ===== */
function initScrollAnimation() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('.fade-up:not(.visible)').forEach(function (el) {
    observer.observe(el);
  });
}

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', function () {
  renderDestinos();
  initScrollAnimation();
});
