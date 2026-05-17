/* =============================================
   MI TIENDA OUTDOOR — LÓGICA PRINCIPAL
   Menú, typewriter, parallax, filtros, carrito
   ============================================= */

/* ===== MENÚ HAMBURGUESA ===== */
const menuBtn = document.getElementById('menuBtn');
const nav     = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const abierto = nav.classList.toggle('abierto');
    menuBtn.classList.toggle('abierto', abierto);
    menuBtn.setAttribute('aria-expanded', abierto);
  });

  /* Cerrar menú al hacer clic en un enlace */
  nav.querySelectorAll('.nav__enlace').forEach(enlace => {
    enlace.addEventListener('click', () => {
      nav.classList.remove('abierto');
      menuBtn.classList.remove('abierto');
      menuBtn.setAttribute('aria-expanded', false);
    });
  });
}

/* ===== EFECTO TYPEWRITER EN EL HERO ===== */
const frases = [
  'Conquista la Montaña',
  'Explora el Océano',
  'Vive la Aventura',
  'Escala tus Límites',
  'Sumérgete en lo Salvaje',
];

const elementoTitulo = document.getElementById('tituloDinamico');

if (elementoTitulo) {
  let indiceFrase    = 0;
  let indiceCaracter = 0;
  let borrando       = false;
  let pausaActiva    = false;

  const VELOCIDAD_ESCRIBIR = 70;
  const VELOCIDAD_BORRAR   = 35;
  const PAUSA_FRASE        = 2000;
  const PAUSA_INICIO       = 400;

  function escribir() {
    if (pausaActiva) return;

    const fraseActual = frases[indiceFrase];

    if (!borrando) {
      elementoTitulo.textContent = fraseActual.slice(0, indiceCaracter + 1);
      indiceCaracter++;

      if (indiceCaracter === fraseActual.length) {
        pausaActiva = true;
        setTimeout(() => {
          pausaActiva = false;
          borrando = true;
          setTimeout(escribir, VELOCIDAD_BORRAR);
        }, PAUSA_FRASE);
        return;
      }
    } else {
      elementoTitulo.textContent = fraseActual.slice(0, indiceCaracter - 1);
      indiceCaracter--;

      if (indiceCaracter === 0) {
        borrando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        setTimeout(escribir, PAUSA_INICIO);
        return;
      }
    }

    setTimeout(escribir, borrando ? VELOCIDAD_BORRAR : VELOCIDAD_ESCRIBIR);
  }

  setTimeout(escribir, 1400);
}

/* ===== FILTROS DE PRODUCTOS ===== */
const botonesFiltro = document.querySelectorAll('.filtros__btn');
const tarjetas      = document.querySelectorAll('.flip-card');

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    botonesFiltro.forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');

    const filtro = boton.dataset.filtro;

    tarjetas.forEach(tarjeta => {
      const mundo = tarjeta.dataset.mundo;

      if (filtro === 'todos' || filtro === mundo) {
        tarjeta.classList.remove('oculto');
        tarjeta.style.animation = 'none';
        tarjeta.offsetHeight;
        tarjeta.style.animation = 'subir 0.4s ease both';
      } else {
        tarjeta.classList.add('oculto');
      }
    });
  });
});

/* ===== CARRITO DE COMPRAS ===== */
let cantidadCarrito = 0;
const contadorCarrito = document.getElementById('contadorCarrito');

function agregarAlCarrito(nombreProducto) {
  cantidadCarrito++;

  if (contadorCarrito) {
    contadorCarrito.textContent = cantidadCarrito;
    contadorCarrito.style.transform = 'scale(1.4)';
    setTimeout(() => { contadorCarrito.style.transform = 'scale(1)'; }, 200);
  }

  mostrarNotificacion(`✓ "${nombreProducto}" añadido al carrito`);
}

function mostrarNotificacion(mensaje) {
  let notif = document.getElementById('notificacion');

  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notificacion';
    notif.className = 'notificacion';
    document.body.appendChild(notif);
  }

  notif.textContent = mensaje;
  notif.classList.add('visible');

  clearTimeout(notif._timer);
  notif._timer = setTimeout(() => {
    notif.classList.remove('visible');
  }, 2800);
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-carrito')) {
    const nombre = e.target.dataset.nombre || 'Producto';
    agregarAlCarrito(nombre);
  }
});

/* ===== SCROLL: NAVBAR + PARALLAX DEL VIDEO HERO ===== */
const header    = document.querySelector('.header');
const heroFondo = document.querySelector('.hero__fondo'); /* contenedor del video */

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  /* 1. Navbar: añade clase al bajar 60px → fondo sólido oscuro con sombra */
  header.classList.toggle('header--scrolled', scrollY > 60);

  /* 2. Parallax: mueve el fondo del hero al 30% de la velocidad del scroll.
        Al desplazarse hacia abajo, el video sube más lento que el contenido,
        creando la sensación de profundidad. El .hero recorta el desbordamiento. */
  if (heroFondo) {
    heroFondo.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
}, { passive: true });

/* ===== ANIMACIÓN DE ENTRADA EN SCROLL (IntersectionObserver) =====
   Cuando el usuario llega a cada sección, las tarjetas aparecen
   de abajo hacia arriba con un retardo escalonado entre ellas.    */
(function () {
  /* Seleccionamos todas las tarjetas de actividad */
  const tarjetasActividad = document.querySelectorAll('.actividad-card');

  /* Asignamos el retardo CSS a cada tarjeta dentro de su grupo.
     El índice se reinicia por sección para que el stagger
     sea independiente en Tierra y en Mar.                          */
  document.querySelectorAll('.seccion-actividades__grid').forEach(grid => {
    grid.querySelectorAll('.actividad-card').forEach((tarjeta, i) => {
      /* Cada tarjeta aparece 150ms después de la anterior */
      tarjeta.style.transitionDelay = `${i * 0.15}s`;
    });
  });

  /* Configuración del observer:
     - threshold 0.15 → la tarjeta empieza a animarse cuando el 15%
       de su área es visible en el viewport                          */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        /* Añadimos la clase que activa la transición CSS */
        entry.target.classList.add('visible');
        /* Dejamos de observar una vez que ya entró — solo anima una vez */
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  /* Registramos cada tarjeta en el observer */
  tarjetasActividad.forEach(tarjeta => observer.observe(tarjeta));
})();

/* ===== FLECHA SCROLL HERO ===== */
const flechaHero = document.getElementById('flechaHero');
if (flechaHero) {
  flechaHero.addEventListener('click', () => {
    document.getElementById('mundos')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ===== CLIC EN TARJETA DE MUNDO: FILTRAR PRODUCTOS ===== */
document.querySelectorAll('.mundo-card').forEach(card => {
  card.addEventListener('click', () => {
    const mundo = card.dataset.mundo;
    const btnFiltro = document.querySelector(`.filtros__btn[data-filtro="${mundo}"]`);
    if (btnFiltro) {
      btnFiltro.click();
      document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
