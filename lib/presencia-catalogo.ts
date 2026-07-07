import { WHATSAPP_NUMBER } from "@/lib/presencia-promo";

export type CatalogoTierId = "gratis" | "start" | "grow" | "max";

export type CatalogoTier = {
  id: CatalogoTierId;
  name: string;
  price: string;
  priceLabel: string;
  products: number;
  productsLabel: string;
  note: string;
  highlight: boolean;
  cta: string;
};

export const CATALOGO_SETUP_FEE = "350";
export const CATALOGO_SETUP_LABEL = "S/350";

export const CATALOGO_TIERS: readonly CatalogoTier[] = [
  {
    id: "gratis",
    name: "Gratis",
    price: "0",
    priceLabel: "Gratis",
    products: 10,
    productsLabel: "10",
    note: "Para arrancar sin costo",
    highlight: false,
    cta: "Empezar gratis",
  },
  {
    id: "start",
    name: "Start",
    price: "69",
    priceLabel: "S/69",
    products: 200,
    productsLabel: "200",
    note: "12 meses · diseño Wavys",
    highlight: false,
    cta: "Quiero Start",
  },
  {
    id: "grow",
    name: "Grow",
    price: "99",
    priceLabel: "S/99",
    products: 500,
    productsLabel: "500",
    note: "12 meses · catálogo amplio",
    highlight: true,
    cta: "Quiero Grow",
  },
  {
    id: "max",
    name: "Max",
    price: "159",
    priceLabel: "S/159",
    products: 2000,
    productsLabel: "2.000",
    note: "12 meses · máximo volumen",
    highlight: false,
    cta: "Quiero Max",
  },
] as const;

/** Tier según cantidad de productos que el cliente indica */
export function getCatalogoTierForCount(count: number): CatalogoTier {
  const n = Math.max(1, Math.min(2000, Math.round(count)));
  if (n <= 10) return CATALOGO_TIERS[0];
  if (n <= 200) return CATALOGO_TIERS[1];
  if (n <= 500) return CATALOGO_TIERS[2];
  return CATALOGO_TIERS[3];
}

/** Formato fijo — evita mismatch de hidratación con toLocaleString */
export function formatProductCount(count: number): string {
  if (count < 1000) return String(count);
  return `${Math.floor(count / 1000)}.${String(count % 1000).padStart(3, "0")}`;
}

export function catalogoWhatsappHrefForCount(count: number): string {
  const tier = getCatalogoTierForCount(count);
  const n = formatProductCount(Math.round(count));
  const text =
    tier.id === "gratis"
      ? `Hola, quiero Presencia Catálogo Gratis. Tengo aprox. ${n} productos. ¿Me pueden ayudar?`
      : `Hola, quiero Presencia Catálogo ${tier.name}. Tengo aprox. ${n} productos (${tier.priceLabel}/mes). ¿Me pueden dar más información?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const CATALOGO_SLIDER_MIN = 1;
export const CATALOGO_SLIDER_MAX = 2000;
export const CATALOGO_TIER_MARKS = [10, 200, 500, 2000] as const;

export const CATALOGO_SUMMARY_ITEMS = [
  "Panel sencillo — agrega productos en minutos",
  "Consulta por WhatsApp · sin carrito ni comisiones",
  "Gratis 10 productos · planes hasta 2.000",
] as const;

export const CATALOGO_INCLUDES = [
  "Catálogo web con diseño Wavys",
  "Panel sencillo — agrega productos en minutos",
  "Categorías, búsqueda y ficha de producto",
  "Consultar por WhatsApp (sin carrito)",
  "Dominio, hosting, SSL y SEO técnico",
  "Métricas del negocio",
  "Soporte mensual",
] as const;

export const CATALOGO_FEATURES = [
  {
    num: "01",
    title: "Sencillo de rellenar",
    body: "Nombre, precio, foto y categoría. Agrega uno a uno o importa tu listado inicial — sin complicaciones.",
  },
  {
    num: "02",
    title: "Visible en Google",
    body: "Tus productos indexables en la web — no solo fotos sueltas en WhatsApp o stories.",
  },
  {
    num: "03",
    title: "Consulta directa",
    body: "Cada producto con botón a WhatsApp. El cliente pregunta; tú cierras como siempre — Yape, Plin o transferencia.",
  },
  {
    num: "04",
    title: "Sin carrito ni comisiones",
    body: "No es e-commerce: no hay checkout ni % por venta. Solo vitrina digital ordenada.",
  },
  {
    num: "05",
    title: "Crece con tu negocio",
    body: "Empieza gratis con 10 productos y sube de plan cuando tu catálogo crece — hasta 2.000 productos.",
  },
  {
    num: "06",
    title: "Tú lo administras",
    body: "Activa, edita u oculta productos desde el panel. Cambios menores incluidos en soporte mensual.",
  },
] as const;

export const CATALOGO_FAQ = [
  {
    q: "¿Es una tienda online?",
    a: "No. Presencia Catálogo es una vitrina web para ver productos y consultar por WhatsApp. Si necesitas carrito y pedido automático, el plan es Presencia Tienda.",
  },
  {
    q: "¿Qué incluye el plan Gratis?",
    a: "Hasta 10 productos, catálogo web básico y consultas por WhatsApp. Ideal para probar antes de subir a un plan de pago con dominio propio y diseño editorial completo.",
  },
  {
    q: "¿Cómo agrego productos?",
    a: "Desde un panel sencillo: foto, nombre, precio (o «consultar»), categoría y descripción corta. Nosotros te capacitamos en la entrega.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí. Si tu catálogo crece, subes de Start a Grow o Max. Te ayudamos con la migración sin perder lo que ya cargaste.",
  },
  {
    q: "¿Cuánto tarda la entrega?",
    a: "Plan Gratis: activación rápida. Planes de pago: 7–10 días hábiles desde brief confirmado y primer pago.",
  },
  {
    q: "¿Hay costo de setup?",
    a: "Planes de pago incluyen un setup inicial de S/350 (diseño, build y publicación del catálogo). El plan Gratis no tiene setup.",
  },
] as const;

export function catalogoWhatsappHref(tierId?: CatalogoTierId): string {
  const tier = tierId ? CATALOGO_TIERS.find((t) => t.id === tierId) : undefined;
  const text = tier
    ? tier.id === "gratis"
      ? "Hola, quiero empezar con Presencia Catálogo Gratis (10 productos). ¿Me pueden ayudar?"
      : `Hola, quiero Presencia Catálogo ${tier.name} (${tier.productsLabel} productos · ${tier.priceLabel}/mes). ¿Me pueden dar más información?`
    : "Hola, quiero información sobre Presencia Catálogo. ¿Qué plan me recomiendan según mi cantidad de productos?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const CATALOGO_PAGE_PATH = "/presencia-catalogo";
