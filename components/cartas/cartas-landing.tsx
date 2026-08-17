import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ArrowIcon } from "@/components/icons";
import { CARTA_OFERTA } from "@/lib/carta-oferta";
import { CARTA_DEMO_PATH } from "@/lib/fumanchu";
import { BOOKING_HREF } from "@/lib/site";

export function CartasLanding() {
  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden">
        <Image
          src="/carta/fumanchu/mesa.webp"
          alt="Mesa de noche: celular al lado del QR, el plato en la pantalla"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070604] via-[#070604]/70 to-[#070604]/25" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:px-12">
          <p className="section-label">Carta digital</p>
          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.05em]">
            {CARTA_OFERTA.headline}
          </h1>
          <p className="mt-6 max-w-[36rem] text-pretty text-[1.08rem] leading-8 text-[var(--cream-soft)]/85">
            {CARTA_OFERTA.deck}
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href={BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cal-click
            >
              <span>Agendar llamada 30 min</span>
              <ArrowIcon className="h-4 w-4" />
            </a>
            <Link href={CARTA_DEMO_PATH} className="btn-ghost">
              Así se ve en el celular
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <ol className="grid gap-5 md:grid-cols-3">
          {CARTA_OFERTA.points.map((item, index) => (
            <li
              key={item.title}
              className="rounded-[1.3rem] border border-[var(--line)] bg-[var(--surface)] p-6"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-display text-[1.45rem] font-bold tracking-[-0.03em]">
                {item.title}
              </h2>
              <p className="mt-3 text-[1rem] leading-7 text-[var(--cream-soft)]/75">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[40rem] text-[1rem] leading-8 text-[var(--cream-soft)]/70">
          {CARTA_OFERTA.vsGeneric}
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12">
        <p className="section-label">Ya tocamos gastronomía</p>
        <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em]">
          La Alcoba. Atmósfera, no un molde.
        </h2>
        <p className="mt-4 max-w-[36rem] text-[1.02rem] leading-8 text-[var(--cream-soft)]/75">
          Pieza viva con atmósfera de marca. No es una carta QR. Sirve para ver la mano. El menú con
          video se ve en la demo del celular.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/trabajo/la-alcoba" className="btn-ghost">
            Ver La Alcoba
          </Link>
          <Link href={CARTA_DEMO_PATH} className="btn-ghost">
            Abrir la carta en el celular
          </Link>
        </div>
      </section>

      <CtaBand kicker="Siguiente paso" title={CARTA_OFERTA.cta} />
    </>
  );
}
