/* ============================================
   CIRCLE MENU — Menú circular flotante ES5
   Uso: initCircleMenu(wrapperId, items)
   items = [{ icon, label, href, external, onclick }]
   ============================================ */

(function () {
  'use strict';

  /* ─── Calcula posición en arco izquierdo (120° a 240° del eje X positivo) ─── */
  function pointOnArc(index, total, radius) {
    var angleStartDeg = 120;
    var angleEndDeg   = 240;
    var angle;
    if (total <= 1) {
      angle = Math.PI; /* directamente a la izquierda */
    } else {
      var deg = angleStartDeg + (angleEndDeg - angleStartDeg) * index / (total - 1);
      angle = deg * Math.PI / 180;
    }
    /* Nota: negamos Y porque en CSS el eje Y crece hacia abajo */
    return {
      x: Math.round(radius * Math.cos(angle)),
      y: -Math.round(radius * Math.sin(angle))
    };
  }

  /* ─── Aplica transform de posición abierta a un item ─── */
  function abrirItem(el, x, y, delay) {
    el.style.transitionDelay = delay + 'ms';
    el.style.transform =
      'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px) scale(1)';
  }

  /* ─── Regresa el item al centro (cerrado) ─── */
  function cerrarItem(el, delay) {
    el.style.transitionDelay = delay + 'ms';
    el.style.transform = 'translate(-50%, -50%) scale(0)';
  }

  /* ─── SVG: icono de cuadrícula (estado cerrado) ─── */
  var SVG_OPEN =
    '<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" ' +
    'aria-hidden="true" focusable="false">' +
    '<circle cx="4.5" cy="4.5" r="1.8"/>' +
    '<circle cx="9" cy="4.5" r="1.8"/>' +
    '<circle cx="13.5" cy="4.5" r="1.8"/>' +
    '<circle cx="4.5" cy="9" r="1.8"/>' +
    '<circle cx="9" cy="9" r="1.8"/>' +
    '<circle cx="13.5" cy="9" r="1.8"/>' +
    '<circle cx="4.5" cy="13.5" r="1.8"/>' +
    '<circle cx="9" cy="13.5" r="1.8"/>' +
    '<circle cx="13.5" cy="13.5" r="1.8"/>' +
    '</svg>';

  /* ─── SVG: X (estado abierto) ─── */
  var SVG_CLOSE =
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
    'aria-hidden="true" focusable="false">' +
    '<path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round"/>' +
    '</svg>';

  /* ─── Función pública principal ─── */
  window.initCircleMenu = function (wrapperId, items) {
    var wrap = document.getElementById(wrapperId);
    if (!wrap) return;

    var radio       = 115; /* px — radio del arco */
    var estaAbierto = false;

    /* ── Botón trigger ── */
    var trigger = document.createElement('button');
    trigger.className = 'cm-trigger';
    trigger.setAttribute('aria-label', 'Menú de navegación rápida');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('type', 'button');
    trigger.innerHTML =
      '<span class="cm-trigger-icon cm-icon-open">'  + SVG_OPEN  + '</span>' +
      '<span class="cm-trigger-icon cm-icon-close">' + SVG_CLOSE + '</span>';
    wrap.appendChild(trigger);

    /* ── Crear items ── */
    var elems     = [];
    var positions = [];

    items.forEach(function (item, i) {
      var pos = pointOnArc(i, items.length, radio);
      positions.push(pos);

      var el;
      if (item.href) {
        el = document.createElement('a');
        el.href = item.href;
        if (item.external) {
          el.target = '_blank';
          el.rel    = 'noopener noreferrer';
        }
      } else {
        el = document.createElement('button');
        el.type = 'button';
      }

      el.className = 'cm-item';
      el.setAttribute('aria-label', item.label);
      el.setAttribute('tabindex', '-1'); /* solo accesible cuando abierto */

      if (item.onclick) {
        el.setAttribute('onclick', item.onclick);
      }

      /* Texto del icono + etiqueta tooltip */
      el.innerHTML =
        '<span aria-hidden="true">' + item.icon + '</span>' +
        '<span class="cm-label">' + item.label + '</span>';

      /* Posición inicial: centro, invisible */
      el.style.transform       = 'translate(-50%, -50%) scale(0)';
      el.style.transitionDelay = '0ms';

      wrap.appendChild(el);
      elems.push(el);
    });

    /* ── Abrir menú ── */
    function abrir() {
      estaAbierto = true;
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');

      elems.forEach(function (el, i) {
        el.setAttribute('tabindex', '0');
        abrirItem(el, positions[i].x, positions[i].y, i * 45);
      });
    }

    /* ── Cerrar menú ── */
    function cerrar() {
      estaAbierto = false;
      wrap.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');

      elems.forEach(function (el, i) {
        el.setAttribute('tabindex', '-1');
        /* stagger inverso para el cierre */
        cerrarItem(el, (elems.length - 1 - i) * 30);
      });
    }

    /* ── Toggle ── */
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (estaAbierto) { cerrar(); } else { abrir(); }
    });

    /* ── Cierra al hacer clic en un item ── */
    elems.forEach(function (el) {
      el.addEventListener('click', function () {
        /* pequeña demora para que la navegación ocurra primero */
        setTimeout(cerrar, 80);
      });
    });

    /* ── Cierra con ESC ── */
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && estaAbierto) {
        cerrar();
        trigger.focus();
      }
    });

    /* ── Cierra al hacer clic fuera ── */
    document.addEventListener('click', function () {
      if (estaAbierto) { cerrar(); }
    });

    /* Evita que el clic dentro del wrap propague al document */
    wrap.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  };

})();
