import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Inversión",
  description:
    "Cotización tras diagnóstico. Proyecto por fases o retainer. El alcance se cierra en la llamada de 30 minutos.",
  alternates: { canonical: "/inversion" },
};

export default function InversionPage() {
  return (
    <>
      <PageHero
        kicker="Inversión"
        title="Cotizamos después de entender el cuello de botella."
        lede="Alcance, plazos e integraciones se cierran en una llamada de 30 minutos. Proyecto por fases o retainer, según lo que el negocio necesite sostener."
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <article className="border-t border-[var(--line-strong)] pt-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Web
            </p>
            <p className="mt-4 font-display text-[1.6rem] font-semibold tracking-[-0.03em]">
              Dirección visual, copy y un camino claro a contacto.
            </p>
            <p className="mt-6 text-[0.98rem] leading-7 text-[var(--cream-soft)]/75">
              Landing o site. Una landing estratégica suele tomar 3–5 semanas; un
              site corporativo, 5–8. El alcance se define en el diagnóstico.
            </p>
          </article>
          <article className="border-t border-[var(--line-strong)] pt-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Sistemas
            </p>
            <p className="mt-4 font-display text-[1.6rem] font-semibold tracking-[-0.03em]">
              Paneles, integraciones y software operativo.
            </p>
            <p className="mt-6 text-[0.98rem] leading-7 text-[var(--cream-soft)]/75">
              Para equipos que ya operan. Un sistema a medida arranca desde 8
              semanas. Cotizamos lo que hay que construir, no un paquete genérico.
            </p>
          </article>
        </div>
        <div className="mt-12 max-w-[40rem] border-t border-[var(--line)] pt-10">
          <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">
            Cómo se cierra
          </h2>
          <ul className="mt-5 space-y-3 text-[1rem] leading-7 text-[var(--cream-soft)]/75">
            <li>Diagnóstico de 30 minutos. Si no hay fit, lo decimos.</li>
            <li>Propuesta con alcance, plazos y modelo (proyecto o retainer).</li>
            <li>No trabajamos idea stage. Buscamos operación real.</li>
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
