/* Claves gestionadas por el admin (assets/js/admin.js)
   No eliminar aunque no aparezcan en HTML directamente:
   hero_titulo, hero_tagline, hero_btn_destinos, hero_btn_mapa,
   hero_scroll, form_*, trabaja_* */

/* =========================================
   305 RUTA MIAMI — i18n.js
   Sistema de internacionalización ES / EN
   Técnica: clase CSS lang-es / lang-en en <html>
   + data-i18n para texto estático
========================================= */

/* ===== DICCIONARIO DE TRADUCCIONES ===== */
var TEXTOS = {
  es: {
    /* Navegación */
    nav_inicio:   'Inicio',
    nav_destinos: 'Destinos',
    nav_mapa:     'Mapa',
    nav_trabaja:  'Trabaja con nosotros',
    nav_blog:     'Blog',
    nav_empresas: 'Para empresas',

    /* Hero */
    hero_titulo:       '305 RUTA MIAMI',
    hero_tagline:      'Tu próxima aventura empieza aquí',
    hero_btn_destinos: 'Ver destinos',
    hero_btn_mapa:     'Ver mapa',
    hero_scroll:       'Desliza',

    /* Intro */
    intro_titulo:    '¿Por qué 305 Ruta Miami?',
    intro_sub:       'La guía definitiva para aventureros en South Florida',
    intro_c1_titulo: 'Destinos Verificados',
    intro_c1_texto:  'Aventuras verificadas en los mejores rincones de Miami y sus alrededores.',
    intro_c2_titulo: 'Guías Locales',
    intro_c2_texto:  'Expertos que conocen cada sendero, bahía y arrecife del sur de Florida.',
    intro_c3_titulo: 'Naturaleza Pura',
    intro_c3_texto:  'Desde los Everglades hasta South Beach — aventura en cada destino.',

    /* Destinos */
    destinos_titulo: 'Destinos más destacados',
    destinos_sub:    'Descubre las mejores experiencias outdoor de South Florida',
    filtro_todos:        'Todos',
    filtro_playa:        '🏖️ Playa',
    filtro_buceo:        '🤿 Buceo',
    filtro_pesca:        '🎣 Pesca',
    filtro_exploracion:  '🧭 Exploración',
    filtro_bares:        '🍹 Bares y Restaurantes',
    card_ver_mapa:   'Ver en mapa',

    /* Mapa */
    mapa_titulo:       'Mapa de Destinos',
    mapa_sub:          'Descubre experiencias outdoor en Miami y South Florida',
    mapa_globo_label:  'Miami · South Florida',

    /* Trabaja */
    trabaja_titulo: 'Trabaja con Nosotros',
    trabaja_sub:    '¿Tienes un negocio relacionado con el turismo outdoor en Miami? Únete a nuestra plataforma.',
    trabaja_item1:  'Listing en nuestro directorio',
    trabaja_item2:  'Página web profesional',
    trabaja_item3:  'Publicidad segmentada',
    trabaja_item4:  'Integración con Amazon',

    /* Formulario */
    form_nombre:           'Nombre completo',
    form_empresa:          'Empresa',
    form_email:            'Email',
    form_tel:              'Teléfono',
    form_servicio:         'Tipo de servicio',
    form_servicio_opc:     'Selecciona una opción',
    form_servicio_listing: 'Listing en directorio',
    form_servicio_web:     'Página web personalizada',
    form_servicio_pub:     'Publicidad en el sitio',
    form_servicio_amazon:  'Productos en Amazon',
    form_mensaje:          'Mensaje',
    form_enviar:           'Enviar mensaje',
    form_exito_titulo:     '¡Mensaje enviado!',
    form_exito_texto:      'Nos pondremos en contacto contigo en menos de 24 horas.',

    /* Footer */
    footer_tagline:   'Tu próxima aventura empieza aquí',
    footer_nav:       'Navegación',
    footer_destinos:  'Destinos',
    footer_copyright: '© 2026 305 Ruta Miami. Todos los derechos reservados.',
  },

  en: {
    /* Navigation */
    nav_inicio:   'Home',
    nav_destinos: 'Destinations',
    nav_mapa:     'Map',
    nav_trabaja:  'Work with us',
    nav_blog:     'Blog',
    nav_empresas: 'For businesses',

    /* Hero */
    hero_titulo:       '305 RUTA MIAMI',
    hero_tagline:      'Your next adventure starts here',
    hero_btn_destinos: 'See destinations',
    hero_btn_mapa:     'View map',
    hero_scroll:       'Scroll',

    /* Intro */
    intro_titulo:    'Why 305 Ruta Miami?',
    intro_sub:       'The ultimate guide for adventurers in South Florida',
    intro_c1_titulo: 'Verified Destinations',
    intro_c1_texto:  'Verified adventures in the best spots around Miami and beyond.',
    intro_c2_titulo: 'Local Guides',
    intro_c2_texto:  'Experts who know every trail, bay and reef in South Florida.',
    intro_c3_titulo: 'Pure Nature',
    intro_c3_texto:  'From the Everglades to South Beach — adventure at every destination.',

    /* Destinations */
    destinos_titulo: 'Featured destinations',
    destinos_sub:    'Discover the best outdoor experiences in South Florida',
    filtro_todos:        'All',
    filtro_playa:        '🏖️ Beach',
    filtro_buceo:        '🤿 Diving',
    filtro_pesca:        '🎣 Fishing',
    filtro_exploracion:  '🧭 Exploration',
    filtro_bares:        '🍹 Bars & Restaurants',
    card_ver_mapa:   'View on map',

    /* Map */
    mapa_titulo:       'Destinations Map',
    mapa_sub:          'Discover outdoor experiences in Miami and South Florida',
    mapa_globo_label:  'Miami · South Florida',

    /* Work with us */
    trabaja_titulo: 'Work with Us',
    trabaja_sub:    'Do you have an outdoor tourism business in Miami? Join our platform.',
    trabaja_item1:  'Directory listing',
    trabaja_item2:  'Professional website',
    trabaja_item3:  'Targeted advertising',
    trabaja_item4:  'Amazon integration',

    /* Form */
    form_nombre:           'Full name',
    form_empresa:          'Company',
    form_email:            'Email',
    form_tel:              'Phone',
    form_servicio:         'Service type',
    form_servicio_opc:     'Select an option',
    form_servicio_listing: 'Directory listing',
    form_servicio_web:     'Custom website',
    form_servicio_pub:     'On-site advertising',
    form_servicio_amazon:  'Amazon products',
    form_mensaje:          'Message',
    form_enviar:           'Send message',
    form_exito_titulo:     'Message sent!',
    form_exito_texto:      "We'll get in touch with you within 24 hours.",

    /* Footer */
    footer_tagline:   'Your next adventure starts here',
    footer_nav:       'Navigation',
    footer_destinos:  'Destinations',
    footer_copyright: '© 2026 305 Ruta Miami. All rights reserved.',
  }
};

/* ===== IDIOMA ACTUAL ===== */
var IDIOMA_ACTUAL = localStorage.getItem('em_idioma') || 'es';

/* Aplica la clase de idioma en <html> de inmediato para evitar flash */
document.documentElement.classList.add('lang-' + IDIOMA_ACTUAL);
document.documentElement.lang = IDIOMA_ACTUAL;

/* ===== APLICA TRADUCCIONES AL DOM ===== */
function aplicarIdioma(lang) {
  var t = TEXTOS[lang];
  if (!t) return;

  /* Textos con data-i18n */
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  /* Placeholders con data-i18n-ph */
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    var key = el.dataset.i18nPh;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  /* Opciones de <select> con data-i18n */
  document.querySelectorAll('option[data-i18n]').forEach(function (opt) {
    var key = opt.dataset.i18n;
    if (t[key] !== undefined) opt.textContent = t[key];
  });

  /* Texto directo en cualquier elemento con data-i18n-es / data-i18n-en
     (útil para <option> y otros elementos que no aceptan spans hijos) */
  document.querySelectorAll('[data-i18n-es][data-i18n-en]').forEach(function (el) {
    var val = el.getAttribute('data-i18n-' + lang);
    if (val) el.textContent = val;
  });
}

/* ===== CAMBIA EL IDIOMA ===== */
function cambiarIdioma(lang) {
  IDIOMA_ACTUAL = lang;

  /* Actualiza clase CSS en <html> — toggle visual de .lang-es / .lang-en */
  document.documentElement.classList.remove('lang-es', 'lang-en');
  document.documentElement.classList.add('lang-' + lang);
  document.documentElement.lang = lang;

  localStorage.setItem('em_idioma', lang);
  aplicarIdioma(lang);

  var btn = document.getElementById('btnIdioma');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
}

/* ===== SOPORTE DE OVERRIDES DESDE admin (em_config_sitio) ===== */
/* Si el admin guardó textos personalizados en localStorage,
   se inyectan en el diccionario TEXTOS antes de la primera aplicación. */
(function aplicarOverridesConfig() {
  var config = {};
  try { config = JSON.parse(localStorage.getItem('em_config_sitio')) || {}; }
  catch (e) { return; }

  if (!Object.keys(config).length) return;

  /* Mapeo: clave de em_config_sitio → {lang, key} en TEXTOS */
  var mapa = {
    hero_titulo_es:     { lang: 'es', key: 'hero_titulo'      },
    hero_titulo_en:     { lang: 'en', key: 'hero_titulo'      },
    hero_tagline_es:    { lang: 'es', key: 'hero_tagline'     },
    hero_tagline_en:    { lang: 'en', key: 'hero_tagline'     },
    intro_sub_es:       { lang: 'es', key: 'intro_sub'        },
    intro_sub_en:       { lang: 'en', key: 'intro_sub'        },
    destinos_titulo_es: { lang: 'es', key: 'destinos_titulo'  },
    destinos_sub_es:    { lang: 'es', key: 'destinos_sub'     }
  };

  Object.keys(mapa).forEach(function (cfgKey) {
    if (!config[cfgKey] || config[cfgKey] === '') return;
    var m = mapa[cfgKey];
    if (TEXTOS[m.lang]) TEXTOS[m.lang][m.key] = config[cfgKey];
  });
})();

/* ===== INICIALIZACIÓN AL CARGAR ===== */
document.addEventListener('DOMContentLoaded', function () {
  aplicarIdioma(IDIOMA_ACTUAL);
  var btn = document.getElementById('btnIdioma');
  if (btn) btn.textContent = IDIOMA_ACTUAL === 'es' ? 'EN' : 'ES';
});
