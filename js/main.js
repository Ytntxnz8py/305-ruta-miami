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

/* ===== SCROLL: NAVBAR ===== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  /* Navbar: transparente → sólido oscuro al bajar 60px */
  header.classList.toggle('header--scrolled', window.scrollY > 60);
}, { passive: true });

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
