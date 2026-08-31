import Image from "next/image";
import { ArrowIcon } from "@/components/icons";
import { CARTA_OFERTA } from "@/lib/carta-oferta";
import { BOOKING_HREF } from "@/lib/site";

function BookingCta({ className }: { className?: string }) {
  return (
    <a
      href={BOOKING_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "btn-primary"}
      data-cal-click
    >
      <span>{CARTA_OFERTA.ctaLabel}</span>
      <ArrowIcon className="h-4 w-4" />
    </a>
  );
}

export function CartaDigitalLanding() {
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
          <p className="section-label">{CARTA_OFERTA.label}</p>
          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.05em]">
            {CARTA_OFERTA.headline}
          </h1>
          <p className="mt-6 max-w-[36rem] text-pretty text-[1.08rem] leading-8 text-[var(--cream-soft)]/85">
            {CARTA_OFERTA.deck}
          </p>
          <div className="mt-9 flex flex-col items-start gap-3">
            <BookingCta />
            <p className="text-[0.9rem] text-[var(--cream-soft)]/60">{CARTA_OFERTA.ctaHint}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <article className="border-t border-[var(--line-strong)] pt-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              {CARTA_OFERTA.queEs.title}
            </p>
            <p className="mt-5 text-[1.05rem] leading-8 text-[var(--cream-soft)]/80">
              {CARTA_OFERTA.queEs.body}
            </p>
          </article>
          <article className="border-t border-[var(--line-strong)] pt-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              {CARTA_OFERTA.queNoEs.title}
            </p>
            <p className="mt-5 text-[1.05rem] leading-8 text-[var(--cream-soft)]/80">
              {CARTA_OFERTA.queNoEs.body}
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <p className="section-label">Tres cosas</p>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
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
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="max-w-[40rem] border-t border-[var(--line-strong)] pt-10">
          <p className="section-label">Piloto</p>
          <p className="mt-5 text-[1.08rem] leading-8 text-[var(--cream-soft)]/85">
            {CARTA_OFERTA.piloto}
          </p>
        </div>
      </section>

      <section className="relative px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="relative mx-auto min-h-[22rem] max-w-[1440px] overflow-hidden rounded-[1.5rem] border border-[var(--line)]">
          <Image
            src="/images/studio/studio-circuit-wave.jpg"
            alt=""
            fill
            sizes="1440px"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-[#000908]/55" />
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
            <p className="section-label">Siguiente paso</p>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.8rem,4.5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.05em]">
              {CARTA_OFERTA.cierre}
            </h2>
            <div className="mt-10 flex flex-col items-start gap-3">
              <BookingCta />
              <p className="text-[0.9rem] text-[var(--cream-soft)]/60">{CARTA_OFERTA.ctaHint}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
