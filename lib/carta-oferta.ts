export const MENU_HOST = "https://menu.wavys-technologies.com" as const;

/** Local wavys-menu while menu.wavys-technologies.com is not deployed. */
const MENU_ORIGIN =
  process.env.NODE_ENV === "development" ? "http://localhost:3010" : MENU_HOST;

export type CartaCaso = {
  slug: string;
  name: string;
  place: string;
  cuisine: string;
  hook: string;
  href: string;
  /** Local demo on this site when available */
  localHref?: string;
  logo: string;
  logoAlt: string;
  /** Logo treatment on dark UI */
  logoOnDark?: boolean;
  hero: string;
  plate: string;
  plateAlt: string;
  plateName: string;
  platePrice: string;
  accent: string;
  wash: string;
};

export const CARTA_CASOS: CartaCaso[] = [
  {
    slug: "fumanchu",
    name: "Fu-Man-Chu",
    place: "Lima",
    cuisine: "Chifita",
    hook: "Del PDF al celular: platos con foto, precio al día y pedido por WhatsApp.",
    href: `${MENU_ORIGIN}/fumanchu`,
    localHref: "/carta",
    logo: "/carta/fumanchu/logo.webp",
    logoAlt: "Logo Fu-Man-Chu",
    logoOnDark: true,
    hero: "/carta/fumanchu/plato-taypa.webp",
    plate: "/carta/fumanchu/plato-chaufa-especial.webp",
    plateAlt: "Chaufa especial Fu-Man-Chu",
    plateName: "Chaufa especial",
    platePrice: "S/ 35",
    accent: "#e8a05a",
    wash: "#1a100c",
  },
  {
    slug: "alcoba",
    name: "La Alcoba",
    place: "Barcelona",
    cuisine: "Tapas · fusión",
    hook: "Atmósfera de local, carta viva y pedido por WhatsApp sin app nueva.",
    href: `${MENU_ORIGIN}/alcoba`,
    logo: "/carta/showcase/alcoba/logo-bco.png",
    logoAlt: "Logo La Alcoba",
    logoOnDark: true,
    hero: "/carta/showcase/alcoba/hero.jpg",
    plate: "/carta/showcase/alcoba/pulpo.jpg",
    plateAlt: "Pulpo La Alcoba",
    plateName: "Pulpo miso",
    platePrice: "15,90 €",
    accent: "#c9a87c",
    wash: "#0e0c0a",
  },
  {
    slug: "puntocero6",
    name: "Punto Cero 6",
    place: "Colombia",
    cuisine: "Empanadas",
    hook: "Carta con fotos reales, carrito y pedido listo en WhatsApp.",
    href: `${MENU_ORIGIN}/puntocero6`,
    logo: "/carta/showcase/puntocero6/logo.png",
    logoAlt: "Logo Punto Cero 6",
    logoOnDark: false,
    hero: "/carta/showcase/puntocero6/hero-foto.jpg",
    plate: "/carta/showcase/puntocero6/ranchera-foto.jpg",
    plateAlt: "Empanada ranchera Punto Cero 6",
    plateName: "Ranchera",
    platePrice: "$4.300",
    accent: "#5f9a1c",
    wash: "#10160c",
  },
];

export const CARTA_OFERTA = {
  path: "/carta-digital",
  label: "Carta digital",
  headline: "El plato se ve. El precio está al día.",
  deck: "Una carta digital a la medida de tu local. El cliente abre el plato en el celular —a veces con video—. Tú cambias el precio el mismo día. No es un QR de molde: es la carta de tu marca.",
  proof: "En vivo en Lima, Barcelona y Colombia",
  queEs: {
    title: "Qué es",
    body: "El cliente escanea el QR de la mesa, o abre el link de Instagram. Ve tus platos con foto o video corto. El precio es el de hoy. Si se acaba el lomo, lo ocultas. Almuerzo y noche pueden ser dos cartas, el mismo código.",
  },
  queNoEs: {
    title: "Qué no es",
    body: "No es un PDF. No es otra app que tienes que alimentar. No es la caja ni SUNAT. Eso ya lo tienes. Esto es la carta — con la misma mano de diseño que usamos en Fu-Man-Chu, La Alcoba y Punto Cero 6.",
  },
  points: [
    {
      title: "El plato se ve",
      body: "Foto o video corto. El mozo no tiene que contarlo.",
    },
    {
      title: "Cambias precios el mismo día",
      body: "Se acabó el PDF de la semana pasada. El QR se queda.",
    },
    {
      title: "Pedido por WhatsApp",
      body: "El carrito escribe el mensaje. Sin app nueva para el cliente.",
    },
  ],
  casos: {
    label: "Cartas hechas",
    title: "Tres locales. Tres marcas. Misma idea: que se vea y se pida.",
    deck: "No son mockups. Son cartas en producción — cada una con su look, su menú y su WhatsApp.",
  },
  piloto: "Ya hay cartas en vivo. Si quieres la tuya, el primer mes del piloto es gratis.",
  cierre: "Si quieres verla aplicada a tu negocio, agenda 15 minutos y trae tu carta.",
  ctaLabel: "Agendar llamada",
  ctaHint: "15 minutos, trae tu carta",
  seoTitle: "Carta digital para tu restaurante",
  seoDescription:
    "Carta digital a tu medida: el cliente ve el plato en el celular, tú cambias el precio el mismo día. Casos reales: Fu-Man-Chu, La Alcoba y Punto Cero 6.",
} as const;
