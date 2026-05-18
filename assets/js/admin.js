/* =========================================
   EXPLORA MIAMI — admin.js
   Panel de administración privado
   Contraseña: miami2026
   Comentarios en español
========================================= */

var ADMIN_PASS = 'miami2026';
var destinoEditandoId = null;

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', function () {
  /* Genera visitas simuladas históricas si es la primera vez */
  sembrarVisitasDemo();

  /* Verifica sesión activa */
  if (sessionStorage.getItem('em_admin') === 'ok') {
    mostrarDashboard();
  } else {
    mostrarLogin();
  }

  bindLogin();
  bindFormDestino();
  bindLogout();
});

/* ===== LOGIN ===== */
function mostrarLogin() {
  document.getElementById('loginOverlay').style.display = 'flex';
  document.getElementById('dashboard').style.display   = 'none';
}

function mostrarDashboard() {
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('dashboard').style.display    = 'block';
  actualizarStats();
  renderGrafico();
  renderClicsPorDestino();
  cargarDestinos();
  cargarMensajes();
  actualizarBadgeMensajes();
  bindMarcarLeidos();
}

function bindLogin() {
  var formLogin  = document.getElementById('formLogin');
  var errorLogin = document.getElementById('loginError');
  if (!formLogin) return;

  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    var pass = document.getElementById('inputPass').value;
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem('em_admin', 'ok');
      errorLogin.style.display = 'none';
      mostrarDashboard();
    } else {
      errorLogin.style.display = 'block';
      document.getElementById('inputPass').value = '';
      document.getElementById('inputPass').focus();
    }
  });
}

function bindLogout() {
  var btn = document.getElementById('btnLogout');
  if (btn) {
    btn.addEventListener('click', function () {
      sessionStorage.removeItem('em_admin');
      mostrarLogin();
    });
  }
}

/* ===== DATOS DEMO: siembra visitas históricas para el gráfico ===== */
/* Solo se ejecuta si no hay datos previos — da contexto realista al dashboard */
function sembrarVisitasDemo() {
  var visitas = {};
  try { visitas = JSON.parse(localStorage.getItem('em_visitas')) || {}; } catch (e) {}

  /* Si ya hay datos, no sobrescribe */
  var claves = Object.keys(visitas);
  if (claves.length > 1) return;

  /* Genera entre 3 y 12 visitas para cada uno de los últimos 14 días */
  var hoy = new Date();
  for (var i = 14; i >= 1; i--) {
    var d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    var clave = d.toISOString().split('T')[0];
    if (!visitas[clave]) {
      visitas[clave] = Math.floor(Math.random() * 10) + 3;
    }
  }
  localStorage.setItem('em_visitas', JSON.stringify(visitas));
}

/* ===== MÉTRICAS: VISITAS ===== */

/* Calcula las visitas de los últimos N días sumando los valores del localStorage */
function sumarVisitas(diasAtras) {
  var visitas = {};
  try { visitas = JSON.parse(localStorage.getItem('em_visitas')) || {}; } catch (e) {}

  var total = 0;
  var hoy   = new Date();
  for (var i = 0; i < diasAtras; i++) {
    var d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    var clave = d.toISOString().split('T')[0];
    total += (visitas[clave] || 0);
  }
  return total;
}

/* Calcula el total de clics en todos los destinos */
function sumarClics() {
  var clics = {};
  try { clics = JSON.parse(localStorage.getItem('em_clics')) || {}; } catch (e) {}
  return Object.values(clics).reduce(function (acc, v) { return acc + v; }, 0);
}

/* ===== ACTUALIZA TODAS LAS TARJETAS DE MÉTRICAS ===== */
function actualizarStats() {
  var destinos  = obtenerDestinosAdmin();
  var contactos = obtenerContactos();

  /* Visitas */
  var elHoy    = document.getElementById('statHoy');
  var elSemana = document.getElementById('statSemana');
  var elMes    = document.getElementById('statMes');
  if (elHoy)    elHoy.textContent    = sumarVisitas(1).toLocaleString();
  if (elSemana) elSemana.textContent = sumarVisitas(7).toLocaleString();
  if (elMes)    elMes.textContent    = sumarVisitas(30).toLocaleString();

  /* Clics, formularios y destinos activos */
  var elClics     = document.getElementById('statClicTotal');
  var elContactos = document.getElementById('statContactos');
  var elDestinos  = document.getElementById('statDestinos');
  if (elClics)     elClics.textContent     = sumarClics().toLocaleString();
  if (elContactos) elContactos.textContent = contactos.length;
  if (elDestinos)  elDestinos.textContent  = destinos.filter(function (d) { return d.activo; }).length;

  /* Fecha actual */
  var elFecha = document.getElementById('statFecha');
  if (elFecha) {
    elFecha.textContent = new Date().toLocaleDateString('es-ES', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
  }
}

/* ===== GRÁFICO DE BARRAS CSS: visitas últimos 7 días ===== */
function renderGrafico() {
  var contenedor = document.getElementById('graficoDias');
  if (!contenedor) return;

  var visitas = {};
  try { visitas = JSON.parse(localStorage.getItem('em_visitas')) || {}; } catch (e) {}

  /* Nombres cortos de días en español */
  var diasNombres = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  var datos = [];
  var hoy   = new Date();

  /* Recorre los últimos 7 días (del más antiguo al más reciente) */
  for (var i = 6; i >= 0; i--) {
    var d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    var clave   = d.toISOString().split('T')[0];
    var valor   = visitas[clave] || 0;
    var esHoy   = (i === 0);
    datos.push({ dia: diasNombres[d.getDay()], valor: valor, esHoy: esHoy });
  }

  /* Máximo para calcular la altura de cada barra en porcentaje */
  var maximo = Math.max.apply(null, datos.map(function (d) { return d.valor; })) || 1;

  contenedor.innerHTML = datos.map(function (d) {
    var pct   = Math.round((d.valor / maximo) * 100);
    var clase = d.esHoy ? 'barra-dia barra-dia--hoy' : 'barra-dia';
    return (
      '<div class="' + clase + '">' +
        '<span class="barra-valor">' + d.valor + '</span>' +
        '<div class="barra-barra"><div class="barra-fill" style="height:' + pct + '%"></div></div>' +
        '<span class="barra-etiqueta">' + d.dia + '</span>' +
      '</div>'
    );
  }).join('');
}

/* ===== TABLA DE CLICS POR DESTINO ===== */
function renderClicsPorDestino() {
  var contenedor = document.getElementById('clicsLista');
  if (!contenedor) return;

  var clics    = {};
  try { clics = JSON.parse(localStorage.getItem('em_clics')) || {}; } catch (e) {}

  var destinos = obtenerDestinosAdmin();
  var total    = sumarClics() || 1; /* evita división por cero */

  /* Ordena destinos por número de clics descendente */
  var datos = destinos.map(function (d) {
    return { nombre: d.nombre_es, clics: clics[String(d.id)] || 0, tipo: d.tipo };
  }).sort(function (a, b) { return b.clics - a.clics; });

  if (!datos.length) {
    contenedor.innerHTML = '<p class="tabla-vacia">Sin datos de clics aún.</p>';
    return;
  }

  contenedor.innerHTML = datos.map(function (d) {
    var pct   = Math.round((d.clics / total) * 100);
    var color = d.tipo === 'mar' ? 'var(--admin-turquesa)' : 'var(--admin-verde)';
    return (
      '<div class="clic-fila">' +
        '<span class="clic-nombre">' + esc(d.nombre) + '</span>' +
        '<div class="clic-barra-cont">' +
          '<div class="clic-barra" style="width:' + pct + '%;background:' + color + '"></div>' +
        '</div>' +
        '<span class="clic-num">' + d.clics + '</span>' +
      '</div>'
    );
  }).join('');
}

/* ===== ACCESO A DATOS ===== */
function obtenerDestinosAdmin() {
  try {
    var d = JSON.parse(localStorage.getItem('em_destinos'));
    return (d && d.length) ? d : [];
  } catch (e) { return []; }
}

function obtenerContactos() {
  try {
    return JSON.parse(localStorage.getItem('em_contactos')) || [];
  } catch (e) { return []; }
}

function guardarDestinos(destinos) {
  localStorage.setItem('em_destinos', JSON.stringify(destinos));
  actualizarStats();
  renderClicsPorDestino();
}

/* ===== BANDEJA DE MENSAJES (tarjetas en lugar de tabla) ===== */
function cargarMensajes() {
  var contenedor = document.getElementById('bandejaMensajes');
  if (!contenedor) return;

  var lista = obtenerContactos().slice().reverse(); /* más recientes primero */

  if (!lista.length) {
    contenedor.innerHTML = '<p class="tabla-vacia">No hay mensajes recibidos aún. Los formularios enviados desde el sitio aparecerán aquí.</p>';
    return;
  }

  /* Mapa de servicios para mostrar etiqueta legible */
  var servicioLabel = {
    'listing':  'Listing en directorio',
    'web':      'Página web',
    'pub':      'Publicidad',
    'amazon':   'Amazon'
  };

  contenedor.innerHTML = lista.map(function (c, idx) {
    var fecha   = new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    var servicio = servicioLabel[c.servicio] || c.servicio || '—';
    /* Inicial del nombre para el avatar */
    var inicial = (c.nombre || '?')[0].toUpperCase();
    /* Color de avatar ciclando por la paleta tropical */
    var colores  = ['#00BCD4','#FF6B6B','#FFB300','#7CB342','#9C27B0'];
    var color    = colores[idx % colores.length];

    return (
      '<div class="mensaje-card">' +
        '<div class="mensaje-avatar" style="background:' + color + '">' + inicial + '</div>' +
        '<div class="mensaje-cuerpo">' +
          '<div class="mensaje-meta">' +
            '<strong class="mensaje-nombre">' + esc(c.nombre || '—') + '</strong>' +
            '<span class="mensaje-empresa">' + esc(c.empresa || '—') + '</span>' +
            '<span class="mensaje-badge">' + esc(servicio) + '</span>' +
            '<span class="mensaje-fecha">' + fecha + '</span>' +
          '</div>' +
          '<p class="mensaje-texto">' + esc(c.mensaje || '—') + '</p>' +
          '<a href="mailto:' + esc(c.email) + '" class="mensaje-email">' + esc(c.email) + '</a>' +
          (c.tel ? '<span class="mensaje-tel">📞 ' + esc(c.tel) + '</span>' : '') +
        '</div>' +
      '</div>'
    );
  }).join('');
}

/* ===== TABLA DE DESTINOS ===== */
function cargarDestinos() {
  var tbody = document.getElementById('tablaDestinos');
  if (!tbody) return;
  var lista = obtenerDestinosAdmin();

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="tabla-vacia">No hay destinos. Agrégalos con el formulario de arriba.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(function (d) {
    return (
      '<tr>' +
        '<td data-label="Destino"><strong>' + esc(d.nombre_es) + '</strong></td>' +
        '<td data-label="Tipo"><span class="admin-badge admin-badge--' + d.tipo + '">' + d.tipo + '</span></td>' +
        '<td data-label="Precio">' + esc(d.precio) + '</td>' +
        '<td data-label="Estado">' +
          '<button class="toggle-btn ' + (d.activo ? 'toggle-btn--on' : '') + '" onclick="toggleActivo(' + d.id + ')">' +
            (d.activo ? '✓ Activo' : '✗ Inactivo') +
          '</button>' +
        '</td>' +
        '<td data-label="Acciones">' +
          '<button class="admin-btn admin-btn--edit" onclick="editarDestino(' + d.id + ')">Editar</button> ' +
          '<button class="admin-btn admin-btn--del"  onclick="eliminarDestino(' + d.id + ')">Eliminar</button>' +
        '</td>' +
      '</tr>'
    );
  }).join('');
}

/* ===== CRUD DESTINOS ===== */
function bindFormDestino() {
  var form = document.getElementById('formDestino');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var lista = obtenerDestinosAdmin();
    var v = function (name) { return form.querySelector('[name="' + name + '"]').value.trim(); };

    var datos = {
      id:              destinoEditandoId || Date.now(),
      nombre_es:       v('nombre_es'),     nombre_en:       v('nombre_en'),
      descripcion_es:  v('desc_es'),       descripcion_en:  v('desc_en'),
      foto:            v('foto'),
      lat:             parseFloat(v('lat')) || 0,
      lng:             parseFloat(v('lng')) || 0,
      dificultad_es:   v('dificultad_es'), dificultad_en:   v('dificultad_en'),
      dificultad_clase:v('dificultad_clase'),
      precio:          v('precio'),        horarios:        v('horarios'),
      tipo:            v('tipo'),
      tipo_es:         v('tipo_es'),       tipo_en:         v('tipo_en'),
      activo: true
    };

    if (destinoEditandoId !== null) {
      lista = lista.map(function (d) { return d.id === destinoEditandoId ? datos : d; });
    } else {
      lista.push(datos);
    }

    guardarDestinos(lista);
    cargarDestinos();
    resetFormDestino();
    document.getElementById('formDestinoWrap').style.display = 'none';
    toast('Destino guardado correctamente ✓');
  });
}

function editarDestino(id) {
  var d = obtenerDestinosAdmin().find(function (x) { return x.id === id; });
  if (!d) return;
  destinoEditandoId = id;

  var f   = document.getElementById('formDestino');
  var set = function (name, val) { var el = f.querySelector('[name="' + name + '"]'); if (el) el.value = val || ''; };

  set('nombre_es', d.nombre_es);       set('nombre_en', d.nombre_en);
  set('desc_es',   d.descripcion_es);  set('desc_en',   d.descripcion_en);
  set('foto',      d.foto);
  set('lat',       d.lat);             set('lng',       d.lng);
  set('dificultad_es',    d.dificultad_es);   set('dificultad_en',    d.dificultad_en);
  set('dificultad_clase', d.dificultad_clase);
  set('precio',    d.precio);          set('horarios',  d.horarios);
  set('tipo',      d.tipo);            set('tipo_es',   d.tipo_es);  set('tipo_en', d.tipo_en);

  document.getElementById('formDestinoTitulo').textContent = 'Editar Destino';
  document.getElementById('formDestinoWrap').style.display = 'block';
  document.getElementById('formDestinoWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function eliminarDestino(id) {
  if (!confirm('¿Eliminar este destino? Esta acción no se puede deshacer.')) return;
  guardarDestinos(obtenerDestinosAdmin().filter(function (d) { return d.id !== id; }));
  cargarDestinos();
  toast('Destino eliminado');
}

function toggleActivo(id) {
  guardarDestinos(obtenerDestinosAdmin().map(function (d) {
    if (d.id === id) d.activo = !d.activo;
    return d;
  }));
  cargarDestinos();
  actualizarStats();
}

function resetFormDestino() {
  destinoEditandoId = null;
  document.getElementById('formDestino').reset();
  document.getElementById('formDestinoTitulo').textContent = 'Agregar Destino';
}

/* ===== BADGE DE MENSAJES NO LEÍDOS ===== */

/* Devuelve cuántos mensajes llegaron después de la última visita al admin */
function contarNoLeidos() {
  var ultimaLectura = localStorage.getItem('em_ultima_lectura_admin') || '1970-01-01T00:00:00Z';
  var lista = obtenerContactos();
  return lista.filter(function (c) { return c.fecha && c.fecha > ultimaLectura; }).length;
}

/* Actualiza el badge de número en el encabezado de mensajes */
function actualizarBadgeMensajes() {
  var badge = document.getElementById('badgeMensajes');
  if (!badge) return;
  var n = contarNoLeidos();
  if (n > 0) {
    badge.textContent = n;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

/* Marca todos los mensajes como leídos al hacer clic en el botón o al ver la sección */
function marcarLeidos() {
  localStorage.setItem('em_ultima_lectura_admin', new Date().toISOString());
  actualizarBadgeMensajes();
}

/* Marca como leídos automáticamente cuando la sección de mensajes entra en pantalla */
function bindMarcarLeidos() {
  if (!window.IntersectionObserver) return;
  var seccion = document.getElementById('bandejaMensajes');
  if (!seccion) return;

  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      marcarLeidos();
      obs.disconnect();
    }
  }, { threshold: 0.20 });
  obs.observe(seccion);
}

/* ===== EXPORTAR CONTACTOS A CSV ===== */
function exportarContactos() {
  var lista = obtenerContactos();
  if (!lista.length) { alert('No hay contactos para exportar.'); return; }

  var cab  = ['Fecha', 'Nombre', 'Empresa', 'Email', 'Teléfono', 'Servicio', 'Mensaje'];
  var filas = lista.map(function (c) {
    return [c.fecha, c.nombre, c.empresa, c.email, c.tel, c.servicio, c.mensaje]
      .map(function (v) { return '"' + String(v || '').replace(/"/g, '""') + '"'; }).join(',');
  });

  var csv  = [cab.join(',')].concat(filas).join('\n');
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href = url; a.download = 'mensajes-explora-miami.csv'; a.click();
  URL.revokeObjectURL(url);
}

/* ===== NOTIFICACIÓN TOAST ===== */
function toast(msg) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('toast--visible');
  setTimeout(function () { el.classList.remove('toast--visible'); }, 3200);
}

/* ===== ESCAPE HTML PARA PREVENIR XSS ===== */
function esc(str) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(String(str || '')));
  return d.innerHTML;
}
