export type RadarPage = {
  file: string
  label: string
  folio: string
}

export type RadarNote = {
  kicker: string
  title: string
  titleEm?: string
  body: string
  why: string
  mark?: string
}

export type RadarCase = {
  num: string
  who: string
  ask: string
  text: string
}

export type RadarRank = {
  pos: string
  name: string
  score: string
  mark?: string
}

export type RadarIssue = {
  slug: string
  number: number
  title: string
  dek: string
  excerpt: string
  weekLabel: string
  publishedAt: string
  readingTime: number
  cover: string
  pdf: string
  author: string
  category: { name: string; slug: string }
  tags: string[]
  toc: Array<{ id: string; label: string; folio: string }>
  pages: RadarPage[]
  carta: {
    kicker: string
    title: string
    titleEm: string
    image: string
    imageAlt: string
    caption: string
    paragraphs: string[]
    sign: string
    meta: string
  }
  senal: {
    kicker: string
    notes: RadarNote[]
    image: string
    imageAlt: string
  }
  tema: {
    kicker: string
    title: string
    titleEm: string
    dek: string
    mark: string
    image: string
    imageAlt: string
    lead: string
    paragraphs: string[]
    quote: string
    quoteEm: string
    cases: RadarCase[]
    oficioImage: string
    oficioAlt: string
    closeTitle: string
    closeTitleEm: string
    closeParagraphs: string[]
    closeSign: string
    sources: Array<{ date: string; tag: string; text: string }>
  }
  mas: {
    kicker: string
    title: string
    items: Array<{ who: string; title: string; body: string; why: string; mark?: string }>
  }
  ranking: {
    kicker: string
    title: string
    titleEm: string
    line: string
    rows: RadarRank[]
    charts: Array<{ src: string; label: string; em: string; alt: string }>
  }
  cierre: {
    kicker: string
    title: string
    titleEm: string
    paragraphs: string[]
    image: string
    imageAlt: string
    ctaLabel: string
    ctaUrl: string
    sign: string
  }
}

export const radarIssues: RadarIssue[] = [
  {
    slug: 'radar-n1',
    number: 1,
    title: 'Grok Bot falla',
    dek: 'Lo sigo usando. Por eso te escribo.',
    excerpt:
      'Grok Bot salió el 11 de agosto. A veces falla. Phil cuenta cómo lo usa: varios bots se hablan, él da el ok. Más el correo que agenda solo, WhatsApp que cobra en octubre, y el ranking del 14.',
    weekLabel: 'N°1 · 10–14 ago 2026',
    publishedAt: '2026-08-14T18:00:00-05:00',
    readingTime: 12,
    cover: '/radar/n1/tapa.png',
    pdf: '/radar/n1/radar-n1.pdf',
    author: 'Phil Taboada',
    category: { name: 'Radar', slug: 'radar' },
    tags: ['radar', 'grok', 'ia', 'whatsapp'],
    toc: [
      { id: 'carta', label: 'Carta del editor', folio: '02' },
      { id: 'senal', label: 'Señal', folio: '03' },
      { id: 'tema', label: 'Tema central · Grok Bot', folio: '04' },
      { id: 'mas', label: 'Más noticias', folio: '05' },
      { id: 'ranking', label: 'Ranking', folio: '08' },
      { id: 'cierre', label: 'Contratapa', folio: '09' },
    ],
    pages: [
      { file: '/radar/n1/pages/01-tapa.png', label: 'Tapa', folio: '01' },
      { file: '/radar/n1/pages/02-carta-del-editor.png', label: 'Carta del editor', folio: '02' },
      { file: '/radar/n1/pages/03-senal.png', label: 'Señal', folio: '03' },
      { file: '/radar/n1/pages/04a-tema-central-apertura.png', label: 'Apertura', folio: '04' },
      { file: '/radar/n1/pages/04b-tema-central-relato.png', label: 'Relato', folio: '04' },
      { file: '/radar/n1/pages/04c-tema-central-casos.png', label: 'Cómo lo uso', folio: '04' },
      { file: '/radar/n1/pages/04d-tema-central-cita-datos.png', label: 'Cita', folio: '04' },
      { file: '/radar/n1/pages/04e-tema-central-reglas.png', label: 'Cierre del tema', folio: '04' },
      { file: '/radar/n1/pages/05-mas-noticias.png', label: 'Más noticias', folio: '05' },
      { file: '/radar/n1/pages/08-tablero-ia.png', label: 'Tablero de IA', folio: '08' },
      { file: '/radar/n1/pages/09-contratapa.png', label: 'Contratapa', folio: '09' },
    ],
    carta: {
      kicker: 'Carta del editor · N°1 · 10–14 ago 2026',
      title: 'Grok Bot',
      titleEm: 'falla',
      image: '/radar/n1/img/escena-carta.jpg',
      imageAlt: 'Escritorio de noche: carta impresa, lapicero y cuaderno de apuntes',
      caption: 'Escritorio, viernes de noche. La carta y el cuaderno donde anoto lo de la semana.',
      paragraphs: [
        'Soy Phil. Hago software. Esta es la primera revista que te escribo.',
        'Trabajo con IA todos los días. La pruebo, la corrijo, a veces me convence. Quiero contártelo de cerca. Lo que me sirve. Lo que no.',
        'Grok Bot a veces falla. Lo sigo usando. Por eso te escribo. Salió el 11 de agosto, todavía en prueba (beta).',
        'Esta semana, en Twitter, vi tres cosas que te cambian el día: el correo que ahora resume y agenda solo, la llamada que si tarda el cliente cuelga, y que desde octubre WhatsApp cobra las respuestas que antes no cobraba. Más abajo te las cuento. Al final te dejo el ranking de modelos del 14 de agosto.',
      ],
      sign: 'Phil',
      meta: 'Phil · agosto 2026',
    },
    senal: {
      kicker: 'Señal · tres notas · Google · OpenAI · Meta',
      image: '/radar/n1/img/escena-correo.jpg',
      imageAlt: 'Bandeja de correo abierta sobre el escritorio',
      notes: [
        {
          kicker: 'Google · Gemini 3.7 Flash · 13 ago 2026',
          mark: '/radar/n1/img/marks/google-g-white.svg',
          title: 'Correo',
          titleEm: 'ahora agenda solo',
          body: 'El lunes abrí el correo y no era “otro modelo”. El 13 de agosto Google sacó Gemini 3.7 Flash. Spark —el asistente de Google en Gmail— se metió al correo y al calendario. Resume, propone horario, mueve. Si tu día vive en una hoja de Excel y en WhatsApp, el anuncio no te cambia el lunes.',
          why: 'Si lo que atiendes no está en el correo, el anuncio no es tuyo.',
        },
        {
          kicker: 'si tarda, el cliente cuelga · OpenAI · Ultrafast',
          mark: '/radar/n1/img/marks/openai-badge.svg',
          title: 'Un modo',
          titleEm: 'más rápido',
          body: 'El 13 de agosto OpenAI sacó Ultrafast (un modo más rápido del mismo modelo, GPT-5.6 Sol). Yo me quedé en la llamada. Un segundo de más y cuelgan. Un bot lento es peor que no tener bot.',
          why: 'La velocidad no es un número. Es si el cliente sigue al teléfono o ya colgó.',
        },
        {
          kicker: 'en octubre · Meta · 1 oct 2026',
          mark: '/radar/n1/img/marks/whatsapp-white.svg',
          title: 'WhatsApp',
          titleEm: 'cobra',
          body: 'Desde el 1 de octubre Meta vuelve a cobrar las respuestas que no son un mensaje guardado. No las cobraba desde el 1 de noviembre de 2024. Las tarifas de atención las publica el 1 de septiembre. No las adivino.',
          why: 'Si el pedido o la cita viven solo en el chat, cada ida y vuelta te la cobran.',
        },
      ],
    },
    tema: {
      kicker: 'Tema central · Grok Bot · xAI · 11 ago 2026',
      title: 'Los bots',
      titleEm: 'se hablan',
      dek: 'Creo varios. Se hablan. Yo doy el ok.',
      mark: '/radar/n1/img/marks/grok-bot-on-dark.svg',
      image: '/radar/n1/img/escena-bots-hablan.jpg',
      imageAlt: 'Tres compañeros de trabajo en el escritorio, se hablan',
      lead: 'Creo varios. Se hablan. Yo doy el ok.',
      paragraphs: [
        'Grok Bot salió el 11 de agosto, todavía en prueba (beta). No lo uso como un chat más. Lo uso así: creo varios bots (compañeros de trabajo). Uno busca. Otro escribe. Otro revisa. Se conectan entre ellos. Se hablan. Se pasan el trabajo. Deciden. Vuelven a intentar. Mejoran. Yo no estoy en cada ida y vuelta. Yo doy el ok. Sin mi ok, no sale.',
        'Yo lo uso para armar Wavys. La revista. Los textos. El día. A veces falla. Lo sigo usando. Porque cuando el trabajo deja de vivir solo en mi cabeza, el lunes ya no empieza desde cero.',
      ],
      quote: 'Ellos se hablan.',
      quoteEm: 'Yo doy el ok.',
      cases: [
        {
          num: '01',
          who: 'Esta revista',
          ask: 'Me lo trajeron para el ok.',
          text: 'El domingo yo no estoy armando páginas. Estoy leyendo un número. Yo hablé. Varios bots se repartieron el trabajo: uno buscó las notas, otro escribió, otro editó. Se hablaron. Se corrigieron. Me lo trajeron para el ok. Si no doy el ok, vuelven a intentar. Si lo doy, el número existe.',
        },
        {
          num: '02',
          who: 'El texto',
          ask: 'Como carta, no como lista.',
          text: 'Le pedí un texto que se leyera como carta, no como lista. El que escribe lo mandó. El que revisa lo devolvió. Volvió mal. Lo volvieron a intentar. Volvió bien. No es magia. Es un equipo que se habla. Yo decido. Sin mi ok, no sale. Con mi ok, el texto ya no es un borrador. Está listo.',
        },
        {
          num: '03',
          who: 'Las noticias',
          ask: 'El material del viernes llega.',
          text: 'Antes yo perseguía conversaciones a las once. Ahora varios trabajan a la vez. Uno busca. Otro escribe. Se hablan. Yo no tengo que pasar la misma nota de una ventana a otra. Las notas de la semana llegan el viernes. Yo las leo. El domingo no persigo veinte ventanas.',
        },
        {
          num: '04',
          who: 'Las ventas',
          ask: 'Yo doy el ok',
          text: 'El chat del cliente no espera a que yo desbloquee el celular. Ellos entran a esa conversación: leen, preparan, se detienen cuando hace falta una persona. Se pasan lo que falta. Yo no escribo el primer mensaje de madrugada. Yo doy el ok. El cliente ve una atención. No ve el desorden de atrás.',
        },
        {
          num: '05',
          who: 'El seguimiento',
          ask: 'Sigue sin mí',
          text: 'Hay un seguimiento que no puede quedarse atrás. Yo cierro la laptop. Ellos no. Se hablan. Revisan. A la mañana siguiente, los días hábiles, ya está revisado. El trabajo siguió en su computadora. Por eso a veces falla: siguen sin mí. Por eso lo sigo usando: cuando aciertan, yo llego y el día ya empezó.',
        },
      ],
      oficioImage: '/radar/n1/img/escena-oficio.jpg',
      oficioAlt: 'Domingo: un número impreso abierto sobre la mesa, luz de ventana',
      closeTitle: 'A veces falla.',
      closeTitleEm: 'Lo sigo usando.',
      closeParagraphs: [
        'Creo varios. Se hablan. Yo doy el ok. El resto de este número es lo que vi esta semana, con ese equipo ya trabajando.',
        'Si tu negocio todavía vive en el chat y en una hoja, el problema no es “falta IA”. Es que el trabajo vive en tu cabeza y se apaga cuando apagas el teléfono.',
        'Esto lo mueve a un equipo que se habla. Tú das el ok. Desde el escritorio o desde el teléfono. La misma conversación.',
        'Así lo uso. Así te lo dejo.',
      ],
      closeSign: '— Phil',
      sources: [
        { date: '11 ago 2026', tag: 'Versión de prueba (beta)', text: 'Grok Bot salió. Todavía en prueba. x.ai/bot' },
        { date: 'x.ai', tag: 'Fuente', text: 'x.ai/bot · x.ai/news/introducing-grok-bot' },
      ],
    },
    mas: {
      kicker: 'Más noticias · 12 ago 2026 · Claude · Thrive · Amazon',
      title: 'Más noticias',
      items: [
        {
          who: '05a · Claude',
          mark: '/radar/n1/img/marks/claude-star.svg',
          title: 'entra a tu navegador',
          body: 'Claude ahora trabaja adentro de Chrome, con tu usuario. No esperas a que te conecten el sistema. Lo usé para mirar una agenda en el navegador, sin que nadie una las piezas por detrás. El trabajo es cómo atiendes hoy.',
          why: 'Si tu sistema viejo solo abre en el navegador, ya no es excusa esperar a que te lo conecten.',
        },
        {
          who: '05b · Thrive',
          mark: '/radar/n1/img/marks/openai-badge.svg',
          title: '2 mil millones no es otra app de chat',
          body: 'Thrive —con plata de OpenAI— levantó 2 mil millones para meter IA en empresas que ya atienden, ya facturan. No para sacar otra app de chat. La plata grande va a quien ya tiene un desorden, no a un chatbot nuevo.',
          why: 'Si no entra al chat y a cómo atiendes hoy, es decoración.',
        },
        {
          who: '05c · Amazon · Twitch',
          mark: '/radar/n1/img/marks/twitch.svg',
          title: 'El video y el chat de Twitch entrenan su IA',
          body: 'Amazon, con Twitch: el video y el chat de los streamers entrenan su IA si no se salen. El jefe de producto lo dijo claro: si te tuvieran que pedir permiso, nadie aceptaba. Un dueño de clínica no está en Twitch. La misma regla puede llegar a tu lista de clientes y a tu chat: hay que decir que no, o dejarlo por escrito.',
          why: 'Por defecto ya no es tu permiso. Es su sí, hasta que tú te salgas.',
        },
      ],
    },
    ranking: {
      kicker: 'Ranking · 14 de agosto de 2026',
      title: 'Qué modelo de IA va',
      titleEm: 'primero',
      line: 'Arriba siguen los de siempre. Grok 4.6 entró entre los primeros en tres días. Gemini 3.7 Flash no es el más inteligente: es barato y rápido. No le invento puesto. El ranking no te arma el lunes. El cambio útil de la semana no es un puesto. Es el trabajo que ya está hecho el lunes.',
      rows: [
        { pos: '01', name: 'Claude Opus 5', score: '63', mark: '/radar/n1/img/marks/anthropic.svg' },
        { pos: '02', name: 'Claude Fable 5', score: '62', mark: '/radar/n1/img/marks/claude-star.svg' },
        { pos: '03', name: 'GPT-5.6 Sol', score: '61', mark: '/radar/n1/img/marks/openai-badge.svg' },
        { pos: '04', name: 'Grok 4.6', score: '61', mark: '/radar/n1/img/marks/grok-bot-on-dark.svg' },
        { pos: '05', name: 'Qwen 3.8 Max', score: '58' },
        { pos: '06', name: 'DeepSeek V4 Flash', score: '52' },
      ],
      charts: [
        {
          src: '/radar/n1/charts/aa-intelligence-bars.png',
          label: 'Costo por tarea',
          em: 'captura real · AA',
          alt: 'Gráfico real de Artificial Analysis: costo por tarea del índice de inteligencia',
        },
        {
          src: '/radar/n1/charts/aa-leaderboard.png',
          label: 'Leaderboard, primeras filas',
          em: 'captura real · artificialanalysis.ai · 14 ago 2026',
          alt: 'Captura real del leaderboard de modelos de Artificial Analysis',
        },
        {
          src: '/radar/n1/charts/aa-intelligence-vs-cost.png',
          label: 'Inteligencia vs costo por tarea',
          em: 'captura real · escala log · AA',
          alt: 'Gráfico real de Artificial Analysis: índice de inteligencia contra costo por tarea',
        },
      ],
    },
    cierre: {
      kicker: 'Contratapa',
      title: 'Nos leemos el',
      titleEm: 'viernes que viene',
      paragraphs: [
        'Si esto te sirve para mirar tu negocio —el chat, la hoja, el equipo— bien.',
        'Si quieres te muestro cómo se ve eso en tu operación. Media hora y listo.',
      ],
      image: '/radar/n1/img/escena-cierre.jpg',
      imageAlt: 'Cierre de la semana: escritorio apagándose',
      ctaLabel: '30 minutos, una llamada',
      ctaUrl: 'https://cal.com/wavys-call/30min',
      sign: 'Nos leemos el viernes que viene.',
    },
  },
]

export function getRadarIssue(slug: string): RadarIssue | undefined {
  return radarIssues.find((issue) => issue.slug === slug)
}

export function isRadarSlug(slug: string): boolean {
  return radarIssues.some((issue) => issue.slug === slug)
}

export const radarSlugs = new Set(radarIssues.map((issue) => issue.slug))
