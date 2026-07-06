"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  CATALOGO_FAQ,
  CATALOGO_FEATURES,
  CATALOGO_INCLUDES,
  CATALOGO_TIERS,
  catalogoWhatsappHref,
  getCatalogoTierForCount,
} from "@/lib/presencia-catalogo";
import { CatalogoPriceSlider } from "@/components/catalogo-price-slider";
import { whatsappHref } from "@/lib/presencia-promo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Theme = "dark" | "light";
const THEME_STORAGE_KEY = "wavys-theme";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

const NAV_LINKS = [
  { href: "#calculadora", label: "Precio" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#incluye", label: "Incluye" },
  { href: "#planes", label: "Planes" },
  { href: "#faq", label: "FAQ" },
] as const;

const PROCESS = [
  { step: "01", title: "Elige tu plan", body: "Gratis con 10 productos o plan de pago según el tamaño de tu catálogo." },
  { step: "02", title: "Brief + fotos", body: "Nos pasas listado y fotos de producto. Nosotros optimizamos para web." },
  { step: "03", title: "Build", body: "Armamos tu catálogo con categorías, búsqueda y botones a WhatsApp." },
  { step: "04", title: "Live", body: "Publicamos, capacitamos el panel y quedas listo para recibir consultas." },
] as const;

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m13 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
    </svg>
  );
}

export function PresenciaCatalogoLanding() {
  const pageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [theme, setTheme] = useState<Theme>("dark");
  const [productCount, setProductCount] = useState(125);
  const tierSyncToken = useRef(0);
  const [tierSync, setTierSync] = useState<{ count: number; token: number } | undefined>(undefined);
  const activeTierId = getCatalogoTierForCount(productCount).id;

  const selectTierCount = (count: number): void => {
    setProductCount(count);
    tierSyncToken.current += 1;
    setTierSync({ count, token: tierSyncToken.current });
  };

  useEffect(() => {
    setTheme(readInitialTheme());
  }, []);

  const toggleTheme = (): void => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    ScrollTrigger.refresh();
  };

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set("[data-reveal]", { y: 0, autoAlpha: 1 });
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      const onScroll = () => {
        if (navRef.current) {
          navRef.current.dataset.scrolled = window.scrollY > 40 ? "true" : "false";
        }
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef} className="presencia-page relative min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-70" aria-hidden="true" />
      <div className="noise pointer-events-none fixed inset-0" aria-hidden="true" />

      <header
        ref={navRef}
        data-scrolled="false"
        className="nav-root fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-5 py-5 sm:px-8 lg:px-12 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-6">
          <Link
            href="/presencia-digital"
            data-nav-item
            className="group inline-flex min-w-0 max-w-full items-center gap-2 justify-self-start sm:gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.36em] text-[var(--cream)]"
          >
            <Image src="/logo.png" alt="Wavys" width={36} height={36} className="h-9 w-auto shrink-0" priority />
            <span className="min-w-0 truncate">Presencia Catálogo</span>
          </Link>

          <nav aria-label="Navegación catálogo" className="nav-pill hidden shrink-0 items-center justify-center gap-1 rounded-full p-1 md:flex md:justify-self-center">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-nav-item
                className="rounded-full px-4 py-1.5 text-[0.82rem] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 md:min-w-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
              data-nav-item
              className="theme-toggle inline-flex h-10 w-10 shrink-0 items-center justify-center"
            >
              <MoonIcon />
              <SunIcon />
            </button>
            <a
              href={catalogoWhatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              data-nav-item
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 text-[0.78rem] font-semibold text-[var(--ink)] hover:bg-[var(--accent-bright)] sm:px-5 sm:text-[0.82rem]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero + calculadora */}
        <section id="top" className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:pt-36">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-4 py-2 sm:justify-start sm:px-5">
            <span className="presencia-masthead text-[var(--accent-bright)]">✦ Catálogo digital · No es e-commerce</span>
            <span className="hidden h-3 w-px bg-[var(--line-strong)] sm:block" aria-hidden="true" />
            <span className="text-[0.78rem] text-[var(--cream-soft)]">
              Arrastra el control y mira tu precio al instante
            </span>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
            <div className="max-w-xl">
              <p className="presencia-chapter mb-6">Presencia Catálogo</p>
              <h1 className="font-display text-[clamp(2.15rem,5.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--cream)]">
                Catálogo{" "}
                <span className="font-serif italic text-[var(--accent-soft)]">inteligente</span>
                <br />
                sencillo de{" "}
                <span className="text-gradient-accent">rellenar</span>
              </h1>

              <div className="presencia-pull-rule my-7 max-w-md" aria-hidden="true" />

              <p className="text-pretty text-[1.02rem] leading-7 text-[var(--cream-soft)]/72 sm:text-[1.06rem]">
                Muestra tus productos en una web profesional. Panel fácil para agregar, editar y publicar.
                Tus clientes consultan por <strong className="font-semibold text-[var(--foreground)]">WhatsApp</strong> — sin carrito,
                sin comisiones, sin checkout.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#calculadora" className="btn-primary lg:hidden">
                  <span>Calcular mi precio</span>
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <a href={catalogoWhatsappHref("gratis")} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <span>Empezar gratis</span>
                </a>
              </div>
            </div>

            <div id="calculadora" className="lg:sticky lg:top-28">
              <CatalogoPriceSlider
                sync={tierSync}
                onCountChange={setProductCount}
              />
            </div>
          </div>
        </section>

        {/* Flow */}
        <section id="como-funciona" className="border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_4%,transparent)] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div data-reveal>
                <p className="presencia-chapter">Cómo funciona</p>
                <h2 className="mt-6 font-display text-[clamp(1.85rem,4vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[var(--cream)]">
                  Tú llenas el catálogo.{" "}
                  <span className="font-serif italic text-[var(--accent-soft)]">Ellos consultan.</span>
                </h2>
                <p className="mt-5 text-[0.98rem] leading-7 text-[var(--cream-soft)]/68">
                  Ideal para ferreterías, textiles, repuestos, bodegas y distribuidores que ya venden por WhatsApp
                  pero necesitan orden en la web — sin montar una tienda completa.
                </p>
              </div>

              <ol className="space-y-4">
                {[
                  { n: "1", t: "Agrega productos", d: "Foto, nombre, precio o «consultar», categoría. Uno a uno desde el panel." },
                  { n: "2", t: "Cliente navega", d: "Busca, filtra por categoría y abre la ficha del producto." },
                  { n: "3", t: "Consulta WhatsApp", d: "Un clic abre chat con el producto citado. Tú cierras la venta como siempre." },
                ].map((step) => (
                  <li key={step.n} data-reveal className="card-outline flex gap-4 rounded-2xl p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] font-display text-sm font-bold text-[var(--accent)]">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.05rem] font-medium text-[var(--cream)]">{step.t}</h3>
                      <p className="mt-1 text-[0.86rem] leading-6 text-[var(--cream-soft)]/58">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="incluye" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div data-reveal className="mb-12 max-w-2xl">
            <p className="presencia-chapter">Qué es Presencia Catálogo</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
              Vitrina digital — no tienda online
            </h2>
            <p className="mt-4 text-[0.92rem] leading-7 text-[var(--cream-soft)]/65">
              Si necesitas carrito y pedido automático a WhatsApp, mira{" "}
              <Link href="/presencia-digital#tienda" className="text-[var(--accent-bright)] underline-offset-2 hover:underline">
                Presencia Tienda
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATALOGO_FEATURES.map((f) => (
              <article key={f.num} data-reveal className="card-outline rounded-2xl p-5 sm:p-6">
                <span className="font-mono text-[0.62rem] tracking-[0.28em] text-[var(--accent)]">{f.num}</span>
                <h3 className="mt-3 font-display text-[1.08rem] font-medium text-[var(--cream)]">{f.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-6 text-[var(--cream-soft)]/58">{f.body}</p>
              </article>
            ))}
          </div>

          <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {CATALOGO_INCLUDES.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.86rem] text-[var(--cream-soft)]/75">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing */}
        <section id="planes" className="border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--foreground)_2%,transparent)] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div data-reveal className="mx-auto max-w-2xl text-center">
              <p className="presencia-chapter mx-auto justify-center">Planes</p>
              <h2 className="mt-6 font-display text-[clamp(1.85rem,4vw,2.85rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
                Precio según{" "}
                <span className="font-serif italic text-[var(--accent-soft)]">cantidad de productos</span>
              </h2>
              <p className="mt-4 text-[0.92rem] leading-7 text-[var(--cream-soft)]/65">
                Empieza gratis. Sube de plan cuando tu catálogo crece. Planes de pago: 12 meses de servicio, después tú decides.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATALOGO_TIERS.map((tier) => (
                <article
                  key={tier.id}
                  data-reveal
                  role="button"
                  tabIndex={0}
                  onClick={() => selectTierCount(tier.products)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectTierCount(tier.products);
                    }
                  }}
                  className={`card-outline relative flex cursor-pointer flex-col rounded-3xl p-6 transition-all duration-300 ${
                    tier.id === activeTierId
                      ? "ring-2 ring-[color-mix(in_srgb,var(--accent)_45%,transparent)] lg:-translate-y-2"
                      : tier.highlight
                        ? "ring-1 ring-[color-mix(in_srgb,var(--accent)_20%,transparent)]"
                        : ""
                  }`}
                >
                  {tier.id === activeTierId && <div className="presencia-plan-spine" aria-hidden="true" />}
                  {tier.highlight && tier.id !== activeTierId && (
                    <span className="absolute right-4 top-4 rounded-full border border-[var(--line)] px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                      Popular
                    </span>
                  )}
                  {tier.id === activeTierId && (
                    <span className="absolute right-4 top-4 rounded-full bg-[var(--accent)] px-2 py-0.5 font-mono text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Tu plan
                    </span>
                  )}
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                    Hasta {tier.productsLabel} productos
                  </p>
                  <h3 className="mt-3 font-display text-[1.35rem] font-medium text-[var(--cream)]">{tier.name}</h3>
                  <div className="mt-5 flex items-end gap-1">
                    {tier.price === "0" ? (
                      <span className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.04em]">Gratis</span>
                    ) : (
                      <>
                        <span className="font-display text-[0.85rem] text-[var(--muted)]">S/</span>
                        <span className="font-display text-[3rem] font-semibold leading-none tracking-[-0.04em]">{tier.price}</span>
                        <span className="mb-1.5 text-[0.88rem] text-[var(--muted)]">/mes</span>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-[0.76rem] text-[var(--muted)]">{tier.note}</p>
                  <ul className="mt-6 flex-1 space-y-2 border-t border-[var(--line)] pt-5 text-[0.84rem] text-[var(--cream-soft)]/72">
                    <li className="flex gap-2">
                      <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                      Panel sencillo
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                      WhatsApp por producto
                    </li>
                    {tier.id !== "gratis" && (
                      <>
                        <li className="flex gap-2">
                          <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                          Dominio + hosting + SSL
                        </li>
                        <li className="flex gap-2">
                          <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                          Diseño editorial Wavys
                        </li>
                      </>
                    )}
                  </ul>
                  <a
                    href={catalogoWhatsappHref(tier.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`mt-6 w-full text-center ${tier.id === activeTierId || tier.id === "gratis" ? "btn-primary" : "btn-ghost"}`}
                  >
                    {tier.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* vs Tienda */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal className="card-outline overflow-hidden rounded-3xl p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="presencia-masthead text-[var(--accent-soft)]">¿Cuál elegir?</p>
                <h2 className="mt-4 font-display text-[1.75rem] font-medium tracking-[-0.03em] text-[var(--cream)]">
                  Catálogo vs Tienda
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--line)] p-5">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)]">Presencia Catálogo</p>
                  <ul className="mt-3 space-y-2 text-[0.84rem] text-[var(--cream-soft)]/72">
                    <li>Ver productos en web</li>
                    <li>Consultar por WhatsApp</li>
                    <li>Desde S/0 · hasta S/199/mes</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-[var(--line)] p-5">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted)]">Presencia Tienda</p>
                  <ul className="mt-3 space-y-2 text-[0.84rem] text-[var(--cream-soft)]/72">
                    <li>Carrito de compras</li>
                    <li>Pedido estructurado a WhatsApp</li>
                    <li>S/229/mes · hasta 100 prod.</li>
                  </ul>
                  <Link
                    href="/presencia-digital#tienda"
                    className="mt-4 inline-flex items-center gap-1 text-[0.82rem] text-[var(--accent-bright)] hover:underline"
                  >
                    Ver Presencia Tienda
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-[var(--line)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div data-reveal className="mb-12">
              <p className="presencia-chapter">Proceso</p>
              <h2 className="mt-4 font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
                De cero a catálogo publicado
              </h2>
            </div>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step) => (
                <li key={step.step} data-reveal>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] font-display text-[0.82rem] font-bold text-[var(--accent)]">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-medium text-[var(--cream)]">{step.title}</h3>
                  <p className="mt-2 text-[0.86rem] leading-6 text-[var(--cream-soft)]/58">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <div data-reveal className="text-center">
            <p className="presencia-chapter mx-auto justify-center">FAQ</p>
            <h2 className="mt-6 font-display text-[clamp(1.5rem,3.5vw,2.15rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="mt-10 space-y-2">
            {CATALOGO_FAQ.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.q} data-reveal className="card-outline overflow-hidden rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-display text-[0.95rem] font-medium text-[var(--cream)]">{item.q}</span>
                    <span className={`shrink-0 font-mono text-[var(--accent)] transition-transform ${open ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="border-t border-[var(--line)] px-5 pb-4 pt-3 text-[0.9rem] leading-7 text-[var(--cream-soft)]/65">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 sm:pb-28">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--accent)_28%,transparent)] px-6 py-14 text-center sm:px-14 sm:py-16"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_65%)]"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="font-display text-[clamp(1.85rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[var(--cream)]">
                Tu catálogo en la web,{" "}
                <span className="font-serif italic text-[var(--accent-soft)]">listo para consultas</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--cream-soft)]/68">
                Empieza gratis con 10 productos o elige el plan según tu volumen. Te ayudamos a publicar en días.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={catalogoWhatsappHref("gratis")} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>Empezar gratis</span>
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <Link href="/presencia-digital" className="btn-ghost">
                  Ver Presencia Digital
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-[0.76rem] text-[var(--muted)]">
            © 2026 Wavys Software ·{" "}
            <Link href="/presencia-digital" className="hover:text-[var(--cream)]">
              Presencia Digital
            </Link>
          </p>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.76rem] text-[var(--muted)] hover:text-[var(--cream)]"
          >
            WhatsApp
          </a>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--line)] bg-[var(--nav-bg)] p-3 backdrop-blur-md md:hidden">
        <a href={catalogoWhatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full py-3 text-[0.86rem]">
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
