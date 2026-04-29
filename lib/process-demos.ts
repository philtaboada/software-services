import type { ProcessVisualVariant } from "@/components/process-pipeline-visual";

export type ProcessDemoSlug = ProcessVisualVariant;

export type ProcessDemoEntry = {
  readonly slug: ProcessDemoSlug;
  readonly variant: ProcessVisualVariant;
  readonly title: string;
  readonly description: string;
};

export const PROCESS_DEMO_ENTRIES: readonly ProcessDemoEntry[] = [
  {
    slug: "web-scraping",
    variant: "web-scraping",
    title: "Web scraping",
    description:
      "Tarjeta producto + barrido con línea y partículas, filas con acento, paquetes en arco hacia el panel JSON, bloom y dot de stream.",
  },
  {
    slug: "ai-automation",
    variant: "ai-automation",
    title: "IA + automatización",
    description:
      "Chat, indicador de escritura, respuesta con gradiente y tarjeta de contexto. Referencia para timing y estados.",
  },
  {
    slug: "discovery-design",
    variant: "discovery-design",
    title: "Discovery y diseño",
    description:
      "Brief con lo pedido, notas de discovery y un artboard donde el wireframe baja fidelidad se convierte en mockup (hero, tres planes y CTA).",
  },
  {
    slug: "deploy",
    variant: "deploy",
    title: "Deploy",
    description:
      "Pipeline (push → build → edge), trayectoria con haz, partículas al PROD, nube con gradiente y micro-servicios, doble onda de impacto y badge Live.",
  },
  {
    slug: "create",
    variant: "create",
    title: "Crear / entrega",
    description:
      "Anillos, chispas y check con trazo. Demo del cierre del ciclo.",
  },
];

/**
 * Resuelve la entrada de demo por segmento de URL.
 */
export function getProcessDemoBySlug(slug: string): ProcessDemoEntry | undefined {
  return PROCESS_DEMO_ENTRIES.find((e) => e.slug === slug);
}

/**
 * Índice del slug en el listado (para navegación prev/next).
 */
export function getProcessDemoIndex(slug: string): number {
  return PROCESS_DEMO_ENTRIES.findIndex((e) => e.slug === slug);
}
