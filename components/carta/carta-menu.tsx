import type { CSSProperties } from "react";
import Link from "next/link";
import { formatSoles, preferredPhone, waHref, type PilotoRestaurant } from "@/lib/piloto";

export function CartaMenu({
  restaurant,
  origin,
}: {
  restaurant: PilotoRestaurant;
  origin: string;
}) {
  const phone = preferredPhone(restaurant);
  const canWa = phone.kind === "mobile";
  const reserveText = `Hola, quiero reservar / pedir en ${restaurant.name}.`;

  return (
    <div
      className="carta-root min-h-dvh"
      style={
        {
          "--c-bg": restaurant.theme.bg,
          "--c-paper": restaurant.theme.paper,
          "--c-ink": restaurant.theme.ink,
          "--c-muted": restaurant.theme.muted,
          "--c-accent": restaurant.theme.accent,
          "--c-line": restaurant.theme.line,
          "--c-wash": restaurant.theme.wash,
          background: restaurant.theme.bg,
          color: restaurant.theme.ink,
        } as CSSProperties
      }
    >
      <div className="mx-auto min-h-dvh max-w-[430px] px-5 pb-28 pt-6">
        <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[var(--c-muted)]">
          Demo · no es la carta oficial
        </p>

        <header className="mt-8 text-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--c-accent)]">
            {restaurant.distrito}
          </p>
          <h1 className="mt-3 font-display text-[2.15rem] font-bold leading-[1.05] tracking-[-0.04em]">
            {restaurant.name}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-6 text-[var(--c-muted)]">{restaurant.cuisine}</p>
          <p className="mt-2 text-[0.82rem] leading-6 text-[var(--c-muted)]">{restaurant.address}</p>
          {restaurant.hours ? (
            <p className="mt-4 rounded-2xl border border-[var(--c-line)] bg-[var(--c-paper)] px-4 py-3 text-[0.8rem] leading-6 text-[var(--c-muted)]">
              {restaurant.hours}
            </p>
          ) : null}
        </header>

        <div className="mt-8 rounded-2xl border border-[var(--c-line)] bg-[var(--c-wash)] px-4 py-3 text-[0.78rem] leading-6 text-[var(--c-muted)]">
          Platos y precios solo si aparecieron en fuentes públicas el 17 ago 2026. Si no hay precio, se lee
          “en sala”.
        </div>

        {restaurant.menu.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--c-accent)]">
              {section.title}
            </h2>
            <ul className="mt-4 divide-y divide-[var(--c-line)] rounded-[1.2rem] border border-[var(--c-line)] bg-[var(--c-paper)]">
              {section.items.map((dish) => (
                <li key={dish.name} className="flex items-start justify-between gap-4 px-4 py-4">
                  <div>
                    <p className="text-[1.05rem] font-medium tracking-[-0.02em]">{dish.name}</p>
                    {dish.note ? (
                      <p className="mt-1 text-[0.78rem] leading-5 text-[var(--c-muted)]">{dish.note}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-mono text-[0.92rem] text-[var(--c-accent)]">
                    {dish.price != null ? formatSoles(dish.price) : "en sala"}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer className="mt-12 border-t border-[var(--c-line)] pt-6 text-center">
          <p className="text-[0.85rem] leading-6 text-[var(--c-muted)]">
            Así se ve una carta que no se queda en PDF ni en un chat.
          </p>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--c-muted)]">
            Wavys · carta digital · Lima
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Link
              href="/piloto"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--c-line)] text-[0.82rem] text-[var(--c-muted)]"
            >
              Volver al piloto
            </Link>
            {restaurant.webHref ? (
              <a
                href={restaurant.webHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center text-[0.78rem] text-[var(--c-muted)] underline-offset-4 hover:underline"
              >
                Fuente pública
              </a>
            ) : null}
          </div>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--c-line)] bg-[var(--c-bg)]/92 px-5 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-[430px] gap-2">
          {canWa ? (
            <a
              href={waHref(phone.e164, reserveText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--c-accent)] px-4 text-[0.9rem] font-semibold text-black"
            >
              Reservar por WhatsApp
            </a>
          ) : (
            <a
              href={`tel:+${phone.e164}`}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--c-accent)] px-4 text-[0.9rem] font-semibold text-black"
            >
              Llamar {phone.raw}
            </a>
          )}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Carta demo de ${restaurant.name}: ${origin}/carta/${restaurant.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--c-line)] px-4 text-[0.8rem] text-[var(--c-ink)]"
          >
            Compartir
          </a>
        </div>
      </div>
    </div>
  );
}
