import type { CapabilityVisualVariant } from "@/components/capability-visual";

export type CapabilityDemoSlug = "web" | "mobile" | "systems" | "brand";

export type CapabilityDemoEntry = {
  readonly slug: CapabilityDemoSlug;
  readonly variant: CapabilityVisualVariant;
  readonly title: string;
  readonly description: string;
};

/**
 * Cada entrada describe la animación de la escena para humanos y para agentes:
 * qué cuenta el loop y qué nodos GSAP protagonizan.
 */
export const CAPABILITY_DEMO_ENTRIES = [
  {
    slug: "web",
    variant: "cap-web",
    title: "WEB · de caos a conversión",
    description:
      "Guion ~24s: (1) Hook «¿Tu web se ve así?» con layout caótico, shake y glitch. (2) Problema «Mucho ruido…», scroll sin foco y CTAs muertos. (3) WOW: colapso + zoom + «Aquí está la clave». (4) Solución: hero limpio, headline palabra a palabra, CTA con pulso. (5) Cierre «Creamos landings que convierten».",
  },
  {
    slug: "mobile",
    variant: "cap-mobile",
    title: "MOBILE · UX en ~27s",
    description:
      "Guion ~27s. En el panel: 3 siluetas manuales (palma suave / contorno lineal / cuna geométrica). (1) Hook — mano detrás del móvil, entrada, dispositivo+splash; mano se retira al flujo. (2) Flujos claros — tap, scroll, sheet iOS. (3) Sensación — overlay ✔. (4) Métricas — barras y tendencia. (5) Cierre + «UX que convierte».",
  },
  {
    slug: "systems",
    variant: "cap-systems",
    title: "SYSTEMS · de caos a sistema (~40s)",
    description:
      "Siete actos: (1) Hook — notificaciones WA/Mail/Slack explotando. (2) Problema — chats «¿Quién vio…?» y tareas perdidas. (3) Quiebre — congelación + velo. (4) Estructura — kanban pendiente/proceso/listo y conectores. (5) Automatización — orbe lead→asigna→avisa→agenda. (6) KPIs en calma. (7) Cierre — software interno que escala.",
  },
  {
    slug: "brand",
    variant: "cap-brand",
    title: "BRAND · sistema visual (~36s)",
    description:
      "Seis actos: (1) Hook — letras sueltas y tipos/colores incoherentes. (2) Problema — botones y espaciados que no encajan. (3) Orden — tipografía unificada, paleta reducida, grilla. (4) Sistema — botón/input/card y la misma pieza en otra pantalla. (5) Escala — cuatro vistas que aparecen en bloque. (6) Cierre — diseño que aguanta el crecimiento.",
  },
] as const satisfies readonly CapabilityDemoEntry[];

export function getCapabilityDemoBySlug(slug: string): CapabilityDemoEntry | undefined {
  return CAPABILITY_DEMO_ENTRIES.find((e) => e.slug === slug);
}

export function getCapabilityDemoIndex(slug: string): number {
  return CAPABILITY_DEMO_ENTRIES.findIndex((e) => e.slug === slug);
}
