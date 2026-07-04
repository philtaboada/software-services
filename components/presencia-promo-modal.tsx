"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import {
  PRESENCIA_PROMO_DISMISS_KEY,
  PRESENCIA_PROMO_INCLUDES,
  PRESENCIA_PROMO_PLANS,
  whatsappHref,
} from "@/lib/presencia-promo";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function PresenciaPromoModal({ showLandingLink = true }: { showLandingLink?: boolean }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PRESENCIA_PROMO_DISMISS_KEY)) return;
    } catch {
      /* ignore */
    }
    const timer = window.setTimeout(() => setOpen(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    const ctx = gsap.context(() => {
      if (backdropRef.current) {
        gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      }
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, scale: 0.9, y: 32 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.65, ease: "expo.out", delay: 0.05 },
        );
      }
    });

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [open]);

  const dismiss = (): void => {
    try {
      sessionStorage.setItem(PRESENCIA_PROMO_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="presencia-promo-modal fixed inset-0 z-[200] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="presencia-promo-title"
    >
      <button
        type="button"
        ref={backdropRef}
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--ink)_72%,transparent)] backdrop-blur-md"
        aria-label="Cerrar promoción"
        onClick={dismiss}
      />

      <div
        ref={panelRef}
        className="presencia-promo-panel relative z-10 w-full max-w-[540px] overflow-hidden rounded-[1.75rem] border border-[color-mix(in_srgb,var(--accent)_35%,var(--line))] bg-[var(--surface)] shadow-[0_32px_120px_-24px_rgba(46,232,154,0.25)]"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--accent)] opacity-[0.12] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[var(--teal)] opacity-[0.1] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] px-5 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="presencia-promo-badge inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--ink)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--ink)] opacity-50" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
                </span>
                Nuevo servicio
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--accent-soft)]">
                Todo el Perú
              </span>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--cream)]"
              aria-label="Cerrar"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="relative px-5 py-6 sm:px-7 sm:py-7">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[var(--muted)]">
            Presencia Digital · Wavys
          </p>

          <h2
            id="presencia-promo-title"
            className="mt-3 font-display text-[clamp(1.65rem,5vw,2.15rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--cream)]"
          >
            Tu landing con{" "}
            <span className="font-serif italic text-[var(--accent-soft)]">fotos incluidas</span>
          </h2>

          <div className="mt-4 flex flex-wrap items-end gap-2">
            <p className="font-display text-[3rem] font-bold leading-none tracking-[-0.04em] text-[var(--cream)]">
              <span className="text-[1rem] font-semibold text-[var(--muted)]">S/</span>
              149
            </p>
            <div className="mb-1">
              <p className="text-[0.95rem] font-medium text-[var(--accent-bright)]">/mes</p>
              <p className="text-[0.72rem] text-[var(--muted)] line-through">regular S/179</p>
            </div>
            <span className="mb-1 rounded-full border border-[color-mix(in_srgb,var(--lime)_40%,transparent)] bg-[color-mix(in_srgb,var(--lime)_12%,transparent)] px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--lime)]">
              vs S/1,500 pago único
            </span>
          </div>

          <p className="mt-3 text-[0.9rem] leading-6 text-[var(--cream-soft)]/72">
            Dominio, hosting, SEO, WhatsApp y producción visual — sin inversión inicial alta.
            Ideal para campañas Meta Ads en cualquier ciudad del país.
          </p>

          <ul className="mt-5 space-y-2">
            {PRESENCIA_PROMO_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.82rem] text-[var(--cream-soft)]/80">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {PRESENCIA_PROMO_PLANS.map((plan) => (
              <a
                key={plan.id}
                href={whatsappHref(plan.plan)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-xl border p-2.5 text-left transition-all duration-300 hover:-translate-y-0.5 sm:p-3 ${
                  plan.highlight
                    ? "border-[color-mix(in_srgb,var(--accent)_55%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
                    : "border-[var(--line)] bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)] hover:border-[var(--line-strong)]"
                }`}
              >
                {plan.highlight && (
                  <span className="mb-1 block text-[0.52rem] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                    ★ Top
                  </span>
                )}
                <p className="font-display text-[0.72rem] font-semibold leading-tight text-[var(--cream)] sm:text-[0.78rem]">
                  {plan.name}
                </p>
                <p className="mt-1 font-display text-[1.1rem] font-bold leading-none text-[var(--cream)] sm:text-[1.25rem]">
                  {plan.price}
                </p>
                <p className="mt-0.5 text-[0.58rem] text-[var(--muted)]">{plan.note}</p>
              </a>
            ))}
          </div>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="presencia-promo-cta btn-primary mt-6 w-full py-3.5 text-[0.95rem]"
          >
            <WhatsAppIcon />
            <span>Quiero info por WhatsApp</span>
          </a>

          <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            {showLandingLink ? (
              <Link
                href="/presencia-digital"
                onClick={dismiss}
                className="text-[0.78rem] font-medium text-[var(--accent-soft)] underline-offset-4 hover:underline"
              >
                Ver landing completa →
              </Link>
            ) : (
              <a
                href="#planes"
                onClick={dismiss}
                className="text-[0.78rem] font-medium text-[var(--accent-soft)] underline-offset-4 hover:underline"
              >
                Ver planes en detalle →
              </a>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="text-[0.72rem] text-[var(--muted)] hover:text-[var(--cream-soft)]"
            >
              Ahora no, gracias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
