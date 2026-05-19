/* =========================================
   EXPLORA MIAMI — admin.js v2.0
   Centro de Comando — Panel de administración
   Comentarios en español — ES5 (var, sin arrow functions)
========================================= */

/* ===== CONSTANTES Y ESTADO ===== */
var ADMIN_PASS = 'miami2026';
var GAS_SECRET = 'explora_miami_gas_2026'; /* Debe coincidir con gas-proxy.js */
var DESTINOS_VERSION = 3;  /* debe coincidir con main.js */
var MAX_INTENTOS = 5;

var destinoEditandoId = null;
var tabActual         = 'dashboard';

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', function () {
  /* Siembra datos demo de visitas si es la primera carga */
  sembrarVisitasDemo();

  /* Verifica sesión activa */
  if (sessionStorage.getItem('em_admin') === 'ok') {
    mostrarDashboard();
  } else {
    mostrarLogin();
  }

  /* Binds de UI */
  bindLogin();
  bindLogout();
  bindNavSidebar();
  bindSidebarMobile();
  bindSlidePanel();
  bindFormDestino();
  bindEditorSitio();
  bindMensajes();
  bindConfig();

  /* Fecha en el header */
  actualizarFechaHeader();
});

/* ============================================================
   LOGIN
============================================================ */
function mostrarLogin() {
  document.getElementById('loginOverlay').style.display = 'flex';
  document.getElementById('dashboard').style.display    = 'none';
}

function mostrarDashboard() {
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('dashboard').style.display    = 'flex';
  cargarTab('dashboard');
}

function bindLogin() {
  var formLogin       = document.getElementById('formLogin');
  var errorNormal     = document.getElementById('loginError');
  var errorBloqueado  = document.getElementById('loginBloqueado');
  if (!formLogin) return;

  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Verificar bloqueo por intentos */
    var intentos = parseInt(sessionStorage.getItem('em_login_intentos') || '0', 10);
    if (intentos >= MAX_INTENTOS) {
      errorNormal.style.display    = 'none';
      errorBloqueado.style.display = 'block';
      return;
    }

    var pass = document.getElementById('inputPass').value;

    if (pass === ADMIN_PASS) {
      /* Login exitoso */
      sessionStorage.setItem('em_admin', 'ok');
      sessionStorage.removeItem('em_login_intentos');
      errorNormal.style.display    = 'none';
      errorBloqueado.style.display = 'none';

      /* Registrar acceso en log local */
      registrarAcceso();
      mostrarDashboard();
    } else {
      /* Intento fallido */
      intentos++;
      sessionStorage.setItem('em_login_intentos', String(intentos));
      registrarIntentoFallido();

      if (intentos >= MAX_INTENTOS) {
        errorNormal.style.display    = 'none';
        errorBloqueado.style.display = 'block';
      } else {
        errorNormal.style.display    = 'block';
        errorBloqueado.style.display = 'none';
      }

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

/* Registra fecha/hora de acceso exitoso en localStorage */
function registrarAcceso() {
  var log = obtenerLogAccesos();
  log.push({ tipo: 'ok', fecha: new Date().toISOString() });
  /* Guardar solo los últimos 30 registros */
  if (log.length > 30) log = log.slice(-30);
  localStorage.setItem('em_log_accesos', JSON.stringify(log));
}

function registrarIntentoFallido() {
  var log = obtenerLogAccesos();
  log.push({ tipo: 'fallo', fecha: new Date().toISOString() });
  if (log.length > 30) log = log.slice(-30);
  localStorage.setItem('em_log_accesos', JSON.stringify(log));
}

function obtenerLogAccesos() {
  try { return JSON.parse(localStorage.getItem('em_log_accesos')) || []; }
  catch (e) { return []; }
}

/* ============================================================
   NAVEGACIÓN POR TABS (sidebar)
============================================================ */
var TITULOS_TABS = {
  dashboard: 'Dashboard',
  destinos:  'Destinos',
  editor:    'Editor sitio',
  mensajes:  'Mensajes',
  config:    'Configuración'
};

function bindNavSidebar() {
  var items = document.querySelectorAll('.sidebar__item[data-tab]');
  items.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-tab');
      cargarTab(tab);
      /* En móvil: cerrar sidebar al seleccionar tab */
      cerrarSidebarMobile();
    });
  });
}

function cargarTab(tab) {
  tabActual = tab;

  /* Actualizar clases activas en sidebar */
  document.querySelectorAll('.sidebar__item[data-tab]').forEach(function (btn) {
    var esActivo = btn.getAttribute('data-tab') === tab;
    btn.classList.toggle('sidebar__item--activo', esActivo);
  });

  /* Ocultar todos los paneles, mostrar el seleccionado */
  document.querySelectorAll('.tab-panel').forEach(function (panel) {
    panel.style.display = 'none';
  });
  var panelActivo = document.getElementById('tab-' + tab);
  if (panelActivo) panelActivo.style.display = '';

  /* Actualizar título en header móvil */
  var headerTitulo = document.getElementById('headerTitulo');
  if (headerTitulo) headerTitulo.textContent = TITULOS_TABS[tab] || tab;

  /* Cargar contenido del tab */
  if (tab === 'dashboard')  cargarDashboard();
  if (tab === 'destinos')   cargarDestinos();
  if (tab === 'editor')     cargarEditorSitio();
  if (tab === 'mensajes')   cargarMensajes();
  if (tab === 'config')     cargarConfig();
}

/* ============================================================
   SIDEBAR MÓVIL — hamburger
============================================================ */
function bindSidebarMobile() {
  var btnMenu  = document.getElementById('btnMenuSidebar');
  var overlay  = document.getElementById('sidebarOverlay');
  var sidebar  = document.getElementById('sidebar');

  if (btnMenu) {
    btnMenu.addEventListener('click', function () {
      sidebar.classList.toggle('sidebar--abierto');
      overlay.classList.toggle('sidebar-overlay--visible');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', cerrarSidebarMobile);
  }
}

function cerrarSidebarMobile() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('sidebar--abierto');
  if (overlay) overlay.classList.remove('sidebar-overlay--visible');
}

/* ============================================================
   UTILIDADES DE FECHA
============================================================ */
function actualizarFechaHeader() {
  var el = document.getElementById('headerFecha');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
}

/* ============================================================
   TAB: DASHBOARD
============================================================ */
function cargarDashboard() {
  actualizarStats();
  renderChartLinea();
  renderDonut();
  renderClicsPorDestino();
}

/* ===== DATOS DEMO: siembra visitas históricas para el gráfico ===== */
function sembrarVisitasDemo() {
  var visitas = {};
  try { visitas = JSON.parse(localStorage.getItem('em_visitas')) || {}; } catch (e) {}

  var claves = Object.keys(visitas);
  if (claves.length > 1) return;

  /* Genera entre 3 y 18 visitas para cada uno de los últimos 30 días */
  var hoy = new Date();
  for (var i = 30; i >= 1; i--) {
    var d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    var clave = d.toISOString().split('T')[0];
    if (!visitas[clave]) {
      /* Simular curva realista con algo de variación */
      var base = Math.floor(Math.random() * 12) + 4;
      var weekend = (d.getDay() === 0 || d.getDay() === 6) ? 1.5 : 1;
      visitas[clave] = Math.round(base * weekend);
    }
  }
  localStorage.setItem('em_visitas', JSON.stringify(visitas));
}

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

function sumarClics() {
  var clics = {};
  try { clics = JSON.parse(localStorage.getItem('em_clics')) || {}; } catch (e) {}
  var total = 0;
  var keys  = Object.keys(clics);
  for (var i = 0; i < keys.length; i++) { total += (clics[keys[i]] || 0); }
  return total;
}

function actualizarStats() {
  var destinos  = obtenerDestinosAdmin();
  var contactos = obtenerContactos();

  var ids = ['statHoy', 'statSemana', 'statMes', 'statClicTotal', 'statContactos', 'statDestinos'];
  var vals = [
    sumarVisitas(1).toLocaleString(),
    sumarVisitas(7).toLocaleString(),
    sumarVisitas(30).toLocaleString(),
    sumarClics().toLocaleString(),
    contactos.length,
    destinos.filter(function (d) { return d.activo; }).length
  ];

  ids.forEach(function (id, i) {
    var el = document.getElementById(id);
    if (el) el.textContent = vals[i];
  });
}

/* ===== SVG LINE CHART — 30 días ===== */
function renderChartLinea() {
  var contenedor = document.getElementById('chartLineWrap');
  if (!contenedor) return;

  /* Obtener datos de GA4 si hay proxy configurado */
  var proxyURL = (typeof ADMIN_CONFIG !== 'undefined') ? ADMIN_CONFIG.GAS_PROXY_URL : null;
  if (proxyURL) {
    fetchGA4Lineа(proxyURL, contenedor);
    return;
  }

  /* Fallback: datos de localStorage */
  var datos = obtenerDatos30d();
  renderSVGLinea(contenedor, datos, false);
}

function fetchGA4Lineа(proxyURL, contenedor) {
  var url = proxyURL + '?report=pageviews30d&secret=' + GAS_SECRET;
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function () {
    if (req.readyState !== 4) return;
    if (req.status === 200) {
      try {
        var resp = JSON.parse(req.responseText);
        if (resp.rows && resp.rows.length) {
          var datos = resp.rows.map(function (r) {
            return { fecha: r.date, valor: r.pageviews };
          });
          renderSVGLinea(contenedor, datos, true);

          /* Actualizar también el donut con datos reales */
          fetchGA4Donut(proxyURL);
          return;
        }
      } catch (err) { /* noop */ }
    }
    /* Si falla, usar localStorage */
    var datos = obtenerDatos30d();
    renderSVGLinea(contenedor, datos, false);
  };
  req.onerror = function () {
    var datos = obtenerDatos30d();
    renderSVGLinea(contenedor, datos, false);
  };
  req.send();
}

function obtenerDatos30d() {
  var visitas = {};
  try { visitas = JSON.parse(localStorage.getItem('em_visitas')) || {}; } catch (e) {}

  var datos = [];
  var hoy   = new Date();
  for (var i = 29; i >= 0; i--) {
    var d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    var clave = d.toISOString().split('T')[0];
    datos.push({ fecha: clave, valor: visitas[clave] || 0 });
  }
  return datos;
}

function renderSVGLinea(contenedor, datos, esReal) {
  /* Actualizar etiqueta de fuente */
  var fuenteEl = document.getElementById('chartFuente');
  if (fuenteEl) {
    fuenteEl.textContent = esReal ? 'GA4 Real' : 'LocalStorage';
    fuenteEl.className   = esReal ? 'chart-fuente chart-fuente--real' : 'chart-fuente';
  }

  /* Dimensiones del SVG */
  var W   = 560;
  var H   = 130;
  var PAD = { top: 14, right: 12, bottom: 26, left: 32 };
  var w   = W - PAD.left - PAD.right;
  var h   = H - PAD.top  - PAD.bottom;

  var valores = datos.map(function (d) { return d.valor; });
  var maximo  = Math.max.apply(null, valores) || 1;
  var n       = datos.length;

  /* Calcular puntos */
  function px(i) { return PAD.left + (i / (n - 1)) * w; }
  function py(v) { return PAD.top  + h - (v / maximo) * h; }

  /* Línea y área */
  var pts    = datos.map(function (d, i) { return px(i) + ',' + py(d.valor); }).join(' ');
  var primX  = px(0);
  var ultX   = px(n - 1);
  var baseY  = PAD.top + h;

  var svgLines = '';
  /* Líneas de grilla horizontales */
  var niveles = [0, 0.25, 0.5, 0.75, 1];
  niveles.forEach(function (niv) {
    var y = PAD.top + h - niv * h;
    var val = Math.round(niv * maximo);
    svgLines += (
      '<line x1="' + PAD.left + '" y1="' + y + '" x2="' + (W - PAD.right) + '" y2="' + y + '" ' +
      'stroke="rgba(255,255,255,0.05)" stroke-width="1"/>' +
      '<text x="' + (PAD.left - 5) + '" y="' + (y + 4) + '" ' +
      'font-size="9" fill="rgba(255,255,255,0.30)" text-anchor="end">' + val + '</text>'
    );
  });

  /* Etiquetas del eje X (cada 5 días) */
  datos.forEach(function (d, i) {
    if (i % 5 === 0 || i === n - 1) {
      var fecha  = d.fecha.substring(5); /* MM-DD */
      var x      = px(i);
      svgLines += (
        '<text x="' + x + '" y="' + (H - 8) + '" ' +
        'font-size="9" fill="rgba(255,255,255,0.35)" text-anchor="middle">' + fecha + '</text>'
      );
    }
  });

  /* Marcadores del día de hoy (último punto) */
  var hoyX = px(n - 1);
  var hoyY = py(datos[n - 1].valor);

  var svg = (
    '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">' +
      /* Definición del gradiente */
      '<defs>' +
        '<linearGradient id="lineaGrad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%"   stop-color="rgba(0,188,212,0.38)"/>' +
          '<stop offset="100%" stop-color="rgba(0,188,212,0.00)"/>' +
        '</linearGradient>' +
      '</defs>' +
      /* Líneas de grilla y etiquetas */
      svgLines +
      /* Área bajo la curva */
      '<polygon points="' + primX + ',' + baseY + ' ' + pts + ' ' + ultX + ',' + baseY + '" ' +
      'fill="url(#lineaGrad)"/>' +
      /* Línea de la curva */
      '<polyline points="' + pts + '" ' +
      'fill="none" stroke="rgba(0,188,212,0.90)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
      /* Punto del último día */
      '<circle cx="' + hoyX + '" cy="' + hoyY + '" r="4" fill="#FF6B6B" stroke="#fff" stroke-width="1.5"/>' +
    '</svg>'
  );

  contenedor.innerHTML = svg;
}

/* ===== SVG DONUT CHART — dispositivos ===== */
function renderDonut() {
  /* Datos demo de dispositivos */
  var datos = [
    { label: 'Móvil',     pct: 62, color: '#00BCD4' },
    { label: 'Desktop',   pct: 30, color: '#FF6B6B' },
    { label: 'Tablet',    pct: 8,  color: '#FFB300' }
  ];
  renderSVGDonut(datos);
}

function fetchGA4Donut(proxyURL) {
  var url = proxyURL + '?report=devices&secret=' + GAS_SECRET;
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function () {
    if (req.readyState !== 4 || req.status !== 200) return;
    try {
      var resp  = JSON.parse(req.responseText);
      if (!resp.rows || !resp.rows.length) return;

      var total = resp.rows.reduce(function (acc, r) { return acc + r.sessions; }, 0) || 1;
      var colors = { mobile: '#00BCD4', desktop: '#FF6B6B', tablet: '#FFB300' };
      var labels = { mobile: 'Móvil', desktop: 'Desktop', tablet: 'Tablet' };

      var datos = resp.rows.map(function (r) {
        var dev = r.device.toLowerCase();
        return {
          label: labels[dev] || r.device,
          pct:   Math.round((r.sessions / total) * 100),
          color: colors[dev] || '#AB47BC'
        };
      });
      renderSVGDonut(datos);
    } catch (err) { /* noop */ }
  };
  req.send();
}

function renderSVGDonut(datos) {
  var wrap    = document.getElementById('donutWrap');
  var leyenda = document.getElementById('donutLeyenda');
  if (!wrap || !leyenda) return;

  var R  = 54;   /* radio del círculo */
  var CX = 70;   /* centro X */
  var CY = 70;   /* centro Y */
  var CIRC = 2 * Math.PI * R;

  var segmentos = '';
  var offset    = 0;

  datos.forEach(function (d) {
    var largo = (d.pct / 100) * CIRC;
    var gap   = 2;
    segmentos += (
      '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" ' +
      'fill="none" stroke="' + d.color + '" stroke-width="14" ' +
      'stroke-dasharray="' + (largo - gap) + ' ' + (CIRC - largo + gap) + '" ' +
      'stroke-dashoffset="' + (-offset) + '" ' +
      'stroke-linecap="round" ' +
      'transform="rotate(-90 ' + CX + ' ' + CY + ')"/>'
    );
    offset += largo;
  });

  wrap.innerHTML = (
    '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">' +
      /* Círculo de fondo */
      '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="14"/>' +
      segmentos +
    '</svg>'
  );

  leyenda.innerHTML = datos.map(function (d) {
    return (
      '<div class="donut-leyenda-item">' +
        '<div class="donut-leyenda-dot" style="background:' + d.color + '"></div>' +
        '<span class="donut-leyenda-label">' + esc(d.label) + '</span>' +
        '<span class="donut-leyenda-pct">' + d.pct + '%</span>' +
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
  var total    = sumarClics() || 1;

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

/* ============================================================
   TAB: DESTINOS
============================================================ */
function cargarDestinos() {
  renderTablaDestinos();
  actualizarBadgeDestinos();
}

function renderTablaDestinos() {
  var tbody = document.getElementById('tablaDestinos');
  if (!tbody) return;
  var lista = obtenerDestinosAdmin();

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="tabla-vacia">No hay destinos. Agrégalos con "+ Nuevo destino".</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(function (d) {
    return (
      '<tr>' +
        '<td data-label="Destino"><strong>' + esc(d.nombre_es) + '</strong></td>' +
        '<td data-label="Tipo"><span class="admin-badge admin-badge--' + esc(d.tipo) + '">' + esc(d.tipo) + '</span></td>' +
        '<td data-label="Precio">' + esc(d.precio) + '</td>' +
        '<td data-label="Estado">' +
          '<button class="toggle-btn ' + (d.activo ? 'toggle-btn--on' : '') + '" ' +
          'onclick="toggleActivo(' + d.id + ')">' +
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

function actualizarBadgeDestinos() {
  var badge  = document.getElementById('sidebarBadgeDestinos');
  if (!badge) return;
  var activos = obtenerDestinosAdmin().filter(function (d) { return !d.activo; }).length;
  if (activos > 0) {
    badge.textContent    = activos;
    badge.style.display  = 'inline-flex';
  } else {
    badge.style.display  = 'none';
  }
}

/* ===== SLIDE PANEL BIND ===== */
function bindSlidePanel() {
  var btnNuevo    = document.getElementById('btnNuevoDestino');
  var cerrar1     = document.getElementById('slidePanelCerrar');
  var cerrar2     = document.getElementById('slidePanelCancelar');
  var overlay     = document.getElementById('slidePanelOverlay');

  if (btnNuevo)  btnNuevo.addEventListener('click',  abrirSlideNuevo);
  if (cerrar1)   cerrar1.addEventListener('click',   cerrarSlide);
  if (cerrar2)   cerrar2.addEventListener('click',   cerrarSlide);
  if (overlay)   overlay.addEventListener('click',   cerrarSlide);
}

function abrirSlideNuevo() {
  destinoEditandoId = null;
  document.getElementById('formDestino').reset();
  document.getElementById('slidePanelTitulo').textContent = 'Nuevo destino';
  abrirSlide();
}

function abrirSlide() {
  document.getElementById('slidePanel').classList.add('slide-panel--abierto');
  document.getElementById('slidePanelOverlay').classList.add('slide-panel-overlay--visible');
  document.body.style.overflow = 'hidden';
}

function cerrarSlide() {
  document.getElementById('slidePanel').classList.remove('slide-panel--abierto');
  document.getElementById('slidePanelOverlay').classList.remove('slide-panel-overlay--visible');
  document.body.style.overflow = '';
}

/* ===== CRUD DESTINOS ===== */
function bindFormDestino() {
  var form = document.getElementById('formDestino');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var lista = obtenerDestinosAdmin();
    var v     = function (name) {
      var el = form.querySelector('[name="' + name + '"]');
      return el ? el.value.trim() : '';
    };

    var datos = {
      id:               destinoEditandoId || Date.now(),
      nombre_es:        v('nombre_es'),
      nombre_en:        v('nombre_en'),
      descripcion_es:   v('desc_es'),
      descripcion_en:   v('desc_en'),
      foto:             v('foto'),
      lat:              parseFloat(v('lat'))  || 0,
      lng:              parseFloat(v('lng'))  || 0,
      dificultad_es:    v('dificultad_es'),
      dificultad_en:    v('dificultad_en'),
      dificultad_clase: v('dificultad_clase'),
      precio:           v('precio'),
      horarios:         v('horarios'),
      tipo:             v('tipo'),
      tipo_es:          v('tipo_es'),
      tipo_en:          v('tipo_en'),
      web_oficial:      v('web_oficial'),
      activo:           true
    };

    if (destinoEditandoId !== null) {
      /* Conservar campos que no se editan en el panel (galería, reseñas, etc.) */
      var original = lista.filter(function (d) { return d.id === destinoEditandoId; })[0] || {};
      datos.galeria           = original.galeria           || [datos.foto];
      datos.descripcion_larga_es = original.descripcion_larga_es || '';
      datos.descripcion_larga_en = original.descripcion_larga_en || '';
      datos.como_llegar_es    = original.como_llegar_es    || '';
      datos.como_llegar_en    = original.como_llegar_en    || '';
      datos.telefono          = original.telefono          || '';
      datos.mejor_epoca       = original.mejor_epoca       || '';
      datos.google_maps_url   = original.google_maps_url   || '';
      datos.apple_maps_url    = original.apple_maps_url    || '';
      datos.resenas_url       = original.resenas_url       || '';
      datos.resenas           = original.resenas           || [];
      lista = lista.map(function (d) { return d.id === destinoEditandoId ? datos : d; });
    } else {
      datos.galeria = datos.foto ? [datos.foto] : [];
      lista.push(datos);
    }

    guardarDestinos(lista);
    renderTablaDestinos();
    actualizarBadgeDestinos();
    cerrarSlide();
    toast('Destino guardado correctamente ✓');
  });
}

function editarDestino(id) {
  var d = obtenerDestinosAdmin().filter(function (x) { return x.id === id; })[0];
  if (!d) return;
  destinoEditandoId = id;

  var form = document.getElementById('formDestino');
  var set  = function (name, val) {
    var el = form.querySelector('[name="' + name + '"]');
    if (el) el.value = val || '';
  };

  set('nombre_es',       d.nombre_es);
  set('nombre_en',       d.nombre_en);
  set('desc_es',         d.descripcion_es);
  set('desc_en',         d.descripcion_en);
  set('foto',            d.foto);
  set('lat',             d.lat);
  set('lng',             d.lng);
  set('dificultad_es',   d.dificultad_es);
  set('dificultad_en',   d.dificultad_en);
  set('dificultad_clase',d.dificultad_clase);
  set('precio',          d.precio);
  set('horarios',        d.horarios);
  set('tipo',            d.tipo);
  set('tipo_es',         d.tipo_es);
  set('tipo_en',         d.tipo_en);
  set('web_oficial',     d.web_oficial);

  document.getElementById('slidePanelTitulo').textContent = 'Editar destino';
  abrirSlide();
}

function eliminarDestino(id) {
  if (!confirm('¿Eliminar este destino? Esta acción no se puede deshacer.')) return;
  guardarDestinos(obtenerDestinosAdmin().filter(function (d) { return d.id !== id; }));
  renderTablaDestinos();
  actualizarBadgeDestinos();
  actualizarStats();
  toast('Destino eliminado');
}

function toggleActivo(id) {
  guardarDestinos(obtenerDestinosAdmin().map(function (d) {
    if (d.id === id) d.activo = !d.activo;
    return d;
  }));
  renderTablaDestinos();
  actualizarBadgeDestinos();
  actualizarStats();
}

/* ============================================================
   TAB: EDITOR SITIO
============================================================ */
var CONFIG_DEFAULTS = {
  hero_titulo_es:     'EXPLORA MIAMI',
  hero_titulo_en:     'EXPLORE MIAMI',
  hero_tagline_es:    'Tu próxima aventura empieza aquí',
  hero_tagline_en:    'Your next adventure starts here',
  intro_sub_es:       'La guía definitiva para aventureros en South Florida',
  intro_sub_en:       'The ultimate guide for adventurers in South Florida',
  destinos_titulo_es: 'Destinos en Miami',
  destinos_sub_es:    'Descubre las mejores experiencias outdoor de South Florida',
  color_acento:       '#00BCD4',
  email_contacto:     '',
  telefono:           ''
};

function cargarEditorSitio() {
  var config = obtenerConfigSitio();

  /* Rellenar los campos del formulario */
  var ids = Object.keys(CONFIG_DEFAULTS);
  ids.forEach(function (key) {
    var el = document.getElementById('cfg_' + key);
    if (el) el.value = config[key] !== undefined ? config[key] : CONFIG_DEFAULTS[key];
  });
}

function bindEditorSitio() {
  /* Botón guardar (hay dos: header + footer del form) */
  var guardar1 = document.getElementById('btnGuardarConfig');
  var guardar2 = document.getElementById('btnGuardarConfig2');
  var reset    = document.getElementById('btnResetConfig');
  var refresh  = document.getElementById('btnRefreshPreview');

  if (guardar1) guardar1.addEventListener('click', guardarConfigSitio);
  if (guardar2) guardar2.addEventListener('click', guardarConfigSitio);
  if (reset)    reset.addEventListener('click',    resetConfigSitio);
  if (refresh)  refresh.addEventListener('click',  refrescarPreview);

  /* Actualizar preview en tiempo real al cambiar cualquier campo */
  var inputs = document.querySelectorAll('#tab-editor input, #tab-editor textarea, #tab-editor select');
  inputs.forEach(function (el) {
    el.addEventListener('change', function () {
      /* Solo refrescar si la pestaña de editor está activa */
      if (tabActual === 'editor') refrescarPreview();
    });
  });
}

function guardarConfigSitio() {
  var config = {};
  var ids = Object.keys(CONFIG_DEFAULTS);
  ids.forEach(function (key) {
    var el = document.getElementById('cfg_' + key);
    if (el) config[key] = el.value.trim();
  });
  localStorage.setItem('em_config_sitio', JSON.stringify(config));
  refrescarPreview();
  toast('Configuración guardada. Recarga el sitio para ver cambios ✓');
}

function resetConfigSitio() {
  if (!confirm('¿Restaurar configuración por defecto? Los cambios personalizados se perderán.')) return;
  localStorage.removeItem('em_config_sitio');
  cargarEditorSitio();
  refrescarPreview();
  toast('Configuración restaurada a valores por defecto');
}

function refrescarPreview() {
  var iframe = document.getElementById('previewFrame');
  if (!iframe) return;
  /* Recargar el iframe para aplicar la config guardada en localStorage */
  iframe.src = iframe.src.split('?')[0] + '?t=' + Date.now();
}

function obtenerConfigSitio() {
  try { return JSON.parse(localStorage.getItem('em_config_sitio')) || {}; }
  catch (e) { return {}; }
}

/* ============================================================
   TAB: MENSAJES
============================================================ */
function bindMensajes() {
  var btnCSV = document.getElementById('btnExportarCSV');
  if (btnCSV) btnCSV.addEventListener('click', exportarContactos);
}

function cargarMensajes() {
  var contenedor = document.getElementById('bandejaMensajes');
  if (!contenedor) return;

  var lista = obtenerContactos().slice().reverse(); /* más recientes primero */

  /* Actualizar badge */
  var badge = document.getElementById('badgeMensajes');
  var noLeidos = contarNoLeidos();
  if (badge) {
    badge.textContent   = noLeidos;
    badge.style.display = noLeidos > 0 ? 'inline-flex' : 'none';
  }

  actualizarBadgeMensajesSidebar();

  if (!lista.length) {
    contenedor.innerHTML = '<p class="tabla-vacia">No hay mensajes recibidos aún. Los formularios enviados desde el sitio aparecerán aquí.</p>';
    return;
  }

  var servicioLabel = { listing: 'Listing en directorio', web: 'Página web', pub: 'Publicidad', amazon: 'Amazon' };
  var colores = ['#00BCD4', '#FF6B6B', '#FFB300', '#7CB342', '#9C27B0'];

  contenedor.innerHTML = lista.map(function (c, idx) {
    var fecha   = new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    var servicio = servicioLabel[c.servicio] || c.servicio || '—';
    var inicial  = (c.nombre || '?')[0].toUpperCase();
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

  /* Marcar como leídos al ver la bandeja */
  marcarLeidos();
}

function contarNoLeidos() {
  var ultimaLectura = localStorage.getItem('em_ultima_lectura_admin') || '1970-01-01T00:00:00Z';
  return obtenerContactos().filter(function (c) { return c.fecha && c.fecha > ultimaLectura; }).length;
}

function marcarLeidos() {
  localStorage.setItem('em_ultima_lectura_admin', new Date().toISOString());
  actualizarBadgeMensajesSidebar();
}

function actualizarBadgeMensajesSidebar() {
  var badge = document.getElementById('sidebarBadgeMensajes');
  if (!badge) return;
  var n = contarNoLeidos();
  badge.textContent   = n;
  badge.style.display = n > 0 ? 'inline-flex' : 'none';
}

function exportarContactos() {
  var lista = obtenerContactos();
  if (!lista.length) { toast('No hay contactos para exportar'); return; }

  var cab   = ['Fecha', 'Nombre', 'Empresa', 'Email', 'Teléfono', 'Servicio', 'Mensaje'];
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

/* ============================================================
   TAB: CONFIGURACIÓN
============================================================ */
function bindConfig() {
  var btnLimpiar = document.getElementById('btnLimpiarDemo');
  if (btnLimpiar) {
    btnLimpiar.addEventListener('click', function () {
      if (!confirm('¿Limpiar todos los datos demo de visitas? Esto no afecta destinos ni mensajes.')) return;
      localStorage.removeItem('em_visitas');
      sembrarVisitasDemo();
      toast('Datos demo limpiados y regenerados');
    });
  }
}

function cargarConfig() {
  /* Estado de GA4 */
  var gaEstado   = document.getElementById('gaEstado');
  var proxyURL   = (typeof ADMIN_CONFIG !== 'undefined') ? ADMIN_CONFIG.GAS_PROXY_URL : null;
  if (gaEstado) {
    gaEstado.textContent = proxyURL ? '🟢 Proxy configurado' : '⚪ No configurado';
  }

  /* Intentos fallidos de login */
  var intentosEl = document.getElementById('statIntentos');
  if (intentosEl) {
    var log      = obtenerLogAccesos();
    var fallos   = log.filter(function (r) { return r.tipo === 'fallo'; }).length;
    intentosEl.textContent = fallos + ' en el historial';
  }

  /* Info del sistema */
  var setVal = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
  setVal('infoVersion',     (typeof ADMIN_CONFIG !== 'undefined') ? ADMIN_CONFIG.VERSION : '2.0.0');
  setVal('infoGAId',        (typeof ADMIN_CONFIG !== 'undefined') ? ADMIN_CONFIG.GA4_MEASUREMENT_ID : '—');
  setVal('infoProxy',       proxyURL ? 'Configurado' : 'No configurado');
  setVal('infoDestinos',    obtenerDestinosAdmin().length + ' destinos');
  setVal('infoFormularios', obtenerContactos().length + ' formularios');
}

/* ============================================================
   ACCESO A DATOS (localStorage)
============================================================ */
function obtenerDestinosAdmin() {
  try {
    var d = JSON.parse(localStorage.getItem('em_destinos'));
    return (d && d.length) ? d : [];
  } catch (e) { return []; }
}

function obtenerContactos() {
  try { return JSON.parse(localStorage.getItem('em_contactos')) || []; }
  catch (e) { return []; }
}

function guardarDestinos(destinos) {
  localStorage.setItem('em_destinos',         JSON.stringify(destinos));
  localStorage.setItem('em_destinos_version', String(DESTINOS_VERSION));
}

/* ============================================================
   NOTIFICACIÓN TOAST
============================================================ */
function toast(msg) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('toast--visible');
  clearTimeout(el._timer);
  el._timer = setTimeout(function () { el.classList.remove('toast--visible'); }, 3200);
}

/* ============================================================
   ESCAPE HTML — prevención de XSS
============================================================ */
function esc(str) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(String(str || '')));
  return d.innerHTML;
}
