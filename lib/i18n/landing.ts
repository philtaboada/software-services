export type LandingLocale = "es" | "en";

type Slug = "junno" | "agenda-mesa" | "inmobiliaria-fabre" | "jlh-corredores" | "la-alcoba";

export type BriefOverlay = {
  kicker: string;
  headline: string;
  lede: string;
  product: { label: string; body: string }[];
  plan: { id: string; title: string; body: string }[];
  closer: string;
  sketchAlt: string;
  craft: string[];
};

export const EN_CASES: Record<Slug, { industry: string; title: string; result: string }> = {
  junno: {
    industry: "SaaS",
    title: "Tasks, teams, and deadlines in one product",
    result: "In use. Tasks, teams, and deadlines in one place.",
  },
  "agenda-mesa": {
    industry: "SaaS",
    title: "The daily menu in one link — no apps, no commissions",
    result: "In use. Menu in a link, orders in the panel, zero commission per sale.",
  },
  "inmobiliaria-fabre": {
    industry: "Real estate",
    title: "A digital presence built from zero",
    result: "A site people can find, that looks serious, and that leads to an inquiry. Before, there was nothing to show.",
  },
  "jlh-corredores": {
    industry: "Insurance",
    title: "A brokerage portal built on trust and quotes",
    result: "Portal in production. Separately: operational systems in production for insurance, built by the same team.",
  },
  "la-alcoba": {
    industry: "Dining",
    title: "Menu, reservations, and atmosphere in one story",
    result: "A living piece with the brand's atmosphere. Demo online.",
  },
};

export const EN_BRIEFS: Record<Slug, BriefOverlay> = {
  junno: {
    kicker: "Product · in production",
    headline: "How you plan a SaaS the team actually opens on Monday.",
    lede: "Not a landing page with a fake signup. Workspace, auth, four views, and live sync — designed as an operation, not a pile of screens.",
    product: [
      { label: "Workspace", body: "Accounts, teams, and a space you can set up in minutes." },
      { label: "Four views", body: "List, board, calendar, and My tasks." },
      { label: "Realtime", body: "Comments and changes without a refresh." },
      { label: "Multi-homing", body: "One task, several projects. No duplicates." },
    ],
    plan: [
      { id: "01", title: "Diagnosis", body: "The bottleneck was coordination split across chats, sheets, and email." },
      { id: "02", title: "Direction", body: "An interface a real team opens. Easy to read." },
      { id: "03", title: "Build", body: "Landing, auth, and product in the same cycle." },
      { id: "04", title: "Handoff", body: "It shipped to production. Not an eternal prototype." },
    ],
    closer: "If your operation still lives in chat and spreadsheets, this is the kind of product we ship.",
    sketchAlt: "Wireframe sketch of the Junno workspace",
    craft: ["Next.js", "Auth", "Realtime", "UI system"],
  },
  "agenda-mesa": {
    kicker: "Product · in production",
    headline: "How you plan a menu that goes out on WhatsApp and gets ordered on the web.",
    lede: "Not a marketplace. One link per venue, a 30-second editor, and a panel that replaces a blurry photo.",
    product: [
      { label: "Own link", body: "Each restaurant has its slug. The guest doesn't see anyone else." },
      { label: "Editor", body: "Dishes, prices, and photos. On or off in seconds." },
      { label: "Orders", body: "The venue accepts, prepares, and marks ready. No commission." },
      { label: "WhatsApp", body: "Share the menu in chat. Order on the web." },
    ],
    plan: [
      { id: "01", title: "Diagnosis", body: "The bottleneck was the WhatsApp photo: broken orders and an unreadable menu." },
      { id: "02", title: "Direction", body: "A three-step flow an owner opens the same day." },
      { id: "03", title: "Build", body: "Landing, auth, menu, link, and panel in the same cycle." },
      { id: "04", title: "Handoff", body: "It shipped. A pilot plan with no commission per sale." },
    ],
    closer: "If your menu still lives in a WhatsApp photo, this is the kind of product we ship.",
    sketchAlt: "Sketch of the AgendaMesa menu, WhatsApp, and panel flow",
    craft: ["Next.js", "NestJS", "PostgreSQL", "Multitenant"],
  },
  "inmobiliaria-fabre": {
    kicker: "Website · from scratch",
    headline: "They had no website. We built one from zero, and leadership signed off.",
    lede: "Inmobiliaria Fabre was already selling. They had no site. We designed it, edited the photos, revised with them, and published a presence people can find.",
    product: [
      { label: "From zero", body: "No digital presence before. Architecture, copy, and visuals started here." },
      { label: "Photo editing", body: "Design retouched the inventory: color, crop, atmosphere. It reads clean." },
      { label: "Revisions", body: "Rounds with the client until hierarchy, tone, and listings froze." },
      { label: "Inquiry", body: "A contact CTA on every property, not buried in a footer." },
    ],
    plan: [
      { id: "01", title: "Zero", body: "There was no page. We mapped the offer, the area, and what had to happen on arrival." },
      { id: "02", title: "Direction", body: "Sketch, look, and listings. Leadership revised; we iterated until it closed." },
      { id: "03", title: "Design + SEO", body: "Image editing, listings, titles, and a structure people can search." },
      { id: "04", title: "Production", body: "The site shipped. Before, there was nothing to send a prospect." },
    ],
    closer: "If the business is running and still has no site — or the one it has can't be found — this is the work we take on.",
    sketchAlt: "Wireframe sketch of the Inmobiliaria Fabre website",
    craft: ["Next.js", "SEO", "Photo editing", "Listings", "Contact"],
  },
  "jlh-corredores": {
    kicker: "Website · systems",
    headline: "A portal that matches the craft.",
    lede: "A brokerage with a real operation needed a public face that felt serious — not an insurance template.",
    product: [
      { label: "Trust", body: "An institutional story, not stock umbrellas." },
      { label: "Quote", body: "A clear path to talk with an advisor." },
      { label: "Lines", body: "Business, health, auto — without losing the thread." },
      { label: "Base", body: "Ready to keep operating online." },
    ],
    plan: [
      { id: "01", title: "Diagnosis", body: "The site didn't feel up to the practice. Quoting had no path." },
      { id: "02", title: "Direction", body: "A brokerage portal: trust first, then the action." },
      { id: "03", title: "Build", body: "Hero, lines of business, and contact in the same cycle." },
      { id: "04", title: "Handoff", body: "In production. The same team ships systems for the industry." },
    ],
    closer: "If the front door doesn't feel serious, the lead doesn't walk in. This is how we close that gap.",
    sketchAlt: "Wireframe sketch of the JLH Corredores portal",
    craft: ["Next.js", "Quoting", "Narrative", "Systems"],
  },
  "la-alcoba": {
    kicker: "Website · brand",
    headline: "The website feels like the room.",
    lede: "A restaurant with its own identity can't look like a menu directory. Atmosphere, menu, and reservations had to share one arc.",
    product: [
      { label: "Atmosphere", body: "Visual direction in service of the room, not the other way around." },
      { label: "Menu", body: "The menu reads as part of the story." },
      { label: "Reservations", body: "A clear path to the table." },
      { label: "Craft", body: "Type, plate, and CTA on the same arc." },
    ],
    plan: [
      { id: "01", title: "Diagnosis", body: "The brand was thinning out in menu templates." },
      { id: "02", title: "Direction", body: "We froze the look: dark, serif, the plate as the piece." },
      { id: "03", title: "Build", body: "Hero, menu, and reservations in one delivery." },
      { id: "04", title: "Handoff", body: "A living piece. Demo online, with the brand's atmosphere." },
    ],
    closer: "If the brand thins out online, the room loses weight. This is how we keep it.",
    sketchAlt: "Wireframe sketch of the La Alcoba website",
    craft: ["Next.js", "Menu", "Reservations", "Identity"],
  },
};

export const EN_SERVICES: Record<"webs" | "apps" | "sistemas" | "identidad", { title: string; outcome: string }> = {
  webs: {
    title: "Websites with a point of view",
    outcome: "Landings and sites that load fast: visual direction, copy, and performance in one delivery.",
  },
  apps: {
    title: "Apps people keep using",
    outcome: "Clear, measurable mobile flows. React Native when the product has to live in a pocket.",
  },
  sistemas: {
    title: "Internal systems",
    outcome: "Panels, integrations, and operational software for teams that have outgrown scattered sheets and chats.",
  },
  identidad: {
    title: "Digital identity",
    outcome: "Type, color, and a UI system translated into a coherent interface — not another template.",
  },
};

export const EN_PAINS = [
  {
    title: "A website that doesn't sell",
    body: "It looks “fine” and still doesn't match the business. Visitors don't know what to do.",
  },
  {
    title: "An operation held together in patches",
    body: "Spreadsheets, WhatsApp, and loose tools. The team loses context and the lead goes cold.",
  },
  {
    title: "Half-finished systems",
    body: "There's an app or a panel, but nobody owns it technically. Every change is a risk.",
  },
] as const;

export const EN_PROCESS = {
  "01": {
    kicker: "Diagnosis",
    title: "We read the bottleneck",
    time: "3–5 days",
    body: "Before any design, we pin down what is slowing the work: commercial clarity, experience, or operational friction.",
  },
  "02": {
    kicker: "Direction",
    title: "We set a direction that holds",
    time: "1–2 weeks",
    body: "",
  },
  "03": {
    kicker: "Build",
    title: "We build with detail and control",
    time: "Depends on the piece",
    body: "",
  },
  "04": {
    kicker: "Handoff",
    title: "We leave a base and the next move",
    time: "End of the cycle",
    body: "",
  },
} as const;

const EN_FAQ = [
  {
    q: "How long does a project take?",
    a: "A strategic landing takes 3 to 5 weeks, a corporate site 5 to 8, a custom system starts at 8 weeks. Before we build, there's a diagnosis with clear timing.",
  },
  {
    q: "Do you work on a stack that's already in place?",
    a: "Yes. Next.js, React Native, NestJS, Django, PostgreSQL, Supabase — or whatever already runs your operation. If there's technical debt, we propose a progressive plan, not a hard restart.",
  },
  {
    q: "Do you only design, or do you build too?",
    a: "Both, with the same team. Visual direction, copy, interaction, and engineering come from one studio.",
  },
  {
    q: "How does the working model look?",
    a: "A fixed project in phases, or a monthly retainer for a continuous product. One direct contact, weekly deliveries, and a shared board.",
  },
  {
    q: "Where are you based?",
    a: "We're based in Lima, Peru (UTC−5, no daylight saving). We work remotely with clients anywhere. In person in Lima when a project needs it.",
  },
  {
    q: "Do you do AI or agents?",
    a: "As a layer inside custom projects, when the return is clear: capture, qualification, and follow-up. It isn't the main offer on this site, and it isn't a self-serve product.",
  },
  {
    q: "Do you work with idea-stage startups?",
    a: "No. We look for businesses that are already operating. If this is your first experiment, we aren't the partner.",
  },
] as const;

export const LANDING_COPY = {
  es: {
    anchors: {
      work: "trabajo",
      services: "servicios",
      process: "proceso",
      faq: "faq",
      team: "equipo",
      global: "alcance",
      diagnostic: "diagnostico",
    },
    hero: {
      kicker: "Estudio · Lima · remoto global",
      line1: "Software y diseño",
      line2Before: "para quien ",
      line2Accent: "ya opera.",
      rotateLabel: "Hacemos",
      words: ["webs", "apps", "sistemas internos", "identidad"],
      wordsLabel: "webs, apps, sistemas internos e identidad",
      lines: [
        "Webs, apps y sistemas internos.",
        "Para negocios que ya operan, en cualquier país.",
        "Dirección e ingeniería con la misma mano. IA solo cuando aporta.",
      ],
      primary: "Agendar llamada 30 min",
      secondary: "Ver el trabajo",
      trust: ["Lima", "remoto global", "respuesta < 24 h"],
    },
    logos: { label: "En producción", aria: "Empresas con las que hemos trabajado" },
    stats: {
      label: "Señales",
      title: "Lo que ya está en marcha.",
      products: "productos y webs en producción",
      brands: "marcas",
      countries: "países con productos en vivo",
      reply: "respuesta en día hábil",
      team: "equipo · diseño e ingeniería",
    },
    work: {
      label: "Trabajo seleccionado",
      title: "Piezas en producción.",
      index: "Índice de casos",
      aria: "Enfoca o pasa el cursor para ver cómo se planeó y se construyó.",
      shotAlt: "Captura del sitio de",
      shotLink: "Ver cómo se planeó",
      sketch: "Boceto · dirección",
      hint: "Pasa el cursor · plan y boceto",
      piece: "La pieza",
      plan: "El plan",
      processCta: "Ver el proceso",
      liveCta: "Ver en producción",
      seePlan: "Ver cómo se planeó",
      planToggle: "Ver plan y boceto",
    },
    diagnostic: {
      label: "El cuello de botella",
      title: "¿Qué te está frenando?",
      lede: "Elige uno. Te mostramos el servicio que encaja y el primer paso.",
      legend: "Elige el cuello de botella",
      servicesLabel: "Servicios que encajan",
      stepLabel: "Primer paso",
      cta: "Agendar llamada 30 min",
    },
    services: {
      label: "Servicios",
      title: "Cuatro territorios. Un solo estudio.",
      index: "Ver oferta",
    },
    global: {
      label: "Alcance",
      title: "Un estudio en Lima. Cualquier huso.",
      caption: "En producción en Perú, España y Colombia. Remoto para cualquier país.",
      mapAria: "Mapa de señales: productos en vivo en Perú, España y Colombia",
      places: [
        { id: "lima", name: "Lima", place: "Perú" },
        { id: "barcelona", name: "Barcelona", place: "España" },
        { id: "colombia", name: "Colombia", place: "Colombia" },
      ],
      clock: {
        lima: "Lima",
        local: "Tu hora",
        zone: "UTC−5",
        note: "Respondemos en menos de 24 h hábiles.",
        same: "Estamos en tu zona horaria. Respondemos en menos de 24 h hábiles.",
        apart: "Estamos a {n} h de ti. Respondemos en menos de 24 h hábiles.",
      },
    },
    process: {
      label: "Proceso",
      title: "Cuatro movimientos.",
      index: "Ver proceso",
    },
    offers: {
      cartaLabel: "Carta digital",
      cartaTitle: "",
      cartaDeck: "",
      cartaCta: "Ver carta digital",
      inversionLabel: "Inversión",
      inversionTitle: "Cotizamos después de entender el cuello de botella.",
      inversionDeck: "Alcance, plazos y modelo se cierran en la llamada. Sin cifras en vitrina: cada operación pide un tramo distinto.",
      inversionCta: "Cómo invertimos",
    },
    team: {
      label: "Equipo",
      title: "El estudio trabaja para tu resultado.",
      body: "Lima. Diseño e ingeniería en un solo ciclo, hasta que el digital deje de frenar el negocio. Sin intermediarios. Presencial cuando hace falta; remoto para cualquier país.",
      cta: "Cómo trabajamos",
      imageAlt: "Marca del estudio: diseño e ingeniería en el mismo equipo",
    },
    radar: {
      kicker: "Radar",
      title: "Las revistas",
      note: "",
      read: "Leer",
      index: "Ver revistas",
      coverAlt: "Tapa de Radar",
    },
    faq: {
      label: "Dudas frecuentes",
      title: "Antes de escribir.",
      lede: "Si tu pregunta no está aquí, escríbenos. Respondemos en menos de 24 h hábiles.",
      items: null,
    },
    cta: {
      kicker: "Siguiente paso",
      title: "Cuéntanos qué estás intentando construir.",
      primary: "Agendar llamada 30 min",
      email: "Escribir a",
      reply: "Respondemos en menos de 24 h hábiles.",
    },
    sticky: {
      book: "Agendar llamada",
      email: "Escribir por correo",
    },
  },
  en: {
    anchors: {
      work: "work",
      services: "services",
      process: "process",
      faq: "faq",
      team: "team",
      global: "reach",
      diagnostic: "diagnostic",
    },
    hero: {
      kicker: "Studio · Lima · remote worldwide",
      line1: "Software and design",
      line2Before: "for businesses ",
      line2Accent: "already in motion.",
      rotateLabel: "We build",
      words: ["websites", "apps", "internal systems", "brand identity"],
      wordsLabel: "websites, apps, internal systems, and brand identity",
      lines: [
        "Websites, apps, and internal systems.",
        "For companies already running, anywhere.",
        "Design and engineering, one team. AI only when it earns its place.",
      ],
      primary: "Book a 30-min call",
      secondary: "See the work",
      trust: ["Lima", "remote worldwide", "reply in < 24 h"],
    },
    logos: { label: "In production", aria: "Companies we've worked with" },
    stats: {
      label: "Signals",
      title: "What's already running.",
      products: "products and sites in production",
      brands: "brands",
      countries: "countries with live products",
      reply: "reply on a business day",
      team: "team · design and engineering",
    },
    work: {
      label: "Selected work",
      title: "Shipped and in production.",
      index: "All case studies",
      aria: "Focus or hover to see how it was planned and built.",
      shotAlt: "Screenshot of",
      shotLink: "See how we planned",
      sketch: "Sketch · direction",
      hint: "Hover · plan and sketch",
      piece: "The piece",
      plan: "The plan",
      processCta: "See the process",
      liveCta: "See it live",
      seePlan: "See how it was planned",
      planToggle: "See plan & sketch",
    },
    diagnostic: {
      label: "The bottleneck",
      title: "What's slowing you down?",
      lede: "Pick one. We'll show the practice that fits and the first step.",
      legend: "Choose the bottleneck",
      servicesLabel: "Practices that fit",
      stepLabel: "First step",
      cta: "Book a 30-min call",
    },
    services: {
      label: "Services",
      title: "Four practices. One studio.",
      index: "See the offer",
    },
    global: {
      label: "Reach",
      title: "A Lima studio. Any time zone.",
      caption: "Live in Peru, Spain, and Colombia. Remote for any country.",
      mapAria: "Signal map: live products in Peru, Spain, and Colombia",
      places: [
        { id: "lima", name: "Lima", place: "Peru" },
        { id: "barcelona", name: "Barcelona", place: "Spain" },
        { id: "colombia", name: "Colombia", place: "Colombia" },
      ],
      clock: {
        lima: "Lima",
        local: "Your time",
        zone: "UTC−5",
        note: "We reply in under 24 business hours.",
        same: "We're in your time zone. We reply in under 24 business hours.",
        apart: "We're {n} h apart — we reply in under 24 business hours.",
      },
    },
    process: {
      label: "Process",
      title: "Four moves.",
      index: "See the process",
    },
    offers: {
      cartaLabel: "Digital menu",
      cartaTitle: "The dish is visible. The price is today's.",
      cartaDeck:
        "A digital menu built for your restaurant. Guests open the dish on their phone — sometimes with video. You change the price the same day. Not a generic QR: it's your brand's menu.",
      cartaCta: "See digital menus",
      inversionLabel: "Investment",
      inversionTitle: "We price it after we understand the bottleneck.",
      inversionDeck:
        "Scope, timeline, and model get settled on the call. No numbers in the window: every operation needs a different slice.",
      inversionCta: "How we price",
    },
    team: {
      label: "Team",
      title: "The studio works for your outcome.",
      body: "Lima. Design and engineering in one cycle, until digital stops slowing the business. No middlemen. In person when it matters; remote anywhere.",
      cta: "How we work",
      imageAlt: "Studio mark: design and engineering as one team",
    },
    radar: {
      kicker: "Radar",
      title: "The magazine",
      note: "Published in Spanish.",
      read: "Read",
      index: "All issues",
      coverAlt: "Cover of Radar",
    },
    faq: {
      label: "Common questions",
      title: "Before you write.",
      lede: "If your question isn't here, write to us. We reply in under 24 business hours.",
      items: EN_FAQ,
    },
    cta: {
      kicker: "Next step",
      title: "Tell us what you're trying to build.",
      primary: "Book a 30-min call",
      email: "Email",
      reply: "We reply in under 24 business hours.",
    },
    sticky: {
      book: "Book a call",
      email: "Email the studio",
    },
  },
} as const;

export const PAIN_SERVICES = [
  ["webs", "identidad"],
  ["sistemas"],
  ["sistemas", "apps"],
] as const;
