"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import {
  CATALOGO_PAGE_PATH,
  CATALOGO_SLIDER_MAX,
  CATALOGO_SLIDER_MIN,
  CATALOGO_TIER_MARKS,
  catalogoWhatsappHrefForCount,
  formatProductCount,
  getCatalogoTierForCount,
} from "@/lib/presencia-catalogo";

type CatalogoPriceSliderProps = {
  /** Pulso desde el padre al elegir un plan (tarjeta). No usar para arrastre. */
  sync?: { count: number; token: number };
  onCountChange?: (count: number) => void;
  className?: string;
  showCta?: boolean;
  embedded?: boolean;
  showDetailLink?: boolean;
  defaultCount?: number;
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m13 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function clampCount(n: number): number {
  return Math.max(CATALOGO_SLIDER_MIN, Math.min(CATALOGO_SLIDER_MAX, Math.round(n)));
}

export function CatalogoPriceSlider({
  sync,
  onCountChange,
  className = "",
  showCta = true,
  embedded = false,
  showDetailLink = false,
  defaultCount = 200,
}: CatalogoPriceSliderProps) {
  const sliderId = useId();
  const [value, setValue] = useState(() => clampCount(defaultCount));

  const applyValue = useCallback(
    (next: number): void => {
      const clamped = clampCount(next);
      setValue(clamped);
      onCountChange?.(clamped);
    },
    [onCountChange],
  );

  useEffect(() => {
    if (sync === undefined) return;
    applyValue(sync.count);
    // Solo reaccionar al pulso del padre (clic en tarjeta de plan), no al arrastre
    // eslint-disable-next-line react-hooks/exhaustive-deps -- token es el disparador explícito
  }, [sync?.token]);

  const tier = useMemo(() => getCatalogoTierForCount(value), [value]);
  const progress =
    ((value - CATALOGO_SLIDER_MIN) / (CATALOGO_SLIDER_MAX - CATALOGO_SLIDER_MIN)) * 100;

  const shellClass = embedded
    ? `catalogo-price-slider relative ${className}`
    : `catalogo-price-slider card-outline relative z-10 rounded-3xl border-[color-mix(in_srgb,var(--accent)_22%,var(--line))] bg-[color-mix(in_srgb,var(--accent)_4%,var(--surface))] p-6 sm:p-8 ${className}`;

  return (
    <div className={shellClass}>
      {!embedded && (
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[var(--muted)]">
          Calcula tu plan
        </p>
      )}

      <div className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${embedded ? "" : "mt-6"}`}>
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">
            Cantidad de productos
          </p>
          <p className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--cream)]">
            {formatProductCount(value)}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">
            Plan {tier.name}
          </p>
          {tier.price === "0" ? (
            <p className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--accent-bright)]">
              Gratis
            </p>
          ) : (
            <p className="mt-2 flex items-baseline gap-0.5 sm:justify-end">
              <span className="font-display text-[0.9rem] text-[var(--muted)]">S/</span>
              <span className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--accent-bright)]">
                {tier.price}
              </span>
              <span className="text-[0.88rem] text-[var(--muted)]">/mes</span>
            </p>
          )}
          <p className="mt-1.5 text-[0.78rem] text-[var(--cream-soft)]/60">
            Hasta {tier.productsLabel} productos incluidos
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={sliderId} className="sr-only">
          Cantidad de productos en tu catálogo
        </label>

        <input
          id={sliderId}
          type="range"
          min={CATALOGO_SLIDER_MIN}
          max={CATALOGO_SLIDER_MAX}
          step={1}
          value={value}
          onChange={(e) => applyValue(Number(e.target.value))}
          className="catalogo-range w-full"
          style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
          aria-valuemin={CATALOGO_SLIDER_MIN}
          aria-valuemax={CATALOGO_SLIDER_MAX}
          aria-valuenow={value}
          aria-valuetext={`${formatProductCount(value)} productos, plan ${tier.name}`}
        />

        <div className="relative mt-3 h-5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">
          <span className="absolute left-0 top-0 -translate-x-0">1</span>
          {CATALOGO_TIER_MARKS.map((mark) => {
            const markPct =
              ((mark - CATALOGO_SLIDER_MIN) / (CATALOGO_SLIDER_MAX - CATALOGO_SLIDER_MIN)) * 100;
            return (
              <button
                key={mark}
                type="button"
                onClick={() => applyValue(mark)}
                style={{ left: `${markPct}%` }}
                className="absolute top-0 -translate-x-1/2 cursor-pointer rounded px-1 transition-colors hover:text-[var(--accent-bright)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {formatProductCount(mark)}
              </button>
            );
          })}
        </div>
      </div>

      {(showCta || showDetailLink) && (
        <div className={`flex flex-wrap gap-3 ${embedded ? "mt-5" : "mt-8"}`}>
          {showCta && (
            <a
              href={catalogoWhatsappHrefForCount(value)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              <span>{tier.cta}</span>
              <ArrowIcon className="h-4 w-4" />
            </a>
          )}
          {showDetailLink && (
            <Link href={CATALOGO_PAGE_PATH} className="btn-ghost text-center">
              Ver Presencia Catálogo
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
