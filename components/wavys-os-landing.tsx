"use client";

import Image from "next/image";
import Link from "next/link";

const CALENDLY_HREF = "https://calendly.com/philtaboada2julio" as const;
const HOME_HREF = "/" as const;

const PACKS = [
  {
    id: "tienda",
    name: "Tienda",
    line: "Catálogo, stock y pedidos que salen del chat.",
    image: "/wavys-os/wavys-os-pack-tienda.jpg",
  },
  {
    id: "salon",
    name: "Salón",
    line: "Servicios online y agenda de citas en un solo hilo.",
    image: "/wavys-os/wavys-os-pack-salon.jpg",
  },
  {
    id: "resto",
    name: "Restaurante",
    line: "Carta viva: marcas agotado y la web lo refleja.",
    image: "/wavys-os/wavys-os-pack-resto.jpg",
  },
] as const;

const PLANS = [
  {
    name: "Presence",
    price: "S/169",
    detail: "Web + oferta + leads + subdominio · 150 créditos IA",
  },
  {
    name: "Operate",
    price: "S/279",
    detail: "Presence + stock, citas o pedidos del pack · 400 créditos",
  },
  {
    name: "Scale",
    price: "S/449",
    detail: "Operate + automations · 1000 créditos",
  },
] as const;

/**
 * Campaign landing for Wavys OS (chat-first SaaS).
 * CTA: Calendly demo — not Presencia Digital.
 */
export function WavysOsLanding() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href={HOME_HREF} className="flex items-center gap-2.5">
          <Image
            src="/wavys-os/isotipo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="font-display text-[1.05rem] font-bold tracking-[-0.04em] text-[var(--cream)]">
            Wavys OS
          </span>
        </Link>
        <a href={CALENDLY_HREF} className="btn-primary px-4 py-2.5 text-[0.8rem] sm:px-5">
          <span>Agendar demo</span>
        </a>
      </header>

      {/* Hero — one composition: brand + line + CTA + full-bleed image */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/wavys-os/wavys-os-chat-mouth.jpg"
          alt="Chat Wavys OS — el sistema nace del chat"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[color-mix(in_srgb,var(--ink)_55%,transparent)] to-[color-mix(in_srgb,var(--ink)_35%,transparent)]"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-14 pt-28 sm:px-8 sm:pb-20">
          <p className="font-display text-[clamp(2.75rem,10vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.06em] text-[var(--cream)]">
            Wavys OS
          </p>
          <h1 className="mt-4 max-w-xl font-display text-[clamp(1.35rem,3.6vw,2rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--cream)]">
            Se abre el chat. Nacen web, oferta, citas, stock y pedidos.
          </h1>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-[var(--cream-soft)]">
            Sistema operativo para tiendas, salones y restaurantes. Te guiamos por chat en
            ~30 minutos.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={CALENDLY_HREF} className="btn-primary px-6 py-3.5 text-[0.95rem]">
              <span>Demo registrada</span>
            </a>
            <a href="#planes" className="btn-ghost px-5 py-3.5 text-[0.9rem]">
              Ver planes
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-[-0.04em]">
            Cómo funciona
          </h2>
          <p className="mt-3 max-w-lg text-[var(--muted)]">
            No es una web hecha a mano por una agencia. Es un sistema: tú configuras y operas
            por chat.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              "Elige pack: Tienda, Salón o Restaurante.",
              "Dejas WhatsApp y marca; se genera tu web.",
              "Cargas oferta y sigues operando en el mismo chat.",
            ].map((step, index) => (
              <li key={step} className="border-t border-[var(--line)] pt-5">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent)]">
                  0{index + 1}
                </span>
                <p className="mt-3 text-[1.05rem] leading-snug text-[var(--cream)]">{step}</p>
              </li>
            ))}
          </ol>
          <div className="relative mt-14 aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
            <Image
              src="/wavys-os/wavys-os-chat-radiates.jpg"
              alt="Del chat nacen los servicios del negocio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1100px"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-[-0.04em]">
            Packs MVP
          </h2>
          <p className="mt-3 max-w-lg text-[var(--muted)]">
            Tres tipos de negocio. Misma idea: el chat es el panel.
          </p>
          <ul className="mt-10 grid gap-10 sm:grid-cols-3">
            {PACKS.map((pack) => (
              <li key={pack.id}>
                <div className="relative mb-4 aspect-[4/5] overflow-hidden">
                  <Image
                    src={pack.image}
                    alt={`Pack ${pack.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-display text-xl font-bold tracking-[-0.03em]">{pack.name}</h3>
                <p className="mt-2 text-[0.95rem] text-[var(--muted)]">{pack.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="planes"
        className="border-t border-[var(--line)] px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-[-0.04em]">
            Planes
          </h2>
          <p className="mt-3 max-w-lg text-[var(--muted)]">
            Suscripción mensual. Precios en soles. Cobro self-serve cuando Polar esté en
            producción.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <li
                key={plan.name}
                className="border-t border-[var(--line-strong)] pt-6"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                  {plan.name}
                </p>
                <p className="mt-2 font-display text-3xl font-bold tracking-[-0.04em]">
                  {plan.price}
                  <span className="text-base font-medium text-[var(--muted)]">/mes</span>
                </p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                  {plan.detail}
                </p>
              </li>
            ))}
          </ul>
          <a
            href={CALENDLY_HREF}
            className="btn-primary mt-10 inline-flex px-6 py-3.5 text-[0.95rem]"
          >
            <span>Agendar demo — sin compromiso</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--muted)]">
            Wavys OS ·{" "}
            <a
              href="mailto:contact@wavys-technologies.com"
              className="text-[var(--cream-soft)] underline-offset-2 hover:underline"
            >
              contact@wavys-technologies.com
            </a>
          </p>
          <Link href={HOME_HREF} className="text-sm text-[var(--muted)] hover:text-[var(--cream)]">
            Wavys Software
          </Link>
        </div>
      </footer>
    </main>
  );
}
