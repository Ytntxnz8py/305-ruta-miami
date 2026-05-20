/* =========================================
   EXPLORA MIAMI — main.js
   Lógica del sitio público
   JS puro, sin librerías externas
   Comentarios en español
========================================= */

/* ===== DATOS DE DESTINOS (9 destinos reales verificados) ===== */
var DESTINOS_DEFAULT = [
  {
    id: 1,
    nombre_es: 'Everglades National Park',
    nombre_en: 'Everglades National Park',
    descripcion_es: 'El humedal subtropical más grande de EE.UU. — kayak, senderismo y avistamiento de caimanes, manatíes y aves exóticas en un ecosistema único declarado Patrimonio de la UNESCO.',
    descripcion_en: 'The largest subtropical wetland in the US — kayaking, hiking and spotting alligators, manatees and exotic birds in a unique UNESCO World Heritage ecosystem.',
    descripcion_larga_es: 'El Parque Nacional Everglades es el tercer parque más grande de EE.UU. y el único ecosistema de pastizales subtropicales del mundo. Declarado Patrimonio de la Humanidad por la UNESCO en 1979, alberga 36 especies en peligro de extinción: la pantera de Florida, el manatí, el cocodrilo americano y más de 350 especies de aves. Sus canales oscuros y manglares crean un laberinto de agua explorable en kayak o canoa desde el área de Nine Mile Pond. La entrada Shark Valley ofrece un mirador de 45 pies con vistas panorámicas sobre el "río de hierba" que da nombre al parque. Al atardecer, miles de ibis americanos vuelan en formación sobre los humedales — un espectáculo que no se repite en ningún otro lugar del planeta. La entrada Ernest Coe en Homestead es el punto de partida para las rutas más profundas.',
    descripcion_larga_en: 'Everglades National Park is the third largest national park in the US and the only subtropical grassland ecosystem in the world. Designated a UNESCO World Heritage Site in 1979, it shelters 36 endangered species: the Florida panther, manatee, American crocodile and over 350 bird species. Its dark channels and mangroves create a maze of water best explored by kayak or canoe from the Nine Mile Pond area. The Shark Valley entrance offers a 45-foot tower with panoramic views over the "river of grass" that names the park. At sunset, thousands of American ibis fly in formation over the wetlands — a spectacle found nowhere else on the planet. The Ernest Coe entrance in Homestead is the starting point for deeper routes.',
    como_llegar_es: 'Desde Miami: Shark Valley está a 35 min por la US-41 Oeste (Tamiami Trail). La entrada Ernest Coe (Homestead) está a 45 min por la US-1 Sur. La zona de Flamingo requiere 1.5 horas. No hay transporte público hacia el interior del parque. Se recomienda auto propio o tour organizado desde Miami.',
    como_llegar_en: 'From Miami: Shark Valley is 35 min via US-41 West (Tamiami Trail). The Ernest Coe entrance (Homestead) is 45 min via US-1 South. The Flamingo area requires 1.5 hours. No public transit into the park. A personal vehicle or organized tour from Miami is recommended.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Everglades_Landscape_%2849833757502%29.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/9/94/Everglades_Landscape_%2849833757502%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2a/Sunset_over_the_River_of_Grass%2C_NPSphoto%2C_G.Gardner_%289255157507%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/ce/9_Mile_Pond_Canoe_Trail_%285%29%2C_NPSPhoto%2C_R_Cammauf_%289101513830%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Gfp-florida-everglades-national-park-landscape-with-alligators-and-heron.jpg'
    ],
    lat: 25.2866, lng: -80.8987,
    dificultad_es: 'Fácil — Moderado', dificultad_en: 'Easy — Moderate', dificultad_clase: 'facil',
    precio: '$35 / vehículo (7 días)', horarios: '24h (Shark Valley: 8am–6pm)',
    tipo: 'tierra', tipo_es: 'Senderismo · Kayak', tipo_en: 'Hiking · Kayak',
    telefono: '(305) 242-7700',
    web_oficial: 'https://www.nps.gov/ever/',
    mejor_epoca: 'Nov–Abr (temporada seca)',
    google_maps_url: 'https://maps.google.com/maps?q=25.2866,-80.8987',
    apple_maps_url: 'https://maps.apple.com/?q=Everglades+National+Park&ll=25.2866,-80.8987',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g294467-d143673-Reviews-Everglades_National_Park-Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'María Consuelo G.', inicial: 'M', color: '#00BCD4',
        fecha: '12 Mar 2026', estrellas: 5,
        texto_es: 'Ver los caimanes de tan cerca en su hábitat natural es algo que no olvidaré. El tour en airboat al amanecer fue absolutamente mágico — la niebla sobre el agua y el silencio del parque crean una atmósfera única que no se puede replicar en ningún otro lugar.',
        texto_en: 'Seeing alligators so close in their natural habitat is something I will never forget. The sunrise airboat tour was absolutely magical — the mist over the water and the silence of the park create a unique atmosphere that cannot be replicated anywhere else.'
      },
      {
        nombre: 'Roberto Díaz', inicial: 'R', color: '#FF6B6B',
        fecha: '28 Feb 2026', estrellas: 4,
        texto_es: 'El kayak entre los manglares de Nine Mile Pond fue lo más destacado. La ruta de 24 km en bicicleta en Shark Valley también es increíble, aunque el sol pega fuerte — lleva mucha agua y protector solar SPF 50.',
        texto_en: 'Kayaking through the Nine Mile Pond mangroves was the highlight. The 24 km bike trail at Shark Valley is also incredible, though the sun beats hard — bring plenty of water and SPF 50 sunscreen.'
      },
      {
        nombre: 'Ana Villareal', inicial: 'A', color: '#FFB300',
        fecha: '5 Feb 2026', estrellas: 5,
        texto_es: 'Un ecosistema que no existe en ningún otro lugar del planeta. Fuimos al atardecer y el vuelo de los ibis en formación nos dejó sin palabras. Definitivamente hay que volver para hacer camping en Flamingo.',
        texto_en: 'An ecosystem that exists nowhere else on the planet. We went at sunset and the ibis flying in formation left us speechless. Definitely need to come back to camp at Flamingo.'
      }
    ]
  },
  {
    id: 2,
    nombre_es: 'John Pennekamp Coral Reef State Park',
    nombre_en: 'John Pennekamp Coral Reef State Park',
    descripcion_es: 'El primer parque marino de EE.UU. — buceo y snorkeling sobre el único arrecife de coral vivo de tierra firme en el país, con aguas cristalinas y vida marina espectacular en Key Largo.',
    descripcion_en: 'The first underwater park in the US — diving and snorkeling over the only living coral reef on the US mainland, with crystal-clear waters and spectacular marine life in Key Largo.',
    descripcion_larga_es: 'John Pennekamp Coral Reef State Park fue designado en 1960 como el primer parque marino protegido de EE.UU. Cubre 178 millas náuticas cuadradas de Ocean y contiene el único arrecife de coral vivo de tierra firme del país, hogar de más de 600 especies de peces, 55 especies de coral y decenas de tipos de esponjas y crustáceos. La icónica estatua "Cristo del Abismo" — réplica de la original italiana — se encuentra a 6 metros de profundidad y recibe miles de visitantes al año. Los tours de esnórquel de 2.5 horas salen varias veces al día y no requieren experiencia previa. Los buceadores certificados tienen acceso a los mejores arrecifes del parque. Las aguas cálidas (promedio 28°C en verano) permiten bucear cómodamente todo el año.',
    descripcion_larga_en: 'John Pennekamp Coral Reef State Park was designated in 1960 as the first protected marine park in the US. It covers 178 square nautical miles of ocean and contains the only living coral reef on the US mainland, home to over 600 fish species, 55 coral species and dozens of sponge and crustacean types. The iconic "Christ of the Abyss" statue — a replica of the Italian original — sits 6 meters underwater and receives thousands of visitors yearly. 2.5-hour snorkel tours depart several times daily and require no prior experience. Certified divers have access to the park\'s best reefs. Warm waters (average 28°C in summer) allow comfortable diving year-round.',
    como_llegar_es: 'A 1 hora y 15 minutos de Miami por la US-1 Sur (Overseas Highway). La entrada del parque está en el milla marcador 102.5 de la US-1, en Key Largo. No hay transporte público desde Miami — se recomienda auto o tour organizado que incluye transporte desde Miami.',
    como_llegar_en: 'About 1 hour 15 minutes from Miami via US-1 South (Overseas Highway). The park entrance is at mile marker 102.5 on US-1, in Key Largo. No public transit from Miami — a personal vehicle or organized tour including transport from Miami is recommended.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/John_Pennekamp_Coral_Reef_State_Park_%289189335824%29.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a6/John_Pennekamp_Coral_Reef_State_Park_%289189335824%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/50/A_FEW_OF_THE_MANY_SPECIES_OF_CORAL_AND_MARINE_LIFE_AT_JOHN_PENNEKAMP_CORAL_REEF_STATE_PARK_NEAR_KEY_LARGO._THE_FISH..._-_NARA_-_548718.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/8b/John_Pennekamp_Coral_Reef_State_Park_%289189339738%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9f/John_Pennekamp_Coral_Reef_State_Park_-_panoramio.jpg'
    ],
    lat: 25.1288, lng: -80.4072,
    dificultad_es: 'Fácil — Moderado', dificultad_en: 'Easy — Moderate', dificultad_clase: 'facil',
    precio: '$8 / persona + tours desde $32', horarios: '8am–sunset',
    tipo: 'mar', tipo_es: 'Buceo · Snorkeling', tipo_en: 'Diving · Snorkeling',
    telefono: '(305) 451-6300',
    web_oficial: 'https://www.floridastateparks.org/parks-and-trails/john-pennekamp-coral-reef-state-park',
    mejor_epoca: 'Mar–Jun (visibilidad máxima)',
    google_maps_url: 'https://maps.google.com/maps?q=25.1288,-80.4072',
    apple_maps_url: 'https://maps.apple.com/?q=John+Pennekamp+Coral+Reef+State+Park&ll=25.1288,-80.4072',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34275-d143712-Reviews-John_Pennekamp_Coral_Reef_State_Park-Key_Largo_Florida_Keys_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Carolina Méndez', inicial: 'C', color: '#00BCD4',
        fecha: '18 Mar 2026', estrellas: 5,
        texto_es: 'El snorkeling sobre el arrecife fue una experiencia transformadora. Ver el "Cristo del Abismo" bajo el agua es algo que no esperaba — la estatua y los peces de colores a su alrededor crean una imagen surrealista e inolvidable.',
        texto_en: 'Snorkeling over the reef was a transformative experience. Seeing the "Christ of the Abyss" underwater was unexpected — the statue and colorful fish around it create a surreal and unforgettable image.'
      },
      {
        nombre: 'Luis Peña', inicial: 'L', color: '#FF6B6B',
        fecha: '2 Mar 2026', estrellas: 5,
        texto_es: 'Primera vez buceando en mi vida y fue perfecto. Los instructores del parque son pacientes y profesionales. El arrecife tiene colores increíbles — parrot fish, angel fish, barracudas. Absolutamente recomendado.',
        texto_en: 'First time diving in my life and it was perfect. The park instructors are patient and professional. The reef has incredible colors — parrot fish, angel fish, barracudas. Absolutely recommended.'
      },
      {
        nombre: 'Sofía Ramírez', inicial: 'S', color: '#FFB300',
        fecha: '15 Feb 2026', estrellas: 4,
        texto_es: 'Tour de snorkeling excelente, guía muy conocedor de la fauna. La visibilidad estaba en 20 metros ese día. El único problema: el parqueo se llena muy rápido los fines de semana — llega antes de las 9am.',
        texto_en: 'Excellent snorkel tour, very knowledgeable guide about the fauna. Visibility was 20 meters that day. One issue: the parking fills up fast on weekends — arrive before 9am.'
      }
    ]
  },
  {
    id: 3,
    nombre_es: 'Biscayne National Park',
    nombre_en: 'Biscayne National Park',
    descripcion_es: 'El parque nacional más acuático de EE.UU. — el 95% es agua. Kayak, snorkeling y buceo entre barcos hundidos históricos en la bahía más transparente de Florida, a solo 40 min de Miami.',
    descripcion_en: 'The most aquatic national park in the US — 95% water. Kayaking, snorkeling and diving among historic shipwrecks in Florida\'s clearest bay, just 40 min from Miami.',
    descripcion_larga_es: 'Biscayne National Park protege el ecosistema de arrecifes, bahía y manglares más intacto al sur de Florida. El parque es 95% agua, lo que lo convierte en el parque nacional más acuático de EE.UU. La bahía de Biscayne tiene aguas de visibilidad excepcional, ideales para el kayak y el snorkeling en sus manglares e islas (cays). El Maritime Heritage Trail conecta seis barcos hundidos históricos accesibles para buceo, incluyendo el SS Lugano (1913) y el Mandalay (1966). Las islas Adams Key y Elliott Key tienen senderos naturales accesibles solo en bote. El centro de visitantes Dante Fascell ofrece tours en bote desde $45 hasta las islas. Ideal para un día completo desde Miami.',
    descripcion_larga_en: 'Biscayne National Park protects the most intact reef, bay and mangrove ecosystem in south Florida. The park is 95% water, making it the most aquatic national park in the US. Biscayne Bay has exceptional water visibility, ideal for kayaking and snorkeling among its mangroves and cays. The Maritime Heritage Trail connects six historic shipwrecks accessible for diving, including the SS Lugano (1913) and the Mandalay (1966). Adams Key and Elliott Key islands have nature trails accessible only by boat. The Dante Fascell Visitor Center offers boat tours from $45 to the islands. Perfect for a full day from Miami.',
    como_llegar_es: 'A 40 minutos de Miami por la US-1 Sur hacia Homestead. Sigue Convoy Point Road hasta el centro de visitantes Dante Fascell. Hay parqueo gratuito. Los tours en bote salen desde el centro de visitantes. La entrada en auto es gratuita.',
    como_llegar_en: 'About 40 minutes from Miami via US-1 South toward Homestead. Follow Convoy Point Road to the Dante Fascell Visitor Center. Free parking available. Boat tours depart from the visitor center. Vehicle entry is free.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Gfp-florida-biscayne-national-park-biscayne-shoreline.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/9/97/Gfp-florida-biscayne-national-park-biscayne-shoreline.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/77/Gfp-florida-biscayne-national-park-biscayne-marina.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/14/Elkhorn_Coral_Biscayne_NP1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/81/Gfp-florida-biscayne-national-park-islandlandscape.jpg'
    ],
    lat: 25.4729, lng: -80.3340,
    dificultad_es: 'Fácil — Moderado', dificultad_en: 'Easy — Moderate', dificultad_clase: 'facil',
    precio: 'Entrada gratis · Tours: $45–$65', horarios: '7am–5:30pm (Visitor Center)',
    tipo: 'mar', tipo_es: 'Kayak · Snorkeling · Buceo', tipo_en: 'Kayak · Snorkeling · Diving',
    telefono: '(305) 230-1144',
    web_oficial: 'https://www.nps.gov/bisc/',
    mejor_epoca: 'Nov–Abr (aguas más tranquilas)',
    google_maps_url: 'https://maps.google.com/maps?q=25.4729,-80.3340',
    apple_maps_url: 'https://maps.apple.com/?q=Biscayne+National+Park&ll=25.4729,-80.3340',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34262-d143693-Reviews-Biscayne_National_Park-Homestead_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Daniela Torres', inicial: 'D', color: '#00BCD4',
        fecha: '9 Mar 2026', estrellas: 5,
        texto_es: 'El kayak entre los manglares es una experiencia mística. El agua es tan clara que puedes ver el fondo en todo momento. El tour al Maritime Heritage Trail para ver los barcos hundidos es impresionante — no se puede hacer sin guía y vale cada centavo.',
        texto_en: 'Kayaking among the mangroves is a mystical experience. The water is so clear you can see the bottom at all times. The Maritime Heritage Trail tour to see the shipwrecks is impressive — you can\'t do it without a guide and it\'s worth every penny.'
      },
      {
        nombre: 'Jorge Castillo', inicial: 'J', color: '#FF6B6B',
        fecha: '22 Feb 2026', estrellas: 5,
        texto_es: 'Descubrí este parque por casualidad y fue la mejor sorpresa. Está tan cerca de Miami y parece estar en otro mundo. Los flamencos en la bahía al amanecer son simplemente irreal. Volvemos el próximo mes.',
        texto_en: 'I discovered this park by chance and it was the best surprise. It\'s so close to Miami yet feels like another world. The flamingos in the bay at dawn are simply surreal. We\'re coming back next month.'
      },
      {
        nombre: 'Valentina Cruz', inicial: 'V', color: '#FFB300',
        fecha: '8 Feb 2026', estrellas: 4,
        texto_es: 'El tour en bote a Elliott Key vale la pena totalmente. La playa de la isla está casi desierta. El buceo en los barcos hundidos requiere certificación pero hay opción de snorkeling también desde el bote.',
        texto_en: 'The boat tour to Elliott Key is totally worth it. The island beach is nearly deserted. Diving the shipwrecks requires certification but there\'s also a snorkeling option from the boat.'
      }
    ]
  },
  {
    id: 4,
    nombre_es: 'Bill Baggs Cape Florida State Park',
    nombre_en: 'Bill Baggs Cape Florida State Park',
    descripcion_es: 'Una de las mejores playas de Florida (Top 10 nacional) con el faro más antiguo del sur de Florida (1825). Snorkeling, ciclismo y pícnic al sur de Key Biscayne, a 20 min del centro de Miami.',
    descripcion_en: 'One of Florida\'s best beaches (Top 10 nationwide) with South Florida\'s oldest lighthouse (1825). Snorkeling, cycling and picnicking on the southern tip of Key Biscayne, 20 min from downtown Miami.',
    descripcion_larga_es: 'Bill Baggs Cape Florida State Park ocupa el extremo sur de la isla Key Biscayne y alberga el faro más antiguo del sur de Florida, construido en 1825 y todavía en funcionamiento. La playa de 1.5 km ha sido elegida repetidamente como una de las 10 mejores de EE.UU. por el ranking anual de la revista Travel + Leisure. Las aguas del Atlántico frente al parque son ideales para el snorkeling — el arrecife cercano alberga peces tropicales y ocasionalmente tortugas marinas. El parque tiene dos restaurantes, áreas de picnic, senderos en bicicleta y tours del faro los fines de semana (10am y 1pm). El estacionamiento es limitado, por lo que se recomienda llegar antes de las 9am en temporada alta.',
    descripcion_larga_en: 'Bill Baggs Cape Florida State Park occupies the southern tip of Key Biscayne island and houses South Florida\'s oldest lighthouse, built in 1825 and still operational. The 1.5 km beach has repeatedly been voted one of the Top 10 beaches in the US by Travel + Leisure magazine\'s annual ranking. Atlantic waters in front of the park are ideal for snorkeling — the nearby reef houses tropical fish and occasionally sea turtles. The park has two restaurants, picnic areas, cycling trails and lighthouse tours on weekends (10am and 1pm). Parking is limited, so arriving before 9am is recommended during high season.',
    como_llegar_es: 'A 20 minutos del centro de Miami. Toma la Rickenbacker Causeway ($2 peaje) hacia Key Biscayne y sigue Crandon Blvd hasta el final. El parque está en la punta sur de la isla. También llega el bus MetroBus 102 desde Coconut Grove (sin acceso directo al parque — hay que caminar).',
    como_llegar_en: 'About 20 minutes from downtown Miami. Take the Rickenbacker Causeway ($2 toll) to Key Biscayne and follow Crandon Blvd to the end. The park is at the southern tip of the island. MetroBus 102 also runs from Coconut Grove (no direct park access — walking required).',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Bill_Baggs_Cape_Florida_State_Park.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/7/71/Bill_Baggs_Cape_Florida_State_Park.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7e/Bill_Baggs_SP_beach01.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/53/Cape_Florida_Lighthouse_%285%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e8/Bill_Baggs_SP_beach02.jpg'
    ],
    lat: 25.6671, lng: -80.1584,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$8 / vehículo (hasta 8 pers)', horarios: '8am–sunset',
    tipo: 'mar', tipo_es: 'Playa · Ciclismo · Snorkeling', tipo_en: 'Beach · Cycling · Snorkeling',
    telefono: '(305) 361-5811',
    web_oficial: 'https://www.floridastateparks.org/parks-and-trails/bill-baggs-cape-florida-state-park',
    mejor_epoca: 'Oct–May (temporada baja y aguas tranquilas)',
    google_maps_url: 'https://maps.google.com/maps?q=25.6671,-80.1584',
    apple_maps_url: 'https://maps.apple.com/?q=Bill+Baggs+Cape+Florida+State+Park&ll=25.6671,-80.1584',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34438-d143731-Reviews-Bill_Baggs_Cape_Florida_State_Park-Key_Biscayne_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Gabriela Moreno', inicial: 'G', color: '#00BCD4',
        fecha: '20 Mar 2026', estrellas: 5,
        texto_es: 'La playa más bonita que he visto en toda Florida y está en Miami. Las aguas son turquesas y limpias. El faro restaurado es precioso y el tour vale la pena. Lleva comida porque los restaurantes del parque cierran temprano.',
        texto_en: 'The most beautiful beach I\'ve seen in all of Florida and it\'s in Miami. The waters are turquoise and clean. The restored lighthouse is gorgeous and the tour is worth it. Bring food because the park restaurants close early.'
      },
      {
        nombre: 'Carlos Vega', inicial: 'C', color: '#FF6B6B',
        fecha: '11 Mar 2026', estrellas: 5,
        texto_es: 'Fui en bicicleta desde Coconut Grove por la Rickenbacker — 30 minutos de ciclismo frente al mar antes de llegar a una de las mejores playas del país. No creo que exista una experiencia más perfecta en Miami.',
        texto_en: 'I biked from Coconut Grove via the Rickenbacker — 30 minutes of cycling by the sea before reaching one of the country\'s best beaches. I don\'t think there\'s a more perfect experience in Miami.'
      },
      {
        nombre: 'Isabella Ortega', inicial: 'I', color: '#FFB300',
        fecha: '25 Feb 2026', estrellas: 4,
        texto_es: 'Perfecto para un domingo familiar. Las áreas de picnic tienen sombra y parrillas. Las iguanas verdes están por todos lados — los niños las adoran. El snorkeling cerca del faro sorprende con mucha vida marina.',
        texto_en: 'Perfect for a family Sunday. The picnic areas have shade and grills. Green iguanas are everywhere — the kids love them. Snorkeling near the lighthouse surprises with lots of marine life.'
      }
    ]
  },
  {
    id: 5,
    nombre_es: 'Oleta River State Park',
    nombre_en: 'Oleta River State Park',
    descripcion_es: 'El parque estatal urbano más grande de Florida — 400 hectáreas de kayak entre manglares, 11 km de senderos para mountain bike y una pequeña playa de río a minutos de North Miami Beach.',
    descripcion_en: 'The largest urban state park in Florida — 400 hectares of kayaking through mangroves, 11 km of mountain bike trails and a small river beach minutes from North Miami Beach.',
    descripcion_larga_es: 'Oleta River State Park es el parque estatal urbano más grande de Florida con 400 hectáreas dentro del área metropolitana de Miami. El río Oleta atraviesa el parque creando un sistema de manglares perfecto para kayak y canoa — las rutas de agua van desde 1 hasta 6 horas dependiendo de cuánto quieras explorar. Las 11 millas de senderos de mountain bike van desde principiante hasta intermedio-avanzado, con un diseño que aprovecha las raíces de los manglares como obstáculos naturales. La pequeña playa de arena blanca sobre el río es ideal para descansar entre actividades. El parque tiene alquiler de kayaks, bicicletas y equipamiento de snorkeling. Las cabañas de acampada están disponibles para reserva anticipada a través de Reserve America.',
    descripcion_larga_en: 'Oleta River State Park is the largest urban state park in Florida with 400 hectares within the Miami metro area. The Oleta River runs through the park creating a mangrove system perfect for kayaking and canoeing — water routes range from 1 to 6 hours depending on how much you want to explore. The 11 miles of mountain bike trails range from beginner to intermediate-advanced, with a design that uses mangrove roots as natural obstacles. The small white-sand beach on the river is ideal for resting between activities. The park has kayak, bicycle and snorkeling equipment rentals. Camp cabins are available for advance booking through Reserve America.',
    como_llegar_es: 'A 20 minutos de Miami por la I-95 Norte hasta la salida 16 (NE 163rd Street), luego este hacia la NE 23rd Avenue. La dirección es 3400 NE 163rd Street, North Miami Beach. El MetroRail no llega — se necesita auto. Hay parqueo en el parque.',
    como_llegar_en: 'About 20 minutes from Miami via I-95 North to exit 16 (NE 163rd Street), then east to NE 23rd Avenue. The address is 3400 NE 163rd Street, North Miami Beach. MetroRail doesn\'t reach — a car is needed. Parking is available in the park.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Oleta_River_State_Park_-_View_of_Marsh_and_Mangroves_01.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8a/Oleta_River_State_Park_-_View_of_Marsh_and_Mangroves_01.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/68/Miami_FL_Oleta_River_SP_beach01.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e3/Oleta_River_State_Park_-_Mangroves.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5f/Mangroves_plantation%2C_Oleta_State_Park%2CNorth-Miami_Beach%2CFlorida._-_panoramio.jpg'
    ],
    lat: 25.9103, lng: -80.1390,
    dificultad_es: 'Fácil — Difícil (según actividad)', dificultad_en: 'Easy — Difficult (by activity)', dificultad_clase: 'moderado',
    precio: '$6 / vehículo', horarios: '8am–sunset',
    tipo: 'tierra', tipo_es: 'Kayak · Mountain Bike', tipo_en: 'Kayak · Mountain Bike',
    telefono: '(305) 919-1846',
    web_oficial: 'https://www.floridastateparks.org/parks-and-trails/oleta-river-state-park',
    mejor_epoca: 'Oct–Abr (temperaturas más frescas)',
    google_maps_url: 'https://maps.google.com/maps?q=25.9103,-80.1390',
    apple_maps_url: 'https://maps.apple.com/?q=Oleta+River+State+Park&ll=25.9103,-80.1390',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34429-d548213-Reviews-Oleta_River_State_Park-North_Miami_Beach_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Andrés Jiménez', inicial: 'A', color: '#00BCD4',
        fecha: '14 Mar 2026', estrellas: 5,
        texto_es: 'Los senderos de mountain bike son increíbles para estar dentro de una ciudad. Los root rides entre los manglares son técnicos y adictivos. Es imposible creer que estás en Miami mientras pedaleas por el interior del manglar.',
        texto_en: 'The mountain bike trails are incredible for being inside a city. The root rides through the mangroves are technical and addictive. It\'s impossible to believe you\'re in Miami while pedaling through the mangrove interior.'
      },
      {
        nombre: 'Pilar Sánchez', inicial: 'P', color: '#FF6B6B',
        fecha: '1 Mar 2026', estrellas: 5,
        texto_es: 'Alquilamos kayaks y exploramos el río Oleta durante 3 horas. Vimos lintones, caimanes pequeños y docenas de aves. La playa interior del parque es el lugar más tranquilo que he encontrado en Miami.',
        texto_en: 'We rented kayaks and explored the Oleta River for 3 hours. We spotted otters, small alligators and dozens of birds. The park\'s inner beach is the most peaceful spot I\'ve found in Miami.'
      },
      {
        nombre: 'Marcos Herrera', inicial: 'M', color: '#FFB300',
        fecha: '19 Feb 2026', estrellas: 4,
        texto_es: 'Para estar tan cerca de la autopista, la biodiversidad es asombrosa. Las rutas de bike están bien mantenidas. La única pega: el parqueo se llena rápido los domingos y hay que llegar antes de las 8:30am.',
        texto_en: 'For being so close to the highway, the biodiversity is amazing. The bike trails are well maintained. The only downside: parking fills up fast on Sundays and you need to arrive before 8:30am.'
      }
    ]
  },
  {
    id: 6,
    nombre_es: 'Virginia Key Beach Park',
    nombre_en: 'Virginia Key Beach Park',
    descripcion_es: 'Playa histórica en la bahía de Biscayne con paddle board, kayak y áreas naturales de manglares. Un refugio tranquilo a solo 10 minutos de Downtown Miami, con vistas al horizonte del centro de la ciudad.',
    descripcion_en: 'Historic beach on Biscayne Bay with paddle boarding, kayaking and natural mangrove areas. A peaceful refuge just 10 minutes from Downtown Miami, with views of the city skyline.',
    descripcion_larga_es: 'Virginia Key Beach Park tiene una historia especial: fue designada en 1945 como la única playa de Miami a la que podían acceder las personas afroamericanas durante la segregación. Hoy es un parque histórico y natural con una playa frente a la bahía de Biscayne, aguas calmadas ideales para paddle board y kayak, y extensas áreas de manglares para explorar a pie o en bote. La playa tiene vistas directas al skyline de Miami — una postal única que no se ve desde ningún otro punto. El parque ha recuperado su antigua noria histórica (1955) y tiene zonas de picnic con parrillas. El alquiler de paddle boards y kayaks está disponible en el parque.',
    descripcion_larga_en: 'Virginia Key Beach Park has a special history: it was designated in 1945 as the only Miami beach accessible to African Americans during segregation. Today it\'s a historical and natural park with a beach facing Biscayne Bay, calm waters ideal for paddle boarding and kayaking, and extensive mangrove areas to explore on foot or by boat. The beach has direct views of the Miami skyline — a unique postcard view not seen from any other vantage point. The park has restored its historic carousel (1955) and has picnic areas with grills. Paddle board and kayak rentals are available at the park.',
    como_llegar_es: 'A 10 minutos de Downtown Miami por la Rickenbacker Causeway ($2 peaje). Pasando el peaje, la entrada a Virginia Key Beach está a la derecha antes de llegar a Key Biscayne. El Metrobus 102 también llega desde Coconut Grove/Brickell.',
    como_llegar_en: 'About 10 minutes from Downtown Miami via Rickenbacker Causeway ($2 toll). After the toll, the Virginia Key Beach entrance is on the right before reaching Key Biscayne. Metrobus 102 also runs from Coconut Grove/Brickell.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Virginiakeybeach.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/6/69/Virginiakeybeach.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/90/Miami_FL_Virginia_Key_Beach_Park_RR02.jpg'
    ],
    lat: 25.7355, lng: -80.1573,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$8 / vehículo', horarios: '7am–7pm (8pm jun–ago)',
    tipo: 'mar', tipo_es: 'Paddle Board · Kayak · Playa', tipo_en: 'Paddle Board · Kayak · Beach',
    telefono: '(305) 960-4600',
    web_oficial: 'https://www.virginiakeybeachpark.net/',
    mejor_epoca: 'Nov–May (temporada baja)',
    google_maps_url: 'https://maps.google.com/maps?q=25.7355,-80.1573',
    apple_maps_url: 'https://maps.apple.com/?q=Virginia+Key+Beach+Park&ll=25.7355,-80.1573',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34438-d8728698-Reviews-Virginia_Key_Beach_Park-Key_Biscayne_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Natalia Flores', inicial: 'N', color: '#00BCD4',
        fecha: '5 Mar 2026', estrellas: 5,
        texto_es: 'La playa con mejor vista de Miami. Tener el skyline de fondo mientras haces paddle board en aguas tranquilas es una experiencia única. Los flamencos que aparecen en la bahía al amanecer son un bono inesperado.',
        texto_en: 'The beach with the best view of Miami. Having the skyline in the background while paddle boarding on calm waters is a unique experience. The flamingos that appear in the bay at dawn are an unexpected bonus.'
      },
      {
        nombre: 'Eduardo Blanco', inicial: 'E', color: '#FF6B6B',
        fecha: '20 Feb 2026', estrellas: 4,
        texto_es: 'Excelente para familias con niños. Las aguas de la bahía son muy tranquilas — perfecto para principiantes en paddle board. El parque está muy bien mantenido y el personal es amable. El carrusel histórico sorprende.',
        texto_en: 'Excellent for families with children. Bay waters are very calm — perfect for paddle board beginners. The park is very well maintained and the staff is friendly. The historic carousel is a surprise.'
      },
      {
        nombre: 'Camila Rosas', inicial: 'C', color: '#FFB300',
        fecha: '8 Feb 2026', estrellas: 5,
        texto_es: 'La historia de este parque lo hace especial más allá de su belleza natural. El museo pequeño que tienen dentro explica la historia de la playa durante la segregación. Una visita que vale la pena por muchas razones.',
        texto_en: 'The history of this park makes it special beyond its natural beauty. The small museum inside explains the beach\'s history during segregation. A visit worth making for many reasons.'
      }
    ]
  },
  {
    id: 7,
    nombre_es: 'Matheson Hammock Park',
    nombre_en: 'Matheson Hammock Park',
    descripcion_es: 'Un atoll pool natural de agua marina renovada por las mareas en Coral Gables — la piscina natural más única de Florida. Snorkeling, kayak y naturaleza del hammock tropical a 20 min de Miami.',
    descripcion_en: 'A natural atoll pool of marine water renewed by tides in Coral Gables — the most unique natural pool in Florida. Snorkeling, kayaking and tropical hammock nature 20 min from Miami.',
    descripcion_larga_es: 'Matheson Hammock Park es uno de los parques más singulares de Miami-Dade. Su característica más famosa es el atoll pool — una laguna circular de agua marina conectada directamente al mar mediante compuertas naturales, lo que significa que el agua se renueva con cada marea y siempre está limpia. Las aguas de la laguna son poco profundas (1-1.5 metros) y tranquilas, ideales para el snorkeling con niños y principiantes. El hammock tropical que rodea el parque es uno de los ecosistemas de bosque tropical hardwood mejor conservados del sur de Florida. El parque tiene un restaurante con vista al mar, área de picnic y puerto deportivo. El acceso al Mar Muerto es gratuito para kayak y paddleboard.',
    descripcion_larga_en: 'Matheson Hammock Park is one of Miami-Dade\'s most unique parks. Its most famous feature is the atoll pool — a circular saltwater lagoon directly connected to the sea via natural gates, meaning the water is renewed with each tide and always stays clean. The lagoon\'s shallow waters (1-1.5 meters) are calm, ideal for snorkeling with children and beginners. The tropical hammock surrounding the park is one of the best-preserved hardwood tropical forest ecosystems in south Florida. The park has a sea-view restaurant, picnic area and marina. Access to the Dead Bay is free for kayaking and paddleboarding.',
    como_llegar_es: 'A 20 minutos del centro de Miami. Toma la US-1 Sur hacia Coral Gables y gira en SW 72nd Avenue. La entrada del parque está en 9610 Old Cutler Road, Coral Gables. Hay parqueo de pago dentro del parque. El MetroBus llega a la zona pero no hasta la entrada.',
    como_llegar_en: 'About 20 minutes from downtown Miami. Take US-1 South toward Coral Gables and turn on SW 72nd Avenue. Park entrance is at 9610 Old Cutler Road, Coral Gables. Paid parking inside the park. MetroBus serves the area but not the entrance directly.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Matheson_Hammock_Clouds.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/c/cf/Matheson_Hammock_Clouds.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/63/Sunrise_at_Matheson.jpg'
    ],
    lat: 25.6680, lng: -80.2747,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$8 / vehículo', horarios: 'Sunrise–sunset',
    tipo: 'mar', tipo_es: 'Playa · Snorkeling · Kayak', tipo_en: 'Beach · Snorkeling · Kayak',
    telefono: '(305) 665-5475',
    web_oficial: 'https://www.miamidade.gov/parks/matheson-hammock.asp',
    mejor_epoca: 'Nov–May (menor afluencia)',
    google_maps_url: 'https://maps.google.com/maps?q=25.6680,-80.2747',
    apple_maps_url: 'https://maps.apple.com/?q=Matheson+Hammock+Park&ll=25.6680,-80.2747',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34425-d8728345-Reviews-Matheson_Hammock_Park-Coral_Gables_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Alejandra Muñoz', inicial: 'A', color: '#00BCD4',
        fecha: '16 Mar 2026', estrellas: 5,
        texto_es: 'El atoll pool es lo más original que he visto en Florida. Una piscina circular en el mar con agua limpia y renovada por las mareas — perfecta para nadar con niños pequeños sin peligro de olas ni corrientes. El hammock que rodea el parque es hermoso.',
        texto_en: 'The atoll pool is the most original thing I\'ve seen in Florida. A circular pool in the sea with clean water renewed by tides — perfect for swimming with young children without wave or current danger. The hammock surrounding the park is beautiful.'
      },
      {
        nombre: 'Ricardo Leal', inicial: 'R', color: '#FF6B6B',
        fecha: '4 Mar 2026', estrellas: 5,
        texto_es: 'Vine a hacer snorkeling en el atoll pool y fue una revelación. Hay peces tropicales, cangrejos y hasta pequeñas mantarrayas en el fondo arenoso. Mucho mejor que cualquier piscina artificial de resort.',
        texto_en: 'I came to snorkel in the atoll pool and it was a revelation. There are tropical fish, crabs and even small stingrays on the sandy bottom. Much better than any artificial resort pool.'
      },
      {
        nombre: 'Fernanda Lima', inicial: 'F', color: '#FFB300',
        fecha: '21 Feb 2026', estrellas: 4,
        texto_es: 'El restaurante Red Fish Grill dentro del parque tiene una de las mejores vistas de la bahía de Miami. El parque en general está muy bien mantenido. Ideal para un día completo de familia.',
        texto_en: 'The Red Fish Grill restaurant inside the park has one of the best views of Miami Bay. The park overall is very well maintained. Ideal for a complete family day.'
      }
    ]
  },
  {
    id: 8,
    nombre_es: 'Crandon Park',
    nombre_en: 'Crandon Park',
    descripcion_es: 'Playa de 5 km en Key Biscayne elegida Top 10 de EE.UU. — aguas turquesas de la laguna natural, área de picnic bajo palmas y kayak en el mar Caribe, a 20 min de Miami.',
    descripcion_en: 'A 5 km beach on Key Biscayne voted Top 10 in the US — turquoise lagoon waters, picnic areas under palms and kayaking in the Caribbean Sea, 20 min from Miami.',
    descripcion_larga_es: 'Crandon Park es el parque regional más grande del condado de Miami-Dade con 450 hectáreas en la isla Key Biscayne. Su playa de 5 kilómetros de arena blanca y aguas turquesas ha sido elegida repetidamente entre las 10 mejores playas de EE.UU. La laguna natural al norte de la playa principal tiene aguas tranquilas de 1 metro de profundidad — perfectas para familias. El parque también incluye un mercado de antigüedades los fines de semana, una reserva natural de manglares, canchas de tenis de clase mundial (sede del Miami Open) y el antiguo zoológico de Miami (Crandon Zoo). El alquiler de kayaks y equipamiento de playa está disponible en el parque.',
    descripcion_larga_en: 'Crandon Park is the largest regional park in Miami-Dade County with 450 hectares on Key Biscayne island. Its 5-kilometer beach of white sand and turquoise waters has repeatedly been voted among the Top 10 beaches in the US. The natural lagoon at the north end of the main beach has calm 1-meter-deep waters — perfect for families. The park also includes a weekend antique market, a natural mangrove reserve, world-class tennis courts (Miami Open venue) and the former Miami Zoo (Crandon Zoo). Kayak and beach equipment rentals are available in the park.',
    como_llegar_es: 'A 20 minutos de Miami por la Rickenbacker Causeway ($2 peaje) hacia Key Biscayne. Una vez en la isla, sigue Crandon Blvd hacia el norte — la entrada principal del parque está en el número 6747. El MetroBus 102 llega desde Coconut Grove.',
    como_llegar_en: 'About 20 minutes from Miami via Rickenbacker Causeway ($2 toll) toward Key Biscayne. Once on the island, follow Crandon Blvd north — the main park entrance is at 6747. MetroBus 102 runs from Coconut Grove.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Crandon_Beach.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c1/Crandon_Beach.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/Crandon_Park_beach%2C_FL.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c9/Crandon_Park_Modified.jpg'
    ],
    lat: 25.7024, lng: -80.1556,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: '$8 / vehículo', horarios: '8am–sunset',
    tipo: 'mar', tipo_es: 'Playa · Kayak · Naturaleza', tipo_en: 'Beach · Kayak · Nature',
    telefono: '(305) 361-5421',
    web_oficial: 'https://www.miamidade.gov/parks/crandon.asp',
    mejor_epoca: 'Nov–May (temporada alta en aguas)',
    google_maps_url: 'https://maps.google.com/maps?q=25.7024,-80.1556',
    apple_maps_url: 'https://maps.apple.com/?q=Crandon+Park&ll=25.7024,-80.1556',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34438-d258126-Reviews-Crandon_Park-Key_Biscayne_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Verónica Castro', inicial: 'V', color: '#00BCD4',
        fecha: '22 Mar 2026', estrellas: 5,
        texto_es: 'La laguna norte del parque es perfecta para familias con niños — aguas tranquilas, poca profundidad y sin olas. Las palmeras a lo largo de la playa crean la postal más caribeña que puedes encontrar dentro de Miami.',
        texto_en: 'The north lagoon of the park is perfect for families with children — calm waters, shallow depth and no waves. The palm trees along the beach create the most Caribbean postcard you can find within Miami.'
      },
      {
        nombre: 'Gonzalo Reyes', inicial: 'G', color: '#FF6B6B',
        fecha: '10 Mar 2026', estrellas: 4,
        texto_es: 'Estuve en el Miami Open jugando al tenis y aproveché para ver la playa. La combinación parque de deporte + playa + manglares hace de Crandon un parque único en su tipo. El mercado de antigüedades del domingo es un bonus inesperado.',
        texto_en: 'I was at the Miami Open playing tennis and took the chance to see the beach. The combination of sports park + beach + mangroves makes Crandon a one-of-a-kind park. The Sunday antique market is an unexpected bonus.'
      },
      {
        nombre: 'Patricia Morales', inicial: 'P', color: '#FFB300',
        fecha: '28 Feb 2026', estrellas: 5,
        texto_es: 'La mejor playa de Miami para mí. Vine en enero y el agua estaba a 24°C. La arena es blanca y fina, el agua turquesa. No entiendo por qué la gente no habla más de Crandon — es tan buena como cualquier playa del Caribe.',
        texto_en: 'My favorite beach in Miami. I came in January and the water was 24°C. The sand is white and fine, the water turquoise. I don\'t understand why people don\'t talk more about Crandon — it\'s as good as any Caribbean beach.'
      }
    ]
  },
  {
    id: 9,
    nombre_es: 'Arch Creek Park',
    nombre_en: 'Arch Creek Park',
    descripcion_es: 'Un puente de roca natural formado hace 8,000 años — único en el sur de Florida. Senderismo entre hammock subtropical, observación de fauna nativa y museo arqueológico de la cultura Tequesta.',
    descripcion_en: 'A natural limestone bridge formed 8,000 years ago — unique in South Florida. Hiking through subtropical hammock, native wildlife observation and archaeological museum of Tequesta culture.',
    descripcion_larga_es: 'Arch Creek Park es un tesoro arqueológico e histórico poco conocido de Miami. Su atracción principal es un puente natural de piedra caliza formado hace aproximadamente 8,000 años por la erosión del arrecife Anastasia — uno de los pocos puentes de piedra natural en el sur de Florida. El arco fue cruce obligado para los indios Tequesta durante siglos y más tarde para los primeros colonos del área de Miami. El parque incluye un hammock subtropical con senderos de 1.5 km, una comunidad de aves (más de 45 especies registradas) y un pequeño pero excelente museo arqueológico con herramientas, cerámica y artefactos de la cultura Tequesta. La entrada es gratuita los domingos.',
    descripcion_larga_en: 'Arch Creek Park is a little-known archaeological and historical treasure of Miami. Its main attraction is a natural limestone bridge formed approximately 8,000 years ago by Anastasia reef erosion — one of the few natural stone bridges in south Florida. The arch was a required crossing for the Tequesta Indians for centuries and later for the first settlers of the Miami area. The park includes a subtropical hammock with 1.5 km trails, a bird community (over 45 recorded species) and a small but excellent archaeological museum with tools, pottery and artifacts from the Tequesta culture. Entry is free on Sundays.',
    como_llegar_es: 'A 25 minutos de Miami. La dirección es 1855 NE 135th Street, North Miami. Toma la US-1 Norte hacia Biscayne Blvd y gira en la NE 135th Street. El parqueo es gratuito. El parque está abierto de martes a domingo de 9am a 5pm.',
    como_llegar_en: 'About 25 minutes from Miami. The address is 1855 NE 135th Street, North Miami. Take US-1 North to Biscayne Blvd and turn at NE 135th Street. Parking is free. The park is open Tuesday through Sunday from 9am to 5pm.',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/North_Miami_FL_Arch_Creek_bridge02.jpg',
    galeria: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/North_Miami_FL_Arch_Creek_bridge02.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Florida-Miami-Arch_Creek_LCCN97506889.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/ea/Arch_Creek_Museum.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/North_Miami_FL_Arch_Creek_picnic01.jpg'
    ],
    lat: 25.8955, lng: -80.1678,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Gratis (donaciones bienvenidas)', horarios: '9am–5pm (Mar–Dom)',
    tipo: 'tierra', tipo_es: 'Senderismo · Arqueología', tipo_en: 'Hiking · Archaeology',
    telefono: '(305) 944-6111',
    web_oficial: 'https://www.miamidade.gov/parks/arch-creek.asp',
    mejor_epoca: 'Oct–Abr (aves migratorias en temporada)',
    google_maps_url: 'https://maps.google.com/maps?q=25.8955,-80.1678',
    apple_maps_url: 'https://maps.apple.com/?q=Arch+Creek+Park&ll=25.8955,-80.1678',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34429-d550295-Reviews-Arch_Creek_Park-North_Miami_Beach_Florida.html',
    activo: true,
    resenas: [
      {
        nombre: 'Héctor Mendoza', inicial: 'H', color: '#00BCD4',
        fecha: '3 Mar 2026', estrellas: 5,
        texto_es: 'No sabía que existía este parque y fue una de las mejores sorpresas de Miami. El puente natural de piedra caliza es algo completamente diferente a todo lo que existe en el sur de Florida. El museo sobre los Tequesta es pequeño pero muy bien hecho.',
        texto_en: 'I didn\'t know this park existed and it was one of the best surprises in Miami. The natural limestone bridge is something completely different from anything else in south Florida. The Tequesta museum is small but very well done.'
      },
      {
        nombre: 'Lucía Vargas', inicial: 'L', color: '#FF6B6B',
        fecha: '17 Feb 2026', estrellas: 4,
        texto_es: 'El hammock es un oasis de paz en medio de North Miami. Hay tortugas, zarigüeyas y una colonia de cotorras que hacen un ruido increíble. El guía voluntario que daba la explicación del arco natural era apasionante — muy recomendado.',
        texto_en: 'The hammock is an oasis of peace in the middle of North Miami. There are turtles, opossums and a parrot colony that make incredible noise. The volunteer guide explaining the natural arch was passionate — highly recommended.'
      },
      {
        nombre: 'Diego Ruiz', inicial: 'D', color: '#FFB300',
        fecha: '9 Feb 2026', estrellas: 5,
        texto_es: 'Llevé a mis hijos de 7 y 10 años y fue perfecto para ellos. El arco de piedra los dejó impresionados. El parque tiene actividades educativas para niños los fines de semana. Gratis, educativo y hermoso — ¿qué más se puede pedir?',
        texto_en: 'I took my 7 and 10-year-old kids and it was perfect for them. The stone arch impressed them. The park has educational activities for children on weekends. Free, educational and beautiful — what more could you ask for?'
      }
    ]
  }
];

/* Versión de los datos — incrementar cada vez que cambie DESTINOS_DEFAULT */
var DESTINOS_VERSION = 3;

/* Obtiene destinos de localStorage; migra automáticamente si la versión es antigua */
function obtenerDestinos() {
  try {
    var version = parseInt(localStorage.getItem('em_destinos_version') || '0', 10);
    var d = JSON.parse(localStorage.getItem('em_destinos'));
    if (version < DESTINOS_VERSION || !d || d.length < DESTINOS_DEFAULT.length) {
      localStorage.setItem('em_destinos', JSON.stringify(DESTINOS_DEFAULT));
      localStorage.setItem('em_destinos_version', String(DESTINOS_VERSION));
      return DESTINOS_DEFAULT;
    }
    return d;
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

/* ===== 3D MOUSE TILT ===== */
/* Añade efecto de inclinación 3D en hover sobre cada card de destino.
   Solo activo si el usuario no prefiere movimiento reducido. */
function bindCardTilt(card) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var MAX_TILT = 10; /* grados máximos de rotación */

  card.addEventListener('mousemove', function (e) {
    /* Solo aplica tilt en tarjetas ya visibles (animación de entrada terminada) */
    if (!card.classList.contains('visible')) return;

    var rect   = card.getBoundingClientRect();
    var cx     = rect.left + rect.width  / 2;
    var cy     = rect.top  + rect.height / 2;
    var dx     = (e.clientX - cx) / (rect.width  / 2); /* -1 a 1 */
    var dy     = (e.clientY - cy) / (rect.height / 2); /* -1 a 1 */
    var rotY   = dx * MAX_TILT;
    var rotX   = -dy * MAX_TILT * 0.65; /* eje X con factor suavizado */

    card.style.transform =
      'perspective(1000px) rotateY(' + rotY.toFixed(2) + 'deg) rotateX(' + rotX.toFixed(2) + 'deg) translateZ(12px)';
    card.classList.add('tilt-active');
  });

  card.addEventListener('mouseleave', function () {
    card.style.transform = '';
    card.classList.remove('tilt-active');
  });
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

  grid.innerHTML = lista.map(function (d, i) {
    var delay = (i % 3) * 0.12;
    return (
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
          '<button class="btn btn--primario destino-card__btn" onclick="event.stopPropagation(); registrarClic(' + d.id + '); abrirModal(' + d.id + ');">' +
            '<span class="lang-es">Ver destino</span>' +
            '<span class="lang-en">View destination</span>' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  initScrollAnimation();

  /* Activa tilt 3D en cada card renderizada */
  grid.querySelectorAll('.destino-card').forEach(function (card) {
    bindCardTilt(card);
  });
}

/* ===== GALERÍA: ESTADO GLOBAL ===== */
var galeriaActual = { fotos: [], indice: 0, nombreDestino: '' };

function cambiarFotoGaleria(nuevoIndice) {
  var galeria = galeriaActual.fotos;
  if (!galeria.length) return;
  nuevoIndice = ((nuevoIndice % galeria.length) + galeria.length) % galeria.length;
  galeriaActual.indice = nuevoIndice;

  var imgPrincipal = document.getElementById('modalGaleriaImg');
  if (imgPrincipal) {
    imgPrincipal.src = galeria[nuevoIndice];
    imgPrincipal.alt = galeriaActual.nombreDestino + ' — foto ' + (nuevoIndice + 1);
  }

  var thumbs = document.querySelectorAll('.modal-thumb');
  thumbs.forEach(function (th, idx) {
    th.classList.toggle('modal-thumb--activa', idx === nuevoIndice);
  });

  /* Actualiza contador */
  var contador = document.getElementById('modalGaleriaContador');
  if (contador) contador.textContent = (nuevoIndice + 1) + ' / ' + galeria.length;
}

/* ===== SISTEMA DE MODAL A PANTALLA COMPLETA ===== */

function abrirModal(idDestino) {
  var destinos = obtenerDestinos();
  var d = destinos.find(function (x) { return x.id === idDestino; });
  if (!d) return;

  /* Rellena desde DESTINOS_DEFAULT si faltan campos extendidos */
  var dDef = DESTINOS_DEFAULT.find(function (x) { return x.id === idDestino; });
  if (dDef) {
    ['galeria','descripcion_larga_es','descripcion_larga_en','como_llegar_es','como_llegar_en',
     'resenas','telefono','web_oficial','mejor_epoca','google_maps_url','apple_maps_url','resenas_url'].forEach(function (k) {
      d[k] = d[k] || dDef[k];
    });
  }

  var idioma = (typeof IDIOMA_ACTUAL !== 'undefined') ? IDIOMA_ACTUAL : 'es';
  var esEs   = (idioma === 'es');

  var nombre    = esEs ? d.nombre_es    : d.nombre_en;
  var descCorta = esEs ? d.descripcion_es : d.descripcion_en;
  var descLarga = esEs ? (d.descripcion_larga_es || descCorta) : (d.descripcion_larga_en || descCorta);
  var comoLlegar= esEs ? (d.como_llegar_es || '') : (d.como_llegar_en || '');
  var tipoLabel = esEs ? d.tipo_es      : d.tipo_en;
  var difLabel  = esEs ? d.dificultad_es: d.dificultad_en;

  /* 1. Galería con navegación */
  var galeria = d.galeria && d.galeria.length ? d.galeria : [d.foto];
  galeriaActual = { fotos: galeria, indice: 0, nombreDestino: nombre };

  var thumbsHtml = galeria.map(function (url, idx) {
    return '<button class="modal-thumb' + (idx === 0 ? ' modal-thumb--activa' : '') + '" ' +
           'onclick="cambiarFotoGaleria(' + idx + ')" aria-label="Foto ' + (idx+1) + '">' +
           '<img src="' + url + '" alt="' + nombre + ' miniatura ' + (idx+1) + '" /></button>';
  }).join('');

  document.getElementById('modalGaleria').innerHTML =
    '<div class="modal-galeria-principal">' +
      '<button class="modal-galeria-nav modal-galeria-nav--prev" onclick="cambiarFotoGaleria(galeriaActual.indice - 1)" aria-label="Foto anterior">&#8249;</button>' +
      '<img id="modalGaleriaImg" src="' + galeria[0] + '" alt="' + nombre + ' — foto 1" class="modal-galeria-img" />' +
      '<button class="modal-galeria-nav modal-galeria-nav--next" onclick="cambiarFotoGaleria(galeriaActual.indice + 1)" aria-label="Siguiente foto">&#8250;</button>' +
      '<span class="modal-galeria-contador" id="modalGaleriaContador">1 / ' + galeria.length + '</span>' +
    '</div>' +
    '<div class="modal-thumbnails">' + thumbsHtml + '</div>';

  /* 2. Nombre y descripciones */
  document.getElementById('modalNombreH').textContent = nombre;
  document.getElementById('modalDescCorta').textContent = descCorta;
  document.getElementById('modalDescLarga').textContent = descLarga;

  /* 3. Badges */
  document.getElementById('modalBadges').innerHTML =
    '<span class="modal-badge modal-badge--' + d.tipo + '">' + tipoLabel + '</span>' +
    '<span class="modal-badge modal-badge--dif modal-badge--' + d.dificultad_clase + '">' + difLabel + '</span>' +
    (d.mejor_epoca ? '<span class="modal-badge modal-badge--epoca">' + (esEs ? 'Mejor época: ' : 'Best time: ') + d.mejor_epoca + '</span>' : '');

  /* 4. Datos prácticos */
  document.getElementById('modalDatosGrid').innerHTML =
    '<div class="modal-dato"><span class="modal-dato__icono">💲</span>' +
      '<div><strong>' + (esEs ? 'Precio' : 'Price') + '</strong><span>' + d.precio + '</span></div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">⏰</span>' +
      '<div><strong>' + (esEs ? 'Horarios' : 'Hours') + '</strong><span>' + d.horarios + '</span></div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">📞</span>' +
      '<div><strong>' + (esEs ? 'Teléfono' : 'Phone') + '</strong>' +
      (d.telefono ? '<a href="tel:' + d.telefono.replace(/\s/g,'') + '">' + d.telefono + '</a>' : '<span>—</span>') + '</div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">🗓️</span>' +
      '<div><strong>' + (esEs ? 'Mejor época' : 'Best time') + '</strong><span>' + (d.mejor_epoca || '—') + '</span></div>' +
    '</div>';

  /* 5. Botones de acción */
  var gUrl    = d.google_maps_url || ('https://maps.google.com/maps?q=' + d.lat + ',' + d.lng);
  var aUrl    = d.apple_maps_url  || ('https://maps.apple.com/?q=' + encodeURIComponent(nombre) + '&ll=' + d.lat + ',' + d.lng);
  var rUrl    = d.resenas_url     || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(nombre));
  var wUrl    = d.web_oficial     || '#';

  document.getElementById('modalAcciones').innerHTML =
    '<a href="' + gUrl + '" target="_blank" rel="noopener" class="modal-accion-btn modal-accion-btn--google" ' +
       'onclick="if(typeof trackMapsClick===\'function\')trackMapsClick(\'' + nombre.replace(/'/g,"&#39;") + '\')">' +
       (esEs ? 'Google Maps' : 'Google Maps') +
    '</a>' +
    '<a href="' + aUrl + '" target="_blank" rel="noopener" class="modal-accion-btn modal-accion-btn--apple" ' +
       'onclick="if(typeof trackAppleMapsClick===\'function\')trackAppleMapsClick(\'' + nombre.replace(/'/g,"&#39;") + '\')">' +
       (esEs ? 'Apple Maps' : 'Apple Maps') +
    '</a>' +
    '<a href="' + rUrl + '" target="_blank" rel="noopener" class="modal-accion-btn modal-accion-btn--resenas" ' +
       'onclick="if(typeof trackReviewsClick===\'function\')trackReviewsClick(\'' + nombre.replace(/'/g,"&#39;") + '\')">' +
       (esEs ? 'Ver reseñas reales' : 'See real reviews') +
    '</a>' +
    (wUrl !== '#' ? '<a href="' + wUrl + '" target="_blank" rel="noopener" class="modal-accion-btn modal-accion-btn--web">' +
       (esEs ? 'Sitio oficial' : 'Official site') + '</a>' : '');

  /* 6. Cómo llegar */
  var llegarEl = document.getElementById('modalLlegar');
  if (comoLlegar && llegarEl) {
    llegarEl.innerHTML =
      '<h3 class="modal-subtitulo">' + (esEs ? 'Cómo llegar' : 'How to get there') + '</h3>' +
      '<p class="modal-llegar-texto">' + comoLlegar + '</p>';
    llegarEl.style.display = 'block';
  } else if (llegarEl) {
    llegarEl.style.display = 'none';
  }

  /* 7. Mapa embed satélite */
  var mapaSrc = 'https://maps.google.com/maps?q=' + d.lat + ',' + d.lng +
                '&t=k&z=14&ie=UTF8&iwloc=B&output=embed';
  var iframeEl = document.getElementById('modalMapaIframe');
  if (iframeEl) iframeEl.src = mapaSrc;

  /* 8. Reseñas */
  var resenas = d.resenas || [];
  var resEl = document.getElementById('modalResenas');
  if (resEl) {
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
              '<div class="modal-resena__avatar" style="background:' + (r.color || '#00BCD4') + '">' + (r.inicial || r.nombre.charAt(0)) + '</div>' +
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

      /* Disclaimer */
      rHtml += '<p class="modal-disclaimer">' +
        (esEs ? '⚠️ Verifica horarios y precios en el sitio oficial antes de tu visita. Los datos pueden haber cambiado.' :
                '⚠️ Verify hours and prices on the official site before your visit. Data may have changed.') +
        '</p>';
      resEl.innerHTML = rHtml;
    } else {
      resEl.innerHTML = '';
    }
  }

  /* Abre el modal */
  var modal = document.getElementById('destinoModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(function () {
    modal.classList.add('abierto');
  });

  /* Analytics */
  if (typeof trackModalOpen === 'function') trackModalOpen(nombre);
}

/* Cierra el modal y restaura el scroll */
function cerrarModal() {
  var modal = document.getElementById('destinoModal');
  modal.classList.remove('abierto');
  document.body.style.overflow = '';
  setTimeout(function () {
    modal.style.display = 'none';
    var iframe = document.getElementById('modalMapaIframe');
    if (iframe) iframe.src = '';
    galeriaActual = { fotos: [], indice: 0, nombreDestino: '' };
  }, 320);
}

/* ===== NAVBAR: scroll → sombra ===== */
(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
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
  var btnCerrar = document.getElementById('modalCerrar');
  if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);

  var fondo = document.getElementById('modalFondo');
  if (fondo) fondo.addEventListener('click', cerrarModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarModal();
    /* Navegación de galería con teclas */
    if (e.key === 'ArrowLeft'  && galeriaActual.fotos.length) cambiarFotoGaleria(galeriaActual.indice - 1);
    if (e.key === 'ArrowRight' && galeriaActual.fotos.length) cambiarFotoGaleria(galeriaActual.indice + 1);
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

/* ===== CONFIGURACIÓN DEL SITIO (em_config_sitio) ===== */
/* Lee la config guardada desde el panel admin y la aplica al DOM.
   Permite al admin editar textos del hero, tagline, colores, etc.
   sin tocar el código HTML directamente. */
function leerConfigSitio() {
  var config = {};
  try { config = JSON.parse(localStorage.getItem('em_config_sitio')) || {}; }
  catch (e) { return; }

  if (!Object.keys(config).length) return;

  /* Idioma activo */
  var lang = (typeof IDIOMA_ACTUAL !== 'undefined') ? IDIOMA_ACTUAL : 'es';

  /* Mapeo: clave de config → data-i18n del DOM */
  var mapa = {
    hero_titulo_es:     { lang: 'es', key: 'hero_titulo'  },
    hero_titulo_en:     { lang: 'en', key: 'hero_titulo'  },
    hero_tagline_es:    { lang: 'es', key: 'hero_tagline' },
    hero_tagline_en:    { lang: 'en', key: 'hero_tagline' },
    intro_sub_es:       { lang: 'es', key: 'intro_sub'    },
    intro_sub_en:       { lang: 'en', key: 'intro_sub'    },
    destinos_titulo_es: { lang: 'es', key: 'destinos_titulo' },
    destinos_sub_es:    { lang: 'es', key: 'destinos_sub'    }
  };

  /* Aplicar overrides al diccionario TEXTOS si i18n está cargado */
  if (typeof TEXTOS !== 'undefined') {
    Object.keys(mapa).forEach(function (cfgKey) {
      if (config[cfgKey] === undefined || config[cfgKey] === '') return;
      var m = mapa[cfgKey];
      if (TEXTOS[m.lang]) TEXTOS[m.lang][m.key] = config[cfgKey];
    });
    /* Re-aplicar el idioma activo con los nuevos valores */
    if (typeof aplicarIdioma === 'function') aplicarIdioma(lang);
  }

  /* Color de acento — actualiza la variable CSS en :root */
  if (config.color_acento) {
    document.documentElement.style.setProperty('--turquesa', config.color_acento);
  }
}

/* ===== HERO FOTO-ARC SCROLL ===== */
var HERO_FOTOS = [
  'assets/images/hero/hero-01.jpg',
  'assets/images/hero/hero-02.jpg',
  'assets/images/hero/hero-03.jpg',
  'assets/images/hero/hero-04.jpg',
  'assets/images/hero/hero-05.jpg',
  'assets/images/hero/hero-06.jpg',
  'assets/images/hero/hero-07.jpg',
  'assets/images/hero/hero-08.jpg',
  'assets/images/hero/hero-09.jpg',
  'assets/images/hero/hero-10.jpg',
  'assets/images/hero/hero-11.jpg',
  'assets/images/hero/hero-12.jpg'
  /* hero-13, hero-14, hero-15 omitidos — total 12 cards */
];

/* ===== HERO TRAIL — ImageTrail vanilla (port del componente React) ===== */
function initHeroTrail() {
  var hero  = document.getElementById('inicio');
  var trail = document.getElementById('heroTrail');
  if (!hero || !trail) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Shutter en el título */
  (function initShutter() {
    var titulo = document.getElementById('heroTitulo');
    if (!titulo) return;
    titulo.innerHTML = '';
    titulo.setAttribute('aria-label', 'EXPLORA MIAMI');
    'EXPLORA MIAMI'.split('').forEach(function(c, i) {
      if (c === ' ') {
        var sp = document.createElement('span');
        sp.style.cssText = 'display:inline-block;width:0.28em';
        titulo.appendChild(sp);
        return;
      }
      var wrap = document.createElement('span');
      wrap.className = 'shutter-letra';
      var capa = document.createElement('span');
      capa.className = 'shutter-capa';
      capa.textContent = c;
      if (!reducedMotion) capa.style.animationDelay = (0.4 + i * 0.048) + 's';
      wrap.appendChild(capa);
      titulo.appendChild(wrap);
    });
  })();

  if (reducedMotion) return;

  var interval   = 100;  /* ms mínimo entre spawns */
  var rotRange   = 15;   /* ± grados de rotación aleatoria */
  var currentIdx = 0;
  var lastTime   = 0;

  function spawnItem(x, y) {
    var img = new Image();
    img.src = HERO_FOTOS[currentIdx];
    img.alt = '';
    currentIdx = (currentIdx + 1) % HERO_FOTOS.length;
    img.className = 'hero-trail-img';
    img.style.left = x + 'px';
    img.style.top  = y + 'px';
    trail.appendChild(img);

    var rot = (Math.random() - 0.5) * rotRange * 2;
    img.animate([
      { transform: 'translate(-50%,-50%) rotate(' + rot + 'deg) scale(0)',   opacity: 1 },
      { transform: 'translate(-50%,-50%) rotate(' + rot + 'deg) scale(1.2)', opacity: 1, offset: 0.15 },
      { transform: 'translate(-50%,-50%) rotate(' + rot + 'deg) scale(0)',   opacity: 0 }
    ], { duration: 700, easing: 'ease-in-out', fill: 'forwards' })
    .onfinish = function() {
      if (img.parentNode) img.parentNode.removeChild(img);
    };
  }

  hero.addEventListener('mousemove', function(e) {
    var now = performance.now();
    if (now - lastTime < interval) return;
    lastTime = now;
    var rect = hero.getBoundingClientRect();
    spawnItem(e.clientX - rect.left, e.clientY - rect.top);
  }, { passive: true });

  hero.addEventListener('touchmove', function(e) {
    var now = performance.now();
    if (now - lastTime < interval) return;
    lastTime = now;
    var touch = e.touches[0];
    var rect  = hero.getBoundingClientRect();
    spawnItem(touch.clientX - rect.left, touch.clientY - rect.top);
  }, { passive: true });
}

/* ===== [REMOVED: initHeroArc — reemplazado por initHeroTrail] ===== */
function initHeroArc() {
  var reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  var contenedor = document.getElementById('heroFotos');
  var seccion    = document.querySelector('.hero-arc');
  if (!contenedor || !seccion) return;

  /* ---- Dimensiones ---- */
  var W = window.innerWidth;
  var H = window.innerHeight;

  /* ---- Estado ---- */
  var fase          = 'scatter';
  var introHecho    = false;
  var scrollVirtual = 0;
  var MAX_SCROLL    = 2800;
  var rafPendiente  = false;

  /* ---- Crear cards ---- */
  var cards = [];
  HERO_FOTOS.forEach(function (src, i) {
    var card = document.createElement('div');
    card.className = 'hero-foto-card';
    card.setAttribute('aria-hidden', 'true');
    card.setAttribute('tabindex', '-1');

    var img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading  = i < 5 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.onerror  = function () {
      if (this.src !== window.location.origin + '/assets/images/hero/hero-01.jpg') {
        this.src = 'assets/images/hero/hero-01.jpg';
      }
    };
    card.appendChild(img);
    contenedor.appendChild(card);

    card.style.cssText =
      'position:absolute;left:50%;top:50%;' +
      'opacity:0;transform:translate(-50%,-50%) scale(0.3);' +
      'will-change:transform,opacity;';

    cards.push(card);
  });

  var TOTAL = cards.length;

  /* ---- Posiciones scatter (reproducibles) ---- */
  var posScatter = cards.map(function (_, i) {
    var angulo = (i / TOTAL) * Math.PI * 2.7;
    var radio  = 300 + (i % 3) * 180;
    return {
      x: Math.cos(angulo) * radio,
      y: Math.sin(angulo) * radio * 0.6,
      r: (i % 7 - 3) * 22,
      s: 0.6,
      o: 0
    };
  });

  /* ---- Aplicar transform directo ---- */
  function aplicar(card, x, y, r, s, o) {
    card.style.opacity   = o;
    card.style.transform =
      'translate(calc(-50% + ' + x.toFixed(1) + 'px),' +
      'calc(-50% + '           + y.toFixed(1) + 'px))' +
      'rotate('                + r.toFixed(1) + 'deg)' +
      'scale('                 + s.toFixed(3) + ')';
  }

  /* ---- Lerp ---- */
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ---- Estado actual de cada card ---- */
  var estadoActual = posScatter.map(function (p) {
    return { x: p.x, y: p.y, r: p.r, s: p.s, o: p.o };
  });

  /* ---- Calcular posicion objetivo segun fase ---- */
  function calcularObjetivo(i) {
    var isMobile = W < 768;
    var minDim   = Math.min(W, H);

    if (fase === 'scatter') return posScatter[i];

    if (fase === 'linea') {
      var spacing = isMobile ? 54 : 70;
      var total   = TOTAL * spacing;
      return { x: i * spacing - total / 2, y: 0, r: 0, s: 1, o: 1 };
    }

    var radioC  = Math.min(minDim * 0.36, 300);
    var angC    = (i / TOTAL) * 360;
    var radC    = angC * Math.PI / 180;
    var circulo = {
      x: Math.cos(radC) * radioC,
      y: Math.sin(radC) * radioC,
      r: angC + 90, s: 1, o: 1
    };

    var radioBase = Math.min(W, H * 1.5);
    var radioA    = radioBase * (isMobile ? 1.3 : 1.0);
    var apiceY    = H * (isMobile ? 0.30 : 0.20);
    var centroA   = apiceY + radioA - H / 2;
    var apertura  = isMobile ? 90 : 120;
    var angIni    = -90 - apertura / 2;
    var paso      = apertura / (TOTAL - 1);
    var progS     = Math.min(Math.max(scrollVirtual / MAX_SCROLL, 0), 1);
    var rotS      = -progS * apertura * 0.7;
    var angA      = angIni + i * paso + rotS;
    var radA      = angA * Math.PI / 180;
    var escalaA   = isMobile ? 1.45 : 1.8;
    var arco = {
      x: Math.cos(radA) * radioA,
      y: Math.sin(radA) * radioA + centroA,
      r: angA + 90, s: escalaA, o: 1
    };

    var mt = Math.min(Math.max(scrollVirtual / 500, 0), 1);
    var t  = mt < 0.5
      ? 4 * mt * mt * mt
      : 1 - Math.pow(-2 * mt + 2, 3) / 2;

    return {
      x: lerp(circulo.x, arco.x, t),
      y: lerp(circulo.y, arco.y, t),
      r: lerp(circulo.r, arco.r, t),
      s: lerp(circulo.s, arco.s, t),
      o: 1
    };
  }

  /* ---- Loop RAF ---- */
  var SUAVIZADO_INTRO  = 0.22;
  var SUAVIZADO_SCROLL = 0.35;

  function loop() {
    rafPendiente = false;
    var suavizado = introHecho ? SUAVIZADO_SCROLL : SUAVIZADO_INTRO;
    var hayMovimiento = false;

    cards.forEach(function (card, i) {
      var obj = calcularObjetivo(i);
      var cur = estadoActual[i];
      var dx = Math.abs(obj.x - cur.x);
      var dy = Math.abs(obj.y - cur.y);

      cur.x = lerp(cur.x, obj.x, suavizado);
      cur.y = lerp(cur.y, obj.y, suavizado);
      cur.r = lerp(cur.r, obj.r, suavizado);
      cur.s = lerp(cur.s, obj.s, suavizado);
      cur.o = lerp(cur.o, obj.o, suavizado * 1.5);

      aplicar(card, cur.x, cur.y, cur.r, cur.s, cur.o);
      if (dx > 1.5 || dy > 1.5) hayMovimiento = true;
    });

    if (hayMovimiento) solicitarLoop();
  }

  function solicitarLoop() {
    if (!rafPendiente) {
      rafPendiente = true;
      requestAnimationFrame(loop);
    }
  }

  /* ---- Scroll virtual: SOLO cuando hero activo ---- */
  seccion.addEventListener('wheel', function (e) {
    var rect       = seccion.getBoundingClientRect();
    var heroActivo = rect.top <= 0 && rect.bottom >= window.innerHeight * 0.3;
    var puedeScroll =
      (e.deltaY > 0 && scrollVirtual < MAX_SCROLL) ||
      (e.deltaY < 0 && scrollVirtual > 0);
    if (heroActivo && puedeScroll && introHecho) {
      e.preventDefault();
      scrollVirtual = Math.min(Math.max(scrollVirtual + e.deltaY * 0.8, 0), MAX_SCROLL);
      solicitarLoop();
    }
  }, { passive: false });

  var touchY0 = 0;
  seccion.addEventListener('touchstart', function (e) {
    touchY0 = e.touches[0].clientY;
  }, { passive: true });

  seccion.addEventListener('touchmove', function (e) {
    if (!introHecho) return;
    var delta = (touchY0 - e.touches[0].clientY) * 1.2;
    touchY0   = e.touches[0].clientY;
    var puedeScroll =
      (delta > 0 && scrollVirtual < MAX_SCROLL) ||
      (delta < 0 && scrollVirtual > 0);
    if (puedeScroll) {
      scrollVirtual = Math.min(Math.max(scrollVirtual + delta, 0), MAX_SCROLL);
      solicitarLoop();
    }
  }, { passive: true });

  seccion.addEventListener('mousemove', function () {
    if (reducedMotion || !introHecho) return;
    solicitarLoop();
  });

  window.addEventListener('resize', function () {
    W = window.innerWidth;
    H = window.innerHeight;
    solicitarLoop();
  }, { passive: true });

  /* ---- Shutter titulo ---- */
  function initShutter(conDelay) {
    var titulo = document.getElementById('heroTitulo');
    if (!titulo) return;
    titulo.innerHTML = '';
    titulo.setAttribute('aria-label', 'EXPLORA MIAMI');
    'EXPLORA MIAMI'.split('').forEach(function (c, i) {
      if (c === ' ') {
        var sp = document.createElement('span');
        sp.style.cssText = 'display:inline-block;width:0.28em';
        titulo.appendChild(sp);
        return;
      }
      var wrap = document.createElement('span');
      wrap.className = 'shutter-letra';
      var capa = document.createElement('span');
      capa.className = 'shutter-capa';
      capa.textContent = c;
      if (conDelay) capa.style.animationDelay = (0.5 + i * 0.048) + 's';
      wrap.appendChild(capa);
      titulo.appendChild(wrap);
    });
  }

  /* ---- Secuencia de intro ---- */
  if (reducedMotion) {
    fase = 'circulo';
    introHecho = true;
    loop();
    initShutter(false);
    return;
  }

  cards.forEach(function (card, i) {
    var p = posScatter[i];
    estadoActual[i] = { x: p.x, y: p.y, r: p.r, s: p.s, o: 0 };
    aplicar(card, p.x, p.y, p.r, p.s, 0);
  });

  setTimeout(function () {
    fase = 'scatter';
    cards.forEach(function (_, i) { estadoActual[i].o = 1; });
    solicitarLoop();
  }, 100);

  setTimeout(function () { fase = 'linea';   solicitarLoop(); }, 600);
  setTimeout(function () { fase = 'circulo'; solicitarLoop(); }, 1400);
  setTimeout(function () { introHecho = true; }, 2200);
  setTimeout(function () { initShutter(true); }, 500);
}


/* ===== GLOBO 3D COBE.JS — GlobeStickers port (vanilla JS) ===== */
/*
 * Bug raíz anterior: createGlobe se llamaba con width=0 porque
 * el layout CSS grid no estaba calculado en DOMContentLoaded.
 * Fix: igual que el componente React — no crear el globo hasta
 * que canvas.offsetWidth > 0 (ResizeObserver lo detecta).
 */
function initGlobo() {
  var canvas = document.getElementById('globoCanvas');
  if (!canvas || typeof createGlobe === 'undefined') return;

  /* Si el canvas todavía no tiene dimensiones reales, esperar */
  if (canvas.offsetWidth === 0) {
    var roEspera = new ResizeObserver(function(entries) {
      if (entries[0].contentRect.width > 0) {
        roEspera.disconnect();
        initGlobo();
      }
    });
    roEspera.observe(canvas);
    return;
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Estado interacción — igual que el componente React */
  var pointerInteracting = null;   /* {x,y} o null */
  var dragOffset   = { phi: 0, theta: 0 };
  var phiOffset    = 0;
  var thetaOffset  = 0;
  var isPaused     = false;
  var phi          = 0;
  var animId;

  /* Marcadores — 17 ciudades mundiales */
  var MARKERS = [
    { location: [ 25.76, -80.19], size: 0.07 },  /* Miami */
    { location: [ 48.86,   2.35], size: 0.03 },  /* París */
    { location: [ 35.68, 139.65], size: 0.03 },  /* Tokyo */
    { location: [ 40.71, -74.01], size: 0.03 },  /* Nueva York */
    { location: [-22.91, -43.17], size: 0.03 },  /* Río */
    { location: [-33.87, 151.21], size: 0.03 },  /* Sydney */
    { location: [ 30.04,  31.24], size: 0.03 },  /* El Cairo */
    { location: [ 41.90,  12.50], size: 0.03 },  /* Roma */
    { location: [ 19.43, -99.13], size: 0.03 },  /* Ciudad de México */
    { location: [ 28.61,  77.21], size: 0.03 },  /* Nueva Delhi */
    { location: [ 64.15, -21.94], size: 0.03 },  /* Reykjavik */
    { location: [ 51.51,  -0.13], size: 0.03 },  /* Londres */
    { location: [ 21.31,-157.86], size: 0.03 },  /* Hawái */
    { location: [ 52.37,   4.90], size: 0.03 },  /* Ámsterdam */
    { location: [ 39.90, 116.40], size: 0.03 },  /* Pekín */
    { location: [ 55.75,  37.62], size: 0.03 },  /* Moscú */
    { location: [ 37.57, 126.98], size: 0.03 }   /* Seúl */
  ];

  /* Crear el globo — ancho real garantizado en este punto */
  var w = canvas.offsetWidth;
  var globo = createGlobe(canvas, {
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    width:         w,
    height:        w,
    phi:           0,
    theta:         0.2,
    /* Apariencia — fondo azul claro wrapper contrasta con el globo blanco */
    dark:          0,        /* oscuridad 0 = blanco puro, el fondo del wrapper da el contraste */
    diffuse:       1.2,
    mapSamples:    16000,
    mapBrightness: 6,
    baseColor:     [1.0, 1.0, 1.0],
    markerColor:   [1.0, 0.70, 0.0],   /* mostaza #FFB300 */
    glowColor:     [0.7,  0.85, 0.98], /* halo azul que se funde con el fondo */
    markers:       MARKERS,
    arcs:          [],
    opacity:       0.7   /* translúcido — el fondo azul del wrapper se ve a través */
  });

  /* Loop de animación externo — mismo patrón que el componente React */
  function animar() {
    if (!isPaused && !reducedMotion) phi += 0.003;
    globo.update({
      phi:   phi   + phiOffset   + dragOffset.phi,
      theta: 0.2   + thetaOffset + dragOffset.theta
    });
    animId = requestAnimationFrame(animar);
  }
  animar();

  /* Fade-in inmediato (igual que setTimeout 0 del React) */
  setTimeout(function() { if (canvas) canvas.style.opacity = '1'; }, 0);

  /* Drag — pointerdown en canvas */
  canvas.addEventListener('pointerdown', function(e) {
    pointerInteracting = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
    isPaused = true;
    canvas.setPointerCapture(e.pointerId);
  });

  /* Drag — pointermove en window */
  window.addEventListener('pointermove', function(e) {
    if (pointerInteracting === null) return;
    dragOffset = {
      phi:   (e.clientX - pointerInteracting.x) / 300,
      theta: (e.clientY - pointerInteracting.y) / 1000
    };
  }, { passive: true });

  /* Drag — pointerup en window */
  window.addEventListener('pointerup', function() {
    if (pointerInteracting !== null) {
      phiOffset   += dragOffset.phi;
      thetaOffset += dragOffset.theta;
      dragOffset   = { phi: 0, theta: 0 };
    }
    pointerInteracting = null;
    canvas.style.cursor = 'grab';
    isPaused = false;
  }, { passive: true });

  /* Resize — usar globo.resize() como hace la versión previa */
  var roGlobo = new ResizeObserver(function() {
    var nw = canvas.offsetWidth;
    if (nw > 0) globo.resize(nw, nw);
  });
  roGlobo.observe(canvas);

  /* Pausar cuando el globo sale del viewport */
  var ioGlobo = new IntersectionObserver(function(entries) {
    isPaused = !entries[0].isIntersecting;
  }, { threshold: 0.1 });
  ioGlobo.observe(canvas);

  /* Cleanup */
  canvas._cobeDestroy = function() {
    cancelAnimationFrame(animId);
    globo.destroy();
    roGlobo.disconnect();
    ioGlobo.disconnect();
  };
}

/* ===== REFERENCIAS GLOBO ===== */
function initReferenciasGlobo() {
  var contenedor = document.getElementById('mapaReferencias');
  if (!contenedor) return;

  var REFS = [
    { nombre: 'South Beach',       cat: 'playa' },
    { nombre: 'Wynwood',            cat: 'cultura' },
    { nombre: 'Coconut Grove',      cat: 'cultura' },
    { nombre: 'Key Biscayne',       cat: 'playa' },
    { nombre: 'Coral Gables',       cat: 'cultura' },
    { nombre: 'Brickell',           cat: 'cultura' },
    { nombre: 'Everglades',         cat: 'aventura' },
    { nombre: 'Shark Valley',       cat: 'aventura' },
    { nombre: 'Anhinga Trail',      cat: 'aventura' },
    { nombre: 'Big Cypress',        cat: 'parque' },
    { nombre: 'Homestead',          cat: 'aventura' },
    { nombre: 'Florida Keys',       cat: 'agua' },
    { nombre: 'Biscayne Bay',       cat: 'agua' },
    { nombre: 'Virginia Key',       cat: 'playa' },
    { nombre: 'Matheson Hammock',   cat: 'parque' },
    { nombre: 'Crandon Park',       cat: 'parque' },
    { nombre: 'Arch Creek',         cat: 'aventura' },
    { nombre: 'Oleta River',        cat: 'agua' },
    { nombre: 'Hollywood Beach',    cat: 'playa' },
    { nombre: 'Aventura',           cat: 'cultura' },
    { nombre: 'Little Havana',      cat: 'cultura' },
    { nombre: 'Design District',    cat: 'cultura' }
  ];

  REFS.forEach(function (ref) {
    var chip = document.createElement('span');
    chip.className   = 'mapa-ref-chip mapa-ref-chip--' + ref.cat;
    chip.textContent = ref.nombre;
    contenedor.appendChild(chip);
  });
}

/* ===== MAPA LEAFLET ===== */
function initMapaLeaflet() {
  /* Esperar a que Leaflet esté disponible */
  if (typeof L === 'undefined') {
    setTimeout(initMapaLeaflet, 500);
    return;
  }

  var contenedorMapa = document.getElementById('mapaLeaflet');
  if (!contenedorMapa) return;

  /* Destruir instancia previa si existe */
  if (contenedorMapa._leaflet_id) {
    contenedorMapa._leaflet_id = null;
    contenedorMapa.innerHTML   = '';
  }

  /* Mapa centrado en Miami */
  var mapa = L.map('mapaLeaflet', {
    center:             [25.75, -80.35],
    zoom:               10,
    zoomControl:        true,
    scrollWheelZoom:    false,
    attributionControl: true
  });

  /* Tiles OpenStreetMap estándar — sin API key, siempre disponibles */
  L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom:     19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    }
  ).addTo(mapa);

  /* Función para crear marcador custom circular */
  function crearIcono(color, tam, borde) {
    tam   = tam   || 12;
    borde = borde || 2;
    return L.divIcon({
      className: '',
      html:
        '<div style="' +
          'width:'             + tam + 'px;'           +
          'height:'            + tam + 'px;'           +
          'background-color:'  + color + ';'           +
          'border-radius:50%;'                         +
          'border:' + borde + 'px solid #ffffff;'      +
          'box-shadow:0 2px 8px rgba(0,0,0,0.35),'     +
                     '0 0 0 1px rgba(0,0,0,0.08);'    +
          'box-sizing:border-box;'                     +
        '"></div>',
      iconSize:   [tam, tam],
      iconAnchor: [tam / 2, tam / 2],
      popupAnchor:[0, -(tam / 2) - 4]
    });
  }

  /* 9 destinos principales */
  var DESTINOS_MAPA = [
    {
      lat: 25.2866, lng: -80.8987,
      tipo: 'tierra', color: '#FF6B6B',
      nombre_es: 'Everglades National Park',
      nombre_en: 'Everglades National Park',
      desc_es: '🏔️ Senderismo · Kayak · Fauna',
      desc_en: '🏔️ Hiking · Kayak · Wildlife'
    },
    {
      lat: 25.1288, lng: -80.4072,
      tipo: 'mar', color: '#00BCD4',
      nombre_es: 'John Pennekamp Coral Reef',
      nombre_en: 'John Pennekamp Coral Reef',
      desc_es: '🌊 Buceo · Snorkeling · Arrecife',
      desc_en: '🌊 Diving · Snorkeling · Reef'
    },
    {
      lat: 25.4729, lng: -80.3340,
      tipo: 'mar', color: '#00BCD4',
      nombre_es: 'Biscayne National Park',
      nombre_en: 'Biscayne National Park',
      desc_es: '🌊 Kayak · Snorkeling · Manglares',
      desc_en: '🌊 Kayak · Snorkeling · Mangroves'
    },
    {
      lat: 25.6671, lng: -80.1584,
      tipo: 'mar', color: '#00BCD4',
      nombre_es: 'Bill Baggs Cape Florida',
      nombre_en: 'Bill Baggs Cape Florida',
      desc_es: '🌊 Playa · Faro · Ciclismo',
      desc_en: '🌊 Beach · Lighthouse · Cycling'
    },
    {
      lat: 25.9103, lng: -80.1390,
      tipo: 'tierra', color: '#FF6B6B',
      nombre_es: 'Oleta River State Park',
      nombre_en: 'Oleta River State Park',
      desc_es: '🏔️ Kayak · Mountain Bike · Manglares',
      desc_en: '🏔️ Kayak · Mountain Bike · Mangroves'
    },
    {
      lat: 25.7355, lng: -80.1573,
      tipo: 'mar', color: '#00BCD4',
      nombre_es: 'Virginia Key Beach Park',
      nombre_en: 'Virginia Key Beach Park',
      desc_es: '🌊 Playa · Paddle Board · Historia',
      desc_en: '🌊 Beach · Paddle Board · History'
    },
    {
      lat: 25.6680, lng: -80.2747,
      tipo: 'mar', color: '#00BCD4',
      nombre_es: 'Matheson Hammock Park',
      nombre_en: 'Matheson Hammock Park',
      desc_es: '🌊 Playa · Atardecer · Snorkeling',
      desc_en: '🌊 Beach · Sunset · Snorkeling'
    },
    {
      lat: 25.7024, lng: -80.1556,
      tipo: 'mar', color: '#00BCD4',
      nombre_es: 'Crandon Park',
      nombre_en: 'Crandon Park',
      desc_es: '🌊 Playa · Kayak · Naturaleza',
      desc_en: '🌊 Beach · Kayak · Nature'
    },
    {
      lat: 25.8955, lng: -80.1678,
      tipo: 'tierra', color: '#FF6B6B',
      nombre_es: 'Arch Creek Park',
      nombre_en: 'Arch Creek Park',
      desc_es: '🏔️ Arqueología · Senderismo · Puente',
      desc_en: '🏔️ Archaeology · Hiking · Bridge'
    }
  ];

  /* 20 referencias adicionales */
  var REFERENCIAS_MAPA = [
    { lat:25.7617, lng:-80.1918, nombre:'Downtown Miami',     color:'#FFB300' },
    { lat:25.7743, lng:-80.1937, nombre:'Wynwood',            color:'#FFB300' },
    { lat:25.7907, lng:-80.1300, nombre:'Miami Beach',        color:'#00BCD4' },
    { lat:25.8103, lng:-80.1200, nombre:'South Beach',        color:'#00BCD4' },
    { lat:25.7650, lng:-80.2568, nombre:'Coral Gables',       color:'#FFB300' },
    { lat:25.8220, lng:-80.2684, nombre:'Hialeah',            color:'#FFB300' },
    { lat:25.6102, lng:-80.3984, nombre:'Homestead',          color:'#FF6B6B' },
    { lat:25.6985, lng:-80.4474, nombre:'Shark Valley',       color:'#FF6B6B' },
    { lat:25.4633, lng:-80.4724, nombre:'Florida City',       color:'#FF6B6B' },
    { lat:25.8576, lng:-80.1781, nombre:'Aventura',           color:'#FFB300' },
    { lat:25.9781, lng:-80.1495, nombre:'Hollywood Beach',    color:'#00BCD4' },
    { lat:25.7478, lng:-80.2456, nombre:'Coconut Grove',      color:'#FFB300' },
    { lat:25.7200, lng:-80.2684, nombre:'South Miami',        color:'#7CB342' },
    { lat:25.6366, lng:-80.3284, nombre:'Cutler Bay',         color:'#7CB342' },
    { lat:25.7741, lng:-80.3274, nombre:'Doral',              color:'#FFB300' },
    { lat:25.8450, lng:-80.3100, nombre:'Medley Wetlands',    color:'#4FC3F7' },
    { lat:25.5560, lng:-80.5100, nombre:'Big Cypress',        color:'#FF6B6B' },
    { lat:25.3384, lng:-80.6684, nombre:'Anhinga Trail',      color:'#FF6B6B' },
    { lat:25.6890, lng:-80.0984, nombre:'Key Biscayne',       color:'#00BCD4' },
    { lat:25.7600, lng:-80.2200, nombre:'Little Havana',      color:'#FFB300' }
  ];

  /* Idioma actual */
  var idioma = localStorage.getItem('em_idioma') || 'es';

  /* Agregar destinos principales — marcadores grandes (16px) */
  DESTINOS_MAPA.forEach(function(d) {
    var nombre = idioma === 'en' ? d.nombre_en : d.nombre_es;
    var desc   = idioma === 'en' ? d.desc_en   : d.desc_es;

    var popup =
      '<div style="min-width:160px">' +
        '<strong style="' +
          'font-family:\'Playfair Display\',Georgia,serif;' +
          'font-style:italic;' +
          'font-size:1rem;' +
          'display:block;' +
          'margin-bottom:4px;' +
          'color:#1a2a3a;' +
        '">' + nombre + '</strong>' +
        '<span style="' +
          'font-size:0.78rem;' +
          'color:#4a6070;' +
          'line-height:1.4;' +
        '">' + desc + '</span>' +
      '</div>';

    L.marker([d.lat, d.lng], {
      icon: crearIcono(d.color, 16, 3)
    })
    .addTo(mapa)
    .bindPopup(popup, {
      maxWidth: 220,
      className: 'explora-popup'
    });
  });

  /* Agregar referencias — marcadores pequeños (9px) */
  REFERENCIAS_MAPA.forEach(function(r) {
    L.marker([r.lat, r.lng], {
      icon: crearIcono(r.color, 9, 1.5)
    })
    .addTo(mapa)
    .bindPopup(
      '<span style="' +
        'font-size:0.85rem;' +
        'font-weight:600;' +
        'color:#1a2a3a;' +
      '">' + r.nombre + '</span>',
      { maxWidth: 160 }
    );
  });

  /* Forzar resize de Leaflet después de que el contenedor sea visible */
  setTimeout(function() {
    mapa.invalidateSize();
  }, 300);

  /* También al hacer scroll hacia la sección */
  var ioMapa = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      setTimeout(function() {
        mapa.invalidateSize();
      }, 100);
    }
  }, { threshold: 0.1 });
  ioMapa.observe(contenedorMapa);
}

/* ===== ANIMATED ROADMAP ===== */
/*
 * Port vanilla JS del componente AnimatedRoadmap (React + framer-motion).
 * – scroll → stroke-dashoffset anima el camino SVG (reemplaza useScroll/useTransform)
 * – IntersectionObserver → milestone .visible (reemplaza motion whileInView)
 */
function initRoadmap() {
  var canvas = document.getElementById('rdmCanvas');
  var path   = document.getElementById('rdmPath');
  if (!canvas || !path) return;

  /* ── Animar el camino según el scroll ── */
  var pathLen    = path.getTotalLength();
  var rafPending = false;

  path.style.strokeDasharray  = pathLen;
  path.style.strokeDashoffset = pathLen;  /* empieza invisible */

  function updatePath() {
    var rect   = canvas.getBoundingClientRect();
    var winH   = window.innerHeight;
    /* Progress: 0 = canvas entra al viewport; 1 = canvas sale por arriba */
    var raw    = (winH - rect.top) / (winH + rect.height);
    /* Remap: animación activa entre 12% y 80% del recorrido scroll */
    var mapped = Math.max(0, Math.min(1, (raw - 0.12) / (0.80 - 0.12)));
    path.style.strokeDashoffset = pathLen * (1 - mapped);
    rafPending = false;
  }

  window.addEventListener('scroll', function() {
    if (!rafPending) { rafPending = true; requestAnimationFrame(updatePath); }
  }, { passive: true });
  updatePath();   /* estado inicial */

  /* ── Milestones: entrada escalonada ── */
  var milestones    = canvas.querySelectorAll('.rdm-milestone');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el    = entry.target;
      var idx   = parseInt(el.dataset.idx || '0', 10);
      var delay = reducedMotion ? 0 : idx * 80;    /* 80ms entre cada marcador */
      setTimeout(function() { el.classList.add('visible'); }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  milestones.forEach(function(m) { io.observe(m); });
}

/* ===== TOOLTIP DEL ROADMAP — tarjeta flotante al pasar el cursor ===== */
function initRoadmapTooltip() {
  var canvas = document.getElementById('rdmCanvas');
  if (!canvas) return;

  /* Crear el elemento tooltip una sola vez y adjuntarlo al body
     para usar position: fixed sin restricciones de overflow */
  var tip = document.createElement('div');
  tip.className = 'rdm-tooltip';
  tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML =
    '<div class="rdm-tooltip__barra"></div>' +
    '<div class="rdm-tooltip__nombre"></div>' +
    '<p class="rdm-tooltip__desc"></p>';
  document.body.appendChild(tip);

  var tipNombre = tip.querySelector('.rdm-tooltip__nombre');
  var tipDesc   = tip.querySelector('.rdm-tooltip__desc');

  /* Posiciona el tooltip cerca del cursor, clampeado al viewport */
  function moverTip(e) {
    var x  = e.clientX + 18;
    var y  = e.clientY - 14;
    var tw = tip.offsetWidth  || 236;
    var th = tip.offsetHeight || 100;
    if (x + tw > window.innerWidth  - 14) x = e.clientX - tw - 18;
    if (y + th > window.innerHeight - 14) y = e.clientY - th - 8;
    if (y < 8) y = e.clientY + 20;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }

  function mostrarTip(m, e) {
    var desc   = m.dataset.desc || '';
    if (!desc) return;
    /* Nombre: extraer antes del " — " del atributo title */
    var titulo = (m.getAttribute('title') || '').split('—')[0].trim();
    tipNombre.textContent = titulo;
    tipDesc.textContent   = desc;
    tip.classList.add('rdm-tooltip--visible');
    moverTip(e);
  }

  function ocultarTip() {
    tip.classList.remove('rdm-tooltip--visible');
  }

  /* Registrar eventos en todos los milestones */
  canvas.querySelectorAll('.rdm-milestone').forEach(function(m) {
    m.addEventListener('mouseenter', function(e) { mostrarTip(m, e); });
    m.addEventListener('mousemove',  moverTip);
    m.addEventListener('mouseleave', ocultarTip);
  });

  /* Ocultar si la ventana pierde el foco */
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) ocultarTip();
  });
}

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', function () {
  leerConfigSitio();
  registrarVisita();
  renderDestinos();
  initScrollAnimation();
  initHeroTrail();
  initRoadmap();
  initRoadmapTooltip();
  /* initGlobo / initMapaLeaflet / initReferenciasGlobo eliminados —
     la sección mapa fue reemplazada por el roadmap animado */
});
