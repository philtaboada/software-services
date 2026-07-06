"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PresenciaHeroPreview } from "@/components/presencia-hero-preview";
import { PresenciaPhotoStack } from "@/components/presencia-photo-stack";
import { PresenciaPromoModal } from "@/components/presencia-promo-modal";
import { CATALOGO_SUMMARY_ITEMS } from "@/lib/presencia-catalogo";
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
  { href: "#trabajo", label: "Trabajo", anchor: true },
  { href: "#fotos", label: "Fotos", anchor: true },
  { href: "/presencia-catalogo", label: "Catálogo", anchor: false },
  { href: "#tienda", label: "Tienda", anchor: true },
  { href: "#planes", label: "Planes", anchor: true },
  { href: "#faq", label: "FAQ", anchor: true },
] as const;

const WORK_ITEMS = [
  {
    slug: "la-alcoba",
    client: "La Alcoba",
    title: "Primera web: experiencia gastronómica, carta y reservas en una sola narrativa",
    year: "2024",
    tag: "web",
    demoHref: "https://restaurant-code.vercel.app/",
    accent:
      "linear-gradient(145deg, color-mix(in srgb, #c47a5a 22%, var(--surface)) 0%, var(--surface) 70%)",
  },
  {
    slug: "inmobiliaria-fabre",
    client: "Inmobiliaria Fabre",
    title: "Sitio inmobiliario con foco en propiedades y contacto directo con el cliente",
    year: "2025",
    tag: "web",
    demoHref: "https://www.inmobiliariafabre.com/",
    accent:
      "linear-gradient(145deg, color-mix(in srgb, #4a7c9e 24%, var(--surface)) 0%, var(--surface) 70%)",
  },
  {
    slug: "wavys-technologies",
    client: "Wavys Technologies",
    title: "Web corporativa del estudio: mensaje, servicios y conversión en un solo flujo",
    year: "2025",
    tag: "web · brand",
    demoHref: "https://wavys-technologies.com/",
    accent:
      "linear-gradient(145deg, color-mix(in srgb, var(--accent) 28%, var(--surface)) 0%, var(--surface) 70%)",
  },
  {
    slug: "jlh-seguros",
    client: "JLH Corredores de Seguros",
    title: "Portal de correduría: seguros, cotización y confianza para empresas y familias",
    year: "2025",
    tag: "web",
    demoHref: "https://www.jlhcorredoresdeseguros.com/",
    accent:
      "linear-gradient(145deg, color-mix(in srgb, #3d5a80 22%, var(--surface)) 0%, var(--surface) 70%)",
  },
] as const;

const CTA_EMAIL =
  "mailto:contact@wavys-technologies.com?subject=Presencia%20Digital%20-%20Consulta&body=Hola%20Wavys%2C%20quiero%20información%20sobre%20el%20plan%20Presencia%20Digital%20para%20mi%20negocio.";

const SCHEDULE_HREF = whatsappHref();

const VALUE_STRIP = [
  "Entrega 5–7 días",
  "Catálogo gratis · 10 productos",
  "Tienda con pedido a WhatsApp",
] as const;

const CIUDADES = ["Lima", "Arequipa", "Trujillo", "Cusco", "Piura", "Huancayo", "Iquitos"] as const;

const MARQUEE_ITEMS = [
  "Todo el Perú",
  "Fotos incluidas",
  "Dominio incluido",
  "Hosting + SSL",
  "SEO técnico",
  "WhatsApp",
  "Entrega 5–7 días",
  "Diseño editorial",
  "Sin plantillas",
] as const;

const FEATURES = [
  {
    span: "lg:col-span-2",
    num: "01",
    title: "Diseño editorial premium",
    body: "Landing con dirección visual Wavys — tipografía de escala, ritmo y atmósfera. Nada de plantillas WordPress.",
  },
  {
    span: "",
    num: "02",
    title: "Pack Foto Essential",
    body: "Retoque + imágenes nuevas para que tu web no arranque con fotos de celular sin tratar.",
  },
  {
    span: "",
    num: "03",
    title: "Dominio incluido",
    body: "Tu dirección web profesional, primer año incluido.",
  },
  {
    span: "",
    num: "04",
    title: "Hosting + SSL",
    body: "Infraestructura rápida, HTTPS y Core Web Vitals cuidados.",
  },
  {
    span: "lg:col-span-2",
    num: "05",
    title: "Listo para pauta",
    body: "Pixel Meta, Google Tag, WhatsApp flotante y formulario conectado — optimizado para Meta Ads y Google Ads en cualquier ciudad del país.",
  },
  {
    span: "",
    num: "06",
    title: "Soporte mensual",
    body: "Cambios menores de textos, fotos y horarios incluidos.",
  },
] as const;

const PLANS = [
  {
    id: "presencia",
    name: "Presencia",
    badge: "Servicios y negocios locales",
    price: "149",
    note: "12 meses · regular S/179",
    highlight: false,
    cta: "Quiero Presencia",
    whatsappPlan: "Presencia" as const,
    items: [
      "Landing profesional",
      "Pack Foto Essential",
      "Dominio (año 1)",
      "Hosting + SSL + SEO",
      "WhatsApp + formulario",
      "Soporte mensual",
    ],
  },
  {
    id: "tienda",
    name: "Presencia Tienda",
    badge: "Catálogo + pedidos",
    price: "229",
    note: "12 meses · regular S/259",
    highlight: true,
    cta: "Quiero mi tienda",
    whatsappPlan: "Presencia Tienda" as const,
    items: [
      "Todo Presencia (sin sesión foto)",
      "Catálogo autogestionable",
      "Hasta 100 productos incluidos",
      "Carrito → pedido a WhatsApp",
      "Panel admin (tus fotos y precios)",
      "Entrega 10–14 días",
    ],
  },
] as const;

const TIENDA_FEATURES = [
  {
    title: "Catálogo en Google",
    body: "Tus productos indexables — no solo un catálogo de WhatsApp con límite de 500 ítems.",
  },
  {
    title: "Carrito → WhatsApp",
    body: "El cliente arma el pedido y al pagar llega a tu WhatsApp con productos, cantidades y total listos.",
  },
  {
    title: "Tú lo administras",
    body: "Subes fotos, cambias precios y activas productos desde un panel simple — sin depender de nosotros.",
  },
  {
    title: "Sin comisión por venta",
    body: "A diferencia de Tiendanube o marketplaces: cobras como siempre — Yape, Plin o transferencia en chat.",
  },
] as const;

const PROCESS = [
  { step: "01", title: "Brief", body: "Formulario + fotos de tu negocio o productos. Tienda: listado inicial de catálogo." },
  { step: "02", title: "Visual", body: "Retoque Pack Essential (Presencia) u optimización de tus fotos de producto (Tienda)." },
  { step: "03", title: "Build", body: "Landing o tienda con copy claro, CTA visible y base técnica para campañas." },
  { step: "04", title: "Live", body: "Dominio, hosting, SSL y WhatsApp conectados. Capacitación del panel admin en Tienda." },
] as const;

const TESTIMONIALS = [
  {
    quote: "Mis clientes dejaron de preguntarme si tenía página. Ahora me escriben por WhatsApp desde Google.",
    name: "María T.",
    role: "Consultora · Lima",
    initials: "MT",
    tall: true,
  },
  {
    quote: "Lo que más valoro son las fotos. Antes se notaba amateur; ahora la web transmite confianza.",
    name: "Carlos M.",
    role: "Retail · Arequipa",
    initials: "CM",
    tall: false,
  },
  {
    quote: "S/149 al mes con dominio, hosting y fotos. Nada comparable en el mercado peruano.",
    name: "Ana L.",
    role: "Clínica · Trujillo",
    initials: "AL",
    tall: false,
  },
  {
    quote: "La usamos como landing de Meta Ads y la tasa de conversión subió desde la primera semana.",
    name: "Rodrigo P.",
    role: "E-commerce · Lima",
    initials: "RP",
    tall: true,
  },
] as const;

const FAQ = [
  {
    q: "¿Qué incluye el plan Presencia?",
    a: "Landing diseñada y desarrollada, Pack Foto Essential, dominio el primer año, hosting con SSL, SEO técnico, WhatsApp + formulario, Pixel Meta + Google Tag y soporte con cambios menores.",
  },
  {
    q: "¿Qué es Presencia Catálogo?",
    a: "Catálogo web inteligente y fácil de rellenar: tus productos en la web, consultas por WhatsApp, sin carrito. Gratis hasta 10 productos; planes de pago hasta 1.000 (S/99–199/mes). Toda la información está en la página Presencia Catálogo.",
  },
  {
    q: "¿Qué es Presencia Tienda?",
    a: "Catálogo web autogestionable con carrito. Al finalizar, el pedido llega a tu WhatsApp con productos, cantidades y total. Tú subes fotos y precios — ideal para ferreterías, textiles y tiendas con muchos productos.",
  },
  {
    q: "¿Qué es el Pack Foto Essential?",
    a: "Retoque de hasta 5 fotos tuyas + 6–8 imágenes profesionales para web. Incluido en Presencia. En Presencia Tienda usas tus propias fotos de producto — nosotros solo las optimizamos para web.",
  },
  {
    q: "¿Atienden en todo el Perú?",
    a: "Sí. Entregamos en las 24 regiones. Presencia en 5–7 días; Presencia Tienda en 10–14 días desde brief confirmado.",
  },
  {
    q: "¿Sirve para campañas de Meta Ads?",
    a: "Absolutamente. Instalamos pixel y tags. Una landing o tienda editorial multiplica el ROI de tu pauta en cualquier ciudad del Perú.",
  },
  {
    q: "¿Puedo cancelar?",
    a: "Ambos planes: 12 meses con precio preferencial. Después del año, renovación mes a mes opcional. Al terminar el contrato cumplido, recibes los archivos de tu web.",
  },
] as const;

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m13 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 17 17 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
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

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WordMask({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`word-mask ${className}`}>
      <span data-word-inner>{children}</span>
    </span>
  );
}

export function PresenciaDigitalLanding() {
  const pageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [theme, setTheme] = useState<Theme>("dark");

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
        gsap.set("[data-word-inner], [data-reveal], [data-hero-preview]", { y: 0, autoAlpha: 1, rotate: 0 });
        return;
      }

      gsap.set("[data-hero-line] [data-word-inner]", { y: "110%" });

      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 0.06 })
        .from("[data-nav-item]", { autoAlpha: 0, y: -10, stagger: 0.04, duration: 0.4 })
        .from("[data-urgency]", { autoAlpha: 0, y: -10, duration: 0.4 }, "-=0.2")
        .from("[data-masthead]", { autoAlpha: 0, x: -12, duration: 0.45 }, "-=0.25")
        .to(
          "[data-hero-line] [data-word-inner]",
          { y: 0, duration: 1.05, stagger: 0.04, ease: "expo.out" },
          "-=0.15",
        )
        .from("[data-hero-sub]", { autoAlpha: 0, y: 22, duration: 0.55 }, "-=0.6")
        .from("[data-hero-cta]", { autoAlpha: 0, y: 14, stagger: 0.07, duration: 0.45 }, "-=0.35")
        .from(
          "[data-hero-preview]",
          { autoAlpha: 0, y: 40, rotate: 4, duration: 0.85, ease: "power2.out" },
          "-=0.55",
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
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

      {/* Nav — mismo patrón que landing principal */}
      <header
        ref={navRef}
        data-scrolled="false"
        className="nav-root fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-5 py-5 sm:px-8 lg:px-12 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-6">
          <Link
            href="/"
            data-nav-item
            className="group inline-flex min-w-0 max-w-full items-center gap-2 justify-self-start sm:gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.36em] text-[var(--cream)]"
          >
            <Image
              src="/logo.png"
              alt="Wavys Technologies"
              width={36}
              height={36}
              className="h-9 w-auto shrink-0"
              priority
            />
            <span className="min-w-0 truncate sm:whitespace-normal">
              <span className="md:hidden">Wavys</span>
              <span className="hidden md:inline">Wavys Technologies</span>
            </span>
            <sup className="shrink-0 text-[0.55rem] font-normal tracking-[0.2em] text-[var(--muted)]">
              PE
            </sup>
          </Link>

          <nav
            aria-label="Navegación principal"
            className="nav-pill hidden shrink-0 items-center justify-center gap-1 rounded-full p-1 md:flex md:justify-self-center"
          >
            {NAV_LINKS.map((item) =>
              item.anchor ? (
                <a
                  key={item.href}
                  href={item.href}
                  data-nav-item
                  className="rounded-full px-4 py-1.5 text-[0.82rem] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  data-nav-item
                  className="rounded-full px-4 py-1.5 text-[0.82rem] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center justify-end justify-self-end gap-2 md:min-w-0 md:gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
              data-nav-item
              className="theme-toggle inline-flex h-10 w-10 shrink-0 aspect-square items-center justify-center"
            >
              <MoonIcon />
              <SunIcon />
            </button>
            <a
              href={SCHEDULE_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-nav-item
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 text-[0.78rem] font-semibold leading-none text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--accent-bright)] sm:px-5 sm:text-[0.82rem]"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-[var(--ink)] opacity-60 animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
              </span>
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero — editorial broadsheet */}
        <section
          id="top"
          className="presencia-editorial-columns relative mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:pt-36"
        >
          <div
            data-urgency
            className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-4 py-2 text-center sm:justify-start sm:px-5"
          >
            <span className="presencia-masthead text-[var(--accent-bright)]">
              ✦ Presencia Digital · Todo el Perú
            </span>
            <span className="hidden h-3 w-px bg-[var(--line-strong)] sm:block" aria-hidden="true" />
            <span className="text-[0.78rem] text-[var(--cream-soft)]">
              Desde <strong className="font-semibold text-[var(--foreground)]">S/149/mes</strong> · sin pago inicial alto
            </span>
          </div>
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <p data-masthead className="presencia-chapter mb-8">
                Capítulo 01 · Presencia Digital
              </p>

              <h1 className="font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--cream)]">
                <span className="block" data-hero-line>
                  <WordMask>Tu marca</WordMask>
                </span>
                <span className="mt-1 block" data-hero-line>
                  <WordMask className="font-serif italic text-[var(--accent-soft)]">visible</WordMask>{" "}
                  <WordMask>en todo</WordMask>
                </span>
                <span className="mt-1 block" data-hero-line>
                  <WordMask className="text-gradient-accent">el Perú</WordMask>
                </span>
              </h1>

              <div className="presencia-pull-rule my-8 max-w-md" aria-hidden="true" />

              <p
                data-hero-sub
                className="max-w-lg text-pretty text-[1.05rem] leading-7 text-[var(--cream-soft)]/72 sm:text-[1.1rem] sm:leading-8"
              >
                Landing editorial con{" "}
                <strong className="font-semibold text-[var(--foreground)]">fotos profesionales incluidas</strong>,
                dominio, hosting, SEO y WhatsApp — desde{" "}
                <strong className="text-[var(--accent-bright)]">S/149/mes</strong>.
              </p>

              <div className="mt-8 flex flex-wrap gap-3" data-hero-cta>
                <a href={SCHEDULE_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>Consultar por WhatsApp</span>
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <a href="#trabajo" className="btn-ghost">
                  <span>Ver ejemplos</span>
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-8 sm:max-w-lg">
                {[
                  { val: "S/149", label: "desde / mes" },
                  { val: "5–7", label: "días entrega" },
                  { val: "24", label: "regiones" },
                ].map((s) => (
                  <div key={s.label} className="presencia-stat">
                    <p className="font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--cream)] sm:text-[1.5rem]">
                      {s.val}
                    </p>
                    <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview del entregable — sin fotos ni screenshots */}
            <div className="relative lg:col-span-5 lg:pb-6">
              <PresenciaHeroPreview />
            </div>
          </div>
        </section>

        {/* Cities + marquee */}
        <section className="border-y border-[var(--line)]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-5 sm:gap-3 sm:px-6">
            <span className="presencia-masthead mr-1 text-[var(--muted)]">Entregamos en</span>
            {CIUDADES.map((city) => (
              <span
                key={city}
                className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.72rem] text-[var(--cream-soft)]/80"
              >
                {city}
              </span>
            ))}
            <span className="text-[0.72rem] text-[var(--muted)]">+ todo el país</span>
          </div>
          <div className="overflow-hidden border-t border-[var(--line)] py-3.5">
            <div className="marquee-track flex w-max gap-10">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex shrink-0 items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]"
                >
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trabajo — portfolio con URLs */}
        <section
          id="trabajo"
          className="relative border-t border-[var(--line)] py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div data-reveal>
                <p className="section-label">Trabajo seleccionado</p>
                <h2 className="mt-6 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance max-w-[22ch] text-[var(--cream)]">
                  Webs que ya entregamos con{" "}
                  <span className="font-serif italic text-[var(--accent)]">URL en vivo</span>
                </h2>
                <p className="mt-4 max-w-lg text-[0.95rem] leading-7 text-[var(--cream-soft)]/65">
                  Misma calidad editorial que verás en tu plan Presencia Digital. Abrí cada URL en
                  vivo — sin capturas, el sitio habla por sí solo.
                </p>
              </div>
              <a
                data-reveal
                href={CTA_EMAIL}
                className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
              >
                <span>Pedir propuesta</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
              {WORK_ITEMS.map((item, idx) => (
                <a
                  key={item.slug}
                  data-reveal
                  href={item.demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-[1.25rem] ${
                    idx % 2 === 1 ? "md:mt-10" : ""
                  }`}
                  style={{ "--work-accent": item.accent } as React.CSSProperties}
                >
                  <div className="presencia-work-card relative aspect-[16/10]">
                    <div className="presencia-work-grid" aria-hidden="true" />
                    <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--cream-soft)]/75">
                          {item.tag} · {item.year}
                        </span>
                        <span className="rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_55%,transparent)] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                          En vivo
                        </span>
                      </div>
                      <div>
                        <p className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--cream)]">
                          {item.client}
                        </p>
                        <p className="mt-2 truncate font-mono text-[0.72rem] tracking-[0.06em] text-[var(--muted)]">
                          {item.demoHref.replace(/^https?:\/\//, "")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-6 px-1 pt-5">
                    <h3 className="font-display text-[1.05rem] font-medium leading-[1.35] tracking-[-0.02em] text-[var(--cream-soft)]/85 sm:text-[1.12rem]">
                      {item.title}
                    </h3>
                    <span className="mt-1 shrink-0 text-[var(--cream)] opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Photos — editorial grid + reference stacks */}
        <section id="fotos" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="flex flex-col lg:sticky lg:top-28">
              <p data-reveal className="presencia-chapter">
                Capítulo 02 · Fotografía
              </p>
              <h2
                data-reveal
                className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[var(--cream)]"
              >
                Tu web no puede verse{" "}
                <span className="font-serif italic text-[var(--accent-soft)]">barata</span>{" "}
                por culpa de las fotos
              </h2>
              <p data-reveal className="mt-5 text-[0.98rem] leading-7 text-[var(--cream-soft)]/68">
                En Perú, la mayoría de landings arrancan con fotos de celular sin tratar. Nosotros
                incluimos producción visual desde el día uno — en Lima, provincias y campañas
                nacionales.
              </p>
            </div>

            <div className="presencia-fotos-grid">
              {[
                {
                  title: "Pack Essential",
                  plan: "Plan Presencia",
                  body: "Retoque de 5 fotos + 6–8 imágenes nuevas para hero, servicios y redes.",
                  accent: "border-[var(--teal)]",
                  h: "min-h-[180px]",
                  grid: "lg:col-start-1 lg:row-start-1",
                },
                {
                  title: "Fotos propias",
                  plan: "Presencia Tienda · BYO",
                  body: "Tú subes las fotos de cada producto. Nosotros optimizamos formato y peso — sin sesión ni pack limitado por catálogo.",
                  accent: "border-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_25%,transparent)]",
                  h: "min-h-[220px] lg:min-h-[260px]",
                  grid: "lg:col-start-1 lg:row-start-2 lg:row-span-2",
                },
                {
                  title: "Modalidad BYO",
                  plan: "Presencia opcional",
                  body: "¿Ya tienes fotos del local? Presencia sin Pack Essential: −S/49 solo meses 2 y 3.",
                  accent: "border-[var(--line-strong)]",
                  h: "min-h-[140px]",
                  grid: "lg:col-start-2 lg:row-start-1",
                },
                {
                  title: "Cobertura nacional",
                  plan: "24 regiones",
                  body: "Entrega remota en todo el Perú. Brief y materiales por WhatsApp — sin depender de sesión presencial.",
                  accent: "border-[var(--lime)]",
                  h: "min-h-[160px]",
                  grid: "lg:col-start-3 lg:row-start-1",
                },
              ].map((card) => (
                <article
                  key={card.title}
                  data-reveal
                  className={`card-outline rounded-2xl border-l-2 p-5 ${card.accent} ${card.h} ${card.grid}`}
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                    {card.plan}
                  </p>
                  <h3 className="mt-2 font-display text-[1.15rem] font-medium text-[var(--cream)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-6 text-[var(--cream-soft)]/62">{card.body}</p>
                </article>
              ))}

              <div className="flex items-center justify-center pb-2 sm:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2 lg:justify-end lg:pr-1">
                <PresenciaPhotoStack featuredIndex={0} />
              </div>
            </div>
          </div>
        </section>

        {/* E-commerce — Presencia Tienda */}
        <section id="tienda" className="border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_4%,transparent)] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div data-reveal className="lg:sticky lg:top-28">
                <p className="presencia-chapter">Capítulo 03 · Tienda online</p>
                <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[var(--cream)]">
                  Catálogo profesional que{" "}
                  <span className="font-serif italic text-[var(--accent-soft)]">cierra en WhatsApp</span>
                </h2>
                <p className="mt-5 text-[0.98rem] leading-7 text-[var(--cream-soft)]/68">
                  Para ferreterías, textiles, bodegas y tiendas con decenas o cientos de productos.
                  Sin sesión fotográfica — tú subes tus imágenes. El cliente navega, arma el carrito y
                  el pedido llega directo a tu WhatsApp.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={whatsappHref("Presencia Tienda")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Consultar Presencia Tienda</span>
                    <ArrowIcon className="h-4 w-4" />
                  </a>
                  <a href="#planes" className="btn-ghost">
                    <span>Ver precio</span>
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {TIENDA_FEATURES.map((f) => (
                  <article key={f.title} data-reveal className="card-outline rounded-2xl p-5 sm:p-6">
                    <h3 className="font-display text-[1.05rem] font-medium text-[var(--cream)]">{f.title}</h3>
                    <p className="mt-2 text-[0.86rem] leading-6 text-[var(--cream-soft)]/58">{f.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features bento */}
        <section id="incluye" className="border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--foreground)_2%,transparent)] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div data-reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="presencia-chapter">Capítulo 04 · Incluye</p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
                  Todo lo que tu negocio necesita online
                </h2>
              </div>
              <p className="max-w-xs text-[0.88rem] leading-6 text-[var(--muted)]">
                Un solo plan mensual. Sin sorpresas de hosting, dominio o SSL aparte.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <article
                  key={f.num}
                  data-reveal
                  className={`card-outline rounded-2xl p-5 sm:p-6 ${f.span}`}
                >
                  <span className="font-mono text-[0.62rem] tracking-[0.28em] text-[var(--accent)]">{f.num}</span>
                  <h3 className="mt-3 font-display text-[1.08rem] font-medium text-[var(--cream)]">{f.title}</h3>
                  <p className="mt-2 text-[0.86rem] leading-6 text-[var(--cream-soft)]/58">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="planes" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="presencia-chapter mx-auto justify-center">Capítulo 05 · Planes</p>
            <h2 className="mt-6 font-display text-[clamp(1.85rem,4vw,2.85rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
              Tres líneas,{" "}
              <span className="font-serif italic text-[var(--accent-soft)]">un solo modelo</span>
            </h2>
            <p className="mt-4 text-[0.92rem] leading-7 text-[var(--cream-soft)]/65">
              Presencia para servicios. Catálogo para mostrar productos. Tienda para pedidos con carrito a WhatsApp.
            </p>
          </div>

          <article
            data-reveal
            className="card-outline relative mx-auto mt-14 max-w-4xl overflow-visible rounded-3xl p-6 sm:p-8"
          >
            <div className="presencia-plan-spine" aria-hidden="true" />
            <div className="relative z-[1] max-w-lg">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                Productos · vitrina web
              </p>
              <h3 className="mt-3 font-display text-[1.5rem] font-medium text-[var(--cream)]">
                Presencia Catálogo
              </h3>
              <p className="mt-3 text-[0.9rem] leading-7 text-[var(--cream-soft)]/68">
                Catálogo inteligente y sencillo de rellenar. Tus clientes ven productos en la web y consultan
                por WhatsApp — sin carrito, sin e-commerce.
              </p>
              <ul className="mt-5 space-y-2">
                {CATALOGO_SUMMARY_ITEMS.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.84rem] text-[var(--cream-soft)]/75">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <CatalogoPriceSlider
              embedded
              defaultCount={125}
              showCta
              showDetailLink
              className="relative z-[1] mt-8 border-t border-[var(--line)] pt-8"
            />
          </article>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-8 lg:max-w-4xl lg:mx-auto">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                data-reveal
                className={`card-outline relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-7 ${
                  plan.highlight ? "lg:-translate-y-3 lg:shadow-[0_24px_80px_-20px_rgba(46,232,154,0.15)]" : ""
                }`}
              >
                {plan.highlight && <div className="presencia-plan-spine" aria-hidden="true" />}
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                  {plan.badge}
                </p>
                <h3 className="mt-3 font-display text-[1.4rem] font-medium text-[var(--cream)]">{plan.name}</h3>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-[0.85rem] text-[var(--muted)]">S/</span>
                  <span className="font-display text-[3.2rem] font-semibold leading-none tracking-[-0.04em]">
                    {plan.price}
                  </span>
                  <span className="mb-1.5 text-[0.88rem] text-[var(--muted)]">/mes</span>
                </div>
                <p className="mt-2 text-[0.76rem] text-[var(--muted)]">{plan.note}</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--line)] pt-6">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.86rem] text-[var(--cream-soft)]/75">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                  <a
                    href={whatsappHref(plan.whatsappPlan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 w-full text-center ${plan.highlight ? "btn-primary" : "btn-ghost"}`}
                  >
                    {plan.cta}
                  </a>
              </article>
            ))}
          </div>
        </section>

        {/* Process timeline */}
        <section className="border-y border-[var(--line)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div data-reveal className="mb-12">
              <p className="presencia-chapter">Proceso</p>
              <h2 className="mt-4 font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
                De brief a web publicada en una semana
              </h2>
            </div>
            <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div
                className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-[var(--line-strong)] lg:block"
                aria-hidden="true"
              />
              {PROCESS.map((step) => (
                <li key={step.step} data-reveal className="relative">
                  <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--background)] font-display text-[0.82rem] font-bold text-[var(--accent)]">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-medium text-[var(--cream)]">{step.title}</h3>
                  <p className="mt-2 text-[0.86rem] leading-6 text-[var(--cream-soft)]/58">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Testimonials masonry */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div data-reveal className="mb-12 max-w-xl">
            <p className="presencia-chapter">Resultados</p>
            <h2 className="mt-4 font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-medium tracking-[-0.03em] text-[var(--cream)]">
              Negocios en Lima, provincias y campañas nacionales
            </h2>
          </div>
          <div className="presencia-masonry">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.initials}
                data-reveal
                className={`presencia-masonry-item card-outline rounded-2xl p-6 ${t.tall ? "lg:min-h-[200px]" : ""}`}
              >
                <p className="font-serif text-[1.05rem] leading-7 text-[var(--cream-soft)]/78">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-5 flex items-center gap-3 border-t border-[var(--line)] pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[0.7rem] font-bold text-[var(--ink)]">
                    {t.initials}
                  </span>
                  <div>
                    <cite className="not-italic text-[0.88rem] font-medium text-[var(--cream)]">{t.name}</cite>
                    <p className="text-[0.72rem] text-[var(--muted)]">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
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
            {FAQ.map((item, idx) => {
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

        {/* Final CTA */}
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
              <p className="presencia-masthead text-[var(--accent-soft)]">Todo el Perú · Presencia 5–7 d · Tienda 10–14 d</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--cream)]">
                Tu negocio merece una web que{" "}
                <span className="font-serif italic text-[var(--accent-soft)]">venda</span> tan bien
                como lo que ofreces
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--cream-soft)]/68">
                Catálogo gratis · Landing S/149/mes · Tienda con pedido a WhatsApp S/229/mes.
                Escríbenos y te decimos qué plan encaja contigo.
              </p>

              <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-2">
                {VALUE_STRIP.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.78rem] text-[var(--cream-soft)]/75">
                    <CheckIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={SCHEDULE_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>Consultar por WhatsApp</span>
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <a href={CTA_EMAIL} className="btn-ghost">
                  Prefiero email
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-[0.76rem] text-[var(--muted)]">
            © 2026 Wavys Software ·{" "}
            <Link href="/" className="hover:text-[var(--cream)]">
              software.wavys-technologies.com
            </Link>
          </p>
          <div className="flex gap-6 text-[0.76rem] text-[var(--muted)]">
            <a href={SCHEDULE_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--cream)]">
              WhatsApp
            </a>
            <a href={CTA_EMAIL} className="hover:text-[var(--cream)]">
              contact@wavys-technologies.com
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--line)] bg-[var(--nav-bg)] p-3 backdrop-blur-md md:hidden">
        <a href={SCHEDULE_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary w-full py-3 text-[0.86rem]">
          Consultar por WhatsApp
        </a>
      </div>
      <PresenciaPromoModal showLandingLink={false} />
    </div>
  );
}
