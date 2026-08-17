export type PhoneKind = "mobile" | "landline";

export type RestaurantPhone = {
  label: string;
  raw: string;
  e164: string;
  kind: PhoneKind;
  preferred?: boolean;
};

export type MenuItem = {
  name: string;
  note?: string;
  price?: number;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type WebStatus = "si" | "no" | "dudosa";

export type PilotoRestaurant = {
  slug: string;
  n: number;
  name: string;
  shortName: string;
  distrito: string;
  address: string;
  cuisine: string;
  webStatus: WebStatus;
  webLabel: string;
  webHref?: string;
  maps: string;
  mapsNote: string;
  hours?: string;
  angle: string;
  seen: string;
  pitchClean: boolean;
  waWeak?: boolean;
  phones: RestaurantPhone[];
  waMessage: string;
  theme: {
    bg: string;
    paper: string;
    ink: string;
    muted: string;
    accent: string;
    line: string;
    wash: string;
  };
  menu: MenuSection[];
};

export const PILOTO_META = {
  title: "Piloto 10 restaurantes",
  city: "Lima",
  dateLabel: "lun 17 ago 2026",
  method: "WebSearch + WebFetch. Nada inventado. No se contactó a nadie.",
  excluded:
    "Central, Maido, Isolina, La Mar, Rafael, Astrid y Gastón, Mayta, Kjolle, Mérito, Osaka, Tanta, Pardos, Madam Tusan, Wong, hoteles, franquicias. También Nación 1821, Barrio/MCK, Residente, La Mariposario.",
} as const;

export const PILOTO_RESTAURANTS: PilotoRestaurant[] = [
  {
    slug: "cumpa",
    n: 1,
    name: "Cumpa Taberna Criolla",
    shortName: "Cumpa",
    distrito: "Surquillo",
    address: "Jirón Leoncio Prado 498",
    cuisine: "Cocina norteña · taberna de esquina",
    webStatus: "si",
    webLabel: "Sitio propio · carta en PDF",
    webHref: "https://cumpatabernacriolla.com/",
    maps: "Google 4.5",
    mapsNote: "Restaurant Guru, jul 2026. n Maps no aparece. Wanderlog 4.5 / 886 (agregado).",
    hours: "Lun–dom 12:00–17:00 · cocina cierra 16:30 · brunch sáb–dom 9:00–12:00",
    angle: "PDF en la web propia — precios y platos se quedan en un archivo.",
    seen: "Sitio vivo. Carta embebida como PDF. Dueño Renzo Miñán (también Alzoen / Almacén). Infatuation 14 ago 2025. mesa247 5.0 (27).",
    pitchClean: true,
    phones: [
      { label: "WhatsApp", raw: "+51 946 345 833", e164: "51946345833", kind: "mobile", preferred: true },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). En cumpatabernacriolla.com la carta está embebida como PDF — hay que descargarla. Te mando un ejemplo real: Fu-Man-Chu, del PDF al celular, sin app. Si les calza, la de Cumpa la armamos con su marca.",
    theme: {
      bg: "#1a100c",
      paper: "#2a1a14",
      ink: "#f6ebe3",
      muted: "#c4a894",
      accent: "#e8a05a",
      line: "rgba(246, 235, 227, 0.12)",
      wash: "#3d2418",
    },
    menu: [
      {
        title: "Cocina norteña",
        items: [
          { name: "Arroz con pato", note: "Visto en sitio propio" },
          { name: "Malaya", note: "Visto en sitio propio" },
          { name: "Seco de cabrito", note: "Visto en sitio propio" },
          { name: "Pato al cilindro", note: "Visto en sitio propio" },
        ],
      },
    ],
  },
  {
    slug: "don-fernando",
    n: 2,
    name: "Don Fernando",
    shortName: "Don Fernando",
    distrito: "Jesús María",
    address: "Av. Gral. Eugenio Garzón 1788",
    cuisine: "Norteña / marina · familia Vera-Horna",
    webStatus: "si",
    webLabel: "Sitio propio · PDF carta 2025",
    webHref: "https://donfernando.com.pe/",
    maps: "Google 4.4 (1608)",
    mapsNote: "Restaurant Guru, ficha 9 ago 2026. Reviews de Google de hace ~1 mes.",
    hours: "Mié–dom 11:30–17:00 · lun–mar cerrado",
    angle: "Carta en PDF 2025 — el caso más limpio de “el archivo se queda viejo”.",
    seen: "El sitio pide reservas por teléfono fijo, no hay carta interactiva. Instagram @donfernandorestaurante. Footer del sitio: 2026.",
    pitchClean: true,
    phones: [
      { label: "WhatsApp (PDF 2025)", raw: "993 53 4959", e164: "51993534959", kind: "mobile", preferred: true },
      { label: "Fijo", raw: "(01) 261-0361", e164: "5112610361", kind: "landline" },
      { label: "Fijo", raw: "(01) 463-2656", e164: "5114632656", kind: "landline" },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). Vi la Carta Don Fernando 2025 en PDF — los precios se quedan en el archivo. Te mando un ejemplo real: Fu-Man-Chu, del PDF al celular. Si les calza, la de Don Fernando la armamos con su marca.",
    theme: {
      bg: "#14110c",
      paper: "#221c14",
      ink: "#f4ecd8",
      muted: "#c8b896",
      accent: "#d4a017",
      line: "rgba(244, 236, 216, 0.12)",
      wash: "#3a2e18",
    },
    menu: [
      {
        title: "De la carta 2025",
        items: [
          { name: "Ceviches", note: "Listados en el PDF 2025" },
          { name: "Cabrito", note: "Listado en el PDF 2025" },
          { name: "Arroz con pato", note: "Listado en el PDF 2025" },
          { name: "Cuy", note: "Listado en el PDF 2025" },
          { name: "Vinos", note: "Listados en el PDF 2025" },
        ],
      },
    ],
  },
  {
    slug: "la-tostadora",
    n: 3,
    name: "La Tostadora Café",
    shortName: "La Tostadora",
    distrito: "Barranco",
    address: "Jirón Domeyer 132",
    cuisine: "Café-restobar · hermanos Pando",
    webStatus: "si",
    webLabel: "Carta web + reservas por WA",
    webHref: "https://latostadoracafe.com/",
    maps: "Google ~4.4",
    mapsNote: "Agregadores FeelingPeru / carta.menu. n Maps no aparece (el 21 458 de carta.menu no es creíble).",
    hours: "Homepage 17 ago 2026: “20 JUE Renzo Vignati – jazz 8:30 pm”",
    angle: "Carta web + reservas por WA; el pedido/evento sigue viviendo en WhatsApp.",
    seen: "Café de Oxapampa, pizzas, piqueos, vinos, jazz en vivo. Página /carta/ con aviso de que productos/precios varían. Rappi activo (RUC 10418965032).",
    pitchClean: false,
    phones: [
      { label: "WhatsApp reservas", raw: "+51 938 321 549", e164: "51938321549", kind: "mobile", preferred: true },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). En La Tostadora la carta está en la web y las reservas se cierran por WhatsApp. Te mando un ejemplo de carta digital (Fu-Man-Chu, hecha a partir de su PDF). Si les calza, la de ustedes la armamos con su marca.",
    theme: {
      bg: "#16110e",
      paper: "#241a16",
      ink: "#f3e8dc",
      muted: "#c2a894",
      accent: "#c4784a",
      line: "rgba(243, 232, 220, 0.12)",
      wash: "#3a2418",
    },
    menu: [
      {
        title: "Café y sala",
        items: [
          { name: "Café de Oxapampa", note: "Visto en sitio propio" },
          { name: "Pizzas", note: "Visto en sitio propio" },
          { name: "Piqueos", note: "Visto en sitio propio" },
          { name: "Vinos", note: "Visto en sitio propio · página Vinos y Vinilos" },
        ],
      },
    ],
  },
  {
    slug: "la-cuina",
    n: 4,
    name: "La Cuina de Bonilla",
    shortName: "La Cuina",
    distrito: "Miraflores",
    address: "Calle Manuel Bonilla 124",
    cuisine: "Tapas bar independiente",
    webStatus: "si",
    webLabel: "Web sin precios · CTA WhatsApp",
    webHref: "https://www.lacuina.pe/",
    maps: "Google 4.2 (704)",
    mapsNote: "Restaurant Guru. FeelingPeru 4.2 / 643. Ficha RG 9 ago 2026.",
    hours: "Lun–jue 12:00–1:00 · vie–sáb 12:00–3:00 · dom 17:30–1:00",
    angle: "Web sin carta con precios — el menú real vive en salón / WA / IG.",
    seen: "Tortilla, papas bravas, musciame de pato, mollejitas. Instagram @lacuinadebonilla. El dueño responde reseñas de Google.",
    pitchClean: false,
    phones: [
      { label: "WhatsApp", raw: "986 641 179", e164: "51986641179", kind: "mobile", preferred: true },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). En lacuina.pe se describe la carta pero no hay precios. Te mando un ejemplo de carta digital (Fu-Man-Chu). Si les calza, la de La Cuina la armamos con precios y su marca.",
    theme: {
      bg: "#140c10",
      paper: "#221218",
      ink: "#f6e8ea",
      muted: "#c9a0a8",
      accent: "#d45a6a",
      line: "rgba(246, 232, 234, 0.12)",
      wash: "#3a1820",
    },
    menu: [
      {
        title: "Tapas",
        items: [
          { name: "Tortilla", note: "Descrita en sitio propio · precio no publicado" },
          { name: "Papas bravas", note: "Descritas en sitio propio · precio no publicado" },
          { name: "Musciame de pato", note: "Descrito en sitio propio · precio no publicado" },
          { name: "Mollejitas", note: "Descritas en sitio propio · precio no publicado" },
        ],
      },
    ],
  },
  {
    slug: "arlotia",
    n: 5,
    name: "Arlotia",
    shortName: "Arlotia",
    distrito: "Barranco",
    address: "Av. Almte. Miguel Grau 340",
    cuisine: "Vasco-peruano de barrio",
    webStatus: "no",
    webLabel: "Sin web propia · Facebook + PDF",
    webHref: "https://www.facebook.com/restaurante.arlotia",
    maps: "FeelingPeru 4.5 (380) “en Googlemaps”",
    mapsNote: "CityPeru 4.5 / 449. n Maps exacto no aparece en un snapshot Maps.",
    hours: "Mar–sáb 12:00–20:00 (mesa247)",
    angle: "Sin web propia + carta PDF en directorio — QR/PDF molde.",
    seen: "Tapas, paella, pulpo a la gallega, menú de almuerzo. mesa247 vivo, S/ 80 promedio, recojo/delivery. carta.menu hostea un PDF.",
    pitchClean: true,
    phones: [
      { label: "WhatsApp (mesa247)", raw: "977 753 289", e164: "51977753289", kind: "mobile", preferred: true },
      { label: "Fijo", raw: "(01) 256-2269", e164: "5112562269", kind: "landline" },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). Arlotia no tiene web propia — la carta vive en un PDF de directorio. Te mando un ejemplo real: Fu-Man-Chu, del PDF al celular. Si les calza, la de Arlotia la armamos con su marca.",
    theme: {
      bg: "#0c1218",
      paper: "#141c26",
      ink: "#e8eef4",
      muted: "#9ab0c4",
      accent: "#e24b4b",
      line: "rgba(232, 238, 244, 0.12)",
      wash: "#1c2838",
    },
    menu: [
      {
        title: "Vasco-peruano",
        items: [
          { name: "Tapas", note: "Visto en mesa247 / directorios" },
          { name: "Paella", note: "Visto en mesa247 / directorios" },
          { name: "Pulpo a la gallega", note: "Visto en mesa247 / directorios" },
          { name: "Menú de almuerzo", note: "Visto en mesa247" },
        ],
      },
    ],
  },
  {
    slug: "el-rey-marino",
    n: 6,
    name: "El Rey Marino",
    shortName: "El Rey Marino",
    distrito: "Surquillo",
    address: "Calle Clara Barton Mz. C Lt. 10, La Calera",
    cuisine: "Cevichería familiar · ~25 años",
    webStatus: "si",
    webLabel: "6 platos en web · carta completa opaca",
    webHref: "https://elreymarino.com/",
    maps: "FeelingPeru 4.4 (1814) “Googlemaps”",
    mapsNote: "CityPeru 4.4 / 2041 opiniones.",
    angle: "Web con 6 platos + “carta completa” opaca; el resto en salón / IG.",
    seen: "Familia Terrones Alejos + Serrano Chipana. El Comercio ficha viva 17 ago 2026. Instagram @elreymarino. WhatsApp propio no aparece.",
    pitchClean: false,
    waWeak: true,
    phones: [
      { label: "Fijo (WA no aparece)", raw: "(01) 448-8667", e164: "5114488667", kind: "landline" },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). En elreymarino.com hay 6 platos y un botón de “carta completa” que no abre un menú real. Te mando un ejemplo de carta digital (Fu-Man-Chu, hecha a partir de su PDF). Si les calza, la de ustedes la armamos completa.",
    theme: {
      bg: "#071416",
      paper: "#0e2224",
      ink: "#e8f4f2",
      muted: "#8ab4b0",
      accent: "#3ec8c0",
      line: "rgba(232, 244, 242, 0.12)",
      wash: "#123238",
    },
    menu: [
      {
        title: "Publicados en la web",
        items: [
          { name: "Ceviche", price: 45, note: "Precio en elreymarino.com" },
          { name: "Jalea", price: 49, note: "Precio en elreymarino.com" },
          { name: "Piqueo", price: 90, note: "Precio en elreymarino.com" },
        ],
      },
    ],
  },
  {
    slug: "pedrito",
    n: 7,
    name: "Pedrito",
    shortName: "Pedrito",
    distrito: "Magdalena del Mar",
    address: "Jr. Junín 731",
    cuisine: "Marisquería de barrio",
    webStatus: "si",
    webLabel: "Webnode · precios que se sienten viejos",
    webHref: "https://pedritomagdalena.webnode.pe/",
    maps: "Google 4.2",
    mapsNote: "Restaurant Guru, 7 ago 2026. n Maps no aparece (RG 2166 votos propios).",
    hours: "Lun–dom 08:30–18:00 (Restaurant Guru)",
    angle: "Web molde + precios viejos + pedidos por teléfono/WA.",
    seen: "5 platos con precios fijos. Distinto de Pedrito Junior (Echenique), que RG marca cerrado. Reseña Google de hace 25 días.",
    pitchClean: true,
    phones: [
      { label: "WhatsApp", raw: "981 962 904", e164: "51981962904", kind: "mobile", preferred: true },
      { label: "Delivery", raw: "+51 953 992 646", e164: "51953992646", kind: "mobile" },
      { label: "Fijo", raw: "270-3725", e164: "5112703725", kind: "landline" },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). En la web de Pedrito (Webnode) hay 5 platos con precios que se sienten de otra temporada. Te mando un ejemplo de carta digital (Fu-Man-Chu). Si les calza, actualizamos la de Pedrito sin tocar la plantilla.",
    theme: {
      bg: "#0c1418",
      paper: "#152026",
      ink: "#eaf2f4",
      muted: "#9ab4bc",
      accent: "#5aa8c8",
      line: "rgba(234, 242, 244, 0.12)",
      wash: "#1c3038",
    },
    menu: [
      {
        title: "En la web (precios fijos)",
        items: [
          { name: "Ceviche", price: 22, note: "Publicado en Webnode" },
          { name: "Mixto", price: 24, note: "Publicado en Webnode" },
          { name: "Combinado", price: 26, note: "Publicado en Webnode" },
        ],
      },
    ],
  },
  {
    slug: "me-gusta-italiano",
    n: 8,
    name: "Me Gusta Italiano",
    shortName: "Me Gusta",
    distrito: "Lince",
    address: "Jirón Francisco de Zela 1799",
    cuisine: "Trattoria-pizzería · dueño italiano",
    webStatus: "no",
    webLabel: "Sin web · salón / IG / dueño",
    maps: "Google 4.4",
    mapsNote: "Restaurant Guru, 9 ago 2026. Portal Jesús María: 4.4 / 251.",
    hours: "Lun 18–23 · mar–sáb 12:30–15:30 y 18–23 · dom 12:30–17:00",
    angle: "Sin web — carta en salón / IG / lo que diga el dueño.",
    seen: "Reseñas: “el dueño italiano te explica y recomienda”. El dueño responde Google (hace ~2 meses). IG citado como @megustaitalianolince (perfil no abierto).",
    pitchClean: true,
    phones: [
      { label: "WhatsApp", raw: "+51 923 853 445", e164: "51923853445", kind: "mobile", preferred: true },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). Me Gusta no tiene web — la carta vive en el salón. Te mando un ejemplo de carta digital (Fu-Man-Chu, hecha a partir de su PDF). Si les calza, la de ustedes la armamos con su marca.",
    theme: {
      bg: "#160c0c",
      paper: "#241414",
      ink: "#f6e8e4",
      muted: "#c8a098",
      accent: "#c83c3c",
      line: "rgba(246, 232, 228, 0.12)",
      wash: "#3a1818",
    },
    menu: [
      {
        title: "Trattoria",
        items: [
          { name: "Pasta", note: "Citada en directorios · precio no aparece" },
          { name: "Pizza", note: "Citada en directorios · precio no aparece" },
          { name: "Lasagna", note: "Citada en directorios · precio no aparece" },
        ],
      },
    ],
  },
  {
    slug: "ozu",
    n: 9,
    name: "Ozu (Ozu Fusion)",
    shortName: "Ozu",
    distrito: "Santiago de Surco",
    address: "Av. Alfredo Benavides 4862",
    cuisine: "Nikkei + Thai · un solo local",
    webStatus: "no",
    webLabel: "Sin web · Instagram + prensa",
    webHref: "https://www.instagram.com/ozufusion",
    maps: "rating Maps no aparece",
    mapsNote: "TripAdvisor 4.9 (145). mesa247 “Ozu Asian & Peruvian Cuisine” 4.7.",
    angle: "Solo IG / prensa — sin carta online propia.",
    seen: "Dueño Erick en sala (El Comercio). lima-va 27 jul 2026: carta de cócteles Día del Pisco + reservas 980 838 434. Club El Comercio promo jueves 2026.",
    pitchClean: true,
    phones: [
      { label: "WhatsApp / reservas", raw: "980 838 434", e164: "51980838434", kind: "mobile", preferred: true },
      { label: "Fijo", raw: "(01) 497-5918", e164: "5114975918", kind: "landline" },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). Ozu no tiene dominio propio — la carta se anuncia en Instagram y en prensa. Te mando un ejemplo de carta digital (Fu-Man-Chu). Si les calza, la de Ozu la armamos con un link para reservar.",
    theme: {
      bg: "#0c0c0e",
      paper: "#161618",
      ink: "#f2eee6",
      muted: "#b4aa96",
      accent: "#d4b46a",
      line: "rgba(242, 238, 230, 0.12)",
      wash: "#242018",
    },
    menu: [
      {
        title: "Lo que se vio en prensa",
        items: [
          { name: "Cocina Nikkei", note: "El Comercio / lima-va · precio no aparece" },
          { name: "Cocina Thai", note: "El Comercio / lima-va · precio no aparece" },
          { name: "Cócteles Día del Pisco", note: "lima-va, 27 jul 2026" },
        ],
      },
    ],
  },
  {
    slug: "la-casita-de-ricardo",
    n: 10,
    name: "Pachamancas La Casita de Ricardo",
    shortName: "La Casita",
    distrito: "San Miguel",
    address: "Comandante Ladislao Espinar 240",
    cuisine: "Casa de pachamanca · Ricardo y Noemí",
    webStatus: "dudosa",
    webLabel: "Web vieja / no verificada hoy",
    maps: "Google 4",
    mapsNote: "Restaurant Guru, 4 ago 2026. n Maps no aparece (RG 1266 votos propios).",
    hours: "Lun cerrado · mar–vie mediodía · sáb–dom 11:00–17:30",
    angle: "Sin carta online usable — IG + WA para reservar.",
    seen: "Especialidad de un plato + extras. Facebook: Pachamancas La Casita de Ricardo. IG/TikTok @pachamancas.lcr. Rodando Ando cita pachamancasenlima.com (no se fetchó 2026).",
    pitchClean: false,
    phones: [
      { label: "WhatsApp", raw: "971 107 583", e164: "51971107583", kind: "mobile", preferred: true },
      { label: "Reservas", raw: "566-3875", e164: "5115663875", kind: "landline" },
    ],
    waMessage:
      "Hola, soy de Wavys (Lima). No vimos una carta digital usable de La Casita — las reservas viven en teléfono y WhatsApp. Te mando un ejemplo real: Fu-Man-Chu, del PDF al celular. Si les calza, la de ustedes la armamos con botón de reserva.",
    theme: {
      bg: "#16100a",
      paper: "#241810",
      ink: "#f4ead8",
      muted: "#c4b090",
      accent: "#c87838",
      line: "rgba(244, 234, 216, 0.12)",
      wash: "#3a2814",
    },
    menu: [
      {
        title: "Especialidad",
        items: [
          { name: "Pachamanca", note: "Especialidad de la casa · precio no aparece" },
          { name: "Extras", note: "Mencionados en fichas · detalle no aparece" },
        ],
      },
    ],
  },
];

export function getPilotoRestaurant(slug: string) {
  return PILOTO_RESTAURANTS.find((item) => item.slug === slug);
}

export function preferredPhone(item: PilotoRestaurant) {
  return item.phones.find((phone) => phone.preferred) ?? item.phones[0];
}

export function waHref(e164: string, text: string) {
  return `https://wa.me/${e164}?text=${encodeURIComponent(text)}`;
}

export function pitchMessage(item: PilotoRestaurant, demoUrl: string) {
  return `${item.waMessage}\n\nAsí se ve: ${demoUrl}`;
}

export function formatSoles(value: number) {
  return `S/ ${value}`;
}

export const PILOTO_STATS = {
  total: PILOTO_RESTAURANTS.length,
  withPhone: PILOTO_RESTAURANTS.length,
  withWeb: PILOTO_RESTAURANTS.filter((item) => item.webStatus === "si").length,
  withoutWeb: PILOTO_RESTAURANTS.filter((item) => item.webStatus === "no").length,
  pitchClean: PILOTO_RESTAURANTS.filter((item) => item.pitchClean).length,
  waWeak: PILOTO_RESTAURANTS.filter((item) => item.waWeak).length,
} as const;
