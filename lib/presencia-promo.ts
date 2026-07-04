export const WHATSAPP_NUMBER = "51922175052";

export const PRESENCIA_PROMO_DISMISS_KEY = "wavys-presencia-promo-dismissed";

export type PresenciaPlanName = "Presencia" | "Presencia Tienda";

export function whatsappHref(plan?: PresenciaPlanName): string {
  const text =
    plan === "Presencia Tienda"
      ? "Hola, quiero el plan Presencia Tienda (catálogo + carrito a WhatsApp). ¿Me pueden dar más información?"
      : plan === "Presencia"
        ? "Hola, quiero el plan Presencia de Presencia Digital. ¿Me pueden dar más información?"
        : "Hola, quiero información sobre Presencia Digital. ¿Qué plan me recomiendan — Presencia o Presencia Tienda?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const PRESENCIA_PROMO_PLANS = [
  {
    id: "presencia",
    name: "Presencia",
    price: "149",
    note: "Landing · 12 meses",
    highlight: false,
    plan: "Presencia" as const,
    perks: ["Fotos Essential", "Dominio + hosting"],
  },
  {
    id: "tienda",
    name: "Presencia Tienda",
    price: "229",
    note: "E-commerce · 12 meses",
    highlight: true,
    plan: "Presencia Tienda" as const,
    perks: ["Catálogo autogestionable", "Pedido a WhatsApp"],
  },
] as const;

export const PRESENCIA_PROMO_INCLUDES = [
  "Landing o tienda premium (no plantilla)",
  "Dominio + hosting + SSL",
  "SEO + WhatsApp + formulario",
  "Pixel Meta + Google Tag",
  "Todo el Perú · soporte mensual",
] as const;
