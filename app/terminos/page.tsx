import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, NAP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos",
  description: "Términos de uso del sitio de Wavys Technologies.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Términos"
        lede="Condiciones de uso de este sitio. El contrato de un proyecto se firma aparte."
      />
      <article className="mx-auto max-w-[720px] px-5 pb-28 text-[1rem] leading-8 text-[var(--cream-soft)]/80 sm:px-8">
        <p>
          Este sitio informa sobre los servicios de {NAP.name}. El contenido es
          orientativo. Un proyecto arranca con propuesta, alcance y acuerdo
          por escrito.
        </p>
        <h2 className="mt-10 font-display text-[1.4rem] font-semibold text-[var(--cream)]">
          Propiedad
        </h2>
        <p className="mt-4">
          Marca, textos, capturas y código de este sitio pertenecen a Wavys
          Technologies, salvo el trabajo de clientes mostrado con su
          autorización. No copies piezas como si fueran plantilla.
        </p>
        <h2 className="mt-10 font-display text-[1.4rem] font-semibold text-[var(--cream)]">
          Cotización
        </h2>
        <p className="mt-4">
          Este sitio no publica precios. El monto de un proyecto se acuerda por
          escrito tras el diagnóstico.
        </p>
        <h2 className="mt-10 font-display text-[1.4rem] font-semibold text-[var(--cream)]">
          Contacto
        </h2>
        <p className="mt-4">
          {NAP.city}.{" "}
          <a href={CONTACT_EMAIL_HREF} className="text-[var(--accent)]">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-10 text-[0.9rem] text-[var(--muted)]">Actualizado: agosto 2026.</p>
      </article>
    </>
  );
}
