"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaseBrandMark } from "@/components/case-brand-mark";
import { CaseCharts } from "@/components/case-charts";
import { CtaBand } from "@/components/cta-band";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { CASES, CASE_BRIEFS } from "@/lib/content";
import { BOOKING_HREF } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CaseItem = (typeof CASES)[number];

function isLight(hex: string) {
  const value = hex.replace("#", "");
  const n = Number.parseInt(value.length === 3 ? value.repeat(2) : value, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 168;
}

export function CaseStory({
  item,
  others,
}: {
  item: CaseItem;
  others: readonly CaseItem[];
}) {
  const brief = CASE_BRIEFS[item.slug];
  const pageRef = useRef<HTMLDivElement>(null);
  const accent =
    item.slug === "jlh-corredores" || item.slug === "la-alcoba"
      ? brief.system.colors[1]?.hex
      : brief.system.colors[0]?.hex;
  const bridge =
    "bridge" in brief
      ? brief.bridge
      : "Primero congelamos la dirección. Después la construimos hasta que se pudo usar.";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-case-reveal]", { autoAlpha: 1, y: 0, clearProps: "clipPath" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-case-hero]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>("[data-case-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 32,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: pageRef },
  );

  return (
    <div
      ref={pageRef}
      className="case-story"
      style={{ "--case-accent": accent ?? "#01fd91" } as CSSProperties}
    >
      <header className="case-hero">
        <div>
          <Link
            data-case-hero
            href="/trabajo"
            className="inline-flex min-h-11 items-center gap-2 text-[0.8rem] text-[var(--cream-soft)]/65 hover:text-[var(--cream)]"
          >
            ← Trabajo
          </Link>
          <p data-case-hero className="section-label mt-8">
            Cómo se hizo
          </p>
          <h1 data-case-hero className="case-hero-title">
            {brief.headline}
          </h1>
          <p data-case-hero className="case-hero-lede">
            {brief.lede}
          </p>
          <div data-case-hero className="mt-7 flex items-center gap-2">
            {brief.system.colors.map((token) => (
              <span
                key={token.hex}
                title={`${token.name} ${token.hex}`}
                className="size-3.5 rounded-full border border-white/15 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
                style={{ background: token.hex }}
              />
            ))}
          </div>
          <div data-case-hero className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href={BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cal-click
            >
              <span>Quiero un proceso así</span>
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={item.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Ver en producción
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <aside data-case-hero className="case-hero-card">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--accent)]">
            {brief.kicker}
          </p>
          <p className="mt-5 font-display text-[1.7rem] font-bold tracking-[-0.04em]">{item.client}</p>
          <dl className="mt-6 space-y-3 border-t border-[var(--line)] pt-5">
            {[
              ["Industria", item.industry],
              ["Año", item.year],
              ["Tipo", item.type],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--muted)]">{label}</dt>
                <dd className="text-right text-[0.92rem] text-[var(--cream)]">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </header>

      <section className="case-block">
        <div data-case-reveal className="case-compare">
          <figure className="case-frame">
            <div className="relative aspect-[16/11]">
              <Image
                src={brief.sketch}
                alt={brief.sketchAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="case-frame-tag">01 · Boceto</figcaption>
            <p className="case-frame-cap">Dirección congelada</p>
          </figure>
          <span className="case-compare-arrow" aria-hidden>
            <ArrowIcon className="h-4 w-4" />
          </span>
          <figure className="case-frame case-frame--live">
            <div className="relative aspect-[16/11]">
              <Image
                src={item.image}
                alt={`Pieza en producción de ${item.client}`}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
            <figcaption className="case-frame-tag case-frame-tag--live">02 · Producción</figcaption>
            <p className="case-frame-cap">En el aire</p>
          </figure>
        </div>
        <p data-case-reveal className="case-bridge">
          {bridge}
        </p>
      </section>

      <CaseCharts slug={item.slug} />

      <section className="case-block">
        <div data-case-reveal className="case-block-head">
          <div>
            <p className="section-label">Números que importan</p>
            <h2 className="case-heading">Distinto usuario, distinta cifra.</h2>
          </div>
        </div>
        <div className="case-stats">
          {brief.numbers.map((stat, index) => (
            <article
              key={`${stat.audience}-${stat.value}`}
              data-case-reveal
              className={`case-stat ${index === 0 ? "case-stat--lead" : ""}`}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                {stat.audience}
              </p>
              <p className="case-stat-value">{stat.value}</p>
              <p className="mt-4 text-[0.92rem] leading-6 text-[var(--cream-soft)]/65">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-block">
        <div data-case-reveal className="case-block-head">
          <div>
            <p className="section-label">El plan</p>
            <h2 className="case-heading">Cuatro movimientos.</h2>
          </div>
        </div>
        <ol className="case-plan">
          {brief.plan.map((step) => (
            <li key={step.id} data-case-reveal className="case-plan-step">
              <span className="case-plan-id">{step.id}</span>
              <h3 className="mt-6 font-display text-[1.3rem] font-semibold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-7 text-[var(--cream-soft)]/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-block">
        <div data-case-reveal className="case-block-head">
          <div>
            <p className="section-label">Sistema de diseño</p>
            <h2 className="case-heading">Paleta y tipo.</h2>
          </div>
          <p className="case-lead">
            Display: {brief.system.type.display}. Cuerpo: {brief.system.type.body}.
          </p>
        </div>
        <div data-case-reveal className="case-palette">
          {brief.system.colors.map((token) => {
            const light = isLight(token.hex);
            return (
              <div key={token.hex} className="case-swatch" style={{ background: token.hex }}>
                <p className={`case-swatch-name text-[0.95rem] font-semibold ${light ? "text-black" : "text-white"}`}>
                  {token.name}
                </p>
                <p
                  className={`case-swatch-hex mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
                    light ? "text-black/55" : "text-white/70"
                  }`}
                >
                  {token.hex}
                </p>
                <p className={`case-swatch-role mt-1 text-[0.75rem] ${light ? "text-black/50" : "text-white/55"}`}>
                  {token.role}
                </p>
              </div>
            );
          })}
        </div>
        <div data-case-reveal className="case-logo-board">
          <p className="case-logo-ways-label">Logo · escala</p>
          <div className="case-logo-scale">
            {brief.system.colors.slice(0, 5).map((token, index) => {
              const light = isLight(token.hex);
              const scale = (
                [
                  { id: "xl", label: "Billboard", hint: "256", variant: "lockup" as const },
                  { id: "l", label: "Header", hint: "128", variant: "lockup" as const },
                  { id: "m", label: "Nav", hint: "64", variant: "lockup" as const },
                  { id: "s", label: "Compact", hint: "40", variant: "lockup" as const },
                  { id: "xs", label: "Favicon", hint: "32", variant: "icon" as const },
                ] as const
              )[index];
              if (!scale) return null;
              return (
                <article
                  key={scale.id}
                  className={`case-logo-tile case-logo-tile--${scale.id}`}
                  style={{
                    background: token.hex,
                    color: light ? "#111111" : "#FDFDFD",
                  }}
                >
                  <p className={`case-logo-tile-meta ${light ? "text-black/45" : "text-white/50"}`}>
                    {scale.hint} · {scale.label}
                  </p>
                  <CaseBrandMark
                    slug={item.slug}
                    variant={scale.variant}
                    name={`${item.client} ${scale.label}`}
                    className={`case-logo-mark case-logo-mark--${scale.id}`}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="case-block">
        <div data-case-reveal className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label">Qué destrabamos</p>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold tracking-[-0.04em]">
              El cuello, por escrito.
            </h2>
            <ul className="mt-8 space-y-4">
              {item.problem.map((line) => (
                <li key={line} className="case-problem">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label">Cómo lo construimos</p>
            <p className="mt-4 text-[1.05rem] leading-8 text-[var(--cream-soft)]/80">{item.approach}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {brief.product.map((entry) => (
                <article key={entry.label} className="case-product">
                  <h3 className="font-display text-[1.08rem] font-semibold tracking-[-0.03em]">{entry.label}</h3>
                  <p className="mt-2 text-[0.88rem] leading-6 text-[var(--cream-soft)]/60">{entry.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {brief.craft.map((tag) => (
                <span key={tag} className="case-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {"strengths" in brief ? (
        <section className="case-block">
          <div data-case-reveal className="case-block-head">
            <div>
              <p className="section-label">Lo que le importa a gerencia</p>
              <h2 className="case-heading">Fortalezas que se defienden en una reunión.</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brief.strengths.map((strength, index) => (
              <article key={strength.label} data-case-reveal className="case-stat">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-[1.15rem] font-semibold tracking-[-0.03em]">
                  {strength.label}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-6 text-[var(--cream-soft)]/65">{strength.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="case-block">
        <div data-case-reveal className="case-close">
          <div>
            <p className="section-label">Entregables</p>
            <ul className="mt-6 space-y-3 text-[1rem] leading-7 text-[var(--cream-soft)]/75">
              {item.deliverables.map((line) => (
                <li key={line} className="case-deliverable">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label">Resultado</p>
            <p className="mt-6 text-[1.05rem] leading-8 text-[var(--cream-soft)]/80">{item.result}</p>
            <p className="mt-5 text-[1.15rem] leading-8 text-[var(--cream)]">{brief.closer}</p>
            <a
              href={item.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-[var(--accent)]"
            >
              Abrir {item.client} en producción <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="case-block case-block--tight">
        <p data-case-reveal className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
          Más procesos
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {others.map((entry) => (
            <li key={entry.slug} data-case-reveal>
              <Link href={`/trabajo/${entry.slug}`} className="case-more group">
                <span className="font-display text-[1rem] font-semibold tracking-[-0.02em]">{entry.client}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--muted)] transition group-hover:text-[var(--accent)]" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand kicker="Tu turno" title={brief.closer} />
    </div>
  );
}
