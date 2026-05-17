/* =========================================
   EXPLORA MIAMI — admin.js
   Panel de administración privado
   Contraseña: miami2026
========================================= */

var ADMIN_PASS = 'miami2026';
var destinoEditandoId = null;

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', function () {
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
  document.getElementById('loginOverlay').style.display  = 'flex';
  document.getElementById('dashboard').style.display     = 'none';
}

function mostrarDashboard() {
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('dashboard').style.display    = 'block';
  actualizarStats();
  cargarContactos();
  cargarDestinos();
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

/* ===== ESTADÍSTICAS DEL DASHBOARD ===== */
function actualizarStats() {
  var destinos  = obtenerDestinosAdmin();
  var contactos = obtenerContactos();

  var elD = document.getElementById('statDestinos');
  var elC = document.getElementById('statContactos');
  var elF = document.getElementById('statFecha');

  if (elD) elD.textContent = destinos.filter(function (d) { return d.activo; }).length;
  if (elC) elC.textContent = contactos.length;
  if (elF) {
    var hoy = new Date();
    elF.textContent = hoy.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }
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
}

/* ===== TABLA DE CONTACTOS ===== */
function cargarContactos() {
  var tbody = document.getElementById('tablaContactos');
  if (!tbody) return;
  var lista = obtenerContactos();

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="tabla-vacia">No hay contactos recibidos aún.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.slice().reverse().map(function (c) {
    var fecha = new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    var msg   = esc(c.mensaje || '');
    return (
      '<tr>' +
        '<td data-label="Fecha">'   + fecha + '</td>' +
        '<td data-label="Nombre">'  + esc(c.nombre)  + '</td>' +
        '<td data-label="Empresa">' + esc(c.empresa) + '</td>' +
        '<td data-label="Email"><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></td>' +
        '<td data-label="Servicio">' + esc(c.servicio) + '</td>' +
        '<td data-label="Mensaje" title="' + msg + '">' + msg.slice(0, 60) + (msg.length > 60 ? '…' : '') + '</td>' +
      '</tr>'
    );
  }).join('');
}

/* ===== TABLA DE DESTINOS ===== */
function cargarDestinos() {
  var tbody = document.getElementById('tablaDestinos');
  if (!tbody) return;
  var lista = obtenerDestinosAdmin();

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="tabla-vacia">No hay destinos. Agrega el primero con el formulario de arriba.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(function (d) {
    return (
      '<tr>' +
        '<td data-label="Nombre">' + esc(d.nombre_es) + '</td>' +
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
      id:            destinoEditandoId || Date.now(),
      nombre_es:     v('nombre_es'),   nombre_en:     v('nombre_en'),
      descripcion_es:v('desc_es'),     descripcion_en:v('desc_en'),
      foto:          v('foto'),
      lat:           parseFloat(v('lat')) || 0,
      lng:           parseFloat(v('lng')) || 0,
      dificultad_es: v('dificultad_es'), dificultad_en: v('dificultad_en'),
      dificultad_clase: v('dificultad_clase'),
      precio:        v('precio'),      horarios:      v('horarios'),
      tipo:          v('tipo'),
      tipo_es:       v('tipo_es'),     tipo_en:       v('tipo_en'),
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
    toast('Destino guardado correctamente ✓');
  });
}

function editarDestino(id) {
  var d = obtenerDestinosAdmin().find(function (x) { return x.id === id; });
  if (!d) return;
  destinoEditandoId = id;

  var f = document.getElementById('formDestino');
  var set = function (name, val) { var el = f.querySelector('[name="' + name + '"]'); if (el) el.value = val || ''; };

  set('nombre_es', d.nombre_es);     set('nombre_en', d.nombre_en);
  set('desc_es',   d.descripcion_es);set('desc_en',   d.descripcion_en);
  set('foto',      d.foto);
  set('lat',       d.lat);           set('lng',       d.lng);
  set('dificultad_es', d.dificultad_es); set('dificultad_en', d.dificultad_en);
  set('dificultad_clase', d.dificultad_clase);
  set('precio',    d.precio);        set('horarios',  d.horarios);
  set('tipo',      d.tipo);          set('tipo_es',   d.tipo_es); set('tipo_en', d.tipo_en);

  document.getElementById('formDestinoTitulo').textContent = 'Editar Destino';
  document.getElementById('formDestino').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
}

function resetFormDestino() {
  destinoEditandoId = null;
  document.getElementById('formDestino').reset();
  document.getElementById('formDestinoTitulo').textContent = 'Agregar Destino';
}

/* ===== EXPORTAR CONTACTOS CSV ===== */
function exportarContactos() {
  var lista = obtenerContactos();
  if (!lista.length) { alert('No hay contactos para exportar.'); return; }
  var cab   = ['Fecha', 'Nombre', 'Empresa', 'Email', 'Teléfono', 'Servicio', 'Mensaje'];
  var filas = lista.map(function (c) {
    return [c.fecha, c.nombre, c.empresa, c.email, c.tel, c.servicio, c.mensaje]
      .map(function (v) { return '"' + String(v || '').replace(/"/g, '""') + '"'; }).join(',');
  });
  var csv = [cab.join(',')].concat(filas).join('\n');
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href = url; a.download = 'contactos-explora-miami.csv'; a.click();
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
