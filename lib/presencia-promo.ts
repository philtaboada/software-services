export const WHATSAPP_NUMBER = "51922175052";

export const PRESENCIA_PROMO_DISMISS_KEY = "wavys-presencia-promo-dismissed";

export type PresenciaPlanName = "Presencia" | "Presencia Pro" | "Flex";

export function whatsappHref(plan?: PresenciaPlanName): string {
  const text = plan
    ? `Hola, quiero el plan ${plan} de Presencia Digital. ¿Me pueden dar más información?`
    : "Hola, quiero información sobre Presencia Digital. ¿Qué plan me recomiendan?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const PRESENCIA_PROMO_PLANS = [
  {
    id: "presencia",
    name: "Presencia",
    price: "149",
    note: "12 meses",
    highlight: false,
    plan: "Presencia" as const,
    perks: ["Fotos Essential", "Dominio + hosting"],
  },
  {
    id: "pro",
    name: "Presencia Pro",
    price: "189",
    note: "Más elegido",
    highlight: true,
    plan: "Presencia Pro" as const,
    perks: ["Sesión foto presencial", "Entrega 5 días"],
  },
  {
    id: "flex",
    name: "Flex",
    price: "199",
    note: "Sin permanencia",
    highlight: false,
    plan: "Flex" as const,
    perks: ["Cancela cuando quieras", "Misma calidad"],
  },
] as const;

export const PRESENCIA_PROMO_INCLUDES = [
  "Landing premium (no plantilla)",
  "Pack Foto Essential incluido",
  "Dominio + hosting + SSL",
  "SEO + WhatsApp + formulario",
  "Entrega en 5–7 días · Todo el Perú",
] as const;
