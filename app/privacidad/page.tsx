import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, NAP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad de Wavys Technologies.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Privacidad"
        lede="Cómo tratamos los datos que nos envías al escribir o al agendar una llamada."
      />
      <article className="mx-auto max-w-[720px] px-5 pb-28 text-[1rem] leading-8 text-[var(--cream-soft)]/80 sm:px-8">
        <p>
          {NAP.name} ({NAP.city}) es responsable del tratamiento de los datos que
          recibimos por correo, formularios o la herramienta de agendamiento.
        </p>
        <h2 className="mt-10 font-display text-[1.4rem] font-semibold text-[var(--cream)]">
          Qué recogemos
        </h2>
        <p className="mt-4">
          Nombre, correo, empresa y el contexto del proyecto que nos cuentes.
          Si agendas una llamada, el proveedor de calendario trata esos datos
          según su propia política.
        </p>
        <h2 className="mt-10 font-display text-[1.4rem] font-semibold text-[var(--cream)]">
          Para qué
        </h2>
        <p className="mt-4">
          Responder, cotizar y ejecutar el trabajo. No vendemos listas. No
          usamos tus datos para publicidad de terceros.
        </p>
        <h2 className="mt-10 font-display text-[1.4rem] font-semibold text-[var(--cream)]">
          Conservación y derechos
        </h2>
        <p className="mt-4">
          Guardamos lo necesario para la relación comercial y obligaciones
          legales. Puedes pedir acceso, corrección o eliminación escribiendo a{" "}
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
