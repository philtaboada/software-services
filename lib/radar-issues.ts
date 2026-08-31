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
    mark?: string
    image: string
    imageAlt: string
    lead: string
    leadEm?: string
    paragraphs: string[]
    quote: string
    quoteEm: string
    quoteAttr?: string
    casesTitle?: string
    cases: RadarCase[]
    oficioImage: string
    oficioAlt: string
    closeKicker?: string
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
    footnote?: string
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
    slug: 'radar-n3',
    number: 3,
    title: 'El diésel llega',
    dek: 'El estrecho se cierra y el galón en Lima ya está al doble. El lunes se paga en el flete.',
    excerpt:
      'Ormuz, las sanciones del Tesoro y la moción en el Congreso no son tres noticias: son el mismo flete del martes. El diésel B5 UV de Petroperú pasó de 12,14 a 23,09 soles. El crudo puede caer un día; el cuello es el combustible refinado.',
    weekLabel: 'N°3 · 25 ago–1 sep 2026',
    publishedAt: '2026-08-31T18:00:00-05:00',
    readingTime: 10,
    cover: '/radar/n3/tapa.png',
    pdf: '/radar/n3/radar-n3.pdf',
    author: 'Phil Taboada',
    category: { name: 'Radar', slug: 'radar' },
    tags: ['radar', 'diesel', 'hormuz', 'flete'],
    toc: [
      { id: 'carta', label: 'Carta del editor', folio: '02' },
      { id: 'senal', label: 'Señal', folio: '03' },
      { id: 'tema', label: 'Tema central · Hormuz', folio: '04' },
      { id: 'mas', label: 'Más notas', folio: '05' },
      { id: 'ranking', label: 'Tablero de precios', folio: '08' },
      { id: 'cierre', label: 'Contratapa', folio: '09' },
    ],
    pages: [
      { file: '/radar/n3/pages/01-tapa.png', label: 'Tapa', folio: '01' },
      { file: '/radar/n3/pages/02-carta.png', label: 'Carta del editor', folio: '02' },
      { file: '/radar/n3/pages/03-senal.png', label: 'Señal', folio: '03' },
      { file: '/radar/n3/pages/04a-tema-apertura.png', label: 'Apertura', folio: '04' },
      { file: '/radar/n3/pages/04b-tema-texto.png', label: 'Relato', folio: '04' },
      { file: '/radar/n3/pages/04c-tema-casos.png', label: 'Cuatro oficios', folio: '04' },
      { file: '/radar/n3/pages/04d-tema-reglas.png', label: 'El arreglo', folio: '04' },
      { file: '/radar/n3/pages/05-mas-noticias.png', label: 'Más notas', folio: '05' },
      { file: '/radar/n3/pages/08-tablero.png', label: 'Tablero de precios', folio: '08' },
      { file: '/radar/n3/pages/09-contratapa.png', label: 'Contratapa', folio: '09' },
    ],
    carta: {
      kicker: 'Carta del editor · N°3 · 25 ago–1 sep 2026',
      title: 'el galón',
      titleEm: 'cerca',
      image: '/radar/n3/img/escena-carta.jpg',
      imageAlt: 'Escritorio de noche: diario abierto y el chat del transportista',
      caption: 'Escritorio de noche. El diario abierto y el chat del que no sale si no carga.',
      paragraphs: [
        'Esta semana no miré otro modelo de laboratorio. Miré el precio del galón y el chat del transportista. El conflicto queda lejos en el mapa y cerca en la bomba. Ormuz, las sanciones del Tesoro y la moción en Lima no son tres noticias: son el mismo flete del martes.',
        'El 24 de agosto el Tesoro de Estados Unidos anunció sanciones a unas 60 personas, entidades y buques iraníes. El mismo día, en el Congreso peruano, Juntos por el Perú pidió interpelar al ministro de Energía y Minas, Guillermo Huamaní, con 57 preguntas. La moción trae sus cifras: el diésel B5 UV de Petroperú pasó de 12,14 soles el 24 de febrero a 23,09 el 11 de agosto. Eso es más 90 por ciento, de ellos, no mío.',
        'Si reparte, cotiza o atiende citas, el lunes no espera a que el crudo baje un día. El cuello no es el barril: es el combustible refinado. El diésel del Golfo por Hormuz va 80 por ciento abajo interanual, según Kpler vía MarketBrief. El camión, la moto y el menú ya lo están cobrando.',
        'Por eso este número no es de palacio ni de otro chat de WhatsApp. Es de mostrador. La política que no lees es la que te cambia el precio antes de que abras la persiana el lunes.',
      ],
      sign: 'Phil',
      meta: 'Phil · agosto 2026',
    },
    senal: {
      kicker: 'Señal · dos notas · 25 / 24 ago',
      image: '/radar/n3/img/escena-senal.jpg',
      imageAlt: 'Estación de servicio de noche: bomba de diésel y moto de reparto',
      notes: [
        {
          kicker: 'Al-Monitor / Tesoro EE.UU. · 25 ago 2026',
          title: 'El estrecho',
          titleEm: 'ya es el camión',
          body: 'El 24 de agosto el Tesoro de Estados Unidos, con Scott Bessent, anunció sanciones a unas 60 personas, entidades y buques iraníes. No llegó a las opciones más duras ni nombró bancos chinos. Habló de un D-Day económico: sacar del sistema dólar a quien lave para Irán. Al día siguiente Irán lo llamó gross lawlessness. Eso no es un mapa. El diésel del Golfo que sale por Hormuz va 80 por ciento abajo interanual, según Kpler vía MarketBrief. El tráfico AIS está 90 por ciento bajo el nivel de antes del conflicto.',
          why: 'Hormuz no es Oriente Medio. Es el flete que sales a cubrir el martes.',
        },
        {
          kicker: 'La República / Congreso · 24 ago 2026',
          title: 'El galón',
          titleEm: 'de la moción',
          body: 'Juntos por el Perú presentó el 24 de agosto una moción para interpelar al ministro de Energía y Minas, Guillermo Huamaní. Son 57 preguntas. La moción trae las cifras: el diésel B5 UV de Petroperú pasó de 12,14 soles el 24 de febrero a 23,09 el 11 de agosto: más 90,2 por ciento. El de Repsol llegó a 24,66, más 103,1 por ciento. Hubo paros y bloqueos en agosto en Ucayali, Loreto, Arequipa y Tacna. El 14 de agosto se anunció un subsidio temporal de 4 soles por galón. El lunes se paga igual, con o sin interpelación.',
          why: 'El 90 por ciento extra es de la moción. El camión lo cobra igual.',
        },
      ],
    },
    tema: {
      kicker: 'Tema central · Hormuz · 24 ago 2026',
      title: 'El estrecho',
      titleEm: 'cierra',
      dek: 'El 24 de agosto el Tesoro sancionó a Irán y el Congreso peruano pidió interpelar por el diésel. El mismo día, dos capitales, un solo precio: el del galón que mueve el camión.',
      image: '/radar/n3/img/escena-apertura.jpg',
      imageAlt: 'Calle de Lima de noche: surtidor de diésel y moto de carga bajo la lluvia',
      lead: 'El crudo puede caer un día.',
      leadEm: 'El cuello es el combustible refinado.',
      paragraphs: [
        'Antes del conflicto, el Estrecho de Ormuz movía cerca de un quinto del petróleo y el GNL del mundo. Hoy está casi cerrado. Irán y Omán hablaron el martes de un corredor de navegación temporal y de limpiar minas. Pakistán media. Nada de eso llena el tanque el lunes. El Brent del 24 cerró en 92,71 dólares, según la EIA; Invezz lo dejó cerca de 93.',
        'MarketBrief, con datos de Kpler, dice que los flujos de diésel del Golfo por Hormuz van 80 por ciento abajo interanual. Economic Times lo dice sin vueltas: el debate del volumen de crudo tapa la escasez real, la de los combustibles refinados. En Lima eso ya no es un gráfico. La moción de Juntos por el Perú pone el diésel B5 UV de Petroperú en 23,09 soles el 11 de agosto, contra 12,14 el 24 de febrero. Repsol, 24,66. Es más 90 y más 103. Cifras de ellos.',
        'Ese galón se traduce. El que reparte cobra el flete o se come el margen. El que cotiza con el precio de ayer firma pérdida. El que atiende un local de barrio ve al cliente quedarse en casa si el pasaje sube. El menú también: gas, delivery, mercadería que llegó más cara. El 14 de agosto se anunció un subsidio temporal de 4 soles por galón. Un parche no es una lista de precios nueva. Recotiza.',
      ],
      quote: 'Petroperú: de 12,14 a 23,09 soles.',
      quoteEm: 'Cifra de la moción, no mía.',
      quoteAttr: 'La cifra del número',
      casesTitle: 'Cuatro oficios',
      cases: [
        {
          num: '01',
          who: 'Reparto · el flete',
          ask: 'El margen se va en diésel',
          text: 'La moto y el camión no esperan a Washington ni al Congreso. Si el galón casi dobló, el viaje que ayer daba para dos encargos hoy da para uno. O subes el flete, o lo escondes en el producto y te comes el margen. El que no recotiza sale a perder desde el primer pedido del martes.',
        },
        {
          num: '02',
          who: 'Citas · el local',
          ask: 'Si el pasaje sube, no viene',
          text: 'El consultorio, el taller y la tienda de barrio no venden petróleo. Venden que alguien cruce la ciudad. Si el pasaje y el taxi pesan más, la cita se cancela o se queda para otro mes. El hueco de la tarde no se llena con un aviso en el grupo.',
        },
        {
          num: '03',
          who: 'Cotiza · el número',
          ask: 'El precio de ayer ya no sirve',
          text: 'La lista de la semana pasada asume un flete que ya no existe. Si mandas esa cifra, estás regalando el tramo o vas a renegociar a los tres días. Separa el costo de mover la mercadería. Dilo.',
        },
        {
          num: '04',
          who: 'Si no carga',
          ask: 'la moto no corre',
          text: 'El transportista que no carga no sale. El 14 de agosto se anunció un subsidio de 4 soles por galón. Eso no llena el tanque si el pedido no cubre el viaje. Si no corre, no hay delivery, no hay mercadería, no hay menú.',
        },
      ],
      oficioImage: '/radar/n3/img/escena-casos.jpg',
      oficioAlt: 'Moto de reparto con caja azul en una estación de diésel de noche',
      closeKicker: 'Tema central · el arreglo',
      closeTitle: 'No esperes',
      closeTitleEm: 'a que baje',
      closeParagraphs: [
        'Recotiza ahora, no cuando baje. El Brent puede caer un día y el titular se pone suave. El tanque no. Arma el número con el diésel de esta semana.',
        'No prometas un horario que ya no da. Separa el flete; no lo escondas. El galón no espera a que termines la cotización de la semana.',
      ],
      closeSign: '— Phil',
      sources: [
        { date: '25 ago 2026', tag: 'Al-Monitor', text: 'Irán responde a sanciones ampliadas del Tesoro EE.UU.' },
        { date: '24 ago 2026', tag: 'La República', text: 'Moción para interpelar al ministro de Energía y Minas por alza de combustibles.' },
        { date: 'EIA / FRED', tag: 'Precios', text: 'Brent, diésel y crack spread · capturas 25 ago 2026.' },
      ],
    },
    mas: {
      kicker: 'Más notas · aranceles · Canadá · facultades',
      title: 'Más notas',
      items: [
        {
          who: '05a · AP / Trump–Xi · 25 ago',
          title: 'el 7,5 aún no está firmado',
          body: 'Associated Press contó el 24 y 25 de agosto que Trump está considerando un arancel de 7,5 por ciento a China por sobrecapacidad, antes de una cumbre con Xi a fines de septiembre. Aún no es gaceta. El que importa repuestos, bazar o tech de China puede ver el precio moverse antes de que el 7,5 esté escrito.',
          why: 'Lo que entra de China puede subir antes de que el arancel exista en papel.',
        },
        {
          who: '05b · CNBC / Canadá · 24 ago',
          title: 'el auto de Canadá es el furgón',
          body: 'Trump amenazó con un 50 por ciento a autos, camiones, partes y acero de Canadá desde el 1 de enero de 2027. El trato se cayó el viernes. Canadá dice que va a responder. El auto no es Detroit: es el taxi, el furgón y la van de reparto.',
          why: 'El 50 por ciento no es un titular de fábrica. Es el taxi y la van.',
        },
        {
          who: '05c · El Peruano / Galarreta · 25 ago',
          title: 'las facultades te cambian la aduana',
          body: 'El premier Galarreta anunció que esta semana entra al Congreso el pedido de facultades legislativas, por menos de 30 días. Seguridad, economía, simplificación, aduanas y El Niño. No es palacio: es si te cambian la regla de aduana y el impuesto mientras estás cotizando un contenedor.',
          why: 'La regla de aduana puede moverse en el mismo plazo en que cotizas.',
        },
      ],
    },
    ranking: {
      kicker: 'Tablero de precios · 25 de agosto de 2026',
      title: 'quién mueve',
      titleEm: 'el galón',
      line: 'No es ranking de modelos: son cierres en dólares. Brent, LLS, WTI y el crack 3:2:1 van por barril. Diésel AAA 5,62 y gasolina 4,10 van en escala por diez (56 y 41) para entrar al 0–100. El crudo puede caer un día; el cuello de esta semana es el combustible refinado.',
      footnote:
        'Capturas del 25 ago 2026. EIA es cierre del 24. FRED Brent va al 18 ago; FRED diésel, al 24. El número de cada fila es precio, no un índice Wavys.',
      rows: [
        { pos: '01', name: 'Brent EIA 24 ago', score: '93' },
        { pos: '02', name: 'Louisiana Light', score: '90' },
        { pos: '03', name: 'WTI', score: '86' },
        { pos: '04', name: 'Crack 3:2:1 Gulf', score: '65' },
        { pos: '05', name: 'Diésel AAA EE.UU.', score: '56' },
        { pos: '06', name: 'Gasolina AAA EE.UU.', score: '41' },
      ],
      charts: [
        {
          src: '/radar/n3/charts/fred-brent.png',
          label: 'Brent · FRED',
          em: 'captura real · FRED · al 18 ago 2026',
          alt: 'Captura real de FRED: serie del Brent',
        },
        {
          src: '/radar/n3/charts/fred-diesel.png',
          label: 'Diésel · FRED',
          em: 'captura real · FRED · al 24 ago 2026',
          alt: 'Captura real de FRED: serie del diésel',
        },
        {
          src: '/radar/n3/charts/eia-prices.png',
          label: 'Precios EIA',
          em: 'captura real · eia.gov · 25 ago 2026',
          alt: 'Captura real de EIA Today in Energy prices',
        },
      ],
    },
    cierre: {
      kicker: 'Contratapa',
      title: 'si no lees',
      titleEm: 'te cobra',
      paragraphs: [
        'La política que no lees es la que te cambia el precio el lunes. No hace falta el mapa: mira el galón, el flete y la lista de ayer.',
        'Hormuz y la moción ya están en el mostrador. Recotiza. Separa el flete. No prometas un horario que el tanque no te deja cumplir.',
        'Si quieres te muestro cómo se ve eso en tu operación. Media hora y listo.',
      ],
      image: '/radar/n3/img/escena-cierre.jpg',
      imageAlt: 'Cierre de noche: mostrador y la calle mojada',
      ctaLabel: 'Media hora · agenda directa',
      ctaUrl: 'https://cal.com/wavys-call/30min',
      sign: 'Nos leemos el viernes que viene.',
    },
  },
  {
    slug: 'radar-n2',
    number: 2,
    title: 'el buzón se come la silla',
    dek: 'Si el teléfono queda en el buzón, 7 de cada 10 no dejan recado.',
    excerpt:
      'Raintree metió IA en la recepción y el cobro. Phil se quedó en otra imagen: el teléfono en el buzón y la silla vacía. ChatGPT no nombra al 91,5% en inmobiliaria, y más de 300 pediatras dejan de vivir el “¿confirmas?” en tres apps.',
    weekLabel: 'N°2 · 14–21 ago 2026',
    publishedAt: '2026-08-21T18:00:00-05:00',
    readingTime: 11,
    cover: '/radar/n2/tapa.png',
    pdf: '/radar/n2/radar-n2.pdf',
    author: 'Phil Taboada',
    category: { name: 'Radar', slug: 'radar' },
    tags: ['radar', 'raintree', 'buzon', 'ia'],
    toc: [
      { id: 'carta', label: 'Carta del editor', folio: '02' },
      { id: 'senal', label: 'Señal', folio: '03' },
      { id: 'tema', label: 'Tema central · la silla vacía', folio: '04' },
      { id: 'mas', label: 'Más notas', folio: '05' },
      { id: 'ranking', label: 'Tablero de IA', folio: '08' },
      { id: 'cierre', label: 'Contratapa', folio: '09' },
    ],
    pages: [
      { file: '/radar/n2/pages/01-tapa.png', label: 'Tapa', folio: '01' },
      { file: '/radar/n2/pages/02-carta-del-editor.png', label: 'Carta del editor', folio: '02' },
      { file: '/radar/n2/pages/03-senal.png', label: 'Señal', folio: '03' },
      { file: '/radar/n2/pages/04a-tema-central-apertura.png', label: 'Apertura', folio: '04' },
      { file: '/radar/n2/pages/04b-tema-central-relato.png', label: 'Relato', folio: '04' },
      { file: '/radar/n2/pages/04c-tema-central-casos.png', label: 'Lo que se decide', folio: '04' },
      { file: '/radar/n2/pages/04d-tema-central-cita-datos.png', label: 'Cita y datos', folio: '04' },
      { file: '/radar/n2/pages/04e-tema-central-reglas.png', label: 'Cierre del tema', folio: '04' },
      { file: '/radar/n2/pages/05-mas-noticias.png', label: 'Más notas', folio: '05' },
      { file: '/radar/n2/pages/08-tablero-ia.png', label: 'Tablero de IA', folio: '08' },
      { file: '/radar/n2/pages/09-contratapa.png', label: 'Contratapa', folio: '09' },
    ],
    carta: {
      kicker: 'Carta del editor · N°2 · 14–21 ago 2026',
      title: 'el buzón',
      titleEm: 'se queda',
      image: '/radar/n2/img/escena-carta.jpg',
      imageAlt: 'Escritorio de noche: carta impresa, lapicero y la base de un teléfono',
      caption: 'El escritorio donde se arma el número. La carta primero, el teléfono al lado.',
      paragraphs: [
        'Soy Phil. Esta es la segunda revista que te escribo.',
        'Esta semana, en Twitter, me paré en una clínica que metió IA en la recepción y en el cobro: reagenda, llama al que no vino y mira el seguro. Yo me quedé en otra imagen: el teléfono en el buzón y la silla vacía. Si 7 de cada 10 no dejan recado, el hueco de la agenda no es un “no contesté”: ya se fue.',
        'Por eso este número. Te dejo lo que vi: el buzón que se come la silla, el negocio que ChatGPT no nombra, y los papás que dejan de vivir en tres chats. Al final, el ranking de modelos de esta semana.',
      ],
      sign: 'Phil',
      meta: 'Phil · agosto 2026',
    },
    senal: {
      kicker: 'Señal · tres notas · 20 / 19 / 18 ago',
      image: '/radar/n2/img/escena-recepcion.jpg',
      imageAlt: 'El lado de trabajo del mostrador: teléfono, cuaderno y bandeja en blanco',
      notes: [
        {
          kicker: 'Inman · inmobiliaria · 20 ago 2026',
          title: 'ChatGPT',
          titleEm: 'no te nombra',
          body: 'En 37.500 búsquedas de inmobiliaria, el 91,5% de agentes con web no apareció ni una vez. El lead nuevo pregunta a ChatGPT. Si no sales, el portal y el WhatsApp del asesor ya no te salvan.',
          why: 'Si ChatGPT no te nombra, el cliente nuevo no llega a tu chat.',
        },
        {
          kicker: 'Luma + PCC · pediatría · 19 ago 2026',
          title: '3 apps',
          titleEm: 'ya no',
          body: 'Luma y PCC metieron recordatorios y mensajes adentro del sistema del consultorio en más de 300 pediatras. Más de 30 idiomas. Por niño, no por número. El “¿confirmas?” deja de perderse entre Excel y WhatsApp.',
          why: 'Si el recordatorio no entra al sistema del consultorio, vive en el chat y se pierde.',
        },
        {
          kicker: 'PolyAI · 18 ago 2026',
          title: 'sin hold',
          titleEm: 'confirma',
          body: 'Más de 1.100 consultorios confirman y mueven la cita por voz o chat, y eso entra al sistema. La recepción deja de pasar el mismo mensaje de la agenda al WhatsApp a mano.',
          why: 'Si la confirmación no entra sola a la agenda, alguien la pasa a mano y se atrasa.',
        },
      ],
    },
    tema: {
      kicker: 'Tema central · Raintree · 20 ago 2026',
      title: 'la silla',
      titleEm: 'vacía',
      dek: 'El teléfono queda en el buzón. La silla se queda vacía.',
      image: '/radar/n2/img/escena-telefono.jpg',
      imageAlt: 'Teléfono de escritorio con la luz de recado prendida y una silla vacía al fondo',
      lead: 'El teléfono queda en el buzón.',
      leadEm: 'La silla se queda vacía.',
      paragraphs: [
        'El 20 de agosto Raintree metió IA en la recepción y en el cobro: reagenda, llama al que no vino y mira el seguro.',
        'No lo leí como “otra herramienta de clínica”. Lo leí así: el lunes, si tu consultorio sigue dejando el teléfono en el buzón, 7 de cada 10 no dejan recado. Ese hueco de la agenda ya se decidió. No es que el paciente “no llamó otra vez”. Es que nadie lo agarró a tiempo.',
        'En una clínica que todavía camina con WhatsApp y una hoja, el buzón no es un detalle. Es la silla vacía a las 10. Es el cobro que se atrasa porque nadie llamó al que faltó. Es el seguro que se mira después, cuando el paciente ya no está.',
      ],
      quote: '7 de cada 10',
      quoteEm: 'no dejan recado.',
      quoteAttr: 'La cifra del número',
      casesTitle: 'Lo que se decide',
      cases: [
        {
          num: '01',
          who: 'La agenda',
          ask: 'La silla vacía a las 10',
          text: 'La cita existe en el papel. El paciente nunca supo que había que confirmar. El hueco ya se decidió cuando nadie contestó.',
        },
        {
          num: '02',
          who: 'El cobro',
          ask: 'Nadie llamó al que faltó',
          text: 'El cobro se atrasa porque la llamada cayó al buzón. No es un detalle de recepción: es plata que no entra el lunes.',
        },
        {
          num: '03',
          who: 'El seguro',
          ask: 'Se mira cuando ya no está',
          text: 'El seguro se revisa después, cuando el paciente ya se fue. El mismo buzón, cobrado tres veces.',
        },
      ],
      oficioImage: '/radar/n2/img/escena-silla.jpg',
      oficioAlt: 'Sala de espera: una silla vacía salida de la fila',
      closeKicker: 'Cierre del tema · Raintree',
      closeTitle: 'El trabajo útil no es',
      closeTitleEm: '“poner IA”',
      closeParagraphs: [
        'Es que el teléfono no se coma la silla.',
        'Cuenta cuántas llamadas cayeron al buzón el lunes pasado y cuántas sillas quedaron vacías. El número es el mismo.',
      ],
      closeSign: '— Phil',
      sources: [
        { date: '20 ago 2026', tag: 'Raintree', text: 'IA en recepción y cobro: reagenda, llama al que no vino, mira el seguro.' },
        { date: 'prnewswire.com', tag: 'Fuente', text: 'Raintree · 20 ago 2026' },
      ],
    },
    mas: {
      kicker: 'Más notas · Claude · OneKey · Overjet',
      title: 'Más notas',
      items: [
        {
          who: '05a · Claude · 14 ago',
          title: 'el texto deja huella',
          body: 'Anthropic metió una marca invisible en el texto que arma Claude. El presupuesto o el consentimiento que salió de ahí se puede detectar. Si se lo mandas al paciente o al comprador, alguien más puede saber que lo escribió una IA.',
          why: 'Si lo firmas tú, alguien puede saber que no lo escribiste.',
        },
        {
          who: '05b · OneKey · 14 ago',
          title: '40 minutos menos',
          body: 'OneKey MLS con Ocusell: hasta 70 campos, fotos en orden, textos con IA y chequeo de reglas, gratis para 42.000 suscriptores en Nueva York. El inventario deja de vivir 40 minutos en un WhatsApp con 12 fotos.',
          why: 'Si el aviso se arma en el chat, el lunes se te va la mañana.',
        },
        {
          who: '05c · Overjet · 17 ago',
          title: 'se dicta, entra solo',
          body: 'Overjet Voice: el examen va al odontograma y al sistema (Dentrix, Eaglesoft, Open Dental…) sin hardware nuevo. Deja de reconstruirse de memoria a las 8 de la noche.',
          why: 'Si el examen vive en tu cabeza hasta la noche, el lunes empieza atrasado.',
        },
      ],
    },
    ranking: {
      kicker: 'Tablero de IA · 21 de agosto de 2026',
      title: 'quién contesta',
      titleEm: 'primero',
      line: 'Arriba siguen los mismos de siempre. Pero el que más sabe no es el que contesta: Claude Opus 5 tarda 42,96 segundos en soltar el primer trozo y GLM-5.3 tarda 1,89. Si lo que te falta es que alguien atienda, el puesto del ranking no es el número que te cambia el lunes. Es el segundo.',
      footnote:
        'Índice de terceros. No es de Wavys. Una fila por casa: la mejor variante. Artificial Analysis, capturado el 21 ago 2026.',
      rows: [
        { pos: '01', name: 'Claude Opus 5', score: '63' },
        { pos: '02', name: 'Claude Fable 5', score: '62' },
        { pos: '03', name: 'GPT-5.6 Sol', score: '61' },
        { pos: '04', name: 'Grok 4.6', score: '61' },
        { pos: '05', name: 'GLM-5.3', score: '60' },
        { pos: '06', name: 'Qwen3.8 Max', score: '58' },
        { pos: '07', name: 'Gemini 3.7 Flash', score: '56' },
      ],
      charts: [
        {
          src: '/radar/n2/charts/aa-output-speed.png',
          label: 'Velocidad de salida',
          em: 'captura real · tokens/s · AA · 21 ago 2026',
          alt: 'Captura real de Artificial Analysis: output speed en tokens por segundo',
        },
        {
          src: '/radar/n2/charts/aa-leaderboard.png',
          label: 'LLM Leaderboard, primeras filas',
          em: 'captura real · artificialanalysis.ai · 21 ago 2026',
          alt: 'Captura real del leaderboard de modelos de Artificial Analysis',
        },
        {
          src: '/radar/n2/charts/aa-intelligence-bars.png',
          label: 'Highlights · Intelligence · Speed · Cost',
          em: 'captura real · AA · 21 ago 2026',
          alt: 'Captura real de los highlights de Artificial Analysis',
        },
      ],
    },
    cierre: {
      kicker: 'Contratapa',
      title: 'la silla',
      titleEm: 'no espera',
      paragraphs: [
        'Si el teléfono se come la silla, el resto del número ya te dijo por dónde se decide el lunes.',
        'Si quieres te muestro cómo se ve eso en tu operación. Media hora y listo.',
      ],
      image: '/radar/n2/img/escena-cierre.jpg',
      imageAlt: 'Recepción de noche: teléfono en el mostrador y una silla vacía',
      ctaLabel: 'Media hora · agenda directa',
      ctaUrl: 'https://cal.com/wavys-call/30min',
      sign: 'Nos leemos el viernes que viene.',
    },
  },
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
      lead: 'Creo varios. Se hablan.',
      leadEm: 'Yo doy el ok.',
      paragraphs: [
        'Grok Bot salió el 11 de agosto, todavía en prueba (beta). No lo uso como un chat más. Lo uso así: creo varios bots (compañeros de trabajo). Uno busca. Otro escribe. Otro revisa. Se conectan entre ellos. Se hablan. Se pasan el trabajo. Deciden. Vuelven a intentar. Mejoran. Yo no estoy en cada ida y vuelta. Yo doy el ok. Sin mi ok, no sale.',
        'Yo lo uso para armar Wavys. La revista. Los textos. El día. A veces falla. Lo sigo usando. Porque cuando el trabajo deja de vivir solo en mi cabeza, el lunes ya no empieza desde cero.',
      ],
      quote: 'Ellos se hablan.',
      quoteEm: 'Yo doy el ok.',
      quoteAttr: 'Phil · sobre Grok Bot',
      casesTitle: 'Cómo lo uso',
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
      closeKicker: 'Grok Bot · cierre del tema',
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
      footnote:
        'Índice de terceros, no de Wavys. Gemini 3.7 Flash no tiene puesto acá: aparece en los gráficos de costo y velocidad.',
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
