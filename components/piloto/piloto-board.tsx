"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PILOTO_RESTAURANTS,
  preferredPhone,
  waHref,
  type PilotoRestaurant,
  type WebStatus,
} from "@/lib/piloto";

type Filter = "todos" | "limpios" | "sin-web" | "pdf";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Los 10" },
  { id: "limpios", label: "Pitch limpio" },
  { id: "sin-web", label: "Sin web" },
  { id: "pdf", label: "PDF / archivo" },
];

function matchesFilter(item: PilotoRestaurant, filter: Filter) {
  if (filter === "todos") return true;
  if (filter === "limpios") return item.pitchClean;
  if (filter === "sin-web") return item.webStatus === "no";
  return /pdf|archivo|webnode|opaca/i.test(`${item.angle} ${item.webLabel}`);
}

function webBadge(status: WebStatus) {
  if (status === "si") return "Web sí";
  if (status === "no") return "Sin web";
  return "Web dudosa";
}

export function PilotoBoard() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [copied, setCopied] = useState<string | null>(null);

  const list = useMemo(
    () => PILOTO_RESTAURANTS.filter((item) => matchesFilter(item, filter)),
    [filter],
  );

  async function copy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`min-h-11 rounded-full border px-4 text-[0.82rem] font-medium transition ${
              filter === item.id
                ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                : "border-[var(--line)] text-[var(--cream-soft)] hover:border-[var(--accent)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ol className="mt-8 grid gap-5">
        {list.map((item) => {
          const phone = preferredPhone(item);
          const cartaPath = `/carta/${item.slug}`;
          const cartaUrl =
            typeof window === "undefined"
              ? cartaPath
              : `${window.location.origin}${cartaPath}`;
          const message = `${item.waMessage}\n\nDemo: ${cartaUrl}`;
          const canWa = phone.kind === "mobile";

          return (
            <li
              key={item.slug}
              className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {String(item.n).padStart(2, "0")} · {item.distrito}
                  </p>
                  <h2 className="mt-2 font-display text-[1.45rem] font-bold tracking-[-0.03em]">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-[0.95rem] text-[var(--cream-soft)]/75">{item.cuisine}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.pitchClean ? (
                    <span className="rounded-full border border-[var(--accent)]/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                      Pitch limpio
                    </span>
                  ) : null}
                  {item.waWeak ? (
                    <span className="rounded-full border border-[var(--line-strong)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      WA débil
                    </span>
                  ) : null}
                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--cream-soft)]">
                    {webBadge(item.webStatus)}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-[0.82rem] text-[var(--muted)]">{item.address}</p>
              {item.hours ? (
                <p className="mt-1 text-[0.82rem] text-[var(--muted)]">{item.hours}</p>
              ) : null}

              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                    Ángulo WA
                  </dt>
                  <dd className="mt-1 text-[0.98rem] leading-7 text-[var(--cream-soft)]">{item.angle}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                    Maps / visto
                  </dt>
                  <dd className="mt-1 text-[0.95rem] leading-7 text-[var(--cream-soft)]/80">
                    <strong className="text-[var(--cream)]">{item.maps}</strong>
                    <span className="block text-[0.85rem] text-[var(--muted)]">{item.mapsNote}</span>
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-[0.9rem] leading-7 text-[var(--cream-soft)]/70">{item.seen}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {item.phones.map((entry) => (
                  <li
                    key={entry.raw}
                    className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[0.75rem] text-[var(--cream-soft)]"
                  >
                    {entry.label}: {entry.raw}
                  </li>
                ))}
                {item.webHref ? (
                  <li>
                    <a
                      href={item.webHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-[var(--line)] px-3 py-1.5 text-[0.75rem] text-[var(--accent)] hover:border-[var(--accent)]"
                    >
                      {item.webLabel}
                    </a>
                  </li>
                ) : (
                  <li className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[0.75rem] text-[var(--muted)]">
                    {item.webLabel}
                  </li>
                )}
              </ul>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link href={cartaPath} className="btn-primary">
                  Ver carta demo
                </Link>
                {canWa ? (
                  <a
                    href={waHref(phone.e164, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Abrir WhatsApp
                  </a>
                ) : (
                  <span className="btn-ghost pointer-events-none opacity-45">WhatsApp no publicado</span>
                )}
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => copy(`msg-${item.slug}`, message)}
                >
                  {copied === `msg-${item.slug}` ? "Mensaje copiado" : "Copiar mensaje"}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => copy(`url-${item.slug}`, cartaUrl)}
                >
                  {copied === `url-${item.slug}` ? "Link copiado" : "Copiar link de carta"}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
