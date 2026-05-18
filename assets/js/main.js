/* =========================================
   EXPLORA MIAMI — main.js
   Lógica del sitio público
   JS puro, sin librerías externas
   Comentarios en español
========================================= */

/* ===== DATOS DE DESTINOS ===== */
/* Cada destino incluye: datos base, galería de 3 fotos Unsplash,
   descripción larga bilingüe, cómo llegar bilingüe y 3 reseñas ficticias */
var DESTINOS_DEFAULT = [
  {
    id: 1,
    nombre_es: 'Everglades National Park',
    nombre_en: 'Everglades National Park',
    descripcion_es: 'El humedal más grande de EE.UU. — senderismo, kayak y avistamiento de caimanes, flamencos y aves exóticas en un ecosistema único en el mundo.',
    descripcion_en: 'The largest wetland in the US — hiking, kayaking and spotting alligators, flamingos and exotic birds in a unique world ecosystem.',
    descripcion_larga_es: 'El Parque Nacional Everglades es el tercer parque más grande de EE.UU. y el único ecosistema de pastizales subtropicales del mundo. Declarado Patrimonio de la Humanidad por la UNESCO en 1979, alberga 36 especies en peligro de extinción, incluyendo el manatí de Florida, la pantera de Florida y el cocodrilo americano. Sus canales de agua oscura y manglares crean un laberinto natural explorable en kayak o canoa. Al anochecer, miles de ibis vuelan en formación sobre los humedales — un espectáculo que quita el aliento. La entrada Shark Valley ofrece un mirador de 45 pies de altura con vistas panorámicas sobre el "río de hierba" que cubre todo el parque.',
    descripcion_larga_en: 'Everglades National Park is the third largest national park in the US and the only subtropical grassland ecosystem in the world. Designated a UNESCO World Heritage Site in 1979, it shelters 36 endangered species including the Florida manatee, Florida panther, and American crocodile. Its dark water channels and mangroves create a natural maze best explored by kayak or canoe. At dusk, thousands of ibis fly in formation over the wetlands — a breathtaking spectacle. The Shark Valley entrance offers a 45-foot tower with panoramic views over the "river of grass" that covers the entire park.',
    como_llegar_es: 'Desde Miami: toma la US-41 Oeste (Tamiami Trail) o la US-1 Sur hacia Homestead. Shark Valley está a 35 min desde Miami por la US-41. La entrada principal Ernest Coe (Homestead) está a 45 min. Flamingo, al extremo sur, requiere 1.5 horas. No hay transporte público hacia el interior del parque — se recomienda auto o tour organizado.',
    como_llegar_en: 'From Miami: take US-41 West (Tamiami Trail) or US-1 South toward Homestead. Shark Valley is 35 min from Miami via US-41. The main Ernest Coe entrance (Homestead) is 45 min. Flamingo, at the southern tip, is 1.5 hours away. No public transit into the park — car or organized tour recommended.',
    foto: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.2866, lng: -80.8987,
    dificultad_es: 'Fácil — Moderado', dificultad_en: 'Easy — Moderate', dificultad_clase: 'facil',
    precio: '$35 / vehículo', horarios: '24 horas (Shark Valley: 8am–6pm)',
    tipo: 'tierra', tipo_es: 'Senderismo · Kayak', tipo_en: 'Hiking · Kayak',
    activo: true,
    resenas: [
      {
        nombre: 'María Consuelo G.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '12 Mar 2026', estrellas: 5,
        texto_es: 'Ver los caimanes de tan cerca en su hábitat natural es algo que no olvidaré. El tour en airboat al amanecer fue absolutamente mágico — la niebla sobre el agua y el silencio del parque crean una atmósfera única.',
        texto_en: 'Seeing alligators so close in their natural habitat is something I will never forget. The sunrise airboat tour was absolutely magical — the mist over the water and the silence of the park create a unique atmosphere.'
      },
      {
        nombre: 'Roberto Díaz',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '28 Feb 2026', estrellas: 4,
        texto_es: 'El kayak entre los manglares de Shark Valley fue lo más destacado. La ruta de 24 km en bicicleta también es increíble, aunque el sol pega fuerte en verano — lleva mucha agua y protector solar.',
        texto_en: 'Kayaking through the Shark Valley mangroves was the highlight. The 24 km bike trail is also incredible, though the sun is intense in summer — bring plenty of water and sunscreen.'
      },
      {
        nombre: 'Ana Villareal',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '5 Feb 2026', estrellas: 5,
        texto_es: 'Un ecosistema que no existe en ningún otro lugar del planeta. Fuimos al atardecer y el vuelo de los ibis en formación nos dejó sin palabras. Definitivamente hay que volver para hacer el camping en Flamingo.',
        texto_en: 'An ecosystem that exists nowhere else on the planet. We went at sunset and the ibis flying in formation left us speechless. Definitely need to come back to camp at Flamingo.'
      }
    ]
  },
  {
    id: 2,
    nombre_es: 'John Pennekamp Coral Reef',
    nombre_en: 'John Pennekamp Coral Reef',
    descripcion_es: 'El primer parque marino subacuático de EE.UU., en Key Largo. Buceo y snorkeling entre corales multicolores y peces tropicales.',
    descripcion_en: 'The first underwater park in the US, in Key Largo. Scuba diving and snorkeling among colorful corals and tropical fish.',
    descripcion_larga_es: 'John Pennekamp Coral Reef State Park fue el primer parque marino subacuático designado en Estados Unidos, establecido en 1963 en Key Largo. Cubre unas 70 millas náuticas cuadradas del Arrecife de Florida — el único arrecife de barrera vivo de América del Norte. Bajo sus aguas turquesas habitan más de 40 tipos de coral y 650 especies de peces, incluyendo el pez loro, el pez ángel y el barracuda. El punto estrella es la escultura "Cristo del Abismo" a 6 metros de profundidad, una réplica del original italiano. Las excursiones de buceo con equipo duran unas 2 horas y se pueden reservar en el parque sin certificación previa para snorkeling.',
    descripcion_larga_en: 'John Pennekamp Coral Reef State Park was the first designated underwater marine park in the United States, established in 1963 in Key Largo. It covers about 70 nautical square miles of the Florida Reef — the only living barrier reef in North America. Beneath its turquoise waters live more than 40 types of coral and 650 fish species, including parrotfish, angelfish, and barracuda. The star attraction is the "Christ of the Abyss" sculpture at 6 meters depth, a replica of the Italian original. Diving excursions last about 2 hours and can be booked at the park without prior certification for snorkeling.',
    como_llegar_es: 'Desde Miami: toma la US-1 Sur (Overseas Highway) hacia Key Largo, aproximadamente 1 hora (60 millas). El parque está en el MM 102.5 de la US-1. Hay autobús FlixBus desde Miami Downtown hasta Key Largo. Parking disponible en el parque por $8.',
    como_llegar_en: 'From Miami: take US-1 South (Overseas Highway) toward Key Largo, approximately 1 hour (60 miles). The park is at Mile Marker 102.5 on US-1. FlixBus runs from Miami Downtown to Key Largo. Parking available at the park for $8.',
    foto: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.1265, lng: -80.4087,
    dificultad_es: 'Moderado', dificultad_en: 'Moderate', dificultad_clase: 'moderado',
    precio: 'Desde $30', horarios: '8am – Sunset',
    tipo: 'mar', tipo_es: 'Buceo · Snorkeling', tipo_en: 'Scuba · Snorkeling',
    activo: true,
    resenas: [
      {
        nombre: 'Carlos Mendoza',
        avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '8 Mar 2026', estrellas: 5,
        texto_es: 'El arrecife es espectacular. Nunca había visto tanta vida marina en un solo lugar. El Cristo del Abismo es escalofriante en el buen sentido — lo encuentras de repente entre los corales y te paraliza de asombro.',
        texto_en: 'The reef is spectacular. I had never seen so much marine life in one place. The Christ of the Abyss is awe-inspiring — you find it suddenly among the corals and it stops you cold with wonder.'
      },
      {
        nombre: 'Sofía Herrera',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '22 Feb 2026', estrellas: 5,
        texto_es: 'El snorkeling en aguas tan cristalinas fue mágico. Fuimos en el tour de la tarde y tuvimos el arrecife casi para nosotros solos. Los peces de colores nadan literalmente a tu lado sin miedo.',
        texto_en: 'Snorkeling in such clear waters was magical. We went on the afternoon tour and practically had the reef to ourselves. The colorful fish literally swim right beside you without any fear.'
      },
      {
        nombre: 'Javier Ríos',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '14 Ene 2026', estrellas: 4,
        texto_es: 'Las excursiones de buceo duran 2 horas y valen cada centavo. Hay que llegar temprano para no esperar — los tours de la mañana son los más populares y el agua está más calma. Recomiendo certificarse antes.',
        texto_en: 'The diving excursions last 2 hours and are worth every penny. Arrive early to avoid waiting — morning tours are the most popular and the water is calmer. I recommend getting certified beforehand.'
      }
    ]
  },
  {
    id: 3,
    nombre_es: 'Biscayne Bay',
    nombre_en: 'Biscayne Bay',
    descripcion_es: 'Aguas cristalinas en el corazón de Miami para kayak, paddle board y snorkeling, con vistas al skyline más icónico de Florida.',
    descripcion_en: "Crystal-clear waters in the heart of Miami for kayaking, paddle boarding and snorkeling, with views of Florida's most iconic skyline.",
    descripcion_larga_es: 'Biscayne Bay es una laguna costera de 35 millas de largo ubicada entre Miami y las Bahamas — un cuerpo de agua que conecta la ciudad con el océano Atlántico. Sus aguas poco profundas (2-3 metros en promedio) son ideales para kayak y paddle board incluso para principiantes. En días claros puedes ver el fondo marino desde la superficie. El Parque Nacional Biscayne protege el 95% de sus aguas y es hogar de manatíes, delfines y tortugas marinas. Desde la bahía, las vistas del Downtown Miami y de Miami Beach ofrecen postales únicas, especialmente al atardecer cuando los rascacielos se iluminan de naranja.',
    descripcion_larga_en: 'Biscayne Bay is a 35-mile coastal lagoon located between Miami and the Bahamas — a body of water connecting the city to the Atlantic Ocean. Its shallow waters (2-3 meters average) are ideal for kayaking and paddleboarding even for beginners. On clear days you can see the ocean floor from the surface. Biscayne National Park protects 95% of its waters and is home to manatees, dolphins, and sea turtles. From the bay, the views of Downtown Miami and Miami Beach offer unique picture-perfect moments, especially at sunset when the skyscrapers glow orange.',
    como_llegar_es: 'Acceso desde Bayside Marketplace en Downtown Miami (varios operadores de kayak y tour), desde Virginia Key o desde el Matheson Hammock Park en Coral Gables. Metromover desde Brickell llega a Bayside. Las rutas en kayak más populares van de Bayside a Star Island y Venetian Islands.',
    como_llegar_en: 'Access from Bayside Marketplace in Downtown Miami (several kayak and tour operators), from Virginia Key or Matheson Hammock Park in Coral Gables. Metromover from Brickell reaches Bayside. The most popular kayak routes go from Bayside to Star Island and the Venetian Islands.',
    foto: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.4687, lng: -80.3275,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Desde $35', horarios: 'Amanecer – Atardecer',
    tipo: 'mar', tipo_es: 'Kayak · Paddle Board', tipo_en: 'Kayak · Paddle Board',
    activo: true,
    resenas: [
      {
        nombre: 'Valentina Cruz',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '15 Mar 2026', estrellas: 5,
        texto_es: 'Hacer paddleboard con el skyline de Miami de fondo es una de las experiencias más cinematográficas que he vivido. El agua está increíblemente limpia y se puede ver el fondo a varios metros de profundidad.',
        texto_en: 'Paddleboarding with the Miami skyline in the background is one of the most cinematic experiences I\'ve ever had. The water is incredibly clean and you can see the bottom several meters down.'
      },
      {
        nombre: 'Andrés Palacios',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '3 Mar 2026', estrellas: 4,
        texto_es: 'Ideal para principiantes como yo. Las aguas de la bahía son muy tranquilas y los instructores de kayak son pacientes y profesionales. Vimos un manatí desde el kayak — ese momento no tiene precio.',
        texto_en: 'Ideal for beginners like me. The bay waters are very calm and the kayak instructors are patient and professional. We spotted a manatee from the kayak — that moment is priceless.'
      },
      {
        nombre: 'Daniela Fuentes',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '18 Feb 2026', estrellas: 5,
        texto_es: 'Alquilamos kayaks por 3 horas y exploramos toda la bahía hasta las Venetian Islands. La puesta del sol desde el agua con Downtown iluminado al fondo es algo que hay que experimentar al menos una vez en la vida.',
        texto_en: 'We rented kayaks for 3 hours and explored the entire bay up to the Venetian Islands. The sunset from the water with Downtown lit up in the background is something you have to experience at least once in your life.'
      }
    ]
  },
  {
    id: 4,
    nombre_es: 'Bill Baggs Cape Florida',
    nombre_en: 'Bill Baggs Cape Florida',
    descripcion_es: 'Playa prístina, ciclismo costero y el faro histórico de Key Biscayne. El escape perfecto a minutos del centro de Miami.',
    descripcion_en: 'Pristine beach, coastal cycling and the historic Key Biscayne lighthouse. The perfect escape just minutes from downtown Miami.',
    descripcion_larga_es: 'Bill Baggs Cape Florida State Park ocupa el extremo sur de Key Biscayne y alberga el faro más antiguo de Miami, construido en 1825. La playa de casi 2 kilómetros es consistentemente votada entre las mejores de Florida por la calidad de su arena blanca y la claridad de sus aguas verdeazuladas. El parque cuenta con carriles de bicicleta, áreas de picnic y dos restaurantes con terrazas al mar. El faro, que sirvió como punto de orientación para navegantes durante siglos, ofrece tours guiados los jueves y viernes. Desde la cima, en días claros, se puede ver el Skyline de Miami, Key Largo y en ocasiones las Bahamas.',
    descripcion_larga_en: 'Bill Baggs Cape Florida State Park occupies the southern tip of Key Biscayne and houses Miami\'s oldest lighthouse, built in 1825. The nearly 2-kilometer beach is consistently voted among Florida\'s best for the quality of its white sand and clarity of its blue-green waters. The park features bike lanes, picnic areas, and two waterfront restaurants with ocean terraces. The lighthouse, which served as a navigation point for sailors for centuries, offers guided tours on Thursdays and Fridays. From the top, on clear days, you can see the Miami skyline, Key Largo, and occasionally the Bahamas.',
    como_llegar_es: 'Desde Miami: cruza el Rickenbacker Causeway hacia Key Biscayne ($2 peaje). Son 15-20 minutos desde Brickell. Bus 102 de Miami-Dade Transit llega hasta Key Biscayne Village, luego bicicleta o taxi hasta el parque. Parking dentro del parque: $8/vehículo. Se recomienda llegar antes de las 9am los fines de semana.',
    como_llegar_en: 'From Miami: cross the Rickenbacker Causeway to Key Biscayne ($2 toll). It\'s 15-20 minutes from Brickell. Miami-Dade Transit Bus 102 reaches Key Biscayne Village, then bike or taxi to the park. Parking inside the park: $8/vehicle. Arriving before 9am on weekends is recommended.',
    foto: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.6671, lng: -80.1555,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$8 / vehículo', horarios: '8am – Sunset',
    tipo: 'tierra', tipo_es: 'Playa · Ciclismo', tipo_en: 'Beach · Cycling',
    activo: true,
    resenas: [
      {
        nombre: 'Luis Fernando T.',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '10 Mar 2026', estrellas: 5,
        texto_es: 'La playa más limpia de Miami, sin duda. La arena es blanquísima y el agua tiene ese color turquesa que solo ves en el Caribe. El faro histórico le da un carácter que no tiene ninguna otra playa del sur de Florida.',
        texto_en: 'The cleanest beach in Miami, without a doubt. The sand is brilliantly white and the water has that turquoise color you only see in the Caribbean. The historic lighthouse gives it a character no other beach in South Florida has.'
      },
      {
        nombre: 'Camila Rondón',
        avatar: 'https://images.unsplash.com/photo-1524888823748-7e95abb5aa0c?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '25 Feb 2026', estrellas: 4,
        texto_es: 'El tour del faro los jueves es imperdible. El guía cuenta la historia de los ataques seminoles de 1836 con tanto detalle que parece una película. La vista desde arriba hacia el ocean y el skyline es espectacular.',
        texto_en: 'The Thursday lighthouse tour is unmissable. The guide tells the story of the 1836 Seminole attacks in such detail it feels like a movie. The view from the top over the ocean and skyline is spectacular.'
      },
      {
        nombre: 'Martín Saavedra',
        avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '9 Feb 2026', estrellas: 5,
        texto_es: 'Fuimos en bicicleta alquilada por todo el perímetro del parque — son unos 8 kilómetros con vistas al mar en cada tramo. Luego cenamos en el restaurante del parque con los pies en la arena. Perfecto.',
        texto_en: 'We cycled around the entire park perimeter on rental bikes — about 8 kilometers with ocean views at every turn. Then we had dinner at the park restaurant with our feet in the sand. Perfect.'
      }
    ]
  },
  {
    id: 5,
    nombre_es: 'Oleta River State Park',
    nombre_en: 'Oleta River State Park',
    descripcion_es: 'El parque urbano más grande de Florida: kayak entre manglares, mountain bike y campismo a orillas del río Oleta en North Miami Beach.',
    descripcion_en: 'The largest urban park in Florida: kayaking through mangroves, mountain biking and camping on the banks of the Oleta River.',
    descripcion_larga_es: 'Oleta River State Park es el parque urbano más grande de Florida con 400 hectáreas de manglares, playas de río y trails de mountain bike dentro del área metropolitana de Miami. El río Oleta serpentea entre manglares centenarios creando canales secretos que solo se descubren en kayak — algunos tan estrechos que las ramas rozan los hombros. El parque cuenta con 14 kilómetros de rutas de bicicleta de montaña clasificadas entre "fácil" y "doble negro", convirtiéndolo en el destino favorito de ciclistas locales. También ofrece camping en cabañas frente al agua y una pequeña playa protegida del oleaje del océano por la barrera de manglares.',
    descripcion_larga_en: 'Oleta River State Park is the largest urban park in Florida with 400 hectares of mangroves, river beaches, and mountain bike trails within the Miami metropolitan area. The Oleta River winds through centuries-old mangroves creating secret channels only discovered by kayak — some so narrow that branches brush your shoulders. The park features 14 kilometers of mountain bike routes rated from "easy" to "double black diamond," making it the favorite destination of local cyclists. It also offers waterfront cabin camping and a small beach protected from ocean waves by the mangrove barrier.',
    como_llegar_es: 'En North Miami Beach, en el 3400 NE 163rd Street. Desde Miami: I-95 Norte hasta la salida 163rd Street, luego este hasta el parque (20-30 min). Bus 3 de Miami-Dade Transit tiene parada cerca. Parking: $6/persona. Alquiler de kayaks y bicicletas disponible dentro del parque sin reserva previa.',
    como_llegar_en: 'In North Miami Beach, at 3400 NE 163rd Street. From Miami: I-95 North to 163rd Street exit, then east to the park (20-30 min). Miami-Dade Transit Bus 3 stops nearby. Parking: $6/person. Kayak and bicycle rentals available inside the park without prior reservation.',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.9265, lng: -80.1390,
    dificultad_es: 'Moderado', dificultad_en: 'Moderate', dificultad_clase: 'moderado',
    precio: '$6 / persona', horarios: '8am – Sunset',
    tipo: 'tierra', tipo_es: 'Kayak · Mountain Bike', tipo_en: 'Kayak · Mountain Bike',
    activo: true,
    resenas: [
      {
        nombre: 'Patricia Núñez',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '14 Mar 2026', estrellas: 5,
        texto_es: 'Las rutas de mountain bike son de otro nivel. La "Oleta Blackwood" para avanzados tiene saltos y cambios de elevación que te ponen el corazón en la boca. Y al terminar te refrescas en la playa del río — combinación perfecta.',
        texto_en: 'The mountain bike trails are another level entirely. The "Oleta Blackwood" for advanced riders has jumps and elevation changes that get your heart racing. And when you\'re done you cool off at the river beach — perfect combination.'
      },
      {
        nombre: 'Sebastián Castro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '28 Feb 2026', estrellas: 4,
        texto_es: 'El kayak por los manglares es una experiencia de otro mundo — hay canales tan angostos que casi tocas los árboles de los dos lados. Vimos garças y varios tipos de peces entre las raíces. Alquilamos kayak en el parque por $25/hora.',
        texto_en: 'Kayaking through the mangroves is a world apart — there are channels so narrow you almost touch the trees on both sides. We spotted herons and several fish species among the roots. Rented kayaks at the park for $25/hour.'
      },
      {
        nombre: 'Valeria Torres',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '20 Ene 2026', estrellas: 5,
        texto_es: 'Lo mejor de Miami que está a solo 20 minutos del centro. Hicimos las rutas de bici por la mañana, kayak por la tarde y nos quedamos a ver el atardecer desde la cabaña. Un parque que no se cansa de sorprender.',
        texto_en: 'The best of Miami just 20 minutes from downtown. We did the bike trails in the morning, kayak in the afternoon, and stayed to watch the sunset from the cabin. A park that never stops surprising you.'
      }
    ]
  },
  {
    id: 6,
    nombre_es: 'Virginia Key Beach Park',
    nombre_en: 'Virginia Key Beach Park',
    descripcion_es: 'Playa histórica de Miami con aguas calmadas, ideal para paddle board, natación y kayak. Un tesoro escondido a minutos del Downtown.',
    descripcion_en: 'Historic Miami beach with calm waters, ideal for paddle boarding, swimming and kayaking. A hidden gem minutes from Downtown.',
    descripcion_larga_es: 'Virginia Key Beach Park tiene una historia tan profunda como sus aguas — fue la única playa de Miami a la que podían acceder los residentes afroamericanos durante la era de la segregación (1945–1982). Hoy es un parque histórico restaurado con una playa larga y tranquila protegida por una barra de arena natural que amortigua las olas. Sus aguas serenas son perfectas para paddle board, kayak y natación en familia. El parque tiene un carrusel vintage restaurado, áreas de picnic bajo palmas y un museo pequeño que documenta su historia. Al atardecer, las vistas hacia el puerto de Miami y los cruceros son espectaculares.',
    descripcion_larga_en: 'Virginia Key Beach Park has a history as deep as its waters — it was the only Miami beach accessible to African American residents during the segregation era (1945–1982). Today it is a restored historic park with a long, calm beach protected by a natural sandbar that dampens the waves. Its serene waters are perfect for paddleboarding, kayaking, and family swimming. The park features a restored vintage carousel, picnic areas under palms, and a small museum documenting its history. At sunset, the views toward Miami port and the cruise ships are spectacular.',
    como_llegar_es: 'En Virginia Key, accesible por el Rickenbacker Causeway desde Brickell ($2 peaje), antes de llegar a Key Biscayne. Son solo 10 minutos desde Downtown Miami. Parking: $10/vehículo. No hay transporte público directo — se recomienda auto, Uber o bicicleta por el carril del causeway.',
    como_llegar_en: 'On Virginia Key, accessible via the Rickenbacker Causeway from Brickell ($2 toll), before reaching Key Biscayne. Just 10 minutes from Downtown Miami. Parking: $10/vehicle. No direct public transit — car, Uber, or bicycle via the causeway bike lane recommended.',
    foto: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=800&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.7333, lng: -80.1583,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$10 / vehículo', horarios: '7am – 7pm',
    tipo: 'mar', tipo_es: 'Paddle Board · Natación', tipo_en: 'Paddle Board · Swimming',
    activo: true,
    resenas: [
      {
        nombre: 'Gabriela Morales',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '16 Mar 2026', estrellas: 5,
        texto_es: 'Las aguas son perfectas para paddle board — sin oleaje, sin corrientes, el tablero se desliza solo. El atardecer desde el agua con los cruceros pasando por el puerto de Miami al fondo es una postal que no se olvida.',
        texto_en: 'The waters are perfect for paddleboarding — no waves, no currents, the board just glides. The sunset from the water with cruise ships passing through Miami port in the background is an image you never forget.'
      },
      {
        nombre: 'Ricardo Espinoza',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '4 Mar 2026', estrellas: 4,
        texto_es: 'Un tesoro escondido que poca gente de Miami conoce. La historia de la segregación del parque es poderosa — el museo pequeño al lado de la playa vale una visita. La playa en sí es tranquila y muy limpia.',
        texto_en: 'A hidden gem that few Miami locals know about. The park\'s segregation history is powerful — the small museum next to the beach is worth visiting. The beach itself is calm and very clean.'
      },
      {
        nombre: 'Natalia Guzmán',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&h=80&q=80',
        fecha: '25 Feb 2026', estrellas: 5,
        texto_es: 'La playa más tranquila a 10 minutos de Downtown — eso es casi un milagro en una ciudad como Miami. Llevamos a los niños a nadar y fue perfecto: agua calma, arena fina y casi ninguna gente entre semana.',
        texto_en: 'The calmest beach 10 minutes from Downtown — that\'s almost a miracle in a city like Miami. We brought the kids to swim and it was perfect: calm water, fine sand, and almost no crowds on weekdays.'
      }
    ]
  }
];

/* ===== INICIALIZACIÓN DE DATOS EN localStorage ===== */
/* Solo siembra los datos por defecto si no existen aún */
if (!localStorage.getItem('em_destinos')) {
  localStorage.setItem('em_destinos', JSON.stringify(DESTINOS_DEFAULT));
}

/* Obtiene destinos de localStorage (o los de por defecto si hay error) */
function obtenerDestinos() {
  try {
    var d = JSON.parse(localStorage.getItem('em_destinos'));
    return (d && d.length) ? d : DESTINOS_DEFAULT;
  } catch (e) { return DESTINOS_DEFAULT; }
}

/* ===== TRACKING: VISITAS Y CLICS ===== */

/* Registra una visita al sitio con la fecha de hoy */
function registrarVisita() {
  var hoy = new Date().toISOString().split('T')[0]; /* YYYY-MM-DD */
  var visitas = {};
  try { visitas = JSON.parse(localStorage.getItem('em_visitas')) || {}; } catch (e) {}
  visitas[hoy] = (visitas[hoy] || 0) + 1;
  localStorage.setItem('em_visitas', JSON.stringify(visitas));
}

/* Registra el clic en una tarjeta de destino por su ID */
function registrarClic(idDestino) {
  var clics = {};
  try { clics = JSON.parse(localStorage.getItem('em_clics')) || {}; } catch (e) {}
  clics[String(idDestino)] = (clics[String(idDestino)] || 0) + 1;
  localStorage.setItem('em_clics', JSON.stringify(clics));
}

/* ===== RENDER DE TARJETAS DE DESTINO ===== */
var filtroActivo = 'todos';

function renderDestinos(filtro) {
  filtro = filtro || filtroActivo;
  var grid = document.getElementById('destinosGrid');
  if (!grid) return;

  var lista = obtenerDestinos().filter(function (d) {
    return d.activo && (filtro === 'todos' || d.tipo === filtro);
  });

  /* Construye el HTML de cada tarjeta */
  grid.innerHTML = lista.map(function (d, i) {
    var delay = (i % 3) * 0.12;
    return (
      /* onclick registra el clic y abre el modal */
      '<article class="destino-card fade-up" data-tipo="' + d.tipo + '" style="transition-delay:' + delay + 's" ' +
               'onclick="registrarClic(' + d.id + '); abrirModal(' + d.id + ');" role="button" tabindex="0" ' +
               'aria-label="Ver detalles de ' + d.nombre_es + '" ' +
               'onkeydown="if(event.key===\'Enter\'||event.key===\' \'){registrarClic(' + d.id + ');abrirModal(' + d.id + ')}">' +
        '<div class="destino-card__img-cont">' +
          '<img src="' + d.foto + '" alt="' + d.nombre_es + '" class="destino-card__img" loading="lazy" />' +
          '<span class="destino-card__badge destino-card__badge--tipo destino-card__badge--' + d.tipo + '">' +
            '<span class="lang-es">' + d.tipo_es + '</span>' +
            '<span class="lang-en">' + d.tipo_en + '</span>' +
          '</span>' +
          '<span class="destino-card__badge destino-card__badge--dif destino-card__badge--' + d.dificultad_clase + '">' +
            '<span class="lang-es">' + d.dificultad_es + '</span>' +
            '<span class="lang-en">' + d.dificultad_en + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="destino-card__info">' +
          '<h3 class="destino-card__nombre">' +
            '<span class="lang-es">' + d.nombre_es + '</span>' +
            '<span class="lang-en">' + d.nombre_en + '</span>' +
          '</h3>' +
          '<p class="destino-card__desc">' +
            '<span class="lang-es">' + d.descripcion_es + '</span>' +
            '<span class="lang-en">' + d.descripcion_en + '</span>' +
          '</p>' +
          '<div class="destino-card__meta">' +
            '<span class="destino-card__meta-item"><span class="meta-icono">💲</span>' + d.precio + '</span>' +
            '<span class="destino-card__meta-item"><span class="meta-icono">⏰</span>' + d.horarios + '</span>' +
          '</div>' +
          /* Botón que abre el modal en lugar de ir a Maps directamente */
          '<button class="btn btn--primario destino-card__btn" onclick="event.stopPropagation(); registrarClic(' + d.id + '); abrirModal(' + d.id + ');">' +
            '<span class="lang-es">Ver destino</span>' +
            '<span class="lang-en">View destination</span>' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  initScrollAnimation();
}

/* ===== SISTEMA DE MODAL A PANTALLA COMPLETA ===== */

/* Abre el modal con la información del destino */
function abrirModal(idDestino) {
  var destinos = obtenerDestinos();
  /* Busca en los datos base primero; si no tiene galería, la toma de DESTINOS_DEFAULT */
  var d = destinos.find(function (x) { return x.id === idDestino; });
  if (!d) return;

  /* Si el destino en localStorage no tiene galería ni reseñas, busca en los defaults */
  var dDefault = DESTINOS_DEFAULT.find(function (x) { return x.id === idDestino; });
  if (dDefault) {
    d.galeria           = d.galeria           || dDefault.galeria;
    d.descripcion_larga_es = d.descripcion_larga_es || dDefault.descripcion_larga_es;
    d.descripcion_larga_en = d.descripcion_larga_en || dDefault.descripcion_larga_en;
    d.como_llegar_es    = d.como_llegar_es    || dDefault.como_llegar_es;
    d.como_llegar_en    = d.como_llegar_en    || dDefault.como_llegar_en;
    d.resenas           = d.resenas           || dDefault.resenas;
  }

  var idioma = (typeof IDIOMA_ACTUAL !== 'undefined') ? IDIOMA_ACTUAL : 'es';
  var esEs   = (idioma === 'es');

  /* Determina el idioma activo para mostrar el contenido correcto */
  var nombre      = esEs ? d.nombre_es      : d.nombre_en;
  var descCorta   = esEs ? d.descripcion_es : d.descripcion_en;
  var descLarga   = esEs ? (d.descripcion_larga_es || descCorta) : (d.descripcion_larga_en || descCorta);
  var comoLlegar  = esEs ? (d.como_llegar_es || '')  : (d.como_llegar_en || '');
  var tipoLabel   = esEs ? d.tipo_es        : d.tipo_en;
  var difLabel    = esEs ? d.dificultad_es  : d.dificultad_en;

  /* 1. Galería de fotos */
  var galeria = d.galeria || [d.foto];
  var gHtml = '';
  if (galeria.length >= 3) {
    gHtml =
      '<div class="modal-galeria-grid">' +
        '<img src="' + galeria[0] + '" alt="' + nombre + ' — foto principal" class="modal-galeria-main" />' +
        '<div class="modal-galeria-lateral">' +
          '<img src="' + galeria[1] + '" alt="' + nombre + ' — foto 2" />' +
          '<img src="' + galeria[2] + '" alt="' + nombre + ' — foto 3" />' +
        '</div>' +
      '</div>';
  } else {
    gHtml = '<div class="modal-galeria-simple"><img src="' + galeria[0] + '" alt="' + nombre + '" /></div>';
  }
  document.getElementById('modalGaleria').innerHTML = gHtml;

  /* 2. Nombre y descripción */
  document.getElementById('modalNombreH').textContent = nombre;
  document.getElementById('modalDescCorta').textContent = descCorta;
  document.getElementById('modalDescLarga').textContent = descLarga;

  /* 3. Badges tipo + dificultad */
  document.getElementById('modalBadges').innerHTML =
    '<span class="modal-badge modal-badge--' + d.tipo + '">' + tipoLabel + '</span>' +
    '<span class="modal-badge modal-badge--dif modal-badge--' + d.dificultad_clase + '">' + difLabel + '</span>';

  /* 4. Datos prácticos */
  var mapsUrl = 'https://www.google.com/maps?q=' + d.lat + ',' + d.lng;
  document.getElementById('modalDatosGrid').innerHTML =
    '<div class="modal-dato"><span class="modal-dato__icono">💲</span>' +
      '<div><strong>' + (esEs ? 'Precio' : 'Price') + '</strong><span>' + d.precio + '</span></div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">⏰</span>' +
      '<div><strong>' + (esEs ? 'Horarios' : 'Hours') + '</strong><span>' + d.horarios + '</span></div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">📍</span>' +
      '<div><strong>' + (esEs ? 'Dificultad' : 'Difficulty') + '</strong><span>' + difLabel + '</span></div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">🗺️</span>' +
      '<div><strong>GPS</strong><a href="' + mapsUrl + '" target="_blank" rel="noopener">' +
        (esEs ? 'Abrir en Google Maps' : 'Open in Google Maps') + '</a></div>' +
    '</div>';

  /* 5. Cómo llegar */
  if (comoLlegar) {
    document.getElementById('modalLlegar').innerHTML =
      '<h3 class="modal-subtitulo">' + (esEs ? 'Cómo llegar' : 'How to get there') + '</h3>' +
      '<p class="modal-llegar-texto">' + comoLlegar + '</p>';
    document.getElementById('modalLlegar').style.display = 'block';
  } else {
    document.getElementById('modalLlegar').style.display = 'none';
  }

  /* 6. Mapa embed de Google Maps (coordenadas exactas, vista satélite z=14) */
  var mapaSrc = 'https://maps.google.com/maps?q=' + d.lat + ',' + d.lng +
                '&t=k&z=14&ie=UTF8&iwloc=B&output=embed';
  document.getElementById('modalMapaIframe').src = mapaSrc;

  /* 7. Reseñas de visitantes */
  var resenas = d.resenas || [];
  if (resenas.length) {
    var rHtml = '<h3 class="modal-subtitulo">' + (esEs ? 'Reseñas de visitantes' : 'Visitor reviews') + '</h3>' +
      '<div class="modal-resenas-grid">';
    rHtml += resenas.map(function (r) {
      var texto = esEs ? r.texto_es : r.texto_en;
      var estrellas = '';
      for (var s = 0; s < 5; s++) {
        estrellas += '<span class="modal-estrella' + (s < r.estrellas ? ' modal-estrella--llena' : '') + '">★</span>';
      }
      return (
        '<div class="modal-resena">' +
          '<div class="modal-resena__header">' +
            '<img src="' + r.avatar + '" alt="Avatar de ' + r.nombre + '" class="modal-resena__avatar" />' +
            '<div>' +
              '<strong class="modal-resena__nombre">' + r.nombre + '</strong>' +
              '<span class="modal-resena__fecha">' + r.fecha + '</span>' +
            '</div>' +
            '<div class="modal-resena__estrellas">' + estrellas + '</div>' +
          '</div>' +
          '<p class="modal-resena__texto">' + texto + '</p>' +
        '</div>'
      );
    }).join('');
    rHtml += '</div>';
    document.getElementById('modalResenas').innerHTML = rHtml;
  } else {
    document.getElementById('modalResenas').innerHTML = '';
  }

  /* Abre el modal: quita display:none y añade clase .abierto para la transición CSS */
  var modal = document.getElementById('destinoModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; /* Bloquea el scroll del fondo */
  requestAnimationFrame(function () {
    modal.classList.add('abierto');
  });
}

/* Cierra el modal y restaura el scroll */
function cerrarModal() {
  var modal = document.getElementById('destinoModal');
  modal.classList.remove('abierto');
  document.body.style.overflow = '';
  setTimeout(function () {
    modal.style.display = 'none';
    /* Limpia el iframe del mapa para detener la petición */
    var iframe = document.getElementById('modalMapaIframe');
    if (iframe) iframe.src = '';
  }, 320);
}

/* ===== NAVBAR: scroll → sombra + parallax hero ===== */
(function () {
  var header    = document.querySelector('.header');
  var heroFondo = document.querySelector('.hero__fondo');
  if (!header) return;

  window.addEventListener('scroll', function () {
    var sy = window.scrollY;
    header.classList.toggle('header--scrolled', sy > 60);
    if (heroFondo) heroFondo.style.transform = 'translateY(' + (sy * 0.28) + 'px)';
  }, { passive: true });
})();

/* ===== MENÚ HAMBURGUESA ===== */
(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('navMenu');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var ab = nav.classList.toggle('abierto');
    btn.classList.toggle('abierto', ab);
    btn.setAttribute('aria-expanded', String(ab));
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('abierto');
      btn.classList.remove('abierto');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ===== BOTÓN ES / EN ===== */
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('btnIdioma');
  if (btn) {
    btn.addEventListener('click', function () {
      cambiarIdioma(IDIOMA_ACTUAL === 'es' ? 'en' : 'es');
    });
  }
});

/* ===== FILTROS DE DESTINOS ===== */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.filtros__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      filtroActivo = btn.dataset.filtro;
      document.querySelectorAll('.filtros__btn').forEach(function (b) {
        b.classList.remove('filtros__btn--activo');
      });
      btn.classList.add('filtros__btn--activo');
      renderDestinos(filtroActivo);
    });
  });
});

/* ===== FORMULARIO "TRABAJA CON NOSOTROS" ===== */
document.addEventListener('DOMContentLoaded', function () {
  var form  = document.getElementById('formTrabaja');
  var exito = document.getElementById('formExito');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Guarda el contacto en localStorage */
    var contacto = {
      fecha:    new Date().toISOString(),
      nombre:   form.querySelector('[name="nombre"]').value,
      empresa:  form.querySelector('[name="empresa"]').value,
      email:    form.querySelector('[name="email"]').value,
      tel:      form.querySelector('[name="tel"]').value,
      servicio: form.querySelector('[name="servicio"]').value,
      mensaje:  form.querySelector('[name="mensaje"]').value
    };
    try {
      var lista = JSON.parse(localStorage.getItem('em_contactos')) || [];
      lista.push(contacto);
      localStorage.setItem('em_contactos', JSON.stringify(lista));
    } catch (err) { /* silencioso */ }

    form.style.display = 'none';
    if (exito) exito.style.display = 'flex';
  });
});

/* ===== EVENTOS DEL MODAL ===== */
document.addEventListener('DOMContentLoaded', function () {
  /* Botón cerrar */
  var btnCerrar = document.getElementById('modalCerrar');
  if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);

  /* Clic en el fondo oscuro del modal */
  var fondo = document.getElementById('modalFondo');
  if (fondo) fondo.addEventListener('click', cerrarModal);

  /* Tecla Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarModal();
  });
});

/* ===== ANIMACIONES FADE-UP AL SCROLL ===== */
function initScrollAnimation() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('.fade-up:not(.visible)').forEach(function (el) {
    observer.observe(el);
  });
}

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', function () {
  registrarVisita(); /* Registra la visita en localStorage para el dashboard admin */
  renderDestinos();
  initScrollAnimation();
});
