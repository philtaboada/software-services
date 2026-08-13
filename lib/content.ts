export const CASES = [
  {
    slug: "inmobiliaria-fabre",
    client: "Inmobiliaria Fabre",
    industry: "Inmobiliaria",
    year: "2025",
    type: "Web",
    title: "Propiedades y contacto directo, sin ruido",
    context:
      "El negocio ya operaba; faltaba una presencia que ordenara el inventario y llevara a consulta.",
    problem: [
      "La oferta no se leía con claridad en digital.",
      "El contacto competía con la decoración de la página.",
    ],
    approach:
      "Arquitectura de listados, jerarquía comercial y CTAs de contacto en cada ficha. Responsive de verdad, no un recorte.",
    deliverables: ["Sitio en producción", "Listados de propiedades", "Canal de contacto activo"],
    result: "Sitio orientado a captar consultas de propiedades, en uso.",
    demoHref: "https://www.inmobiliariafabre.com/",
    image: "/images/portfolio-inmobiliaria-fabre.png",
  },
  {
    slug: "jlh-corredores",
    client: "JLH Corredores de Seguros",
    industry: "Seguros",
    year: "2025",
    type: "Web · sistemas",
    title: "Portal de correduría con confianza y cotización",
    context:
      "Una correduría con operación real necesitaba un frente público a la altura del oficio, no una plantilla de seguros.",
    problem: [
      "La web no transmitía seriedad institucional.",
      "Cotización y contacto no tenían un camino claro.",
    ],
    approach:
      "Portal público de correduría: narrativa de confianza, cotización y contacto. La capacidad de sistemas de la organización se demuestra a nivel estudio, sin filtrar integraciones internas.",
    deliverables: [
      "Sitio en producción",
      "Cotización / contacto activo",
      "Base para seguir operando en digital",
    ],
    result: "Portal en producción. Aparte: sistemas operativos en producción para el rubro seguros, construidos con el mismo equipo.",
    demoHref: "https://www.jlhcorredoresdeseguros.com/",
    image: "/images/portfolio-jlh-seguros.png",
  },
  {
    slug: "la-alcoba",
    client: "La Alcoba",
    industry: "Gastronomía",
    year: "2024",
    type: "Web",
    title: "Carta, reservas y atmósfera en una sola narrativa",
    context:
      "Un restaurante con identidad propia necesitaba que la web se sintiera como el local, no como un directorio.",
    problem: [
      "La marca se diluía en plantillas de carta.",
      "Reservas y relato no convivían.",
    ],
    approach:
      "Dirección visual, carta y reservas en el mismo arco narrativo. Craft de interfaz al servicio de la experiencia.",
    deliverables: ["Sitio en producción", "Carta", "Reservas"],
    result: "Pieza viva con atmósfera de marca; demo en línea.",
    demoHref: "https://restaurant-code.vercel.app/",
    image: "/images/portfolio-la-alcoba.png",
  },
] as const;

export const CLIENT_LOGOS = [
  {
    name: "Inmobiliaria Fabre",
    src: "/images/clients/inmobiliaria-fabre.png",
    href: "https://www.inmobiliariafabre.com/",
  },
  {
    name: "JLH Corredores de Seguros",
    src: "/images/clients/jlh-corredores.png",
    href: "https://www.jlhcorredoresdeseguros.com/",
  },
  {
    name: "La Alcoba",
    src: "/images/clients/la-alcoba.png",
    href: "https://restaurant-code.vercel.app/",
  },
  {
    name: "Fundación Fabre",
    src: "/images/clients/fundacion-fabre.png",
  },
  {
    name: "Ascendia Consultores",
    src: "/images/clients/ascendia.png",
    href: "https://ascendiaconsultores.com/",
  },
  {
    name: "Fidenza Consultores",
    src: "/images/clients/fidenza.png",
    href: "https://fidenzaconsultores.com/",
  },
  {
    name: "Trading Latam",
    src: "/images/clients/trading-latam.png",
    href: "https://trading-latam.com/",
  },
  {
    name: "Rankana Pet Shop",
    src: "/images/clients/rankana.png",
    href: "https://rankanapetshop.com/",
  },
  {
    name: "W&I Research Club",
    src: "/images/clients/clubwi.svg",
    href: "https://clubwi-drab.vercel.app/",
  },
] as const;

export const SERVICES = [
  {
    slug: "webs",
    code: "01",
    title: "Webs con narrativa",
    outcome: "Landings y sites que entran rápido: dirección visual, copy y performance en el mismo entregable.",
    href: "/servicios/webs",
    image: "/images/studio/studio-lima-signals.jpg",
    cutout: "/images/studio/mark-web-cutout.png",
  },
  {
    slug: "apps",
    code: "02",
    title: "Apps que se usan",
    outcome: "Flujos móviles claros y medibles. React Native cuando el producto tiene que vivir en el bolsillo.",
    href: "/servicios/apps",
    image: "/images/studio/studio-glass-system.jpg",
    cutout: "/images/studio/mark-phone-cutout.png",
  },
  {
    slug: "sistemas",
    code: "03",
    title: "Sistemas internos",
    outcome: "Paneles, integraciones y software operativo para equipos que ya no pueden vivir en Excel y WhatsApp sueltos.",
    href: "/servicios/sistemas",
    image: "/images/studio/n8n-canvas-itops.jpg",
    cutout: "/images/studio/mark-system-cutout.png",
  },
  {
    slug: "identidad",
    code: "04",
    title: "Identidad digital",
    outcome: "Tipografía, color y UI system traducidos a interfaz coherente — no a una plantilla más.",
    href: "/servicios/identidad",
    image: "/images/studio/studio-circuit-wave.jpg",
    cutout: "/images/studio/hero-wave-cutout.png",
  },
] as const;

export const PROCESS = [
  {
    id: "01",
    kicker: "Diagnóstico",
    title: "Leemos el cuello de botella",
    body: "Antes de diseñar nada aterrizamos qué está frenando el avance: claridad comercial, experiencia o fricción operativa.",
    deliverable: "Diagnóstico escrito y alcance tentativo.",
    time: "3–5 días",
    decision: "Seguimos o no. Sin teatro.",
  },
  {
    id: "02",
    kicker: "Dirección",
    title: "Definimos una dirección que aguante",
    body: "Estructuramos mensaje, atmósfera y sistema para que la primera versión ya nazca con peso.",
    deliverable: "Dirección visual + arquitectura de producto.",
    time: "1–2 semanas",
    decision: "Congelamos look & estructura.",
  },
  {
    id: "03",
    kicker: "Construcción",
    title: "Construimos con detalle y control",
    body: "Diseño, desarrollo e interacción con la misma mano. El motion no es adorno: es parte del producto.",
    deliverable: "Builds semanales en un entorno real.",
    time: "Según tipo de pieza",
    decision: "Priorizamos qué entra en v1.",
  },
  {
    id: "04",
    kicker: "Entrega",
    title: "Dejamos base y siguiente jugada",
    body: "No solo lanzamos. Queda claro qué conviene hacer después para que la siguiente fase no llegue a ciegas.",
    deliverable: "Producción + handoff + mapa de siguiente fase.",
    time: "Cierre de ciclo",
    decision: "Retainer o cierre limpio.",
  },
] as const;

export const SERVICE_COPY = {
  webs: {
    intro:
      "Una web que se siente a la altura del negocio: mensaje, atmósfera y un camino claro a consulta.",
    bullets: [
      "Landings y sites corporativos con dirección visual y copy en el mismo entregable",
      "Performance real: carga, responsive y jerarquía comercial",
      "CTAs de contacto o reserva donde el visitante ya decidió",
    ],
    forWhom: "Negocios con operación real que necesitan verse más serios y convertir mejor en digital.",
  },
  apps: {
    intro:
      "Flujos móviles que se usan de verdad. Sin pantallas de más y con una base que se puede iterar.",
    bullets: [
      "React Native cuando el producto tiene que vivir en el bolsillo",
      "Arquitectura de flujos, estados vacíos y handoff con el resto del stack",
      "Alcance y cotización se cierran en la llamada — no hay app genérica",
    ],
    forWhom: "Equipos que ya operan y necesitan que el producto móvil deje de ser un prototipo eterno.",
  },
  sistemas: {
    intro:
      "Software operativo para equipos que ya no pueden vivir en Excel, WhatsApp sueltos y paneles a medias.",
    bullets: [
      "Paneles internos, integraciones y automatización (n8n) con dueño técnico",
      "Captura, calificación y seguimiento cuando hay ROI — IA como capa, no como show",
      "Misma mano que construye el frente público y el sistema que hay detrás",
    ],
    forWhom: "Operaciones con tracción: corredurías, inmobiliarias, equipos comerciales que ya tienen volumen.",
  },
  identidad: {
    intro:
      "Tipografía, color y UI system traducidos a interfaz coherente. No una plantilla con logo pegado.",
    bullets: [
      "Dirección visual que aguanta web, app y piezas de producto",
      "Tokens, jerarquía y componentes que el desarrollo puede sostener",
      "Craft de interfaz al servicio de la marca, no al revés",
    ],
    forWhom: "Marcas que ya existen y necesitan que el digital deje de diluirlas.",
  },
} as const;

export const PAINS = [
  {
    title: "Web que no vende",
    body: "Se ve “bien” y no refleja el nivel del negocio. El visitante no sabe qué hacer.",
  },
  {
    title: "Operación en parches",
    body: "Excel, WhatsApp y herramientas sueltas. El equipo pierde contexto y el lead se enfría.",
  },
  {
    title: "Sistemas a medias",
    body: "Hay app o panel, pero nadie es dueño técnico. Cada cambio es un riesgo.",
  },
] as const;
