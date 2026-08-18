export const CASES = [
  {
    slug: "junno",
    client: "Junno",
    industry: "SaaS",
    year: "2026",
    type: "Producto · sistemas",
    title: "Tareas, equipos y plazos en un solo producto",
    context:
      "Un producto para equipos que ya operan y no pueden seguir coordinando en chats, hojas y correos sueltos.",
    problem: [
      "La coordinación vivía repartida entre herramientas que nadie quería abrir.",
      "Faltaba un workspace con vistas claras y colaboración en tiempo real.",
    ],
    approach:
      "Producto SaaS de punta a punta: landing, auth, workspace y vistas (lista, tablero, calendario) con la misma mano de diseño e ingeniería.",
    deliverables: [
      "Plataforma en producción",
      "Landing y onboarding",
      "Vistas de lista, tablero y calendario",
    ],
    result: "Producto en uso. Tareas, equipos y plazos en un solo lugar.",
    demoHref: "https://www.junno.online/",
    image: "/images/portfolio-junno.png",
  },
  {
    slug: "agenda-mesa",
    client: "AgendaMesa",
    industry: "SaaS",
    year: "2026",
    type: "Producto · restaurantes",
    title: "El menú del día en un link, sin apps ni comisiones",
    context:
      "Los locales chicos seguían mandando fotos por WhatsApp. Había que digitalizar el menú y el pedido sin meterlos a un marketplace.",
    problem: [
      "El menú vivía en fotos confusas de WhatsApp: errores, pedidos perdidos, desorden.",
      "Las apps de delivery cobran comisión y no son el flujo de un restaurante pequeño.",
    ],
    approach:
      "SaaS de punta a punta: landing, auth, editor de menú, link por local y panel de pedidos. El cliente pide por web; el local recibe todo en un solo lugar.",
    deliverables: [
      "Producto en producción",
      "Editor de menú del día",
      "Link propio por restaurante",
      "Panel de pedidos en tiempo real",
    ],
    result: "Producto en uso. Menú en un link, pedidos en el panel, cero comisión por venta.",
    demoHref: "https://www.agendamesa.click/",
    image: "/images/portfolio-agenda-mesa.png",
  },
  {
    slug: "inmobiliaria-fabre",
    client: "Inmobiliaria Fabre",
    industry: "Inmobiliaria",
    year: "2025",
    type: "Web · desde cero",
    title: "Presencia digital creada desde cero",
    context:
      "La inmobiliaria operaba y no tenía página web. Se diseñó y construyó el sitio desde cero: inventario, contacto y una imagen a la altura del producto.",
    problem: [
      "No existía web: el negocio no se encontraba ni se presentaba en digital.",
      "Las fotos del inventario pedían edición para verse al nivel de los departamentos.",
      "Había que iterar con el cliente: correcciones de contenido, jerarquía y tono hasta que quedó firme.",
    ],
    approach:
      "Partimos de cero. Dirección visual, listados y un camino único a consulta. El área de diseño se encargó de la edición de imágenes — color, recorte, atmósfera — hasta que el inventario se leyó limpio. Ingeniería armó SEO, fichas y CTAs. Hubo rondas de corrección con gerencia; no se publicó un primer borrador.",
    deliverables: [
      "Sitio creado desde cero, en producción",
      "Listados de propiedades con fichas comerciales",
      "Edición de imágenes a cargo de diseño",
      "SEO on-page y canal de contacto activo",
    ],
    result: "Hoy hay una web que se encuentra, se ve seria y lleva a consulta. Antes no había nada que mostrar.",
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

export const CASE_BRIEFS = {
  junno: {
    kicker: "Producto · en producción",
    headline: "Así se planea un SaaS que el equipo sí abre el lunes.",
    lede: "No una landing con captura falsa. Workspace, auth, cuatro vistas y sync en vivo — diseñado como operación, no como pantallas sueltas.",
    product: [
      { label: "Workspace", body: "Cuentas, equipos y un espacio que se configura en minutos." },
      { label: "Cuatro vistas", body: "Lista, tablero, calendario y Mis tareas." },
      { label: "Tiempo real", body: "Comentarios y cambios sin refrescar." },
      { label: "Multi-homing", body: "Una tarea, varios proyectos. Sin duplicar." },
    ],
    plan: [
      { id: "01", title: "Diagnóstico", body: "El cuello era coordinación rota entre chats, hojas y correos." },
      { id: "02", title: "Dirección", body: "Una interfaz que un equipo real abre. Simple de leer." },
      { id: "03", title: "Construcción", body: "Landing, auth y producto en el mismo ciclo." },
      { id: "04", title: "Entrega", body: "Salió a producción. No un prototipo eterno." },
    ],
    craft: ["Next.js", "Auth", "Tiempo real", "UI system"],
    closer: "Si tu operación todavía vive en WhatsApp y Excel, este es el tipo de producto que firmamos.",
    sketch: "/images/sketches/junno.png",
    sketchAlt: "Boceto de wireframe del workspace de Junno",
    system: {
      type: { display: "Sans geométrica, serif-less", body: "UI densa, 14–16px, tracking corto" },
      colors: [
        { name: "Coral", hex: "#F05A4E", role: "Acción · CTA" },
        { name: "Índigo", hex: "#6B5CE7", role: "Marca · foco" },
        { name: "Tinta", hex: "#121212", role: "Texto" },
        { name: "Papel", hex: "#F7F4F1", role: "Fondo" },
        { name: "Lila", hex: "#E8E0F8", role: "Superficie suave" },
      ],
    },
    numbers: [
      { value: "4", label: "Vistas del mismo trabajo", audience: "El equipo" },
      { value: "1", label: "Workspace, sin saltar de tool", audience: "El lead" },
      { value: "0", label: "Refresh para ver un cambio", audience: "Quien opera" },
      { value: "3", label: "Pasos de cero a productivo", audience: "Onboarding" },
    ],
  },
  "agenda-mesa": {
    kicker: "Producto · en producción",
    headline: "Así se planea un menú que se manda por WhatsApp y se pide en web.",
    lede: "No un marketplace. Un link por local, un editor de 30 segundos y un panel que ordena lo que antes era una foto borrosa.",
    product: [
      { label: "Link propio", body: "Cada restaurante tiene su slug. El cliente no ve a nadie más." },
      { label: "Editor", body: "Platos, precios y fotos. Activar o apagar en segundos." },
      { label: "Pedidos", body: "El local acepta, prepara y marca listo. Sin comisión." },
      { label: "WhatsApp", body: "Se comparte el menú por chat. Se pide por web." },
    ],
    plan: [
      { id: "01", title: "Diagnóstico", body: "El cuello era la foto de WhatsApp: pedidos rotos y menú ilegible." },
      { id: "02", title: "Dirección", body: "Un flujo de tres pasos que un dueño abre el mismo día." },
      { id: "03", title: "Construcción", body: "Landing, auth, menú, link y panel en el mismo ciclo." },
      { id: "04", title: "Entrega", body: "Salió a producción. Plan piloto sin comisión por venta." },
    ],
    craft: ["Next.js", "NestJS", "PostgreSQL", "Multitenant"],
    closer: "Si tu menú todavía vive en una foto de WhatsApp, este es el tipo de producto que firmamos.",
    sketch: "/images/sketches/agenda-mesa.png",
    sketchAlt: "Boceto del flujo menú, WhatsApp y panel de AgendaMesa",
    system: {
      type: { display: "Sans bold, titulares cortos", body: "Sans clara, CTAs en pill naranja" },
      colors: [
        { name: "Naranja", hex: "#FF6A00", role: "Acción · marca" },
        { name: "Llama", hex: "#FF8A33", role: "Hover · brillo" },
        { name: "Tinta", hex: "#1A1A1A", role: "Titular" },
        { name: "Piedra", hex: "#6B7280", role: "Cuerpo" },
        { name: "Papel", hex: "#FFFFFF", role: "Fondo" },
      ],
    },
    numbers: [
      { value: "0%", label: "Comisión por pedido", audience: "El dueño" },
      { value: "1", label: "Link por local, no un marketplace", audience: "El restaurante" },
      { value: "3", label: "Pasos: menú, WhatsApp, panel", audience: "Operación" },
      { value: "2", label: "Clicks para pedir, sin app", audience: "El comensal" },
    ],
  },
  "inmobiliaria-fabre": {
    kicker: "Web · desde cero",
    headline: "No tenían web. Se construyó de cero y quedó para gerencia.",
    lede: "Inmobiliaria Fabre ya vendía. No tenía sitio. Diseñamos, editamos las fotos, corregimos con ellos y publicamos una presencia que se encuentra, se ve cara y lleva a consulta.",
    product: [
      { label: "Desde cero", body: "Cero digital previo. Arquitectura, copy y visual nacieron aquí." },
      { label: "Edición de fotos", body: "Diseño retocó el inventario: color, recorte, atmósfera. Quedó limpio." },
      { label: "Correcciones", body: "Rondas con el cliente hasta congelar jerarquía, tono y fichas." },
      { label: "Consulta", body: "CTA de contacto en cada propiedad, no escondido en un footer." },
    ],
    plan: [
      { id: "01", title: "Cero", body: "No había página. Mapeamos oferta, zona y qué tenía que pasar al entrar." },
      { id: "02", title: "Dirección", body: "Boceto, look y listados. Gerencia corrigió; iteramos hasta que cerró." },
      { id: "03", title: "Diseño + SEO", body: "Edición de imágenes, fichas, titles y estructura para buscarse." },
      { id: "04", title: "Producción", body: "Salió el sitio. Antes no había nada que mandar a un prospecto." },
    ],
    craft: ["Next.js", "SEO", "Edición de imagen", "Listados", "Contacto"],
    closer: "Si tu negocio opera y todavía no tiene web — o la que tiene no se encuentra — este es el trabajo que firmamos.",
    sketch: "/images/sketches/fabre.png",
    sketchAlt: "Boceto de wireframe del sitio de Inmobiliaria Fabre",
    bridge:
      "No había sitio que rediseñar. El boceto fue la primera dirección. La producción es la primera web de la inmobiliaria.",
    strengths: [
      {
        label: "SEO que un gerente entiende",
        body: "Títulos, encabezados, URLs y fichas pensadas para que Google indexe proyectos y zona — no una web invisible.",
      },
      {
        label: "Se encuentra, no solo se ve",
        body: "Estructura lista para búsquedas de departamentos y ciudad. Si el cliente busca, hay algo que abrir.",
      },
      {
        label: "Imagen a la altura del producto",
        body: "Diseño editó cada foto. El inventario no se ve amateur: se ve vendible.",
      },
      {
        label: "Camino a consulta",
        body: "Cotizar / contactar donde el visitante ya decidió. Menos fricción, más conversación comercial.",
      },
      {
        label: "Móvil de verdad",
        body: "El comprador entra desde el teléfono. El sitio se recorre; no es un recorte del desktop.",
      },
      {
        label: "Credibilidad institucional",
        body: "Primera presencia digital al nivel del negocio. Algo que gerencia puede mandar sin disculparse.",
      },
    ],
    system: {
      type: { display: "Sans bold, titulares cortos", body: "Sans clara, CTAs en pill" },
      colors: [
        { name: "Esmeralda", hex: "#008554", role: "Acción · marca" },
        { name: "Bosque", hex: "#006837", role: "Hover · peso" },
        { name: "Carbón", hex: "#111111", role: "Overlay · seriedad" },
        { name: "Blanco", hex: "#FFFFFF", role: "Texto sobre foto" },
        { name: "Niebla", hex: "#F4F6F5", role: "Listados" },
      ],
    },
    numbers: [
      { value: "0→1", label: "De no tener web a sitio en producción", audience: "Gerencia" },
      { value: "SEO", label: "Titles, H1 y fichas indexables", audience: "Gerencia" },
      { value: "1", label: "Camino a consulta en cada ficha", audience: "Comercial" },
      { value: "100%", label: "Fotos editadas por diseño", audience: "Comprador" },
    ],
  },
  "jlh-corredores": {
    kicker: "Web · sistemas",
    headline: "Un portal a la altura del oficio.",
    lede: "Una correduría con operación real necesitaba un frente que transmitiera seriedad, no una plantilla de seguros.",
    product: [
      { label: "Confianza", body: "Narrativa institucional, no stock de paraguas." },
      { label: "Cotización", body: "Un camino claro a hablar con un asesor." },
      { label: "Rubros", body: "Empresas, salud, vehicular — sin perder el hilo." },
      { label: "Base", body: "Lista para seguir operando en digital." },
    ],
    plan: [
      { id: "01", title: "Diagnóstico", body: "La web no se sentía a la altura. Cotizar no tenía camino." },
      { id: "02", title: "Dirección", body: "Portal de correduría: confianza primero, luego la acción." },
      { id: "03", title: "Construcción", body: "Hero, rubros y contacto en el mismo ciclo." },
      { id: "04", title: "Entrega", body: "En producción. El mismo equipo firma sistemas del rubro." },
    ],
    craft: ["Next.js", "Cotización", "Narrativa", "Sistemas"],
    closer: "Si el frente no transmite seriedad, el lead no entra. Así lo cerramos.",
    sketch: "/images/sketches/jlh.png",
    sketchAlt: "Boceto de wireframe del portal de JLH Corredores",
    system: {
      type: { display: "Sans institucional, pesos altos", body: "Sans de lectura, botones sólidos" },
      colors: [
        { name: "Navy", hex: "#0B1C3D", role: "Confianza · hero" },
        { name: "Oro", hex: "#F5C518", role: "Acción · asesor" },
        { name: "Hielo", hex: "#7EB6FF", role: "Acento de título" },
        { name: "Violeta", hex: "#9B7BFF", role: "Gradiente" },
        { name: "Blanco", hex: "#FFFFFF", role: "Cuerpo · rubros" },
      ],
    },
    numbers: [
      { value: "1", label: "Camino claro a un asesor", audience: "Gerencia" },
      { value: "5", label: "Rubros sin perder el hilo", audience: "El asegurado" },
      { value: "18+", label: "Años de oficio, ahora en el frente", audience: "Confianza" },
      { value: "2", label: "CTAs: consulta y protección", audience: "Comercial" },
    ],
  },
  "la-alcoba": {
    kicker: "Web · marca",
    headline: "La web se siente como el local.",
    lede: "Un restaurante con identidad propia no puede verse como un directorio de carta. Había que unir atmósfera, menú y reserva.",
    product: [
      { label: "Atmósfera", body: "Dirección visual al servicio del local, no al revés." },
      { label: "Carta", body: "El menú se lee como parte del relato." },
      { label: "Reservas", body: "Un camino claro a la mesa." },
      { label: "Craft", body: "Tipografía, plato y CTA en el mismo arco." },
    ],
    plan: [
      { id: "01", title: "Diagnóstico", body: "La marca se diluía en plantillas de carta." },
      { id: "02", title: "Dirección", body: "Congelamos look: oscuro, serif, el plato como pieza." },
      { id: "03", title: "Construcción", body: "Hero, carta y reservas en un solo entregable." },
      { id: "04", title: "Entrega", body: "Pieza viva. Demo en línea, atmósfera de marca." },
    ],
    craft: ["Next.js", "Carta", "Reservas", "Identidad"],
    closer: "Si la marca se diluye en digital, el local pierde peso. Así lo evitamos.",
    sketch: "/images/sketches/alcoba.png",
    sketchAlt: "Boceto de wireframe del sitio de La Alcoba",
    system: {
      type: { display: "Serif de alta cocina", body: "Sans fina para menú y reserva" },
      colors: [
        { name: "Noche", hex: "#0A0A0C", role: "Atmósfera" },
        { name: "Crema", hex: "#E8DCC8", role: "Titular · CTA" },
        { name: "Azul marca", hex: "#3D6BDB", role: "Logotipo" },
        { name: "Hueso", hex: "#F4EFE6", role: "Marco del plato" },
        { name: "Blanco", hex: "#FFFFFF", role: "Cuerpo" },
      ],
    },
    numbers: [
      { value: "1", label: "Arco: atmósfera + carta + reserva", audience: "Dueño" },
      { value: "2", label: "CTAs: menú y mesa", audience: "El comensal" },
      { value: "0", label: "Plantillas de carta genéricas", audience: "Marca" },
      { value: "1", label: "Look congelado, no un directorio", audience: "Sala" },
    ],
  },
} as const;

export const CLIENT_LOGOS = [
  {
    name: "Junno",
    src: "/images/clients/junno.svg",
    href: "https://www.junno.online/",
  },
  {
    name: "AgendaMesa",
    src: "/images/clients/agenda-mesa.svg",
    href: "https://www.agendamesa.click/",
  },
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
