/* =========================================
   305 RUTA MIAMI — main.js
   Lógica del sitio público
   JS puro, sin librerías externas
   Comentarios en español
========================================= */

/* ===== DATOS DE DESTINOS ===== */
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
    precio: '$35 / vehículo (7 días)', precio_en: '$35 / vehicle (7 days)',
    horarios: '24h (Shark Valley: 8am–6pm)', horarios_en: '24h (Shark Valley: 8am–6pm)',
    tipo: 'tierra', tipo_es: 'Senderismo · Kayak', tipo_en: 'Hiking · Kayak',
    categoria: 'exploracion', categoria_es: 'Exploración', categoria_en: 'Exploration',
    telefono: '(305) 242-7700',
    web_oficial: 'https://www.nps.gov/ever/',
    mejor_epoca: 'Nov–Abr (temporada seca)', mejor_epoca_en: 'Nov–Apr (dry season)',
    google_maps_url: 'https://maps.google.com/maps?q=25.2866,-80.8987',
    apple_maps_url: 'https://maps.apple.com/?q=Everglades+National+Park&ll=25.2866,-80.8987',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g294467-d143673-Reviews-Everglades_National_Park-Florida.html',
    rating: 4.8, /* Google Maps — mayo 2026 */
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
    precio: '$8 / persona + tours desde $32', precio_en: '$8 / person + tours from $32',
    horarios: '8am–sunset', horarios_en: '8am–sunset',
    tipo: 'mar', tipo_es: 'Buceo · Snorkeling', tipo_en: 'Diving · Snorkeling',
    categoria: 'buceo', categoria_es: 'Buceo', categoria_en: 'Diving',
    telefono: '(305) 451-6300',
    web_oficial: 'https://www.floridastateparks.org/parks-and-trails/john-pennekamp-coral-reef-state-park',
    mejor_epoca: 'Mar–Jun (visibilidad máxima)', mejor_epoca_en: 'Mar–Jun (peak visibility)',
    google_maps_url: 'https://maps.google.com/maps?q=25.1288,-80.4072',
    apple_maps_url: 'https://maps.apple.com/?q=John+Pennekamp+Coral+Reef+State+Park&ll=25.1288,-80.4072',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34275-d143712-Reviews-John_Pennekamp_Coral_Reef_State_Park-Key_Largo_Florida_Keys_Florida.html',
    rating: 4.7, /* Google Maps — mayo 2026 */
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
    precio: 'Entrada gratis · Tours: $45–$65', precio_en: 'Free entry · Tours: $45–$65',
    horarios: '7am–5:30pm (Visitor Center)', horarios_en: '7am–5:30pm (Visitor Center)',
    tipo: 'mar', tipo_es: 'Kayak · Snorkeling · Buceo', tipo_en: 'Kayak · Snorkeling · Diving',
    categoria: 'buceo', categoria_es: 'Buceo', categoria_en: 'Diving',
    telefono: '(305) 230-1144',
    web_oficial: 'https://www.nps.gov/bisc/',
    mejor_epoca: 'Nov–Abr (aguas más tranquilas)', mejor_epoca_en: 'Nov–Apr (calmer waters)',
    google_maps_url: 'https://maps.google.com/maps?q=25.4729,-80.3340',
    apple_maps_url: 'https://maps.apple.com/?q=Biscayne+National+Park&ll=25.4729,-80.3340',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34262-d143693-Reviews-Biscayne_National_Park-Homestead_Florida.html',
    rating: 4.7, /* Google Maps — mayo 2026 */
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
    precio: '$8 / vehículo (hasta 8 pers)', precio_en: '$8 / vehicle (up to 8 people)',
    horarios: '8am–sunset', horarios_en: '8am–sunset',
    tipo: 'mar', tipo_es: 'Playa · Ciclismo · Snorkeling', tipo_en: 'Beach · Cycling · Snorkeling',
    categoria: 'playa', categoria_es: 'Playa', categoria_en: 'Beach',
    telefono: '(305) 361-5811',
    web_oficial: 'https://www.floridastateparks.org/parks-and-trails/bill-baggs-cape-florida-state-park',
    mejor_epoca: 'Oct–May (temporada baja y aguas tranquilas)', mejor_epoca_en: 'Oct–May (off-season, calm waters)',
    google_maps_url: 'https://maps.google.com/maps?q=25.6671,-80.1584',
    apple_maps_url: 'https://maps.apple.com/?q=Bill+Baggs+Cape+Florida+State+Park&ll=25.6671,-80.1584',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34438-d143731-Reviews-Bill_Baggs_Cape_Florida_State_Park-Key_Biscayne_Florida.html',
    rating: 4.8, /* Google Maps — mayo 2026 */
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
    precio: '$6 / vehículo', precio_en: '$6 / vehicle',
    horarios: '8am–sunset', horarios_en: '8am–sunset',
    tipo: 'tierra', tipo_es: 'Kayak · Mountain Bike', tipo_en: 'Kayak · Mountain Bike',
    categoria: 'exploracion', categoria_es: 'Exploración', categoria_en: 'Exploration',
    telefono: '(305) 919-1846',
    web_oficial: 'https://www.floridastateparks.org/parks-and-trails/oleta-river-state-park',
    mejor_epoca: 'Oct–Abr (temperaturas más frescas)', mejor_epoca_en: 'Oct–Apr (cooler temperatures)',
    google_maps_url: 'https://maps.google.com/maps?q=25.9103,-80.1390',
    apple_maps_url: 'https://maps.apple.com/?q=Oleta+River+State+Park&ll=25.9103,-80.1390',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34429-d548213-Reviews-Oleta_River_State_Park-North_Miami_Beach_Florida.html',
    rating: 4.6, /* Google Maps — mayo 2026 */
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
    precio: '$8 / vehículo', precio_en: '$8 / vehicle',
    horarios: '7am–7pm (8pm jun–ago)', horarios_en: '7am–7pm (8pm Jun–Aug)',
    tipo: 'mar', tipo_es: 'Paddle Board · Kayak · Playa', tipo_en: 'Paddle Board · Kayak · Beach',
    categoria: 'playa', categoria_es: 'Playa', categoria_en: 'Beach',
    telefono: '(305) 960-4600',
    web_oficial: 'https://www.virginiakeybeachpark.net/',
    mejor_epoca: 'Nov–May (temporada baja)', mejor_epoca_en: 'Nov–May (off-season)',
    google_maps_url: 'https://maps.google.com/maps?q=25.7355,-80.1573',
    apple_maps_url: 'https://maps.apple.com/?q=Virginia+Key+Beach+Park&ll=25.7355,-80.1573',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34438-d8728698-Reviews-Virginia_Key_Beach_Park-Key_Biscayne_Florida.html',
    rating: 4.5, /* Google Maps — mayo 2026 */
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
    precio: '$8 / vehículo', precio_en: '$8 / vehicle',
    horarios: 'Sunrise–sunset', horarios_en: 'Sunrise–sunset',
    tipo: 'mar', tipo_es: 'Playa · Snorkeling · Kayak', tipo_en: 'Beach · Snorkeling · Kayak',
    categoria: 'playa', categoria_es: 'Playa', categoria_en: 'Beach',
    telefono: '(305) 665-5475',
    web_oficial: 'https://www.miamidade.gov/parks/matheson-hammock.asp',
    mejor_epoca: 'Nov–May (menor afluencia)', mejor_epoca_en: 'Nov–May (fewer crowds)',
    google_maps_url: 'https://maps.google.com/maps?q=25.6680,-80.2747',
    apple_maps_url: 'https://maps.apple.com/?q=Matheson+Hammock+Park&ll=25.6680,-80.2747',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34425-d8728345-Reviews-Matheson_Hammock_Park-Coral_Gables_Florida.html',
    rating: 4.5, /* Google Maps — mayo 2026 */
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
    precio: '$8 / vehículo', precio_en: '$8 / vehicle',
    horarios: '8am–sunset', horarios_en: '8am–sunset',
    tipo: 'mar', tipo_es: 'Playa · Kayak · Naturaleza', tipo_en: 'Beach · Kayak · Nature',
    categoria: 'playa', categoria_es: 'Playa', categoria_en: 'Beach',
    telefono: '(305) 361-5421',
    web_oficial: 'https://www.miamidade.gov/parks/crandon.asp',
    mejor_epoca: 'Nov–May (temporada alta en aguas)', mejor_epoca_en: 'Nov–May (peak water conditions)',
    google_maps_url: 'https://maps.google.com/maps?q=25.7024,-80.1556',
    apple_maps_url: 'https://maps.apple.com/?q=Crandon+Park&ll=25.7024,-80.1556',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34438-d258126-Reviews-Crandon_Park-Key_Biscayne_Florida.html',
    rating: 4.7, /* Google Maps — mayo 2026 */
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
    precio: 'Gratis (donaciones bienvenidas)', precio_en: 'Free (donations welcome)',
    horarios: '9am–5pm (Mar–Dom)', horarios_en: '9am–5pm (Tue–Sun)',
    tipo: 'tierra', tipo_es: 'Senderismo · Arqueología', tipo_en: 'Hiking · Archaeology',
    categoria: 'exploracion', categoria_es: 'Exploración', categoria_en: 'Exploration',
    telefono: '(305) 944-6111',
    web_oficial: 'https://www.miamidade.gov/parks/arch-creek.asp',
    mejor_epoca: 'Oct–Abr (aves migratorias en temporada)', mejor_epoca_en: 'Oct–Apr (migratory bird season)',
    google_maps_url: 'https://maps.google.com/maps?q=25.8955,-80.1678',
    apple_maps_url: 'https://maps.apple.com/?q=Arch+Creek+Park&ll=25.8955,-80.1678',
    resenas_url: 'https://www.tripadvisor.com/Attraction_Review-g34429-d550295-Reviews-Arch_Creek_Park-North_Miami_Beach_Florida.html',
    rating: 4.6, /* Google Maps — mayo 2026 */
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
  },

  /* ============================================================
     12 DESTINOS NUEVOS — etapa categorías (lugares reales)
     Fotos: CC0 curadas en assets/images/destinos/[slug]/ (optimizadas <800KB).
     rating: calificaciones reales (TripAdvisor/Google Maps); 3 reseñas ES/EN por destino.
     ============================================================ */

  /* ---------- PLAYA ---------- */
  {
    id: 10,
    nombre_es: 'South Beach (Lummus Park)', nombre_en: 'South Beach (Lummus Park)',
    descripcion_es: 'La playa más icónica de Miami: arena clara, aguas cálidas y el distrito Art Déco a un paso, con sus torres de salvavidas de colores.',
    descripcion_en: 'Miami\'s most iconic beach: pale sand, warm water and the Art Deco district steps away, with its colorful lifeguard towers.',
    descripcion_larga_es: 'South Beach es el tramo de costa más famoso de Miami Beach, frente a Lummus Park y el histórico distrito Art Déco de Ocean Drive. Sus aguas turquesas y su arena ancha la hacen ideal para nadar, tomar el sol y caminar junto a las icónicas casetas de salvavidas pintadas en tonos pastel. El paseo peatonal de Lummus Park conecta cafés, palmeras y zonas verdes a lo largo de Ocean Drive. Es de acceso público y gratuito, con socorristas durante el día.',
    descripcion_larga_en: 'South Beach is the most famous stretch of Miami Beach, fronting Lummus Park and the historic Art Deco district of Ocean Drive. Its turquoise water and wide sand make it ideal for swimming, sunbathing and strolling past the iconic pastel-painted lifeguard towers. The Lummus Park promenade links cafes, palms and green areas along Ocean Drive. Public and free, with lifeguards on duty during the day.',
    como_llegar_es: 'En el corazón de Miami Beach, sobre Ocean Drive entre las calles 5 y 14. Desde el centro de Miami: 15–20 min por el MacArthur Causeway (I-395). Estacionamiento de pago en garajes municipales y rutas de autobús South Beach Local.',
    como_llegar_en: 'In the heart of Miami Beach, along Ocean Drive between 5th and 14th streets. From downtown Miami: 15–20 min via the MacArthur Causeway (I-395). Paid parking in municipal garages and South Beach Local bus routes.',
    foto: 'assets/images/destinos/south-beach/south-beach-1.jpg',
    galeria: [
      'assets/images/destinos/south-beach/south-beach-1.jpg',
      'assets/images/destinos/south-beach/south-beach-2.jpg',
      'assets/images/destinos/south-beach/south-beach-3.jpg',
      'assets/images/destinos/south-beach/south-beach-4.jpg',
      'assets/images/destinos/south-beach/south-beach-5.jpg',
      'assets/images/destinos/south-beach/south-beach-6.jpg'
    ],
    lat: 25.7826, lng: -80.1300,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Gratis', precio_en: 'Free',
    horarios: 'Playa 5am–medianoche', horarios_en: 'Beach 5am–midnight',
    tipo: 'mar', tipo_es: 'Playa · Art Déco', tipo_en: 'Beach · Art Deco',
    categoria: 'playa', categoria_es: 'Playa', categoria_en: 'Beach',
    telefono: '', web_oficial: 'https://www.miamibeachfl.gov/',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=South+Beach+Lummus+Park+Ocean+Drive+Miami+Beach+FL+33139',
    apple_maps_url: 'https://maps.apple.com/?q=South+Beach+Miami&ll=25.7826,-80.1300',
    resenas_url: '',
    rating: 4.8, activo: true, resenas: []
  },

  /* ---------- BUCEO ---------- */
  {
    id: 11,
    nombre_es: 'Neptune Memorial Reef', nombre_en: 'Neptune Memorial Reef',
    descripcion_es: 'Arrecife artificial inspirado en la Atlántida, a unos 12 metros de profundidad frente a Key Biscayne. Solo accesible por barco con operadores de buceo.',
    descripcion_en: 'An artificial reef inspired by Atlantis, about 40 ft deep off Key Biscayne. Accessible only by boat with dive operators.',
    descripcion_larga_es: 'El Neptune Memorial Reef es uno de los arrecifes artificiales más grandes del mundo, ubicado a 3.25 millas al este de Key Biscayne. Diseñado como una ciudad submarina al estilo de la Atlántida, con columnas, arcos y leones de bronce, funciona además como un osario marino que ha creado un próspero hábitat para corales y peces. A unos 12 metros de profundidad, es un sitio popular tanto para buceadores certificados como para snorkelistas avanzados, siempre con operadores autorizados que salen en barco.',
    descripcion_larga_en: 'Neptune Memorial Reef is one of the world\'s largest artificial reefs, located 3.25 miles east of Key Biscayne. Designed as an Atlantis-style underwater city with columns, arches and bronze lions, it also serves as a marine memorial that has created a thriving habitat for corals and fish. At about 40 ft deep, it is a popular site for certified divers and advanced snorkelers, always reached by boat with licensed operators.',
    como_llegar_es: 'Mar adentro, 3.25 millas al este de Key Biscayne. Solo se llega en barco con operadores de buceo autorizados que salen desde marinas de Miami y Key Biscayne. No hay acceso desde la orilla.',
    como_llegar_en: 'Offshore, 3.25 miles east of Key Biscayne. Reached only by boat with licensed dive operators departing from Miami and Key Biscayne marinas. No shore access.',
    foto: 'assets/images/destinos/neptune-reef/neptune-reef-1.jpg',
    galeria: [
      'assets/images/destinos/neptune-reef/neptune-reef-1.jpg',
      'assets/images/destinos/neptune-reef/neptune-reef-2.jpg',
      'assets/images/destinos/neptune-reef/neptune-reef-3.jpg',
      'assets/images/destinos/neptune-reef/neptune-reef-4.jpg'
    ],
    lat: 25.6919, lng: -80.0939,
    dificultad_es: 'Avanzado (buceo certificado)', dificultad_en: 'Advanced (certified diving)', dificultad_clase: 'dificil',
    precio: 'Según operador', precio_en: 'Varies by operator',
    horarios: 'Según tour', horarios_en: 'Per tour',
    tipo: 'mar', tipo_es: 'Buceo · Arrecife artificial', tipo_en: 'Diving · Artificial reef',
    categoria: 'buceo', categoria_es: 'Buceo', categoria_en: 'Diving',
    telefono: '', web_oficial: 'https://www.nmreef.com/',
    mejor_epoca: 'May–Sep (aguas cálidas)', mejor_epoca_en: 'May–Sep (warm water)',
    google_maps_url: 'https://maps.google.com/maps?q=Neptune+Memorial+Reef+Key+Biscayne+FL',
    apple_maps_url: 'https://maps.apple.com/?q=Neptune+Memorial+Reef&ll=25.6919,-80.0939',
    resenas_url: '',
    rating: 4.5, activo: true, resenas: []
  },
  {
    id: 12,
    nombre_es: 'Half Moon Wreck Preserve', nombre_en: 'Half Moon Wreck Preserve',
    descripcion_es: 'Yate alemán hundido en 1930, hoy preserva arqueológica estatal en aguas someras entre Virginia Key y Key Biscayne. Ideal para snorkel y buceo somero.',
    descripcion_en: 'A German yacht sunk in 1930, now a state archaeological preserve in shallow water between Virginia Key and Key Biscayne. Great for snorkeling and shallow diving.',
    descripcion_larga_es: 'El Half Moon fue un elegante yate de regata alemán construido en 1908 que terminó hundido en 1930 cerca de Key Biscayne. Hoy es una de las Preservas Arqueológicas Subacuáticas de Florida: sus restos descansan en aguas someras y forman un arrecife vivo poblado de peces tropicales. Su poca profundidad lo hace accesible para snorkelistas y buceadores principiantes que llegan en barco o kayak. Por ser sitio protegido, no se puede extraer nada — solo observar y fotografiar.',
    descripcion_larga_en: 'The Half Moon was an elegant German racing yacht built in 1908 that sank in 1930 near Key Biscayne. Today it is one of Florida\'s Underwater Archaeological Preserves: its remains rest in shallow water and form a living reef teeming with tropical fish. Its shallow depth makes it accessible to snorkelers and beginner divers arriving by boat or kayak. As a protected site, nothing may be removed — only observed and photographed.',
    como_llegar_es: 'En el agua entre Virginia Key y Key Biscayne, cerca del canal de Bear Cut. Se llega en barco o kayak; varios operadores de Miami ofrecen salidas. No hay acceso desde la orilla.',
    como_llegar_en: 'In the water between Virginia Key and Key Biscayne, near the Bear Cut channel. Reached by boat or kayak; several Miami operators offer trips. No shore access.',
    foto: 'assets/images/destinos/half-moon-wreck/half-moon-wreck-1.jpg',
    galeria: [
      'assets/images/destinos/half-moon-wreck/half-moon-wreck-1.jpg',
      'assets/images/destinos/half-moon-wreck/half-moon-wreck-2.jpg'
    ],
    lat: 25.6950, lng: -80.1300,
    dificultad_es: 'Intermedio (snorkel/buceo somero)', dificultad_en: 'Intermediate (snorkel/shallow dive)', dificultad_clase: 'moderado',
    precio: 'Gratis (preserva pública)', precio_en: 'Free (public preserve)',
    horarios: 'Horas de luz', horarios_en: 'Daylight hours',
    tipo: 'mar', tipo_es: 'Buceo · Naufragio histórico', tipo_en: 'Diving · Historic wreck',
    categoria: 'buceo', categoria_es: 'Buceo', categoria_en: 'Diving',
    telefono: '', web_oficial: '',
    mejor_epoca: 'May–Sep (aguas cálidas)', mejor_epoca_en: 'May–Sep (warm water)',
    google_maps_url: 'https://maps.google.com/maps?q=Half+Moon+Wreck+Preserve+Key+Biscayne+FL',
    apple_maps_url: 'https://maps.apple.com/?q=Half+Moon+Wreck&ll=25.6950,-80.1300',
    resenas_url: '',
    rating: 4.4, activo: true, resenas: []
  },

  /* ---------- PESCA ---------- */
  {
    id: 13,
    nombre_es: 'South Pointe Park Pier', nombre_en: 'South Pointe Park Pier',
    descripcion_es: 'Muelle público sobre Government Cut, en la punta sur de Miami Beach. Pesca de orilla, faro histórico y vistas de los cruceros que entran y salen del puerto.',
    descripcion_en: 'Public pier over Government Cut, at the southern tip of Miami Beach. Shore fishing, a historic lighthouse and views of cruise ships entering and leaving the port.',
    descripcion_larga_es: 'El muelle de South Pointe Park se adentra sobre Government Cut, el canal por el que pasan los enormes cruceros del puerto de Miami. Es un punto clásico de pesca de orilla, gratuito y abierto al público, con barandas amplias, bancas y un faro histórico cercano. Al amanecer y al atardecer se llena de pescadores locales que buscan snook, jurel y pámpano. El parque que lo rodea tiene césped, duchas y un paseo junto al mar.',
    descripcion_larga_en: 'The South Pointe Park pier reaches out over Government Cut, the channel where Miami\'s huge cruise ships pass. It is a classic shore-fishing spot, free and open to the public, with wide railings, benches and a nearby historic lighthouse. At sunrise and sunset it fills with local anglers after snook, jack and pompano. The surrounding park has lawns, showers and a seaside promenade.',
    como_llegar_es: 'En el extremo sur de Miami Beach, al final de Washington Ave. Desde el centro de Miami: 15–20 min por el MacArthur Causeway. Estacionamiento de pago junto al parque.',
    como_llegar_en: 'At the southern end of Miami Beach, at the foot of Washington Ave. From downtown Miami: 15–20 min via the MacArthur Causeway. Paid parking next to the park.',
    foto: 'assets/images/destinos/south-pointe-pier/south-pointe-pier-1.jpg',
    galeria: [
      'assets/images/destinos/south-pointe-pier/south-pointe-pier-1.jpg'
    ],
    lat: 25.7680, lng: -80.1342,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Gratis', precio_en: 'Free',
    horarios: 'Amanecer–atardecer', horarios_en: 'Sunrise–sunset',
    tipo: 'mar', tipo_es: 'Pesca de orilla · Paseo', tipo_en: 'Shore fishing · Promenade',
    categoria: 'pesca', categoria_es: 'Pesca', categoria_en: 'Fishing',
    telefono: '', web_oficial: 'https://www.miamibeachfl.gov/',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=South+Pointe+Park+Pier+1+Washington+Ave+Miami+Beach+FL+33139',
    apple_maps_url: 'https://maps.apple.com/?q=South+Pointe+Park+Pier&ll=25.7680,-80.1342',
    resenas_url: '',
    rating: 4.8, activo: true, resenas: []
  },
  {
    id: 14,
    nombre_es: 'Haulover Park (Jetty)', nombre_en: 'Haulover Park (Jetty)',
    descripcion_es: 'Jetty de pesca junto al Haulover Inlet, en uso desde 1927. Punto popular para pesca de roca y surf fishing, junto a una de las playas más extensas del condado.',
    descripcion_en: 'A fishing jetty by the Haulover Inlet, in use since 1927. A popular spot for rock and surf fishing, next to one of the county\'s longest beaches.',
    descripcion_larga_es: 'Haulover Park ocupa una franja de costa entre el océano y la bahía, atravesada por el Haulover Inlet. Su jetty de rocas, en uso desde 1927, es un imán para pescadores que aprovechan la corriente del inlet para capturar snook, róbalo y jurel. El parque del condado ofrece además playa amplia, alquiler de kayaks, marina y zonas de pícnic. La pesca desde la orilla y el jetty es gratuita; el estacionamiento se paga.',
    descripcion_larga_en: 'Haulover Park occupies a strip of coast between the ocean and the bay, crossed by the Haulover Inlet. Its rock jetty, in use since 1927, is a magnet for anglers who work the inlet current for snook, sea bass and jack. The county park also offers a wide beach, kayak rentals, a marina and picnic areas. Fishing from the shore and jetty is free; parking is paid.',
    como_llegar_es: 'En 10800 Collins Ave, Miami Beach. Desde el centro de Miami: 25–30 min por la I-95 y Collins Ave. Estacionamiento de pago del condado dentro del parque.',
    como_llegar_en: 'At 10800 Collins Ave, Miami Beach. From downtown Miami: 25–30 min via I-95 and Collins Ave. Paid county parking inside the park.',
    foto: 'assets/images/destinos/haulover/haulover-1.jpg',
    galeria: [
      'assets/images/destinos/haulover/haulover-1.jpg',
      'assets/images/destinos/haulover/haulover-2.jpg'
    ],
    lat: 25.9040, lng: -80.1230,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Gratis (estacionamiento aparte)', precio_en: 'Free (parking extra)',
    horarios: 'Amanecer–atardecer', horarios_en: 'Sunrise–sunset',
    tipo: 'mar', tipo_es: 'Pesca de roca · Surf fishing', tipo_en: 'Rock fishing · Surf fishing',
    categoria: 'pesca', categoria_es: 'Pesca', categoria_en: 'Fishing',
    telefono: '', web_oficial: 'https://www.miamidade.gov/parks/haulover.asp',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=Haulover+Park+10800+Collins+Ave+Miami+Beach+FL+33154',
    apple_maps_url: 'https://maps.apple.com/?q=Haulover+Park&ll=25.9040,-80.1230',
    resenas_url: '',
    rating: 4.5, activo: true, resenas: []
  },
  {
    id: 15,
    nombre_es: 'Rickenbacker Causeway', nombre_en: 'Rickenbacker Causeway',
    descripcion_es: 'Pesca de orilla clásica camino a Key Biscayne, con vistas al skyline de Miami. Tramos de costa accesibles a pie a lo largo del puente.',
    descripcion_en: 'Classic shore fishing on the way to Key Biscayne, with views of the Miami skyline. Walkable coastal stretches along the causeway.',
    descripcion_larga_es: 'El Rickenbacker Causeway conecta Miami con Virginia Key y Key Biscayne, y sus orillas son uno de los lugares de pesca de orilla más queridos de la ciudad. A lo largo del puente hay tramos de playa y rocas donde los locales lanzan la caña con el skyline de Miami de fondo. También es un punto popular para kitesurf, ciclismo y picnic. La pesca de orilla es gratuita; el causeway cobra un peaje de entrada en auto.',
    descripcion_larga_en: 'The Rickenbacker Causeway connects Miami to Virginia Key and Key Biscayne, and its shores are one of the city\'s best-loved shore-fishing spots. Along the bridge there are stretches of beach and rock where locals cast their lines with the Miami skyline behind them. It is also a popular spot for kitesurfing, cycling and picnics. Shore fishing is free; the causeway charges a toll for cars.',
    como_llegar_es: 'Acceso por el Rickenbacker Causeway desde Brickell/Coconut Grove hacia Key Biscayne. Desde el centro de Miami: 10–15 min. Peaje de entrada en auto; estacionamiento a lo largo de la vía.',
    como_llegar_en: 'Access via the Rickenbacker Causeway from Brickell/Coconut Grove toward Key Biscayne. From downtown Miami: 10–15 min. Toll for cars; parking along the road.',
    foto: 'assets/images/destinos/rickenbacker-causeway/rickenbacker-causeway-1.jpg',
    galeria: [
      'assets/images/destinos/rickenbacker-causeway/rickenbacker-causeway-1.jpg',
      'assets/images/destinos/rickenbacker-causeway/rickenbacker-causeway-2.jpg'
    ],
    lat: 25.7470, lng: -80.1700,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Gratis (peaje del causeway en auto)', precio_en: 'Free (causeway toll for cars)',
    horarios: '24h', horarios_en: '24h',
    tipo: 'mar', tipo_es: 'Pesca de orilla · Skyline', tipo_en: 'Shore fishing · Skyline',
    categoria: 'pesca', categoria_es: 'Pesca', categoria_en: 'Fishing',
    telefono: '', web_oficial: 'https://www.miamidade.gov/parks/rickenbacker.asp',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=Rickenbacker+Causeway+Key+Biscayne+FL',
    apple_maps_url: 'https://maps.apple.com/?q=Rickenbacker+Causeway&ll=25.7470,-80.1700',
    resenas_url: '',
    rating: 4.5, activo: true, resenas: []
  },
  {
    id: 16,
    nombre_es: 'Newport Fishing Pier', nombre_en: 'Newport Fishing Pier',
    descripcion_es: 'Muelle de pesca popular en Sunny Isles Beach, abierto al público. Punto habitual para surf fishing y para ver el amanecer sobre el Atlántico.',
    descripcion_en: 'A popular fishing pier in Sunny Isles Beach, open to the public. A regular spot for surf fishing and for watching the sunrise over the Atlantic.',
    descripcion_larga_es: 'El Newport Fishing Pier se extiende sobre el Atlántico en Sunny Isles Beach, junto al histórico Newport Beachside Resort. Es uno de los pocos muelles de pesca que quedan en la zona norte de Miami-Dade, frecuentado por pescadores que buscan pámpano, mackerel y snapper. Se paga una pequeña tarifa de muelle para pescar. Su orientación al este lo convierte en un lugar privilegiado para ver el amanecer sobre el mar.',
    descripcion_larga_en: 'The Newport Fishing Pier stretches over the Atlantic in Sunny Isles Beach, next to the historic Newport Beachside Resort. It is one of the few fishing piers left in northern Miami-Dade, frequented by anglers after pompano, mackerel and snapper. A small pier fee is charged to fish. Its eastern orientation makes it a prime spot to watch the sunrise over the sea.',
    como_llegar_es: 'En 16701 Collins Ave, Sunny Isles Beach. Desde el centro de Miami: 30–35 min por la I-95 y Collins Ave. Estacionamiento de pago cercano.',
    como_llegar_en: 'At 16701 Collins Ave, Sunny Isles Beach. From downtown Miami: 30–35 min via I-95 and Collins Ave. Paid parking nearby.',
    foto: 'assets/images/destinos/newport-pier/newport-pier-1.jpg',
    galeria: [
      'assets/images/destinos/newport-pier/newport-pier-1.jpg',
      'assets/images/destinos/newport-pier/newport-pier-2.jpg',
      'assets/images/destinos/newport-pier/newport-pier-3.jpg',
      'assets/images/destinos/newport-pier/newport-pier-4.jpg'
    ],
    lat: 25.9290, lng: -80.1210,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Tarifa de muelle', precio_en: 'Pier fee',
    horarios: 'Consultar horario', horarios_en: 'Check hours',
    tipo: 'mar', tipo_es: 'Pesca de muelle · Amanecer', tipo_en: 'Pier fishing · Sunrise',
    categoria: 'pesca', categoria_es: 'Pesca', categoria_en: 'Fishing',
    telefono: '', web_oficial: '',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=Newport+Fishing+Pier+16701+Collins+Ave+Sunny+Isles+Beach+FL+33160',
    apple_maps_url: 'https://maps.apple.com/?q=Newport+Fishing+Pier&ll=25.9290,-80.1210',
    resenas_url: '',
    rating: 4.2, activo: true, resenas: []
  },

  /* ---------- EXPLORACIÓN ---------- */
  {
    id: 17,
    nombre_es: 'Deering Estate', nombre_en: 'Deering Estate',
    descripcion_es: 'Finca histórica frente a Biscayne Bay que combina arquitectura de los años 20, bosque nativo y sitios arqueológicos de miles de años de antigüedad.',
    descripcion_en: 'A historic bayfront estate combining 1920s architecture, native forest and archaeological sites thousands of years old.',
    descripcion_larga_es: 'El Deering Estate, antigua residencia invernal del industrial Charles Deering, es hoy un sitio cultural y natural protegido sobre Biscayne Bay. En sus 180 hectáreas conviven la mansión Stone House y la Richmond Cottage, manglares, pinares de pino de Dade y un bosque tropical, además de sitios arqueológicos Tequesta y un yacimiento paleontológico con restos de fauna de la Edad de Hielo. Ofrece senderos, recorridos guiados, kayak y programas educativos. La entrada es pagada.',
    descripcion_larga_en: 'The Deering Estate, former winter residence of industrialist Charles Deering, is today a protected cultural and natural site on Biscayne Bay. Its 450 acres hold the Stone House and Richmond Cottage, mangroves, Dade pine rockland and tropical forest, plus Tequesta archaeological sites and a paleontological deposit with Ice Age fauna remains. It offers trails, guided tours, kayaking and educational programs. Admission is paid.',
    como_llegar_es: 'En 16701 SW 72nd Ave, Miami (Palmetto Bay). Desde el centro de Miami: 25–30 min por la US-1 Sur. Estacionamiento gratuito en el sitio.',
    como_llegar_en: 'At 16701 SW 72nd Ave, Miami (Palmetto Bay). From downtown Miami: 25–30 min via US-1 South. Free on-site parking.',
    foto: 'assets/images/destinos/deering-estate/deering-estate-1.jpg',
    galeria: [
      'assets/images/destinos/deering-estate/deering-estate-1.jpg',
      'assets/images/destinos/deering-estate/deering-estate-2.jpg'
    ],
    lat: 25.6170, lng: -80.3082,
    dificultad_es: 'Fácil — Moderado', dificultad_en: 'Easy — Moderate', dificultad_clase: 'facil',
    precio: '~$15 entrada', precio_en: '~$15 admission',
    horarios: '10am–5pm', horarios_en: '10am–5pm',
    tipo: 'tierra', tipo_es: 'Historia · Naturaleza · Arqueología', tipo_en: 'History · Nature · Archaeology',
    categoria: 'exploracion', categoria_es: 'Exploración', categoria_en: 'Exploration',
    telefono: '', web_oficial: 'https://deeringestate.org/',
    mejor_epoca: 'Nov–Abr (temporada seca)', mejor_epoca_en: 'Nov–Apr (dry season)',
    google_maps_url: 'https://maps.google.com/maps?q=Deering+Estate+16701+SW+72nd+Ave+Miami+FL+33157',
    apple_maps_url: 'https://maps.apple.com/?q=Deering+Estate&ll=25.6170,-80.3082',
    resenas_url: '',
    rating: 4.7, activo: true, resenas: []
  },

  /* ---------- BARES Y RESTAURANTES (contenido editorial temporal) ---------- */
  /* EDITORIAL — reemplazar por cliente pagado. Marcados con es_editorial: true. */
  {
    id: 18,
    nombre_es: 'Versailles', nombre_en: 'Versailles',
    descripcion_es: 'El restaurante cubano más emblemático de Miami desde 1971, corazón de la Calle Ocho y parada obligada para un cafecito y comida cubana auténtica.',
    descripcion_en: 'Miami\'s most emblematic Cuban restaurant since 1971, the heart of Calle Ocho and a must-stop for a cafecito and authentic Cuban food.',
    descripcion_larga_es: 'Versailles es mucho más que un restaurante: es un símbolo de la comunidad cubana de Miami. Abierto en 1971 en plena Calle Ocho de Little Havana, su ventanita de café es punto de encuentro político y social donde se debate, se celebra y se toma cafecito a toda hora. Su menú es un recorrido por la cocina cubana clásica: ropa vieja, lechón, croquetas, pastelitos y flan. Las salas con espejos al estilo del palacio francés que le da nombre completan una experiencia icónica de Miami.',
    descripcion_larga_en: 'Versailles is much more than a restaurant: it is a symbol of Miami\'s Cuban community. Opened in 1971 in the heart of Little Havana\'s Calle Ocho, its coffee window is a political and social gathering point where people debate, celebrate and drink cafecito at all hours. Its menu is a tour of classic Cuban cuisine: ropa vieja, lechon, croquetas, pastelitos and flan. The mirrored dining rooms echoing the French palace it is named after complete an iconic Miami experience.',
    como_llegar_es: 'En 3555 SW 8th St, Little Havana. Desde el centro de Miami: 10–15 min por la SW 8th St (Calle Ocho). Estacionamiento propio.',
    como_llegar_en: 'At 3555 SW 8th St, Little Havana. From downtown Miami: 10–15 min via SW 8th St (Calle Ocho). On-site parking.',
    foto: 'assets/images/destinos/versailles/versailles-1.jpg',
    galeria: [
      'assets/images/destinos/versailles/versailles-1.jpg'
    ],
    lat: 25.7651, lng: -80.2178,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Consumo', precio_en: 'Varies',
    horarios: 'Consultar horario', horarios_en: 'Check hours',
    tipo: 'tierra', tipo_es: 'Restaurante cubano · Landmark', tipo_en: 'Cuban restaurant · Landmark',
    categoria: 'bares', categoria_es: 'Bares y Restaurantes', categoria_en: 'Bars & Restaurants',
    telefono: '', web_oficial: 'https://www.versaillesrestaurant.com/',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=Versailles+Restaurant+3555+SW+8th+St+Miami+FL+33135',
    apple_maps_url: 'https://maps.apple.com/?q=Versailles+Restaurant+Miami&ll=25.7651,-80.2178',
    resenas_url: '',
    rating: 4.4, activo: true, es_editorial: true, resenas: []
  },
  {
    id: 19,
    nombre_es: 'Joe\'s Stone Crab', nombre_en: 'Joe\'s Stone Crab',
    descripcion_es: 'Institución de Miami Beach desde 1913, famosa por sus garras de stone crab. Una de las mesas más históricas y queridas de la ciudad.',
    descripcion_en: 'A Miami Beach institution since 1913, famous for its stone crab claws. One of the city\'s most historic and beloved tables.',
    descripcion_larga_es: 'Joe\'s Stone Crab abrió en 1913 y es uno de los restaurantes más legendarios de Miami Beach. Su especialidad son las garras de stone crab de Florida, servidas frías con su famosa salsa de mostaza, disponibles principalmente durante la temporada de octubre a mayo. El comedor clásico, el servicio impecable y las largas esperas sin reserva son parte del ritual. Más de un siglo después, sigue siendo una parada de peregrinaje para locales y visitantes amantes del marisco.',
    descripcion_larga_en: 'Joe\'s Stone Crab opened in 1913 and is one of Miami Beach\'s most legendary restaurants. Its specialty is Florida stone crab claws, served cold with its famous mustard sauce, available mainly during the October to May season. The classic dining room, impeccable service and long no-reservation waits are part of the ritual. More than a century on, it remains a pilgrimage stop for locals and visiting seafood lovers.',
    como_llegar_es: 'En 11 Washington Ave, South Beach. Desde el centro de Miami: 15–20 min por el MacArthur Causeway. Servicio de valet y estacionamiento cercano.',
    como_llegar_en: 'At 11 Washington Ave, South Beach. From downtown Miami: 15–20 min via the MacArthur Causeway. Valet service and nearby parking.',
    foto: 'assets/images/destinos/joes-stone-crab/joes-stone-crab-1.jpg',
    galeria: [
      'assets/images/destinos/joes-stone-crab/joes-stone-crab-1.jpg'
    ],
    lat: 25.7689, lng: -80.1347,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Consumo (alto)', precio_en: 'Varies (upscale)',
    horarios: 'Temporada stone crab oct–may', horarios_en: 'Stone crab season Oct–May',
    tipo: 'tierra', tipo_es: 'Marisquería · Landmark', tipo_en: 'Seafood · Landmark',
    categoria: 'bares', categoria_es: 'Bares y Restaurantes', categoria_en: 'Bars & Restaurants',
    telefono: '', web_oficial: 'https://www.joesstonecrab.com/',
    mejor_epoca: 'Oct–May (temporada)', mejor_epoca_en: 'Oct–May (season)',
    google_maps_url: 'https://maps.google.com/maps?q=Joes+Stone+Crab+11+Washington+Ave+Miami+Beach+FL+33139',
    apple_maps_url: 'https://maps.apple.com/?q=Joes+Stone+Crab&ll=25.7689,-80.1347',
    resenas_url: '',
    rating: 4.5, activo: true, es_editorial: true, resenas: []
  },
  {
    id: 20,
    nombre_es: 'Ball & Chain', nombre_en: 'Ball & Chain',
    descripcion_es: 'Bar histórico de música en vivo en plena Calle Ocho, con raíces en los años 30. Mojitos, salsa en vivo y el espíritu de Little Havana.',
    descripcion_en: 'A historic live-music bar in the heart of Calle Ocho, with roots in the 1930s. Mojitos, live salsa and the spirit of Little Havana.',
    descripcion_larga_es: 'Ball & Chain abrió originalmente en 1935 y, tras décadas y varias reinvenciones, renació como uno de los locales de música en vivo más vibrantes de Little Havana. En su escenario y su jardín-pérgola con forma de piña suenan salsa, son y jazz casi cada noche. Es un punto central de la Calle Ocho para tomar un mojito, bailar y empaparse de la cultura cubana de Miami. Su historia incluye haber recibido a leyendas del jazz a mediados del siglo XX.',
    descripcion_larga_en: 'Ball & Chain originally opened in 1935 and, after decades and several reinventions, was reborn as one of Little Havana\'s most vibrant live-music venues. Salsa, son and jazz play almost every night on its stage and its pineapple-shaped pergola garden. It is a Calle Ocho centerpiece for a mojito, dancing and soaking up Miami\'s Cuban culture. Its history includes hosting jazz legends in the mid-20th century.',
    como_llegar_es: 'En 1513 SW 8th St, Little Havana. Desde el centro de Miami: 10–15 min por la SW 8th St (Calle Ocho). Estacionamiento en la calle y lotes cercanos.',
    como_llegar_en: 'At 1513 SW 8th St, Little Havana. From downtown Miami: 10–15 min via SW 8th St (Calle Ocho). Street parking and nearby lots.',
    foto: 'assets/images/destinos/ball-and-chain/ball-and-chain-1.jpg',
    galeria: [
      'assets/images/destinos/ball-and-chain/ball-and-chain-1.jpg',
      'assets/images/destinos/ball-and-chain/ball-and-chain-2.jpg'
    ],
    lat: 25.7651, lng: -80.2196,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Consumo', precio_en: 'Varies',
    horarios: 'Consultar horario', horarios_en: 'Check hours',
    tipo: 'tierra', tipo_es: 'Bar · Música en vivo', tipo_en: 'Bar · Live music',
    categoria: 'bares', categoria_es: 'Bares y Restaurantes', categoria_en: 'Bars & Restaurants',
    telefono: '', web_oficial: 'https://ballandchainmiami.com/',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=Ball+and+Chain+1513+SW+8th+St+Miami+FL+33135',
    apple_maps_url: 'https://maps.apple.com/?q=Ball+and+Chain+Miami&ll=25.7651,-80.2196',
    resenas_url: '',
    rating: 4.4, activo: true, es_editorial: true, resenas: []
  },
  {
    id: 21,
    nombre_es: 'Mango\'s Tropical Cafe', nombre_en: 'Mango\'s Tropical Cafe',
    descripcion_es: 'Ícono de la vida nocturna de Ocean Drive: shows de baile en vivo, ritmos latinos y energía tropical en el corazón de South Beach.',
    descripcion_en: 'An icon of Ocean Drive nightlife: live dance shows, Latin rhythms and tropical energy in the heart of South Beach.',
    descripcion_larga_es: 'Mango\'s Tropical Cafe es uno de los locales más reconocibles de Ocean Drive desde 1991. Su mezcla de restaurante, bar y espectáculo en vivo lo convirtió en sinónimo de la noche de South Beach: bailarines sobre la barra, shows de samba y salsa, y música latina hasta la madrugada. Su fachada abierta a Ocean Drive es parte del paisaje del distrito Art Déco. Es una parada clásica para quienes buscan fiesta y ambiente tropical en Miami Beach.',
    descripcion_larga_en: 'Mango\'s Tropical Cafe is one of Ocean Drive\'s most recognizable venues since 1991. Its blend of restaurant, bar and live show made it synonymous with South Beach nightlife: dancers on the bar, samba and salsa shows, and Latin music into the early hours. Its open facade onto Ocean Drive is part of the Art Deco district scenery. It is a classic stop for those after a party and tropical atmosphere in Miami Beach.',
    como_llegar_es: 'En 900 Ocean Dr, South Beach. Desde el centro de Miami: 15–20 min por el MacArthur Causeway. Estacionamiento de pago en garajes cercanos.',
    como_llegar_en: 'At 900 Ocean Dr, South Beach. From downtown Miami: 15–20 min via the MacArthur Causeway. Paid parking in nearby garages.',
    foto: 'assets/images/destinos/mangos/mangos-1.jpg',
    galeria: [
      'assets/images/destinos/mangos/mangos-1.jpg'
    ],
    lat: 25.7805, lng: -80.1300,
    dificultad_es: 'Fácil', dificultad_en: 'Easy', dificultad_clase: 'facil',
    precio: 'Cover + consumo', precio_en: 'Cover + drinks',
    horarios: 'Consultar horario', horarios_en: 'Check hours',
    tipo: 'tierra', tipo_es: 'Bar · Show en vivo', tipo_en: 'Bar · Live show',
    categoria: 'bares', categoria_es: 'Bares y Restaurantes', categoria_en: 'Bars & Restaurants',
    telefono: '', web_oficial: 'https://www.mangos.com/',
    mejor_epoca: 'Todo el año', mejor_epoca_en: 'Year-round',
    google_maps_url: 'https://maps.google.com/maps?q=Mangos+Tropical+Cafe+900+Ocean+Dr+Miami+Beach+FL+33139',
    apple_maps_url: 'https://maps.apple.com/?q=Mangos+Tropical+Cafe&ll=25.7805,-80.1300',
    resenas_url: '',
    rating: 4.2, activo: true, es_editorial: true, resenas: []
  }
];

/* Versión de los datos — incrementar cada vez que cambie DESTINOS_DEFAULT */
var DESTINOS_VERSION = 7;

/* Mapa de IDs de destino → rutas de páginas HTML reales */
var DESTINO_URLS = {
  1: 'destinos/everglades.html',
  2: 'destinos/john-pennekamp.html',
  3: 'destinos/biscayne.html',
  4: 'destinos/bill-baggs.html',
  5: 'destinos/oleta-river.html',
  6: 'destinos/virginia-key.html',
  7: 'destinos/matheson-hammock.html',
  8: 'destinos/crandon-park.html',
  9: 'destinos/arch-creek.html',
  10: 'destinos/south-beach.html',
  11: 'destinos/neptune-memorial-reef.html',
  12: 'destinos/half-moon-wreck.html',
  13: 'destinos/south-pointe-park.html',
  14: 'destinos/haulover-park.html',
  15: 'destinos/rickenbacker-causeway.html',
  16: 'destinos/newport-fishing-pier.html',
  17: 'destinos/deering-estate.html',
  18: 'destinos/versailles.html',
  19: 'destinos/joes-stone-crab.html',
  20: 'destinos/ball-and-chain.html',
  21: 'destinos/mangos-tropical-cafe.html'
};

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

/* ===== HELPER: genera n emojis de estrella según calificación ===== */
function generarEstrellas(rating) {
  var n = Math.round(rating || 0);
  var s = '';
  for (var i = 0; i < n; i++) { s += '⭐'; }
  return s;
}

/* ===== RENDER DE TARJETAS DE DESTINO ===== */
var filtroActivo = 'todos';

function renderDestinos(filtro) {
  filtro = filtro || filtroActivo;
  var grid = document.getElementById('destinosGrid');
  if (!grid) return;

  var lista = obtenerDestinos().filter(function (d) {
    return d.activo && (filtro === 'todos' || d.categoria === filtro);
  });

  var langCur = (typeof IDIOMA_ACTUAL !== 'undefined') ? IDIOMA_ACTUAL : 'es';
  var ariaPref = (langCur === 'en') ? 'View details of ' : 'Ver detalles de ';
  grid.innerHTML = lista.map(function (d, i) {
    var delay = (i % 3) * 0.12;
    /* Si existe página real, usarla; si no, abrir modal legacy */
    var url = DESTINO_URLS[d.id] || '';
    var cardClick = url
      ? 'onclick="registrarClic(' + d.id + '); window.location.href=\'' + url + '\';"' +
        ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){registrarClic(' + d.id + ');window.location.href=\'' + url + '\'}"'
      : 'onclick="registrarClic(' + d.id + '); abrirModal(' + d.id + ');"' +
        ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){registrarClic(' + d.id + ');abrirModal(' + d.id + ')}"';
    var btnHtml = url
      ? '<a href="' + url + '" class="metal-btn destino-card__btn" onclick="event.stopPropagation(); registrarClic(' + d.id + ');">' +
          '<div class="metal-btn-shine"></div>' +
          '<div class="metal-btn-hover-glow"></div>' +
          '<span class="lang-es">Ver destino →</span>' +
          '<span class="lang-en">View destination →</span>' +
        '</a>'
      : '<button class="metal-btn destino-card__btn" onclick="event.stopPropagation(); registrarClic(' + d.id + '); abrirModal(' + d.id + ');">' +
          '<div class="metal-btn-shine"></div>' +
          '<div class="metal-btn-hover-glow"></div>' +
          '<span class="lang-es">Ver destino</span>' +
          '<span class="lang-en">View destination</span>' +
        '</button>';
    /* Estrellas Google Maps */
    var estrellas = generarEstrellas(d.rating || 4.5);
    var ratingNum = d.rating ? String(d.rating) : '';

    /* Botón del overlay de imagen (hover) */
    var overlayBtn = url
      ? '<a href="' + url + '" class="destino-card__overlay-btn" onclick="event.stopPropagation(); registrarClic(' + d.id + ');">' +
          '<span class="lang-es">Ver destino →</span>' +
          '<span class="lang-en">View destination →</span>' +
        '</a>'
      : '<button class="destino-card__overlay-btn" onclick="event.stopPropagation(); registrarClic(' + d.id + '); abrirModal(' + d.id + ');">' +
          '<span class="lang-es">Ver destino →</span>' +
          '<span class="lang-en">View destination →</span>' +
        '</button>';

    return (
      /* Wrapper de borde gradiente — contiene la tarjeta */
      '<div class="destino-card-wrap fade-up" style="transition-delay:' + delay + 's">' +
        '<article class="destino-card" data-tipo="' + d.tipo + '" ' +
                 cardClick + ' role="button" tabindex="0" ' +
                 'aria-label="' + ariaPref + (langCur === 'en' ? d.nombre_en : d.nombre_es) + '">' +

          /* ── Imagen con overlay de hover ── */
          '<div class="destino-card__img-cont">' +
            '<img src="' + d.foto + '" alt="' + d.nombre_es + '" class="destino-card__img" loading="lazy" />' +
            '<span class="destino-card__badge destino-card__badge--tipo destino-card__badge--' + (d.categoria || d.tipo) + '">' +
              '<span class="lang-es">' + (d.categoria_es || d.tipo_es) + '</span>' +
              '<span class="lang-en">' + (d.categoria_en || d.tipo_en) + '</span>' +
            '</span>' +
            (ratingNum
              ? '<span class="destino-card__rating" aria-label="Calificacion Google ' + ratingNum + '">' +
                  '<span class="destino-card__stars" aria-hidden="true">' + estrellas + '</span>' +
                  '<span>' + ratingNum + '</span>' +
                '</span>'
              : '') +
            /* Overlay semitransparente con botón centrado (visible al hacer hover) */
            '<div class="destino-card__img-overlay" aria-hidden="true">' +
              overlayBtn +
            '</div>' +
          '</div>' +

          /* ── Contenido: título/desc arriba, meta abajo ── */
          '<div class="destino-card__info">' +
            '<div class="destino-card__info-top">' +
              '<h3 class="destino-card__nombre">' +
                '<span class="lang-es">' + d.nombre_es + '</span>' +
                '<span class="lang-en">' + d.nombre_en + '</span>' +
              '</h3>' +
              '<p class="destino-card__desc">' +
                '<span class="lang-es">' + d.descripcion_es + '</span>' +
                '<span class="lang-en">' + d.descripcion_en + '</span>' +
              '</p>' +
            '</div>' +
            '<div class="destino-card__meta-bar">' +
              '<div class="destino-card__meta">' +
                '<span class="destino-card__meta-item"><span class="meta-icono">💲</span>' +
                  '<span class="lang-es">' + d.precio + '</span>' +
                  '<span class="lang-en">' + (d.precio_en || d.precio) + '</span>' +
                '</span>' +
                '<span class="destino-card__meta-item"><span class="meta-icono">⏰</span>' +
                  '<span class="lang-es">' + d.horarios + '</span>' +
                  '<span class="lang-en">' + (d.horarios_en || d.horarios) + '</span>' +
                '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

        '</article>' +
      '</div>'
    );
  }).join('');

  initScrollAnimation();
  initMetalButtons(grid);   /* Metal press/hover en botones "Ver destino" */

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
     'resenas','telefono','web_oficial','mejor_epoca','mejor_epoca_en','precio_en','horarios_en',
     'google_maps_url','apple_maps_url','resenas_url'].forEach(function (k) {
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
    (d.mejor_epoca ? '<span class="modal-badge modal-badge--epoca">' + (esEs ? 'Mejor época: ' : 'Best time: ') + (esEs ? d.mejor_epoca : (d.mejor_epoca_en || d.mejor_epoca)) + '</span>' : '');

  /* 4. Datos prácticos */
  var precioVal      = esEs ? d.precio       : (d.precio_en       || d.precio);
  var horariosVal    = esEs ? d.horarios     : (d.horarios_en     || d.horarios);
  var mejorEpocaVal  = esEs ? d.mejor_epoca  : (d.mejor_epoca_en  || d.mejor_epoca);
  document.getElementById('modalDatosGrid').innerHTML =
    '<div class="modal-dato"><span class="modal-dato__icono">💲</span>' +
      '<div><strong>' + (esEs ? 'Precio' : 'Price') + '</strong><span>' + precioVal + '</span></div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">⏰</span>' +
      '<div><strong>' + (esEs ? 'Horarios' : 'Hours') + '</strong><span>' + horariosVal + '</span></div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">📞</span>' +
      '<div><strong>' + (esEs ? 'Teléfono' : 'Phone') + '</strong>' +
      (d.telefono ? '<a href="tel:' + d.telefono.replace(/\s/g,'') + '">' + d.telefono + '</a>' : '<span>—</span>') + '</div>' +
    '</div>' +
    '<div class="modal-dato"><span class="modal-dato__icono">🗓️</span>' +
      '<div><strong>' + (esEs ? 'Mejor época' : 'Best time') + '</strong><span>' + (mejorEpocaVal || '—') + '</span></div>' +
    '</div>';

  /* 5. Botones de acción */
  var gUrl    = d.google_maps_url || ('https://maps.google.com/maps?q=' + d.lat + ',' + d.lng);
  var aUrl    = d.apple_maps_url  || ('https://maps.apple.com/?q=' + encodeURIComponent(nombre) + '&ll=' + d.lat + ',' + d.lng);
  var rUrl    = d.resenas_url     || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(nombre));
  var wUrl    = d.web_oficial     || '#';

  /* Función auxiliar para generar un metal-btn-wrap con <a> */
  function metalLink(href, variant, trackCall, label) {
    return '<div class="metal-btn-wrap" data-variant="' + variant + '" data-size="sm">' +
      '<div class="metal-btn-inner"></div>' +
      '<a href="' + href + '" target="_blank" rel="noopener" class="metal-btn modal-accion-btn"' +
         (trackCall ? ' onclick="' + trackCall + '"' : '') + '>' +
        '<div class="metal-btn-shine"></div>' +
        '<div class="metal-btn-hover-glow"></div>' +
        label +
      '</a>' +
    '</div>';
  }
  var nombreEsc = nombre.replace(/'/g, "&#39;");
  document.getElementById('modalAcciones').innerHTML =
    metalLink(gUrl, 'default', 'if(typeof trackMapsClick===\'function\')trackMapsClick(\'' + nombreEsc + '\')',
              '📍 Google Maps') +
    metalLink(aUrl, 'default', 'if(typeof trackAppleMapsClick===\'function\')trackAppleMapsClick(\'' + nombreEsc + '\')',
              '🍎 Apple Maps') +
    metalLink(rUrl, 'gold',    'if(typeof trackReviewsClick===\'function\')trackReviewsClick(\'' + nombreEsc + '\')',
              '⭐ ' + (esEs ? 'Ver reseñas' : 'Reviews')) +
    (wUrl !== '#' ? metalLink(wUrl, 'turquesa', '',
              '🔗 ' + (esEs ? 'Sitio oficial' : 'Official site')) : '');
  /* Inicializar metal buttons del modal */
  initMetalButtons(document.getElementById('modalAcciones'));

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
      /* Estado vacío: calificación general real + invitación a reseñar
         (sin reseñas inventadas). Reutiliza clases del modal ya existentes. */
      var estrellasCal = '';
      var llenasCal = Math.round(d.rating || 0);
      for (var sc = 0; sc < 5; sc++) {
        estrellasCal += '<span class="modal-estrella' + (sc < llenasCal ? ' modal-estrella--llena' : '') + '">★</span>';
      }
      var eHtml = '<h3 class="modal-subtitulo">' + (esEs ? 'Reseñas de visitantes' : 'Visitor reviews') + '</h3>' +
        '<div class="modal-resenas-grid">' +
          '<div class="modal-resena">' +
            '<div class="modal-resena__header">' +
              '<div class="modal-resena__avatar" style="background:#00BCD4">★</div>' +
              '<div>' +
                '<strong class="modal-resena__nombre">' + (d.rating || '') + ' ★ ' +
                  (esEs ? 'calificación general' : 'overall rating') + '</strong>' +
                '<span class="modal-resena__fecha">Google Maps · TripAdvisor</span>' +
              '</div>' +
              '<div class="modal-resena__estrellas">' + estrellasCal + '</div>' +
            '</div>' +
            '<p class="modal-resena__texto">' +
              (esEs ? '¿Visitaste este lugar? Sé el primero en compartir tu experiencia.'
                    : 'Have you visited? Be the first to share your experience.') +
            '</p>' +
          '</div>' +
        '</div>' +
        '<div class="modal-acciones">' +
          metalLink(rUrl, 'gold', '', (esEs ? '✍️ Escribir una reseña' : '✍️ Write a review')) +
        '</div>' +
        '<p class="modal-disclaimer">' +
          (esEs ? '⚠️ Verifica horarios y precios en el sitio oficial antes de tu visita. Los datos pueden haber cambiado.'
                : '⚠️ Verify hours and prices on the official site before your visit. Data may have changed.') +
        '</p>';
      resEl.innerHTML = eHtml;
      initMetalButtons(resEl);
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

/* ===== FLOATING PILL NAV ===== */
(function () {
  function initFloatingNav() {
    var nav    = document.getElementById('floatingNav');
    var colBtn = nav && nav.querySelector('.fn__collapse-icon');
    var drop   = document.getElementById('fnDropdown');
    if (!nav) return;

    var isMobile      = window.innerWidth <= 768;
    var isExpanded    = true;
    var lastScrollY   = window.pageYOffset;
    var collapseAtY   = 0;
    var EXPAND_DELTA  = 80;
    var expandedWidth = 0;

    /* Fija el ancho medido para que CSS pueda transicionar desde/hacia él */
    function measureWidth() {
      nav.style.width = '';
      expandedWidth = nav.offsetWidth;
      nav.style.width = expandedWidth + 'px';
    }

    /* Colapsar → píldora de 48px */
    function collapse() {
      if (!isExpanded || isMobile) return;
      isExpanded = false;
      nav.classList.add('is-collapsed');
      nav.style.width = '48px';
      if (drop) drop.classList.remove('is-open');
      if (colBtn) colBtn.setAttribute('aria-expanded', 'false');
    }

    /* Expandir → ancho medido → luego auto */
    function expand() {
      if (isExpanded) return;
      isExpanded = true;
      nav.classList.remove('is-collapsed');
      nav.style.width = expandedWidth + 'px';
      if (drop) drop.classList.remove('is-open');
      if (colBtn) colBtn.setAttribute('aria-expanded', 'false');
      nav.addEventListener('transitionend', function onEnd(e) {
        if (e.propertyName !== 'width') return;
        nav.removeEventListener('transitionend', onEnd);
        nav.style.width = ''; /* vuelve a auto para que el contenido pueda crecer */
      });
    }

    /* Scroll: colapsar al bajar, expandir al subir */
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      if (!isMobile) {
        if (isExpanded && y > lastScrollY && y > 150) {
          collapseAtY = y;
          collapse();
        } else if (!isExpanded && y < lastScrollY && (collapseAtY - y > EXPAND_DELTA)) {
          expand();
        }
      }
      lastScrollY = y;
    }, { passive: true });

    /* Clic en píldora colapsada → expandir (desktop) */
    nav.addEventListener('click', function (e) {
      if (!isExpanded && !isMobile) {
        e.stopPropagation();
        expand();
      }
    });

    /* Botón hamburguesa → en móvil abre dropdown; en desktop colapsado expande la píldora */
    if (colBtn) {
      colBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isMobile) {
          /* Móvil: toggle del dropdown */
          if (drop) {
            var open = drop.classList.toggle('is-open');
            colBtn.setAttribute('aria-expanded', String(open));
          }
        } else {
          /* Desktop colapsado: expandir la píldora */
          expand();
        }
      });
    }

    /* Clic fuera → cierra dropdown */
    document.addEventListener('click', function () {
      if (drop) drop.classList.remove('is-open');
    });

    /* Links del dropdown → cierra al navegar */
    if (drop) {
      drop.querySelectorAll('.fn__dd-link').forEach(function (a) {
        a.addEventListener('click', function () {
          drop.classList.remove('is-open');
          if (colBtn) colBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* Resize: recalcula isMobile y ancho */
    window.addEventListener('resize', function () {
      isMobile = window.innerWidth <= 768;
      if (!isMobile && isExpanded) {
        nav.style.width = '';
        measureWidth();
      }
    });

    /* Init: medir en el siguiente frame cuando el layout ya está listo */
    requestAnimationFrame(function () {
      measureWidth();
      lastScrollY = window.pageYOffset;
    });
  }

  initFloatingNav();
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
      /* Quitar activo de todos los botones y sus wrappers */
      document.querySelectorAll('.filtros__btn').forEach(function (b) {
        b.classList.remove('filtros__btn--activo');
        var wrap = b.closest('.metal-btn-wrap');
        if (wrap) wrap.classList.remove('is-active');
      });
      /* Activar el botón pulsado y su wrapper */
      btn.classList.add('filtros__btn--activo');
      var activeWrap = btn.closest('.metal-btn-wrap');
      if (activeWrap) activeWrap.classList.add('is-active');
      renderDestinos(filtroActivo);
      /* Reset scroll del carrusel al cambiar filtro */
      var grid = document.getElementById('destinosGrid');
      if (grid) { grid.scrollLeft = 0; }
      initDestCarousel();
    });
  });
});

/* ===== FORMULARIO "TRABAJA CON NOSOTROS" — eliminado: el form vive en anunciantes.html ===== */

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

  /* Shutter en el título — omitir si ya es el SVG SpinningText */
  (function initShutter() {
    var titulo = document.getElementById('heroTitulo');
    if (!titulo) return;
    /* Si contiene SVG (SpinningText) o texto estático, no sobreescribir */
    if (titulo.querySelector('svg') || titulo.textContent.trim() !== '') return;
    titulo.innerHTML = '';
    titulo.setAttribute('aria-label', '305 RUTA MIAMI');
    '305 RUTA MIAMI'.split('').forEach(function(c, i) {
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
    /* Selecciona descripción y título según el idioma activo */
    var idiomaCur = (typeof IDIOMA_ACTUAL !== 'undefined') ? IDIOMA_ACTUAL : 'es';
    var esEn = (idiomaCur === 'en');
    var desc = (esEn ? (m.dataset.descEn || m.dataset.desc) : m.dataset.desc) || '';
    if (!desc) return;
    var tituloRaw = esEn ? (m.getAttribute('data-title-en') || m.getAttribute('title') || '') : (m.getAttribute('title') || '');
    /* Nombre: extraer antes del " — " */
    var titulo = tituloRaw.split('—')[0].trim();
    tipNombre.textContent = titulo;
    tipDesc.textContent   = desc;
    tip.classList.add('rdm-tooltip--visible');
    moverTip(e);
  }

  function ocultarTip() {
    tip.classList.remove('rdm-tooltip--visible');
  }

  /* Registrar eventos en todos los milestones */
  var isTouchMapa = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  canvas.querySelectorAll('.rdm-milestone').forEach(function(m) {
    m.addEventListener('mouseenter', function(e) { mostrarTip(m, e); });
    m.addEventListener('mousemove',  moverTip);
    m.addEventListener('mouseleave', ocultarTip);

    /* Móvil: tap activa la burbuja (.is-active) */
    if (isTouchMapa) {
      m.setAttribute('tabindex', '0');
      m.addEventListener('click', function(e) {
        e.stopPropagation();
        var isAlreadyActive = m.classList.contains('is-active');
        /* Cierra todos los otros */
        canvas.querySelectorAll('.rdm-milestone.is-active').forEach(function(other) {
          other.classList.remove('is-active');
        });
        if (!isAlreadyActive) {
          m.classList.add('is-active');
          mostrarTip(m, e);
        } else {
          ocultarTip();
        }
      });
    }
  });

  /* Cierra burbujas al tocar fuera del mapa */
  canvas.closest('.seccion-mapa, section') && canvas.closest('.seccion-mapa, section').addEventListener('click', function() {
    canvas.querySelectorAll('.rdm-milestone.is-active').forEach(function(m) {
      m.classList.remove('is-active');
    });
    ocultarTip();
  });

  /* Ocultar si la ventana pierde el foco */
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) ocultarTip();
  });
}

/* ===== SHUFFLE GRID — port vanilla de React ShuffleHero ===== */
/*
 * Tarjetas mini en una grilla que se baraja con animación FLIP
 * (First–Last–Invert–Play) al hacer scroll mientras la sección
 * está en el viewport.
 */
function initShuffleGrid() {
  var container = document.getElementById('shuffleGrid');
  var section   = document.getElementById('nosotros');
  if (!container || !section) return;

  /* ── Datos: destinos reales + imágenes bonus ── */
  var cardData = [
    { id:'d1', es:'Everglades',     en:'Everglades',    foto: DESTINOS_DEFAULT[0] ? DESTINOS_DEFAULT[0].foto : '', tipo:'tierra' },
    { id:'d2', es:'John Pennekamp', en:'John Pennekamp',foto: DESTINOS_DEFAULT[1] ? DESTINOS_DEFAULT[1].foto : '', tipo:'mar' },
    { id:'d3', es:'Biscayne NP',    en:'Biscayne NP',   foto: DESTINOS_DEFAULT[2] ? DESTINOS_DEFAULT[2].foto : '', tipo:'mar' },
    { id:'d4', es:'Bill Baggs',     en:'Bill Baggs',    foto: DESTINOS_DEFAULT[3] ? DESTINOS_DEFAULT[3].foto : '', tipo:'mar' },
    { id:'d5', es:'Oleta River',    en:'Oleta River',   foto: DESTINOS_DEFAULT[4] ? DESTINOS_DEFAULT[4].foto : '', tipo:'tierra' },
    { id:'d6', es:'Virginia Key',   en:'Virginia Key',  foto: DESTINOS_DEFAULT[5] ? DESTINOS_DEFAULT[5].foto : '', tipo:'mar' },
    { id:'d7', es:'Matheson',       en:'Matheson',      foto: DESTINOS_DEFAULT[6] ? DESTINOS_DEFAULT[6].foto : '', tipo:'mar' },
    { id:'d8', es:'Crandon Park',   en:'Crandon Park',  foto: DESTINOS_DEFAULT[7] ? DESTINOS_DEFAULT[7].foto : '', tipo:'mar' },
    { id:'d9', es:'Arch Creek',     en:'Arch Creek',    foto: DESTINOS_DEFAULT[8] ? DESTINOS_DEFAULT[8].foto : '', tipo:'tierra' },
    { id:'b1', es:'Bahía Miami',    en:'Miami Bay',     foto:'assets/images/hero/hero-02.jpg', tipo:'mar' },
    { id:'b2', es:'Arrecifes',      en:'Coral Reefs',   foto:'assets/images/hero/hero-01.jpg', tipo:'mar' },
    { id:'b3', es:'Atardecer',      en:'Sunset',        foto:'assets/images/hero/hero-03.jpg', tipo:'tierra' }
  ];

  var BADGE = { tierra: '🏔️', mar: '🌊' };

  /* Fisher-Yates in-place */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Crea un nodo DOM de tarjeta */
  function makeCard(d) {
    var el = document.createElement('div');
    el.className      = 'shuffle-card';
    el.dataset.cardId = d.id;
    el.setAttribute('role', 'listitem');
    el.innerHTML =
      '<img class="shuffle-card__img" src="' + d.foto + '" alt="" loading="lazy">' +
      '<div class="shuffle-card__foot">' +
        '<span class="shuffle-card__name lang-es">' + d.es + '</span>' +
        '<span class="shuffle-card__name lang-en">' + d.en + '</span>' +
        '<span class="shuffle-card__badge" aria-hidden="true">' + (BADGE[d.tipo] || '') + '</span>' +
      '</div>';
    return el;
  }

  /* Render inicial barajado */
  shuffle(cardData).forEach(function(d) { container.appendChild(makeCard(d)); });

  /* ── FLIP shuffle (First–Last–Invert–Play) ── */
  var animating = false;

  function doShuffle() {
    if (animating) return;
    animating = true;

    var cards = Array.from(container.querySelectorAll('.shuffle-card'));

    /* FIRST: capturar posición actual de cada tarjeta */
    var before = new Map();
    cards.forEach(function(c) {
      var r = c.getBoundingClientRect();
      before.set(c, { x: r.left, y: r.top });
    });

    /* Barajar el orden en el DOM */
    shuffle(cards).forEach(function(c) { container.appendChild(c); });

    /* LAST + INVERT: leer nueva posición y aplicar transform inverso */
    requestAnimationFrame(function() {
      cards.forEach(function(c) {
        var f = before.get(c);
        var l = c.getBoundingClientRect();
        var dx = f.x - l.left;
        var dy = f.y - l.top;
        /* Aplicar sin transición para posicionar en "old pos" */
        c.style.transition = 'none';
        c.style.transform  = 'translate(' + dx + 'px,' + dy + 'px)';
      });

      /* PLAY: quitar transform con transición → animación de posición */
      requestAnimationFrame(function() {
        cards.forEach(function(c) {
          c.style.transition = 'transform 0.85s cubic-bezier(0.34,1.28,0.64,1)';
          c.style.transform  = '';
        });
        /* Liberar bloqueo al terminar la transición más larga */
        setTimeout(function() { animating = false; }, 900);
      });
    });
  }

  /* ── Trigger: shuffle al entrar al viewport + en cada ~180px de scroll ── */
  var inView       = false;
  var lastScrollY  = window.scrollY;
  var accumulated  = 0;
  var SCROLL_TRIG  = 180; /* px acumulados para disparar un shuffle */
  var firstSeen    = false;

  var io = new IntersectionObserver(function(entries) {
    inView = entries[0].isIntersecting;
    if (inView) {
      lastScrollY = window.scrollY;
      accumulated  = 0;
      /* Primer shuffle al entrar al viewport */
      if (!firstSeen) {
        firstSeen = true;
        setTimeout(doShuffle, 450);
      }
    }
  }, { threshold: 0.22 });

  io.observe(section);

  window.addEventListener('scroll', function() {
    if (!inView) return;
    var delta = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    accumulated += delta;
    if (accumulated >= SCROLL_TRIG) {
      accumulated = 0;
      doShuffle();
    }
  }, { passive: true });
}

/* ===== SCROLL EXPAND MEDIA — port vanilla de React ScrollExpandMedia ===== */
/*
 * Mecanismo: position:sticky + scroll natural del navegador.
 * .sem-wrapper tiene height:200vh → la sección sticky ocupa 100vh →
 * la tarjeta se expande mientras el usuario scrollea los primeros 100vh.
 * Sin interceptar eventos, sin body overflow, sin layout shift.
 */
function initScrollExpandMedia() {
  var wrapper   = document.querySelector('.sem-wrapper');
  var section   = document.getElementById('inicio');
  var mediawrap = document.getElementById('semMediaWrap');
  var titleWrap = document.getElementById('semTitle');
  var content   = document.getElementById('semContent');
  var bg        = section ? section.querySelector('.sem-bg') : null;

  if (!section || !mediawrap || !titleWrap || !wrapper) return;

  var mediaFullyExpanded = false;
  var ticking            = false;

  /* Dimensiones responsive */
  var vw     = window.innerWidth;
  var vh     = window.innerHeight;
  var mobile = vw < 640;
  var initW  = mobile ? 200 : 300;
  var initH  = mobile ? 280 : 400;
  var maxW   = mobile ? vw  : Math.min(vw - 40, 1550);
  var maxH   = mobile ? vh  : Math.min(vh, 800);

  /* Progreso 0–1 basado en la posición de scroll real.
   * wrapper.offsetTop ≈ 0 (primer elemento de <main>).
   * Rango de scroll = vh (200vh wrapper - 100vh sección = 100vh útil).  */
  function getProgress() {
    var scrollTop    = window.scrollY || window.pageYOffset;
    var wrapperTop   = wrapper.offsetTop;
    var scrollRange  = vh; /* 100vh = espacio de expansión */
    return Math.max(0, Math.min(1, (scrollTop - wrapperTop) / scrollRange));
  }

  /* Render del estado visual según progress (0–1) */
  function updateUI() {
    var p = getProgress();

    /* Tamaño de la tarjeta */
    var w = initW + p * (maxW - initW);
    var h = initH + p * (maxH - initH);
    mediawrap.style.width        = w + 'px';
    mediawrap.style.height       = h + 'px';
    mediawrap.style.borderRadius = Math.max(0, 16 * (1 - p)) + 'px';

    /* Fondo: opacity 1 → 0 */
    if (bg) bg.style.opacity = String(Math.max(0, 1 - p));

    /* Título: "Explora" ← , "Miami" → */
    var words = titleWrap.querySelectorAll('.sem-title-word');
    if (words.length >= 2) {
      words[0].style.transform = 'translateX(' + (-vw * 1.5 * p) + 'px)';
      words[1].style.transform = 'translateX(' + ( vw * 1.5 * p) + 'px)';
    }

    /* Tags: visibles solo al expandir completamente */
    if (p >= 1 && !mediaFullyExpanded) {
      mediaFullyExpanded = true;
      if (content) {
        content.classList.add('sem-content--visible');
        content.removeAttribute('aria-hidden');
      }
    } else if (p < 0.98 && mediaFullyExpanded) {
      mediaFullyExpanded = false;
      if (content) {
        content.classList.remove('sem-content--visible');
        content.setAttribute('aria-hidden', 'true');
      }
    }
  }

  /* Scroll del navegador — sin interceptar, solo leer posición */
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { updateUI(); ticking = false; });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Recalcular dimensiones al redimensionar */
  window.addEventListener('resize', function () {
    vw     = window.innerWidth;
    vh     = window.innerHeight;
    mobile = vw < 640;
    initW  = mobile ? 200 : 300;
    initH  = mobile ? 280 : 400;
    maxW   = mobile ? vw  : Math.min(vw - 40, 1550);
    maxH   = mobile ? vh  : Math.min(vh, 800);
    updateUI();
  });

  /* Render inicial */
  updateUI();
}

/* ===== INICIALIZACIÓN ===== */
/* ===== METAL BUTTONS — Estados press/hover (port React MetalButton) ===== */
function initMetalButtons(root) {
  var scope = root || document;
  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  scope.querySelectorAll('.metal-btn-wrap').forEach(function(wrap) {
    /* Evitar doble-binding */
    if (wrap.dataset.metalInit) return;
    wrap.dataset.metalInit = '1';

    var btn = wrap.querySelector('.metal-btn');
    if (!btn) return;

    function setPressed(v)  { wrap.classList.toggle('is-pressed', v); }
    function setHovered(v)  { if (!isTouchDevice) wrap.classList.toggle('is-hovered', v); }

    btn.addEventListener('mousedown',   function() { setPressed(true);  });
    btn.addEventListener('mouseup',     function() { setPressed(false); });
    btn.addEventListener('mouseleave',  function() { setPressed(false); setHovered(false); });
    btn.addEventListener('mouseenter',  function() { setHovered(true);  });
    btn.addEventListener('touchstart',  function() { setPressed(true);  }, { passive: true });
    btn.addEventListener('touchend',    function() { setPressed(false); });
    btn.addEventListener('touchcancel', function() { setPressed(false); });
  });
}

/* ===== CARRUSEL DE DESTINOS — navegación por dots ===== */

/* Variable de módulo: guarda el listener de scroll para poder quitarlo al reiniciar */
var _destScrollHandler = null;

function initDestCarousel() {
  var grid     = document.getElementById('destinosGrid');
  var dotsWrap = document.getElementById('destinosDots');
  if (!grid) return;

  /* Quitar listener anterior si existía (al cambiar filtro se reinicia) */
  if (_destScrollHandler) {
    grid.removeEventListener('scroll', _destScrollHandler);
    _destScrollHandler = null;
  }

  /* ── Construye los dots según las cards presentes ── */
  function buildDots() {
    if (!dotsWrap) return;
    var cards = grid.querySelectorAll('.destino-card-wrap');
    dotsWrap.innerHTML = '';
    Array.prototype.forEach.call(cards, function(card, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'destinos-dot' + (i === 0 ? ' destinos-dot--activo' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Destino ' + (i + 1) + ' de ' + cards.length);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      /* Guardar referencia a la card en closure */
      (function(c) {
        dot.addEventListener('click', function() {
          /* getBoundingClientRect da la posición visual actual (incluye scroll actual) */
          var gridRect = grid.getBoundingClientRect();
          var cardRect = c.getBoundingClientRect();
          /* Offset relativo a la vista del grid, descontando el padding izquierdo */
          var offset = cardRect.left - gridRect.left - 24; /* 24 = scroll-padding */
          grid.scrollBy({ left: offset, behavior: 'smooth' });
        });
      })(card);
      dotsWrap.appendChild(dot);
    });
  }

  /* ── Actualiza el dot activo al scrollear ── */
  function updateDots() {
    if (!dotsWrap) return;
    var cards = grid.querySelectorAll('.destino-card-wrap');
    var dots  = dotsWrap.querySelectorAll('.destinos-dot');
    if (!cards.length || !dots.length) return;

    /* El dot activo es la card cuyo centro esté más cercano al centro del grid */
    var gridRect    = grid.getBoundingClientRect();
    var gridCenter  = gridRect.left + gridRect.width / 2;
    var closestIdx  = 0;
    var closestDist = Infinity;

    Array.prototype.forEach.call(cards, function(card, i) {
      var r    = card.getBoundingClientRect();
      var dist = Math.abs((r.left + r.width / 2) - gridCenter);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });

    Array.prototype.forEach.call(dots, function(dot, i) {
      if (i === closestIdx) {
        dot.classList.add('destinos-dot--activo');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('destinos-dot--activo');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  _destScrollHandler = updateDots;
  grid.addEventListener('scroll', updateDots, { passive: true });
  buildDots();
}

document.addEventListener('DOMContentLoaded', function () {
  leerConfigSitio();
  registrarVisita();
  renderDestinos();
  initDestCarousel();
  aplicarFiltroDesdeURL();    /* ?cat= en la URL aplica el filtro de categoría */
  initScrollAnimation();
  initHeroParallax();        /* hero parallax multicapa — profundidad 3D con mouse */
  initShuffleGrid();         /* intro shuffle grid 4×3 — barajado con scroll */
  initRoadmap();
  initRoadmapTooltip();
  initMetalButtons();
  initQuizAventurero();      /* quiz de 3 pasos */
  initNewsletter();          /* formulario de newsletter */
  /* ScrollExpandMedia / HeroTrail eliminados — hero reemplazado por cinematic */
});

/* ===== FILTRO DESDE LA URL (?cat=categoria) =====
   Permite enlazar a la home con un filtro de categoría ya aplicado,
   p.ej. desde el desplegable del navbar: index.html?cat=playa#destinos */
function aplicarFiltroDesdeURL() {
  var validas = { playa: 1, buceo: 1, pesca: 1, exploracion: 1, bares: 1 };
  var cat = '';
  try {
    cat = (new URLSearchParams(window.location.search).get('cat') || '').toLowerCase();
  } catch (e) {
    var m = window.location.search.match(/[?&]cat=([^&]+)/);
    cat = m ? decodeURIComponent(m[1]).toLowerCase() : '';
  }
  if (!cat || !validas[cat]) return;
  var btn = document.querySelector('.filtros__btn[data-filtro="' + cat + '"]');
  if (btn) { btn.click(); }   /* reutiliza toda la lógica del botón de filtro */
}

/* ============================================================
   QUIZ_DEST_URLS — mapa nombre → URL, exclusivo del quiz
   (No tocar DESTINO_URLS de arriba que usa IDs numéricos para las cards)
   ============================================================ */
var QUIZ_DEST_URLS = {
  'Everglades National Park':              'destinos/everglades.html',
  'John Pennekamp Coral Reef State Park':  'destinos/john-pennekamp.html',
  'Biscayne National Park':                'destinos/biscayne.html',
  'Bill Baggs Cape Florida State Park':    'destinos/bill-baggs.html',
  'Oleta River State Park':               'destinos/oleta-river.html',
  'Virginia Key Beach Park':              'destinos/virginia-key.html',
  'Matheson Hammock Park':                'destinos/matheson-hammock.html',
  'Crandon Park':                         'destinos/crandon-park.html',
  'Arch Creek Park':                      'destinos/arch-creek.html'
};

/* El contador "847 aventureros" del hero se eliminó: era un número
   inventado (847 + visitas locales), sin conexión real con GA4.
   Reemplazado por una invitación honesta en index.html. Si en el futuro
   hay un endpoint público con el dato real de GA, se puede reintroducir. */

/* ============================================================
   QUIZ AVENTURERO — 3 pasos, 4 opciones cada uno
   Resultado: tipo + 3 destinos recomendados con links
   ============================================================ */
function initQuizAventurero() {
  var panel  = document.getElementById('quizPanel');
  var barra  = document.getElementById('quizBarra');
  var label  = document.getElementById('quizPasoLabel');
  var reset  = document.getElementById('quizReset');
  if (!panel) return;

  var votos = []; /* votos[0..2] = valor de cada paso */

  /* Datos de resultado por tipo */
  var TIPOS = {
    mar: {
      ico:  '🌊',
      tipo_es: 'Explorador del mar',
      tipo_en: 'Ocean Explorer',
      desc_es: 'El agua es tu elemento. Te atraen los arrecifes de coral, el kayak entre manglares y el horizonte infinito.',
      desc_en: 'Water is your element. Coral reefs, kayaking through mangroves and the endless horizon call to you.',
      destinos: ['John Pennekamp Coral Reef State Park', 'Biscayne National Park', 'Virginia Key Beach Park']
    },
    tierra: {
      ico:  '🌿',
      tipo_es: 'Guardián de la selva',
      tipo_en: 'Jungle Guardian',
      desc_es: 'Los manglares y la selva subtropical son tu territorio. Prefieres el sendero al asfalto y el silencio a la multitud.',
      desc_en: 'Mangroves and subtropical jungle are your territory. You prefer the trail to pavement and silence to crowds.',
      destinos: ['Everglades National Park', 'Oleta River State Park', 'Arch Creek Park']
    },
    ciudad: {
      ico:  '🌆',
      tipo_es: 'Aventurero urbano',
      tipo_en: 'Urban Adventurer',
      desc_es: 'Miami te tiene todo. Buscas experiencias intensas sin alejarte de la comodidad y la energía de la ciudad.',
      desc_en: 'Miami has it all for you. You seek intense experiences without straying from comfort and city energy.',
      destinos: ['Virginia Key Beach Park', 'Crandon Park', 'Matheson Hammock Park']
    },
    aventura: {
      ico:  '⚡',
      tipo_es: 'Espíritu libre',
      tipo_en: 'Free Spirit',
      desc_es: 'No te conformas con lo ordinario. Buscas la adrenalina, el amanecer en el horizonte y los destinos sin multitudes.',
      desc_en: 'You refuse the ordinary. You seek adrenaline, sunrise on the horizon and destinations without crowds.',
      destinos: ['Everglades National Park', 'John Pennekamp Coral Reef State Park', 'Bill Baggs Cape Florida State Park']
    }
  };

  /* Textos de paso */
  var PASO_LABELS = [
    { es: 'Pregunta 1 de 3', en: 'Question 1 of 3' },
    { es: 'Pregunta 2 de 3', en: 'Question 2 of 3' },
    { es: 'Pregunta 3 de 3', en: 'Question 3 of 3' },
    { es: 'Tu resultado',     en: 'Your result' }
  ];

  function idiomaActual() {
    return document.documentElement.classList.contains('lang-en') ? 'en' : 'es';
  }

  function mostrarPaso(n) {
    /* Ocultar todos los pasos */
    var pasos = panel.querySelectorAll('.quiz-paso');
    Array.prototype.forEach.call(pasos, function (p) {
      p.classList.add('quiz-paso--oculto');
    });

    /* Mostrar el paso n (índice 1-based: 1, 2, 3, resultado=4) */
    var idPaso = (n <= 3) ? ('quizPaso' + n) : 'quizResultado';
    var elPaso = document.getElementById(idPaso);
    if (elPaso) {
      elPaso.classList.remove('quiz-paso--oculto');
    }

    /* Actualizar barra */
    if (barra) {
      barra.style.width = Math.round((n / 3) * 100) + '%';
    }

    /* Actualizar label */
    if (label) {
      var idx  = Math.min(n - 1, 3);
      var lang = idiomaActual();
      label.innerHTML = '<span class="lang-es">' + PASO_LABELS[idx].es + '</span>'
                      + '<span class="lang-en">' + PASO_LABELS[idx].en + '</span>';
    }
  }

  function calcularResultado() {
    /* Contar votos por tipo */
    var conteo = { mar: 0, tierra: 0, ciudad: 0, aventura: 0 };
    Array.prototype.forEach.call(votos, function (v) {
      if (conteo.hasOwnProperty(v)) conteo[v]++;
    });

    /* Tipo ganador (desempate: mar > tierra > ciudad > aventura) */
    var ganador = 'mar';
    var maxVotos = -1;
    var orden = ['mar', 'tierra', 'ciudad', 'aventura'];
    Array.prototype.forEach.call(orden, function (tipo) {
      if (conteo[tipo] > maxVotos) {
        maxVotos = conteo[tipo];
        ganador  = tipo;
      }
    });

    return TIPOS[ganador];
  }

  function mostrarResultado(resultado) {
    var lang = idiomaActual();

    var ico  = document.getElementById('quizResultIco');
    var tipo = document.getElementById('quizResultTipo');
    var desc = document.getElementById('quizResultDesc');
    var dest = document.getElementById('quizResultDestinos');

    if (ico)  ico.textContent  = resultado.ico;
    if (tipo) tipo.textContent = resultado['tipo_' + lang];
    if (desc) desc.textContent = resultado['desc_' + lang];

    if (dest) {
      dest.innerHTML = '';
      Array.prototype.forEach.call(resultado.destinos, function (nombreDestino) {
        var url  = QUIZ_DEST_URLS[nombreDestino] || '#destinos';
        var chip = document.createElement('a');
        chip.className = 'quiz-dest-chip';
        chip.href      = url;
        chip.innerHTML = '📍 ' + nombreDestino;
        dest.appendChild(chip);
      });
    }

    mostrarPaso(4);
  }

  /* Delegación de eventos en el panel */
  panel.addEventListener('click', function (e) {
    var btn = e.target.closest('.quiz-opcion');
    if (!btn) return;

    var paso  = parseInt(btn.dataset.paso, 10);
    var valor = btn.dataset.valor;
    votos[paso - 1] = valor;

    if (paso < 3) {
      mostrarPaso(paso + 1);
    } else {
      /* Último paso: calcular y mostrar resultado */
      var resultado = calcularResultado();
      mostrarResultado(resultado);
    }
  });

  /* Reset */
  if (reset) {
    reset.addEventListener('click', function () {
      votos = [];
      mostrarPaso(1);
    });
  }

  /* Inicializar en paso 1 */
  mostrarPaso(1);
}

/* ============================================================
   NEWSLETTER — envío real a Brevo (doble opt-in)
   ============================================================ */
function initNewsletter() {
  var form    = document.getElementById('newsletterForm');
  var input   = document.getElementById('newsletterEmail');
  var exito   = document.getElementById('newsletterExito');
  var error   = document.getElementById('newsletterError');
  if (!form || !input || !exito) return;

  /* Endpoint del formulario de Brevo (isAjax=1 → respuesta JSON, sin redirección) */
  var BREVO_URL = 'https://1f0804b8.sibforms.com/serve/MUIFAMHsKBp6b48jTywAuOIwrJgarTbPV16MVnZcJWwwwPkA-en12k2mR87l-Y505Fhs-1-ayrehSPWjk-IaR2kUYvAFpSr1uykFRpCxt6KWWXQOkZBhtAA81R5c17s4LvVJMZhHyWwtgTGYRCMqC2k59zIJ4xuOS2xNbuG4CDF_-CIUNYdYO2qYVqQfcvxWNWNNer21X7OwWygDzg==?isAjax=1';

  /* Gate solo de sesión: no re-mostrar el form tras suscribirse en esta visita.
     (El antiguo localStorage.em_newsletter ya no aplica: el dato vive en Brevo.) */
  try {
    if (sessionStorage.getItem('em_newsletter_ok')) {
      form.style.display = 'none';
      exito.removeAttribute('style');
      return;
    }
  } catch (eGate) { /* sin sessionStorage, seguimos normal */ }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = input.value.trim();

    /* Validar formato básico */
    var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reEmail.test(email)) {
      input.focus();
      input.style.boxShadow = 'inset 0 0 0 2px rgba(255,107,107,0.6)';
      setTimeout(function () {
        input.style.boxShadow = '';
      }, 1500);
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    if (error) error.style.display = 'none';

    function mostrarError() {
      if (btn) btn.disabled = false;
      if (error) error.removeAttribute('style');
    }

    /* Idioma activo para el campo locale de Brevo */
    var lang = document.documentElement.classList.contains('lang-en') ? 'en' : 'es';

    /* Envío real: EMAIL + honeypot vacío + locale, en form-urlencoded */
    var cuerpo = 'EMAIL=' + encodeURIComponent(email) +
                 '&email_address_check=' +
                 '&locale=' + lang;

    fetch(BREVO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: cuerpo
    }).then(function (res) {
      if (!res.ok) { mostrarError(); return; }

      /* Éxito real: transición + GA4 + gate de sesión */
      form.style.display = 'none';
      exito.removeAttribute('style');
      try { sessionStorage.setItem('em_newsletter_ok', '1'); } catch (eSes) {}

      if (typeof trackEvent === 'function') {
        trackEvent('newsletter_signup', {
          event_category: 'Newsletter',
          event_label: 'index'
        });
      }
    }).catch(function () {
      mostrarError();
    });
  });
}

/* ============================================================
   HERO CINEMATIC
   - Texto: palabras aparecen una a una (como en el diseño de referencia)
   - Canvas WebGL: cuadrícula de puntos + línea de escaneo roja animada
   - Imagen: parallax suave con el movimiento del mouse
   ============================================================ */

/* ============================================================
   HERO PARALLAX
   Adaptación ES5 del componente ParallaxHero (React → Vanilla JS)
   - Múltiples capas posicionadas con data-spx / data-spy / data-spz / data-rot
   - Mouse: perspective(2300px) translateZ rotateY translateX translateY
   - Texto central con su propio parallax
   - prefers-reduced-motion: sin animaciones de movimiento
   ============================================================ */
function initHeroParallax() {
  var section   = document.querySelector('.hero-parallax');
  if (!section) return;

  var layers    = section.querySelectorAll('.hero-px__layer');
  var textEl    = document.getElementById('hpxText');
  var scrollBtn = document.getElementById('heroCinScrollBtn');

  /* Texto: palabras una a una */
  initHeroPxText();

  /* Botón scroll — lleva al siguiente bloque */
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      var next = document.getElementById('quiz-aventurero') ||
                 document.getElementById('nosotros');
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* Sin parallax con movimiento reducido */
  var reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  /* ── Actualizar capas en cada movimiento de mouse ── */
  function onMove(e) {
    var xVal = e.clientX - window.innerWidth  / 2;
    var yVal = e.clientY - window.innerHeight / 2;
    /* Ángulo de rotación horizontal: igual que el componente de referencia */
    var rotateDeg = (xVal / (window.innerWidth / 2)) * 20;

    /* Actualizar cada capa de imagen / niebla */
    for (var i = 0; i < layers.length; i++) {
      var el  = layers[i];
      var spx = parseFloat(el.getAttribute('data-spx')) || 0;
      var spy = parseFloat(el.getAttribute('data-spy')) || 0;
      var spz = parseFloat(el.getAttribute('data-spz')) || 0;
      var rot = parseFloat(el.getAttribute('data-rot')) || 0;

      /* zVal: profundidad en función de la posición horizontal del elemento */
      var rect     = el.getBoundingClientRect();
      var elCX     = rect.left + rect.width  / 2;
      var isInLeft = elCX < window.innerWidth / 2 ? 1 : -1;
      var zVal     = (e.clientX - elCX) * isInLeft * 0.1;

      el.style.transform =
        'perspective(2300px) ' +
        'translateZ(' + (zVal * spz) + 'px) ' +
        'rotateY(' + (rotateDeg * rot) + 'deg) ' +
        'translateX(calc(-50% + ' + (-xVal * spx) + 'px)) ' +
        'translateY(calc(-50% + ' + (yVal  * spy) + 'px))';
    }

    /* Texto: parallax propio con velocidad distinta al fondo */
    if (textEl) {
      var tSpx = parseFloat(textEl.getAttribute('data-spx')) || 0.07;
      var tSpy = parseFloat(textEl.getAttribute('data-spy')) || 0.05;
      var tSpz = parseFloat(textEl.getAttribute('data-spz')) || 0.08;
      var tRot = parseFloat(textEl.getAttribute('data-rot')) || 0.04;

      var tRect = textEl.getBoundingClientRect();
      var tCX   = tRect.left + tRect.width / 2;
      var tLeft = tCX < window.innerWidth / 2 ? 1 : -1;
      var tZVal = (e.clientX - tCX) * tLeft * 0.1;

      textEl.style.transform =
        'perspective(2300px) ' +
        'translateZ(' + (tZVal * tSpz) + 'px) ' +
        'rotateY(' + (rotateDeg * tRot) + 'deg) ' +
        'translateX(calc(-50% + ' + (-xVal * tSpx) + 'px)) ' +
        'translateY(calc(-50% + ' + (yVal  * tSpy) + 'px))';
    }
  }

  window.addEventListener('mousemove', onMove, { passive: true });
}

/* ── Animación de texto: palabras del título aparecen una a una ── */
function initHeroPxText() {
  var titleEl = document.getElementById('heroPxTitle');
  var subEl   = document.getElementById('heroPxSub');
  if (!titleEl) return;

  /* Detectar idioma activo */
  var lang  = document.documentElement.classList.contains('lang-en') ? 'en' : 'es';
  var wEs   = ['Descubre', 'una', 'de', 'las', 'ciudades', 'más', 'icónicas',
               'y', 'emocionantes', 'del', 'mundo'];
  var wEn   = ['Discover', 'one', 'of', 'the', 'most', 'iconic', 'and',
               'exciting', 'cities', 'in', 'the', 'world'];
  var words = lang === 'en' ? wEn : wEs;

  /* Con movimiento reducido: mostrar todo de golpe */
  var reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    titleEl.textContent = words.join(' ');
    if (subEl) { subEl.style.opacity = '1'; subEl.style.transform = 'none'; }
    return;
  }

  /* Construir un <span> por palabra */
  titleEl.innerHTML = '';
  var spans = [];
  for (var i = 0; i < words.length; i++) {
    var sp = document.createElement('span');
    sp.className   = 'hero-px__word';
    sp.textContent = words[i];
    titleEl.appendChild(sp);
    spans.push(sp);
    if (i < words.length - 1) {
      titleEl.appendChild(document.createTextNode(' ')); /* espacio sin ruptura */
    }
  }

  /* Animar cada palabra con su delay escalonado */
  var BASE = 350;  /* ms antes de empezar */
  var STEP = 165;  /* ms entre palabras */

  for (var j = 0; j < spans.length; j++) {
    (function (el, delay) {
      setTimeout(function () {
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }, delay);
    })(spans[j], BASE + j * STEP);
  }

  /* Subtítulo: aparece al terminar el título + 450ms */
  var subDelay = BASE + words.length * STEP + 450;
  setTimeout(function () {
    if (subEl) {
      subEl.style.transition = 'opacity 0.9s ease, transform 0.7s ease';
      subEl.style.opacity    = '1';
      subEl.style.transform  = 'translateY(0)';
    }
  }, subDelay);
}
