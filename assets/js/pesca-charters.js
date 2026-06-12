/* ============================================================
   305 RUTA MIAMI — Charters reales en el hub /pesca (Fase 4)
   Lee public.negocios via Supabase REST (rol anon) y pinta
   tarjetas en la seccion #nautico reutilizando clases existentes
   (.rel-card de destino.css + .pesca-salidas de pesca.css).
   FALLBACK HONESTO: si el fetch falla o llegan 0 filas, NO se
   toca el DOM — queda el estado vacio actual (.dato-card--tip).
   ES5 puro (var/function). La anon key es publica por diseño:
   la seguridad real es RLS + grants minimos en el backend.
   ============================================================ */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://tbmnulmykmsjzdwnlewf.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_7iiH9uWnkqeLJcscmpZMiA_1-dBigTQ';
  var ENDPOINT = SUPABASE_URL +
    '/rest/v1/negocios' +
    '?categoria_id=eq.pesca&activo=eq.true' +
    '&select=nombre,zona,descripcion_es,descripcion_en,web,atiende_es' +
    '&order=destacado.desc,nombre.asc';

  /* Escapa TODO valor dinamico antes de insertarlo en HTML (anti-XSS).
     Los datos vienen de una base de datos: no se confia en ninguno. */
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* Solo se enlaza a webs http(s); cualquier otro esquema se descarta. */
  function webSegura(url) {
    return (typeof url === 'string' && /^https?:\/\//i.test(url)) ? url : '';
  }

  /* Una tarjeta de charter sin foto: .rel-card con solo .rel-card__body. */
  function tarjetaCharter(ch) {
    var cuerpo = '<div class="rel-card__body">';
    if (ch.atiende_es === true) {
      cuerpo += '<span class="rel-card__badge rel-card__badge--mar">' +
        '<span class="lang-es">Atención en español</span>' +
        '<span class="lang-en">Spanish-speaking</span></span>';
    }
    cuerpo += '<h3 class="rel-card__titulo">' + esc(ch.nombre) + '</h3>';
    if (ch.zona) {
      cuerpo += '<p class="rel-card__meta">⚓ ' + esc(ch.zona) + '</p>';
    }
    cuerpo += '<p class="rel-card__meta">' +
      '<span class="lang-es">' + esc(ch.descripcion_es) + '</span>' +
      '<span class="lang-en">' + esc(ch.descripcion_en) + '</span></p>';
    cuerpo += '</div>';

    var web = webSegura(ch.web);
    if (web) {
      return '<a class="rel-card" href="' + esc(web) +
        '" target="_blank" rel="noopener">' + cuerpo + '</a>';
    }
    return '<div class="rel-card">' + cuerpo + '</div>';
  }

  /* Sustituye el estado vacio por el encabezado curado + grid de tarjetas.
     Conserva debajo el enlace a anunciantes, como en el estado vacio. */
  function render(lista) {
    var seccion = document.getElementById('nautico');
    if (!seccion) { return; }
    var wrap = seccion.querySelector('.pesca-wrap');
    if (!wrap) { return; }

    /* El wrap angosto era para la tarjeta unica; el grid usa el ancho normal. */
    wrap.classList.remove('pesca-wrap--angosto');

    var html = '<div class="pesca-section__head">' +
      '<span class="pesca-section__eyebrow">' +
        '<span class="lang-es">Selección curada — no patrocinados</span>' +
        '<span class="lang-en">Curated selection — not sponsored</span></span>' +
      '<h2 class="pesca-section__titulo">' +
        '<span class="lang-es">Charters, botes y jetski</span>' +
        '<span class="lang-en">Charters, boats &amp; jet ski</span></h2>' +
      '</div>';

    html += '<div class="pesca-salidas">';
    var i;
    for (i = 0; i < lista.length; i++) {
      html += tarjetaCharter(lista[i]);
    }
    html += '</div>';

    /* Enlace a anunciantes conservado debajo del grid (mismo estilo que antes). */
    html += '<p style="margin-top:1.4rem">' +
      '<a href="anunciantes.html" style="font-weight:600;color:var(--turquesa-oscuro);text-decoration:none">' +
        '<span class="lang-es">¿Tienes un charter? Aparece aquí →</span>' +
        '<span class="lang-en">Run a charter? Get listed here →</span></a></p>';

    wrap.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* Navegador sin fetch -> se queda el estado vacio honesto. */
    if (!window.fetch) { return; }
    window.fetch(ENDPOINT, { headers: { apikey: SUPABASE_KEY } })
      .then(function (resp) {
        if (!resp.ok) { throw new Error('HTTP ' + resp.status); }
        return resp.json();
      })
      .then(function (datos) {
        if (datos && datos.length > 0) { render(datos); }
        /* 0 filas -> no se toca nada: estado vacio honesto. */
      })
      .catch(function () {
        /* Error de red/API -> no se toca nada: estado vacio honesto. */
      });
  });
})();
