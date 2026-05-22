/* ============================================================
   sphere-hero.js — Hero esfera 3D interactiva del blog
   Vanilla ES5, sin dependencias. IIFE auto-inicializable.
   ============================================================ */
(function initSphereHero() {
  'use strict';

  /* === CONFIGURACIÓN: imágenes outdoor Miami con textos bilingües === */
  var IMAGES = [
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
      desc_es: 'Kayak y mountain bike a la orilla del río.',
      desc_en: 'Kayak and mountain biking by the river.' },

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
      desc_es: 'Caimanes, garzas y manatíes en libertad.',
      desc_en: 'Alligators, herons and manatees in the wild.' },

    { src: 'assets/images/hero/hero-12.jpg',
      alt_es: 'John Pennekamp Coral Reef panorámica',
      alt_en: 'John Pennekamp Coral Reef panorama',
      title_es: 'Pennekamp Pano', title_en: 'Pennekamp Pano',
      desc_es: 'Vista panorámica del parque marino.',
      desc_en: 'Panoramic view of the marine park.' },

    { src: 'assets/images/hero/hero-01.jpg',
      alt_es: 'Mar abierto frente a Miami',
      alt_en: 'Open sea off Miami',
      title_es: 'Mar abierto', title_en: 'Open sea',
      desc_es: 'El Atlántico azul desde la costa miamense.',
      desc_en: 'The blue Atlantic from the Miami coast.' },

    { src: 'assets/images/hero/hero-02.jpg',
      alt_es: 'Costa de Miami',
      alt_en: 'Miami coastline',
      title_es: 'Costa Miami', title_en: 'Miami coast',
      desc_es: 'Paisaje costero de la ciudad.',
      desc_en: 'Coastal landscape of the city.' },

    { src: 'assets/images/hero/hero-03.jpg',
      alt_es: 'Atmósfera tropical de Miami',
      alt_en: 'Tropical Miami atmosphere',
      title_es: 'Trópico', title_en: 'Tropics',
      desc_es: 'Vegetación y luz subtropical.',
      desc_en: 'Subtropical foliage and light.' },

    { src: 'assets/images/hero/hero-04.jpg',
      alt_es: 'Naturaleza miamense',
      alt_en: 'Miami nature',
      title_es: 'Naturaleza', title_en: 'Nature',
      desc_es: 'La cara salvaje del sur de Florida.',
      desc_en: 'The wild side of South Florida.' },

    { src: 'assets/images/hero/hero-05.jpg',
      alt_es: 'Aventura outdoor en Miami',
      alt_en: 'Outdoor adventure in Miami',
      title_es: 'Aventura', title_en: 'Adventure',
      desc_es: 'Outdoor todo el año bajo el sol.',
      desc_en: 'Year-round outdoor under the sun.' },

    /* === Lugares reales de Miami (Unsplash/Pexels) === */
    { src: 'assets/images/miami/miami-south-beach.jpg',
      alt_es: 'South Beach con palmeras y arena blanca',
      alt_en: 'South Beach with palm trees and white sand',
      title_es: 'South Beach', title_en: 'South Beach',
      desc_es: 'La playa más icónica de Miami Beach.',
      desc_en: 'Miami Beach’s most iconic stretch of sand.' },

    { src: 'assets/images/miami/miami-ocean-drive.jpg',
      alt_es: 'Ocean Drive con su arquitectura Art Deco',
      alt_en: 'Ocean Drive and its Art Deco architecture',
      title_es: 'Ocean Drive', title_en: 'Ocean Drive',
      desc_es: 'El corazón Art Deco de South Beach.',
      desc_en: 'The Art Deco heart of South Beach.' },

    { src: 'assets/images/miami/miami-art-deco.jpg',
      alt_es: 'Fachada Art Deco en Miami Beach',
      alt_en: 'Art Deco facade in Miami Beach',
      title_es: 'Art Deco', title_en: 'Art Deco',
      desc_es: 'Distrito histórico Art Deco protegido.',
      desc_en: 'Protected historic Art Deco district.' },

    { src: 'assets/images/miami/miami-wynwood-walls.jpg',
      alt_es: 'Murales callejeros en Wynwood Walls',
      alt_en: 'Street murals at Wynwood Walls',
      title_es: 'Wynwood Walls', title_en: 'Wynwood Walls',
      desc_es: 'Museo al aire libre de arte urbano.',
      desc_en: 'Open-air museum of urban art.' },

    { src: 'assets/images/miami/miami-little-havana.jpg',
      alt_es: 'Calle Ocho en Little Havana',
      alt_en: 'Calle Ocho in Little Havana',
      title_es: 'Little Havana', title_en: 'Little Havana',
      desc_es: 'Cultura cubana viva en la Calle Ocho.',
      desc_en: 'Living Cuban culture on Calle Ocho.' },

    { src: 'assets/images/miami/miami-vizcaya.jpg',
      alt_es: 'Jardines del Vizcaya Museum',
      alt_en: 'Gardens of Vizcaya Museum',
      title_es: 'Vizcaya', title_en: 'Vizcaya',
      desc_es: 'Villa italiana del siglo XX junto al mar.',
      desc_en: 'Early 20th-century Italian villa by the bay.' },

    { src: 'assets/images/miami/miami-lincoln-road.jpg',
      alt_es: 'Lincoln Road, paseo peatonal',
      alt_en: 'Lincoln Road pedestrian mall',
      title_es: 'Lincoln Road', title_en: 'Lincoln Road',
      desc_es: 'Paseo peatonal con tiendas y cafés.',
      desc_en: 'Pedestrian mall with shops and cafés.' },

    { src: 'assets/images/miami/miami-brickell-skyline.jpg',
      alt_es: 'Skyline de Brickell sobre la bahía',
      alt_en: 'Brickell skyline over the bay',
      title_es: 'Brickell', title_en: 'Brickell',
      desc_es: 'El distrito financiero de Miami.',
      desc_en: 'Miami’s financial district.' },

    { src: 'assets/images/miami/miami-brickell-night.jpg',
      alt_es: 'Brickell de noche',
      alt_en: 'Brickell at night',
      title_es: 'Brickell de noche', title_en: 'Brickell at night',
      desc_es: 'Rascacielos iluminados sobre la bahía.',
      desc_en: 'Illuminated towers over the bay.' },

    { src: 'assets/images/miami/miami-downtown.jpg',
      alt_es: 'Downtown Miami',
      alt_en: 'Downtown Miami',
      title_es: 'Downtown', title_en: 'Downtown',
      desc_es: 'El centro vibrante de la ciudad.',
      desc_en: 'The vibrant heart of the city.' },

    { src: 'assets/images/miami/miami-downtown-miami.jpg',
      alt_es: 'Vista de Downtown Miami',
      alt_en: 'View of Downtown Miami',
      title_es: 'Centro', title_en: 'City center',
      desc_es: 'Torres modernas en el corazón urbano.',
      desc_en: 'Modern towers in the urban core.' },

    { src: 'assets/images/miami/miami-night-skyline.jpg',
      alt_es: 'Skyline de Miami iluminado',
      alt_en: 'Miami skyline lit up',
      title_es: 'Skyline nocturno', title_en: 'Night skyline',
      desc_es: 'La ciudad encendida tras el atardecer.',
      desc_en: 'The city lit up after sunset.' },

    { src: 'assets/images/miami/miami-skyline.jpg',
      alt_es: 'Panorámica del skyline de Miami',
      alt_en: 'Panoramic Miami skyline',
      title_es: 'Panorámica', title_en: 'Panorama',
      desc_es: 'Vista amplia de los rascacielos de Miami.',
      desc_en: 'Wide view of Miami’s towers.' },

    { src: 'assets/images/miami/miami-bayside-marketplace.jpg',
      alt_es: 'Bayside Marketplace junto a la bahía',
      alt_en: 'Bayside Marketplace by the bay',
      title_es: 'Bayside', title_en: 'Bayside',
      desc_es: 'Mercado al aire libre frente a la bahía.',
      desc_en: 'Open-air market on the bayfront.' },

    { src: 'assets/images/miami/miami-bayfront-park.jpg',
      alt_es: 'Bayfront Park en el centro de Miami',
      alt_en: 'Bayfront Park in downtown Miami',
      title_es: 'Bayfront Park', title_en: 'Bayfront Park',
      desc_es: 'Parque urbano frente al océano.',
      desc_en: 'Urban park on the waterfront.' },

    { src: 'assets/images/miami/miami-key-biscayne.jpg',
      alt_es: 'Playa de Key Biscayne',
      alt_en: 'Key Biscayne beach',
      title_es: 'Key Biscayne', title_en: 'Key Biscayne',
      desc_es: 'Isla con playas tranquilas y faro histórico.',
      desc_en: 'Island with calm beaches and historic lighthouse.' },

    { src: 'assets/images/miami/miami-haulover-park.jpg',
      alt_es: 'Haulover Park y costa',
      alt_en: 'Haulover Park and shoreline',
      title_es: 'Haulover Park', title_en: 'Haulover Park',
      desc_es: 'Playa amplia al norte de Miami Beach.',
      desc_en: 'Wide beach north of Miami Beach.' },

    { src: 'assets/images/miami/miami-coastline.jpg',
      alt_es: 'Costa de Miami desde el aire',
      alt_en: 'Miami coastline from above',
      title_es: 'Costa aérea', title_en: 'Aerial coast',
      desc_es: 'La costa miamense desde el aire.',
      desc_en: 'Miami’s coastline from above.' },

    { src: 'assets/images/miami/miami-beach-aerial.jpg',
      alt_es: 'Vista aérea de Miami Beach',
      alt_en: 'Aerial view of Miami Beach',
      title_es: 'Miami Beach aéreo', title_en: 'Miami Beach aerial',
      desc_es: 'Miami Beach desde lo alto.',
      desc_en: 'Miami Beach from up high.' },

    { src: 'assets/images/miami/miami-south-pointe.jpg',
      alt_es: 'South Pointe Park, Miami Beach',
      alt_en: 'South Pointe Park, Miami Beach',
      title_es: 'South Pointe', title_en: 'South Pointe',
      desc_es: 'Punta sur de Miami Beach con vista al canal.',
      desc_en: 'Southern tip of Miami Beach with channel views.' },

    { src: 'assets/images/miami/miami-south-beach-tower.jpg',
      alt_es: 'Torre de salvavidas en South Beach',
      alt_en: 'Lifeguard tower at South Beach',
      title_es: 'Torre de salvavidas', title_en: 'Lifeguard tower',
      desc_es: 'Torres de colores, símbolo de South Beach.',
      desc_en: 'Colorful towers, the symbol of South Beach.' },

    { src: 'assets/images/miami/miami-ocean-drive-deco.jpg',
      alt_es: 'Hoteles Art Deco en Ocean Drive',
      alt_en: 'Art Deco hotels on Ocean Drive',
      title_es: 'Deco Ocean Drive', title_en: 'Deco Ocean Drive',
      desc_es: 'Hoteles pastel del distrito Art Deco.',
      desc_en: 'Pastel hotels of the Art Deco district.' },

    { src: 'assets/images/miami/miami-coconut-grove.jpg',
      alt_es: 'Coconut Grove y su vegetación',
      alt_en: 'Coconut Grove and its greenery',
      title_es: 'Coconut Grove', title_en: 'Coconut Grove',
      desc_es: 'Barrio bohemio frente a la bahía.',
      desc_en: 'Bohemian neighborhood on the bay.' },

    { src: 'assets/images/miami/miami-venetian-pool.jpg',
      alt_es: 'Venetian Pool en Coral Gables',
      alt_en: 'Venetian Pool in Coral Gables',
      title_es: 'Venetian Pool', title_en: 'Venetian Pool',
      desc_es: 'Piscina histórica tallada en coral.',
      desc_en: 'Historic pool carved from coral rock.' },

    { src: 'assets/images/miami/miami-fairchild-garden.jpg',
      alt_es: 'Fairchild Tropical Botanic Garden',
      alt_en: 'Fairchild Tropical Botanic Garden',
      title_es: 'Fairchild Garden', title_en: 'Fairchild Garden',
      desc_es: 'Jardín botánico tropical en Coral Gables.',
      desc_en: 'Tropical botanic garden in Coral Gables.' },

    { src: 'assets/images/miami/miami-pamm-museum.jpg',
      alt_es: 'Pérez Art Museum Miami (PAMM)',
      alt_en: 'Pérez Art Museum Miami (PAMM)',
      title_es: 'PAMM', title_en: 'PAMM',
      desc_es: 'Museo de arte contemporáneo frente a la bahía.',
      desc_en: 'Contemporary art museum on the bay.' },

    { src: 'assets/images/miami/miami-marine-stadium.jpg',
      alt_es: 'Miami Marine Stadium en Virginia Key',
      alt_en: 'Miami Marine Stadium on Virginia Key',
      title_es: 'Marine Stadium', title_en: 'Marine Stadium',
      desc_es: 'Icónico estadio acuático modernista.',
      desc_en: 'Iconic modernist waterfront stadium.' },

    { src: 'assets/images/miami/miami-pier.jpg',
      alt_es: 'Muelle en la costa de Miami',
      alt_en: 'Pier on the Miami coast',
      title_es: 'Muelle', title_en: 'Pier',
      desc_es: 'Muelle de pesca sobre el océano.',
      desc_en: 'Fishing pier over the ocean.' },

    { src: 'assets/images/miami/miami-beach-palms.jpg',
      alt_es: 'Palmeras junto a la playa',
      alt_en: 'Palm trees by the beach',
      title_es: 'Palmeras', title_en: 'Palms',
      desc_es: 'Hileras de palmeras frente al mar.',
      desc_en: 'Rows of palms facing the sea.' },

    { src: 'assets/images/miami/miami-pexels-beach.jpg',
      alt_es: 'Arena y olas en Miami Beach',
      alt_en: 'Sand and waves at Miami Beach',
      title_es: 'Olas', title_en: 'Waves',
      desc_es: 'Olas tibias del Atlántico.',
      desc_en: 'Warm Atlantic waves.' },

    { src: 'assets/images/miami/miami-pexels-ocean.jpg',
      alt_es: 'Océano frente a Miami',
      alt_en: 'Ocean off Miami',
      title_es: 'Atlántico', title_en: 'Atlantic',
      desc_es: 'Aguas azules del Atlántico tropical.',
      desc_en: 'Blue tropical Atlantic waters.' }
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
