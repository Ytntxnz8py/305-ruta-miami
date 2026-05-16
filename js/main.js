/* =============================================
   MI TIENDA OUTDOOR — LÓGICA PRINCIPAL
   Menú, typewriter, filtros, carrito
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
  let indiceFrase   = 0;
  let indiceCaracter = 0;
  let borrando      = false;
  let pausaActiva   = false;

  const VELOCIDAD_ESCRIBIR = 70;   /* ms por caracter al escribir */
  const VELOCIDAD_BORRAR   = 35;   /* ms por caracter al borrar */
  const PAUSA_FRASE        = 2000; /* ms al terminar de escribir */
  const PAUSA_INICIO       = 400;  /* ms antes de empezar a escribir */

  function escribir() {
    if (pausaActiva) return;

    const fraseActual = frases[indiceFrase];

    if (!borrando) {
      /* Añadir caracter */
      elementoTitulo.textContent = fraseActual.slice(0, indiceCaracter + 1);
      indiceCaracter++;

      if (indiceCaracter === fraseActual.length) {
        /* Frase completa: pausar antes de borrar */
        pausaActiva = true;
        setTimeout(() => {
          pausaActiva = false;
          borrando = true;
          setTimeout(escribir, VELOCIDAD_BORRAR);
        }, PAUSA_FRASE);
        return;
      }
    } else {
      /* Borrar caracter */
      elementoTitulo.textContent = fraseActual.slice(0, indiceCaracter - 1);
      indiceCaracter--;

      if (indiceCaracter === 0) {
        borrando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        /* Pequeña pausa antes de escribir la siguiente frase */
        setTimeout(escribir, PAUSA_INICIO);
        return;
      }
    }

    setTimeout(escribir, borrando ? VELOCIDAD_BORRAR : VELOCIDAD_ESCRIBIR);
  }

  /* Iniciar con una pequeña demora para que las animaciones CSS del hero terminen */
  setTimeout(escribir, 1400);
}

/* ===== FILTROS DE PRODUCTOS ===== */
const botonesFiltro = document.querySelectorAll('.filtros__btn');
const tarjetas      = document.querySelectorAll('.flip-card');

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    /* Actualizar botón activo */
    botonesFiltro.forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');

    const filtro = boton.dataset.filtro;

    tarjetas.forEach(tarjeta => {
      const mundo = tarjeta.dataset.mundo;

      if (filtro === 'todos' || filtro === mundo) {
        tarjeta.classList.remove('oculto');
        /* Pequeña animación de entrada al filtrar */
        tarjeta.style.animation = 'none';
        tarjeta.offsetHeight;   /* forzar reflow */
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

  /* Actualizar contador en el header */
  if (contadorCarrito) {
    contadorCarrito.textContent = cantidadCarrito;
    /* Efecto de pulso en el contador */
    contadorCarrito.style.transform = 'scale(1.4)';
    setTimeout(() => { contadorCarrito.style.transform = 'scale(1)'; }, 200);
  }

  /* Mostrar notificación */
  mostrarNotificacion(`✓ "${nombreProducto}" añadido al carrito`);
}

function mostrarNotificacion(mensaje) {
  let notif = document.getElementById('notificacion');

  /* Crear si no existe */
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notificacion';
    notif.className = 'notificacion';
    document.body.appendChild(notif);
  }

  notif.textContent = mensaje;
  notif.classList.add('visible');

  /* Ocultar después de 2.8s */
  clearTimeout(notif._timer);
  notif._timer = setTimeout(() => {
    notif.classList.remove('visible');
  }, 2800);
}

/* Delegar clic en todos los botones de "Agregar al carrito" */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-carrito')) {
    const nombre = e.target.dataset.nombre || 'Producto';
    agregarAlCarrito(nombre);
  }
});

/* ===== SCROLL: HEADER CON FONDO AL BAJAR ===== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
  } else {
    header.style.backgroundColor = 'rgba(10, 10, 10, 0.92)';
  }
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
    /* Activar el filtro correspondiente */
    const btnFiltro = document.querySelector(`.filtros__btn[data-filtro="${mundo}"]`);
    if (btnFiltro) {
      btnFiltro.click();
      /* Desplazarse a la sección de productos */
      document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
