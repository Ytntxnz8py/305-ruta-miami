/* ============================================================
   sphere-hero.js — Hero esfera 3D interactiva del blog
   Vanilla ES5, sin dependencias. IIFE auto-inicializable.
   ============================================================ */
(function initSphereHero() {
  'use strict';

  /* === CONFIGURACIÓN: imágenes con textos honestos (describen lo que se ve) === */
  var IMAGES = [
    /* === Imágenes verificadas de naturaleza (Wikimedia / NPS — créditos en hero/CREDITOS.md) === */
    { src: 'assets/images/hero/hero-08.jpg',
      alt_es: 'Canoa en 9 Mile Pond, Everglades',
      alt_en: 'Canoe on 9 Mile Pond, Everglades',
      title_es: '9 Mile Pond', title_en: '9 Mile Pond',
      desc_es: 'Ruta de canoa entre manglares del Everglades.',
      desc_en: 'Canoe trail through Everglades mangroves.' },

    { src: 'assets/images/hero/hero-15.jpg',
      alt_es: 'Oleta River State Park, North Miami Beach',
      alt_en: 'Oleta River State Park, North Miami Beach',
      title_es: 'Oleta River', title_en: 'Oleta River',
      desc_es: 'Río y vegetación del parque estatal.',
      desc_en: 'River and woods of the state park.' },

    { src: 'assets/images/hero/hero-10.jpg',
      alt_es: 'Arrecife de coral en John Pennekamp, Key Largo',
      alt_en: 'Coral reef at John Pennekamp, Key Largo',
      title_es: 'John Pennekamp', title_en: 'John Pennekamp',
      desc_es: 'Primer parque marino de EE.UU. Buceo y snorkel.',
      desc_en: 'First marine park in the US. Diving and snorkeling.' },

    { src: 'assets/images/hero/hero-13.jpg',
      alt_es: 'Biscayne Lagoon, aguas turquesa',
      alt_en: 'Biscayne Lagoon, turquoise waters',
      title_es: 'Biscayne Bay', title_en: 'Biscayne Bay',
      desc_es: 'Bahía protegida ideal para kayak y paddle.',
      desc_en: 'Sheltered bay, perfect for kayak and paddle.' },

    { src: 'assets/images/hero/hero-06.jpg',
      alt_es: 'Paisaje del Everglades',
      alt_en: 'Everglades landscape',
      title_es: 'Everglades', title_en: 'Everglades',
      desc_es: 'El Río de Hierba más famoso del mundo.',
      desc_en: 'The world’s most famous River of Grass.' },

    { src: 'assets/images/hero/hero-14.jpg',
      alt_es: 'Bill Baggs Cape Florida State Park',
      alt_en: 'Bill Baggs Cape Florida State Park',
      title_es: 'Bill Baggs', title_en: 'Bill Baggs',
      desc_es: 'Playa y faro histórico en Key Biscayne.',
      desc_en: 'Beach and historic lighthouse on Key Biscayne.' },

    { src: 'assets/images/hero/hero-11.jpg',
      alt_es: 'Arrecife de John Pennekamp Coral Reef',
      alt_en: 'John Pennekamp Coral Reef',
      title_es: 'Coral Reef', title_en: 'Coral Reef',
      desc_es: 'Snorkel sobre arrecifes vivos en Key Largo.',
      desc_en: 'Snorkeling over living reefs in Key Largo.' },

    { src: 'assets/images/hero/hero-07.jpg',
      alt_es: 'Atardecer sobre el Río de Hierba',
      alt_en: 'Sunset over the River of Grass',
      title_es: 'Sunset Everglades', title_en: 'Sunset Everglades',
      desc_es: 'Atardeceres dorados sobre los humedales.',
      desc_en: 'Golden sunsets over the wetlands.' },

    { src: 'assets/images/hero/hero-09.jpg',
      alt_es: 'Everglades con caimanes y garzas',
      alt_en: 'Everglades with alligators and herons',
      title_es: 'Vida salvaje', title_en: 'Wildlife',
      desc_es: 'Caimanes, garzas y aves del humedal.',
      desc_en: 'Alligators, herons and wetland birds.' },

    { src: 'assets/images/hero/hero-12.jpg',
      alt_es: 'John Pennekamp Coral Reef panorámica',
      alt_en: 'John Pennekamp Coral Reef panorama',
      title_es: 'Pennekamp Pano', title_en: 'Pennekamp Pano',
      desc_es: 'Vista panorámica del parque marino.',
      desc_en: 'Panoramic view of the marine park.' },

    /* === hero-01: foto submarina con peces y arrecife === */
    { src: 'assets/images/hero/hero-01.jpg',
      alt_es: 'Fondo marino con peces y coral',
      alt_en: 'Seabed with fish and coral',
      title_es: 'Bajo el mar', title_en: 'Under the sea',
      desc_es: 'Peces y coral sobre arena clara, luz filtrada.',
      desc_en: 'Fish and coral over pale sand, filtered light.' },

    /* === hero-02: bahía con skyline urbano y orilla rocosa === */
    { src: 'assets/images/hero/hero-02.jpg',
      alt_es: 'Bahía con skyline urbano y rocas',
      alt_en: 'Bay with city skyline and rocks',
      title_es: 'Bahía urbana', title_en: 'Urban bay',
      desc_es: 'Aguas turquesa frente a torres y orilla pedregosa.',
      desc_en: 'Turquoise water by towers and a stone shore.' },

    /* === hero-03: skyline al atardecer con palmeras y reflejo === */
    { src: 'assets/images/hero/hero-03.jpg',
      alt_es: 'Skyline costero al atardecer con palmeras',
      alt_en: 'Coastal skyline at sunset with palms',
      title_es: 'Atardecer urbano', title_en: 'Urban sunset',
      desc_es: 'Torres y palmeras se reflejan en la bahía dorada.',
      desc_en: 'Towers and palms reflect on a golden bay.' },

    /* === hero-04: paseo peatonal con palmeras y skyline === */
    { src: 'assets/images/hero/hero-04.jpg',
      alt_es: 'Paseo peatonal con palmeras frente al agua',
      alt_en: 'Promenade with palms by the water',
      title_es: 'Paseo costero', title_en: 'Waterfront walk',
      desc_es: 'Banquetas, farolas y palmeras frente a la bahía.',
      desc_en: 'Benches, lamps and palms along the bay.' },

    /* === hero-05: skyline desde el agua con palmeras a la derecha === */
    { src: 'assets/images/hero/hero-05.jpg',
      alt_es: 'Skyline reflejado en agua tranquila',
      alt_en: 'Skyline reflected on still water',
      title_es: 'Reflejo urbano', title_en: 'City reflection',
      desc_es: 'Torres modernas espejadas en la bahía al amanecer.',
      desc_en: 'Modern towers mirrored on the bay at dawn.' },

    /* === Fotos con descripciones honestas (lo que muestran, sin atribuir falsamente) === */
    { src: 'assets/images/miami/miami-south-beach.jpg',
      alt_es: 'Skyline costero al atardecer rosado',
      alt_en: 'Coastal skyline at pink sunset',
      title_es: 'Cielo rosado', title_en: 'Pink sky',
      desc_es: 'Torres frente al agua bajo un cielo pastel.',
      desc_en: 'Towers by the water under a pastel sky.' },

    { src: 'assets/images/miami/miami-ocean-drive.jpg',
      alt_es: 'Palmeras y skyline al atardecer',
      alt_en: 'Palm trees and skyline at dusk',
      title_es: 'Siluetas al ocaso', title_en: 'Sunset silhouettes',
      desc_es: 'Palmeras en silueta frente a una ciudad lejana.',
      desc_en: 'Palms in silhouette before a distant city.' },

    { src: 'assets/images/miami/miami-art-deco.jpg',
      alt_es: 'Costa rocosa vista desde el aire',
      alt_en: 'Rocky coast from above',
      title_es: 'Costa aérea', title_en: 'Aerial coast',
      desc_es: 'Arena, rocas y agua turquesa desde lo alto.',
      desc_en: 'Sand, rocks and turquoise water from above.' },

    { src: 'assets/images/miami/miami-vizcaya.jpg',
      alt_es: 'Skyline distante sobre agua oscura',
      alt_en: 'Distant skyline over dark water',
      title_es: 'Ciudad lejana', title_en: 'Distant city',
      desc_es: 'Línea de rascacielos en el horizonte.',
      desc_en: 'A line of towers on the horizon.' },

    { src: 'assets/images/miami/miami-lincoln-road.jpg',
      alt_es: 'Palmera vista desde abajo, cielo azul',
      alt_en: 'Palm tree from below, blue sky',
      title_es: 'Bajo la palma', title_en: 'Under the palm',
      desc_es: 'Una palmera alta recortada contra el cielo.',
      desc_en: 'A tall palm cut against the sky.' },

    { src: 'assets/images/miami/miami-brickell-skyline.jpg',
      alt_es: 'Playa con palmeras y edificios altos',
      alt_en: 'Beach with palms and tall buildings',
      title_es: 'Playa urbana', title_en: 'Urban beach',
      desc_es: 'Arena y palmeras frente a torres residenciales.',
      desc_en: 'Sand and palms facing residential towers.' },

    { src: 'assets/images/miami/miami-skyline.jpg',
      alt_es: 'Skyline urbano sobre agua tranquila',
      alt_en: 'Urban skyline over still water',
      title_es: 'Skyline', title_en: 'Skyline',
      desc_es: 'Rascacielos sobre la bahía vistos desde el aire.',
      desc_en: 'Highrises over the bay seen from above.' },

    { src: 'assets/images/miami/miami-haulover-park.jpg',
      alt_es: 'Palmeras y cielo despejado',
      alt_en: 'Palms and clear sky',
      title_es: 'Palmar', title_en: 'Palm grove',
      desc_es: 'Copas de palmeras bajo un cielo limpio.',
      desc_en: 'Palm canopies under an open sky.' },

    { src: 'assets/images/miami/miami-coastline.jpg',
      alt_es: 'Playa amplia con palmera y corredor',
      alt_en: 'Wide beach with palm and runner',
      title_es: 'Mañana en la playa', title_en: 'Morning at the beach',
      desc_es: 'Luz fuerte, arena clara y una palmera al frente.',
      desc_en: 'Bright light, pale sand and a palm in front.' },

    { src: 'assets/images/miami/miami-south-pointe.jpg',
      alt_es: 'Playa concurrida de arena blanca',
      alt_en: 'Crowded white-sand beach',
      title_es: 'Playa llena', title_en: 'Packed beach',
      desc_es: 'Bañistas, sombrillas y agua turquesa.',
      desc_en: 'Sunbathers, umbrellas and turquoise water.' },

    { src: 'assets/images/miami/miami-south-beach-tower.jpg',
      alt_es: 'Vista aérea de costa con edificios y agua turquesa',
      alt_en: 'Aerial coast with buildings and turquoise water',
      title_es: 'Costa aérea', title_en: 'Aerial coast',
      desc_es: 'Hilera de torres a lo largo de la playa.',
      desc_en: 'A row of towers along the beach.' },

    { src: 'assets/images/miami/miami-ocean-drive-deco.jpg',
      alt_es: 'Marina al atardecer con cielo rosado',
      alt_en: 'Marina at sunset with pink sky',
      title_es: 'Marina al ocaso', title_en: 'Sunset marina',
      desc_es: 'Veleros y palmeras bajo un cielo violáceo.',
      desc_en: 'Sailboats and palms under a violet sky.' },

    { src: 'assets/images/miami/miami-coconut-grove.jpg',
      alt_es: 'Palmeras altas sobre arena blanca',
      alt_en: 'Tall palms over white sand',
      title_es: 'Palmeral', title_en: 'Palm grove',
      desc_es: 'Bosque de palmeras junto a la playa.',
      desc_en: 'A forest of palms by the beach.' },

    { src: 'assets/images/miami/miami-venetian-pool.jpg',
      alt_es: 'Personas caminando entre palmeras junto al agua',
      alt_en: 'People walking among palms by the water',
      title_es: 'Paseo costero', title_en: 'Coastal walk',
      desc_es: 'Día soleado en un paseo frente al mar.',
      desc_en: 'Sunny day on a walkway by the sea.' },

    { src: 'assets/images/miami/miami-fairchild-garden.jpg',
      alt_es: 'Playa amplia con avión y banner en el cielo',
      alt_en: 'Wide beach with plane and sky banner',
      title_es: 'Cielo y mar', title_en: 'Sky and sea',
      desc_es: 'Horizonte despejado sobre arena clara.',
      desc_en: 'Open horizon over pale sand.' },

    { src: 'assets/images/miami/miami-pamm-museum.jpg',
      alt_es: 'Skyline nocturno reflejado sobre agua',
      alt_en: 'Night skyline reflected on water',
      title_es: 'Noche en la bahía', title_en: 'Night on the bay',
      desc_es: 'Luces de la ciudad sobre el agua oscura.',
      desc_en: 'City lights over dark water.' },

    { src: 'assets/images/miami/miami-pier.jpg',
      alt_es: 'Playa con sombrillas y skyline al fondo',
      alt_en: 'Beach with umbrellas and skyline behind',
      title_es: 'Día de playa', title_en: 'Beach day',
      desc_es: 'Sombrillas azules y edificios al fondo.',
      desc_en: 'Blue umbrellas and buildings behind.' },

    { src: 'assets/images/miami/miami-beach-palms.jpg',
      alt_es: 'Playa blanca con agua turquesa',
      alt_en: 'White beach with turquoise water',
      title_es: 'Agua clara', title_en: 'Clear water',
      desc_es: 'Arena blanca y mar abierto en un día azul.',
      desc_en: 'White sand and open sea on a blue day.' }
  ];

  /* === CONSTANTES === */
  var CONTAINER_SIZE_DESKTOP = 520;
  var CONTAINER_SIZE_MOBILE = 320;
  var SPHERE_RADIUS_FACTOR = 0.5;
  var IMAGE_SCALE_FACTOR = 0.16;
  var DRAG_SENSITIVITY = 0.5;
  var MOMENTUM_DECAY = 0.95;
  var MAX_ROTATION_SPEED = 5;
  var AUTO_ROTATE_SPEED = 0.25;

  /* === ESTADO === */
  var container = null;
  var stage = null;
  var imageNodes = [];
  var spherePositions = [];
  var rotation = { x: 15, y: 15 };
  var velocity = { x: 0, y: 0 };
  var isDragging = false;
  var lastPointer = { x: 0, y: 0 };
  var rafId = null;
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var actualContainerSize = CONTAINER_SIZE_DESKTOP;
  var actualSphereRadius = CONTAINER_SIZE_DESKTOP * SPHERE_RADIUS_FACTOR;
  var baseImageSize = CONTAINER_SIZE_DESKTOP * IMAGE_SCALE_FACTOR;

  /* === UTILIDADES === */
  function deg2rad(d) { return d * Math.PI / 180; }
  function normalizeAngle(a) {
    while (a > 180) a -= 360;
    while (a < -180) a += 360;
    return a;
  }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  /* === FIBONACCI SPHERE: distribución equiespaciada === */
  function generateFibonacciPositions(count) {
    var positions = [];
    var golden = (1 + Math.sqrt(5)) / 2;
    var angleInc = 2 * Math.PI / golden;
    for (var i = 0; i < count; i++) {
      var t = i / count;
      var inclination = Math.acos(1 - 2 * t);
      var azimuth = angleInc * i;
      var phi = inclination * 180 / Math.PI;
      var theta = (azimuth * 180 / Math.PI) % 360;
      // Mapear a rango más amplio
      phi = 15 + (phi / 180) * 150;
      // Randomización ligera para evitar patrones obvios
      theta = (theta + (Math.random() - 0.5) * 20) % 360;
      phi = clamp(phi + (Math.random() - 0.5) * 10, 0, 180);
      positions.push({ theta: theta, phi: phi, radius: actualSphereRadius });
    }
    return positions;
  }

  /* === PROYECCIÓN 3D -> 2D con doble rotación X/Y === */
  function calculateWorldPositions() {
    var rotXRad = deg2rad(rotation.x);
    var rotYRad = deg2rad(rotation.y);
    var result = [];
    for (var i = 0; i < spherePositions.length; i++) {
      var p = spherePositions[i];
      var thetaRad = deg2rad(p.theta);
      var phiRad = deg2rad(p.phi);
      var x = p.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      var y = p.radius * Math.cos(phiRad);
      var z = p.radius * Math.sin(phiRad) * Math.sin(thetaRad);
      // Rotación Y
      var x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      var z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1; z = z1;
      // Rotación X
      var y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      var z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2; z = z2;
      // Visibilidad y fade trasero
      var fadeStart = -10, fadeEnd = -30;
      var visible = z > fadeEnd;
      var fadeOpacity = z <= fadeStart
        ? Math.max(0, (z - fadeEnd) / (fadeStart - fadeEnd))
        : 1;
      // Escala por distancia al centro y profundidad
      var distCenter = Math.sqrt(x * x + y * y);
      var distRatio = Math.min(distCenter / actualSphereRadius, 1);
      var centerScale = Math.max(0.35, 1 - distRatio * 0.65);
      var depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius);
      var scale = centerScale * Math.max(0.55, 0.8 + depthScale * 0.3);
      result.push({
        x: x, y: y, z: z,
        scale: scale,
        zIndex: Math.round(1000 + z),
        visible: visible,
        opacity: fadeOpacity
      });
    }
    return result;
  }

  /* === CREACIÓN DE NODOS DOM === */
  /* En móvil reducimos el número de nodos para evitar lag */
  var MAX_NODES_MOBILE = 18;
  function getActiveImages() {
    var isMobile = window.innerWidth < 900;
    if (isMobile && IMAGES.length > MAX_NODES_MOBILE) {
      return IMAGES.slice(0, MAX_NODES_MOBILE);
    }
    return IMAGES;
  }
  var activeImages = IMAGES;

  function buildNodes() {
    stage.innerHTML = '';
    imageNodes = [];
    activeImages = getActiveImages();
    for (var i = 0; i < activeImages.length; i++) {
      var img = activeImages[i];
      var node = document.createElement('div');
      node.className = 'sphere-node';
      node.setAttribute('data-idx', i);
      var imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt_es;
      imgEl.loading = i < 5 ? 'eager' : 'lazy';
      imgEl.decoding = 'async';
      imgEl.draggable = false;
      node.appendChild(imgEl);
      node.addEventListener('click', onImageClick);
      stage.appendChild(node);
      imageNodes.push({ el: node, imgEl: imgEl, data: img });
    }
  }

  /* === ACTUALIZAR ALT SEGÚN IDIOMA ACTIVO === */
  function updateAltLanguage() {
    var lang = document.documentElement.classList.contains('lang-en') ? 'en' : 'es';
    for (var i = 0; i < imageNodes.length; i++) {
      imageNodes[i].imgEl.alt = imageNodes[i].data['alt_' + lang];
    }
  }

  /* === APLICAR POSICIONES AL DOM === */
  function applyPositions() {
    var positions = calculateWorldPositions();
    var half = actualContainerSize / 2;
    for (var i = 0; i < imageNodes.length; i++) {
      var n = imageNodes[i];
      var p = positions[i];
      if (!p.visible) {
        n.el.style.display = 'none';
        continue;
      }
      var size = baseImageSize * p.scale;
      n.el.style.display = 'block';
      n.el.style.width = size + 'px';
      n.el.style.height = size + 'px';
      n.el.style.left = (half + p.x) + 'px';
      n.el.style.top = (half + p.y) + 'px';
      n.el.style.opacity = p.opacity;
      n.el.style.zIndex = p.zIndex;
    }
  }

  /* === BUCLE DE ANIMACIÓN === */
  function tick() {
    if (!isDragging) {
      velocity.x *= MOMENTUM_DECAY;
      velocity.y *= MOMENTUM_DECAY;
      var autoY = (!prefersReducedMotion) ? AUTO_ROTATE_SPEED : 0;
      rotation.x = normalizeAngle(
        rotation.x + clamp(velocity.x, -MAX_ROTATION_SPEED, MAX_ROTATION_SPEED)
      );
      rotation.y = normalizeAngle(
        rotation.y + clamp(velocity.y, -MAX_ROTATION_SPEED, MAX_ROTATION_SPEED) + autoY
      );
      if (Math.abs(velocity.x) < 0.01) velocity.x = 0;
      if (Math.abs(velocity.y) < 0.01) velocity.y = 0;
    }
    applyPositions();
    rafId = requestAnimationFrame(tick);
  }

  /* === GESTIÓN DE DRAG (mouse + touch) === */
  function onPointerDown(e) {
    if (e.preventDefault) e.preventDefault();
    isDragging = true;
    velocity.x = 0; velocity.y = 0;
    var pt = (e.touches && e.touches[0]) ? e.touches[0] : e;
    lastPointer.x = pt.clientX;
    lastPointer.y = pt.clientY;
  }
  function onPointerMove(e) {
    if (!isDragging) return;
    var pt = (e.touches && e.touches[0]) ? e.touches[0] : e;
    var dx = pt.clientX - lastPointer.x;
    var dy = pt.clientY - lastPointer.y;
    var dragX = -dy * DRAG_SENSITIVITY;
    var dragY = dx * DRAG_SENSITIVITY;
    rotation.x = normalizeAngle(
      rotation.x + clamp(dragX, -MAX_ROTATION_SPEED, MAX_ROTATION_SPEED)
    );
    rotation.y = normalizeAngle(
      rotation.y + clamp(dragY, -MAX_ROTATION_SPEED, MAX_ROTATION_SPEED)
    );
    velocity.x = clamp(dragX, -MAX_ROTATION_SPEED, MAX_ROTATION_SPEED);
    velocity.y = clamp(dragY, -MAX_ROTATION_SPEED, MAX_ROTATION_SPEED);
    lastPointer.x = pt.clientX;
    lastPointer.y = pt.clientY;
    if (e.touches && e.preventDefault) e.preventDefault();
  }
  function onPointerUp() { isDragging = false; }

  /* === CLICK -> MODAL === */
  function onImageClick(e) {
    // Si la esfera está rotando con velocidad, ignoramos el click
    if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) return;
    var idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
    openModal(activeImages[idx]);
  }
  function openModal(data) {
    var modal = document.getElementById('sphereModal');
    if (!modal) return;
    var img = modal.querySelector('.sphere-modal__img');
    var title = modal.querySelector('.sphere-modal__title');
    var desc = modal.querySelector('.sphere-modal__desc');
    var lang = document.documentElement.classList.contains('lang-en') ? 'en' : 'es';
    if (img) { img.src = data.src; img.alt = data['alt_' + lang]; }
    if (title) title.textContent = data['title_' + lang] || '';
    if (desc) desc.textContent = data['desc_' + lang] || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal() {
    var modal = document.getElementById('sphereModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  /* === RESPONSIVE === */
  function handleResize() {
    var mobile = window.innerWidth < 900;
    actualContainerSize = mobile ? CONTAINER_SIZE_MOBILE : CONTAINER_SIZE_DESKTOP;
    actualSphereRadius = actualContainerSize * SPHERE_RADIUS_FACTOR;
    baseImageSize = actualContainerSize * IMAGE_SCALE_FACTOR;
    if (container) {
      container.style.width = actualContainerSize + 'px';
      container.style.height = actualContainerSize + 'px';
    }
    spherePositions = generateFibonacciPositions(activeImages.length);
    applyPositions();
  }

  /* === INICIALIZACIÓN === */
  function init() {
    container = document.getElementById('sphereContainer');
    if (!container) return;
    stage = container.querySelector('.sphere-stage');
    if (!stage) return;

    buildNodes();
    handleResize();
    updateAltLanguage();

    // Eventos drag (mouse)
    container.addEventListener('mousedown', onPointerDown);
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    // Eventos drag (touch)
    container.addEventListener('touchstart', onPointerDown, { passive: false });
    document.addEventListener('touchmove', onPointerMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);
    // Resize
    window.addEventListener('resize', handleResize);

    // Cierre del modal
    var modal = document.getElementById('sphereModal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal || (e.target.classList && e.target.classList.contains('sphere-modal__close'))) {
          closeModal();
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.keyCode === 27) closeModal();
      });
    }

    // Observamos cambios de idioma en <html>
    if (window.MutationObserver) {
      var langObserver = new MutationObserver(updateAltLanguage);
      langObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    // Arrancamos el bucle
    rafId = requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
